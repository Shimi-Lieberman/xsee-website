"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Analytics } from "@/lib/analytics";
import AttackGraphCinematic from "@/components/homepage/AttackGraphCinematic";

const STATES = [
  { label: "RECON", tone: "muted" },
  { label: "PATH FOUND", tone: "threat" },
  { label: "PROD REACHABLE", tone: "threat" },
  { label: "VERIFIED", tone: "proof" },
  { label: "SIGNED", tone: "closed" },
] as const;

export default function HomeHero() {
  return (
    <section id="top" className="v2-polish xsee-hero relative overflow-hidden px-6 pb-20 pt-12 lg:px-10 lg:pb-28 lg:pt-20">
      <div className="xsee-grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <div className="hero-rise mb-8 flex items-center gap-3" style={{ animationDelay: "0.04s" }}>
              <span className="xsee-status-dot" aria-hidden />
              <span className="v2-mono text-[10px] tracking-[0.18em] text-[var(--v2-ink2)]">AUTONOMOUS CLOUD ATTACK INTELLIGENCE</span>
              <span className="hidden h-px w-16 bg-[var(--v2-line2)] sm:block" aria-hidden />
              <span className="v2-mono hidden text-[10px] text-[var(--v2-ink3)] sm:block">AWS · LIVE</span>
            </div>
            <h1 className="hero-rise display max-w-[980px] text-balance text-[var(--v2-ink)]" style={{ fontSize: "clamp(48px, 7.4vw, 112px)", lineHeight: 0.9, animationDelay: "0.1s" }}>
              Know which attack paths are real.
              <span className="block text-[var(--v2-ink3)]">Prove them before attackers do.</span>
            </h1>
          </div>
          <div className="hero-rise flex flex-col gap-7 pb-1 lg:col-span-4" style={{ animationDelay: "0.18s" }}>
            <p className="max-w-[44ch] text-[17px] leading-[1.6] text-[var(--v2-ink2)] lg:text-[18px]">
              XSEE turns cloud findings into verified breach paths using live AWS evidence—then signs the proof when each path is closed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/free-scan" className="btn-pink group inline-flex h-12 items-center gap-2 px-5 text-[14px] font-semibold text-white" onClick={() => Analytics.ctaClicked("hero", "free_breach_report")}>
                Run a free breach report
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link href="/#path" className="btn-ghost group inline-flex h-12 items-center gap-2 px-5 text-[14px] text-[var(--v2-ink2)]">
                Inspect the system <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5" aria-hidden />
              </Link>
            </div>
            <div className="v2-mono flex items-center gap-2 text-[10px] tracking-[0.12em] text-[var(--v2-ink3)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--v2-ok)]" aria-hidden /> READ-ONLY IAM · NO AGENTS · 2 MIN SETUP
            </div>
          </div>
        </div>

        <div id="path" className="xsee-instrument hero-rise mt-14 overflow-hidden lg:mt-20" style={{ animationDelay: "0.26s" }}>
          <div className="xsee-instrument-bar">
            <div className="flex items-center gap-3"><span className="xsee-status-dot" /><span className="v2-mono text-[10px] tracking-[0.16em]">LIVE ATTACK GRAPH</span><span className="v2-mono text-[10px] text-[var(--v2-ink3)]">ACME-PROD / US-EAST-1</span></div>
            <div className="v2-mono hidden text-[10px] text-[var(--v2-ink3)] sm:block">SESSION 7F2A · 13:42:39 UTC</div>
          </div>
          <div className="xsee-state-rail" aria-label="Attack validation states">
            {STATES.map((state, index) => <div key={state.label} className={`xsee-state xsee-state--${state.tone}`}><span className="v2-mono">0{index + 1}</span><strong>{state.label}</strong></div>)}
          </div>
          <div className="p-3 sm:p-5 lg:p-7"><AttackGraphCinematic /></div>
          <div className="xsee-instrument-foot">
            <div className="v2-mono flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-[var(--v2-ink3)]"><span><b>4</b> VERIFIED HOPS</span><span><b>92%</b> EXPLOIT CONFIDENCE</span><span><b>1.2s</b> SCAN-TO-PROOF</span></div>
            <Link href="/#proof" className="v2-mono inline-flex items-center gap-1.5 text-[10px] text-[var(--v2-ink2)] hover:text-white">OPEN EVIDENCE <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
