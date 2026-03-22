import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { isValidEmail } from "@/lib/validation";

const ARN_REGEX = /^arn:aws:iam::/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = (body.fullName ?? body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const company = (body.company ?? "").trim();
    const awsRoleArn = (body.awsRoleArn ?? "").trim();
    const awsRegion = (body.awsRegion ?? "us-east-1").trim();

    if (!name) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (!company) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }
    if (!awsRoleArn) {
      return NextResponse.json({ error: "AWS Role ARN is required" }, { status: 400 });
    }
    if (!ARN_REGEX.test(awsRoleArn)) {
      return NextResponse.json({ error: "AWS Role ARN must start with arn:aws:iam::" }, { status: 400 });
    }

    const message = JSON.stringify({
      scan_type: "free_scan",
      aws_role_arn: awsRoleArn,
      aws_region: awsRegion,
    });

    const sql = getSql();
    await sql`
      INSERT INTO demo_requests (name, email, company, message)
      VALUES (${name}, ${email}, ${company}, ${message})
    `;
    return NextResponse.json({ success: true, message: "Scan queued" });
  } catch (err) {
    console.error("Free scan error:", err);
    return NextResponse.json(
      { error: "Failed to submit scan request" },
      { status: 500 }
    );
  }
}
