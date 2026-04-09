import Link from "next/link";
import { MagneticCard } from "@/components/MagneticCard";

export function BeforeAfter() {
  return (
    <section style={{ padding: "80px 0", background: "var(--dark)" }}>
      <div
        className="max-w-6xl mx-auto px-6 w-full"
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
          paddingLeft: "24px",
          paddingRight: "24px",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span
            className="mb-3 text-center block"
            style={{
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.24em",
              color: "rgba(255,255,255,0.38)",
              fontFamily: "var(--font-mono)",
              marginBottom: "14px",
            }}
          >
            The proof layer
          </span>
          <h2
            className="display-lg"
            style={{
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            Every claim backed by evidence.
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "16px",
              lineHeight: 1.65,
              maxWidth: "640px",
              margin: "20px auto 0",
            }}
          >
            Any tool can show you an attack graph. Only XSEE can prove — hop by hop, API call by API call — that the path
            is real and exploitable right now.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full proof-grid"
          style={{ marginBottom: "36px" }}
        >
          <MagneticCard
            style={{
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                What every other tool gives you
              </span>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                }}
              >
                Theoretical
              </span>
            </div>
            <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Alert lists ranked by CVSS score",
                "Theoretical attack graphs — not validated against your live environment",
                "No live API call per hop — cannot prove a path is actually exploitable",
                "No cryptographic evidence package for audit or compliance",
                "The loop never closes — findings age, never get verified",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    fontSize: "12px",
                    color: "#64748b",
                    lineHeight: 1.5,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    style={{ flexShrink: 0, marginTop: "1px" }}
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </MagneticCard>

          <MagneticCard
            style={{
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                What XSEE proves
              </span>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                }}
              >
                Live validated
              </span>
            </div>
            <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                ["3 paths", " that actually reach your production database"],
                ["Live AWS API call per hop", " — cryptographic evidence, timestamped"],
                ["Detection Coverage Score", " — the % your tools actually catch"],
                ["One fix → 6 paths eliminated", " → L2 re-validates → path closed"],
                ["Before/after certificate", " — board-ready, SOC2-ready, signed"],
              ].map(([bold, rest]) => (
                <div
                  key={bold}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    fontSize: "12px",
                    color: "#64748b",
                    lineHeight: 1.5,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    style={{ flexShrink: 0, marginTop: "1px" }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    <strong style={{ color: "#0f172a", fontWeight: 600 }}>{bold}</strong>
                    {rest}
                  </span>
                </div>
              ))}
            </div>
          </MagneticCard>
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.48)", marginBottom: "16px" }}>
            This is not a gap competitors can close. It is a structural difference in how XSEE is built.
          </p>
          <Link
            href="/free-scan"
            className="btn-shimmer"
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--pink)",
              color: "white",
              fontSize: "14px",
              fontWeight: 700,
              padding: "12px 24px",
              borderRadius: "10px",
              textDecoration: "none",
              boxShadow: "0 0 24px rgba(255,27,141,0.35)",
              transition: "all 0.2s",
              overflow: "hidden",
            }}
          >
            <span className="inline-flex items-center gap-2">Run Free Scan — Prove it yourself →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
