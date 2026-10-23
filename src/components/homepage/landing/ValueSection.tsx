const POINTS = [
  {
    title: "Understand connected exposures.",
    body: "XSEE shows how individual AWS exposures link together, so priorities reflect what can be reached.",
  },
  {
    title: "Prioritize with evidence.",
    body: "Each path includes the evidence behind it, with any gaps clearly marked.",
  },
  {
    title: "Reassess after a change.",
    body: "After your team applies a fix, XSEE reassesses the relevant path and records the result.",
  },
];

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
      </div>
    </section>
  );
}
