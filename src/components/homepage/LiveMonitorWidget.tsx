"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, Lock, Radar, ShieldCheck } from "lucide-react";

type Tone = "ink" | "brand" | "ok";

type Row = {
  icon: typeof Radar;
  label: string;
  value: number;
  tone: Tone;
  /** how likely this metric is to tick, relative weight */
  weight: number;
};

const INITIAL_ROWS: Row[] = [
  { icon: Radar, label: "Attack paths mapped", value: 14, tone: "ink", weight: 4 },
  { icon: Activity, label: "Reachable to prod data", value: 3, tone: "brand", weight: 1 },
  { icon: Lock, label: "Live exploit sims", value: 2, tone: "brand", weight: 1 },
  { icon: ShieldCheck, label: "Closed & signed today", value: 8, tone: "ok", weight: 3 },
];

const TONE: Record<Tone, string> = {
  ink: "var(--v2-ink)",
  brand: "var(--v2-brand2)",
  ok: "var(--v2-ok)",
};

const GLOW: Record<Tone, string> = {
  ink: "none",
  brand: "0 0 16px rgba(255, 79, 163, 0.35)",
  ok: "0 0 16px rgba(16, 185, 129, 0.3)",
};

type FeedEvent = { text: string; tone: Tone; step: number };

const FEED: FeedEvent[] = [
  { text: "new path · alb-prod-edge → svc-app", tone: "ok", step: 7 },
  { text: "exploit sim · s3-public → rds-prod", tone: "brand", step: 11 },
  { text: "signed · finding #4821 closed", tone: "ok", step: 5 },
  { text: "recon · iam-role assumed", tone: "ink", step: 9 },
  { text: "reachable · lambda → secrets-mgr", tone: "brand", step: 13 },
];

const DOT: Record<Tone, string> = {
  ink: "var(--v2-ink3)",
  brand: "var(--v2-brand2)",
  ok: "var(--v2-ok)",
};

