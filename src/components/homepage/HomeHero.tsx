"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Analytics } from "@/lib/analytics";
import AttackGraphCinematic from "@/components/homepage/AttackGraphCinematic";
import LiveMonitorWidget from "@/components/homepage/LiveMonitorWidget";

export default function HomeHero() {
  return (
    <section
      id="top"
      className="v2-polish relative overflow-hidden px-6 pb-24 pt-6 lg:px-10 lg:pb-36 lg:pt-10"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent)",
        }}
        aria-hidden
      >
        <div
          className="glow-brand absolute"
          style={{
            right: "-260px",
            top: "40px",
            width: "920px",
            height: "920px",
          }}
        />
        <div
          className="glow-brand-soft absolute"
          style={{
            left: "-200px",
            bottom: "-200px",
            width: "720px",
            height: "720px",
          }}
        />
        <div
          className="absolute bottom-0 top-0 w-px"
          style={{
            right: "6%",
            background: "linear-gradient(to bottom, transparent, #1B2030 18%, #1B2030 82%, transparent)",
          }}
        />
        <div className="grain" />
      </div>

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-9 lg:gap-12">
        <div className="hero-rise flex flex-wrap items-center gap-3" style={{ animationDelay: "0.04s" }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--v2-line)] px-3 py-1.5">
            <span className="pink-dot dot-pulse" />
            <span className="v2-mono text-[10.5px] tracking-[0.14em] text-[var(--v2-ink2)]">v1.5 · AUTONOMOUS AGENTS LIVE</span>
          </div>
          <span className="v2-eyebrow hidden text-[var(--v2-ink3)] md:inline">Cloud attack intelligence · AWS</span>
        </div>

        <h1
          className="hero-rise display text-[var(--v2-ink)]"
          style={{ maxWidth: "15ch", fontSize: "clamp(44px, 7vw, 104px)", lineHeight: 0.98, animationDelay: "0.12s" }}
        >
          <span className="block">Prove</span>
          <span className="block">
            the breach{" "}
            <span className="serif-accent text-[var(--v2-ink2)] italic" style={{ fontWeight: 400 }}>
              before
            </span>
          </span>
          <span className="block">
            <span className="serif-accent text-[var(--v2-ink2)] italic" style={{ fontWeight: 400 }}>
              they take it.
            </span>
          </span>
        </h1>

        <div className="grid grid-cols-1 items-start gap-10 pt-1 lg:grid-cols-12 lg:gap-12 lg:pt-2">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <p
              className="hero-rise text-[19px] leading-[1.6] text-[var(--v2-ink2)] lg:text-[22px]"
              style={{ textWrap: "pretty", maxWidth: "46ch", animationDelay: "0.2s" }}
            >
              Your scanner returns four thousand findings. Three of them reach your production database.{" "}
              <span className="text-[var(--v2-ink)]">xsee proves exactly those three</span> — then signs each path off the moment it&apos;s closed.
            </p>

            <div className="hero-rise flex flex-wrap items-center gap-3" style={{ animationDelay: "0.28s" }}>
              <Link
                href="/free-scan"
                className="btn-pink group inline-flex h-12 items-center gap-2 rounded-full px-5 text-[14.5px] font-medium text-white"
                onClick={() => Analytics.ctaClicked("hero", "free_breach_report")}
              >
                Free breach report
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
              <Link
                href="/#how"
                className="btn-ghost group inline-flex h-12 items-center gap-2 rounded-full px-5 text-[14.5px] text-[var(--v2-ink2)]"
                onClick={() => Analytics.ctaClicked("hero", "see_it_work")}
              >
                See it work
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </div>

            <div
              className="hero-rise v2-mono flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] tracking-[0.14em] text-[var(--v2-ink3)]"
              style={{ animationDelay: "0.36s" }}
            >
              <span>2 MIN TO CONNECT</span>
              <span className="text-[var(--v2-ink4)]">·</span>
              <span>READ-ONLY IAM</span>
              <span className="text-[var(--v2-ink4)]">·</span>
              <span>NO AGENTS</span>
              <span className="text-[var(--v2-ink4)]">·</span>
              <span>DATA STAYS IN AWS</span>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-6">
            <div className="hero-rise mx-auto w-full max-w-[420px]" style={{ animationDelay: "0.32s" }}>
              <LiveMonitorWidget />
            </div>
          </div>
        </div>

        <div className="hero-rise flex flex-col gap-7 pt-16 lg:gap-9 lg:pt-28" style={{ animationDelay: "0.44s" }}>
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <div className="v2-eyebrow">Path · live evidence</div>
              <h2 className="display text-[22px] font-medium tracking-tight text-[var(--v2-ink)] lg:text-[26px]">
                Watch a breach path build itself.
              </h2>
            </div>
            <div className="v2-eyebrow hidden items-center gap-2 text-[var(--v2-ink2)] md:flex">
              <span className="green-dot" />
              <span>verified · signed</span>
            </div>
          </div>

          <AttackGraphCinematic />

          <div className="v2-mono flex flex-wrap items-center justify-between gap-4 text-[11.5px] text-[var(--v2-ink3)]">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span>
                <span className="text-[var(--v2-ink)]">1.2s</span> · scan-to-proof
              </span>
              <span className="text-[var(--v2-ink4)]">·</span>
              <span>
                <span className="text-[var(--v2-ink)]">4 hops</span> · Internet → RDS
              </span>
              <span className="text-[var(--v2-ink4)]">·</span>
              <span>
                <span className="text-[var(--v2-ink)]">92%</span> exploit confidence
              </span>
            </div>
            <Link
              href="/#proof"
              className="group inline-flex items-center gap-1.5 text-[var(--v2-ink2)] transition-colors hover:text-[var(--v2-ink)]"
            >
              See full receipt
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
