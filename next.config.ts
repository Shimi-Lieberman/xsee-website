import type { NextConfig } from "next";

const cspDenyFrame =
  "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://cdn.paddle.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://app.xsee.io https://api.anthropic.com https://api.paddle.com; frame-src https://buy.paddle.com https://customer-portal.paddle.com; frame-ancestors 'none';";

/** Same as global CSP but allows same-origin iframes (e.g. /xsee-demo.html on /demo). */
const cspDemoPage = cspDenyFrame.replace(
  "frame-src https://buy.paddle.com https://customer-portal.paddle.com",
  "frame-src 'self' https://buy.paddle.com https://customer-portal.paddle.com"
);

const securityHeadersBase = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          ...securityHeadersBase,
          { key: "Content-Security-Policy", value: cspDenyFrame },
        ],
      },
      {
        source: "/demo",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspDemoPage,
          },
        ],
      },
      {
        source: "/xsee-demo.html",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
