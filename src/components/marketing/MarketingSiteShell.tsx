"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";

const LOGIN_URL = "https://app.xsee.io/login";

export default function MarketingSiteShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="xsee-marketing" data-theme={theme}>
      <a className="marketing-skip-link" href="#main">Skip to content</a>
      <header className="marketing-header">
        <div className="marketing-header-inner">
          <Link href="/#top" className="marketing-brand" aria-label="XSEE home">
            <span className="marketing-brand-mark" aria-hidden="true">X</span>
            <span>XSEE</span>
          </Link>
          <nav className="marketing-nav" aria-label="Main navigation">
            <Link href="/#how-it-works">How it works</Link>
            <Link href="/#proof-points">Proof points</Link>
            <Link href="/#coverage">Coverage roadmap</Link>
          </nav>
          <div className="marketing-header-actions">
            <button
              type="button"
              className="marketing-theme-toggle"
              onClick={() => setTheme((current) => current === "light" ? "dark" : "light")}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            >
              {theme === "light" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
              <span>{theme === "light" ? "Dark" : "Light"}</span>
            </button>
            <Link className="marketing-login" href={LOGIN_URL}>Sign in</Link>
            <Link className="marketing-button marketing-button-primary marketing-header-cta" href="/assessment">
              Request an assessment <ArrowUpRight aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="marketing-menu-toggle"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="marketing-mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
        <nav id="marketing-mobile-nav" className="marketing-mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>
          <Link href="/#how-it-works" onClick={() => setMenuOpen(false)}>How it works</Link>
          <Link href="/#proof-points" onClick={() => setMenuOpen(false)}>Proof points</Link>
          <Link href="/#coverage" onClick={() => setMenuOpen(false)}>Coverage roadmap</Link>
          <Link href={LOGIN_URL} onClick={() => setMenuOpen(false)}>Sign in</Link>
          <Link href="/assessment" onClick={() => setMenuOpen(false)}>Request an assessment</Link>
        </nav>
      </header>
      <main id="main" className="marketing-main">{children}</main>
      <footer className="marketing-footer">
        <div className="marketing-footer-inner">
          <Link className="marketing-footer-brand" href="/#top">XSEE</Link>
          <p>Built for AWS. Deep, not wide.</p>
          <nav aria-label="Footer">
            <Link href="/#about">About</Link>
            <Link href="/security">Security</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href="mailto:sales@xsee.io">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export function MarketingButton({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return (
    <Link className={`marketing-button ${secondary ? "marketing-button-secondary" : "marketing-button-primary"}`} href={href}>
      {children}
    </Link>
  );
}
