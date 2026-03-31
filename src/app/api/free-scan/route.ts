import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureMarketingSchema } from "@/lib/marketingSchema";
import { sendEmail, getAdminEmail } from "@/lib/ses";
import { isValidEmail } from "@/lib/validation";
import { rateLimit, isValidWorkEmail } from "@/lib/rateLimit";

const ARN_REGEX = /^arn:aws:iam::[0-9]{12}:role\/.+/;

const PLATFORM_API_BASE =
  process.env.XSEE_PLATFORM_API_URL?.replace(/\/$/, "") ?? "https://app.xsee.io";

const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 3;

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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

  try {
    const body = await request.json();

    if (body.website?.trim()) {
      return NextResponse.json({ success: true });
    }

    const full_name = (body.full_name ?? body.fullName ?? body.name ?? "").trim();
    const work_email = (body.work_email ?? body.email ?? "").trim();
    const company = (body.company ?? "").trim();
    const awsRoleArn = (body.awsRoleArn ?? body.role_arn ?? "").trim();
    const awsRegion = (body.awsRegion ?? body.region ?? "us-east-1").trim();

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
    if (!company) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!awsRoleArn) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!ARN_REGEX.test(awsRoleArn)) {
      return NextResponse.json(
        { error: "Invalid AWS Role ARN format" },
        { status: 400 }
      );
    }

    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      null;
    const userAgent = request.headers.get("user-agent") ?? null;

    await ensureMarketingSchema();
    const sql = getSql();

    await sql`
      INSERT INTO free_scan_requests (
        full_name, work_email, company, aws_role_arn, aws_region,
        ip_address, user_agent, status
      )
      VALUES (
        ${full_name},
        ${work_email},
        ${company},
        ${awsRoleArn},
        ${awsRegion},
        ${ipAddress},
        ${userAgent},
        'pending'
      )
    `;

    const platformPayload: PlatformSubmitBody = {
      name: full_name,
      email: work_email,
      company,
      role_arn: awsRoleArn,
      region: awsRegion,
    };
    const platform = await forwardToPlatform(platformPayload);

    const ts = new Date().toISOString();
    const adminText = [
      `🔍 New Free Scan Request`,
      ``,
      `Name: ${full_name}`,
      `Email: ${work_email}`,
      `Company: ${company}`,
      `Role ARN: ${awsRoleArn}`,
      `Region: ${awsRegion}`,
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
      `Your Role ARN: ${awsRoleArn}`,
      `Region: ${awsRegion}`,
      ``,
      `— The XSEE Team`,
      `hello@xsee.io`,
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
