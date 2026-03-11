const STEPS = [
  {
    n: "01",
    title: "Cloud Discovery",
    desc: "Scans EC2, IAM, S3, VPCs, and Security Groups across your AWS environment. Builds a live relationship-mapped asset inventory in minutes.",
  },
  {
    n: "02",
    title: "Attack Graph Construction",
    desc: "Every resource, permission, and network edge assembled into a queryable graph. No black boxes — every relationship is visible and traversable.",
  },
  {
    n: "03",
    title: "L2 Live Validation",
    desc: "Each candidate path is validated with real AWS API calls. XSEE produces a cryptographic evidence package per hop — not theory, but proof.",
  },
  {
    n: "04",
    title: "XseeCyber Simulation",
    desc: "Simulates the full attack chain step by step. Measures detection gap — what your current tooling would and wouldn't catch at each stage.",
  },
  {
    n: "05",
    title: "Remediate & Verify",
    desc: "Three copy-paste fix strategies per path. Re-run simulation to prove defenses hold. Closed loop, every time, with a full audit trail.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section section-alt" id="how">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Intelligence Loop</span>
          <h2 className="display-lg">
            From scan to verified fix
            <br />
            in one closed loop
          </h2>
          <p>
            Connect your AWS account. XSEE runs the full cycle — discovery,
            validation, simulation, remediation, verification — without leaving
            the platform.
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
          <div className="reveal-right">
            <div className="terminal">
              <div className="term-bar">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
                </div>
                <span className="term-title">xsee-cli — live scan — aws/eu-central-1</span>
                <div className="term-indicator">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" />
                  Scanning
                </div>
              </div>
              <div className="term-output" id="termOutput">
                <span className="term-cursor" />
              </div>
              <div className="term-footer">
                <div className="tf-cell">
                  <div className="tf-num" style={{ color: "var(--blue-light)" }}>
                    847
                  </div>
                  <div className="tf-lbl">Assets</div>
                </div>
                <div className="tf-cell">
                  <div className="tf-num" style={{ color: "var(--red)" }}>
                    3
                  </div>
                  <div className="tf-lbl">Critical</div>
                </div>
                <div className="tf-cell">
                  <div className="tf-num" style={{ color: "var(--green)" }}>
                    1
                  </div>
                  <div className="tf-lbl">Optimal Fix</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
