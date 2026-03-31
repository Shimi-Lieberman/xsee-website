import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureMarketingSchema } from "@/lib/marketingSchema";
import { sendEmail, getAdminEmail } from "@/lib/ses";
import { isValidEmail } from "@/lib/validation";
import { rateLimit, isValidWorkEmail } from "@/lib/rateLimit";

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

  try {
    const body = await request.json();

    if (body.website?.trim()) {
      return NextResponse.json({ success: true });
    }

    const full_name = (
      body.full_name ??
      body.fullName ??
      body.name ??
      ""
    ).trim();
    const work_email = (body.work_email ?? body.email ?? "").trim();
    const company = (body.company ?? "").trim();
    const cloudProvider = (body.cloudProvider ?? body.cloud_provider ?? "").trim();
    const cloudAssets = (body.assetCount ?? body.cloud_assets ?? "").trim();
    const message = (body.message ?? "").trim();

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
