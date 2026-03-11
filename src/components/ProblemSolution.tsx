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
                Thousands of findings ranked by theoretical CVSS, not real exploitability
              </li>
              <li>
                <span className="ps-icon">✕</span>
                No proof any discovered path actually reaches crown-jewel assets
              </li>
              <li>
                <span className="ps-icon">✕</span>
                Security teams burn sprints on findings that don&apos;t chain to a breach
              </li>
              <li>
                <span className="ps-icon">✕</span>
                Invisible multi-hop paths: IAM → EC2 → S3 → data exfil
              </li>
              <li>
                <span className="ps-icon">✕</span>
                Fixes applied blind — no verification that defenses actually hold
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
                Live attack graph — every asset, identity, permission and network edge mapped
              </li>
              <li>
                <span className="ps-icon">✓</span>
                Validated exploitability — real AWS API calls prove each hop is traversable
              </li>
              <li>
                <span className="ps-icon">✓</span>
                Crown-jewel reach — only surfaces paths that terminate at sensitive data
              </li>
              <li>
                <span className="ps-icon">✓</span>
                Choke-point fix — one change that collapses 6 attack paths simultaneously
              </li>
              <li>
                <span className="ps-icon">✓</span>
                Verified closed — re-simulate post-fix to prove the breach path is gone
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
