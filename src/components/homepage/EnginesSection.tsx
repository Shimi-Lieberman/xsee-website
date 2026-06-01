const ENGINES = [
  {
    tag: "01",
    name: "L2 AWS API Validation",
    body: "Live AWS API call per hop — cryptographic evidence per finding. Not theory. Proof.",
    mini: "l2",
    accent: true,
  },
  {
    tag: "02",
    name: "XseeCyber Simulation",
    body: "Replays confirmed paths against your live graph. Human + AI attacker models. Detection Coverage Score.",
    mini: "sim",
  },
  {
    tag: "03",
    name: "Breach Prevention Certificate",
    body: "Before/after cryptographic proof. Issued when L2 confirms a path is closed. Board-ready, SOC 2-ready.",
    mini: "cert",
  },
  {
    tag: "04",
    name: "Autonomous Agents",
    body: "Investigation, Board Report, Threat Hunt, Remediation. The AI security analyst that never sleeps.",
    mini: "agents",
    badge: "NEW" as const,
  },
  {
    tag: "05",
    name: "Smart Remediation",
    body: "One fix that eliminates the most paths simultaneously. Terraform, CloudFormation, CLI — your choice.",
    mini: "fix",
  },
  {
    tag: "06",
    name: "Real-Time Detection",
    body: "Optional Lambda agent. Sub-60s detection. UEBA behavioral analysis. Auditable code.",
    mini: "rt",
    badge: "PRO" as const,
  },
  {
    tag: "07",
    name: "Nightly CVE Hunt",
    body: "Auto-matches new CVEs to your assets every night at 02:00 UTC. Emails CISO when KEV-listed CVEs hit critical paths.",
    mini: "cve",
  },
] as const;

type MiniKind = (typeof ENGINES)[number]["mini"];

