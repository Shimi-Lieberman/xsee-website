import type { NextConfig } from "next";

/**
 * 'unsafe-eval' is only needed by the dev-mode React refresh runtime, so it is
 * omitted from production responses.
 *
 * 'unsafe-inline' is still present for Next.js's inline bootstrap/hydration
 * scripts. Removing it requires per-request nonces via middleware; until that
 * lands, treat CSP as defence-in-depth rather than a complete XSS control.
 */
const isDev = process.env.NODE_ENV !== "production";

/** PostHog serves both its ingestion API and the session-recorder script. */
const POSTHOG_ORIGIN = "https://*.posthog.com";
const CLARITY_ORIGINS = "https://www.clarity.ms https://scripts.clarity.ms https://*.clarity.ms";

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  isDev ? "'unsafe-eval'" : null,
  "https://cdn.paddle.com",
  CLARITY_ORIGINS,
  POSTHOG_ORIGIN,
]
  .filter(Boolean)
  .join(" ");

const appCsp = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.paddle.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://*.clarity.ms",
  `connect-src 'self' https://app.xsee.io https://api.anthropic.com https://api.paddle.com https://cdn.paddle.com ${CLARITY_ORIGINS} ${POSTHOG_ORIGIN}`,
  "frame-src 'self' https://buy.paddle.com https://customer-portal.paddle.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

/**
 * Standalone HTML in /public is served outside the React app. A path-specific
 * header entry REPLACES the global Content-Security-Policy rather than merging
 * with it, so these responses need a complete policy of their own — otherwise
 * they end up with no script/style restrictions at all.
 */
const staticHtmlCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const securityHeadersBase = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
] as const;

const nextConfig: NextConfig = {
  // Do not advertise the framework in every response.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          ...securityHeadersBase,
          { key: "Content-Security-Policy", value: appCsp },
        ],
      },
      {
        source: "/xsee-demo.html",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: staticHtmlCsp },
        ],
      },
      {
        source: "/landing.html",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: staticHtmlCsp },
        ],
      },
      {
        // Never let an intake endpoint response be cached by a shared cache.
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
