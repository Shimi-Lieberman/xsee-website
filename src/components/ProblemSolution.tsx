export default function ProblemSolution() {
  return (
    <section className="section" id="problem">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">The Problem</span>
          <h2 className="display-lg">
            Security tools generate noise.
            <br />
            XSEE generates <span style={{ color: "var(--blue-light)" }}>certainty.</span>
          </h2>
          <p>
            Every misconfiguration scanner creates more work without answering
            the only question that matters: which of these will actually get
            exploited?
          </p>
          <div className="section-rule" />
        </div>
        <div className="ps-grid">
          <div className="ps-panel ps-without reveal-left">
            <div className="ps-tag">
              <span className="ps-tag-line" />
              Without XSEE
            </div>
            <h3>Alert fatigue with zero context on real risk</h3>
            <p>
              You see thousands of misconfigurations and no clear path to what
              matters. Engineering time burns on false priorities while real
              exposures sit unaddressed.
            </p>
            <ul className="ps-list">
              <li>
                <span className="ps-icon">✕</span>
                Thousands of findings ranked by theoretical severity, not actual
                exploitability
              </li>
              <li>
                <span className="ps-icon">✕</span>
                No proof that any discovered path can be traversed by a real
                attacker
              </li>
              <li>
                <span className="ps-icon">✕</span>
                Engineers burn days triaging false positives and vendor noise
              </li>
              <li>
                <span className="ps-icon">✕</span>
                No visibility into multi-hop attack chains or blast radius
              </li>
              <li>
                <span className="ps-icon">✕</span>
                Fixes applied blind — no before/after validation to prove
                closure
              </li>
            </ul>
          </div>
          <div className="ps-panel ps-with reveal-right">
            <div className="ps-tag">
              <span className="ps-tag-line" />
              With XSEE
            </div>
            <h3>Three proven paths. One fix. Verified closed.</h3>
            <p>
              XSEE compresses thousands of signals into the attack paths that
              will actually succeed — each one validated with live AWS API
              evidence and ranked by true blast radius.
            </p>
            <ul className="ps-list">
              <li>
                <span className="ps-icon">✓</span>
                L2 live validation — real AWS API calls produce a cryptographic
                evidence package per hop
              </li>
              <li>
                <span className="ps-icon">✓</span>
                XseeCyber simulation maps exact detection gaps per attack chain
              </li>
              <li>
                <span className="ps-icon">✓</span>
                AI-ranked priority based on real exploitability, not CVSS theory
              </li>
              <li>
                <span className="ps-icon">✓</span>
                Copy-paste Terraform, CLI, and CloudFormation fixes per path
              </li>
              <li>
                <span className="ps-icon">✓</span>
                Re-simulate after remediation to prove defenses actually hold
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
