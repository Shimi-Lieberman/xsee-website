"use client";

import Link from "next/link";
import Image from "next/image";
import { Analytics } from "@/lib/analytics";

export default function Footer() {
  return (
    <footer style={{ background: "#030710", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
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
                style={{
                  background: "transparent",
                  filter:
                    "brightness(0) saturate(100%) invert(19%) sepia(99%) saturate(7478%) hue-rotate(316deg) brightness(103%) contrast(101%)",
                }}
              />
            </span>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span
                style={{
                  color: "white",
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
                  color: "rgba(255,255,255,0.38)",
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
          <p className="text-base leading-relaxed max-w-md mb-5 text-white/55">
            Discover. Validate. Simulate. Fix. Certify. Built for the age of AI attackers.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All Systems Operational
          </div>
        </div>

        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.38)",
              marginBottom: "16px",
            }}
          >
            Product
          </div>
          {[
            { label: "How It Works", href: "/#how" },
            { label: "Engines", href: "/#engines" },
            { label: "Pricing", href: "/#pricing" },
            { label: "Changelog", href: "/changelog" },
            { label: "Free Scan", href: "/free-scan" },
            { label: "Under Attack?", href: "/under-attack" },
            { label: "vs. Wiz", href: "/vs-wiz" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block mb-2.5 text-[13px] text-white/45 transition-colors hover:text-white/75 max-sm:min-h-[44px] max-sm:flex max-sm:items-center"
              onClick={
                link.label === "Free Scan"
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
              color: "rgba(255,255,255,0.38)",
              marginBottom: "16px",
            }}
          >
            Company
          </div>
          {[
            { label: "About", href: "#" },
            { label: "Security", href: "/security" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Contact", href: "/#contact" },
            { label: "sales@xsee.io", href: "mailto:sales@xsee.io" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block mb-2.5 text-[13px] text-white/45 transition-colors hover:text-white/75 max-sm:min-h-[44px] max-sm:flex max-sm:items-center"
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
              color: "rgba(255,255,255,0.38)",
              marginBottom: "16px",
            }}
          >
            Resources
          </div>
          {[
            { label: "Documentation", href: "#" },
            { label: "API Reference", href: "#" },
            { label: "Status", href: "#" },
            { label: "Terms", href: "/terms" },
            { label: "Privacy", href: "/privacy" },
            { label: "Refunds", href: "/refunds" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block mb-2.5 text-[13px] text-white/45 transition-colors hover:text-white/75 max-sm:min-h-[44px] max-sm:flex max-sm:items-center"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div
        className="ft-bottom px-6 py-5 max-w-6xl mx-auto w-full flex items-center justify-between flex-wrap gap-4 footer-inner"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)" }}>
          © 2026 XSEE. All rights reserved.
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          {[
            { label: "Terms", href: "/terms" },
            { label: "Privacy", href: "/privacy" },
            { label: "Security", href: "/security" },
            { label: "Refunds", href: "/refunds" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}
              className="hover:text-white/75 transition-colors max-sm:min-h-[44px] max-sm:inline-flex max-sm:items-center"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.32)", fontFamily: "var(--font-mono)" }} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          v1.4.0 · All systems operational
        </div>
      </div>
    </footer>
  );
}
