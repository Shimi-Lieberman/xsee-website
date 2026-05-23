"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Analytics } from "@/lib/analytics";

const HOPS = [
  { kind: "INTERNET", label: "Internet", id: "0.0.0.0/0", delay: 0, final: false },
  { kind: "ALB", label: "Public ALB", id: "alb-prod-edge", delay: 600, final: false },
  { kind: "EC2", label: "EC2 Instance", id: "i-0a3f2c8d", delay: 1200, final: false },
  { kind: "IAM ROLE", label: "IAM Role", id: "svc-app-prod", delay: 1800, final: false },
  { kind: "RDS", label: "Production DB", id: "prod-postgres-01", delay: 2400, final: true },
] as const;

const CALLS = [
  { call: "sts:AssumeRole", delay: 300 },
  { call: "iam:GetRolePolicy", delay: 900 },
  { call: "ec2:DescribeInstances", delay: 1500 },
  { call: "rds:DescribeDBInstances", delay: 2100 },
] as const;

function HopNode({
  kind,
  label,
  id,
  delay,
  final,
}: {
  kind: string;
  label: string;
  id: string;
  delay: number;
  final?: boolean;
}) {
  return (
    <div
      className={`w-[148px] shrink-0 select-none rounded-[8px] border bg-[var(--hp-elevated)] ${
        final ? "hp-final-anim" : "hp-hop-anim"
      }`}
      style={{ animationDelay: `${delay}ms`, padding: "12px 14px" }}
    >
      <div className="hp-eyebrow mb-2 text-[10px] leading-none">{kind}</div>
      <div className="text-[13px] font-medium leading-[1.3] text-[var(--hp-ink)]">{label}</div>
      <div className="hp-mono mt-1.5 text-[10.5px] leading-none text-[var(--hp-ink3)]">{id}</div>
    </div>
  );
}

function HopArrow({ call, delay }: { call: string; delay: number }) {
  const markerId = `arrow-${call.replace(/\W/g, "")}`;
  return (
    <div className="flex min-w-[120px] flex-1 flex-col items-center self-start px-3 pt-5">
      <svg viewBox="0 0 120 14" className="h-3 w-full text-[var(--hp-line2)]" aria-hidden>
        <defs>
          <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
          </marker>
        </defs>
        <line
          x1="0"
          y1="7"
          x2="118"
          y2="7"
          stroke="currentColor"
          strokeWidth="1.4"
          markerEnd={`url(#${markerId})`}
          className="hp-arrow-anim"
          style={{ animationDelay: `${delay}ms` }}
        />
      </svg>
      <div
        className="hp-mono mt-3 text-center text-[10.5px] leading-[1.5] text-[var(--hp-ink3)] hp-foot-anim"
        style={{ animationDelay: `${delay + 100}ms` }}
      >
        {call}
        <div className="mt-1 inline-flex items-center justify-center gap-1 text-[var(--hp-ok)]">
          <span className="hp-green-dot" style={{ boxShadow: "none" }} />
          <span>success</span>
        </div>
      </div>
    </div>
  );
}

