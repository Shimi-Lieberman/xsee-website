"use client";

import { Fragment, useMemo } from "react";

type ProofHop = { x: number; y: number; kind: string; id: string };
type ProofPath = { id: string; delay: number; hops: ProofHop[]; calls: string[] };

// SECTION — Signature animation. The xsee proof loop, cinematic.
// 12-second auto-loop, 4 phases: SEE → CHAIN → PROVE → CLOSE.
// All motion is CSS keyframes, no JS tick — GPU-friendly, premium-calm.
//
// Composition (1200 × 620 viewBox):
//   ┌───────────────────────────────┬───────────────────────┐
//   │  Findings cloud + scan-line   │  Three attack paths   │
//   │  (architectural grid)         │  converge to target   │
//   │                               │  + cert lands below   │
//   └───────────────────────────────┴───────────────────────┘

function ProofLoopStage() {
  // Architectural findings grid — small squares, not dots. Staggered fade.
  // 18 cols × 11 rows = 198 cells; we keep ~150 visible to feel dense but
  // intentional (not noise).
  const grid = useMemo(() => {
    const cols = 18, rows = 11;
    const x0 = 40, y0 = 50;
    const dx = 22, dy = 26;
    // Deterministic LCG so positions are stable
    let seed = 1337;
    const r = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 0x100000000; };
    const cells = [];
    for (let c = 0; c < cols; c++) {
      for (let row = 0; row < rows; row++) {
        if (r() < 0.18) continue; // sparseness
        const x = x0 + c * dx + (r() - 0.5) * 4;
        const y = y0 + row * dy + (r() - 0.5) * 4;
        // Stagger delay across the grid by column (left-to-right reveal)
        const colDelay = (c / cols) * 800;
        cells.push({ x, y, c, row, delay: colDelay + r() * 180 });
      }
    }
    return cells;
  }, []);

  // Three attack paths — emerge from cloud's right edge, fan through hops,
  // converge into the target node at the far right.
  // viewBox: 1200 × 620
  // Hops use the same boxed visual vocabulary as the rest of the site.
  const hopW = 96, hopH = 38;
  const targetX = 1080, targetY = 310;

  const paths: ProofPath[] = [
    {
      id: 'p1',
      delay: 2600,
      hops: [
        { x: 440, y: 110, kind: 'INTERNET', id: '0.0.0.0/0'   },
        { x: 620, y: 140, kind: 'ALB',      id: 'alb-prod'    },
        { x: 800, y: 200, kind: 'EC2',      id: 'i-0a3f2c8d'  },
        { x: 950, y: 260, kind: 'IAM',      id: 'svc-app'     },
      ],
      // API call labels appearing during PROVE phase
      calls: ['sts:AssumeRole', 'ec2:Describe*', 'iam:GetRole*'],
    },
    {
      id: 'p2',
      delay: 3000,
      hops: [
        { x: 440, y: 290, kind: 'INTERNET', id: '0.0.0.0/0'   },
        { x: 620, y: 290, kind: 'ALB',      id: 'alb-edge'    },
        { x: 800, y: 310, kind: 'EC2',      id: 'i-7b1e44a'   },
        { x: 950, y: 310, kind: 'IAM',      id: 'ci-deploy'   },
      ],
      calls: ['sts:AssumeRole', 'lambda:Invoke', 'iam:Pass*'],
    },
    {
      id: 'p3',
      delay: 3400,
      hops: [
        { x: 440, y: 470, kind: 'INTERNET', id: '0.0.0.0/0'   },
        { x: 620, y: 440, kind: 'EC2',      id: 'i-9c2d11e'   },
        { x: 800, y: 400, kind: 'IAM',      id: 'cross-acct'  },
        { x: 950, y: 350, kind: 'IAM',      id: 'data-read'   },
      ],
      calls: ['sts:AssumeRole', 'rds:Describe*', 'iam:Get*'],
    },
  ];

  // Build a smooth path: cloud edge → through hops → target.
  // Each hop becomes a waypoint; we draw cubic curves between waypoints
  // so the line feels designed, not stick-figure.
  const pathD = (hops: ProofHop[]) => {
    const start = { x: 380, y: hops[0].y };  // entry from cloud
    const pts = [start, ...hops.map(h => ({ x: h.x + hopW/2, y: h.y + hopH/2 })), { x: targetX - 18, y: targetY }];
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i];
      const mx = (a.x + b.x) / 2;
      d += ` C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
    }
    return d;
  };

  return (
    <div className="relative w-full" style={{ aspectRatio: '1200 / 620' }}>
      <svg
        viewBox="0 0 1200 620"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="plPathGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#FF1B8D" stopOpacity="0.4"/>
            <stop offset="55%"  stopColor="#FF1B8D" stopOpacity="0.95"/>
            <stop offset="100%" stopColor="#FF1B8D" stopOpacity="0.4"/>
          </linearGradient>
          <linearGradient id="plPathClosed" x1="0" x2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.75"/>
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.55"/>
          </linearGradient>
          <linearGradient id="plScanGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor="#FF1B8D" stopOpacity="0"/>
            <stop offset="50%"  stopColor="#FF1B8D" stopOpacity="0.65"/>
            <stop offset="100%" stopColor="#FF1B8D" stopOpacity="0"/>
          </linearGradient>
          {/* Cloud mask — fade right edge so grid doesn't crash into paths */}
          <linearGradient id="plCloudFade" x1="0" x2="1">
            <stop offset="0%"  stopColor="white" stopOpacity="1"/>
            <stop offset="70%" stopColor="white" stopOpacity="1"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <mask id="plCloudMask">
            <rect x="0" y="0" width="440" height="620" fill="url(#plCloudFade)"/>
          </mask>
          {/* Subtle dot pattern for cert backing */}
          <pattern id="plCertGrid" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="#1E263A"/>
          </pattern>
          {/* Soft glow for target */}
          <radialGradient id="plTargetGlow">
            <stop offset="0%" stopColor="#FF1B8D" stopOpacity="0.4"/>
            <stop offset="60%" stopColor="#FF1B8D" stopOpacity="0.08"/>
            <stop offset="100%" stopColor="#FF1B8D" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* ─── Phase 1: Findings cloud ─── */}
        <g mask="url(#plCloudMask)">
          {grid.map((cell, i) => (
            <rect
              key={i}
              x={cell.x}
              y={cell.y}
              width="3"
              height="3"
              fill="#FF1B8D"
              rx="0.5"
              className="pl-finding"
              style={{ animationDelay: `${cell.delay}ms` }}
            />
          ))}

          {/* Scan-line that sweeps across the cloud during phase 1 */}
          <rect
            x="0" y="40" width="2" height="540"
            fill="url(#plScanGrad)"
            className="pl-scanline"
          />

          {/* Findings count badge */}
          <g className="pl-findings-badge" transform="translate(60, 30)">
            <rect x="0" y="0" width="138" height="22" rx="11" fill="#0C1320" stroke="#26262D" strokeWidth="1"/>
            <circle cx="14" cy="11" r="3" fill="#FF1B8D"/>
            <text x="26" y="15" fill="#A0A6B5" fontSize="10" fontFamily="'Geist Mono', monospace" letterSpacing="1.4">4,000 FINDINGS</text>
          </g>
        </g>

        {/* Cloud→paths divider bg-[var(--hp-elevated)] border border-[var(--hp-line)] */}
        <line
          x1="430" y1="60" x2="430" y2="560"
          stroke="#1E263A" strokeWidth="1" strokeDasharray="2 4"
          className="pl-divider"
        />

        {/* ─── Phases 2-3: Three attack paths ─── */}
        {paths.map((p, idx) => (
          <g key={p.id}>
            {/* Faint baseline path */}
            <path
              d={pathD(p.hops)}
              stroke="#26262D"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              className="pl-path-base"
            />
            {/* Animated pink stroke draws across */}
            <path
              d={pathD(p.hops)}
              stroke="url(#plPathGrad)"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              className="pl-path-draw"
              style={{ animationDelay: `${p.delay}ms` }}
            />
            {/* Green overlay for CLOSE phase */}
            <path
              d={pathD(p.hops)}
              stroke="url(#plPathClosed)"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              className="pl-path-close"
              style={{ animationDelay: `${idx * 180}ms` }}
            />
            {/* Comet pulse traveling along path during PROVE */}
            <circle
              r="3.5"
              fill="#FF1B8D"
              className={"pl-comet pl-comet-" + (idx + 1)}
            >
              <animateMotion
                dur="12s"
                repeatCount="indefinite"
                keyPoints={
                  // Wait until phase 3 (~52% of cycle), travel across path,
                  // freeze at end.
                  '0;0;1;1'
                }
                keyTimes="0;0.52;0.66;1"
                rotate="auto"
              >
                <mpath href={"#plPathFor-" + p.id}/>
              </animateMotion>
            </circle>
            {/* Hidden path for mpath reference */}
            <path id={"plPathFor-" + p.id} d={pathD(p.hops)} fill="none" stroke="none"/>

            {/* Hop boxes — match site visual vocabulary */}
            {p.hops.map((h, hi) => (
              <g
                key={hi}
                className="pl-hop-box"
                style={{ animationDelay: `${p.delay + hi * 200}ms` }}
              >
                <rect
                  x={h.x} y={h.y}
                  width={hopW} height={hopH}
                  rx="5"
                  fill="#0C1320"
                  stroke="#FF1B8D"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                />
                <text
                  x={h.x + 8}
                  y={h.y + 14}
                  fill="#FF1B8D"
                  fontSize="8.5"
                  fontFamily="'Geist Mono', monospace"
                  letterSpacing="1.4"
                >
                  {h.kind}
                </text>
                <text
                  x={h.x + 8}
                  y={h.y + 28}
                  fill="#F5F7FA"
                  fontSize="10"
                  fontFamily="'Geist Mono', monospace"
                >
                  {h.id}
                </text>
              </g>
            ))}

            {/* API call labels along path — appear during PROVE phase */}
            {p.calls.map((call, ci) => {
              // position labels at midpoints between hops
              const a = ci === 0 ? { x: 400, y: p.hops[0].y - 6 } : { x: p.hops[ci].x, y: p.hops[ci].y };
              const b = ci < p.hops.length - 1 ? p.hops[ci + 1] : { x: targetX - 10, y: targetY };
              const mx = (a.x + b.x) / 2;
              const my = (a.y + b.y) / 2 - 12;
              return (
                <g
                  key={ci}
                  className={"pl-api-label pl-api-label-" + (idx + 1)}
                  style={{ animationDelay: `${ci * 140}ms` }}
                  transform={`translate(${mx}, ${my})`}
                >
                  <text
                    textAnchor="middle"
                    fill="#A0A6B5"
                    fontSize="8.5"
                    fontFamily="'Geist Mono', monospace"
                    letterSpacing="0.6"
                  >
                    {call}
                  </text>
                  <circle cx="0" cy="4" r="1.5" fill="#10B981"/>
                </g>
              );
            })}
          </g>
        ))}

        {/* ─── Target node — single convergence point ─── */}
        <g className="pl-target">
          {/* Glow halo */}
          <circle cx={targetX} cy={targetY} r="80" fill="url(#plTargetGlow)" className="pl-target-halo"/>
          {/* Target ring pulses */}
          <circle cx={targetX} cy={targetY} r="22" fill="none" stroke="#FF1B8D" strokeWidth="1" className="pl-target-pulse pl-target-pulse-1"/>
          <circle cx={targetX} cy={targetY} r="22" fill="none" stroke="#FF1B8D" strokeWidth="1" className="pl-target-pulse pl-target-pulse-2"/>
          {/* Core */}
          <circle cx={targetX} cy={targetY} r="20" fill="#0C1320" stroke="#FF1B8D" strokeWidth="1.4"/>
          <circle cx={targetX} cy={targetY} r="6" fill="#FF1B8D"/>
          {/* Label */}
          <text
            x={targetX} y={targetY + 50}
            textAnchor="middle"
            fill="#A0A6B5"
            fontSize="9"
            fontFamily="'Geist Mono', monospace"
            letterSpacing="1.6"
          >
            PROD-POSTGRES
          </text>
          <text
            x={targetX} y={targetY + 65}
            textAnchor="middle"
            fill="#6A7388"
            fontSize="9"
            fontFamily="'Geist Mono', monospace"
          >
            prod-postgres-01
          </text>
        </g>

        {/* ─── Phase 4: Certificate — lands below the paths, doesn't overlap ─── */}
        <g transform="translate(600, 555)" className="pl-cert-wrap">
          <g className="pl-cert">
            {/* Backing card */}
            <rect x="-260" y="-44" width="520" height="88" rx="10" fill="#0C1320" stroke="#FF1B8D" strokeOpacity="0.55" strokeWidth="1.4"/>
            {/* Subtle dot pattern inside */}
            <rect x="-258" y="-42" width="516" height="84" rx="8" fill="url(#plCertGrid)" opacity="0.35"/>
            {/* Corner brackets */}
            <g stroke="#FF1B8D" strokeWidth="1.8" fill="none">
              <path d="M-256 -36 L-256 -42 L-250 -42"/>
              <path d="M256 -36 L256 -42 L250 -42"/>
              <path d="M-256 36 L-256 42 L-250 42"/>
              <path d="M256 36 L256 42 L250 42"/>
            </g>
            {/* Eyebrow */}
            <text x="-244" y="-22" fill="#FF1B8D" fontSize="9" fontFamily="'Geist Mono', monospace" letterSpacing="2.2">
              BREACH PREVENTION CERTIFICATE · 0042
            </text>
            {/* Title */}
            <text x="-244" y="2" fill="#F5F7FA" fontSize="17" fontFamily="'Geist', sans-serif" fontWeight="600" letterSpacing="-0.3">
              3 paths · closed
            </text>
            {/* Sub */}
            <text x="-244" y="20" fill="#A0A6B5" fontSize="10" fontFamily="'Geist Mono', monospace" letterSpacing="0.6">
              re-simulated · failed at hop 3 · denied
            </text>
            {/* Right column — signed pill */}
            <g transform="translate(244, 0)">
              <text x="0" y="-22" textAnchor="end" fill="#6A7388" fontSize="9" fontFamily="'Geist Mono', monospace" letterSpacing="2.2">
                SIGNED · VERIFIED
              </text>
              <g transform="translate(-150, -10)">
                <rect x="0" y="0" width="150" height="38" rx="5" fill="#13131A" stroke="#10B981" strokeOpacity="0.45" strokeWidth="1"/>
                <circle cx="14" cy="19" r="4" fill="#10B981"/>
                <path d="M11.5 19 L13 20.5 L16.5 17" stroke="#0C1320" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <text x="26" y="17" fill="#F5F7FA" fontSize="10" fontFamily="'Geist Mono', monospace">cert/0042-a3f2c8</text>
                <text x="26" y="30" fill="#A0A6B5" fontSize="9" fontFamily="'Geist Mono', monospace">2026-05-15 · 17:51:31Z</text>
              </g>
            </g>
            {/* Subtle bottom divider with three dots representing the paths */}
            <g transform="translate(-244, 32)">
              <line x1="0" y1="0" x2="488" y2="0" stroke="#1E263A" strokeWidth="1"/>
              <circle cx="100" cy="0" r="2" fill="#10B981"/>
              <circle cx="244" cy="0" r="2" fill="#10B981"/>
              <circle cx="388" cy="0" r="2" fill="#10B981"/>
            </g>
          </g>
        </g>
      </svg>

      {/* Phase chips along the top */}
      <div className="absolute inset-x-0 top-0 px-6 lg:px-8 pt-5 pointer-events-none">
        <div className="flex items-center gap-2">
          {[
            { i: '01', label: 'See' },
            { i: '02', label: 'Chain' },
            { i: '03', label: 'Prove' },
            { i: '04', label: 'Close' },
          ].map((p, idx) => (
            <Fragment key={p.i}>
              {idx > 0 && <span className="text-[var(--hp-ink4)] hp-mono text-[10px]">→</span>}
              <div
                className={"pl-phase pl-phase-" + (idx + 1) + " inline-flex items-center gap-2 px-2.5 py-1 rounded-full border"}
              >
                <span className="hp-mono text-[9.5px]" style={{ letterSpacing: '0.16em' }}>{p.i}</span>
                <span className="hp-mono text-[10px]" style={{ letterSpacing: '0.14em' }}>{p.label.toUpperCase()}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Phase caption — absolute-positioned, sharp swap */}
      <div className="absolute inset-x-0 bottom-0 px-6 lg:px-8 pb-5 pointer-events-none">
        <div className="relative min-h-[48px]">
          {[
            { i: '01', text: '4,000 findings across your AWS account.', sub: 'Cloud signals, untriaged.' },
            { i: '02', text: 'xsee chains three of them into proven breach paths.', sub: 'Internet → IAM → prod-postgres.' },
            { i: '03', text: 'Live AWS API call per hop. Receipts signed.', sub: 'Evidence package, per finding.' },
            { i: '04', text: 'One fix breaks all three paths. Certificate issued.', sub: 'Re-simulated, verified, signed.' },
          ].map((p, idx) => (
            <div
              key={p.i}
              className={"pl-caption pl-caption-" + (idx + 1) + " absolute inset-0 flex items-baseline gap-3"}
            >
              <span className="hp-mono text-[10.5px] text-[var(--hp-brand)] shrink-0 mt-0.5" style={{ letterSpacing: '0.16em' }}>{p.i}</span>
              <span className="flex-1">
                <span className="text-[15px] text-[var(--hp-ink)] leading-[1.45]" style={{ letterSpacing: '-0.005em' }}>{p.text}</span>
                <span className="text-[12px] text-[var(--hp-ink3)] ml-2 hp-mono" style={{ letterSpacing: "0.04em" }}>
                  {p.sub}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProofLoopSection() {
  return (
    <section id="proof-loop" className="hp-section relative overflow-hidden" aria-labelledby="proof-loop-title">
      <div className="hp-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 lg:mb-14">
          <div className="lg:col-span-7">
            <p className="hp-eyebrow mb-5">How XSEE works · autonomous proof loop</p>
            <h2 id="proof-loop-title"
              className="hp-h-display hp-h-display--wide"
              style={{ fontSize: 'clamp(34px, 4.6vw, 60px)' }}
            >
              <span className="block">From 4,000 findings</span>
              <span className="block text-[var(--hp-ink3)]">to one proven fix.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[16px] text-[var(--hp-ink2)] leading-[1.65]">
              Every path XSEE finds is validated against the live AWS API, simulated
              end-to-end, and signed before it reaches your queue. Watch the loop close
              — in real time, every time.
            </p>
          </div>
        </div>

        <div className="hp-card relative overflow-hidden">
          <ProofLoopStage />
        </div>

        {/* Footer rail — receipts, simulated, signed */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { k: 'EVIDENCE',    v: 'Live AWS API call · per hop',           dot: '#FF1B8D' },
            { k: 'SIMULATION',  v: 'Replayed on your real graph',           dot: '#FF1B8D' },
            { k: 'CERTIFICATE', v: 'Signed · re-simulation failed at hop 3', dot: '#10B981' },
          ].map((r) => (
            <div key={r.k} className="rounded-[10px] border border-[var(--hp-line)] bg-[var(--hp-elevated)] px-4 py-3 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: r.dot, boxShadow: `0 0 0 4px ${r.dot}22` }}></span>
              <div>
                <div className="hp-mono text-[9.5px] text-[var(--hp-ink3)]" style={{ letterSpacing: '0.16em' }}>{r.k}</div>
                <div className="text-[13px] text-[var(--hp-ink)] leading-tight mt-0.5">{r.v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

