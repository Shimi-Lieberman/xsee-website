"use client";

import Link from "next/link";
import { Analytics } from "@/lib/analytics";

const PATH_ROWS = [
  {
    chain: "Internet → EC2 → IAM Role → S3",
    meta: "CVE-2020-9283 · RCE · 4 hops",
    sev: "CRITICAL",
    sevColor: "#ef4444",
    l2: true,
    active: true,
  },
  {
    chain: "Public LB → Lambda → RDS Database",
    meta: "Privilege escalation · 3 hops",
    sev: "HIGH",
    sevColor: "#f97316",
    l2: true,
    active: false,
  },
  {
    chain: "EKS Pod → ServiceAccount → Secrets",
    meta: "Lateral movement · 2 hops",
    sev: "MEDIUM",
    sevColor: "#eab308",
    l2: false,
    active: false,
  },
] as const;

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "var(--dark)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "96px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="mesh-orb"
        style={{
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, rgba(255,31,143,0.1) 0%, transparent 70%)",
          top: "-150px",
          left: "-150px",
          animation: "orbDrift1 14s ease-in-out infinite",
        }}
      />
      <div
        className="mesh-orb"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          top: "30%",
          right: "-100px",
          animation: "orbDrift2 17s ease-in-out infinite",
        }}
      />
      <div
        className="mesh-orb"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)",
          bottom: "-50px",
          left: "35%",
          animation: "orbDrift3 20s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, black, transparent)",
          pointerEvents: "none",
        }}
      />

      <div
        className="hero-inner"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          maxWidth: "880px",
          padding: "0 32px",
        }}
      >
        <Link
          href="/changelog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 14px",
            borderRadius: "100px",
            border: "1px solid rgba(255,255,255,0.09)",
            background: "rgba(255,255,255,0.04)",
            marginBottom: "40px",
            cursor: "pointer",
            opacity: 1,
            textDecoration: "none",
          }}
        >
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>
            NEW Autonomous agents now live — Investigation · Board Report · Threat Hunt ›
          </span>
        </Link>

        <div className="hero-h1" style={{ marginBottom: "28px", width: "100%" }}>
          <h1
            style={{
              fontSize: "clamp(60px, 9vw, 108px)",
              fontWeight: 900,
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: "#fff",
              margin: 0,
              fontFamily: "var(--font-sans)",
            }}
          >
            <span className="word-reveal" style={{ animationDelay: "0ms", color: "#fff" }}>
              Stop guessing.
            </span>
            <div
              className="hero-pink-line"
              style={{
                fontSize: "clamp(60px, 9vw, 108px)",
                fontWeight: 900,
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                marginTop: "0.06em",
              }}
            >
              <span
                className="word-reveal"
                style={{
                  animationDelay: "200ms",
                  color: "var(--pink)",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                }}
              >
                Prove the breach.
              </span>
            </div>
          </h1>
        </div>

        <p
          className="hero-body-copy"
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.7,
            maxWidth: "640px",
            marginBottom: "16px",
          }}
        >
          Cloud security tools generate thousands of findings. XSEE proves which ones are real attack paths — with live
          AWS API evidence per hop, attack simulation, and a Breach Prevention Certificate when it&apos;s fixed. One human
          decision per finding.
        </p>

        <p
          className="hero-icp-line"
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.32)",
            lineHeight: 1.6,
            maxWidth: "640px",
            marginBottom: "28px",
          }}
        >
          Built for security teams at companies with 200–5,000 employees.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
            opacity: 1,
          }}
        >
          <Link
            href="/demo"
            className="btn-shimmer hero-cta-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "var(--pink)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "var(--font-sans)",
              padding: "16px 36px",
              borderRadius: "14px",
              textDecoration: "none",
              boxShadow: "0 0 50px rgba(255,31,143,0.4)",
            }}
            onClick={() => Analytics.ctaClicked("hero", "get_demo")}
          >
            Get a demo →
          </Link>
          <Link
            href="/free-scan"
            className="hero-cta-secondary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              background: "transparent",
              color: "rgba(255,255,255,0.75)",
              fontSize: "15px",
              fontWeight: 600,
              fontFamily: "var(--font-sans)",
              padding: "14px 28px",
              borderRadius: "14px",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.22)",
            }}
            onClick={() => Analytics.ctaClicked("hero", "free_breach_report")}
          >
            Free Breach Report — connect in 15 min
          </Link>
        </div>

        <p
          className="font-mono hero-trust-line"
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.45)",
            textAlign: "center",
            maxWidth: 520,
            lineHeight: 1.5,
            marginTop: "24px",
            marginBottom: 0,
          }}
        >
          Read-only IAM. No agents. Your data never leaves your AWS environment.
        </p>
      </div>

      <div
        className="hero-graph"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1100px",
          marginTop: "60px",
          padding: "0 24px 48px",
          opacity: 1,
        }}
      >
        <div
          className="hero-mockup-wrapper"
          style={{
            background: "rgba(8,12,24,0.95)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: `0 0 0 1px rgba(255,31,143,0.06), 0 60px 120px rgba(0,0,0,0.8), 0 0 150px rgba(255,31,143,0.04)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "11px 18px",
              background: "rgba(5,8,16,0.8)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              gap: "0",
            }}
          >
            <div style={{ display: "flex", gap: "6px", marginRight: "16px" }}>
              {["rgba(239,68,68,0.5)", "rgba(234,179,8,0.5)", "rgba(34,197,94,0.5)"].map((c) => (
                <div
                  key={c}
                  style={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "50%",
                    background: c,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                flex: 1,
                height: "26px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                  color: "rgba(255,255,255,0.28)",
                }}
              >
                app.xsee.io/attack-intelligence
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginLeft: "16px",
                fontSize: "10px",
                fontWeight: 600,
                color: "#22c55e",
                fontFamily: "var(--font-mono)",
              }}
            >
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  animation: "breathe 2s infinite",
                }}
              />
              Live · eu-central-1
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              background: "rgba(5,8,16,0.65)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {["Attack Paths", "IAM", "Network", "NHI"].map((tab, i) => (
                <div
                  key={tab}
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    background: i === 0 ? "rgba(255,27,141,0.12)" : "transparent",
                    color: i === 0 ? "#FF1B8D" : "rgba(255,255,255,0.3)",
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {[
              { val: "14", label: "Attack Paths", color: "#ef4444" },
              { val: "3", label: "Critical", color: "#ef4444" },
              { val: "92%", label: "Exploitable", color: "#f97316" },
              { val: "1", label: "Optimal Fix", color: "var(--pink)" },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "12px 16px",
                  textAlign: "center",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: 900,
                    fontFamily: "var(--font-mono)",
                    color: s.color,
                    lineHeight: 1,
                    marginBottom: "3px",
                  }}
                >
                  {s.val}
                </div>
                <div
                  style={{
                    fontSize: "8px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "rgba(255,255,255,0.22)",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ position: "relative" }}>
            <img
              src="/platform_screenshot.png"
              alt="XSEE Attack Intelligence Platform"
              style={{
                width: "100%",
                display: "block",
                maxHeight: "320px",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "100px",
                background: "linear-gradient(transparent, rgba(8,12,24,0.98))",
                pointerEvents: "none",
              }}
            />
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {PATH_ROWS.map((path) => (
              <div
                key={path.chain}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "9px 14px",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  borderLeft: path.active ? "2px solid #FF1B8D" : "2px solid transparent",
                  background: path.active ? "rgba(255,27,141,0.05)" : "transparent",
                  cursor: "pointer",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.7)",
                      fontFamily: "var(--font-mono)",
                      marginBottom: "2px",
                    }}
                  >
                    {path.chain}
                  </div>
                  <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.28)" }}>{path.meta}</div>
                </div>
                <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: "8px",
                      fontWeight: 700,
                      padding: "2px 7px",
                      borderRadius: "100px",
                      background: `${path.sevColor}20`,
                      color: path.sevColor,
                      border: `1px solid ${path.sevColor}40`,
                    }}
                  >
                    {path.sev}
                  </span>
                  {path.l2 && (
                    <span
                      style={{
                        fontSize: "7px",
                        fontWeight: 700,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        background: "rgba(37,99,235,0.15)",
                        color: "#60a5fa",
                        border: "1px solid rgba(37,99,235,0.25)",
                      }}
                    >
                      L2 ✓
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "140px",
          background: "linear-gradient(transparent, var(--bg))",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
    </section>
  );
}
