import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureMarketingSchema } from "@/lib/marketingSchema";
import { sendEmail, getAdminEmail } from "@/lib/ses";
import { isValidEmail } from "@/lib/validation";
import { rateLimit, isDisposableEmail } from "@/lib/rateLimit";

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
  const rl = rateLimit(request, { limit: LIMIT, windowMs: WINDOW_MS, identifier: "contact" });
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

    const name = (body.full_name ?? body.name ?? "").trim();
    const email = (body.email ?? body.work_email ?? "").trim();
    const message = (body.message ?? "").trim();
    const source = (body.source ?? "footer").trim() || "footer";

    if (!name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (isDisposableEmail(email)) {
      return NextResponse.json({ error: "Please use a valid email address." }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      null;
    const userAgent = request.headers.get("user-agent") ?? null;

    await ensureMarketingSchema();
    const sql = getSql();
    await sql`
      INSERT INTO contact_requests (name, email, message, source, ip_address, user_agent)
      VALUES (${name}, ${email}, ${message}, ${source}, ${ipAddress}, ${userAgent})
    `;

    const ts = new Date().toISOString();
    const textBody = [
      `Contact form — ${source}`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      `Message:`,
      message,
      ``,
      `Time: ${ts}`,
    ].join("\n");

    await sendEmail({
      to: getAdminEmail(),
      subject: `Contact Form — ${name}`,
      text: textBody,
      html: `<pre style="font-family:system-ui,sans-serif">${escapeHtml(textBody)}</pre>`,
    }).catch((err) => console.error("[contact] SES:", err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
