"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import Nav from "@/components/Nav";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";

export type LegalTocItem = { id: string; num: string; label: string };

type LegalPage = "terms" | "privacy" | "refunds";

const OTHER_PAGES: { href: string; label: string; key: LegalPage }[] = [
  { href: "/terms", label: "Terms of Service", key: "terms" },
  { href: "/privacy", label: "Privacy Policy", key: "privacy" },
  { href: "/refunds", label: "Refund Policy", key: "refunds" },
];

type Props = {
  tag: string;
  headline: string;
  subtitle?: string;
  tocItems: LegalTocItem[];
  current: LegalPage;
  children: ReactNode;
};

export default function LegalPageLayout({ tag, headline, subtitle, tocItems, current, children }: Props) {
  const [activeSection, setActiveSection] = useState(tocItems[0]?.id ?? "1");

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting && e.target instanceof HTMLElement);
        if (visible.length === 0) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target as HTMLElement;
        const id = top?.dataset.section;
        if (id) setActiveSection(id);
      },
      { threshold: [0.2, 0.35, 0.5], rootMargin: "-80px 0px -70% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [tocItems]);

  const others = OTHER_PAGES.filter((p) => p.key !== current);

  return (
    <>
      <ScrollProgressBar />
      <Nav />
      <main className="legal-page-root" style={{ paddingTop: 64 }}>
        <header className="legal-hero">
          <div className="legal-hero-glow" aria-hidden />
          <div className="legal-hero-inner">
            <span className="legal-tag-pill">{tag}</span>
            <h1 className="legal-hero-title">{headline}</h1>
            {subtitle ? <p className="legal-hero-sub">{subtitle}</p> : null}
            <span className="legal-updated-pill">Last updated: March 26, 2026</span>
          </div>
        </header>

        <div className="legal-grid">
          <aside className="legal-toc" aria-label="Table of contents">
            <div className="legal-toc-head">On this page</div>
            <nav>
              {tocItems.map((item) => (
                <Link
                  key={item.id}
                  href={`#section-${item.id}`}
                  className={`legal-toc-link ${activeSection === item.id ? "active" : ""}`}
                >
                  <span className="legal-toc-num">{item.num}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="legal-toc-sep" />
            <div className="legal-toc-other">Other legal pages</div>
            {others.map((p) => (
              <Link key={p.href} href={p.href} className="legal-toc-other-link">
                {p.label}
              </Link>
            ))}
          </aside>

          <div className="legal-main">{children}</div>
        </div>

        <div className="legal-contact-block">
          <Mail size={28} color="#FF1B8D" style={{ margin: "0 auto 12px", display: "block" }} aria-hidden />
          <h2 className="legal-contact-title">Questions about this policy?</h2>
          <p className="legal-contact-sub">Our team responds within 2 business days.</p>
          <a href="mailto:security@xsee.io" className="legal-contact-btn">
            security@xsee.io
          </a>
          <div className="legal-contact-links">
            {OTHER_PAGES.map((p) => (
              <Link key={p.href} href={p.href}>
                {p.label}
              </Link>
            ))}
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
