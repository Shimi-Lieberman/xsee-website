/**
 * "Connect → Certificate" process stepper.
 * Calm, Orca-style 01–05 horizontal flow that anchors the page with a confident
 * "this is how it works" overview. Uses the shared hp-page design tokens.
 */
const STEPS: readonly { n: string; title: string; desc: string }[] = [
  {
    n: "01",
    title: "Connect",
    desc: "Read-only IAM role. No agents, no friction. Live in about two minutes.",
  },
  {
    n: "02",
    title: "Map",
    desc: "We inventory every asset, identity, and network path across your cloud.",
  },
  {
    n: "03",
    title: "Simulate",
    desc: "Real attack paths run on your actual graph — not generic CVE lists.",
  },
  {
    n: "04",
    title: "Prioritize",
    desc: "Score the handful of paths that truly reach your crown jewels.",
  },
  {
    n: "05",
    title: "Certify",
    desc: "A signed Breach Prevention Certificate the moment each path is closed.",
  },
];

export default function ProcessStepper() {
  return (
    <section className="hp-section" aria-labelledby="process-title">
      <div className="hp-container">
        <div className="max-w-[640px]">
          <p className="hp-eyebrow mb-5">How it works</p>
          <h2
            id="process-title"
            className="hp-h-display"
            style={{ fontSize: "clamp(30px, 4.4vw, 52px)" }}
          >
            From connection to certificate
            <span className="block text-[var(--hp-ink3)]">in a single, prioritized flow.</span>
          </h2>
        </div>

        <ol className="hp-stepper mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0">
          {STEPS.map((step, i) => (
            <li key={step.n} className="hp-step relative flex flex-col">
              <div className="hp-step-rail relative flex items-center">
                <span className="hp-step-node hp-mono">{step.n}</span>
                {i < STEPS.length - 1 && <span className="hp-step-line" aria-hidden="true" />}
              </div>
              <h3 className="mt-6 text-[18px] font-semibold text-[var(--hp-ink)]">{step.title}</h3>
              <p className="mt-2 max-w-[15rem] text-[14px] leading-[1.55] text-[var(--hp-ink2)]">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
