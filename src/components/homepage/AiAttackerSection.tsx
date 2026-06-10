"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CARDS = [
  {
    n: "01",
    title: "10,000× faster",
    body: "An AI attacker runs 10,000 attack variations in the time a human runs 10. Your team cannot keep up manually.",
    accent: true,
  },
  {
    n: "02",
    title: "Infinitely adaptive",
    body: "AI attackers learn from every blocked attempt and instantly try a different path. Static defenses fail by design.",
  },
  {
    n: "03",
    title: "Invisible to legacy tools",
    body: "Your SIEM, GuardDuty, and XDR were built to detect human attack patterns. AI attackers move differently — and quietly.",
  },
  {
    n: "04",
    title: "Non-Human Identities",
    body: "In 2026, machine identities outnumber humans. 92% of organizations cannot track them. XSEE maps and validates every NHI.",
  },
] as const;

function AICard({
  n,
  title,
  body,
  accent,
}: {
  n: string;
  title: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`hp-card hp-ai-card group flex h-full flex-col p-8 lg:p-9 ${
        accent ? "hp-ai-card--accent" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`hp-mono text-[12px] ${accent ? "text-[var(--hp-brand)]" : "text-[var(--hp-ink3)]"}`}
          style={{ letterSpacing: "0.2em" }}
        >
          {n}
        </span>
        {accent ? <span className="hp-pink-dot" aria-hidden /> : null}
      </div>
      <div
        className={`mt-5 h-px w-full transition-colors duration-300 ${
          accent ? "bg-[color:rgba(255,27,141,0.3)]" : "bg-[var(--hp-line)] group-hover:bg-[var(--hp-line2)]"
        }`}
      />
      <div className="mt-9">
        <h3
          className="mb-4 text-[20px] font-semibold leading-[1.25] text-[var(--hp-ink)] lg:text-[22px]"
          style={{ letterSpacing: "-0.02em" }}
        >
          {title}
        </h3>
        <p className="text-[14px] leading-[1.7] text-[var(--hp-ink2)]">{body}</p>
      </div>
    </div>
  );
}

export default function AiAttackerSection() {
  return (
    <section id="ai" className="hp-section relative overflow-hidden" aria-labelledby="ai-title">
      <div
        className="pointer-events-none absolute -z-10"
        style={{
          right: "-280px",
          top: "-120px",
          width: "720px",
          height: "720px",
          background: "radial-gradient(closest-side, rgba(255, 27, 141, 0.06), rgba(255, 27, 141, 0) 70%)",
        }}
        aria-hidden
      />
      <div className="hp-container relative">
        <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="hp-eyebrow hp-kicker mb-5">The new threat</p>
            <h2 id="ai-title" className="hp-h-display" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              <span className="block">Human hackers were bad enough.</span>
              <span className="block text-[var(--hp-ink3)]">AI attackers are a different category.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <div className="mb-5 h-px w-12 bg-[var(--hp-brand)]" aria-hidden />
            <p className="text-[16px] leading-[1.65] text-[var(--hp-ink2)] lg:text-[17px]">
              XSEE simulates AI attacker behavior — so you can measure your defenses against the threat that&apos;s
              actually coming. Not the one your SIEM was built for.
            </p>
          </div>
        </div>

        <div className="mb-14 h-px w-full bg-[var(--hp-line)]" aria-hidden />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 lg:gap-5">
          {CARDS.map((c) => (
            <AICard key={c.n} {...c} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link
            href="/free-scan"
            className="inline-flex items-center gap-2 text-[14px] text-[var(--hp-ink)] transition-colors hover:text-[var(--hp-brand)]"
          >
            See your AI attacker exposure
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <span className="text-[var(--hp-ink4)]">·</span>
          <span className="hp-mono text-[12px] text-[var(--hp-ink3)]" style={{ letterSpacing: "0.1em" }}>
            Free · 15&nbsp;min · Read-only IAM
          </span>
        </div>
      </div>
    </section>
  );
}
