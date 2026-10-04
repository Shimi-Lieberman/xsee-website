import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureMarketingSchema } from "@/lib/marketingSchema";
import { sendEmail, getAdminEmail } from "@/lib/ses";
import { isValidEmail } from "@/lib/validation";
import { rateLimit, isValidWorkEmail } from "@/lib/rateLimit";

const ARN_REGEX = /^arn:aws:iam::[0-9]{12}:role\/.+/;

const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 3;

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
    const remediationRoleArn = (
      body.remediation_role_arn ??
      body.remediationRoleArn ??
      ""
    ).trim();

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
      `We received your request for a free attack-path assessment for ${company}. We'll contact you to schedule it.`,
      ``,
      ...(awsRoleArn
        ? [`Role ARN you sent: ${awsRoleArn}`, `Region: ${awsRegion}`, ``]
        : [`We'll send you instructions to connect a read-only IAM role when we schedule.`, ``]),
      ``,
      `— The XSEE Team`,
      `sales@xsee.io`,
    ].join("\n");

    try {
      await sendEmail({
        to: work_email,
        subject: "We received your assessment request",
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Free scan error:", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
