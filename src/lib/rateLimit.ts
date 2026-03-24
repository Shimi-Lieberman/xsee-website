const rateLimitMap = new Map<string, {
  count: number;
  resetTime: number
}>()

export function rateLimit(
  request: Request,
  options: {
    limit: number      // max requests
    windowMs: number   // time window in ms
    identifier?: string // custom identifier
  }
): { success: boolean; remaining: number } {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = (forwarded?.split(',')[0]?.trim())
    ?? request.headers.get('x-real-ip')
    ?? 'unknown'

  const key = options.identifier
    ? `${ip}:${options.identifier}`
    : ip

  const now = Date.now()
  const windowData = rateLimitMap.get(key)

  if (!windowData || now > windowData.resetTime) {
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
