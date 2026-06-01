"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Analytics } from "@/lib/analytics";
import AttackGraphCinematic from "@/components/homepage/AttackGraphCinematic";

export default function HomeHero() {
  return (
    <section
      id="top"
      className="v2-polish relative overflow-hidden px-6 pb-20 pt-[120px] lg:px-10 lg:pb-28 lg:pt-[160px]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
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

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-wrap items-center gap-3 lg:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--v2-line)] px-3 py-1.5">
            <span className="pink-dot dot-pulse" />
            <span className="v2-mono text-[10.5px] tracking-[0.14em] text-[var(--v2-ink2)]">v1.5 · AUTONOMOUS AGENTS LIVE</span>
          </div>
          <span className="v2-eyebrow hidden text-[var(--v2-ink3)] md:inline">Cloud attack intelligence · AWS</span>
        </div>

        <h1
          className="display text-[var(--v2-ink)]"
          style={{ maxWidth: "15ch", fontSize: "clamp(44px, 6vw, 84px)", lineHeight: 0.96 }}
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

        <div className="mt-10 grid grid-cols-1 items-end gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p
              className="text-[18px] leading-[1.55] text-[var(--v2-ink2)] lg:text-[20px]"
              style={{ textWrap: "pretty", maxWidth: "54ch" }}
            >
              Your scanner sees four thousand findings. Three of them lead to your production database. xsee finds those three —{" "}
              <span className="text-[var(--v2-ink)]">with live AWS evidence per hop,</span> attack simulation on your actual graph,
              and a signed certificate the moment each path is closed.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/free-scan"
                className="btn-pink inline-flex h-12 items-center gap-2 rounded-full px-5 text-[14.5px] font-medium text-white"
                onClick={() => Analytics.ctaClicked("hero", "free_breach_report")}
              >
                Free breach report
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/#how"
                className="btn-ghost inline-flex h-12 items-center gap-2 rounded-full px-5 text-[14.5px] text-[var(--v2-ink2)]"
                onClick={() => Analytics.ctaClicked("hero", "see_it_work")}
              >
                See it work
                <ArrowDown className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="v2-mono mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] tracking-[0.14em] text-[var(--v2-ink3)]">
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
            <div
              className="relative ml-auto max-w-[440px] overflow-hidden rounded-[14px] border border-[var(--v2-line)] p-5 lg:p-6"
              style={{ background: "#0a0e1a" }}
            >
              <div
                className="glow-brand-soft pointer-events-none absolute -z-0"
                style={{ right: "-140px", top: "-160px", width: "360px", height: "360px" }}
                aria-hidden
              />
              {/* Top status row */}
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="pink-dot dot-pulse" />
                  <span className="v2-mono text-[10.5px] tracking-[0.16em] text-[var(--v2-ink2)]">LIVE · MONITORING</span>
                </div>
                <span className="v2-mono text-[10.5px] tracking-[0.1em] text-[var(--v2-ink3)]">acme-prod</span>
              </div>

              {/* Main stat block */}
              <div className="mt-6">
                <p className="text-[19px] leading-[1.4] text-[var(--v2-ink)] lg:text-[21px]" style={{ textWrap: "pretty" }}>
                  Last scan found <span className="text-[var(--v2-brand2)]">3 paths</span> reaching prod data. 21 fixes
                  proposed.
                </p>
                <p className="mt-2 text-[13px] text-[var(--v2-ink3)]">One human decision per fix.</p>
              </div>

              <div className="my-5 h-px bg-[var(--v2-line)]" />

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="v2-eyebrow mb-1.5">Scan</div>
                  <div className="v2-mono text-[18px] leading-none text-[var(--v2-ink)]">2m ago</div>
                </div>
                <div>
                  <div className="v2-eyebrow mb-1.5">Paths</div>
                  <div className="v2-mono text-[18px] leading-none text-[var(--v2-brand2)]">3</div>
                </div>
                <div>
                  <div className="v2-eyebrow mb-1.5">Closed</div>
                  <div className="v2-mono text-[18px] leading-none text-[var(--v2-ink)]">17</div>
                </div>
              </div>

              <div className="my-5 h-px bg-[var(--v2-line)]" />

              {/* Next-scan progress row */}
              <div>
                <div className="v2-eyebrow mb-2.5">Next scan</div>
                <div className="flex items-center gap-3">
                  <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-[var(--v2-line)]">
                    <div className="h-full w-2/5 rounded-full bg-[var(--v2-brand)]" />
                  </div>
                  <span className="v2-mono inline-block animate-pulse text-[12px] text-[var(--v2-ink2)]" style={{ animationDuration: "2400ms" }}>
                    02:04
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 lg:mt-32">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <div className="v2-eyebrow mb-2">Path · live evidence</div>
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

          <div className="v2-mono mt-6 flex flex-wrap items-center justify-between gap-4 text-[11.5px] text-[var(--v2-ink3)]">
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
              className="inline-flex items-center gap-1.5 text-[var(--v2-ink2)] transition-colors hover:text-[var(--v2-ink)]"
            >
              See full receipt
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