function HeroAttackPath() {
  return (
    <>
      <div className="relative max-w-full">
        <div className="overflow-x-auto max-w-full lg:overflow-x-visible">
          <div className="flex w-full min-w-0 items-start justify-between">
            {HOPS.map((h, i) => (
              <div key={h.id} className="contents">
                <HopNode {...h} />
                {i < HOPS.length - 1 && <HopArrow {...CALLS[i]} />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="hp-mono mt-8 text-[11.5px] leading-[1.6] text-[var(--hp-ink3)] hp-foot-anim" style={{ animationDelay: "2900ms" }}>
        1.2&nbsp;seconds <span className="mx-2 text-[var(--hp-ink4)]">·</span>
        4&nbsp;hops <span className="mx-2 text-[var(--hp-ink4)]">·</span>
        92% exploit confidence <span className="mx-2 text-[var(--hp-ink4)]">·</span>
        <span className="text-[var(--hp-ok)]">signed</span>
      </p>
    </>
  );
}

function HeroLiveCard() {
  const [sec, setSec] = useState(134);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSec((s) => (s > 0 ? s - 1 : 240));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");

  return (
    <div className="hp-card w-full max-w-[380px] shrink-0 overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--hp-line)] px-5 py-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="hp-pink-dot shrink-0" />
          <span className="hp-eyebrow truncate text-[var(--hp-ink2)]">Live · monitoring</span>
        </div>
        <span className="hp-mono shrink-0 pl-3 text-[11px] text-[var(--hp-ink3)]">acme-prod</span>
      </div>
      <div className="px-5 py-6">
        <div className="text-[13px] leading-[1.6] text-[var(--hp-ink2)]">
          Last scan found
          <span className="font-medium text-[var(--hp-ink)]"> 3 paths</span> reaching prod data.
          <span className="font-medium text-[var(--hp-ink)]"> 21 fixes</span> proposed. One human decision per fix.
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[var(--hp-line)] pt-5">
          <div>
            <div className="hp-eyebrow mb-2 text-[10px] leading-none">scan</div>
            <div className="hp-mono text-[15px] leading-none text-[var(--hp-ink)]">2m&nbsp;ago</div>
          </div>
          <div>
            <div className="hp-eyebrow mb-2 text-[10px] leading-none">paths</div>
            <div className="hp-mono text-[15px] leading-none text-[var(--hp-ink)]">3</div>
          </div>
          <div>
            <div className="hp-eyebrow mb-2 text-[10px] leading-none">closed</div>
            <div className="hp-mono text-[15px] leading-none text-[var(--hp-ok)]">17</div>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-[var(--hp-line)] pt-5">
          <div className="hp-eyebrow text-[10px]">Next scan</div>
          <div className="hp-mono shrink-0 text-[13px] tabular-nums text-[var(--hp-ink)]">
            {mm}:{ss}
          </div>
        </div>
        <div className="relative mt-3 h-[2px] w-full overflow-hidden rounded-full bg-[var(--hp-line)]" aria-hidden>
          <div
            className="hp-hero-live-bar absolute top-0 left-0 h-full w-[36%] rounded-full bg-[var(--hp-brand)] opacity-90"
            style={{ animation: "hpHeroLiveSlide 2.4s ease-in-out infinite" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function HomeHero() {
  return (
    <section
      id="top"
      className="relative"
      style={{
        paddingTop: "clamp(72px, 8vw, 96px)",
        paddingBottom: "clamp(64px, 8vw, 96px)",
        paddingLeft: "clamp(24px, 5vw, 40px)",
        paddingRight: "clamp(24px, 5vw, 40px)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div
          className="absolute"
          style={{
            right: "-220px",
            bottom: "-260px",
            width: "880px",
            height: "880px",
            background: "radial-gradient(closest-side, rgba(255,27,141,0.10), rgba(255,27,141,0) 70%)",
            filter: "blur(8px)",
          }}
        />
        <div
          className="absolute bottom-0 right-[8%] top-0 w-px"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--hp-line) 18%, var(--hp-line) 82%, transparent)",
          }}
        />
        <div
          className="absolute left-0 right-0 top-[52%] hidden h-px lg:block"
          style={{
            background: "linear-gradient(to right, transparent, var(--hp-line) 30%, var(--hp-line) 70%, transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="mb-12 flex flex-wrap items-center gap-3 lg:mb-16">
          <div className="inline-flex items-center gap-2">
            <span className="hp-pink-dot" />
            <span className="hp-eyebrow">Cloud attack intelligence · AWS</span>
          </div>
          <span className="hidden text-[var(--hp-ink4)] sm:inline">·</span>
          <Link
            href="/changelog"
            className="hidden items-center gap-1.5 hp-mono text-[10.5px] text-[var(--hp-ink3)] transition-colors hover:text-[var(--hp-ink2)] sm:inline-flex"
            style={{ letterSpacing: "0.14em" }}
          >
            v0.9 · AUTONOMOUS AGENTS LIVE
            <ArrowRight className="h-3 w-3" aria-hidden />
          </Link>
        </div>

        <h1
          className="font-semibold text-[var(--hp-ink)]"
          style={{ fontSize: "clamp(52px, 8.4vw, 112px)", lineHeight: 0.98, letterSpacing: "-0.04em", maxWidth: "14ch" }}
        >
          <span className="block">Stop guessing.</span>
          <span className="block">
            Prove the&nbsp;
            <span className="hp-breach-anim">breach.</span>
          </span>
        </h1>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <p
              className="max-w-[600px] text-[18px] leading-[1.6] text-[var(--hp-ink2)] lg:text-[19px]"
              style={{ textWrap: "pretty" }}
            >
              Your scanner sees 4,000 issues. Three of them lead to your production database. XSEE finds the three —
              with live AWS API proof per hop, attack simulation on your actual graph, and a signed certificate when each
              one is closed.
              <span className="text-[var(--hp-ink)]"> One human decision per finding.</span>
            </p>
            <p className="mt-6 text-[13.5px] leading-[1.5] text-[var(--hp-ink3)]">
              Built for security teams at companies with 200–5,000 employees.
            </p>
            <div className="hp-mono mt-8 text-[12px] leading-[1.8] text-[var(--hp-ink3)]">
              2&nbsp;min to connect <span className="mx-1.5 text-[var(--hp-ink4)]">·</span>
              30&nbsp;min to first proof <span className="mx-1.5 text-[var(--hp-ink4)]">·</span>
              Read-only IAM <span className="mx-1.5 text-[var(--hp-ink4)]">·</span>
              No agents <span className="mx-1.5 text-[var(--hp-ink4)]">·</span>
              Your data never leaves AWS
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/free-scan"
                className="hp-btn-primary"
                onClick={() => Analytics.ctaClicked("hero", "free_breach_report")}
              >
                Free breach report
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/demo" className="hp-btn-ghost" onClick={() => Analytics.ctaClicked("hero", "get_demo")}>
                Get a demo
                <ArrowDown className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/under-attack"
                className="hp-mono inline-flex h-12 items-center gap-1.5 px-1 text-[13px] text-[var(--hp-ink3)] transition-colors hover:text-[var(--hp-brand)]"
                style={{ letterSpacing: "0.1em" }}
              >
                UNDER&nbsp;ATTACK?
              </Link>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-5 lg:flex lg:items-start lg:justify-end">
            <HeroLiveCard />
          </div>
        </div>

        <div className="mt-24 lg:mt-28">
          <div className="mb-7 flex items-center justify-between">
            <div className="hp-eyebrow">Path · live evidence</div>
            <div className="hidden items-center gap-2 hp-eyebrow sm:flex">
              <span className="hp-green-dot" />
              <span>verified · signed</span>
            </div>
          </div>
          <div
            className="hp-card hp-dotgrid overflow-hidden"
            style={{ padding: "clamp(32px, 4vw, 36px) clamp(24px, 5vw, 40px)" }}
          >
            <HeroAttackPath />
          </div>
        </div>
      </div>
    </section>
  );
}
