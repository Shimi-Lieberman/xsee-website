import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureMarketingSchema } from "@/lib/marketingSchema";
import { sendEmail, getAdminEmail } from "@/lib/ses";
import { isValidEmail } from "@/lib/validation";
import { rateLimit, isValidWorkEmail } from "@/lib/rateLimit";
import {
  asString,
  BodyTooLargeError,
  FIELD_LIMITS,
  firstOverlongField,
  readJsonBody,
} from "@/lib/requestGuard";

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
  const rl = rateLimit(request, { limit: LIMIT, windowMs: WINDOW_MS, identifier: "demo-request" });
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
    const cloudProvider =
      asString(body.cloudProvider) || asString(body.cloud_provider);
    const cloudAssets = asString(body.assetCount) || asString(body.cloud_assets);
    const message = asString(body.message);

    const overlong = firstOverlongField({
      full_name: { value: full_name, max: FIELD_LIMITS.name },
      work_email: { value: work_email, max: FIELD_LIMITS.email },
      company: { value: company, max: FIELD_LIMITS.company },
      cloudProvider: { value: cloudProvider, max: FIELD_LIMITS.cloudProvider },
      cloudAssets: { value: cloudAssets, max: FIELD_LIMITS.cloudAssets },
      message: { value: message, max: FIELD_LIMITS.message },
    });
    if (overlong) {
      console.warn(`[demo-request] rejected overlong field: ${overlong}`);
      return NextResponse.json({ error: "Field too long" }, { status: 400 });
    }

    if (!full_name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!work_email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!company) {
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

    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      null;
    const userAgent = request.headers.get("user-agent") ?? null;

    const messageBlock = [
      message,
      cloudProvider || cloudAssets
        ? `\n\nCloud provider: ${cloudProvider || "—"}\nCloud assets: ${cloudAssets || "—"}`
        : "",
    ]
      .join("")
      .trim();

    await ensureMarketingSchema();
    const sql = getSql();
    await sql`
      INSERT INTO demo_requests (
        name, email, full_name, work_email, company, message,
        cloud_provider, cloud_assets, source,
        ip_address, user_agent
      )
      VALUES (
        ${full_name},
        ${work_email},
        ${full_name},
        ${work_email},
        ${company},
        ${messageBlock || null},
        ${cloudProvider || null},
        ${cloudAssets || null},
        'homepage',
        ${ipAddress},
        ${userAgent}
      )
    `;

    const ts = new Date().toISOString();
    const textBody = [
      `New demo request (xsee.io homepage)`,
      ``,
      `Name: ${full_name}`,
      `Email: ${work_email}`,
      `Company: ${company}`,
      `Cloud: ${cloudProvider || "—"}`,
      `Assets: ${cloudAssets || "—"}`,
      `Message: ${message || "—"}`,
      `Time: ${ts}`,
      `Source: xsee.io homepage`,
    ].join("\n");

    const htmlBody = `<pre style="font-family:system-ui,sans-serif">${escapeHtml(textBody)}</pre>`;

    try {
      await sendEmail({
        to: getAdminEmail(),
        subject: `New Demo Request — ${company}`,
        text: textBody,
        html: htmlBody,
      });
    } catch (emailErr) {
      console.error(
        "[demo-request] Email failed:",
        emailErr instanceof Error ? emailErr.message : emailErr
      );
      // Do not rethrow — DB insert succeeded
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Demo request error:", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
