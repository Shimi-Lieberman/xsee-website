import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";

const PLATFORM_API_BASE =
  process.env.XSEE_PLATFORM_API_URL?.replace(/\/$/, "") ?? "https://app.xsee.io";

/**
 * This route proxies unauthenticated callers into the platform API, so it is
 * metered and the id is format-checked. Without the format check an arbitrary
 * string is interpolated into the upstream path; without the limit the route
 * doubles as an enumeration oracle and a DoS amplifier toward app.xsee.io.
 */
const WINDOW_MS = 5 * 60 * 1000;
const LIMIT = 30;

/** Scan ids are UUIDs; reject anything else before touching the upstream. */
const SCAN_ID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type RouteContext = { params: Promise<{ scan_id: string }> };

export async function GET(request: Request, context: RouteContext) {
  const rl = rateLimit(request, {
    limit: LIMIT,
    windowMs: WINDOW_MS,
    identifier: "free-scan-status",
  });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const { scan_id } = await context.params;
  if (!scan_id || !SCAN_ID_REGEX.test(scan_id)) {
    return NextResponse.json({ error: "Invalid scan_id" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${PLATFORM_API_BASE}/v1/free-scan/status/${encodeURIComponent(scan_id)}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      }
    );
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
