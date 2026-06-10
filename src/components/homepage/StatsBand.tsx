"use client";

import { useEffect, useRef, useState } from "react";

type StatItem = {
  /** Number to count up to */
  target: number;
  /** Characters before the number, e.g. "$" or "<" */
  prefix?: string;
  /** Characters after the number, e.g. "+", "%", "m", "M" */
  suffix?: string;
  /** Decimal places to render while counting */
  decimals?: number;
  label: string;
  accent?: boolean;
};

const STATS: StatItem[] = [
  { target: 1000, suffix: "+", label: "attack patterns in XSEE's engine" },
  { target: 7, label: "engines in the autonomous loop" },
  { target: 92, suffix: "%", label: "avg exploit confidence score" },
  { target: 30, prefix: "<", suffix: "m", label: "time to first proven breach path" },
  { target: 3.2, prefix: "$", suffix: "M", decimals: 1, label: "avg data-at-risk proven on first scan", accent: true },
];

function formatValue(value: number, s: StatItem): string {
  const num = s.decimals ? value.toFixed(s.decimals) : Math.round(value).toLocaleString("en-US");
  return `${s.prefix ?? ""}${num}${s.suffix ?? ""}`;
}

function StatFigure({ stat, play }: { stat: StatItem; play: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!play) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(stat.target);
      return;
    }

    const duration = 1100;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo for a confident, decelerating count
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(stat.target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, stat.target]);

  return (
    <div
      className={`hp-mono font-medium leading-none ${stat.accent ? "text-[var(--hp-brand)]" : "text-[var(--hp-ink)]"}`}
      style={{ fontSize: "clamp(34px, 4.6vw, 54px)", letterSpacing: "-0.04em" }}
    >
      {formatValue(value, stat)}
    </div>
  );
}

export default function HomepageStatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setPlay(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setPlay(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="hp-section" aria-labelledby="stats-title">
      <div className="hp-container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 mb-14">
          <div>
            <p className="hp-eyebrow mb-5">Production telemetry</p>
            <h2
              id="stats-title"
              className="hp-h-display hp-h-display--wide"
              style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
            >
              <span className="block">The platform in numbers.</span>
              <span className="block text-[var(--hp-ink3)]">What XSEE proves, every day.</span>
            </h2>
          </div>
          <div className="hp-mono text-[11.5px] text-[var(--hp-ink3)] inline-flex items-center gap-2">
            <span className="hp-green-dot" style={{ boxShadow: "none" }} />
            Live read-only scans
          </div>
        </div>

        {/* Instrument panel — framed metric row with hairline dividers */}
        <div ref={ref} className="hp-card overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-y divide-[var(--hp-line)] md:grid-cols-3 md:divide-y-0 lg:grid-cols-5">
            {STATS.map((s) => (
              <div
                key={s.label}
                className={`relative p-6 lg:p-8 ${s.accent ? "bg-[color:rgba(255,27,141,0.04)]" : ""}`}
              >
                <StatFigure stat={s} play={play} />
                <p className="mt-4 text-[13.5px] text-[var(--hp-ink2)] leading-[1.45] max-w-[200px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
