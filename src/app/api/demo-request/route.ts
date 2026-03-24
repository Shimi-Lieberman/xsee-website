import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { isValidEmail } from "@/lib/validation";
import { rateLimit, isValidWorkEmail } from "@/lib/rateLimit";

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const LIMIT = 2;

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

    const name = (body.fullName ?? body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const company = (body.company ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (!isValidWorkEmail(email)) {
      return NextResponse.json(
        { error: "Please use your work email address." },
        { status: 400 }
      );
    }
    if (!company) {
      return NextResponse.json({ error: "Company is required" }, { status: 400 });
    }

    const extra =
      body.cloudProvider || body.assetCount
        ? `Cloud: ${body.cloudProvider ?? "-"}, Assets: ${body.assetCount ?? "-"}\n\n${message}`
        : message;

    const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      ?? request.headers.get("x-real-ip")
      ?? null;
    const userAgent = request.headers.get("user-agent") ?? null;

    const sql = getSql();
    await sql`
      INSERT INTO demo_requests (name, email, company, message, ip_address, user_agent)
      VALUES (${name}, ${email}, ${company}, ${extra}, ${ipAddress}, ${userAgent})
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Demo request error:", err);
    return NextResponse.json(
      { error: "Failed to submit demo request" },
      { status: 500 }
    );
  }
}
