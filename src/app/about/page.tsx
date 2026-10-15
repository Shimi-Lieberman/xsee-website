import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "../homepage.css";
import HomeNav from "@/components/homepage/HomeNav";
import Footer from "@/components/Footer";
import { DEMO_HREF, SALES_EMAIL } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "About — XSEE",
  description:
    "XSEE helps AWS security teams validate reachable attack paths, prioritize remediation, and verify closure with evidence.",
  alternates: { canonical: "/about" },
};

const mail = (subject: string) => `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}`;

const CONTACTS = [
  {
    title: "Enterprise evaluation",
    copy: "Book a demo or discuss a focused pilot in your AWS environment.",
    href: DEMO_HREF,
    action: "Book a demo",
  },
  {
    title: "Investment conversations",
    copy: "For investor inquiries, email the XSEE team directly.",
    href: mail("Investment conversation"),
    action: SALES_EMAIL,
  },
  {
    title: "Joining the team",
    copy: "We don't list open roles on this site. If you'd like to work with us, send a short note.",
    href: mail("Joining the XSEE team"),
    action: SALES_EMAIL,
  },
  {
    title: "Security disclosures",
    copy: "Report a vulnerability or request security documentation.",
    href: "mailto:security@xsee.io",
    action: "security@xsee.io",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="hp-page min-h-screen">
      <HomeNav />
      <main className="hp-page-main mx-auto w-full max-w-[100vw]">
        <section className="xsee-journey-section" aria-labelledby="about-title">
          <div className="hp-container">
            <div className="xsee-section-heading">
              <p className="hp-eyebrow">About XSEE</p>
              <h1 id="about-title" className="xsee-about-title">
                Attack-path validation for AWS security teams.
              </h1>
              <p>
                XSEE helps security teams validate whether AWS attack paths are reachable, prioritize what to review,
                and re-check a path after their team applies a change, with evidence they can revisit as the
                environment evolves.
              </p>
            </div>
            <ul className="xsee-about-facts">
              <li>Read-only AWS access for assessment</li>
              <li>No agents or code deployment in your environment</li>
              <li>Remediation decisions stay with your team</li>
            </ul>
          </div>
        </section>

        <section className="xsee-journey-section xsee-about-contact" aria-labelledby="about-contact-title">
          <div className="hp-container">
            <div className="xsee-section-heading">
              <p className="hp-eyebrow">Contact</p>
              <h2 id="about-contact-title">Talk with the XSEE team.</h2>
            </div>
            <ul className="xsee-contact-grid">
              {CONTACTS.map((c) => (
                <li key={c.title} className="xsee-contact-card">
                  <h3>{c.title}</h3>
                  <p>{c.copy}</p>
                  <Link href={c.href} className="xsee-text-link">
                    {c.action} <ArrowRight size={15} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
