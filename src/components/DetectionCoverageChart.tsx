"use client";

import { useEffect, useRef, useState } from "react";

const ROWS: { label: string; pct: number; from: string; to: string; glow: string }[] = [
  { label: "Lateral Movement", pct: 8, from: "#EF4444", to: "#DC2626", glow: "rgba(239,68,68,0.4)" },
  { label: "Privilege Escalation", pct: 22, from: "#F97316", to: "#EA580C", glow: "rgba(249,115,22,0.4)" },
  { label: "Data Exfiltration", pct: 31, from: "#EAB308", to: "#CA8A04", glow: "rgba(234,179,8,0.4)" },
  { label: "Initial Access", pct: 45, from: "#84CC16", to: "#65A30D", glow: "rgba(132,204,22,0.4)" },
  { label: "Defense Evasion", pct: 12, from: "#EF4444", to: "#DC2626", glow: "rgba(239,68,68,0.4)" },
  { label: "Credential Access", pct: 28, from: "#F97316", to: "#EA580C", glow: "rgba(249,115,22,0.4)" },
];

export default function DetectionCoverageChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="elite-detect-section" aria-labelledby="elite-detect-title">
      <div ref={ref} className="elite-detect-card">
        <div className="elite-detect-head">
          <div>
            <h2 id="elite-detect-title" style={{ fontSize: 18, fontWeight: 800, color: "#f8fafc", marginBottom: 6, letterSpacing: "-0.02em" }}>
              Detection Coverage Score — By Attack Technique
            </h2>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>
              How much of each TTP your tools actually detect
            </p>
          </div>
          <div className="elite-detect-badges">
            <span className="elite-detect-badge" style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" }}>
              Avg: 34%
            </span>
            <span className="elite-detect-badge" style={{ background: "rgba(245,158,11,0.12)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.25)" }}>
              AI: 18%
            </span>
          </div>
        </div>

        {ROWS.map((row, i) => (
          <div
            key={row.label}
            className="elite-detect-bar-row"
            style={{ transitionDelay: visible ? `${i * 0.1}s` : "0s" }}
          >
            <div className="elite-detect-bar-label">{row.label}</div>
            <div className="elite-detect-bar-track">
              <div
                className="elite-detect-bar-fill"
                style={{
                  width: visible ? `${row.pct}%` : "0%",
                  background: `linear-gradient(90deg, ${row.from}, ${row.to})`,
                  boxShadow: `0 0 8px ${row.glow}`,
                  transition: "width 1s cubic-bezier(0.22, 1, 0.36, 1)",
                  transitionDelay: visible ? `${i * 0.1}s` : "0s",
                }}
              />
            </div>
            <div className="elite-detect-bar-val" style={{ color: row.from }}>
              {row.pct}%
            </div>
          </div>
        ))}

        <div className="elite-detect-foot">
          Your average: 34% — Industry needs: 80%+
        </div>
      </div>
    </section>
  );
}
