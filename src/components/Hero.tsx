"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import HeroNetworkViz from "@/components/background/HeroNetworkViz";
import { Analytics } from "@/lib/analytics";

const REGISTER_URL = "https://app.xsee.io/register";

const PINK = "#e91e8c";
const PINK_HOVER = "#d4187f";

const AGENT_MESSAGES: { text: string; highlight: string }[] = [
  {
    text: "Investigation Agent analyzing — iam-role-prod → prod-db · L2 collecting evidence",
    highlight: "Investigation Agent",
  },
  {
    text: "L2 confirmed lateral movement — alb-prod → ec2-bastion · SG rule matched",
    highlight: "L2 confirmed",
  },
  {
    text: "Privilege escalation proven — AssumeRole confirmed · confidence 94%",
    highlight: "Privilege escalation proven",
  },
  {
    text: "Crown jewel reachable — prod-db exposed · Investigation Agent generating verdict",
    highlight: "Crown jewel reachable",
  },
  {
    text: "Fix plan ready — revoke sg-bastion TCP/22 · 4 paths eliminated · awaiting your approval",
    highlight: "Fix plan ready",
  },
];

function highlightLine(text: string, highlight: string) {
  const i = text.indexOf(highlight);
  if (i < 0) {
    return <>{text}</>;
  }
  return (
    <>
      {text.slice(0, i)}
      <span style={{ color: PINK }}>{highlight}</span>
      {text.slice(i + highlight.length)}
    </>
  );
}

function HeroAgentStatusBar() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setIdx((n) => (n + 1) % AGENT_MESSAGES.length);
    }, 3000);
    return () => window.clearInterval(t);
  }, []);

  const { text, highlight } = AGENT_MESSAGES[idx];

  return (
    <div
      style={{
        background: "rgba(233,30,140,0.06)",
        border: "1px solid rgba(233,30,140,0.2)",
        borderRadius: 7,
        padding: "8px 12px",
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
        <span
          aria-hidden
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: PINK,
            flexShrink: 0,
            animation: "heroSplitPinkPulse 2s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontSize: 10,
            fontFamily: "var(--font-mono)",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.35,
          }}
        >
          {highlightLine(text, highlight)}
        </span>
      </div>
      <span
        style={{
          background: "rgba(233,30,140,0.12)",
          color: PINK,
          border: "1px solid rgba(233,30,140,0.25)",
          fontSize: 9,
          fontWeight: 600,
          padding: "2px 7px",
          borderRadius: 4,
          letterSpacing: "0.08em",
          flexShrink: 0,
        }}
      >
        RUNNING
      </span>
    </div>
  );
}

