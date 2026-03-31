import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureMarketingSchema } from "@/lib/marketingSchema";
import { sendUrgentEmail, getAdminEmail } from "@/lib/ses";
import { isValidEmail } from "@/lib/validation";
import { rateLimit } from "@/lib/rateLimit";

const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 3;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Emergency intake — always returns 200 JSON success to the client after validation.
 * Failures are logged server-side only (do not surface errors to someone under attack).
 */
export async function POST(request: Request) {
  const rl = rateLimit(request, { limit: LIMIT, windowMs: WINDOW_MS, identifier: "emergency" });
  if (!rl.success) {
    return NextResponse.json({
      success: true,
      message: "We have been alerted and will contact you immediately.",
    });
  }

  try {
    const body = await request.json();

    if (body.website?.trim()) {
      return NextResponse.json({
        success: true,
        message:
          "We have been alerted and will contact you immediately.",
      });
    }

    const workEmail = (body.work_email ?? body.email ?? "").trim();
    const fullName = (body.full_name ?? body.name ?? "").trim();
    const company = (body.company ?? "").trim();
    const message = (body.message ?? body.situation ?? "").trim();
    const phone = (body.phone ?? "").trim();

    if (!workEmail || !isValidEmail(workEmail)) {
      return NextResponse.json({
        success: true,
        message:
          "We have been alerted and will contact you immediately.",
      });
    }

    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      null;
    const userAgent = request.headers.get("user-agent") ?? null;

    const composedMessage = [
      phone ? `Phone: ${phone}` : "",
      message ? `Details:\n${message}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      await ensureMarketingSchema();
      const sql = getSql();
      await sql`
        INSERT INTO emergency_requests (
          full_name, work_email, company, message,
          ip_address, user_agent, status
        )
        VALUES (
          ${fullName || null},
          ${workEmail},
          ${company || null},
          ${composedMessage || null},
          ${ipAddress},
          ${userAgent},
          'new'
        )
      `;
    } catch (dbErr) {
      console.error("[emergency] DB:", dbErr);
    }

    const subjectCompany = company || workEmail;
    const textBody = [
      `⚠️ ACTIVE BREACH — IMMEDIATE RESPONSE NEEDED`,
      ``,
      `Email: ${workEmail}`,
      `Name: ${fullName || "Not provided"}`,
      `Company: ${company || "Not provided"}`,
      `Phone: ${phone || "Not provided"}`,
      `Message: ${message || "None"}`,
      `Time: ${new Date().toISOString()}`,
      `IP: ${ipAddress || "unknown"}`,
      ``,
      `Respond within 1 hour.`,
    ].join("\n");

    try {
      await sendUrgentEmail({
        to: getAdminEmail(),
        subject: `🚨 EMERGENCY SCAN REQUEST — ${subjectCompany}`,
        text: textBody,
        html: `<pre style="font-family:system-ui,sans-serif">${escapeHtml(textBody)}</pre>`,
      });
    } catch (emailErr) {
      console.error(
        "[emergency] Email failed:",
        emailErr instanceof Error ? emailErr.message : emailErr
      );
      // Do not rethrow — DB insert succeeded (if any)
    }

    return NextResponse.json({
      success: true,
      message:
        "We have been alerted and will contact you immediately.",
    });
  } catch (err) {
    console.error("[emergency] unexpected:", err);
    return NextResponse.json({
      success: true,
      message:
        "We have been alerted and will contact you immediately.",
    });
  }
}
