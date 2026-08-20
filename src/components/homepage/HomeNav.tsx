"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Analytics } from "@/lib/analytics";

const LOGIN_URL = "https://app.xsee.io/login";

/** v2 nav labels — hrefs preserved from prior mapping where sections exist */
const NAV_LINKS = [
  { href: "/#proof", label: "Product" },
  { href: "/#how", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/changelog", label: "Docs" },
] as const;

/** Matches AnnouncementBar height (h-9) */
const ANNOUNCEMENT_OFFSET_PX = 36;

export default function HomeNav() {
  const [scrolled, setScrolled] = useState(false);
  const [pastAnnouncement, setPastAnnouncement] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setPastAnnouncement(y > ANNOUNCEMENT_OFFSET_PX);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when resizing up to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header
        className="v2-polish fixed inset-x-0 z-50 transition-all duration-300"
        style={{
          top: pastAnnouncement ? 0 : ANNOUNCEMENT_OFFSET_PX,
          backdropFilter: scrolled ? "saturate(160%) blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(160%) blur(14px)" : "none",
<<<<<<< HEAD
          background: scrolled ? "rgba(255, 255, 255, 0.85)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(11, 18, 32, 0.08)" : "1px solid transparent",
=======
          background: scrolled ? "rgba(247, 249, 252, 0.85)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(11, 18, 32, 0.08)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 24px rgba(11, 18, 32, 0.06)" : "none",
>>>>>>> origin/main
        }}
      >
        <div className="mx-auto box-border flex h-[64px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
          <Link href="/#top" className="group flex shrink-0 items-center gap-2.5" aria-label="XSEE home">
            <Image
              src="/logo-symbol-only.svg"
              width={22}
              height={22}
              alt=""
              className="h-[22px] w-[22px] shrink-0 transition-transform duration-300 group-hover:rotate-3"
              style={{ background: "transparent" }}
            />
            <span className="text-[15px] font-semibold tracking-tight text-[var(--v2-ink)]">xsee</span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[13.5px] text-[var(--v2-ink2)] transition-colors duration-200 hover:text-[var(--v2-ink)]"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href={LOGIN_URL}
              className="hidden px-3 py-2 text-[13px] text-[var(--v2-ink2)] transition-colors duration-200 hover:text-[var(--v2-ink)] sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/free-scan"
              className="btn-pink inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium text-white"
              onClick={() => Analytics.ctaClicked("nav", "free_breach_report")}
            >
              Free breach report
              <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--v2-line)] text-[var(--v2-ink2)] transition-colors duration-200 hover:text-[var(--v2-ink)] md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down panel */}
        <div
          id="mobile-nav-panel"
          className="overflow-hidden border-[var(--v2-line)] transition-[max-height,opacity] duration-300 ease-out md:hidden"
          style={{
            maxHeight: menuOpen ? 320 : 0,
            opacity: menuOpen ? 1 : 0,
            borderTopWidth: menuOpen ? 1 : 0,
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "saturate(160%) blur(14px)",
            WebkitBackdropFilter: "saturate(160%) blur(14px)",
          }}
        >
          <nav className="mx-auto flex max-w-[1400px] flex-col gap-1 px-6 py-4" aria-label="Mobile">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-[15px] text-[var(--v2-ink2)] transition-colors duration-200 hover:bg-[var(--v2-line)] hover:text-[var(--v2-ink)]"
              >
                {label}
              </Link>
            ))}
            <Link
              href={LOGIN_URL}
              onClick={() => setMenuOpen(false)}
              className="mt-1 rounded-lg border-t border-[var(--v2-line)] px-3 pb-3 pt-4 text-[15px] text-[var(--v2-ink2)] transition-colors duration-200 hover:text-[var(--v2-ink)]"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>
      <div className="h-[64px] shrink-0" aria-hidden />
    </>
  );
}
