import { NextResponse } from "next/server";

const PLATFORM_API_BASE =
  process.env.XSEE_PLATFORM_API_URL?.replace(/\/$/, "") ?? "https://app.xsee.io";

type RouteContext = { params: Promise<{ scan_id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { scan_id } = await context.params;
  if (!scan_id || typeof scan_id !== "string") {
    return NextResponse.json({ error: "scan_id required" }, { status: 400 });
  }

  const encoded = encodeURIComponent(scan_id);
  try {
    const res = await fetch(`${PLATFORM_API_BASE}/v1/free-scan/status/${encoded}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Free scan status proxy error:", err);
    return NextResponse.json(
      { error: "Status temporarily unavailable" },
      { status: 502 }
    );
  }
}
