"use client";

import { Fragment, useEffect, useRef, useState } from "react";

const STAGES = [
  { n: "①", name: "Discover", desc: "Live attack graph", badge: "auto" as const, circle: "rgba(37,99,235,0.25)", color: "#60A5FA", border: "rgba(59,130,246,0.4)" },
  { n: "②", name: "Validate", desc: "L2 API evidence per hop", badge: "auto" as const, circle: "rgba(124,58,237,0.25)", color: "#A78BFA", border: "rgba(167,139,250,0.35)" },
  { n: "③", name: "Simulate", desc: "AI + human attacker", badge: "auto" as const, circle: "rgba(249,115,22,0.25)", color: "#FB923C", border: "rgba(251,146,60,0.35)" },
  { n: "④", name: "Prioritize", desc: "$ + compliance + KEV", badge: "auto" as const, circle: "rgba(239,68,68,0.2)", color: "#FCA5A5", border: "rgba(248,113,113,0.35)" },
  { n: "⑤", name: "Fix", desc: "Terraform/CLI recommendation", badge: "human" as const, circle: "rgba(255,27,141,0.2)", color: "#FF1B8D", border: "#FF1B8D", pulse: true },
  { n: "⑥", name: "Verify", desc: "L2 re-runs after fix", badge: "auto" as const, circle: "rgba(16,185,129,0.2)", color: "#34D399", border: "rgba(52,211,153,0.35)" },
  { n: "⑦", name: "Certify", desc: "Before/after proof", badge: "auto" as const, circle: "rgba(245,158,11,0.2)", color: "#F59E0B", border: "rgba(245,158,11,0.35)" },
];

export default function CompleteLoopSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const startedRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [ringAt, setRingAt] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        io.disconnect();
        setPhase("running");
        setProgress(0);
        const timers = timersRef.current;
        for (let p = 1; p <= 7; p++) {
          const pid = window.setTimeout(() => {
            setProgress(p);
            setRingAt(p - 1);
          }, (p - 1) * 300);
          timers.push(pid);
        }
        timers.push(
          window.setTimeout(() => {
            setRingAt(null);
            setPhase("done");
          }, 7 * 300 + 400)
        );
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  const isLit = (i: number) => {
    if (phase === "idle" || phase === "done") return true;
    return progress > i;
  };

  const connectorOn = (i: number) => {
    if (phase === "idle" || phase === "done") return true;
    return progress > i;
  };

  return (
    <section ref={sectionRef} className="elite-loop-section" aria-labelledby="elite-loop-title">
      <div className="elite-loop-inner">
        <div className="elite-loop-head">
          <span className="section-eyebrow mb-3 block">The complete loop</span>
          <h2 id="elite-loop-title" className="elite-attack-graph-title">
            The only platform that closes all 7 stages.
          </h2>
          <p className="elite-attack-graph-sub" style={{ maxWidth: 520, margin: "0 auto" }}>
            Every other tool stops at stage 1 or 2. XSEE runs the full loop — automatically. One human decision at stage 5.
            Everything else: XSEE.
          </p>
        </div>

        <div className="elite-loop-flow">
          {STAGES.map((s, i) => (
            <Fragment key={s.n}>
              {i > 0 && (
                <div className="elite-loop-connector-wrap" aria-hidden>
                  <div className={`elite-loop-connector ${connectorOn(i) ? "elite-loop-connector--on" : ""}`} />
                </div>
              )}
              <div
                className={`elite-loop-card ${phase === "running" && !isLit(i) ? "elite-loop-card--dim" : ""} ${ringAt === i ? "elite-loop-card-ring" : ""} ${phase === "done" && s.pulse ? "elite-loop-stage5" : ""}`}
              >
                <div
                  className="elite-loop-num"
                  style={{
                    background: s.circle,
                    color: s.color,
                    border: `1px solid ${s.border}`,
                  }}
                >
                  {s.n}
                </div>
                <div className="elite-loop-name">{s.name}</div>
                <div className="elite-loop-desc">{s.desc}</div>
                <span className={`elite-loop-badge ${s.badge === "auto" ? "elite-loop-badge-auto" : "elite-loop-badge-human"}`}>
                  {s.badge === "auto" ? "XSEE auto" : "1 human approval"}
                </span>
              </div>
            </Fragment>
          ))}
        </div>

        <p className="elite-loop-human-line">
          Human effort: one approval at stage{" "}
          <span style={{ color: "#FF1B8D", fontWeight: 800 }}>⑤</span>
          . Everything else is automatic.
        </p>
      </div>
    </section>
  );
}
