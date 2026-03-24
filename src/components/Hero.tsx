import Link from "next/link";

const SIDEBAR_ICONS = [
  <svg key="o" width={14} height={14} viewBox="0 0 14 14" fill="none">
    <rect x={1} y={1} width={5} height={5} rx={1} stroke="currentColor" strokeWidth={1.2} />
    <rect x={8} y={1} width={5} height={5} rx={1} stroke="currentColor" strokeWidth={1.2} />
    <rect x={1} y={8} width={5} height={5} rx={1} stroke="currentColor" strokeWidth={1.2} />
    <rect x={8} y={8} width={5} height={5} rx={1} stroke="currentColor" strokeWidth={1.2} />
  </svg>,
  <svg key="f" width={14} height={14} viewBox="0 0 14 14" fill="none">
    <path d="M7 1L2 3.2V7C2 10.1 4.2 12.9 7 14C9.8 12.9 12 10.1 12 7V3.2L7 1Z" stroke="currentColor" strokeWidth={1.2} fill="rgba(255,27,141,0.15)" />
    <polyline points="4.5,7 6.2,8.8 9.5,5.5" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="p" width={14} height={14} viewBox="0 0 14 14" fill="none">
    <rect x={1.5} y={1.5} width={11} height={11} rx={1.5} stroke="currentColor" strokeWidth={1.2} />
    <line x1={4.5} y1={4.5} x2={9.5} y2={4.5} stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
    <line x1={4.5} y1={7} x2={9.5} y2={7} stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
    <line x1={4.5} y1={9.5} x2={7.5} y2={9.5} stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
  </svg>,
  <svg key="e" width={14} height={14} viewBox="0 0 14 14" fill="none">
    <circle cx={6} cy={6} r={4} stroke="currentColor" strokeWidth={1.2} />
    <line x1={9.2} y1={9.2} x2={12.5} y2={12.5} stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
  </svg>,
  <svg key="s" width={14} height={14} viewBox="0 0 14 14" fill="none">
    <circle cx={7} cy={7} r={2} stroke="currentColor" strokeWidth={1.2} />
    <path d="M7 1.5V3M7 11V12.5M1.5 7H3M11 7H12.5M3.1 3.1L4.2 4.2M9.8 9.8L10.9 10.9M3.1 10.9L4.2 9.8M9.8 4.2L10.9 3.1" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
  </svg>,
];

