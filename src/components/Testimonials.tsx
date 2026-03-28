const caseStudies = [
  {
    metric: "1 change. 6 paths eliminated.",
    context: "A B2B SaaS team with 847 AWS assets",
    story:
      "After 3 weeks triaging 1,800 Wiz findings with no clear priority, XSEE identified 3 paths that actually reached their production database. One security group rule change eliminated 6 validated paths simultaneously. Evidence package went straight into their SOC2 audit file.",
    stats: [
      { label: "Assets scanned", value: "847" },
      { label: "Paths validated", value: "3" },
      { label: "Time to first proof", value: "22 min" },
    ],
    industry: "B2B SaaS · 200 employees",
  },
  {
    metric: "$3.2M exposure. Proven in 18 minutes.",
    context: "A fintech startup in eu-central-1",
    story:
      "Their CTO's standing question in every security review: 'Can you prove it?' After XSEE: yes. AWS API response per hop. Timestamped. Cryptographically signed. 3 critical paths closed in the same week the scan ran.",
    stats: [
      { label: "Exposure proven", value: "$3.2M" },
      { label: "Paths closed", value: "3" },
      { label: "Time to report", value: "18 min" },
    ],
    industry: "Fintech · Series A",
  },
  {
    metric: "72% of EKS attack steps: invisible to GuardDuty.",
    context: "A scale-up running EKS in production",
    story:
      "They thought they were well-protected. XSEE's Detection Coverage Score showed GuardDuty was blind to 72% of the actual attack steps in their EKS cluster. That number is now in every board presentation — and they've closed 4 of the 5 blind spots.",
    stats: [
      { label: "Detection gap found", value: "72%" },
      { label: "Blind spots closed", value: "4 of 5" },
      { label: "Board presentations", value: "Every quarter" },
    ],
    industry: "DevOps platform · Scale-up",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <p className="testimonials-label">Proof from the Field</p>
      <h2 className="testimonials-headline">Security teams that stopped guessing.</h2>
      <p className="testimonials-sub">
        These are real conversations that happened{" "}
        <span>after a first XSEE scan.</span>
      </p>
      <div className="testimonials-grid">
        {caseStudies.map((cs) => (
          <article key={cs.metric} className="case-study-card reveal-on-scroll">
            <p className="case-study-metric">{cs.metric}</p>
            <p className="case-study-context">{cs.context}</p>
            <div className="case-study-stats">
              {cs.stats.map((s) => (
                <div key={s.label} className="case-study-stat">
                  <div className="case-study-stat-value">{s.value}</div>
                  <div className="case-study-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="case-study-story">{cs.story}</p>
            <p className="case-study-industry">{cs.industry}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
