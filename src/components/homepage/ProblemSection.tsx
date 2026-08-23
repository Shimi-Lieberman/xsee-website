const SIGNALS = Array.from({ length: 24 }, (_, index) => index);

export default function ProblemSection() {
  return (
    <section id="problem" className="hp-section xsee-problem" aria-labelledby="problem-title">
      <div className="hp-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="hp-eyebrow mb-5">03 / SIGNAL REDUCTION</p>
            <h2 id="problem-title" className="hp-h-display text-balance" style={{ fontSize: "clamp(38px, 5.6vw, 76px)" }}>
              Four thousand findings.<br /><span className="text-[var(--hp-brand)]">Three paths that matter.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[17px] leading-[1.65] text-[var(--hp-ink2)]">Severity scores describe possibility. XSEE validates reachability—using your real identities, controls, and AWS API responses.</p>
          </div>
        </div>

        <div className="xsee-reduction mt-14 lg:mt-20">
          <div className="xsee-reduction-stage">
            <div className="xsee-stage-label"><span>INPUT</span><strong>4,000</strong><small>CSPM findings</small></div>
            <div className="xsee-signal-field" aria-hidden>{SIGNALS.map((signal) => <span key={signal} style={{ animationDelay: `${signal * 70}ms` }} />)}</div>
          </div>
          <div className="xsee-reduction-flow" aria-hidden><span>correlate</span><i /><span>simulate</span><i /><span>verify</span></div>
          <div className="xsee-reduction-stage xsee-reduction-stage--result">
            <div className="xsee-stage-label"><span>PROVEN</span><strong>3</strong><small>paths reach production</small></div>
            <div className="flex flex-col gap-2">
              {["Internet → ALB → IAM → RDS", "CI token → role chain → S3", "Public pod → metadata → secrets"].map((path, index) => (
                <div key={path} className="xsee-path-row"><span className="hp-mono">0{index + 1}</span><b>{path}</b><em>{index === 0 ? "CRITICAL" : "VERIFIED"}</em></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
