"use client";

import Link from "next/link";

export default function UnderAttackPage() {

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.location.href =
      "mailto:admin@xsee.io?subject=Emergency+Scan+Request&body=Company:%0D%0AContact:%0D%0AAWS%20Account%20ID:%0D%0AUrgency%20level:%0D%0ABrief%20description%20of%20situation:";
  }

  return (
    <div className="ua-page">
      <div className="ua-banner">
        Emergency response available — We prioritize active breach investigations
      </div>

      <main style={{ padding: "80px 24px 120px", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.4)",
              color: "#FCA5A5",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "6px 16px",
              borderRadius: 20,
              marginBottom: 24,
            }}
          >
            Experiencing a breach?
          </span>
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: "#F8FAFC",
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Get immediate attack path validation
          </h1>
          <p
            style={{
              color: "#94A3B8",
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            We can run a read-only scan of your AWS environment and identify
            which exposures are actively exploitable. Evidence package delivered
            within hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="ua-form-card">
          <input
            type="text"
            name="company"
            className="ua-input"
            placeholder="Company name"
            required
          />
          <input
            type="text"
            name="contact"
            className="ua-input"
            placeholder="Your name"
            required
          />
          <input
            type="email"
            name="email"
            className="ua-input"
            placeholder="Work email"
            required
          />
          <input
            type="text"
            name="aws_account"
            className="ua-input"
            placeholder="AWS Account ID (optional)"
          />
          <textarea
            name="message"
            className="ua-input"
            placeholder="Brief description of your situation..."
            rows={4}
            style={{ minHeight: 100, resize: "vertical" }}
          />
          <button type="submit" className="ua-submit-btn">
            Request Emergency Scan →
          </button>
        </form>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
            color: "#64748B",
            fontSize: 13,
            marginBottom: 64,
          }}
        >
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          Read-only AWS access only — no agents, no code deployed
        </div>

        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2
            style={{
              color: "#F8FAFC",
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            What happens next
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 24,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                className="ua-step-icon"
                style={{ background: "rgba(239,68,68,0.2)", color: "#FCA5A5" }}
              >
                1
              </div>
              <div style={{ color: "#F8FAFC", fontWeight: 600, marginBottom: 4 }}>
                Connect
              </div>
              <div style={{ color: "#94A3B8", fontSize: 13 }}>
                Read-only AWS credentials
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                className="ua-step-icon"
                style={{ background: "rgba(249,115,22,0.2)", color: "#FDBA74" }}
              >
                2
              </div>
              <div style={{ color: "#F8FAFC", fontWeight: 600, marginBottom: 4 }}>
                Scan
              </div>
              <div style={{ color: "#94A3B8", fontSize: 13 }}>
                Maps every attack path
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                className="ua-step-icon"
                style={{ background: "rgba(37,99,235,0.2)", color: "#93C5FD" }}
              >
                3
              </div>
              <div style={{ color: "#F8FAFC", fontWeight: 600, marginBottom: 4 }}>
                Report
              </div>
              <div style={{ color: "#94A3B8", fontSize: 13 }}>
                Validated paths with evidence
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 64 }}>
          <Link
            href="/"
            style={{
              color: "#60A5FA",
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            ← Back to homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
