"use client";

import Link from "next/link";
import SiteLogo from "@/components/SiteLogo";

const REGISTER_URL = "https://app.xsee.io/register";
const LOGIN_URL = "https://app.xsee.io/login";

export default function Nav() {
  return (
    <nav
      id="nav"
      style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
    >
      <div className="container">
        <div className="nav-inner">
          <SiteLogo />
          <nav className="nav-links">
            <Link href="/#how" className="nav-link">
              Platform
            </Link>
            <Link href="/#engines" className="nav-link">
              Engines
            </Link>
            <Link href="/#compare" className="nav-link">
              Why Us
            </Link>
            <Link href="/free-scan" className="nav-link">
              Free Scan
            </Link>
            <Link href="/#pricing" className="nav-link">
              Pricing
            </Link>
            <Link href="/#contact" className="nav-link">
              Contact
            </Link>
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
              >
                Book a Demo
              </Link>
              <Link href={REGISTER_URL} className="nav-btn-trial">
                Start Free Trial →
              </Link>
              <Link href={LOGIN_URL} className="nav-btn-launch">
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