const PATHS = [
  { title: "Internet → EC2 → IAM Role → S3 Crown Jewel", sub: "CVE-2020-9283 · RCE · Privilege Escalation · Data Exfiltration", color: "red", hops: "4 hops", validated: true, active: true },
  { title: "Public LB → Lambda → RDS Database", sub: "Privilege escalation · Admin access · Sensitive data", color: "red", hops: "3 hops", validated: true, active: false },
  { title: "EKS Pod → ServiceAccount → Secrets Manager", sub: "Lateral movement · Kubernetes misconfiguration", color: "amber", hops: "2 hops", validated: false, active: false },
  { title: "Exposed Endpoint → IAM Role → CloudTrail", sub: "Log tampering · Audit evasion · Persistent access", color: "amber", hops: "3 hops", validated: false, active: false },
  { title: "S3 Bucket → Cross-account Role → EC2", sub: "Data exfiltration · Cross-account trust abuse", color: "gray", hops: "2 hops", validated: false, active: false },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-mesh">
        <div className="glow-sky" />
        <div className="glow-yellow" />
      </div>
      <div className="hero-noise" />
      <div className="hero-grid-bg" />
      <div className="container">
        <div className="hero-body">
          <div className="hero-left">
            <div className="hero-top-block">
              <div className="hero-proof-strip">
                <div className="hps-item">
                  <div className="hps-dot" style={{ background: "var(--green)" }} />
                  Early Access Open
                </div>
                <div className="hps-item">
                  <div className="hps-dot" style={{ background: "var(--sky)" }} />
                  Read-only · No agents · No code deployed
                </div>
                <div className="hps-item">
                  <div className="hps-dot" style={{ background: "var(--yellow)" }} />
                  Results in 30 minutes
                </div>
              </div>
              <div className="hero-eyebrow">
                <span className="badge badge-dot eyebrow" style={{ background: "rgba(255,255,255,0.1)", color: "#e2e8f0", borderColor: "rgba(255,255,255,0.25)" }}>
                  Cloud Exposure Intelligence
                </span>
              </div>
              <h1 className="display-xl hero-headline">
              The only platform that{" "}
              <span className="blue">
                proves every
                <br />
                <span className="hero-accent-path">attack path</span>{" "}
                is real.
              </span>
              </h1>
            </div>
            <p className="hero-sub">
              Your scanner found 4,000 alerts. <strong>Three of them lead to your crown jewels.</strong> XSEE builds a live attack graph, proves which exposures are genuinely exploitable with cryptographic evidence, and shows exactly which fix breaks the most paths — defending against human and AI-powered attackers.
            </p>
            <div className="hero-ctas">
              <Link href="#contact" className="btn btn-primary btn-lg">
                Get Free Breach Report →
              </Link>
              <Link href="#how" className="btn btn-secondary btn-lg">
                See How It Works
              </Link>
            </div>
            <div className="hero-social-proof">
              <div className="sp-stat">
                <div className="sp-num hero-sp-num-magenta">
                  1,000<span>+</span>
                </div>
                <div className="sp-lbl">Attack patterns</div>
              </div>
              <div className="sp-sep" />
              <div className="sp-stat">
                <div className="sp-num" style={{ color: "var(--yellow-light)" }}>L1–L3</div>
                <div className="sp-lbl">Validation layers</div>
              </div>
              <div className="sp-sep" />
              <div className="sp-stat warm">
                <div className="sp-num">92<span>%</span></div>
                <div className="sp-lbl">Avg. path confidence</div>
              </div>
              <div className="sp-sep" />
              <div className="sp-stat">
                <div className="sp-num">&lt;30<span>m</span></div>
                <div className="sp-lbl">First path found</div>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="app-frame app-frame-warm">
              <div className="af-bar">
                <div className="af-dots">
                  <div className="af-dot" style={{ background: "#FF5F57" }} />
                  <div className="af-dot" style={{ background: "#FEBC2E" }} />
                  <div className="af-dot" style={{ background: "#28C840" }} />
                </div>
                <div className="af-url">app.xsee.io — Explorer — Attack Intelligence</div>
                <div className="af-live">Live Scan</div>
              </div>
              <div className="af-body">
                <div className="af-sidebar">
                  {SIDEBAR_ICONS.map((icon, i) => (
                    <div
                      key={i}
                      className={`af-ico ${i === 1 ? "active" : ""}`}
                      style={i === 4 ? { marginTop: "auto" } : undefined}
                    >
                      {icon}
                    </div>
                  ))}
                </div>
                <div className="af-main">
                  <div className="af-metrics">
                    <div className="af-metric">
                      <div className="af-mval" style={{ color: "var(--sky)" }}>14</div>
                      <div className="af-mlbl">Attack Paths</div>
                    </div>
                    <div className="af-metric">
                      <div className="af-mval" style={{ color: "var(--red)" }}>3</div>
                      <div className="af-mlbl">Critical</div>
                    </div>
                    <div className="af-metric">
                      <div className="af-mval" style={{ color: "var(--orange)" }}>92%</div>
                      <div className="af-mlbl">Exploitable</div>
                    </div>
                    <div className="af-metric">
                      <div className="af-mval" style={{ color: "var(--yellow)" }}>1</div>
                      <div className="af-mlbl">Optimal Fix</div>
                    </div>
                  </div>
                  <div className="af-header">
                    <div>
                      <div className="af-title">Attack Path Explorer</div>
                      <div className="af-sub">14 paths discovered &nbsp;·&nbsp; 3 validated &nbsp;·&nbsp; eu-central-1 &nbsp;·&nbsp; 847 assets</div>
                    </div>
                    <div className="af-filter">⊟ Filter</div>
                  </div>
                  <div className="af-paths">
                    {PATHS.map((p, i) => (
                      <div
                        key={i}
                        className={`af-path p-${p.color} ${p.active ? "p-active" : ""}`}
                        style={p.color === "gray" ? { opacity: 0.5 } : undefined}
                      >
                        <div
                          className="af-sev-bar"
                          style={{
                            background: p.color === "red" ? "#EF4444" : p.color === "amber" ? "#F59E0B" : "#3D5470",
                          }}
                        />
                        <div className="af-pinfo flex-1 min-w-0">
                          <div className="af-ptitle">{p.title}</div>
                          <div className="af-psub">{p.sub}</div>
                        </div>
                        <div className="af-pmeta">
                          <span className="af-hops">{p.hops}</span>
                          {p.validated && <span className="af-validated">L2 Validated</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
