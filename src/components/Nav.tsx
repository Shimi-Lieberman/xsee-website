"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import SiteLogo from "@/components/SiteLogo";
import { Analytics } from "@/lib/analytics";

const REGISTER_URL = "https://app.xsee.io/register";
const LOGIN_URL = "https://app.xsee.io/login";

const NAV_LINKS = [
  { href: "/#how", label: "Platform" },
  { href: "/#engines", label: "Engines" },
  { href: "/#compare", label: "Why Us" },
  { href: "/free-scan", label: "Free Scan" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
] as const;

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close on resize up to desktop, dismiss with Escape, and lock scroll while open
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

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
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="nav-status hidden md:flex items-center gap-1.5 text-[11px] text-[#5b6577] mr-2">
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
              className="nav-signin text-sm text-[#475569] hover:text-[#0b1220] transition-colors px-3 py-2.5 min-h-[44px] items-center hidden md:inline-flex"
            >
              Sign in
            </Link>
            <div className="nav-cta-group">
              <Link
                href="/#contact"
                className="nav-cta-demo inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white no-underline transition-opacity hover:opacity-90"
                onClick={() => Analytics.ctaClicked("nav", "book_demo")}
              >
                Get a demo
              </Link>
              <Link href={REGISTER_URL} className="nav-btn-trial btn-shimmer">
                Start Free Trial →
              </Link>
              <Link href={LOGIN_URL} className="nav-btn-launch">
                Launch App
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-nav-panel"
              className="nav-burger"
            >
              {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>
        {/* Tablet: compact wrapped link row (hidden on phones, which use the panel below) */}
        <div className="nav-mobile-links hidden max-[1024px]:flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2 border-t border-[rgba(11,18,32,0.08)] -mx-4 px-4 sm:mx-0 sm:px-0">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={`m-${href}`}
              href={href}
              className="nav-link text-xs"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Phone slide-down menu: holds the links and secondary actions the bar cannot fit */}
      <div id="site-nav-panel" className="nav-mobile-panel" data-open={menuOpen ? "true" : "false"}>
        <div className="nav-mobile-panel-inner">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={`p-${href}`} href={href} onClick={closeMenu} className="nav-mobile-panel-link">
              {label}
            </Link>
          ))}
          <Link href="/under-attack" onClick={closeMenu} className="nav-mobile-panel-link nav-mobile-panel-urgent">
            <span className="nav-emergency-dot" />
            Under Attack?
          </Link>
          <div className="nav-mobile-panel-actions">
            <Link href={REGISTER_URL} onClick={closeMenu} className="nav-mobile-panel-cta">
              Start Free Trial →
            </Link>
            <Link href={LOGIN_URL} onClick={closeMenu} className="nav-mobile-panel-link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
