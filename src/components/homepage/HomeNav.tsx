"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Analytics } from "@/lib/analytics";

const LOGIN_URL = "https://app.xsee.io/login";

/** Matches verified export `Nav` — Platform / Engines / Why us / Pricing / Docs + Sign in / Free scan / Get a demo */
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 inset-x-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "bg-[var(--hp-base)]/85 backdrop-blur-md border-b border-[var(--hp-line)]"
          : "bg-[var(--hp-base)] border-b border-transparent"
      }`}
    >
      <div
        className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4"
        style={{ paddingLeft: "clamp(24px, 5vw, 40px)", paddingRight: "clamp(24px, 5vw, 40px)" }}
      >
        <Link href="/#top" className="flex shrink-0 items-center gap-2.5" aria-label="XSEE home">
          <Image
            src="/logo-symbol-only.svg"
            width={18}
            height={18}
            alt=""
            className="h-[18px] w-[18px] shrink-0"
            style={{ background: "transparent" }}
          />
          <span className="text-[15px] font-semibold tracking-[0.02em] text-[var(--hp-ink)]">XSEE</span>
          <span
            className="hp-mono ml-1.5 hidden border-l border-[var(--hp-line)] pl-2.5 text-[10.5px] text-[var(--hp-ink3)] lg:inline"
            style={{ letterSpacing: "0.14em", paddingLeft: 10, marginLeft: 6 }}
          >
            CLOUD ATTACK INTELLIGENCE
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[13px] text-[var(--hp-ink2)] transition-colors hover:text-[var(--hp-ink)]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={LOGIN_URL}
            className="hidden items-center gap-1.5 text-[12px] text-[var(--hp-ink3)] transition-colors hover:text-[var(--hp-ink)] lg:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/free-scan"
            className="hidden h-[34px] items-center gap-1.5 rounded-[8px] border border-[var(--hp-line)] text-[13px] text-[var(--hp-ink2)] transition-colors hover:border-[var(--hp-line2)] hover:text-[var(--hp-ink)] sm:inline-flex"
            style={{ paddingLeft: 14, paddingRight: 14 }}
            onClick={() => Analytics.ctaClicked("nav", "free_scan")}
          >
            Free scan
          </Link>
          <Link
            href="/demo"
            className="inline-flex h-[34px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[8px] bg-[var(--hp-ink)] text-[13px] font-medium transition-colors hover:bg-white"
            style={{ color: "var(--hp-base)", paddingLeft: 14, paddingRight: 14 }}
            onClick={() => Analytics.ctaClicked("nav", "get_demo")}
          >
            Get a demo
            <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden style={{ color: "var(--hp-base)" }} />
          </Link>
        </div>
      </div>
    </header>
  );
}
