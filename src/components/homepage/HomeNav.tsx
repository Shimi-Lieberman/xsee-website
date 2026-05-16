"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import SiteLogo from "@/components/SiteLogo";
import { Analytics } from "@/lib/analytics";

const REGISTER_URL = "https://app.xsee.io/register";
const LOGIN_URL = "https://app.xsee.io/login";

const NAV_LINKS = [
  { href: "/#proof", label: "Platform" },
  { href: "/#engines", label: "Engines" },
  { href: "/#compare", label: "Why Us" },
  { href: "/free-scan", label: "Free Scan" },
  { href: "/demo", label: "Demo" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
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
        scrolled ? "bg-[var(--hp-base)]/85 backdrop-blur-md border-b border-[var(--hp-line)]" : "bg-[var(--hp-base)] border-b border-transparent"
      }`}
    >
      <div className="hp-container px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
        <Link href="/#top" className="shrink-0">
          <SiteLogo />
        </Link>
        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[13px] text-[var(--hp-ink2)] hover:text-[var(--hp-ink)] transition-colors"
              onClick={label === "Demo" ? () => Analytics.ctaClicked("nav", "demo_link") : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[var(--hp-ink3)] mr-1">
            <span className="hp-green-dot" style={{ boxShadow: "none" }} />
            All systems operational
          </div>
          <Link href={LOGIN_URL} className="hidden sm:inline text-[13px] text-[var(--hp-ink2)] hover:text-[var(--hp-ink)] transition-colors">
            Sign in
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 h-[34px] px-3.5 rounded-lg bg-[var(--hp-ink)] text-[var(--hp-base)] text-[13px] font-medium hover:opacity-90 transition-opacity"
            onClick={() => Analytics.ctaClicked("nav", "book_demo")}
          >
            Get a demo
            <ArrowRight className="w-3.5 h-3.5" aria-hidden />
          </Link>
          <Link
            href={REGISTER_URL}
            className="hidden xl:inline-flex text-[13px] text-[var(--hp-brand)] hover:opacity-90 transition-opacity"
          >
            Start Free Trial →
          </Link>
        </div>
      </div>
      <div className="lg:hidden border-t border-[var(--hp-line)] px-4 py-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={`m-${href}`} href={href} className="text-[11px] text-[var(--hp-ink2)] hover:text-[var(--hp-ink)]">
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}
