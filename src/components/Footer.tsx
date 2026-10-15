"use client";

import Link from "next/link";
import Image from "next/image";
import { Analytics } from "@/lib/analytics";

export default function Footer() {
  return (
    <footer style={{ background: "#eef2f8", borderTop: "1px solid rgba(11,18,32,0.08)" }}>
      <div className="ft-grid max-w-6xl mx-auto w-full px-6 py-12 grid grid-cols-1 gap-10 footer-inner sm:grid-cols-2 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
              textDecoration: "none",
            }}
          >
            <span className="nav-logo-mark-wrap">
              <Image
                src="/logo-symbol-only.svg"
                width={44}
                height={44}
                alt=""
                className="nav-logo-mark"
                style={{ background: "transparent" }}
              />
            </span>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span
                style={{
                  color: "#0b1220",
                  fontWeight: 800,
                  fontSize: "18px",
                  letterSpacing: "0.16em",
                  fontFamily: "var(--font-sans)",
                }}
              >
                XSEE
              </span>
              <span
                style={{
                  color: "#6B7688",
                  fontSize: "7px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginTop: "3px",
                }}
              >
                Cloud Attack Intelligence
              </span>
            </div>
          </Link>
          <p className="text-base leading-relaxed max-w-md mb-5 text-[#3A4658]">
            Discover and validate AWS attack paths. Verify closure with evidence your team can revisit as the environment changes.
          </p>
          <Link
            href="/security"
            className="mb-4 inline-flex text-[13px] font-semibold text-[#3A4658] transition-colors hover:text-[#FF1B8D]"
          >
            Security →
          </Link>
        </div>

        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#6a7388",
              marginBottom: "16px",
            }}
          >
            Product
          </div>
          {[
            { label: "Product", href: "/product" },
            { label: "Workflow", href: "/#workflow" },
            { label: "Outcomes", href: "/#outcomes" },
            { label: "Closure verification", href: "/#closure" },
            { label: "Enterprise pilot", href: "/#pilot" },
            { label: "Changelog", href: "/changelog" },
            { label: "Request assessment", href: "/free-scan" },
            { label: "Under attack?", href: "/under-attack" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block mb-2.5 text-[13px] text-[#3A4658] transition-colors hover:text-[#0b1220] max-sm:min-h-[44px] max-sm:flex max-sm:items-center"
              onClick={
                link.label === "Request assessment"
                  ? () => Analytics.ctaClicked("footer", "free_scan")
                  : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#6a7388",
              marginBottom: "16px",
            }}
          >
            Company
          </div>
          {[
            { label: "About", href: "/about" },
            { label: "Security", href: "/security" },
            { label: "Book a demo", href: "/demo" },
            { label: "sales@xsee.io", href: "mailto:sales@xsee.io" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block mb-2.5 text-[13px] text-[#3A4658] transition-colors hover:text-[#0b1220] max-sm:min-h-[44px] max-sm:flex max-sm:items-center"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#6a7388",
              marginBottom: "16px",
            }}
          >
            Legal
          </div>
          {[
            { label: "Terms of Service", href: "/terms" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Refunds", href: "/refunds" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block mb-2.5 text-[13px] text-[#3A4658] transition-colors hover:text-[#0b1220] max-sm:min-h-[44px] max-sm:flex max-sm:items-center"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div
        className="ft-bottom px-6 py-5 max-w-6xl mx-auto w-full flex items-center justify-between flex-wrap gap-4 footer-inner"
        style={{ borderTop: "1px solid rgba(11,18,32,0.08)" }}
      >
        <div style={{ fontSize: "12px", color: "#6a7388" }}>
          © 2026 XSEE. All rights reserved.
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          {[
            { label: "Changelog", href: "/changelog" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Security", href: "/security" },
            { label: "Refunds", href: "/refunds" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{ fontSize: "12px", color: "#3A4658" }}
              className="hover:text-[#0b1220] transition-colors max-sm:min-h-[44px] max-sm:inline-flex max-sm:items-center"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
