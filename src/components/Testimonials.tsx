export default function Testimonials() {
  return (
    <>
      {/*
        === PREVIOUS TESTIMONIALS / CASE STUDIES (replaced) ===
        <section className="testimonials-section" id="testimonials">
          <p className="testimonials-label">Proof from the Field</p>
          <h2 className="testimonials-headline">Security teams that stopped guessing.</h2>
          <p className="testimonials-sub">...</p>
          <div className="testimonials-grid">
            {caseStudies.map((cs) => (
              <article key={cs.metric} className="case-study-card reveal-on-scroll">...</article>
            ))}
          </div>
        </section>
      */}
      {/* === PROOF FROM THE FIELD === */}
      <section className="animate-on-scroll py-20 overflow-hidden" id="testimonials">
        <div className="max-w-6xl mx-auto w-full px-6 testimonials-inner">
          <div className="text-center mb-12">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 font-mono mb-3">
              Proof from the field
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Security teams that stopped guessing.
            </h2>
          </div>

          <div className="testimonials-grid">
            {[
              {
                outcome: "1 fix. 6 paths eliminated.",
                company: "B2B SaaS · 200 employees · AWS eu-central-1",
                quote:
                  "After 3 weeks triaging 1,800 Wiz findings with no clear priority, XSEE showed us the 3 paths that actually reached our database. One security group change. Done before lunch.",
                role: "Head of Security",
                metrics: [
                  { label: "Assets scanned", value: "847" },
                  { label: "Time to first proof", value: "22 min" },
                  { label: "Paths closed", value: "3" },
                ],
              },
              {
                outcome: "$3.2M exposure proven in 18 minutes.",
                company: "Fintech · Series A · AWS us-east-1",
                quote:
                  "Our CTO's question in every security review: 'Can you prove it?' After XSEE: yes. AWS API response per hop. Timestamped. The evidence package is now in our SOC2 audit file.",
                role: "Cloud Security Engineer",
                metrics: [
                  { label: "Exposure proven", value: "$3.2M" },
                  { label: "Time to report", value: "18 min" },
                  { label: "Critical paths closed", value: "3" },
                ],
              },
              {
                outcome: "72% of EKS attack steps invisible to GuardDuty.",
                company: "DevOps Platform · Scale-up · AWS EKS",
                quote:
                  "We thought we were well-protected. XSEE's Detection Coverage Score showed GuardDuty was blind to 72% of the actual attack steps in our EKS cluster. That number is in every board presentation.",
                role: "DevSecOps Lead",
                metrics: [
                  { label: "Detection gap found", value: "72%" },
                  { label: "Blind spots closed", value: "4 of 5" },
                  { label: "Board reports", value: "Every quarter" },
                ],
              },
            ].map((cs, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 flex flex-col min-w-0 w-full testimonial-card"
                style={{
                  background: "#111827",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="#FF1B8D" aria-hidden>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <div className="text-lg font-black text-white mb-3 leading-tight">{cs.outcome}</div>
                <p className="text-white/45 text-sm leading-relaxed mb-4 italic flex-1">&quot;{cs.quote}&quot;</p>
                <div className="text-xs text-white/30 mb-4">
                  <span className="font-semibold text-white/50">{cs.role}</span>
                  <span className="mx-1.5">·</span>
                  {cs.company}
                </div>
                <div
                  className="flex gap-4 pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {cs.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="text-sm font-black text-white font-mono">{m.value}</div>
                      <div className="text-[9px] text-white/28 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
