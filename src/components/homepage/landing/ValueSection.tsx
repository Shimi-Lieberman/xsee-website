const POINTS = [
  {
    title: "See how exposures connect.",
    body: "A single misconfiguration rarely tells the whole story. XSEE shows how exposures link together across your AWS environment, so priorities reflect what can actually be reached.",
  },
  {
    title: "Prioritize with evidence.",
    body: "Each path comes with the evidence that supports it and any gaps clearly marked. Your team can decide what to fix first and explain why.",
  },
  {
    title: "Confirm the change worked.",
    body: "After your team applies a fix, XSEE reassesses the relevant path and records the result. When monitoring is configured, a later relevant change prompts a fresh review.",
  },
];

const OUTPUTS = ["Prioritized reachable paths", "Evidence for each path", "Recorded re-check after remediation"];

export default function ValueSection() {
  return (
    <section id="value" className="lp-value" aria-labelledby="lp-value-title" data-nav-tone="dark">
      <div className="lp-value-inner">
        <div className="lp-value-head">
          <p className="lp-eyebrow">What XSEE gives your team</p>
          <h2 id="lp-value-title" className="lp-value-title text-balance">
            Clear decisions about which paths to close.
          </h2>
        </div>

        <ul className="lp-value-list">
          {POINTS.map((point) => (
            <li key={point.title} className="lp-value-item">
              <h3>{point.title}</h3>
              <p className="text-pretty">{point.body}</p>
            </li>
          ))}
        </ul>

        <div className="lp-outputs">
          <p className="lp-outputs-label">You receive</p>
          <ul>
            {OUTPUTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
