"use client";

import Link from "next/link";
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
      className={`shrink-0 select-none rounded-lg border bg-[var(--hp-elevated)] px-3 py-2.5 min-w-[132px] ${
        final ? "hp-final-anim" : "hp-hop-anim"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="hp-eyebrow text-[10px] leading-none mb-1.5">{kind}</div>
      <div className="text-[13px] font-medium text-[var(--hp-ink)] leading-tight">{label}</div>
      <div className="hp-mono text-[10px] text-[var(--hp-ink3)] mt-1 leading-none">{id}</div>
    </div>
  );
}

function HopArrow({ call, delay }: { call: string; delay: number }) {
  const markerId = `arrow-${call.replace(/\W/g, "")}`;
  return (
    <div className="flex flex-col items-center px-2 min-w-[140px]">
      <svg viewBox="0 0 120 14" className="w-full h-3.5" aria-hidden>
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
          stroke="#3A3A44"
          strokeWidth="1.25"
          markerEnd={`url(#${markerId})`}
          className="hp-arrow-anim text-[var(--hp-line2)]"
          style={{ animationDelay: `${delay}ms` }}
        />
      </svg>
      <div className="hp-mono text-[10.5px] text-[var(--hp-ink3)] mt-2 text-center leading-tight hp-foot-anim" style={{ animationDelay: `${delay + 100}ms` }}>
        {call}
        <div className="text-[var(--hp-ok)] mt-0.5 inline-flex items-center gap-1 justify-center">
          <span className="hp-green-dot" style={{ boxShadow: "none" }} />
          <span>success</span>
        </div>
      </div>
    </div>
  );
}

function HeroLiveCard() {
  return (
    <div className="hp-card w-full lg:max-w-[360px] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--hp-line)]">
        <div className="flex items-center gap-2.5">
          <span className="hp-pink-dot" />
          <span className="hp-eyebrow text-[var(--hp-ink2)]">Live · monitoring</span>
        </div>
        <span className="hp-mono text-[11px] text-[var(--hp-ink3)]">acme-prod</span>
      </div>
      <div className="px-5 py-5">
        <p className="text-[13px] text-[var(--hp-ink2)] leading-[1.55]">
          Last scan found
          <span className="text-[var(--hp-ink)] font-medium"> 3 paths</span> reaching prod data.
          <span className="text-[var(--hp-ink)] font-medium"> 21 fixes</span> proposed. One human decision per fix.
        </p>
        <div className="mt-4 pt-4 border-t border-[var(--hp-line)] grid grid-cols-3 gap-3">
          <div>
            <div className="hp-eyebrow text-[10px] leading-none mb-1.5">scan</div>
            <div className="hp-mono text-[var(--hp-ink)] text-[15px]">2m ago</div>
          </div>
          <div>
            <div className="hp-eyebrow text-[10px] leading-none mb-1.5">paths</div>
            <div className="hp-mono text-[var(--hp-ink)] text-[15px]">3</div>
          </div>
          <div>
            <div className="hp-eyebrow text-[10px] leading-none mb-1.5">closed</div>
            <div className="hp-mono text-[var(--hp-ok)] text-[15px]">17</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[var(--hp-line)] flex items-center justify-between">
          <div className="hp-eyebrow text-[10px]">Next scan</div>
          <div className="hp-mono text-[var(--hp-ink)] text-[13px] tabular-nums">02:14</div>
        </div>
        <div className="mt-3 relative h-[2px] w-full bg-[var(--hp-line)] rounded-full overflow-hidden" aria-hidden>
          <div className="absolute top-0 left-[20%] h-full w-[36%] bg-[var(--hp-brand)] rounded-full opacity-80" />
        </div>
      </div>
    </div>
  );
}

export default function HomeHero() {
  return (
    <section id="top" className="relative pt-[72px] lg:pt-[96px] pb-[120px] lg:pb-[160px] px-6 lg:px-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
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
      </div>
      <div className="hp-container relative">
        <div className="flex flex-wrap items-center gap-3 mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2">
            <span className="hp-pink-dot" />
            <span className="hp-eyebrow">Cloud attack intelligence · AWS</span>
          </div>
          <span className="hidden sm:inline text-[var(--hp-ink4)]">·</span>
          <Link
            href="/changelog"
            className="hidden sm:inline-flex items-center gap-1.5 hp-mono text-[10.5px] text-[var(--hp-ink3)] hover:text-[var(--hp-ink2)] transition-colors"
            style={{ letterSpacing: "0.14em" }}
          >
            v0.9 · NOW LIVE
            <ArrowRight className="w-3 h-3" aria-hidden />
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
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <p className="text-[18px] lg:text-[19px] leading-[1.55] text-[var(--hp-ink2)] max-w-[640px]">
              Your scanner sees 4,000 findings. Three of them actually reach production. XSEE finds the three — with live
              AWS API evidence per hop, attack simulation, and a signed Breach Prevention Certificate when each path is
              closed.
            </p>
            <div className="mt-7 hp-mono text-[12px] text-[var(--hp-ink3)] leading-[1.7]">
              Zero write access <span className="text-[var(--hp-ink4)] mx-1.5">·</span>
              No agents <span className="text-[var(--hp-ink4)] mx-1.5">·</span>
              Your data never leaves AWS <span className="text-[var(--hp-ink4)] mx-1.5">·</span>
              Read-only IAM
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/demo" className="hp-btn-primary" onClick={() => Analytics.ctaClicked("hero", "get_demo")}>
                Get a demo
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
              <Link href="#proof" className="hp-btn-ghost">
                See a live attack path
                <ArrowDown className="w-4 h-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 lg:flex lg:justify-end lg:items-start">
            <HeroLiveCard />
          </div>
        </div>
        <div className="mt-20 lg:mt-24">
          <div className="flex items-center justify-between mb-6">
            <p className="hp-eyebrow">Path · live evidence</p>
            <div className="hidden sm:flex items-center gap-2 hp-eyebrow">
              <span className="hp-green-dot" />
              <span>verified · signed</span>
            </div>
          </div>
          <div className="hp-card px-6 lg:px-10 py-10 lg:py-12 hp-dotgrid">
            <div className="overflow-x-auto -mx-2 px-2 sm:mx-0 sm:px-0 sm:overflow-visible">
              <div className="flex items-stretch min-w-[920px] sm:min-w-0 justify-between">
                {HOPS.map((h, i) => (
                  <div key={h.id} className="contents">
                    <HopNode {...h} />
                    {i < HOPS.length - 1 && <HopArrow {...CALLS[i]} />}
                  </div>
                ))}
              </div>
            </div>
            <p className="hp-mono text-[11.5px] text-[var(--hp-ink3)] mt-7 hp-foot-anim" style={{ animationDelay: "2900ms" }}>
              1.2&nbsp;seconds <span className="text-[var(--hp-ink4)] mx-2">·</span>
              4&nbsp;hops <span className="text-[var(--hp-ink4)] mx-2">·</span>
              92% exploit confidence <span className="text-[var(--hp-ink4)] mx-2">·</span>
              <span className="text-[var(--hp-ok)]">signed</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
