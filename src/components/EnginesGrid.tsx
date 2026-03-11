const ENGINES = [
  {
    num: "01",
    label: "L1 · Graph Discovery",
    title: "Attack Path Discovery",
    desc: "Graph-based logical simulation maps every traversable path through your cloud. Surfaces attack chains invisible to individual-finding scanners.",
    icon: (
      <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
        <circle cx={11} cy={4} r={2} stroke="#3B82F6" strokeWidth={1.4} />
        <circle cx={3} cy={17} r={2} stroke="#3B82F6" strokeWidth={1.4} />
        <circle cx={19} cy={17} r={2} stroke="#3B82F6" strokeWidth={1.4} />
        <circle cx={11} cy={13} r={1.5} fill="#3B82F6" fillOpacity={0.5} />
        <line x1={11} y1={6} x2={11} y2={11.5} stroke="#3B82F6" strokeWidth={1.2} strokeDasharray="2 1.5" opacity={0.7} />
        <line x1={9.8} y1={12.8} x2={4.5} y2={15.5} stroke="#3B82F6" strokeWidth={1.2} opacity={0.6} />
        <line x1={12.2} y1={12.8} x2={17.5} y2={15.5} stroke="#3B82F6" strokeWidth={1.2} opacity={0.6} />
        <polyline points="10,9.5 11,11.5 12,9.5" stroke="#3B82F6" strokeWidth={1.2} fill="none" opacity={0.8} />
      </svg>
    ),
  },
  {
    num: "02",
    label: "L2 · Live Validation",
    title: "AWS API Validation",
    desc: "Calls live AWS APIs to validate each path hop. Produces a cryptographic evidence package per finding — proof that the path is exploitable, not theoretical.",
    icon: (
      <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
        <path d="M11 2L3 5.5V11C3 15.4 6.6 19.4 11 21C15.4 19.4 19 15.4 19 11V5.5L11 2Z" stroke="#3B82F6" strokeWidth={1.4} fill="rgba(59,130,246,0.08)" />
        <polyline points="7.5,11 10,13.5 14.5,8.5" stroke="#10B981" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "03",
    label: "L3 · XseeCyber",
    title: "Runtime Simulation",
    desc: "Step-by-step exploit replay with detection gap scoring. Measures time-to-compromise and generates before/after proof of remediation effectiveness.",
    icon: (
      <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
        <circle cx={11} cy={11} r={9} stroke="#3B82F6" strokeWidth={1.3} opacity={0.35} />
        <circle cx={11} cy={11} r={5.5} stroke="#3B82F6" strokeWidth={1.3} opacity={0.6} />
        <circle cx={11} cy={11} r={2} fill="#EF4444" />
        <line x1={11} y1={2} x2={11} y2={5} stroke="#3B82F6" strokeWidth={1.4} strokeLinecap="round" />
        <line x1={11} y1={17} x2={11} y2={20} stroke="#3B82F6" strokeWidth={1.4} strokeLinecap="round" />
        <line x1={2} y1={11} x2={5} y2={11} stroke="#3B82F6" strokeWidth={1.4} strokeLinecap="round" />
        <line x1={17} y1={11} x2={20} y2={11} stroke="#3B82F6" strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "04",
    label: "Smart Remediation",
    title: "Optimal Fix Engine",
    desc: "Finds the minimum change that eliminates maximum validated risk. One SG rule change that kills 6 attack paths beats fixing 6 isolated findings.",
    icon: (
      <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
        <circle cx={11} cy={11} r={9} stroke="#3B82F6" strokeWidth={1.3} />
        <circle cx={11} cy={11} r={3} stroke="#3B82F6" strokeWidth={1.3} />
        <circle cx={11} cy={11} r={1} fill="#F59E0B" />
      </svg>
    ),
  },
  {
    num: "05",
    label: "AI · Claude-Powered",
    title: "AI Security Analyst",
    desc: "Five capabilities: explain paths, explain remediation, investigate stories, executive summary, ask anything. Always grounded in your XSEE data — never invented.",
    icon: (
      <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
        <circle cx={11} cy={4} r={1.2} fill="#3B82F6" />
        <circle cx={11} cy={11} r={1.2} fill="#3B82F6" fillOpacity={0.8} />
        <circle cx={11} cy={18} r={1.2} fill="#3B82F6" fillOpacity={0.6} />
        <circle cx={8} cy={11} r={0.8} fill="#F59E0B" fillOpacity={0.9} />
        <circle cx={14} cy={11} r={0.8} fill="#F59E0B" fillOpacity={0.9} />
      </svg>
    ),
  },
  {
    num: "06",
    label: "Playbooks",
    title: "Operational Playbooks",
    desc: "Kanban-style fix tracking from detection to verified closed. Automated re-scan on completion. Full audit trail with timestamps and evidence links.",
    icon: (
      <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
        <rect x={3} y={2} width={16} height={18} rx={2} stroke="#3B82F6" strokeWidth={1.4} fill="rgba(59,130,246,0.05)" />
        <line x1={9} y1={5} x2={9} y2={17} stroke="#3B82F6" strokeWidth={1} opacity={0.3} />
        <line x1={15} y1={5} x2={15} y2={17} stroke="#3B82F6" strokeWidth={1} opacity={0.3} />
        <rect x={4.5} y={5.5} width={3} height={2.5} rx={0.5} fill="#EF4444" fillOpacity={0.8} />
        <rect x={4.5} y={9.5} width={3} height={2.5} rx={0.5} fill="#EF4444" fillOpacity={0.5} />
        <rect x={10.5} y={5.5} width={3} height={2.5} rx={0.5} fill="#F59E0B" fillOpacity={0.8} />
        <rect x={16.5} y={5.5} width={3} height={2.5} rx={0.5} fill="#10B981" fillOpacity={0.8} />
        <polyline points="17.2,6.5 17.8,7.2 19,6" stroke="white" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function EnginesGrid() {
  return (
    <section className="section sec-light" id="engines">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Platform Architecture</span>
          <h2 className="display-lg">
            Six engines. One answer:
            <br />
            <span style={{ color: "var(--sky-light)" }}>can they reach your data?</span>
          </h2>
          <p>
            Every engine feeds the same question — is this exposure actually reachable? Together they replace the CNAPP → BAS → exposure management stack with a single closed loop.
          </p>
          <div className="section-rule" />
        </div>
        <div className="engines-grid">
          {ENGINES.map((e, i) => (
            <div
              key={e.num}
              className={`engine-card reveal ${i === 2 ? "engine-warm" : ""} ${i === 4 ? "engine-orange" : ""}`}
              style={{ transitionDelay: i * 0.07 + "s" }}
            >
              <div className="engine-status">Active</div>
              <div className="engine-num">Engine {e.num}</div>
              <div className="engine-icon">{e.icon}</div>
              <div className="engine-label">{e.label}</div>
              <h3>{e.title}</h3>
              <p>{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
