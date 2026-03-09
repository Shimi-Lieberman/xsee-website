"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#product", label: "Product" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out ${
        scrolled ? "bg-white" : "bg-transparent"
      }`}
      style={
        scrolled
          ? { boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }
          : undefined
      }
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={`text-xl font-bold transition-colors ${
            scrolled ? "text-[#0F172A]" : "text-white"
          }`}
        >
          XSEE
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:opacity-80 ${
                scrolled
                  ? "text-[#64748B] hover:text-[#0F172A]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="rounded-xl bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(59,130,246,0.35)] transition-all duration-300 hover:bg-[#2563EB] hover:shadow-[0_4px_12px_rgba(59,130,246,0.4)]"
          >
            Request Demo
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden rounded-lg p-2 ${
            scrolled ? "text-[#0F172A]" : "text-white"
          }`}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile slide-in panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.2 }}
            className="fixed inset-y-0 right-0 top-16 z-40 w-full max-w-sm border-l border-gray-200 bg-white shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-[#0F172A] font-medium hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-xl bg-[#3B82F6] px-4 py-3 text-center font-semibold text-white hover:bg-[#2563EB]"
              >
                Request Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
