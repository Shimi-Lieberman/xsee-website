// HERO — Apple-scale editorial type + cinematic self-building attack graph
// Two stacks: (1) the type moment, (2) the full-bleed graph cinematic.

/* ───────────────────────────────────────────────────────────────
   AttackGraphCinematic — the signature visual.
   12s loop: SEE → CHAIN → PROVE → CLOSE.
   SVG viewBox 1200x520, positioned absolutely inside a card.
   ─────────────────────────────────────────────────────────────── */

function GraphNode({ x, y, w, h, icon, kind, label, id, isTarget, delay }) {
  const style = { animationDelay: `${delay}ms` };
  return (
    <g>
      {/* Halo (target only) */}
      {isTarget && (
        <>
          <circle cx={x + w/2} cy={y + h/2} r="58"
            className="hg-halo hg-halo-1"
            fill="none" stroke="#FF1B8D" strokeWidth="1.5" opacity="0"
            style={{ transformOrigin: `${x + w/2}px ${y + h/2}px` }} />
          <circle cx={x + w/2} cy={y + h/2} r="58"
            className="hg-halo hg-halo-2"
            fill="none" stroke="#FF1B8D" strokeWidth="1" opacity="0"
            style={{ transformOrigin: `${x + w/2}px ${y + h/2}px` }} />
        </>
      )}

      <g className="hg-node" style={{ ...style, transformOrigin: `${x + w/2}px ${y + h/2}px` }}>
        <rect x={x} y={y} width={w} height={h} rx="10"
          fill={isTarget ? '#1A0E1A' : '#0F1320'}
          stroke={isTarget ? 'rgba(255,27,141,0.55)' : '#262C3E'}
          strokeWidth="1" />
        {/* Inner subtle gradient highlight */}
        <rect x={x} y={y} width={w} height="1" fill="rgba(255,255,255,0.06)" rx="10" />
        {/* Icon glyph cell */}
        <rect x={x + 12} y={y + 12} width="28" height="28" rx="7"
          fill={isTarget ? 'rgba(255,27,141,0.16)' : '#161B2C'}
          stroke={isTarget ? 'rgba(255,27,141,0.3)' : '#2A3046'}
          strokeWidth="1" />
        <g transform={`translate(${x + 19}, ${y + 19})`}
          stroke={isTarget ? '#FF4FA3' : '#A6ADC1'} strokeWidth="1.4" fill="none"
          strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </g>
      </g>

      <g className="hg-label" style={style}>
        {/* Kind (eyebrow) */}
        <text x={x + 50} y={y + 22}
          fill={isTarget ? '#FF4FA3' : '#6B7388'}
          fontFamily="Geist" fontSize="9.5" fontWeight="600"
          letterSpacing="1.4">
          {kind}
        </text>
        {/* Label */}
        <text x={x + 50} y={y + 38}
          fill="#F6F7FB"
          fontFamily="Geist" fontSize="13.5" fontWeight="500">
          {label}
        </text>
        {/* Id */}
        <text x={x + 12} y={y + h - 14}
          fill="#6B7388"
          fontFamily="Geist Mono" fontSize="10" letterSpacing="0.4">
          {id}
        </text>
      </g>
    </g>
  );
}

