"use client";

import { Activity, Lock, Radar, ShieldCheck } from "lucide-react";

type Row = {
  icon: typeof Radar;
  label: string;
  value: string;
  tone: "ink" | "brand" | "ok";
};

const ROWS: Row[] = [
  { icon: Radar, label: "Attack paths mapped", value: "14", tone: "ink" },
  { icon: Activity, label: "Reachable to prod data", value: "3", tone: "brand" },
  { icon: Lock, label: "Live exploit sims", value: "2", tone: "brand" },
  { icon: ShieldCheck, label: "Closed & signed today", value: "8", tone: "ok" },
];

const TONE: Record<Row["tone"], string> = {
  ink: "var(--v2-ink)",
  brand: "var(--v2-brand2)",
  ok: "var(--v2-ok)",
};

const GLOW: Record<Row["tone"], string> = {
  ink: "none",
  brand: "0 0 16px rgba(255, 79, 163, 0.35)",
  ok: "0 0 16px rgba(16, 185, 129, 0.3)",
};

export default function LiveMonitorWidget() {
  return (
    <div className="card-dark dotgrid-dark relative overflow-hidden rounded-[14px] p-5">
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
        <div className="flex items-center gap-2">
          <span className="pink-dot dot-pulse" />
          <span className="v2-mono text-[11px] tracking-[0.18em] text-[var(--v2-ink)]">LIVE</span>
        </div>
        <span className="v2-mono text-[10.5px] tracking-[0.1em] text-[var(--v2-ink3)]">us-east-1 · acme-prod</span>
      </div>

      <div
        className="my-4 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--v2-line) 14%, var(--v2-line) 86%, transparent)" }}
      />

      <ul className="relative flex flex-col gap-3">
        {ROWS.map((r) => {
          const Icon = r.icon;
          return (
            <li key={r.label} className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[7px] border border-[var(--v2-line2)] bg-[var(--v2-overlay)]">
                  <Icon className="h-3.5 w-3.5" style={{ color: "var(--v2-ink2)" }} aria-hidden />
                </span>
                <span className="truncate text-[13px] text-[var(--v2-ink2)]">{r.label}</span>
              </div>
              <span
                className="v2-mono text-[15px] font-medium tabular-nums"
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

      <div className="relative flex items-center gap-2.5">
        <span className="green-dot dot-pulse" />
        <span className="v2-mono truncate text-[11px] text-[var(--v2-ink3)]">
          13:42:07 · new path · alb-prod-edge → svc-app
        </span>
      </div>
    </div>
  );
}
