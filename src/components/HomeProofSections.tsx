import Link from "next/link";
import { Search, CheckCircle, Zap, ArrowUp, Wrench, RefreshCw, Award } from "lucide-react";

const LOOP_STEPS = [
  {
    number: "①",
    title: "Discover",
    Icon: Search,
    description:
      "Every asset, identity, and permission in your AWS environment — automatically mapped.",
  },
  {
    number: "②",
    title: "Validate",
    Icon: CheckCircle,
    description:
      "Each attack path validated with live AWS API calls. Real evidence per hop.",
  },
  {
    number: "③",
    title: "Simulate",
    Icon: Zap,
    description: "XseeCyber simulates the attacker. Proves what's exploitable.",
  },
  {
    number: "④",
    title: "Prioritize",
    Icon: ArrowUp,
    description:
      "Financial exposure, crown jewel proximity, confidence score — one risk ranking.",
  },
  {
    number: "⑤",
    title: "Fix",
    Icon: Wrench,
    description:
      "AI proposes the exact fix. One click to approve. Nothing changes without you.",
  },
  {
    number: "⑥",
    title: "Verify",
    Icon: RefreshCw,
    description:
      "L2 re-validates after the fix. The path must be closed — not just patched.",
  },
  {
    number: "⑦",
    title: "Certify",
    Icon: Award,
    description:
      "Breach Prevention Certificate issued. Board-ready. Audit-proof. Timestamped.",
  },
] as const;

const COMPARISON_ROWS = [
  {
    feature: "Shows attack paths",
    posture: "✓",
    xsee: "✓",
  },
  {
    feature: "Validates with live AWS API calls",
    posture: "✗",
    xsee: "✓",
  },
  {
    feature: "Simulates attacker behavior",
    posture: "✗",
    xsee: "✓",
  },
  {
    feature: "Fixes and verifies closure",
    posture: "✗",
    xsee: "✓",
  },
  {
    feature: "Issues Breach Prevention Certificate",
    posture: "✗",
    xsee: "✓",
  },
] as const;

export default function HomeProofSections() {
  return (
    <>
      <section className="home-loop-strip">
        <div className="container">
          <div className="home-loop-strip-grid">
            {LOOP_STEPS.map((step) => (
              <article key={step.title} className="home-loop-step">
                <div className="home-loop-step-top">
                  <span className="home-loop-step-number">{step.number}</span>
                  <span className="home-loop-step-icon" aria-hidden>
                    <step.Icon size={16} strokeWidth={2.2} />
                  </span>
                  <h3>{step.title}</h3>
                </div>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
          <p className="home-loop-bottom-line">One human approval. Everything else is automated.</p>
        </div>
      </section>

      <section className="home-certificate-section">
        <div className="container home-certificate-grid">
          <div className="home-certificate-copy">
            <span className="section-eyebrow">Breach Prevention Certificate</span>
            <h2 className="display-lg">The first platform that certifies a breach path is closed.</h2>
            <p>
              When XSEE fixes a path, we re-run L2 validation, confirm closure, and issue a Breach
              Prevention Certificate. Timestamped. Signed. Board-ready.
            </p>
            <Link href="/demo" className="home-certificate-cta">
              See how it works →
            </Link>
          </div>

          <div className="home-certificate-card" aria-label="Breach Prevention Certificate mock">
            <div className="home-certificate-head">
              <span className="home-certificate-logo">XSEE</span>
              <span className="home-certificate-seal">Verified</span>
            </div>
            <div className="home-certificate-title">BREACH PREVENTION CERTIFICATE</div>
            <div className="home-certificate-path">
              Path: Internet → IAM Role → EC2 → Production Database
            </div>
            <div className="home-certificate-meta">
              <span>Timestamp: 2026-04-14 09:41:26 UTC</span>
              <span className="home-certificate-badge">Verified Closed</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-proof-comparison">
        <div className="container">
          <div className="section-head reveal" style={{ marginBottom: 28 }}>
            <h2 className="display-lg" style={{ color: "#0f172a" }}>
              Not just posture. Proof.
            </h2>
          </div>

          <div className="home-proof-table-wrap">
            <table className="home-proof-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Posture tools (Wiz/Orca)</th>
                  <th className="home-proof-table-xsee-head">XSEE</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    <td>{row.posture}</td>
                    <td className="home-proof-table-xsee-cell">{row.xsee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