function HeroConfidenceMetrics() {
  const [mounted, setMounted] = useState(false);
  const [confidence, setConfidence] = useState(1);
  const [currentHop, setCurrentHop] = useState(1);
  const [exploitable, setExploitable] = useState(false);
  const confidenceRef = useRef(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let hopTimer: ReturnType<typeof setInterval> | undefined;
    let rampTimer: ReturnType<typeof setInterval> | undefined;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const clearAll = () => {
      if (hopTimer) clearInterval(hopTimer);
      if (rampTimer) clearInterval(rampTimer);
      if (holdTimer) clearTimeout(holdTimer);
      hopTimer = undefined;
      rampTimer = undefined;
      holdTimer = undefined;
    };

    const runCycle = () => {
      if (cancelled) return;
      clearAll();
      setExploitable(false);
      confidenceRef.current = 1;
      setConfidence(1);
      setCurrentHop(1);

      hopTimer = setInterval(() => {
        if (cancelled) return;
        setCurrentHop((h) => (h >= 4 ? 4 : h + 1));
      }, 400);

      rampTimer = setInterval(() => {
        if (cancelled) return;
        const c = confidenceRef.current;
        if (c >= 92) return;
        const step = Math.floor(Math.random() * 6) + 3;
        const next = Math.min(92, c + step);
        confidenceRef.current = next;
        setConfidence(next);
        if (next >= 92) {
          if (hopTimer) clearInterval(hopTimer);
          if (rampTimer) clearInterval(rampTimer);
          hopTimer = undefined;
          rampTimer = undefined;
          setExploitable(true);
          holdTimer = setTimeout(() => {
            if (!cancelled) runCycle();
          }, 3000);
        }
      }, 350);
    };

    runCycle();

    return () => {
      cancelled = true;
      clearAll();
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 7,
            overflow: "hidden",
            marginBottom: 0,
          }}
        >
          {[
            { v: "1", c: "#f87171", l: "confidence" },
            { v: "4", c: "#fb923c", l: "hops" },
            { v: "34%", c: "#4ade80", l: "detection" },
            { v: "$18.5M", c: "#fbbf24", l: "exposure" },
          ].map((cell) => (
            <div
              key={cell.l}
              style={{
                background: "#030810",
                padding: "10px 12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 700, color: cell.c }}>{cell.v}</div>
              <div
                style={{
                  fontSize: 8,
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
                {cell.l}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            paddingTop: 10,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.3)" }}>
            L2 running hop 1 of 4…
          </span>
        </div>
      </>
    );
  }

  const displayConf = Math.min(92, confidence);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 7,
          overflow: "hidden",
          marginBottom: 0,
        }}
      >
        <div style={{ background: "#030810", padding: "10px 12px", textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#f87171" }}>{displayConf}</div>
          <div
            style={{
              fontSize: 8,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              marginTop: 2,
            }}
          >
            confidence
          </div>
        </div>
        <div style={{ background: "#030810", padding: "10px 12px", textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fb923c" }}>4</div>
          <div
            style={{
              fontSize: 8,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              marginTop: 2,
            }}
          >
            hops
          </div>
        </div>
        <div style={{ background: "#030810", padding: "10px 12px", textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#4ade80" }}>34%</div>
          <div
            style={{
              fontSize: 8,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              marginTop: 2,
            }}
          >
            detection
          </div>
        </div>
        <div style={{ background: "#030810", padding: "10px 12px", textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fbbf24" }}>$18.5M</div>
          <div
            style={{
              fontSize: 8,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              marginTop: 2,
            }}
          >
            exposure
          </div>
        </div>
      </div>
      <div
        style={{
          paddingTop: 10,
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {!exploitable ? (
            <>
              <span
                style={{
                  background: "rgba(59,130,246,0.15)",
                  color: "#60a5fa",
                  border: "1px solid rgba(59,130,246,0.3)",
                  fontSize: 9,
                  padding: "2px 7px",
                  borderRadius: 4,
                  fontWeight: 600,
                }}
              >
                VALIDATING
              </span>
              <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.3)" }}>
                L2 running hop {currentHop} of 4…
              </span>
            </>
          ) : (
            <>
              <span
                style={{
                  background: "rgba(220,38,38,0.15)",
                  color: "#f87171",
                  border: "1px solid rgba(220,38,38,0.3)",
                  fontSize: 9,
                  padding: "2px 7px",
                  borderRadius: 4,
                  fontWeight: 600,
                }}
              >
                EXPLOITABLE
              </span>
              <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.3)" }}>
                Path confirmed · confidence 92%
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const STATS = [
  { value: "1,000+", label: "Attack patterns in XSEE's engine" },
  { value: "7", label: "Engines in the autonomous loop" },
  { value: "92%", label: "Avg exploit confidence score" },
  { value: "<30m", label: "Time to first proven breach path" },
  { value: "$18.5M", label: "Avg financial exposure on first scan" },
] as const;

export default function Hero() {
  return (
    <>
      <style>{`
        @keyframes heroSplitEyebrowPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(233,30,140,0.4); }
          50% { box-shadow: 0 0 0 4px rgba(233,30,140,0); }
        }
        @keyframes heroSplitPinkPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }
        @keyframes heroSplitLivePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,222,128,0.35); }
          50% { box-shadow: 0 0 0 4px rgba(74,222,128,0); }
        }
        .hero-split-root {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 60px);
          background: #030810;
          overflow: hidden;
          position: relative;
        }
        .hero-split-glow1 {
          position: absolute;
          width: 700px;
          height: 700px;
          top: -200px;
          left: -200px;
          background: radial-gradient(circle, rgba(233,30,140,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .hero-split-glow2 {
          position: absolute;
          width: 500px;
          height: 500px;
          top: -80px;
          right: -120px;
          background: radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .hero-split-grid-bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }
        .hero-split-stats {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          border-top: 1px solid rgba(255,255,255,0.06);
          background: #030810;
        }
        .hero-split-stat {
          padding: 20px 0;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .hero-split-stat:last-child {
          border-right: none;
        }
        .hero-split-stat-val {
          font-size: 26px;
          font-weight: 800;
          color: #e91e8c;
        }
        .hero-split-stat-lbl {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          margin-top: 4px;
        }
        @media (max-width: 768px) {
          .hero-split-root {
            grid-template-columns: 1fr;
          }
          .hero-split-right {
            display: none !important;
          }
          .hero-split-left {
            padding: 48px 24px 32px !important;
          }
          .hero-split-headline {
            font-size: 36px !important;
          }
          .hero-split-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-split-stat:nth-child(5) {
            grid-column: span 2;
            border-right: none;
          }
          .hero-split-stat:nth-child(2) {
            border-right: none;
          }
          .hero-split-stat:nth-child(4) {
            border-right: none;
          }
        }
      `}</style>

      <section className="hero-split-root" aria-label="Hero">
        <div className="hero-split-glow1" aria-hidden />
        <div className="hero-split-glow2" aria-hidden />
        <div className="hero-split-grid-bg" aria-hidden />

        <div
          className="hero-split-left"
          style={{
            padding: "80px 64px 80px 80px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: 2,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: PINK,
                flexShrink: 0,
                animation: "heroSplitEyebrowPulse 2s infinite",
              }}
            />
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
              }}
            >
              Cloud Attack Intelligence · Autonomous Breach Prevention
            </span>
          </div>

          <h1
            className="hero-split-headline"
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: "0 0 20px",
            }}
          >
            Stop guessing.
            <br />
            <span style={{ color: PINK }}>Prove</span> the breach.
          </h1>

          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.65,
              maxWidth: 440,
              margin: "0 0 36px",
            }}
          >
            Your scanner found 4,000 issues.
            <br />
            <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>Three of them reach your database.</span>
            <br />
            XSEE&apos;s AI agents prove which three — live API evidence per hop, autonomous investigation, one approval.
            <br />
            Everything else is XSEE.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 0 }}>
            <Link
              href={REGISTER_URL}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: PINK,
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                padding: "14px 28px",
                borderRadius: 8,
                textDecoration: "none",
                transition: "background 150ms, transform 150ms",
              }}
              onClick={() => Analytics.ctaClicked("hero", "start_free_trial")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = PINK_HOVER;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = PINK;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Start Free Trial →
            </Link>
            <Link
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 15,
                padding: "14px 24px",
                borderRadius: 8,
                textDecoration: "none",
                transition: "border-color 150ms, color 150ms",
              }}
              onClick={() => Analytics.ctaClicked("hero", "get_demo")}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              Get a demo
            </Link>
          </div>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            <ShieldCheck size={14} color="#4ade80" aria-hidden style={{ flexShrink: 0 }} />
            <span>
              Read-only IAM · No agents · Your data never leaves your AWS environment
            </span>
          </div>
        </div>

        <div
          className="hero-split-right"
          style={{
            padding: "60px 64px 60px 32px",
            display: "flex",
            alignItems: "center",
            zIndex: 2,
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              background: "#060d18",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(233,30,140,0.1), 0 40px 80px rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                background: "#040a13",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
                  <span
                    key={c}
                    aria-hidden
                    style={{ width: 10, height: 10, borderRadius: "50%", background: c, flexShrink: 0 }}
                  />
                ))}
              </div>
              <div
                style={{
                  flex: 1,
                  maxWidth: 280,
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 5,
                  padding: "4px 12px",
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  color: "rgba(255,255,255,0.25)",
                  textAlign: "center",
                }}
              >
                app.xsee.io/attack-intelligence
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 10,
                  color: "#4ade80",
                  letterSpacing: "0.06em",
                  flexShrink: 0,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#4ade80",
                    animation: "heroSplitLivePulse 2s ease-in-out infinite",
                  }}
                />
                LIVE · eu-central-1
              </div>
            </div>

            <div style={{ padding: 16 }}>
              <HeroAgentStatusBar />

              <div
                style={{
                  height: 160,
                  background: "#030810",
                  borderRadius: 10,
                  marginBottom: 12,
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 8,
                    flexShrink: 0,
                    padding: "6px 8px 0",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    Lateral Movement
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    IAM Priv. Esc.
                  </span>
                </div>
                <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
                  <HeroNetworkViz />
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 8,
                      fontSize: 12,
                      color: "#fbbf24",
                      lineHeight: 1,
                      zIndex: 2,
                      textShadow: "0 0 8px rgba(251,191,36,0.4)",
                    }}
                  >
                    ♛
                  </span>
                </div>
              </div>

              <HeroConfidenceMetrics />
            </div>
          </div>
        </div>
      </section>

      <div className="hero-split-stats">
        {STATS.map((s) => (
          <div key={s.label} className="hero-split-stat">
            <div className="hero-split-stat-val">{s.value}</div>
            <div className="hero-split-stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}
