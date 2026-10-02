/**
 * Server-side calls from this marketing site into the product (app.xsee.io).
 *
 * The browser never fetches the platform origin — it only navigates there via
 * ordinary links (login, register). The only site→app hop is these server
 * routes, which is the same pattern Stripe, Linear, and Sentry use: the
 * marketing origin talks to the product API over a shared secret, never from
 * the visitor's browser.
 *
 * The platform endpoints currently accept unauthenticated writes, so the
 * validation and rate limiting in the site routes can be skipped by posting
 * to app.xsee.io directly. Once the platform requires a credential, set
 * XSEE_PLATFORM_API_TOKEN and these helpers already send it.
 */

export const PLATFORM_API_BASE =
  process.env.XSEE_PLATFORM_API_URL?.replace(/\/$/, "") ?? "https://app.xsee.io";

export function platformAuthHeaders(): Record<string, string> {
  const token = process.env.XSEE_PLATFORM_API_TOKEN?.trim();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
