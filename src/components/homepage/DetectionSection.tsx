"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TECHNIQUES = [
  { name: "Initial Access", you: 45, ai: 22 },
  { name: "Credential Access", you: 28, ai: 14 },
  { name: "Privilege Escalation", you: 22, ai: 11 },
  { name: "Lateral Movement", you: 8, ai: 4 },
  { name: "Defense Evasion", you: 12, ai: 6 },
  { name: "Data Exfiltration", you: 31, ai: 16 },
] as const;

function CoverageBar({ name, you, ai }: { name: string; you: number; ai: number }) {
  const [animY, setY] = useState(0);
  const [animA, setA] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = () => {
      if (started.current) return;
      started.current = true;
      window.setTimeout(() => setY(you), 100);
      window.setTimeout(() => setA(ai), 300);
    };

    const checkInView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.95 && r.bottom > 0) trigger();
    };

    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) trigger();
          });
        },
        { threshold: 0, rootMargin: "0px 0px -5% 0px" },
      );
      io.observe(el);
    }
    checkInView();
    window.addEventListener("scroll", checkInView, { passive: true });
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", checkInView);
    };
  }, [you, ai]);

  return (
    <div ref={ref} className="border-b border-[var(--hp-line)] py-4 last:border-0">
      <div className="mb-2.5 grid grid-cols-[1fr_auto] items-baseline gap-3">
        <div className="truncate text-[13.5px] font-medium text-[var(--hp-ink)]">{name}</div>
        <div className="hp-mono whitespace-nowrap text-[11.5px] tabular-nums text-[var(--hp-ink2)]">
          You <span className="font-medium text-[var(--hp-ink)]">{animY}%</span>
          <span className="mx-2 text-[var(--hp-ink4)]">·</span>
          AI <span className="font-medium text-[var(--hp-brand)]">{animA}%</span>
        </div>
      </div>
      <div className="relative h-[28px]">
        <div className="absolute inset-0 overflow-hidden rounded-[6px] border border-[var(--hp-line)] bg-[var(--hp-elevated)]">
          <div
            className="absolute bottom-0 left-0 top-0 rounded-[6px] bg-[color:rgba(160,160,168,0.6)] transition-[width] duration-[1200ms] ease-out"
            style={{ width: `${animY}%` }}
          />
          <div
            className="absolute bottom-0 left-0 h-[10px] bg-[var(--hp-brand)] transition-[width] duration-[1200ms] ease-out"
            style={{ width: `${animA}%` }}
          />
        </div>
        {[25, 50, 75].map((g) => (
          <span
            key={g}
            className="pointer-events-none absolute bottom-0 top-0 w-px bg-[color:rgba(58,58,68,0.5)]"
            style={{ left: `${g}%` }}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}

export default function DetectionSection() {
  return (
    <section id="detection" className="hp-section border-t border-[var(--hp-line)]" aria-labelledby="detection-title">
      <div className="hp-container">
        <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="hp-eyebrow mb-5">Detection Coverage Score</p>
            <h2 id="detection-title" className="hp-h-display" style={{ fontSize: "clamp(34px, 4.6vw, 60px)" }}>
              <span className="block">Your tools catch</span>
              <span className="block text-[var(--hp-ink3)]">1 in 3 attack steps.</span>
            </h2>
            <p className="mt-8 max-w-[480px] text-[16px] leading-[1.65] text-[var(--hp-ink2)]">
              XSEE measures exactly how much of each attack chain your current tools can see. The average team is blind
              to <span className="text-[var(--hp-ink)]">66%</span> of what happens on their most critical paths. Now you
              have the number. Now you can fix it.
            </p>

            <div className="mt-10 grid max-w-[440px] grid-cols-2 gap-5">
              <div className="hp-card p-5">
                <p className="hp-eyebrow mb-2.5 text-[var(--hp-ink3)]">Human attacker</p>
                <div className="hp-mono text-[36px] font-medium leading-none text-[var(--hp-ink)]" style={{ letterSpacing: "-0.03em" }}>
                  34<span className="text-[20px] text-[var(--hp-ink3)]">%</span>
                </div>
                <p className="mt-2 text-[12px] text-[var(--hp-ink3)]">avg coverage</p>
              </div>
              <div className="hp-card border-[color:rgba(255,27,141,0.4)] p-5">
                <p className="hp-eyebrow mb-2.5 text-[var(--hp-brand)]">AI attacker</p>
                <div className="hp-mono text-[36px] font-medium leading-none text-[var(--hp-brand)]" style={{ letterSpacing: "-0.03em" }}>
                  18<span className="text-[20px] text-[color:rgba(255,27,141,0.6)]">%</span>
                </div>
                <p className="mt-2 text-[12px] text-[var(--hp-ink3)]">avg coverage</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="hp-card p-6 lg:p-8">
              <div className="mb-5 flex items-center justify-between">
                <p className="hp-eyebrow text-[var(--hp-ink3)]">By MITRE technique · cluster avg</p>
                <div className="hp-mono flex items-center gap-3 text-[11px]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-[color:rgba(160,160,168,0.6)]" aria-hidden />
                    <span className="text-[var(--hp-ink3)]">You</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-[var(--hp-brand)]" aria-hidden />
                    <span className="text-[var(--hp-ink3)]">AI</span>
                  </span>
                </div>
              </div>
              <div>
                {TECHNIQUES.map((t) => (
                  <CoverageBar key={t.name} {...t} />
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-[var(--hp-line)] pt-5">
                <p className="hp-mono text-[11px] text-[var(--hp-ink3)]">Source · last 30d, all customers</p>
                <Link
                  href="/free-scan"
                  className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--hp-ink)] transition-colors hover:text-[var(--hp-brand)]"
                >
                  See your score
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