function AttackGraphCinematic() {
  // Node coordinates — 5-step chain Internet → ALB → EC2 → IAM Role → RDS
  const NODE_W = 168, NODE_H = 78;
  const nodes = [
    { id: 'internet', x: 60,   y: 220, kind: 'INTERNET',  label: 'Public',      mono: '0.0.0.0/0',     delay: 0,
      icon: <><circle cx="5" cy="5" r="5"/><path d="M0 5h10M5 0a8 8 0 0 1 0 10M5 0a8 8 0 0 0 0 10"/></> },
    { id: 'alb',      x: 288,  y: 220, kind: 'ALB',       label: 'Edge LB',     mono: 'alb-prod-edge', delay: 150,
      icon: <><rect x="0" y="2" width="10" height="6" rx="1"/><path d="M2 5h6"/></> },
    { id: 'ec2',      x: 516,  y: 160, kind: 'EC2',       label: 'App server',  mono: 'i-0a3f2c8d',    delay: 300,
      icon: <><rect x="0" y="0" width="10" height="7" rx="1"/><path d="M3 9h4M5 7v2"/></> },
    { id: 'iam',      x: 516,  y: 290, kind: 'IAM ROLE',  label: 'svc-app',     mono: 'svc-app-prod',  delay: 450,
      icon: <><circle cx="5" cy="3.5" r="2.5"/><path d="M1.5 10c.6-2 2-3.2 3.5-3.2S8.4 8 9 10"/></> },
    { id: 'rds',      x: 744,  y: 220, kind: 'TARGET',    label: 'Prod DB',     mono: 'prod-postgres', delay: 600, isTarget: true,
      icon: <><ellipse cx="5" cy="2" rx="4.5" ry="1.5"/><path d="M0.5 2v6c0 .8 2 1.5 4.5 1.5S9.5 8.8 9.5 8V2"/><path d="M0.5 5.2c0 .8 2 1.5 4.5 1.5S9.5 6 9.5 5.2"/></> },
  ];

  // Edges — drawn left-to-right
  const NCX = (n) => n.x + NODE_W / 2;
  const NCY = (n) => n.y + NODE_H / 2;
  const edges = [
    { from: nodes[0], to: nodes[1], call: 'HTTP 443',            delay: 700 },
    { from: nodes[1], to: nodes[2], call: 'forward',             delay: 850 },
    { from: nodes[2], to: nodes[3], call: 'sts:AssumeRole',      delay: 1000 },
    { from: nodes[3], to: nodes[4], call: 'rds:Connect',         delay: 1150 },
  ];

  // Scattered findings (SEE phase) — small squares across the canvas
  const findings = React.useMemo(() => {
    const f = [];
    const W = 1080, H = 460;
    let seed = 7;
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let i = 0; i < 70; i++) {
      f.push({
        x: 80 + rand() * W,
        y: 30 + rand() * H,
        s: 3 + rand() * 3.5,
        delay: rand() * 800,
      });
    }
    return f;
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Phase chips along the top */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {[
          { n: 1, label: 'See',     sub: 'findings populate' },
          { n: 2, label: 'Chain',   sub: 'paths draw' },
          { n: 3, label: 'Prove',   sub: 'evidence per hop' },
          { n: 4, label: 'Close',   sub: 'signed' },
        ].map(p => (
          <div key={p.n}
            className={`hg-phase hg-phase-${p.n} inline-flex items-center gap-2 h-7 px-3 rounded-full border`}>
            <span className="mono text-[10px] opacity-70">0{p.n}</span>
            <span className="text-[11px] font-medium">{p.label}</span>
            <span className="text-[11px] opacity-60 hidden md:inline">— {p.sub}</span>
          </div>
        ))}
        <div className="ml-auto eyebrow text-[10px] hidden md:flex items-center gap-2">
          <span className="green-dot dot-pulse"></span>
          <span>live · acme-prod</span>
        </div>
      </div>

      {/* The graph canvas */}
      <div className="relative rounded-[14px] overflow-hidden card-dark dotgrid-dark"
        style={{ aspectRatio: '1200 / 520' }}>

        {/* Atmospheric pink wash bottom-right (target zone) */}
        <div className="absolute pointer-events-none" style={{
          right: '-10%', bottom: '-30%', width: '60%', height: '90%',
          background: 'radial-gradient(closest-side, rgba(255,27,141,0.18), rgba(255,27,141,0) 70%)',
          filter: 'blur(20px)',
        }}></div>

        <svg viewBox="0 0 1200 520" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF1B8D" stopOpacity="0.2"/>
              <stop offset="50%" stopColor="#FF1B8D" stopOpacity="1"/>
              <stop offset="100%" stopColor="#FF1B8D" stopOpacity="0.4"/>
            </linearGradient>
            <radialGradient id="cometGrad" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#FF4FA3" stopOpacity="1"/>
              <stop offset="100%" stopColor="#FF1B8D" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* ── Findings (SEE phase) ── */}
          {findings.map((f, i) => (
            <rect key={i}
              x={f.x} y={f.y} width={f.s} height={f.s} rx="0.5"
              fill="#FF1B8D" opacity="0"
              className="hg-finding"
              style={{ animationDelay: `${f.delay}ms` }} />
          ))}

          {/* Scanline sweep */}
          <g className="hg-scan">
            <rect x="-30" y="20" width="22" height="480"
              fill="url(#scanGrad)" opacity="0.5" />
            <line x1="-8" y1="20" x2="-8" y2="500"
              stroke="#FF1B8D" strokeWidth="1" opacity="0.6" />
          </g>

          {/* ── Edges (CHAIN phase) ── */}
          {edges.map((e, i) => {
            const x1 = NCX(e.from), y1 = NCY(e.from);
            const x2 = NCX(e.to),   y2 = NCY(e.to);
            // Subtle curve via cubic
            const cx1 = (x1 + x2) / 2, cy1 = y1;
            const cx2 = (x1 + x2) / 2, cy2 = y2;
            const d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
            return (
              <g key={i}>
                {/* Faint baseline */}
                <path d={d} stroke="#2A3046" strokeWidth="1" fill="none" opacity="0.6"/>
                {/* Animated draw */}
                <path d={d}
                  stroke="#FF1B8D" strokeWidth="1.6" fill="none"
                  strokeLinecap="round" opacity="0"
                  className="hg-edge"
                  style={{ animationDelay: `${e.delay}ms` }} />
                {/* Comet traveling along path */}
                <circle r="7" fill="url(#cometGrad)" opacity="0" className="hg-comet"
                  style={{ animationDelay: `${i * 90}ms` }}>
                  <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${5 + i * 0.3}s`}
                    keyTimes="0;1" keySplines="0.4 0 0.2 1" calcMode="spline">
                    <mpath href={`#edge-path-${i}`} />
                  </animateMotion>
                </circle>
                {/* Hidden path for mpath ref */}
                <path id={`edge-path-${i}`} d={d} fill="none" stroke="none" />

                {/* API call label */}
                <g className="hg-label" style={{ animationDelay: `${e.delay + 200}ms` }}>
                  <text
                    x={(x1 + x2) / 2}
                    y={y1 === y2 ? y1 - 14 : (y1 + y2) / 2}
                    textAnchor="middle"
                    fill="#A6ADC1"
                    fontFamily="Geist Mono" fontSize="10.5">
                    {e.call}
                  </text>
                </g>
              </g>
            );
          })}

          {/* ── Nodes ── */}
          {nodes.map((n) => (
            <GraphNode key={n.id} {...n} w={NODE_W} h={NODE_H} />
          ))}

          {/* ── Certificate stamp at end (CLOSE phase) ── */}
          <g className="hg-label" style={{ animationDelay: '8500ms' }}>
            <g transform="translate(950, 410)">
              <rect x="0" y="0" width="220" height="76" rx="10"
                fill="#0F1320" stroke="rgba(16,185,129,0.45)" strokeWidth="1"/>
              <circle cx="22" cy="38" r="13" fill="rgba(16,185,129,0.16)" stroke="rgba(16,185,129,0.55)" strokeWidth="1"/>
              <path d="M16 38 L21 43 L28 33" fill="none" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="44" y="32" fill="#6B7388" fontFamily="Geist" fontSize="9.5" fontWeight="600" letterSpacing="1.4">SIGNED</text>
              <text x="44" y="49" fill="#F6F7FB" fontFamily="Geist" fontSize="13" fontWeight="500">Path closed · receipt #4f2a</text>
              <text x="44" y="64" fill="#6B7388" fontFamily="Geist Mono" fontSize="9.5">1.2s · 4 hops · 92% conf.</text>
            </g>
          </g>
        </svg>

        {/* Bottom-left status overlay */}
        <div className="absolute bottom-4 left-5 flex items-center gap-3 text-ink3 mono text-[10.5px] tracking-wider">
          <span>BREACH PATH · 4 HOPS</span>
          <span className="text-ink4">·</span>
          <span>EVIDENCE: AWS CLOUDTRAIL</span>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────
   Hero shell
   ─────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section id="top" className="relative pt-[120px] lg:pt-[160px] pb-20 lg:pb-28 px-6 lg:px-10 overflow-hidden">

      {/* Atmosphere: off-center pink wash + faint hairline ruling */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
        <div className="absolute glow-brand" style={{
          right: '-260px', top: '40px',
          width: '920px', height: '920px',
        }}></div>
        <div className="absolute glow-brand-soft" style={{
          left: '-200px', bottom: '-200px',
          width: '720px', height: '720px',
        }}></div>
        {/* Vertical faint hairline far-right */}
        <div className="absolute top-0 bottom-0 right-[6%] w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, #1B2030 18%, #1B2030 82%, transparent)' }}></div>
        {/* Grain */}
        <div className="grain"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative">

        {/* Eyebrow row */}
        <div className="flex flex-wrap items-center gap-3 mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border hairline">
            <span className="pink-dot dot-pulse"></span>
            <span className="mono text-[10.5px] text-ink2 tracking-[0.14em]">v1.5 · AUTONOMOUS AGENTS LIVE</span>
          </div>
          <span className="hidden md:inline eyebrow text-ink3">Cloud attack intelligence · AWS</span>
        </div>

        {/* THE TYPE MOMENT */}
        <h1 className="display display-xxl text-ink" style={{ maxWidth: '15ch' }}>
          <span className="block">Prove</span>
          <span className="block">the breach{" "}
            <span className="serif-accent text-ink2 italic" style={{ fontWeight: 400 }}>before</span>
          </span>
          <span className="block">
            <span className="serif-accent text-ink2 italic" style={{ fontWeight: 400 }}>they take it.</span>
          </span>
        </h1>

        {/* Sub block — generous spacing, two-column */}
        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="text-[18px] lg:text-[20px] leading-[1.55] text-ink2"
              style={{ textWrap: 'pretty', maxWidth: '54ch' }}>
              Your scanner sees four thousand findings. Three of them lead to your
              production database. xsee finds those three —{" "}
              <span className="text-ink">with live AWS evidence per hop,</span> attack simulation
              on your actual graph, and a signed certificate the moment each path is closed.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#cta" className="btn-pink inline-flex items-center gap-2 h-12 px-5 rounded-full text-[14.5px] font-medium text-white">
                Free breach report
                <I.ArrowRight className="w-4 h-4" />
              </a>
              <a href="#how" className="btn-ghost inline-flex items-center gap-2 h-12 px-5 rounded-full text-[14.5px] text-ink2">
                See it work
                <I.ArrowDown className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-10 mono text-[11px] text-ink3 tracking-[0.14em] flex flex-wrap items-center gap-x-5 gap-y-2">
              <span>2 MIN TO CONNECT</span>
              <span className="text-ink4">·</span>
              <span>READ-ONLY IAM</span>
              <span className="text-ink4">·</span>
              <span>NO AGENTS</span>
              <span className="text-ink4">·</span>
              <span>DATA STAYS IN AWS</span>
            </div>
          </div>

          {/* Right column: editorial caption + serif italic call-out */}
          <div className="lg:col-span-5 lg:pl-6">
            <div className="border-l hairline pl-6 max-w-[420px]">
              <div className="eyebrow mb-3">The thesis</div>
              <p className="serif-accent text-ink text-[28px] lg:text-[34px] leading-[1.18] tracking-tight"
                style={{ textWrap: 'pretty' }}>
                Every breach has a path. We&nbsp;prove&nbsp;it before they walk it.
              </p>
              <div className="mt-6 flex items-center gap-3 text-ink3 text-[12.5px]">
                <span className="mono">— xsee thesis · 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* THE CINEMATIC GRAPH */}
        <div className="mt-24 lg:mt-32">
          <div className="flex items-end justify-between mb-7">
            <div>
              <div className="eyebrow mb-2">Path · live evidence</div>
              <h2 className="display text-ink text-[22px] lg:text-[26px] font-medium tracking-tight">
                Watch a breach path build itself.
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 eyebrow text-ink2">
              <span className="green-dot"></span>
              <span>verified · signed</span>
            </div>
          </div>

          <AttackGraphCinematic />

          {/* Mono detail strip under the graph */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 mono text-[11.5px] text-ink3">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span><span className="text-ink">1.2s</span> · scan-to-proof</span>
              <span className="text-ink4">·</span>
              <span><span className="text-ink">4 hops</span> · Internet → RDS</span>
              <span className="text-ink4">·</span>
              <span><span className="text-ink">92%</span> exploit confidence</span>
            </div>
            <a href="#" className="inline-flex items-center gap-1.5 text-ink2 hover:text-ink transition-colors">
              See full receipt
              <I.ArrowUpRight className="w-3.5 h-3.5"/>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

window.Hero = Hero;