function EngineMini({ kind }: { kind: MiniKind }) {
  switch (kind) {
    case "l2":
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden>
          <rect x="2" y="8" width="14" height="14" rx="2" fill="none" stroke="#FF1B8D" strokeWidth="1.25" />
          <rect x="24" y="8" width="14" height="14" rx="2" fill="none" stroke="#3C4358" strokeWidth="1.25" />
          <rect x="46" y="8" width="14" height="14" rx="2" fill="none" stroke="#3C4358" strokeWidth="1.25" />
          <line x1="16" y1="15" x2="24" y2="15" stroke="#FF1B8D" strokeWidth="1.25" />
          <line x1="38" y1="15" x2="46" y2="15" stroke="#3C4358" strokeWidth="1.25" />
          <text x="2" y="36" fill="#6A7388" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.5">
            api · api · api
          </text>
        </svg>
      );
    case "sim":
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden>
          {[6, 18, 30, 42].map((x, i) => (
            <circle key={x} cx={x} cy="14" r="3.2" fill="none" stroke={i === 3 ? "#FF1B8D" : "#3C4358"} strokeWidth="1.25" />
          ))}
          <path d="M9 14 L15 14 M21 14 L27 14 M33 14 L39 14" stroke="#FF1B8D" strokeWidth="1" />
          <path d="M6 26 Q24 36 42 26" fill="none" stroke="#3C4358" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );
    case "cert":
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden>
          <rect x="6" y="6" width="42" height="28" rx="2" fill="none" stroke="#3C4358" strokeWidth="1.25" />
          <line x1="10" y1="13" x2="36" y2="13" stroke="#A0A6B5" strokeWidth="1" />
          <line x1="10" y1="19" x2="42" y2="19" stroke="#3C4358" strokeWidth="1" />
          <line x1="10" y1="25" x2="30" y2="25" stroke="#3C4358" strokeWidth="1" />
          <circle cx="54" cy="30" r="6" fill="#FF1B8D" fillOpacity="0.15" stroke="#FF1B8D" strokeWidth="1.25" />
          <path d="M51 30 l2 2 l4 -4" stroke="#FF1B8D" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "agents":
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden>
          {[12, 24, 36, 48].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy="14" r="4" fill="none" stroke={i % 2 ? "#3C4358" : "#FF1B8D"} strokeWidth="1.25" />
              <circle cx={x} cy="14" r="1.5" fill={i % 2 ? "#3C4358" : "#FF1B8D"} />
            </g>
          ))}
          <text x="6" y="33" fill="#6A7388" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="0.4">
            invest · board · hunt · fix
          </text>
        </svg>
      );
    case "fix":
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden>
          <path d="M6 20 L20 20 L20 8" fill="none" stroke="#3C4358" strokeWidth="1.25" />
          <path d="M6 20 L20 20 L20 32" fill="none" stroke="#3C4358" strokeWidth="1.25" />
          <path d="M6 20 L22 20" fill="none" stroke="#FF1B8D" strokeWidth="1.5" />
          <circle cx="6" cy="20" r="2.5" fill="#FF1B8D" />
          <rect x="24" y="6" width="22" height="6" rx="1" fill="none" stroke="#3C4358" strokeWidth="1" />
          <rect x="24" y="17" width="32" height="6" rx="1" fill="#FF1B8D" fillOpacity="0.12" stroke="#FF1B8D" strokeWidth="1" />
          <rect x="24" y="28" width="22" height="6" rx="1" fill="none" stroke="#3C4358" strokeWidth="1" />
        </svg>
      );
    case "rt":
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden>
          <path
            d="M2 22 L10 22 L14 12 L20 32 L26 18 L32 24 L38 22 L62 22"
            fill="none"
            stroke="#FF1B8D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="38" cy="22" r="2" fill="#FF1B8D" />
          <circle cx="38" cy="22" r="5" fill="none" stroke="#FF1B8D" strokeOpacity="0.3" />
        </svg>
      );
    case "cve":
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden>
          <rect x="4" y="6" width="56" height="6" rx="1" fill="#3C4358" fillOpacity="0.3" />
          <rect x="4" y="6" width="38" height="6" rx="1" fill="#FF1B8D" fillOpacity="0.6" />
          <rect x="4" y="17" width="56" height="6" rx="1" fill="#3C4358" fillOpacity="0.3" />
          <rect x="4" y="17" width="24" height="6" rx="1" fill="#A0A6B5" fillOpacity="0.6" />
          <rect x="4" y="28" width="56" height="6" rx="1" fill="#3C4358" fillOpacity="0.3" />
          <rect x="4" y="28" width="50" height="6" rx="1" fill="#FF1B8D" fillOpacity="0.6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function EnginesSection() {
  return (
    <section id="engines" className="hp-section border-t border-[var(--hp-line)]" aria-labelledby="engines-title">
      <div className="hp-container">
        <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="hp-eyebrow mb-6">Platform · 7 engines</p>
            <h2
              id="engines-title"
              className="font-semibold text-[var(--hp-ink)]"
              style={{ fontSize: "clamp(34px, 4.6vw, 60px)", lineHeight: 1.05, letterSpacing: "-0.035em" }}
            >
              Seven engines.
              <span className="text-[var(--hp-ink3)]"> One autonomous loop.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[15.5px] leading-[1.6] text-[var(--hp-ink2)]">
              From discovery to verified closure — automatically. Every other platform stops at engine 1 or 2. XSEE runs
              all seven.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
          {ENGINES.map((e) => (
            <article
              key={e.tag}
              className={`hp-card flex h-full flex-col p-6 transition-colors duration-200 hover:border-[var(--hp-line2)] ${
                "accent" in e && e.accent ? "border-[color:rgba(255,27,141,0.4)]" : ""
              }`}
            >
              <header className="mb-6 flex items-center justify-between">
                <span
                  className={`hp-mono text-[11px] ${"accent" in e && e.accent ? "text-[var(--hp-brand)]" : "text-[var(--hp-ink3)]"}`}
                  style={{ letterSpacing: "0.14em" }}
                >
                  ENGINE&nbsp;·&nbsp;{e.tag}
                </span>
                {"badge" in e && e.badge ? (
                  <span
                    className={`hp-mono rounded-full border px-2 py-[3px] text-[9.5px] ${
                      e.badge === "NEW"
                        ? "border-[color:rgba(255,27,141,0.4)] bg-[color:rgba(255,27,141,0.08)] text-[var(--hp-brand)]"
                        : "border-[var(--hp-line2)] bg-[var(--hp-elevated)] text-[var(--hp-ink2)]"
                    }`}
                    style={{ letterSpacing: "0.12em" }}
                  >
                    {e.badge}
                  </span>
                ) : null}
              </header>

              <EngineMini kind={e.mini} />

              <h3 className="mb-3 mt-6 text-[17px] font-semibold leading-[1.25] text-[var(--hp-ink)]" style={{ letterSpacing: "-0.015em" }}>
                {e.name}
              </h3>
              <p className="text-[13.5px] leading-[1.55] text-[var(--hp-ink2)]">{e.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
