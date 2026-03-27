const ENGINES = [
  {
    num: "01",
    label: "L1 · Graph Discovery",
    title: "Attack Path Discovery",
    desc: "Builds a live attack graph from every asset, identity, permission, and network edge in your cloud. Maps 1,000+ known attack patterns against your specific environment. AI continuously learns new TTPs and adds them to the engine. Surfaces multi-hop attack chains that no single-finding scanner can see.",
    icon: (
      <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
        <circle cx={11} cy={4} r={2} stroke="#FF1B8D" strokeWidth={1.4} />
        <circle cx={3} cy={17} r={2} stroke="#FF1B8D" strokeWidth={1.4} />
        <circle cx={19} cy={17} r={2} stroke="#FF1B8D" strokeWidth={1.4} />
        <circle cx={11} cy={13} r={1.5} fill="#FF1B8D" fillOpacity={0.5} />
        <line x1={11} y1={6} x2={11} y2={11.5} stroke="#FF1B8D" strokeWidth={1.2} strokeDasharray="2 1.5" opacity={0.7} />
        <line x1={9.8} y1={12.8} x2={4.5} y2={15.5} stroke="#FF1B8D" strokeWidth={1.2} opacity={0.6} />
        <line x1={12.2} y1={12.8} x2={17.5} y2={15.5} stroke="#FF1B8D" strokeWidth={1.2} opacity={0.6} />
        <polyline points="10,9.5 11,11.5 12,9.5" stroke="#FF1B8D" strokeWidth={1.2} fill="none" opacity={0.8} />
      </svg>
    ),
  },
  {
    num: "02",
    label: "L2 · Live Validation",
    title: "AWS API Validation",
    desc: "The engine that turns theory into proof. For each candidate path, XSEE calls live AWS APIs — IAM Policy Simulator, SG rule matching, trust policy evaluation — and records the response. The result: a cryptographic evidence package per hop that proves exploitability, not possibility.",
    icon: (
      <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
        <path d="M11 2L3 5.5V11C3 15.4 6.6 19.4 11 21C15.4 19.4 19 15.4 19 11V5.5L11 2Z" stroke="#FF1B8D" strokeWidth={1.4} fill="rgba(255, 27, 141,0.08)" />
        <polyline points="7.5,11 10,13.5 14.5,8.5" stroke="#10B981" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "03",
    label: "L3 · XseeCyber",
    title: "Runtime Simulation",
    desc: "The only cloud-native BAS engine that simulates your specific attack paths — not generic playbooks. Replays confirmed paths step by step, modeling both human and AI attacker behavior. Measures your Detection Coverage Score: how much of the attack your tools actually see. Generates before/after proof when you fix.",
    icon: (
      <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
        <circle cx={11} cy={11} r={9} stroke="#FF1B8D" strokeWidth={1.3} opacity={0.35} />
        <circle cx={11} cy={11} r={5.5} stroke="#FF1B8D" strokeWidth={1.3} opacity={0.6} />
        <circle cx={11} cy={11} r={2} fill="#EF4444" />
        <line x1={11} y1={2} x2={11} y2={5} stroke="#FF1B8D" strokeWidth={1.4} strokeLinecap="round" />
        <line x1={11} y1={17} x2={11} y2={20} stroke="#FF1B8D" strokeWidth={1.4} strokeLinecap="round" />
        <line x1={2} y1={11} x2={5} y2={11} stroke="#FF1B8D" strokeWidth={1.4} strokeLinecap="round" />
        <line x1={17} y1={11} x2={20} y2={11} stroke="#FF1B8D" strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "04",
    label: "Smart Remediation",
    title: "Optimal Fix Engine",
    desc: "Security teams waste months fixing the wrong things. XSEE finds the single change that collapses the most paths simultaneously. One security group rule that eliminates 6 paths is worth more than fixing 6 isolated findings. Includes Terraform, CLI, and console instructions.",
    icon: (
      <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
        <circle cx={11} cy={11} r={9} stroke="#FF1B8D" strokeWidth={1.3} />
        <circle cx={11} cy={11} r={3} stroke="#FF1B8D" strokeWidth={1.3} />
        <circle cx={11} cy={11} r={1} fill="#F59E0B" />
      </svg>
    ),
  },
  {
    num: "05",
    label: "AI · Claude-Powered",
    title: "AI Security Analyst",
    desc: "A senior security analyst available 24/7, powered by Claude and grounded in your scan data. Ask it to explain a path in plain English. Ask it to write an executive summary for your board. Ask it what an attacker would do next. It only answers from your data — never invents.",
    icon: (
      <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
        <circle cx={11} cy={4} r={1.2} fill="#FF1B8D" />
        <circle cx={11} cy={11} r={1.2} fill="#FF1B8D" fillOpacity={0.8} />
        <circle cx={11} cy={18} r={1.2} fill="#FF1B8D" fillOpacity={0.6} />
        <circle cx={8} cy={11} r={0.8} fill="#F59E0B" fillOpacity={0.9} />
        <circle cx={14} cy={11} r={0.8} fill="#F59E0B" fillOpacity={0.9} />
      </svg>
    ),
  },
  {
    num: "06",
    label: "Playbooks",
    title: "Operational Playbooks",
    desc: "Findings don't close themselves. XSEE's Kanban-style playbooks take each finding from detection through remediation to verified closure. Assign to team members. Track status. Re-scan automatically when a fix is applied. Full audit trail for your compliance team.",
    icon: (
      <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
        <rect x={3} y={2} width={16} height={18} rx={2} stroke="#FF1B8D" strokeWidth={1.4} fill="rgba(255, 27, 141,0.05)" />
        <line x1={9} y1={5} x2={9} y2={17} stroke="#FF1B8D" strokeWidth={1} opacity={0.3} />
        <line x1={15} y1={5} x2={15} y2={17} stroke="#FF1B8D" strokeWidth={1} opacity={0.3} />
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
            Six engines built for one purpose:
            <br />
            <span style={{ color: "var(--sky-light)" }}>proving whether your cloud can be breached.</span>
          </h2>
          <p>
            Most tools stop at discovery. XSEE runs the full loop — discover, validate, simulate, fix, verify. No other platform does all five.
          </p>
          <div className="section-rule" />
        </div>
        <div className="engines-grid">
          {ENGINES.map((e, i) => (
            <div
              key={e.num}
              className={`engine-card reveal reveal-on-scroll ${i === 2 ? "engine-warm" : ""} ${i === 4 ? "engine-orange" : ""}`}
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
