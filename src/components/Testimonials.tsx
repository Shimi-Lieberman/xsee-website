const TESTIMONIALS = [
  {
    quote: "We had 2,000 Wiz findings and no idea where to start. XSEE showed us the 3 that actually mattered — with proof. We fixed one SG rule and eliminated 6 attack paths in an afternoon.",
    name: "Marcus T.",
    role: "Head of Security · SaaS Startup · AWS",
    initials: "MT",
  },
  {
    quote: "The validation evidence package is what sold our CTO. Not \"this could be exploited\" — here's the actual AWS API response proving it is. That's a completely different conversation.",
    name: "Sarah K.",
    role: "Cloud Security Engineer · Fintech",
    initials: "SK",
  },
  {
    quote: "XseeCyber is unlike anything I've seen in cloud security. A full simulation showing exactly how an attacker moves — and where your detection completely misses it. Game-changing.",
    name: "David R.",
    role: "DevSecOps Lead · Scale-up",
    initials: "DR",
  },
];

export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Early Adopters</span>
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
                {t.quote.includes("3 that actually mattered") ? (
                  <>
                    {t.quote.split("3 that actually mattered")[0]}
                    <strong>3 that actually mattered</strong>
                    {t.quote.split("3 that actually mattered")[1]}
                  </>
                ) : t.quote.includes("actual AWS API response proving it is") ? (
                  <>
                    {t.quote.split("actual AWS API response proving it is")[0]}
                    <strong>actual AWS API response proving it is</strong>
                    {t.quote.split("actual AWS API response proving it is")[1]}
                  </>
                ) : t.quote.includes("full simulation showing exactly how an attacker moves") ? (
                  <>
                    {t.quote.split("full simulation showing exactly how an attacker moves")[0]}
                    <strong>full simulation showing exactly how an attacker moves</strong>
                    {t.quote.split("full simulation showing exactly how an attacker moves")[1]}
                  </>
                ) : (
                  t.quote
                )}
              </p>
              <div className="flex items-center gap-3">
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