function fmt(totalSeconds: number) {
  const base = 13 * 3600 + 42 * 60 + 7; // 13:42:07
  const t = base + totalSeconds;
  const h = Math.floor(t / 3600) % 24;
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

export default function LiveMonitorWidget() {
  const reduced = usePrefersReducedMotion();

  const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);
  const [flashed, setFlashed] = useState<string | null>(null);
  const [feedIndex, setFeedIndex] = useState(0);
  const [clock, setClock] = useState(0);

  const weightedPool = useMemo(
    () => INITIAL_ROWS.flatMap((r, i) => Array<number>(r.weight).fill(i)),
    [],
  );

  // Live metric ticks — periodically bump a weighted-random metric and flash it.
  useEffect(() => {
    if (reduced) return;
    let alive = true;
    let clearFlash: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!alive) return;
      const idx = weightedPool[Math.floor(Math.random() * weightedPool.length)];
      setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, value: r.value + 1 } : r)));
      setFlashed(INITIAL_ROWS[idx].label);
      clearFlash = setTimeout(() => alive && setFlashed(null), 900);
    };

    const id = setInterval(tick, 2600);
    return () => {
      alive = false;
      clearInterval(id);
      clearTimeout(clearFlash);
    };
  }, [reduced, weightedPool]);

  // Rotating event feed + advancing clock.
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setFeedIndex((i) => {
        const next = (i + 1) % FEED.length;
        setClock((c) => c + FEED[next].step);
        return next;
      });
    }, 3400);
    return () => clearInterval(id);
  }, [reduced]);

  const feed = FEED[feedIndex];

  return (
    <div className="card-dark dotgrid-dark lmw-root relative overflow-hidden rounded-[14px] p-5">
      <style>{lmwStyles}</style>

      {/* layered brand glow */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40"
        style={{
          background: "radial-gradient(closest-side, rgba(255,27,141,0.16), rgba(255,27,141,0) 70%)",
          filter: "blur(8px)",
        }}
        aria-hidden
      />
      {/* sweeping scan line */}
      <div className="hero-live-scan pointer-events-none absolute inset-x-0 top-0 h-px" aria-hidden />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-2">
            <span className="pink-dot dot-pulse" />
            <span className="v2-mono text-[11px] tracking-[0.18em] text-[var(--v2-ink)]">LIVE</span>
          </span>
          {/* live activity sparkline */}
          <span className="lmw-spark" aria-hidden>
            {SPARK_DELAYS.map((d, i) => (
              <span key={i} className="lmw-spark-bar" style={{ animationDelay: `${d}s` }} />
            ))}
          </span>
        </div>
        <span className="v2-mono text-[10.5px] tracking-[0.1em] text-[var(--v2-ink3)]">us-east-1 · acme-prod</span>
      </div>

      <div
        className="my-4 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--v2-line) 14%, var(--v2-line) 86%, transparent)" }}
      />

      <ul className="relative flex flex-col gap-2">
        {rows.map((r) => {
          const Icon = r.icon;
          const isFlash = flashed === r.label;
          return (
            <li
              key={r.label}
              className={`lmw-row flex items-center justify-between gap-4 rounded-[8px] px-2 py-1.5 ${
                isFlash ? "lmw-row--flash" : ""
              }`}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[7px] border border-[var(--v2-line2)] bg-[var(--v2-overlay)]">
                  <Icon className="h-3.5 w-3.5" style={{ color: "var(--v2-ink2)" }} aria-hidden />
                </span>
                <span className="truncate text-[13px] text-[var(--v2-ink2)]">{r.label}</span>
              </div>
              <span
                key={r.value}
                className={`v2-mono text-[15px] font-medium tabular-nums ${isFlash ? "lmw-pop" : ""}`}
                style={{ color: TONE[r.tone], textShadow: GLOW[r.tone] }}
              >
                {r.value}
              </span>
            </li>
          );
        })}
      </ul>

      <div
        className="my-4 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--v2-line) 14%, var(--v2-line) 86%, transparent)" }}
      />

      <div className="relative flex items-center gap-2.5 overflow-hidden">
        <span
          className="dot-pulse h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: DOT[feed.tone], boxShadow: `0 0 10px ${DOT[feed.tone]}` }}
        />
        <span key={feedIndex} className="lmw-feed v2-mono truncate text-[11px] text-[var(--v2-ink3)]">
          <span style={{ color: "var(--v2-ink2)" }}>{fmt(clock)}</span> · {feed.text}
        </span>
      </div>
    </div>
  );
}

const SPARK_DELAYS = [0, 0.15, 0.3, 0.1, 0.42, 0.22, 0.36, 0.06, 0.28, 0.48, 0.18, 0.34];

const lmwStyles = `
.lmw-row { transition: background-color .5s ease; }
.lmw-row--flash { background-color: rgba(255, 79, 163, 0.07); }

.lmw-pop { animation: lmwPop .5s cubic-bezier(.2,.8,.2,1); display: inline-block; }
@keyframes lmwPop {
  0% { transform: translateY(3px) scale(.9); opacity: .4; }
  55% { transform: translateY(0) scale(1.14); }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}

.lmw-feed { animation: lmwFeedIn .5s cubic-bezier(.2,.8,.2,1); }
@keyframes lmwFeedIn {
  0% { transform: translateY(8px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

.lmw-spark {
  display: inline-flex;
  align-items: flex-end;
  gap: 2px;
  height: 12px;
  opacity: .9;
}
.lmw-spark-bar {
  width: 2px;
  height: 100%;
  border-radius: 1px;
  transform-origin: bottom;
  background: linear-gradient(to top, rgba(255,79,163,.35), var(--v2-brand2));
  animation: lmwSpark 1.1s ease-in-out infinite;
}
@keyframes lmwSpark {
  0%, 100% { transform: scaleY(.25); opacity: .5; }
  50% { transform: scaleY(1); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .lmw-pop, .lmw-feed, .lmw-spark-bar { animation: none !important; }
  .lmw-spark-bar { transform: scaleY(.55); }
}
`;
