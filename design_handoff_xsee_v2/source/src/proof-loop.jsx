// SECTION — Proof Loop, refined cinematic
// 12s cycle, 4 phases (SEE → CHAIN → PROVE → CLOSE).
// Captions + certificate live OUTSIDE the SVG (no more stacking / overlap).
// Phase is React-driven for deterministic state; visual flourishes stay CSS.

function ProofLoopStage() {
  // ─── State ────────────────────────────────────────────────────
  const [phase, setPhase] = React.useState(0); // 0..3
  const [cycleKey, setCycleKey] = React.useState(0);
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    if (!wrapRef.current) return;
    let timer;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      setPhase(0);
      setCycleKey(k => k + 1); // remount SVG → restart CSS animations
      clearInterval(timer);
      timer = setInterval(() => setPhase(p => (p + 1) % 4), 3000);
    };
    const stop = () => { started = false; clearInterval(timer); };

    // Kick off immediately so we never freeze on SEE waiting for IO.
    start();

    // Then let IO pause when out of view, resume when back in.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: [0, 0.05, 0.25] });
    io.observe(wrapRef.current);
    return () => { io.disconnect(); stop(); };
  }, []);

  // ─── Layout constants ─────────────────────────────────────────
  const VB_W = 1200, VB_H = 460;
  const HOP_W = 152, HOP_H = 64;
  const LANES = [60, 198, 336];          // top y of each lane
  const COLS  = [16, 196, 376, 556];     // left x of each hop column
  const TARGET = { x: 850, y: 130, w: 300, h: 200 };

  const cx = (col) => COLS[col] + HOP_W / 2;
  const cy = (lane) => LANES[lane] + HOP_H / 2;

  const lanes = [
    {
      id: 'p1',
      hops: [
        { col: 0, kind: 'INTERNET', id: '0.0.0.0/0' },
        { col: 1, kind: 'ALB',      id: 'alb-prod' },
        { col: 2, kind: 'EC2',      id: 'i-0a3f2c8d' },
        { col: 3, kind: 'IAM ROLE', id: 'svc-app' },
      ],
      calls: ['HTTPS 443', 'sts:AssumeRole', 'rds:Connect'],
    },
    {
      id: 'p2',
      hops: [
        { col: 0, kind: 'INTERNET', id: '0.0.0.0/0' },
        { col: 1, kind: 'ALB',      id: 'alb-edge' },
        { col: 2, kind: 'EC2',      id: 'i-7b1e44a' },
        { col: 3, kind: 'IAM ROLE', id: 'ci-deploy' },
      ],
      calls: ['HTTPS 443', 'lambda:Invoke', 'iam:PassRole'],
    },
    {
      id: 'p3',
      hops: [
        { col: 0, kind: 'INTERNET', id: '0.0.0.0/0' },
        { col: 1, kind: 'EC2',      id: 'i-9c2d11e' },
        { col: 2, kind: 'IAM ROLE', id: 'cross-acct' },
        { col: 3, kind: 'IAM ROLE', id: 'data-read' },
      ],
      calls: ['HTTPS 443', 'sts:AssumeRole', 'rds:Describe*'],
    },
  ];

  // Smooth path: from leaving the cloud column edge, through each hop,
  // converging on the target's left-mid edge.
  const TARGET_ENTRY = { x: TARGET.x + 18, y: TARGET.y + TARGET.h / 2 };
  const pathD = (laneIdx, hops) => {
    const start = { x: 10, y: cy(laneIdx) }; // start at canvas left
    const pts = [
      start,
      ...hops.map(h => ({ x: cx(h.col), y: cy(laneIdx) })),
      TARGET_ENTRY,
    ];
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i];
      const mx = (a.x + b.x) / 2;
      d += ` C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
    }
    return d;
  };

  // Findings — deterministic scatter, slightly denser on left
  const findings = React.useMemo(() => {
    let s = 1337;
    const r = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 0x100000000; };
    const arr = [];
    for (let i = 0; i < 110; i++) {
      // bias left side
      const lean = Math.pow(r(), 1.4);
      const x = 20 + lean * (VB_W - 40);
      const y = 20 + r() * (VB_H - 40);
      // avoid the target zone
      if (x > TARGET.x - 24 && x < TARGET.x + TARGET.w + 24 &&
          y > TARGET.y - 24 && y < TARGET.y + TARGET.h + 24) continue;
      arr.push({ x, y, s: 2.5 + r() * 2, delay: r() * 1800 });
    }
    return arr;
  }, []);

  // ─── Render ───────────────────────────────────────────────────
  const captions = [
    { i: '01', text: '4,000 findings across your AWS account.',          sub: 'Cloud signals, untriaged.' },
    { i: '02', text: 'xsee chains three of them into proven breach paths.', sub: 'Internet → IAM → prod-postgres.' },
    { i: '03', text: 'Live AWS API call per hop. Receipts signed.',         sub: 'Evidence package, per finding.' },
    { i: '04', text: 'One fix breaks all three paths. Certificate issued.', sub: 'Re-simulated. Verified. Signed.' },
  ];

  return (
    <div ref={wrapRef} className="relative w-full">

      {/* ── Phase chips (above the canvas) ─────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {['See', 'Chain', 'Prove', 'Close'].map((label, idx) => {
          const isActive = idx === phase;
          const isClose  = idx === 3 && isActive;
          return (
            <React.Fragment key={label}>
              {idx > 0 && (
                <span className="mono text-[10px] text-ink4 select-none">→</span>
              )}
              <div
                className={
                  "inline-flex items-center gap-2 h-7 px-3 rounded-full border transition-all duration-300 " +
                  (isClose
                    ? "border-[rgba(16,185,129,0.55)] bg-[rgba(16,185,129,0.14)] text-[#10B981]"
                    : isActive
                      ? "border-[rgba(255,27,141,0.55)] bg-[rgba(255,27,141,0.14)] text-brand"
                      : "border-line bg-transparent text-ink3")
                }
              >
                <span className="mono text-[9.5px]" style={{ letterSpacing: '0.16em' }}>
                  0{idx + 1}
                </span>
                <span className="mono text-[10px]" style={{ letterSpacing: '0.14em' }}>
                  {label.toUpperCase()}
                </span>
              </div>
            </React.Fragment>
          );
        })}
        <div className="ml-auto hidden md:flex items-center gap-2 mono text-[10px] text-ink3 tracking-[0.14em]">
          <span className="w-1.5 h-1.5 rounded-full bg-brand"
            style={{ boxShadow: '0 0 0 4px rgba(255,27,141,0.12)' }}></span>
          <span>LIVE · acme-prod</span>
        </div>
      </div>

      {/* ── Graph canvas ───────────────────────────────────────── */}
      <div className="card relative overflow-hidden" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>

        {/* Atmospheric wash behind the target */}
        <div className="absolute pointer-events-none" style={{
          right: '-6%', top: '5%', width: '50%', height: '90%',
          background: 'radial-gradient(closest-side, rgba(255,27,141,0.18), rgba(255,27,141,0) 70%)',
          filter: 'blur(20px)',
        }}></div>
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-50" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}></div>

        <svg
          key={cycleKey}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="rl-edge" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%"   stopColor="#FF1B8D" stopOpacity="0.25"/>
              <stop offset="55%"  stopColor="#FF1B8D" stopOpacity="1"/>
              <stop offset="100%" stopColor="#FF1B8D" stopOpacity="0.5"/>
            </linearGradient>
            <linearGradient id="rl-edge-closed" x1="0" x2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.85"/>
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.55"/>
            </linearGradient>
            <radialGradient id="rl-targetGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%"  stopColor="#FF1B8D" stopOpacity="0.6"/>
              <stop offset="60%" stopColor="#FF1B8D" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="#FF1B8D" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="rl-comet" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#FFB3D5" stopOpacity="1"/>
              <stop offset="100%" stopColor="#FF1B8D" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* ── Findings (SEE phase) ─────────────────────── */}
          {findings.map((f, i) => (
            <rect key={i}
              x={f.x} y={f.y} width={f.s} height={f.s} rx="0.5"
              fill="#FF1B8D" opacity="0"
              className="pl-finding"
              style={{ animationDelay: `${f.delay}ms` }}
            />
          ))}

          {/* Findings count badge (top-left) */}
          <g className="pl-findings-badge" transform="translate(24, 24)">
            <rect x="0" y="0" width="156" height="26" rx="13"
              fill="#0C1320" stroke="#26262D" strokeWidth="1"/>
            <circle cx="14" cy="13" r="3" fill="#FF1B8D"/>
            <text x="26" y="17" fill="#A0A6B5" fontSize="10.5"
              fontFamily="'Geist Mono', monospace" letterSpacing="1.4">
              4,127 FINDINGS
            </text>
          </g>

          {/* Scanline sweep (SEE phase) */}
          <g className="pl-scanline">
            <rect x="-30" y="0" width="22" height={VB_H} fill="url(#rl-edge)" opacity="0.5"/>
            <line x1="-8" y1="0" x2="-8" y2={VB_H} stroke="#FF1B8D" strokeWidth="1" opacity="0.6"/>
          </g>

          {/* ── Paths (CHAIN + PROVE + CLOSE) ──────────── */}
          {lanes.map((lane, laneIdx) => {
            const d = pathD(laneIdx, lane.hops);
            return (
              <g key={lane.id}>
                {/* Baseline */}
                <path d={d} stroke="#26262D" strokeWidth="1" fill="none"
                  strokeLinecap="round" className="pl-path-base"/>
                {/* Animated pink draw */}
                <path d={d} stroke="url(#rl-edge)" strokeWidth="1.8" fill="none"
                  strokeLinecap="round" className="pl-path-draw"
                  style={{ animationDelay: `${2600 + laneIdx * 400}ms` }}/>
                {/* Green CLOSE overlay */}
                <path d={d} stroke="url(#rl-edge-closed)" strokeWidth="1.8" fill="none"
                  strokeLinecap="round" className="pl-path-close"
                  style={{ animationDelay: `${laneIdx * 180}ms` }}/>
                {/* Hidden ref for comet */}
                <path id={`rl-path-${laneIdx}`} d={d} fill="none" stroke="none"/>
                {/* Comet — travels during PROVE */}
                <circle r="6" fill="url(#rl-comet)" opacity="0"
                  className={`pl-comet pl-comet-${laneIdx + 1}`}>
                  <animateMotion dur="12s" repeatCount="indefinite"
                    keyPoints="0;0;1;1" keyTimes="0;0.52;0.66;1" calcMode="spline"
                    keySplines="0 0 1 1;.4 0 .2 1;0 0 1 1">
                    <mpath href={`#rl-path-${laneIdx}`}/>
                  </animateMotion>
                </circle>

                {/* Hop boxes */}
                {lane.hops.map((h, hi) => (
                  <g key={hi}
                    className="pl-hop-box"
                    style={{ animationDelay: `${2400 + laneIdx * 300 + hi * 180}ms` }}>
                    <rect
                      x={COLS[h.col]} y={LANES[laneIdx]} width={HOP_W} height={HOP_H}
                      rx="8"
                      fill="#0C1320"
                      stroke="#FF1B8D" strokeOpacity="0.45" strokeWidth="1"
                    />
                    {/* Glyph cell */}
                    <rect
                      x={COLS[h.col] + 10} y={LANES[laneIdx] + 10}
                      width="22" height="22" rx="5"
                      fill="rgba(255,27,141,0.10)"
                      stroke="rgba(255,27,141,0.30)"
                    />
                    <circle
                      cx={COLS[h.col] + 21} cy={LANES[laneIdx] + 21}
                      r="3" fill="#FF1B8D"/>
                    {/* Kind */}
                    <text
                      x={COLS[h.col] + 40} y={LANES[laneIdx] + 18}
                      fill="#FF1B8D" fontSize="9"
                      fontFamily="'Geist Mono', monospace" letterSpacing="1.4">
                      {h.kind}
                    </text>
                    {/* Id */}
                    <text
                      x={COLS[h.col] + 40} y={LANES[laneIdx] + 33}
                      fill="#F5F7FA" fontSize="11" fontWeight="500"
                      fontFamily="'Geist', sans-serif">
                      {h.id}
                    </text>
                    {/* Mono sub */}
                    <text
                      x={COLS[h.col] + 10} y={LANES[laneIdx] + HOP_H - 10}
                      fill="#6A7388" fontSize="9"
                      fontFamily="'Geist Mono', monospace">
                      {hi === 0 ? '↑ external' : hi === lane.hops.length - 1 ? '→ db' : `${h.kind === 'EC2' ? 'compute' : 'identity'}`}
                    </text>
                  </g>
                ))}

                {/* API call labels — between hops, midway, during PROVE */}
                {lane.calls.map((call, ci) => {
                  // place between hop[ci] and hop[ci+1]
                  const a = { x: cx(lane.hops[ci].col) + HOP_W / 2, y: cy(laneIdx) };
                  const b = ci < lane.hops.length - 1
                    ? { x: cx(lane.hops[ci + 1].col) - HOP_W / 2, y: cy(laneIdx) }
                    : { x: TARGET_ENTRY.x, y: TARGET_ENTRY.y };
                  const mx = (a.x + b.x) / 2;
                  const my = (a.y + b.y) / 2;
                  return (
                    <g key={ci}
                      className={`pl-api-label pl-api-label-${laneIdx + 1}`}
                      style={{ animationDelay: `${ci * 140}ms` }}
                      transform={`translate(${mx}, ${my - 10})`}>
                      <text textAnchor="middle"
                        fill="#A0A6B5" fontSize="9.5"
                        fontFamily="'Geist Mono', monospace"
                        letterSpacing="0.4">
                        {call}
                      </text>
                      <circle cx="0" cy="4" r="1.4" fill="#10B981"/>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* ── Target node — proper card with halo ──────── */}
          <g className="pl-target">
            {/* Soft pink halo behind */}
            <ellipse cx={TARGET.x + TARGET.w / 2} cy={TARGET.y + TARGET.h / 2}
              rx={TARGET.w * 0.7} ry={TARGET.h * 0.7}
              fill="url(#rl-targetGlow)" className="pl-target-halo"/>

            {/* Pulsing rings (concentric) */}
            <circle cx={TARGET.x + TARGET.w / 2} cy={TARGET.y + TARGET.h / 2}
              r="100" fill="none" stroke="#FF1B8D" strokeWidth="1"
              className="pl-target-pulse pl-target-pulse-1"
              style={{ transformOrigin: `${TARGET.x + TARGET.w / 2}px ${TARGET.y + TARGET.h / 2}px` }}/>
            <circle cx={TARGET.x + TARGET.w / 2} cy={TARGET.y + TARGET.h / 2}
              r="100" fill="none" stroke="#FF1B8D" strokeWidth="1"
              className="pl-target-pulse pl-target-pulse-2"
              style={{ transformOrigin: `${TARGET.x + TARGET.w / 2}px ${TARGET.y + TARGET.h / 2}px` }}/>

            {/* Target card */}
            <rect x={TARGET.x} y={TARGET.y} width={TARGET.w} height={TARGET.h} rx="14"
              fill="#0F1320"
              stroke="rgba(255,27,141,0.55)" strokeWidth="1.4"/>
            {/* Top accent stripe */}
            <rect x={TARGET.x} y={TARGET.y} width={TARGET.w} height="3"
              fill="#FF1B8D" rx="14"/>
            {/* Inner highlight */}
            <rect x={TARGET.x + 1} y={TARGET.y + 4} width={TARGET.w - 2} height="1"
              fill="rgba(255,255,255,0.06)"/>

            {/* DB glyph */}
            <g transform={`translate(${TARGET.x + 24} ${TARGET.y + 32})`}
              stroke="#FF1B8D" strokeWidth="1.5" fill="none"
              strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="14" cy="6" rx="12" ry="4" fill="rgba(255,27,141,0.1)"/>
              <path d="M2 6 v12 c0 2.2 5.4 4 12 4 s12 -1.8 12 -4 v-12"/>
              <path d="M2 12 c0 2.2 5.4 4 12 4 s12 -1.8 12 -4"/>
            </g>

            {/* Eyebrow */}
            <text x={TARGET.x + 70} y={TARGET.y + 32}
              fill="#FF1B8D" fontSize="10" fontFamily="'Geist Mono', monospace"
              letterSpacing="1.6" fontWeight="600">
              PROD · DATABASE
            </text>
            {/* Title */}
            <text x={TARGET.x + 70} y={TARGET.y + 50}
              fill="#F5F7FA" fontSize="18" fontWeight="600"
              fontFamily="'Geist', sans-serif"
              letterSpacing="-0.3">
              prod-postgres-01
            </text>

            {/* Divider */}
            <line x1={TARGET.x + 24} y1={TARGET.y + 84}
              x2={TARGET.x + TARGET.w - 24} y2={TARGET.y + 84}
              stroke="#1E263A" strokeWidth="1"/>

            {/* KV rows */}
            <g fontFamily="'Geist Mono', monospace" fontSize="10.5">
              <text x={TARGET.x + 24} y={TARGET.y + 108} fill="#6A7388" letterSpacing="1.2">SIZE</text>
              <text x={TARGET.x + TARGET.w - 24} y={TARGET.y + 108} textAnchor="end" fill="#F5F7FA">247 GB</text>

              <text x={TARGET.x + 24} y={TARGET.y + 130} fill="#6A7388" letterSpacing="1.2">CONTAINS</text>
              <text x={TARGET.x + TARGET.w - 24} y={TARGET.y + 130} textAnchor="end" fill="#F5F7FA">customers · billing</text>

              <text x={TARGET.x + 24} y={TARGET.y + 152} fill="#6A7388" letterSpacing="1.2">EXPOSED VIA</text>
              <text x={TARGET.x + TARGET.w - 24} y={TARGET.y + 152} textAnchor="end" fill="#FF1B8D">3 paths</text>
            </g>

            {/* Status pill */}
            <g transform={`translate(${TARGET.x + 24} ${TARGET.y + TARGET.h - 28})`}>
              <rect x="0" y="0" width="120" height="20" rx="10"
                fill="rgba(255,27,141,0.10)" stroke="rgba(255,27,141,0.4)"/>
              <circle cx="11" cy="10" r="3" fill="#FF1B8D"/>
              <text x="22" y="14" fill="#FF1B8D" fontSize="9.5"
                fontFamily="'Geist Mono', monospace" letterSpacing="1.4">
                CROWN&nbsp;JEWEL
              </text>
            </g>
          </g>
        </svg>

        {/* Bottom-left status overlay */}
        <div className="absolute bottom-3 left-4 flex items-center gap-3 mono text-[10px] text-ink3 tracking-[0.16em] pointer-events-none">
          <span>3 PATHS · 12 HOPS · EVIDENCE: AWS CLOUDTRAIL</span>
        </div>
      </div>

      {/* ── Caption row (BELOW canvas — single, never stacks) ─── */}
      <div className="mt-6 flex items-baseline gap-4 min-h-[28px]">
        <span className="mono text-[11px] text-brand shrink-0 tracking-[0.16em]"
          style={{ minWidth: '20px' }}>
          {captions[phase].i}
        </span>
        <p className="flex-1 text-[15px] lg:text-[16px] text-ink leading-[1.55]">
          <span className="transition-opacity duration-300" key={`t-${phase}`}>
            {captions[phase].text}
          </span>
          <span className="ml-2 mono text-[12px] text-ink3" key={`s-${phase}`}>
            {captions[phase].sub}
          </span>
        </p>
      </div>

      {/* ── Certificate card (fades in during CLOSE phase) ────── */}
      <div className="mt-6 transition-all duration-500"
        style={{
          opacity: phase === 3 ? 1 : 0.18,
          transform: phase === 3 ? 'translateY(0)' : 'translateY(6px)',
          filter: phase === 3 ? 'none' : 'grayscale(0.4)',
        }}>
        <div className="rounded-[12px] border bg-elevated overflow-hidden"
          style={{
            borderColor: phase === 3 ? 'rgba(16,185,129,0.45)' : '#26262D',
            boxShadow: phase === 3
              ? '0 12px 30px -12px rgba(16,185,129,0.25), 0 0 0 1px rgba(16,185,129,0.18) inset'
              : 'none',
          }}>
          {/* Top stripe */}
          <div className="h-[3px]" style={{
            background: phase === 3
              ? 'linear-gradient(90deg, #10B981 0%, #34D399 60%, #10B981 100%)'
              : '#26262D'
          }}></div>

          <div className="px-6 lg:px-8 py-5 lg:py-6 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            {/* Left: receipt headline */}
            <div className="flex-1">
              <div className="mono text-[10px] tracking-[0.18em] mb-2"
                style={{ color: phase === 3 ? '#10B981' : '#6A7388' }}>
                BREACH PREVENTION CERTIFICATE · 0042
              </div>
              <div className="text-[20px] lg:text-[22px] font-semibold text-ink leading-tight"
                style={{ letterSpacing: '-0.02em' }}>
                3 paths · closed
              </div>
              <div className="mt-1.5 mono text-[11.5px] text-ink3">
                Re-simulated · failed at hop 3 · denied
              </div>
            </div>

            {/* Middle: 3 dots representing the 3 closed paths */}
            <div className="hidden md:flex items-center gap-1.5">
              {[0, 1, 2].map(i => (
                <span key={i}
                  className="w-1.5 h-1.5 rounded-full transition-colors duration-500"
                  style={{
                    background: phase === 3 ? '#10B981' : '#3C4358',
                    boxShadow: phase === 3 ? '0 0 0 4px rgba(16,185,129,0.12)' : 'none',
                  }}></span>
              ))}
            </div>

            {/* Right: signed receipt pill */}
            <div className="md:w-[260px] rounded-[8px] border bg-[#13131A] px-3.5 py-2.5 flex items-center gap-3"
              style={{ borderColor: phase === 3 ? 'rgba(16,185,129,0.45)' : '#26262D' }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: phase === 3 ? 'rgba(16,185,129,0.16)' : 'rgba(60,67,88,0.4)',
                  border: phase === 3 ? '1px solid rgba(16,185,129,0.5)' : '1px solid #26262D',
                }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke={phase === 3 ? '#10B981' : '#6A7388'} strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
              <div className="min-w-0">
                <div className="mono text-[10px] text-ink3 tracking-[0.18em]">SIGNED · VERIFIED</div>
                <div className="mono text-[12px] text-ink leading-tight mt-0.5 truncate">
                  cert/0042-a3f2c8
                </div>
                <div className="mono text-[10px] text-ink3 leading-tight mt-0.5">
                  2026-05-15 · 17:51:31Z
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProofLoop() {
  return (
    <section id="proof-loop" className="px-6 lg:px-10 sec-pad border-t hairline relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 lg:mb-14">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-5">How xsee works · autonomous proof loop</div>
            <h2 className="h-display h-display--wide"
              style={{ fontSize: 'clamp(34px, 4.6vw, 60px)' }}>
              <span className="block">From 4,000 findings</span>
              <span className="block text-ink3">to one proven fix.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[16px] text-ink2 leading-[1.65]">
              Every path xsee finds is validated against the live AWS API, simulated
              end-to-end, and signed before it reaches your queue. Watch the loop close —
              in real time, every time.
            </p>
          </div>
        </div>

        <ProofLoopStage />

        {/* Footer rail — receipts, simulated, signed */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { k: 'EVIDENCE',    v: 'Live AWS API call · per hop',           dot: '#FF1B8D' },
            { k: 'SIMULATION',  v: 'Replayed on your real graph',           dot: '#FF1B8D' },
            { k: 'CERTIFICATE', v: 'Signed · re-simulation failed at hop 3', dot: '#10B981' },
          ].map((r) => (
            <div key={r.k} className="rounded-[10px] border hairline bg-elevated px-4 py-3 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: r.dot, boxShadow: `0 0 0 4px ${r.dot}22` }}></span>
              <div>
                <div className="mono text-[9.5px] text-ink3" style={{ letterSpacing: '0.16em' }}>{r.k}</div>
                <div className="text-[13px] text-ink leading-tight mt-0.5">{r.v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.ProofLoop = ProofLoop;
