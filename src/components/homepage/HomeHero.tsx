"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { Analytics } from "@/lib/analytics";
import AttackGraphCinematic from "@/components/homepage/AttackGraphCinematic";

const SIGNALS = ["ZERO-WRITE", "AWS CLOUDTRAIL", "SIGNED EVIDENCE"] as const;

export default function HomeHero() {
  return (
    <section id="top" className="v2-polish xsee-hero relative overflow-hidden px-6 pb-16 pt-12 lg:px-10 lg:pb-20 lg:pt-16">
      <div className="xsee-grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="xsee-hero-layout">
          <div className="xsee-hero-copy">
            <div className="hero-rise flex items-center gap-3" style={{ animationDelay: "0.04s" }}>
              <span className="xsee-status-dot" aria-hidden />
              <span className="v2-mono text-[10px] tracking-[0.18em] text-[var(--v2-ink2)]">AUTONOMOUS CLOUD ATTACK INTELLIGENCE</span>
            </div>

            <h1 className="hero-rise display text-balance text-[var(--v2-ink)]" style={{ animationDelay: "0.1s" }}>
              Know which attack paths are real.
              <span>Prove them before attackers do.</span>
            </h1>

            <p className="hero-rise max-w-[48ch] text-[17px] leading-[1.65] text-[var(--v2-ink2)]" style={{ animationDelay: "0.16s" }}>
              XSEE safely validates the routes attackers can actually use—then produces signed, audit-ready evidence for every hop and every fix.
            </p>

            <div className="hero-rise flex flex-wrap gap-3" style={{ animationDelay: "0.2s" }}>
              <Link href="/free-scan" className="btn-pink group inline-flex h-12 items-center gap-2 px-5 text-[14px] font-semibold text-white" onClick={() => Analytics.ctaClicked("hero", "free_breach_report")}>
                Run a free breach report
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link href="/#path" className="btn-ghost group inline-flex h-12 items-center gap-2 px-5 text-[14px] text-[var(--v2-ink2)]">
                Watch a live path <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5" aria-hidden />
              </Link>
            </div>

            <div className="xsee-signal-list hero-rise" style={{ animationDelay: "0.24s" }}>
              {SIGNALS.map((signal) => <span key={signal}><Check aria-hidden />{signal}</span>)}
            </div>
            <p className="hero-rise v2-mono flex items-center gap-2 text-[10px] tracking-[0.1em] text-[var(--v2-ink3)]" style={{ animationDelay: "0.27s" }}>
              <ShieldCheck className="h-4 w-4 text-[var(--v2-ok)]" aria-hidden /> READ-ONLY IAM · NO AGENTS · DEPLOY IN 2 MINUTES
            </p>
          </div>

          <div id="path" className="xsee-instrument hero-rise overflow-hidden" style={{ animationDelay: "0.2s" }}>
            <div className="xsee-instrument-bar">
              <div className="flex min-w-0 items-center gap-3"><span className="xsee-status-dot" /><span className="v2-mono text-[10px] tracking-[0.14em]">LIVE ATTACK PATH</span><span className="v2-mono hidden text-[10px] text-[var(--v2-ink3)] sm:block">ACME-PROD / US-EAST-1</span></div>
              <div className="v2-mono hidden text-[10px] text-[var(--v2-ink3)] md:block">13:42:39 UTC · 7F2A</div>
            </div>
            <div className="xsee-live-summary" aria-label="Live validation summary">
              <span><i className="is-threat" />THREAT ACTIVE</span>
              <span><i className="is-proof" />4 HOPS VERIFIED</span>
              <span><i className="is-closed" />EVIDENCE SIGNED</span>
            </div>
            <div className="p-3 sm:p-4"><AttackGraphCinematic /></div>
            <div className="xsee-instrument-foot">
              <div className="v2-mono flex flex-wrap gap-x-5 gap-y-2 text-[9px] text-[var(--v2-ink3)]"><span>EVIDENCE <b>#4821</b></span><span>SOURCE <b>CLOUDTRAIL</b></span><span>CONFIDENCE <b>92%</b></span></div>
              <Link href="/#proof" className="v2-mono inline-flex items-center gap-1.5 text-[9px] text-[var(--v2-ink2)] hover:text-white">OPEN PROOF <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
