"use client";

import Link from "next/link";
import SiteLogo from "@/components/SiteLogo";
import { Analytics } from "@/lib/analytics";

const REGISTER_URL = "https://app.xsee.io/register";
const LOGIN_URL = "https://app.xsee.io/login";

const NAV_LINKS = [
  { href: "/#how", label: "Platform" },
  { href: "/#engines", label: "Engines" },
  { href: "/#compare", label: "Why Us" },
  { href: "/free-scan", label: "Free Scan" },
  { href: "/demo", label: "Demo" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
] as const;

export default function Nav() {
  return (
    <nav id="nav">
      <div className="container">
        <div className="nav-inner">
          <SiteLogo />
          <nav className="nav-links">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="nav-link"
                onClick={
                  label === "Demo" ? () => Analytics.ctaClicked("nav", "demo_link") : undefined
                }
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-white/30 mr-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All systems operational
          </div>
          <div className="nav-actions">
            <Link href="/under-attack" className="nav-emergency">
              <span className="nav-emergency-dot" />
              Under Attack?
            </Link>
            <Link
              href={LOGIN_URL}
              className="text-sm text-white/55 hover:text-white transition-colors px-3 py-1.5 hidden md:block"
            >
              Sign in
            </Link>
            <div className="nav-cta-group">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white/80 transition-all duration-200 hover:border-white/40 hover:bg-white/5 hover:text-white"
                onClick={() => Analytics.ctaClicked("nav", "book_demo")}
              >
                Book a Demo
              </Link>
              <Link href={REGISTER_URL} className="nav-btn-trial btn-shimmer">
                Start Free Trial →
              </Link>
              <Link href={LOGIN_URL} className="nav-btn-launch">
                Launch App
              </Link>
            </div>
          </div>
        </div>
        {/* Mobile: nav-links hidden below lg in globals; mirror links here */}
        <div className="nav-mobile-links hidden max-[1024px]:flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2 border-t border-white/[0.06] -mx-4 px-4 sm:mx-0 sm:px-0">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={`m-${href}`}
              href={href}
              className="nav-link text-xs py-1 px-2"
              onClick={
                label === "Demo" ? () => Analytics.ctaClicked("nav", "demo_link") : undefined
              }
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
