export default function ProblemSection() {
  return (
    <section id="problem" className="hp-section" aria-labelledby="problem-title">
      <div className="hp-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="hp-eyebrow mb-5">The core problem</p>
          <h2
            id="problem-title"
            className="hp-h-display hp-h-display--wide"
            style={{ fontSize: "clamp(34px, 4.4vw, 56px)" }}
          >
            <span className="block">Every cloud security tool tells you what&apos;s wrong.</span>
            <span className="block text-[var(--hp-ink3)]">None of them prove it can actually be exploited.</span>
          </h2>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="max-w-[520px] space-y-6 text-[17px] leading-[1.6] text-[var(--hp-ink2)]">
            <p>
              Posture tools rank findings by CVSS scores that don&apos;t know your environment. Attack-path tools draw
              theoretical graphs. CSPMs generate thousands of alerts that age and never get verified.
            </p>
            <p>
              Your security team spends weeks triaging findings — and the attacker doesn&apos;t care about your CVSS
              scores. They follow the graph. Proof requires more than detection. It requires a live AWS API call per
              hop, simulated end-to-end, verified after the fix, and signed.
            </p>
            <p className="text-[var(--hp-ink)]">XSEE is built around one premise: proof, or it doesn&apos;t count.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
