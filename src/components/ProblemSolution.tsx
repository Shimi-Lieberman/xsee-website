export default function ProblemSolution() {
  return (
    <section className="section sec-light" id="problem">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow chip-warm">The Problem</span>
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
            <h3>4,000 alerts. No idea which three matter.</h3>
            <p>
              Wiz, Orca, Prisma — they all tell you what could go wrong. Nobody proves what will. Your team spends weeks triaging alerts ranked by CVSS scores that bear no relationship to your actual blast radius.
            </p>
            <ul className="ps-list">
              <li>
                <span className="ps-icon">✕</span>
                4,000 alerts with no priority signal
              </li>
              <li>
                <span className="ps-icon">✕</span>
                CVSS scores disconnected from real blast radius
              </li>
              <li>
                <span className="ps-icon">✕</span>
                Weeks of manual triage
              </li>
              <li>
                <span className="ps-icon">✕</span>
                No proof of exploitability
              </li>
              <li>
                <span className="ps-icon">✕</span>
                Fix anything, fix nothing
              </li>
            </ul>
          </div>
          <div className="ps-panel ps-with reveal-right">
            <div className="ps-tag">
              <span className="ps-tag-line" />
              With XSEE
            </div>
            <h3>Stop guessing. Prove the breach.</h3>
            <p>
              XSEE builds a live attack graph of your entire cloud — assets, identities, permissions, network edges — then validates which paths actually reach your critical data. Three findings. Real evidence. One fix that breaks them all.
            </p>
            <ul className="ps-list">
              <li>
                <span className="ps-icon">✓</span>
                3 validated paths to your crown jewels
              </li>
              <li>
                <span className="ps-icon">✓</span>
                Live AWS API evidence per hop
              </li>
              <li>
                <span className="ps-icon">✓</span>
                Results in under 30 minutes
              </li>
              <li>
                <span className="ps-icon">✓</span>
                Cryptographic proof package per finding
              </li>
              <li>
                <span className="ps-icon">✓</span>
                One fix that eliminates the most risk
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
