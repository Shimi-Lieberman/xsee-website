"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Analytics } from "@/lib/analytics";

const LOGIN_URL = "https://app.xsee.io/login";

const NAV_LINKS = [
  { href: "/#proof", label: "Platform" },
  { href: "/#engines", label: "Engines" },
  { href: "/#compare", label: "Why us" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/changelog", label: "Docs" },
] as const;

export default function HomeNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="v2-polish fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: scrolled ? "saturate(160%) blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(160%) blur(14px)" : "none",
          background: scrolled ? "rgba(6, 8, 15, 0.72)" : "transparent",
          borderBottom: scrolled ? "1px solid #11151F" : "1px solid transparent",
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
              className="btn-pink inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium text-[var(--v2-ink)]"
              onClick={() => Analytics.ctaClicked("nav", "free_breach_report")}
            >
              Free breach report
              <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
            </Link>
          </div>
        </div>
      </header>
      {/* Reserve space — fixed header is out of document flow */}
      <div className="h-[64px] shrink-0" aria-hidden />
    </>
  );
}
