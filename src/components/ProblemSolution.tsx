export default function ProblemSolution() {
  return (
    <section className="section sec-light" id="problem">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow chip-warm">The Problem</span>
          <h2 className="display-lg">
            Your scanner is lying to you.
            <br />
            Not maliciously — it just can&apos;t tell{" "}
            <span style={{ color: "var(--blue-light)" }}>the difference between noise and a breach.</span>
          </h2>
          <p>
            Wiz flagged 4,000 issues last month. Your team triaged for three weeks. You fixed 200 findings. None of them were the three paths that actually reached your production database.
          </p>
          <p>
            The attacker didn&apos;t care about your CVSS scores. They followed the graph. And now AI-powered attackers are doing it 10,000 times faster than any human ever could. Your current tools were not built for this.
          </p>
          <div className="section-rule" />
        </div>
        <div className="ps-grid">
          <div className="ps-panel ps-without reveal-left">
            <div className="ps-tag">
              <span className="ps-tag-line" />
              What every other tool gives you
            </div>
            <h3>A list of things that could go wrong</h3>
            <p>
              Ranked by a score that has nothing to do with your actual environment. No proof. No priority. No path to closure.
            </p>
            <ul className="ps-list">
              <li className="ps-item">
                <span className="ps-icon">✕</span>
                <span className="ps-item-text">Thousands of alerts with no exploitability proof</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✕</span>
                <span className="ps-item-text">CVSS scores disconnected from your blast radius</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✕</span>
                <span className="ps-item-text">Weeks of manual triage with no end in sight</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✕</span>
                <span className="ps-item-text">Zero visibility into your detection gaps</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✕</span>
                <span className="ps-item-text">No defense against AI-powered attack patterns</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✕</span>
                <span className="ps-item-text">Findings that age, never get closed, never get proven</span>
              </li>
            </ul>
          </div>
          <div className="ps-panel ps-with reveal-right">
            <div className="ps-tag">
              <span className="ps-tag-line" />
              What XSEE gives you
            </div>
            <h3>Three findings. Each one proven exploitable.</h3>
            <p>
              By a live AWS API call. Each one with a cryptographic evidence package. Each one with the exact fix that closes the most paths. And a score that tells you exactly how much of your attack surface your tools can actually see.
            </p>
            <ul className="ps-list">
              <li className="ps-item">
                <span className="ps-icon">✓</span>
                <span className="ps-item-text">3 validated paths proven by live AWS API evidence</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✓</span>
                <span className="ps-item-text">Cryptographic proof package per hop — court-ready</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✓</span>
                <span className="ps-item-text">Results in under 30 minutes from first connect</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✓</span>
                <span className="ps-item-text">Detection Coverage Score: % your tools actually catch</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✓</span>
                <span className="ps-item-text">Simulation of human AND AI attacker behavior</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✓</span>
                <span className="ps-item-text">One fix recommendation that eliminates the most risk</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✓</span>
                <span className="ps-item-text">Financial exposure per path ($3.2M average)</span>
              </li>
              <li className="ps-item">
                <span className="ps-icon">✓</span>
                <span className="ps-item-text">Data at risk quantified (records × $164 IBM cost)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
