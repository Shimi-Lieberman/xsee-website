"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import SiteLogo from "@/components/SiteLogo";
import { Analytics } from "@/lib/analytics";

const LOGIN_URL = "https://app.xsee.io/login";

const NAV_LINKS = [
  { href: "/product", label: "Product" },
  { href: "/#workflow", label: "Workflow" },
  { href: "/#outcomes", label: "Outcomes" },
  { href: "/security", label: "Security" },
  { href: "/changelog", label: "Changelog" },
] as const;

const DEMO_URL = "mailto:sales@xsee.io?subject=Book%20an%20XSEE%20demo";

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
          <div className="nav-actions">
            <Link
              href={LOGIN_URL}
              className="nav-signin text-sm text-[#475569] hover:text-[#0b1220] transition-colors px-3 py-2.5 min-h-[44px] items-center hidden md:inline-flex"
            >
              Sign in
            </Link>
            <div className="nav-cta-group">
              <Link
                href={DEMO_URL}
                className="nav-cta-demo inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white no-underline transition-opacity hover:opacity-90"
                onClick={() => Analytics.ctaClicked("nav", "book_demo")}
              >
                Book a demo
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
      </div>

      {/* Phone slide-down menu: holds the links and secondary actions the bar cannot fit */}
      <div id="site-nav-panel" className="nav-mobile-panel" data-open={menuOpen ? "true" : "false"}>
        <div className="nav-mobile-panel-inner">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={`p-${href}`} href={href} onClick={closeMenu} className="nav-mobile-panel-link">
              {label}
            </Link>
          ))}
          <div className="nav-mobile-panel-actions">
            <Link href={DEMO_URL} onClick={closeMenu} className="nav-mobile-panel-cta">
              Book a demo →
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
