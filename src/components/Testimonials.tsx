"use client";

export default function Testimonials() {
  const cards = [
    {
      outcome: "1 fix. 6 paths eliminated.",
      company: "B2B SaaS · 200 employees · AWS eu-central-1",
      quote:
        "After 3 weeks triaging 1,800 findings with no clear priority, XSEE showed us the 3 paths that actually reached our database. One security group change. Done before lunch.",
      role: "Head of Security",
      metrics: [
        { label: "Assets scanned", value: "847" },
        { label: "Time to proof", value: "22 min" },
        { label: "Paths closed", value: "3" },
      ],
    },
    {
      outcome: "$3.2M exposure proven in 18 minutes.",
      company: "Fintech · Series A · AWS us-east-1",
      quote:
        "Our CTO asks the same question in every security review: 'Can you prove it?' After XSEE: yes. AWS API response per hop. Timestamped. That evidence package is now in our SOC2 audit file.",
      role: "Cloud Security Engineer",
      metrics: [
        { label: "Exposure proven", value: "$3.2M" },
        { label: "Time to report", value: "18 min" },
        { label: "Paths closed", value: "3" },
      ],
    },
    {
      outcome: "72% of attack steps invisible to our tools.",
      company: "DevOps Platform · Scale-up · AWS EKS",
      quote:
        "We thought we were well-protected. XSEE's Detection Coverage Score showed our tools were blind to 72% of the actual attack steps in our EKS cluster. That number is in every board presentation.",
      role: "DevSecOps Lead",
      metrics: [
        { label: "Detection gap found", value: "72%" },
        { label: "Blind spots closed", value: "4 of 5" },
        { label: "Board reports", value: "Every Q" },
      ],
    },
  ];

  return (
    <section className="animate-on-scroll py-20 overflow-hidden" id="testimonials">
      <div className="max-w-6xl mx-auto w-full px-6 testimonials-inner">
        <div className="text-center mb-12">
          <span className="section-eyebrow section-eyebrow-dark mb-3 block">Proof from the field</span>
          <h2 className="text-3xl md:text-4xl font-black" style={{ color: "#0f172a" }}>
            Security teams that stopped guessing.
          </h2>
        </div>

        <div className="testimonials-grid stagger-children">
          {cards.map((cs) => (
            <div
              key={cs.outcome}
              className="top-bar-card reveal"
              style={{
                background: "#fafaf9",
                border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: "16px",
                padding: "24px",
                transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 56px rgba(255,31,143,0.06)";
                e.currentTarget.style.borderColor = "rgba(255,31,143,0.16)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.07)";
              }}
            >
              <div className="flex gap-0.5 mb-4" style={{ letterSpacing: "2px" }}>
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="var(--pink)" aria-hidden>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <div className="mb-3 leading-tight" style={{ fontSize: "19px", fontWeight: 900, color: "#0f172a" }}>
                {cs.outcome}
              </div>
              <p className="leading-relaxed mb-4 italic flex-1" style={{ fontSize: "13px", color: "var(--ink-2)" }}>
                &quot;{cs.quote}&quot;
              </p>
              <div className="text-xs mb-4" style={{ color: "#94a3b8" }}>
                <span className="font-semibold" style={{ color: "#475569" }}>
                  {cs.role}
                </span>
                <span className="mx-1.5">·</span>
                {cs.company}
              </div>
              <div className="flex gap-4 pt-4" style={{ borderTop: "1px solid #e2e8f0" }}>
                {cs.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-black font-mono" style={{ fontSize: "18px", color: "#0f172a" }}>
                      {m.value}
                    </div>
                    <div className="text-[9px] mt-0.5" style={{ color: "#94a3b8" }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
