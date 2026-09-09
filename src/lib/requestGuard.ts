/**
 * Request body guards for the public intake endpoints.
 *
 * Without these, any unauthenticated caller can POST an arbitrarily large JSON
 * body: the whole payload is buffered in the function, written to Postgres and
 * mailed out. These helpers cap the byte size before parsing and cap individual
 * field lengths before persistence.
 */

/** Ample for the marketing forms — the largest field is a 5 KB message. */
export const MAX_JSON_BYTES = 16 * 1024;

/** Chat carries a short conversation history, so it gets a larger allowance. */
export const MAX_CHAT_JSON_BYTES = 32 * 1024;

export class BodyTooLargeError extends Error {
  constructor() {
    super("Request body too large");
    this.name = "BodyTooLargeError";
  }
}

export class InvalidJsonError extends Error {
  constructor() {
    super("Invalid JSON body");
    this.name = "InvalidJsonError";
  }
}

/**
 * Read and parse a JSON body, refusing anything over `maxBytes`.
 *
 * `content-length` is only a hint (it can be absent or wrong), so the stream is
 * also counted as it is consumed and cancelled the moment it exceeds the cap.
 */
export async function readJsonBody<T = Record<string, unknown>>(
  request: Request,
  maxBytes: number = MAX_JSON_BYTES
): Promise<T> {
  const declared = request.headers.get("content-length");
  if (declared) {
    const size = Number.parseInt(declared, 10);
    if (Number.isFinite(size) && size > maxBytes) {
      throw new BodyTooLargeError();
    }
  }

  const body = request.body;
  let raw: string;

  if (!body) {
    raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > maxBytes) {
      throw new BodyTooLargeError();
    }
  } else {
    const reader = body.getReader();
    const chunks: Uint8Array[] = [];
    let received = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      received += value.byteLength;
      if (received > maxBytes) {
        await reader.cancel().catch(() => {});
        throw new BodyTooLargeError();
      }
      chunks.push(value);
    }

    const merged = new Uint8Array(received);
    let offset = 0;
    for (const chunk of chunks) {
      merged.set(chunk, offset);
      offset += chunk.byteLength;
    }
    raw = new TextDecoder().decode(merged);
  }

  if (!raw.trim()) throw new InvalidJsonError();

  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new InvalidJsonError();
  }
}

/**
 * Coerce an untrusted JSON value to a trimmed string.
 *
 * Fields arrive from unauthenticated callers, so a non-string (object, array,
 * number, null) must not reach `.trim()` and throw — that turns a malformed
 * payload into a 500.
 */
export function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Maximum accepted length per field, in characters. */
export const FIELD_LIMITS = {
  name: 120,
  email: 254,
  company: 200,
  message: 5000,
  phone: 40,
  arn: 2048,
  region: 32,
  source: 64,
  cloudProvider: 64,
  cloudAssets: 64,
} as const;

/**
 * Return the first field that exceeds its limit, or null when all are within
 * bounds. Field names are returned for logging only, never echoed to callers.
 */
export function firstOverlongField(
  fields: Record<string, { value: string; max: number }>
): string | null {
  for (const [name, { value, max }] of Object.entries(fields)) {
    if (value.length > max) return name;
  }
  return null;
}
