/**
 * Standalone terminal section ("Live Intelligence").
 * GlobalScripts injects typewriter lines into #termOutput via IntersectionObserver.
 */
export default function TerminalSection() {
  return (
    <section className="sec-terminal">
      <div className="term-wrap">
        <div className="section-head reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="eyebrow">Live Intelligence</span>
          <h2 className="display-md" style={{ margin: "0 auto" }}>
            What XSEE sees in your cloud
          </h2>
          <p style={{ maxWidth: 560, margin: "16px auto 0", color: "var(--text-muted)" }}>
            Connect once with read-only IAM. XSEE maps every asset, validates every path,
            <br />
            and delivers a ranked breach report in under 30 minutes.
          </p>
        </div>

        <div className="term-window reveal">
          <div className="term-chrome">
            <div className="term-dots">
              <div className="term-dot red" />
              <div className="term-dot yellow" />
              <div className="term-dot green" />
            </div>
            <div className="term-title">
              xsee — scan session // AWS eu-central-1 // READ-ONLY
            </div>
            <div className="term-status">LIVE</div>
          </div>
          <div className="term-body" id="termOutput">
            <div className="term-cursor" />
          </div>
        </div>
      </div>
    </section>
  );
}
