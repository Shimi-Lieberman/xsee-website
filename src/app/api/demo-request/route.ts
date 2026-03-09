import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, company, cloudProvider, assetCount, message } =
      body;

    if (!fullName || !email || !company || !cloudProvider || !assetCount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const submission = {
      fullName,
      email,
      company,
      cloudProvider,
      assetCount,
      message: message || "",
      submittedAt: new Date().toISOString(),
    };

    // Store in JSON file (v1 - can add Resend email later)
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "demo-requests.json");

    try {
      await mkdir(dataDir, { recursive: true });
      let submissions: typeof submission[] = [];
      try {
        const existing = await readFile(filePath, "utf-8");
        submissions = JSON.parse(existing);
      } catch {
        // File doesn't exist yet
      }
      submissions.push(submission);
      await writeFile(filePath, JSON.stringify(submissions, null, 2));
    } catch (err) {
      console.error("Error storing demo request:", err);
      // Still return success - we don't want to block the user
    }

    // Log for dev visibility
    console.log("[Demo Request]", submission);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Demo request error:", error);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 500 }
    );
  }
}
