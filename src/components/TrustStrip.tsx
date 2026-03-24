const COMPANIES = [
  "Series B Startup",
  "Fortune 500",
  "Fintech Leader",
  "Cloud-Native SaaS",
  "Healthcare Innovator",
  "DevOps at Scale",
];

export default function TrustStrip() {
  return (
    <div className="logos-strip">
      <p className="logos-label">Trusted by security teams who are done guessing</p>
      <div className="overflow-hidden">
        <div className="logos-track">
          <div className="logos-set">
            {COMPANIES.map((name) => (
              <span key={name} className="logo-item">
                {name}
              </span>
            ))}
          </div>
          <div className="logos-set" aria-hidden>
            {COMPANIES.map((name) => (
              <span key={name} className="logo-item">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="logos-sublabel">
        <a href="#contact" className="logos-sublink">
          Early access open — join security teams on the waitlist →
        </a>
      </p>
    </div>
  );
}
