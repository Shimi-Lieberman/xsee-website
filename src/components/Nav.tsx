"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LOGO_DARK } from "@/lib/logo";

/** Enterprise nav structure — dropdown-ready for future mega menus */
const NAV_ITEMS = [
  {
    label: "Platform",
    href: "#product",
    children: [
      { label: "Attack Path Intelligence", href: "#product" },
      { label: "Cloud Graph", href: "#product" },
      { label: "Reports Center", href: "#product" },
      { label: "Continuous Monitoring", href: "#product" },
    ],
  },
  {
    label: "Solutions",
    href: "#how-it-works",
    children: [
      { label: "Cloud Exposure Management", href: "#how-it-works" },
      { label: "Attack Path Analysis", href: "#how-it-works" },
      { label: "Executive Reporting", href: "#how-it-works" },
      { label: "Compliance Visibility", href: "#how-it-works" },
    ],
  },
  {
    label: "Why Xsee",
    href: "#how-it-works",
    children: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Why Xsee", href: "#how-it-works" },
      { label: "Architecture", href: "#how-it-works" },
      { label: "Differentiators", href: "#how-it-works" },
    ],
  },
  {
    label: "Resources",
    href: "#",
    children: [
      { label: "Blog", href: "#" },
      { label: "Docs", href: "#" },
      { label: "Reports", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    label: "Pricing",
    href: "#pricing",
    children: [{ label: "Pricing Overview", href: "#pricing" }],
  },
];

const HEADER_HEIGHT_PX = 80;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  const linkClass = (isScrolled: boolean) =>
    `text-sm font-medium transition-colors hover:opacity-90 ${
      isScrolled ? "text-[#64748B] hover:text-[#0F172A]" : "text-white/90 hover:text-white"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out ${
        scrolled ? "bg-white" : "bg-transparent"
      }`}
      style={
        scrolled
          ? { boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }
          : undefined
      }
    >
      <div
        className="header-inner mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 sm:px-8 lg:px-10"
        style={{ height: HEADER_HEIGHT_PX }}
      >
        {/* Left: logo when over hero (dark); home link when scrolled (no logo on white) */}
        {!scrolled ? (
          <Link
            href="/"
            className="logo-container flex shrink-0 items-center transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg"
            aria-label="XSEE Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_DARK.src}
              alt={LOGO_DARK.alt}
              width={LOGO_DARK.width}
              height={LOGO_DARK.height}
              className="block h-12 w-auto max-h-14 object-contain object-left select-none"
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.25))" }}
              fetchPriority="high"
            />
          </Link>
        ) : (
          <Link
            href="/"
            className="text-lg font-semibold text-[#0F172A] hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 focus:ring-offset-2 rounded-lg px-1"
            aria-label="XSEE Home"
          >
            XSEE
          </Link>
        )}

        {/* Center-left: desktop nav */}
        <div className="hidden lg:flex lg:items-center lg:gap-1 xl:gap-2" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className={`inline-flex items-center gap-0.5 rounded-md px-3 py-2 ${linkClass(scrolled)}`}
              >
                {item.label}
                {item.children?.length ? (
                  <svg className="ml-0.5 h-3.5 w-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                ) : null}
              </Link>
              {item.children?.length ? (
                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      ref={dropdownRef}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full pt-1"
                    >
                      <div className="min-w-[220px] rounded-lg border border-slate-200 bg-white py-1.5 shadow-lg">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-[#0F172A] hover:bg-slate-50"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : null}
            </div>
          ))}
        </div>

        {/* Right: CTAs */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="#"
            className={`hidden md:inline-flex text-sm font-medium ${linkClass(scrolled)}`}
          >
            Login
          </Link>
          <Link
            href="#contact"
            className="btn-nav-cta hidden md:inline-flex h-10 shrink-0 items-center rounded-lg bg-[#3B82F6] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB]"
          >
            Request Demo
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden rounded-lg p-2.5 ${scrolled ? "text-[#0F172A]" : "text-white"}`}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.2 }}
            className="fixed inset-y-0 right-0 z-40 w-full max-w-sm border-l border-slate-200 bg-white shadow-xl lg:hidden"
            style={{ top: HEADER_HEIGHT_PX }}
          >
            <div className="flex flex-col gap-0.5 overflow-y-auto p-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-4 py-3 text-[#0F172A] font-medium hover:bg-slate-50"
                  >
                    {item.label}
                  </Link>
                  {item.children?.length ? (
                    <div className="ml-4 flex flex-col border-l border-slate-100 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-lg py-2 pl-2 text-sm text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
                <Link
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-center font-medium text-[#64748B] hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-nav-cta rounded-lg bg-[#3B82F6] px-4 py-3 text-center font-semibold text-white hover:bg-[#2563EB]"
                >
                  Request Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
