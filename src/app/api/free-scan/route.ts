import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureMarketingSchema } from "@/lib/marketingSchema";
import { PLATFORM_API_BASE, platformAuthHeaders } from "@/lib/platformApi";
import { sendEmail, getAdminEmail } from "@/lib/ses";
import { isValidEmail } from "@/lib/validation";
import { getClientIp, rateLimit, isValidWorkEmail } from "@/lib/rateLimit";
import {
  asString,
  BodyTooLargeError,
  FIELD_LIMITS,
  firstOverlongField,
  readJsonBody,
} from "@/lib/requestGuard";

const ARN_REGEX = /^arn:aws:iam::[0-9]{12}:role\/.+/;

const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 3;
/** Per-recipient cap, independent of the caller's IP. */
const EMAIL_LIMIT = 2;

type PlatformSubmitBody = {
  name: string;
  email: string;
  company: string;
  role_arn: string;
  region: string;
};

async function forwardToPlatform(body: PlatformSubmitBody): Promise<{
  ok: boolean;
  scan_id?: string;
}> {
  try {
    const res = await fetch(`${PLATFORM_API_BASE}/v1/free-scan/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...platformAuthHeaders() },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.warn("Free scan platform submit non-OK:", res.status);
      return { ok: false };
    }
    const data = (await res.json().catch(() => ({}))) as {
      scan_id?: string;
      status?: string;
    };
    return { ok: true, scan_id: data.scan_id };
  } catch (err) {
    console.warn("Free scan platform submit failed:", err);
    return { ok: false };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const rl = rateLimit(request, { limit: LIMIT, windowMs: WINDOW_MS, identifier: "free-scan" });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await readJsonBody(request);
  } catch (err) {
    if (err instanceof BodyTooLargeError) {
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    if (asString(body.website)) {
      return NextResponse.json({ success: true });
    }

    const full_name =
      asString(body.full_name) || asString(body.fullName) || asString(body.name);
    const work_email = asString(body.work_email) || asString(body.email);
    const company = asString(body.company);
    const awsRoleArn = asString(body.awsRoleArn) || asString(body.role_arn);
    const awsRegion =
      asString(body.awsRegion) || asString(body.region) || "us-east-1";
    const remediationRoleArn =
      asString(body.remediation_role_arn) || asString(body.remediationRoleArn);

    const overlong = firstOverlongField({
      full_name: { value: full_name, max: FIELD_LIMITS.name },
      work_email: { value: work_email, max: FIELD_LIMITS.email },
      company: { value: company, max: FIELD_LIMITS.company },
      awsRoleArn: { value: awsRoleArn, max: FIELD_LIMITS.arn },
      awsRegion: { value: awsRegion, max: FIELD_LIMITS.region },
      remediationRoleArn: { value: remediationRoleArn, max: FIELD_LIMITS.arn },
    });
    if (overlong) {
      console.warn(`[free-scan] rejected overlong field: ${overlong}`);
      return NextResponse.json({ error: "Field too long" }, { status: 400 });
    }

    if (!full_name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!work_email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!isValidEmail(work_email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (!isValidWorkEmail(work_email)) {
      return NextResponse.json(
        { error: "Please use your work email address." },
        { status: 400 }
      );
    }

    // The confirmation email is sent to a caller-supplied address, so meter per
    // address as well as per IP — otherwise this route can be driven as an
    // XSEE-branded mailer at an arbitrary third party.
    const emailRl = rateLimit(request, {
      limit: EMAIL_LIMIT,
      windowMs: WINDOW_MS,
      identifier: "free-scan-email",
      subject: work_email.toLowerCase(),
    });
    if (!emailRl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
    if (!company) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (awsRoleArn && !ARN_REGEX.test(awsRoleArn)) {
      return NextResponse.json(
        { error: "Invalid AWS Role ARN format" },
        { status: 400 }
      );
    }
    if (remediationRoleArn && !ARN_REGEX.test(remediationRoleArn)) {
      return NextResponse.json(
        { error: "Invalid remediation Role ARN format" },
        { status: 400 }
      );
    }

    const roleArnForDb = awsRoleArn || null;
    const regionForDb = awsRoleArn ? awsRegion || "us-east-1" : null;

    const resolvedIp = getClientIp(request);
    const ipAddress = resolvedIp === "unknown" ? null : resolvedIp;
    const userAgent = request.headers.get("user-agent") ?? null;

    await ensureMarketingSchema();
    const sql = getSql();

    await sql`
      INSERT INTO free_scan_requests (
        full_name, work_email, company, aws_role_arn, aws_region,
        remediation_role_arn,
        ip_address, user_agent, status
      )
      VALUES (
        ${full_name},
        ${work_email},
        ${company},
        ${roleArnForDb},
        ${regionForDb},
        ${remediationRoleArn || null},
        ${ipAddress},
        ${userAgent},
        'pending'
      )
    `;

    const platform =
      awsRoleArn && ARN_REGEX.test(awsRoleArn)
        ? await forwardToPlatform({
            name: full_name,
            email: work_email,
            company,
            role_arn: awsRoleArn,
            region: awsRegion || "us-east-1",
          })
        : { ok: false as const };

    const ts = new Date().toISOString();
    const adminText = [
      `🔍 New Free Scan Request`,
      ``,
      `Name: ${full_name}`,
      `Email: ${work_email}`,
      `Company: ${company}`,
      awsRoleArn ? `Role ARN: ${awsRoleArn}` : "Role ARN: (not provided — follow-up scheduled)",
      awsRoleArn ? `Region: ${awsRegion}` : "",
      `Remediation ARN: ${remediationRoleArn || "Not provided"}`,
      `Time: ${ts}`,
      platform.scan_id ? `Scan ID: ${platform.scan_id}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await sendEmail({
        to: getAdminEmail(),
        subject: `🔍 New Free Scan Request — ${company}`,
        text: adminText,
        html: `<pre style="font-family:system-ui,sans-serif">${escapeHtml(adminText)}</pre>`,
      });
    } catch (emailErr) {
      console.error(
        "[free-scan] Email failed (admin):",
        emailErr instanceof Error ? emailErr.message : emailErr
      );
      // Do not rethrow — DB insert succeeded
    }

    const confirmText = [
      `Hi ${full_name},`,
      ``,
      `We received your free scan request for ${company}. We'll reach out within one business day to schedule your scan.`,
      ``,
      ...(awsRoleArn
        ? [`Your Role ARN: ${awsRoleArn}`, `Region: ${awsRegion}`, ``]
        : [`We'll send you secure instructions to connect your read-only IAM role.`, ``]),
      ``,
      `— The XSEE Team`,
      `sales@xsee.io`,
    ].join("\n");

    try {
      await sendEmail({
        to: work_email,
        subject: "Your XSEE scan is queued",
        text: confirmText,
        html: `<pre style="font-family:system-ui,sans-serif">${escapeHtml(confirmText)}</pre>`,
      });
    } catch (emailErr) {
      console.error(
        "[free-scan] Email failed (user):",
        emailErr instanceof Error ? emailErr.message : emailErr
      );
      // Do not rethrow — DB insert succeeded
    }

    if (!platform.ok) {
      console.warn("[free-scan] Platform forward did not succeed; lead still stored in Postgres.");
    }

    return NextResponse.json({
      success: true,
      ...(platform.scan_id ? { scan_id: platform.scan_id } : {}),
    });
  } catch (err) {
    console.error("Free scan error:", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
