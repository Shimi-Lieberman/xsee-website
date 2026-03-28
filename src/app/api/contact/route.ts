import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { isValidEmail } from "@/lib/validation";
import { rateLimit, isDisposableEmail } from "@/lib/rateLimit";

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const LIMIT = 3;

export async function POST(request: Request) {
  const rl = rateLimit(request, { limit: LIMIT, windowMs: WINDOW_MS });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Honeypot: if website field has any value, silently succeed
    if (body.website?.trim()) {
      return NextResponse.json({ success: true });
    }

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    let message = (body.message ?? "").trim();
    const emergency = body.emergency === true || body.source === "emergency";
    if (emergency && !message.startsWith("[EMERGENCY]")) {
      message = `[EMERGENCY] XSEE incident response request\n\n${message}`;
    }

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (isDisposableEmail(email)) {
      return NextResponse.json({ error: "Please use a valid email address." }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const sql = getSql();
    await sql`
      INSERT INTO contact_submissions (name, email, message)
      VALUES (${name}, ${email}, ${message})
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
