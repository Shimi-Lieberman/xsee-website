type TerminalSectionProps = {
  subheadline: string;
};

/**
 * Live Intelligence terminal — hp-section styling.
 * GlobalScripts typewriter targets #termOutput and .term-cursor inside it.
 */
export default function TerminalSection({ subheadline }: TerminalSectionProps) {
  return (
    <section id="terminal" className="hp-section relative overflow-hidden" aria-labelledby="terminal-title">
      <div
        className="pointer-events-none absolute -z-10"
        style={{
          left: "-200px",
          top: "20%",
          width: "560px",
          height: "560px",
          background: "radial-gradient(closest-side, rgba(255, 27, 141, 0.05), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="hp-container relative">
        <div className="mb-14 grid grid-cols-1 gap-8 lg:mb-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="hp-eyebrow mb-5">Live Intelligence</p>
            <h2 id="terminal-title" className="hp-h-display hp-h-display--wide" style={{ fontSize: "clamp(34px, 4.6vw, 60px)" }}>
              <span className="block">This is what XSEE sees</span>
              <span className="block text-[var(--hp-ink3)]">in your cloud in the first 30 minutes.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-10">
            <p className="text-[15.5px] leading-[1.65] text-[var(--hp-ink2)]">{subheadline}</p>
            <p className="mt-4 hp-mono text-[12px] text-[var(--hp-ink3)]" style={{ letterSpacing: "0.06em" }}>
              Just proof.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-[860px]">
          <div className="hp-terminal-window">
            <div className="hp-terminal-chrome">
              <div className="flex gap-1.5" aria-hidden>
                <span className="hp-terminal-dot hp-terminal-dot--red" />
                <span className="hp-terminal-dot hp-terminal-dot--yellow" />
                <span className="hp-terminal-dot hp-terminal-dot--green" />
              </div>
              <p className="hp-terminal-title">xsee — scan session // AWS eu-central-1 // READ-ONLY</p>
              <p className="hp-terminal-status">LIVE</p>
            </div>
            <div id="termOutput" className="term-body hp-terminal-body">
              <span className="term-cursor hp-terminal-cursor" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
