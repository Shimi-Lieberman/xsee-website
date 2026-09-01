"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <nav id="nav" aria-label="Primary">
      <div className="container">
        <div className="nav-inner">
          <SiteLogo />
          <div className="nav-links">
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
          </div>
          <div className="nav-status hidden md:flex items-center gap-1.5 text-[11px] text-white/45 mr-2">
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
              target="_blank"
              rel="noopener noreferrer"
              className="nav-signin text-sm text-white/65 hover:text-white transition-colors px-3 py-2.5 min-h-[44px] items-center hidden md:inline-flex"
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
              <Link
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-btn-trial btn-shimmer"
              >
                Start Free Trial →
              </Link>
              <Link
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-btn-launch"
              >
                Launch App
              </Link>
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="nav-menu-toggle"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="nav-mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span aria-hidden>{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
        {/* Tablet (769–1024px): nav-links is hidden by CSS, so mirror the links inline. */}
        <div className="nav-mobile-links hidden max-[1024px]:flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2 border-t border-white/[0.06] -mx-4 px-4 sm:mx-0 sm:px-0">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={`m-${href}`}
              href={href}
              className="nav-link text-xs"
              onClick={
                label === "Demo" ? () => Analytics.ctaClicked("nav", "demo_link") : undefined
              }
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Phone (≤768px): overlay panel so the fixed nav height never changes. */}
      <div
        id="nav-mobile-menu"
        className={`nav-mobile-menu ${menuOpen ? "nav-mobile-menu--open" : ""}`}
        hidden={!menuOpen}
      >
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={`menu-${href}`}
            href={href}
            className="nav-mobile-menu-link"
            onClick={() => {
              if (label === "Demo") Analytics.ctaClicked("nav", "demo_link");
              closeMenu();
            }}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/under-attack"
          className="nav-mobile-menu-link nav-mobile-menu-link--emergency"
          onClick={closeMenu}
        >
          Under Attack?
        </Link>
        <Link
          href={LOGIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-mobile-menu-link"
          onClick={closeMenu}
        >
          Sign in
        </Link>
        <Link
          href={LOGIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-mobile-menu-link"
          onClick={closeMenu}
        >
          Launch App
        </Link>
      </div>
    </nav>
  );
}
