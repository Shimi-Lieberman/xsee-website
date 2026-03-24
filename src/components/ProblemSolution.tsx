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
            exploited — by a human or an AI attacker?
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
              Wiz, Orca, Prisma — they all tell you what could go wrong.
              Nobody proves what will. Your team spends weeks triaging
              alerts ranked by CVSS scores that have no relationship
              to your actual blast radius. And none of them are built
              to defend against AI-powered attacks.
            </p>
            <ul className="ps-list">
              <li className="ps-item">
                <span className="ps-icon">✕</span>
                <span className="ps-item-text">4,000 alerts with no exploitability proof</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✕</span>
                <span className="ps-item-text">CVSS scores disconnected from real blast radius</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✕</span>
                <span className="ps-item-text">Weeks of manual triage</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✕</span>
                <span className="ps-item-text">No detection gap visibility</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✕</span>
                <span className="ps-item-text">Blind to AI-powered attack patterns</span>
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
              XSEE builds a live attack graph of your entire cloud,
              validates which paths actually reach your critical data
              with live AWS API evidence, and simulates attacks the
              way both human and AI attackers would execute them.
            </p>
            <ul className="ps-list">
              <li className="ps-item">
                <span className="ps-icon">✓</span>
                <span className="ps-item-text">3 validated paths proven by live AWS API calls</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✓</span>
                <span className="ps-item-text">Cryptographic evidence package per hop</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✓</span>
                <span className="ps-item-text">Results in under 30 minutes</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✓</span>
                <span className="ps-item-text">Detection Coverage Score per attack path</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✓</span>
                <span className="ps-item-text">Simulates human AND AI attacker behavior</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
