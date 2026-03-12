const STEPS = [
  {
    n: "01",
    title: "Infrastructure Discovery",
    desc: "Scans every cloud asset — EC2, IAM roles, S3 buckets, VPCs, Lambda, EKS, RDS. Maps identities, permissions, and network relationships into a queryable inventory.",
  },
  {
    n: "02",
    title: "Live Attack Graph",
    desc: "Assembles every resource, identity, permission, and network edge into a directed attack graph. Shows exactly how an attacker could move — hop by hop — through your environment.",
  },
  {
    n: "03",
    title: "Exploit Validation",
    desc: "Each candidate path is tested with live AWS API calls. XSEE produces a cryptographic evidence package per hop — not \"this could happen\" but documented proof it will.",
  },
  {
    n: "04",
    title: "Attack Simulation",
    desc: "Replays the full attack chain step by step. Measures your detection coverage at each stage — showing exactly where your SIEM, GuardDuty, and XDR go blind.",
  },
  {
    n: "05",
    title: "Fix the Choke Point",
    desc: "XSEE identifies the single control change that collapses the most attack paths. Apply it, re-simulate, and get a timestamped proof-of-closure for your audit trail.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section sec-blue-tint" id="how">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">How It Works</span>
          <h2 className="display-lg">
            From cloud scan to
            <br />
            verified proof in 30 minutes
          </h2>
          <p>
            Connect your AWS account with read-only access. XSEE discovers, graphs, validates, and closes the loop — without touching your infrastructure or slowing a single workload.
          </p>
          <div className="section-rule" />
        </div>
        <div className="how-grid">
          <div className="steps reveal-left">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className={`step ${i === 0 ? "active" : ""}`}
                data-step={i}
              >
                <div className="step-n">{step.n}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal-right" aria-hidden>
            {/* Terminal moved to TerminalSection; #how anchor preserved for nav */}
          </div>
        </div>
      </div>
    </section>
  );
}
