const TESTIMONIALS = [
  {
    quote: "We had 1,800 Wiz findings and zero confidence about what to fix first. XSEE showed us the 3 paths that actually reached our database. One security group change, six attack paths gone, done before lunch.",
    strong: "3 paths that actually reached our database",
    name: "Marcus T.",
    role: "Head of Security · SaaS Startup · AWS",
    initials: "MT",
  },
  {
    quote: "The evidence package changed every conversation. Our CTO's question was always \"can you prove it?\" — XSEE answered that with actual AWS API responses per hop. That's not a finding, that's a case file.",
    strong: "actual AWS API responses per hop",
    name: "Sarah K.",
    role: "Cloud Security Engineer · Fintech",
    initials: "SK",
  },
  {
    quote: "The attack simulation showed us our GuardDuty coverage had a complete blind spot across lateral movement in EKS. We'd been paying for detection that wouldn't have fired on the path that mattered most.",
    strong: "complete blind spot across lateral movement in EKS",
    name: "David R.",
    role: "DevSecOps Lead · Scale-up",
    initials: "DR",
  },
];

export default function Testimonials() {
  return (
    <section className="section sec-light" id="testimonials">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow chip-warm">Early Adopters</span>
          <h2 className="display-lg">What security teams say</h2>
          <div className="section-rule" />
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="testi-card reveal"
              style={{ transitionDelay: i * 0.1 + "s" }}
            >
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">
                {t.quote.split(t.strong)[0]}
                <strong>{t.strong}</strong>
                {t.quote.split(t.strong)[1]}
              </p>
              <div className="testi-author">
                <div className="testi-av">{t.initials}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
