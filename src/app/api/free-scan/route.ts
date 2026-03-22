import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { isValidEmail } from "@/lib/validation";

const ARN_REGEX = /^arn:aws:iam::/;

/** Platform API base (no trailing slash). Override in env for staging. */
const PLATFORM_API_BASE =
  process.env.XSEE_PLATFORM_API_URL?.replace(/\/$/, "") ?? "https://app.xsee.io";

type PlatformSubmitBody = {
  name: string;
  email: string;
  company: string;
  role_arn: string;
  region: string;
};

async function forwardToPlatform(body: PlatformSubmitBody): Promise<{
  ok: boolean;
  scan_id?: string;
}> {
  try {
    const res = await fetch(`${PLATFORM_API_BASE}/v1/free-scan/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.warn("Free scan platform submit non-OK:", res.status);
      return { ok: false };
    }
    const data = (await res.json().catch(() => ({}))) as {
      scan_id?: string;
      status?: string;
    };
    return { ok: true, scan_id: data.scan_id };
  } catch (err) {
    console.warn("Free scan platform submit failed:", err);
    return { ok: false };
  }
}

async function saveToNeon(
  name: string,
  email: string,
  company: string,
  awsRoleArn: string,
  awsRegion: string
): Promise<boolean> {
  try {
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
    return true;
  } catch (err) {
    console.error("Free scan Neon insert failed:", err);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = (body.fullName ?? body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const company = (body.company ?? "").trim();
    const awsRoleArn = (body.awsRoleArn ?? body.role_arn ?? "").trim();
    const awsRegion = (body.awsRegion ?? body.region ?? "us-east-1").trim();

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
      return NextResponse.json(
        { error: "AWS Role ARN must start with arn:aws:iam::" },
        { status: 400 }
      );
    }

    const platformPayload: PlatformSubmitBody = {
      name,
      email,
      company,
      role_arn: awsRoleArn,
      region: awsRegion,
    };

    const platform = await forwardToPlatform(platformPayload);
    const neonOk = await saveToNeon(name, email, company, awsRoleArn, awsRegion);

    if (!platform.ok && !neonOk) {
      return NextResponse.json(
        { error: "Failed to submit scan request" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      ...(platform.scan_id ? { scan_id: platform.scan_id } : {}),
    });
  } catch (err) {
    console.error("Free scan error:", err);
    return NextResponse.json(
      { error: "Failed to submit scan request" },
      { status: 500 }
    );
  }
}
