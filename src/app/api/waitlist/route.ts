import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { isValidEmail } from "@/lib/validation";
import { rateLimit, isDisposableEmail } from "@/lib/rateLimit";
import {
  asString,
  BodyTooLargeError,
  FIELD_LIMITS,
  readJsonBody,
} from "@/lib/requestGuard";

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
    // Honeypot: if website field has any value, silently succeed
    if (asString(body.website)) {
      return NextResponse.json({ success: true });
    }

    const email = asString(body.email);

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (email.length > FIELD_LIMITS.email) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (isDisposableEmail(email)) {
      return NextResponse.json({ error: "Please use a valid email address." }, { status: 400 });
    }

    const sql = getSql();
    await sql`INSERT INTO waitlist (email) VALUES (${email})`;
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    if (msg.includes("duplicate") || msg.includes("unique")) {
      return NextResponse.json({ success: true });
    }
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}
