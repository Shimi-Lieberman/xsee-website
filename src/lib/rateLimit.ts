/**
 * Best-effort in-process rate limiting.
 *
 * NOTE ON SCOPE: this counter lives in the memory of a single serverless
 * instance, so the effective limit is (limit x warm instances). It raises the
 * cost of abuse but is not a hard guarantee — move to a shared store
 * (Vercel KV / Upstash / Redis) if a strict global limit is required.
 */

const MAX_ENTRIES = 10_000
const SWEEP_INTERVAL_MS = 60_000

const rateLimitMap = new Map<string, {
  count: number;
  resetTime: number
}>()

let lastSweep = 0

/** Drop expired entries so the map cannot grow without bound. */
function sweep(now: number) {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return
  lastSweep = now
  for (const [key, data] of rateLimitMap) {
    if (now > data.resetTime) rateLimitMap.delete(key)
  }
}

/**
 * Resolve the client IP from headers we can actually trust.
 *
 * `x-forwarded-for` is a client-supplied header: anyone can send
 * `X-Forwarded-For: 1.2.3.4` and the leftmost entry is whatever they chose.
 * Vercel sets `x-vercel-forwarded-for` / `x-real-ip` itself and overwrites any
 * inbound value, so those are preferred. When only `x-forwarded-for` is present
 * we take the RIGHTMOST entry, which is the one appended by the closest proxy
 * rather than the one the caller invented.
 */
export function getClientIp(request: Request): string {
  const vercelForwarded = request.headers.get('x-vercel-forwarded-for')?.trim()
  if (vercelForwarded) return vercelForwarded

  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp

  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const parts = forwarded.split(',').map((p) => p.trim()).filter(Boolean)
    const rightmost = parts[parts.length - 1]
    if (rightmost) return rightmost
  }

  return 'unknown'
}

export function rateLimit(
  request: Request,
  options: {
    limit: number      // max requests
    windowMs: number   // time window in ms
    identifier?: string // custom identifier
    /** Extra key material (e.g. submitted email) to limit beyond the IP. */
    subject?: string
  }
): { success: boolean; remaining: number } {
  const ip = getClientIp(request)

  const key = [ip, options.identifier, options.subject]
    .filter(Boolean)
    .join(':')

  const now = Date.now()
  sweep(now)

  const windowData = rateLimitMap.get(key)

  if (!windowData || now > windowData.resetTime) {
    // Under sustained distributed abuse, stop accepting new keys rather than
    // growing the map indefinitely.
    if (!windowData && rateLimitMap.size >= MAX_ENTRIES) {
      return { success: false, remaining: 0 }
    }
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + options.windowMs
    })
    return {
      success: true,
      remaining: options.limit - 1
    }
  }

  if (windowData.count >= options.limit) {
    return { success: false, remaining: 0 }
  }

  windowData.count++
  return {
    success: true,
    remaining: options.limit - windowData.count
  }
}

export function isDisposableEmail(email: string): boolean {
  const disposableDomains = [
    'mailinator.com', 'guerrillamail.com', 'tempmail.com',
    'throwaway.email', 'yopmail.com', '10minutemail.com',
    'trashmail.com', 'fakeinbox.com', 'sharklasers.com',
    'guerrillamailblock.com', 'grr.la', 'guerrillamail.info',
    'spam4.me', 'trashmail.me', 'dispostable.com'
  ]
  const domain = email.split('@')[1]?.toLowerCase()
  return disposableDomains.includes(domain)
}

export function isValidWorkEmail(email: string): boolean {
  const freeEmailDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com',
    'outlook.com', 'icloud.com', 'aol.com',
    'protonmail.com', 'mail.com'
  ]
  const domain = email.split('@')[1]?.toLowerCase()
  return !freeEmailDomains.includes(domain) &&
    !isDisposableEmail(email)
}
