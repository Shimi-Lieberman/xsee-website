import Link from "next/link";

const directions = [
  {
    id: "01",
    name: "Proof Canvas",
    type: "Calm · Product-led",
    summary: "A quiet, open workspace. Let the attack path do the explaining.",
    recommendation: "Best balance",
    variant: "canvas",
    features: ["Open whitespace", "One clear path visualization", "Confident, low-noise hierarchy"],
  },
  {
    id: "02",
    name: "Signal Lab",
    type: "Technical · Live",
    summary: "A live instrument panel makes XSEE feel like technology in motion.",
    recommendation: "Most cutting-edge",
    variant: "lab",
    features: ["Dark product surface, light outer page", "Live signal language", "Graph-first interaction"],
  },
  {
    id: "03",
    name: "Evidence Brief",
    type: "Confident · Enterprise",
    summary: "A precise evidence report turns a complex finding into a decision.",
    recommendation: "Most enterprise",
    variant: "brief",
    features: ["Report-inspired composition", "Proof and provenance up front", "Measured typographic tone"],
  },
] as const;

function MiniNav({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`mock-nav${dark ? " mock-nav-dark" : ""}`}>
      <div className="mock-wordmark"><span className="mock-mark">X</span><span>xsee</span></div>
      <div className="mock-nav-links"><span>Platform</span><span>Research</span><span>Sign in</span></div>
      <span className="mock-nav-cta">Explore XSEE <span aria-hidden="true">↗</span></span>
    </div>
  );
}

function PathDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`path-diagram${compact ? " path-diagram-compact" : ""}`} aria-label="Illustrative attack path from exposed workload to sensitive data">
      <div className="path-node"><span className="path-node-icon">01</span><span className="path-node-label">Workload</span><span className="path-node-meta">internet-facing</span></div>
      <span className="path-connector" aria-hidden="true"><i /></span>
      <div className="path-node path-node-highlight"><span className="path-node-icon">02</span><span className="path-node-label">Role access</span><span className="path-node-meta">verified</span></div>
      <span className="path-connector" aria-hidden="true"><i /></span>
      <div className="path-node"><span className="path-node-icon">03</span><span className="path-node-label">Data store</span><span className="path-node-meta">sensitive</span></div>
    </div>
  );
}

function ProductPreview({ variant }: { variant: (typeof directions)[number]["variant"] }) {
  if (variant === "canvas") {
    return (
      <div className="mock-window mock-canvas">
        <MiniNav />
        <div className="canvas-content">
          <p className="mock-eyebrow"><span className="mock-status" /> CLOUD EXPOSURE / AWS</p>
          <h3>Find the path.<br /><em>Prove the impact.</em></h3>
          <p className="mock-deck">From first exposure to sensitive data, with evidence at every hop.</p>
          <div className="canvas-path-wrap"><PathDiagram /></div>
          <div className="canvas-foot"><span>3 verified hops</span><span>Evidence attached <b>↗</b></span></div>
        </div>
      </div>
    );
  }

  if (variant === "lab") {
    return (
      <div className="mock-window mock-lab">
        <MiniNav dark />
        <div className="lab-content">
          <div className="lab-overline"><span className="live-pulse" /> LIVE VALIDATION <span className="lab-region">AWS / US-EAST-1</span></div>
          <h3>Attack paths,<br /><em>under the microscope.</em></h3>
          <div className="lab-console">
            <div className="console-top"><span>PATH TRACE <b>RUNNING</b></span><span>TRACE 7F2A</span></div>
            <PathDiagram compact />
            <div className="console-bottom"><span><i className="console-dot dot-pink" /> exposure confirmed</span><span><i className="console-dot dot-indigo" /> evidence signed</span></div>
          </div>
          <div className="lab-foot"><span>READ-ONLY ACCESS</span><span>NO AGENTS REQUIRED</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mock-window mock-brief">
      <MiniNav />
      <div className="brief-content">
        <div className="brief-kicker">XSEE / SECURITY EVIDENCE</div>
        <h3>One real path.<br /><em>Every hop accounted for.</em></h3>
        <p className="mock-deck">An evidence-first view for decisions that need to hold up in review.</p>
        <div className="report-sheet">
          <div className="report-head"><span>PATH REPORT <b>EXAMPLE</b></span><span>REF. 7F2A</span></div>
          <div className="report-row"><span className="report-index">01</span><span>Public workload</span><span className="report-state">EXPOSED</span></div>
          <div className="report-row"><span className="report-index">02</span><span>Privilege assumption</span><span className="report-state">PROVEN</span></div>
          <div className="report-row"><span className="report-index">03</span><span>Customer data store</span><span className="report-state">IN SCOPE</span></div>
          <div className="report-signoff"><span>Evidence chain</span><strong><span className="signoff-dot" /> VERIFIED · SIGNED</strong></div>
        </div>
      </div>
    </div>
  );
}

export default function DesignDirectionBoard() {
  return (
    <main className="direction-board">
      <header className="study-header">
        <Link href="/" className="study-brand"><span className="study-mark">X</span> XSEE <span className="study-divider">/</span> DESIGN STUDY</Link>
        <span className="study-version">VISUAL DIRECTIONS · 2026</span>
      </header>

      <section className="study-intro">
        <p className="study-kicker"><span /> BRAND EXPLORATION / 03 DIRECTIONS</p>
        <h1>Calm in the interface.<br /><em>Advanced under the surface.</em></h1>
        <p className="study-lede">Three distinct ways to make XSEE feel clear, composed, and unmistakably capable—without changing the brand palette.</p>
        <div className="study-palette" aria-label="XSEE palette: pink, indigo, ink, mist and white">
          <span><i className="swatch swatch-pink" /> Signal pink</span>
          <span><i className="swatch swatch-indigo" /> Trust indigo</span>
          <span><i className="swatch swatch-ink" /> Ink</span>
          <span><i className="swatch swatch-mist" /> Cool mist</span>
        </div>
      </section>

      <section className="direction-grid" aria-label="Design direction mockups">
        {directions.map((direction) => (
          <article className="direction-card" key={direction.id}>
            <div className="direction-meta"><span className="direction-index">{direction.id}</span><span className="direction-type">{direction.type}</span></div>
            <ProductPreview variant={direction.variant} />
            <div className="direction-copy">
              <div className="direction-title-row"><h2>{direction.name}</h2><span className="direction-recommendation">{direction.recommendation}</span></div>
              <p>{direction.summary}</p>
              <ul>{direction.features.map((feature) => <li key={feature}><span aria-hidden="true">↗</span>{feature}</li>)}</ul>
            </div>
          </article>
        ))}
      </section>

      <section className="research-notes">
        <div>
          <p className="study-kicker"><span /> RESEARCH NOTES</p>
          <h2>Borrow the principles.<br /><em>Make them XSEE.</em></h2>
        </div>
        <div className="research-list">
          <p><a href="https://linear.app" target="_blank" rel="noreferrer">Linear</a><span>Quiet hierarchy, restrained chrome, product-first storytelling.</span></p>
          <p><a href="https://vercel.com" target="_blank" rel="noreferrer">Vercel / Geist</a><span>Precise type, disciplined spacing, technical confidence without decoration.</span></p>
          <p><a href="https://www.wiz.io" target="_blank" rel="noreferrer">Wiz</a><span>Make security concepts legible through visuals that explain the product.</span></p>
        </div>
      </section>

      <footer className="study-footer"><span>Concept previews only · illustrative product UI, not live XSEE data</span><span>Choose 01, 02, or 03 to take the direction further.</span></footer>
    </main>
  );
}
