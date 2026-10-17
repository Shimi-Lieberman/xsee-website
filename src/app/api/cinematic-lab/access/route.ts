import { cookies } from "next/headers";
import { LAB_COOKIE, labKeyDigest, labKeyMatches } from "@/lib/cinematic/access.server";
import { rateLimit } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const limited = rateLimit(request, { limit: 5, windowMs: 15 * 60 * 1000 });
  if (!limited.success) return Response.json({ error: "Too many attempts. Try again later." }, { status: 429 });

  const body = (await request.json().catch(() => null)) as { key?: unknown } | null;
  const key = typeof body?.key === "string" ? body.key : "";
  if (!labKeyMatches(key)) return Response.json({ error: "That key is not valid." }, { status: 401 });

  const jar = await cookies();
  jar.set(LAB_COOKIE, labKeyDigest(key), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return new Response(null, { status: 204 });
}
