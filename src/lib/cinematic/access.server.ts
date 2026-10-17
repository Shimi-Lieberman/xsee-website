import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const LAB_COOKIE = "xsee_cinematic_lab";

export function labKeyDigest(key: string) {
  return createHash("sha256").update(`xsee-cinematic-lab:${key}`).digest("hex");
}

function matches(candidate: string, expected: string) {
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function labKeyMatches(candidate: string) {
  const key = process.env.CINEMATIC_LAB_KEY;
  return Boolean(key) && matches(labKeyDigest(candidate), labKeyDigest(key!));
}

export async function hasLabAccess() {
  if (process.env.NODE_ENV !== "production") return true;
  const key = process.env.CINEMATIC_LAB_KEY;
  if (!key) return false;
  const jar = await cookies();
  return matches(jar.get(LAB_COOKIE)?.value ?? "", labKeyDigest(key));
}

export function notFoundResponse() {
  return Response.json({ error: "Not found" }, { status: 404 });
}
