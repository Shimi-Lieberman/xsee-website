import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureMarketingSchema } from "@/lib/marketingSchema";
import { sendEmail, getAdminEmail } from "@/lib/ses";
import { isValidEmail } from "@/lib/validation";
import { rateLimit, isDisposableEmail } from "@/lib/rateLimit";
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
  const rl = rateLimit(request, { limit: LIMIT, windowMs: WINDOW_MS, identifier: "contact" });
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

    const name = asString(body.full_name) || asString(body.name);
    const email = asString(body.email) || asString(body.work_email);
    const message = asString(body.message);
    const source = asString(body.source) || "footer";

    const overlong = firstOverlongField({
      name: { value: name, max: FIELD_LIMITS.name },
      email: { value: email, max: FIELD_LIMITS.email },
      message: { value: message, max: FIELD_LIMITS.message },
      source: { value: source, max: FIELD_LIMITS.source },
    });
    if (overlong) {
      console.warn(`[contact] rejected overlong field: ${overlong}`);
      return NextResponse.json({ error: "Field too long" }, { status: 400 });
    }

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

    try {
      await sendEmail({
        to: getAdminEmail(),
        subject: `Contact Form — ${name}`,
        text: textBody,
        html: `<pre style="font-family:system-ui,sans-serif">${escapeHtml(textBody)}</pre>`,
      });
    } catch (emailErr) {
      console.error(
        "[contact] Email failed:",
        emailErr instanceof Error ? emailErr.message : emailErr
      );
      // Do not rethrow — DB insert succeeded
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
