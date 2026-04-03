import Link from "next/link";
import HeroSocialProofStats from "@/components/HeroSocialProofStats";

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
              <div className="hero-eyebrow">
                <span className="badge badge-dot eyebrow" style={{ background: "rgba(255,255,255,0.1)", color: "#e2e8f0", borderColor: "rgba(255,255,255,0.25)" }}>
                  Cloud Attack Intelligence
                </span>
              </div>
              <div className="flex items-center justify-center mb-8">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer hover:border-white/20 transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
                >
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full font-mono"
                    style={{ background: "rgba(255,27,141,0.15)", color: "#FF1B8D" }}
                  >
                    NEW
                  </span>
                  <span className="text-white/50 text-xs">AI attacker simulation now in XseeCyber 2.0</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" aria-hidden>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
              <h1 className="display-xl hero-headline">
                Stop guessing.
                <br />
                <span className="blue">Prove the breach.</span>
              </h1>
            </div>
            <p className="hero-sub">
              Every other tool tells you what could go wrong. XSEE proves what will — with cryptographic evidence per hop, live AWS API validation, and attack simulation that runs the way both human and AI attackers think. Not theory. Proof.
            </p>
            <div className="hero-ctas">
              <Link href="#contact" className="btn btn-primary btn-lg animate-pulse">
                Get Your Free Risk Assessment →
              </Link>
              <Link href="#how" className="btn btn-secondary btn-lg">
                See a Live Demo
              </Link>
              <Link href="#contact" className="btn btn-secondary btn-lg">
                Book a Demo
              </Link>
            </div>
            {/* ── PRODUCT SCREENSHOT ── */}
            <div className="relative w-full max-w-5xl mx-auto mt-10 mb-6 px-4">

              {/* Glow behind frame */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 60%, rgba(255,27,141,0.12) 0%, transparent 65%)',
                  filter: 'blur(24px)',
                  transform: 'scale(1.1)',
                }}
              />

              {/* Browser frame */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(255,255,255,0.09)',
                  boxShadow: '0 0 0 1px rgba(255,27,141,0.06), 0 32px 80px rgba(0,0,0,0.65), 0 8px 24px rgba(0,0,0,0.4)',
                }}
              >
                {/* Browser chrome bar */}
                <div
                  className="flex items-center px-4 py-2.5"
                  style={{
                    background: '#080f1c',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {/* Traffic lights */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(239,68,68,0.45)' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(234,179,8,0.45)' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(34,197,94,0.45)' }} />
                  </div>

                  {/* URL bar */}
                  <div
                    className="flex items-center justify-center gap-2 py-1 rounded-md mx-auto"
                    style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 16px' }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)' }}>
                      app.xsee.io/attack-intelligence
                    </span>
                  </div>

                  {/* Live badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#34d399', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', animation: 'pulse 2s infinite' }} />
                    Live · eu-central-1
                  </div>
                </div>

                {/* Screenshot */}
                <img
                  src="/platform_screenshot.png"
                  alt="XSEE Attack Intelligence Platform — live attack path validation with cryptographic evidence per hop"
                  className="w-full block"
                  style={{
                    maxHeight: '540px',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                  }}
                />

                {/* Bottom fade — blends screenshot into dark page background */}
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: '96px',
                    background: 'linear-gradient(to bottom, transparent 0%, #050d1a 100%)',
                  }}
                />
              </div>
            </div>
            {/* ── END PRODUCT SCREENSHOT ── */}
            <HeroSocialProofStats />
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
                      <div className="af-mval" style={{ color: "#FF1B8D" }}>14</div>
                      <div className="af-mlbl">Attack Paths</div>
                    </div>
                    <div className="af-metric">
                      <div className="af-mval" style={{ color: "#F97316" }}>3</div>
                      <div className="af-mlbl">Critical</div>
                    </div>
                    <div className="af-metric">
                      <div className="af-mval" style={{ color: "#F97316" }}>92%</div>
                      <div className="af-mlbl">Exploitable</div>
                    </div>
                    <div className="af-metric">
                      <div className="af-mval" style={{ color: "#EAB308" }}>1</div>
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
                        style={p.color === "gray" ? { opacity: 0.82 } : undefined}
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
      <div className="flex flex-col items-center gap-2 mt-10 animate-bounce pb-6">
        <span className="text-[10px] text-white/18 tracking-widest uppercase font-mono">Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" aria-hidden>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
