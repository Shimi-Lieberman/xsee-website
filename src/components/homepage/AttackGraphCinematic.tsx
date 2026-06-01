"use client";

import { useMemo, type ReactNode } from "react";

const NODE_W = 168;
const NODE_H = 78;

type GraphNodeProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  icon: ReactNode;
  kind: string;
  label: string;
  id: string;
  isTarget?: boolean;
  delay: number;
};

function GraphNode({ x, y, w, h, icon, kind, label, id, isTarget, delay }: GraphNodeProps) {
  const style = { animationDelay: `${delay}ms` };
  const cx = x + w / 2;
  const cy = y + h / 2;

  return (
    <g>
      {isTarget && (
        <>
          <circle
            cx={cx}
            cy={cy}
            r="58"
            className="hg-halo hg-halo-1"
            fill="none"
            stroke="#FF1B8D"
            strokeWidth="1.5"
            opacity="0"
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
          <circle
            cx={cx}
            cy={cy}
            r="58"
            className="hg-halo hg-halo-2"
            fill="none"
            stroke="#FF1B8D"
            strokeWidth="1"
            opacity="0"
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        </>
      )}

      <g className="hg-node" style={{ ...style, transformOrigin: `${cx}px ${cy}px` }}>
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx="10"
          fill={isTarget ? "#1A0E1A" : "#0F1320"}
          stroke={isTarget ? "rgba(255,27,141,0.55)" : "#262C3E"}
          strokeWidth="1"
        />
        <rect x={x} y={y} width={w} height="1" fill="rgba(255,255,255,0.06)" rx="10" />
        <rect
          x={x + 12}
          y={y + 12}
          width="28"
          height="28"
          rx="7"
          fill={isTarget ? "rgba(255,27,141,0.16)" : "#161B2C"}
          stroke={isTarget ? "rgba(255,27,141,0.3)" : "#2A3046"}
          strokeWidth="1"
        />
        <g
          transform={`translate(${x + 19}, ${y + 19})`}
          stroke={isTarget ? "#FF4FA3" : "#A6ADC1"}
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icon}
        </g>
      </g>

      <g className="hg-label" style={style}>
        <text
          x={x + 50}
          y={y + 22}
          fill={isTarget ? "#FF4FA3" : "#6B7388"}
          fontFamily="var(--font-geist-sans), Geist, sans-serif"
          fontSize="9.5"
          fontWeight="600"
          letterSpacing="1.4"
        >
          {kind}
        </text>
        <text
          x={x + 50}
          y={y + 38}
          fill="#F6F7FB"
          fontFamily="var(--font-geist-sans), Geist, sans-serif"
          fontSize="13.5"
          fontWeight="500"
        >
          {label}
        </text>
        <text
          x={x + 12}
          y={y + h - 14}
          fill="#6B7388"
          fontFamily="var(--font-geist-mono), Geist Mono, monospace"
          fontSize="10"
          letterSpacing="0.4"
        >
          {id}
        </text>
      </g>
    </g>
  );
}

export default function AttackGraphCinematic() {
  const nodes = [
    {
      id: "0.0.0.0/0",
      x: 60,
      y: 220,
      kind: "INTERNET",
      label: "Public",
      delay: 0,
      icon: (
        <>
          <circle cx="5" cy="5" r="5" />
          <path d="M0 5h10M5 0a8 8 0 0 1 0 10M5 0a8 8 0 0 0 0 10" />
        </>
      ),
    },
    {
      id: "alb-prod-edge",
      x: 288,
      y: 220,
      kind: "ALB",
      label: "Edge LB",
      delay: 150,
      icon: (
        <>
          <rect x="0" y="2" width="10" height="6" rx="1" />
          <path d="M2 5h6" />
        </>
      ),
    },
    {
      id: "i-0a3f2c8d",
      x: 516,
      y: 160,
      kind: "EC2",
      label: "App server",
      delay: 300,
      icon: (
        <>
          <rect x="0" y="0" width="10" height="7" rx="1" />
          <path d="M3 9h4M5 7v2" />
        </>
      ),
    },
    {
      id: "svc-app-prod",
      x: 516,
      y: 290,
      kind: "IAM ROLE",
      label: "svc-app",
      delay: 450,
      icon: (
        <>
          <circle cx="5" cy="3.5" r="2.5" />
          <path d="M1.5 10c.6-2 2-3.2 3.5-3.2S8.4 8 9 10" />
        </>
      ),
    },
    {
      id: "prod-postgres",
      x: 744,
      y: 220,
      kind: "TARGET",
      label: "Prod DB",
      delay: 600,
      isTarget: true,
      icon: (
        <>
          <ellipse cx="5" cy="2" rx="4.5" ry="1.5" />
          <path d="M0.5 2v6c0 .8 2 1.5 4.5 1.5S9.5 8.8 9.5 8V2" />
          <path d="M0.5 5.2c0 .8 2 1.5 4.5 1.5S9.5 6 9.5 5.2" />
        </>
      ),
    },
  ] as const;

  const NCX = (n: (typeof nodes)[number]) => n.x + NODE_W / 2;
  const NCY = (n: (typeof nodes)[number]) => n.y + NODE_H / 2;

  const edges = [
    { from: nodes[0], to: nodes[1], call: "HTTP 443", delay: 700 },
    { from: nodes[1], to: nodes[2], call: "forward", delay: 850 },
    { from: nodes[2], to: nodes[3], call: "sts:AssumeRole", delay: 1000 },
    { from: nodes[3], to: nodes[4], call: "rds:Connect", delay: 1150 },
  ];

  const findings = useMemo(() => {
    const f: { x: number; y: number; s: number; delay: number }[] = [];
    const W = 1080;
    const H = 460;
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
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
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {[
          { n: 1, label: "See", sub: "findings populate" },
          { n: 2, label: "Chain", sub: "paths draw" },
          { n: 3, label: "Prove", sub: "evidence per hop" },
          { n: 4, label: "Close", sub: "signed" },
        ].map((p) => (
          <div
            key={p.n}
            className={`hg-phase hg-phase-${p.n} inline-flex h-7 items-center gap-2 rounded-full border px-3`}
          >
            <span className="v2-mono text-[10px] opacity-70">0{p.n}</span>
            <span className="text-[11px] font-medium">{p.label}</span>
            <span className="hidden text-[11px] opacity-60 md:inline">— {p.sub}</span>
          </div>
        ))}
        <div className="v2-eyebrow ml-auto hidden items-center gap-2 text-[10px] md:flex">
          <span className="green-dot dot-pulse" />
          <span>live · acme-prod</span>
        </div>
      </div>

      <div className="card-dark dotgrid-dark relative overflow-hidden rounded-[14px]" style={{ aspectRatio: "1200 / 520" }}>
        <div
          className="pointer-events-none absolute"
          style={{
            right: "-10%",
            bottom: "-30%",
            width: "60%",
            height: "90%",
            background: "radial-gradient(closest-side, rgba(255,27,141,0.18), rgba(255,27,141,0) 70%)",
            filter: "blur(20px)",
          }}
          aria-hidden
        />

        <svg viewBox="0 0 1200 520" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF1B8D" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#FF1B8D" stopOpacity="1" />
              <stop offset="100%" stopColor="#FF1B8D" stopOpacity="0.4" />
            </linearGradient>
            <radialGradient id="cometGrad" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#FF4FA3" stopOpacity="1" />
              <stop offset="100%" stopColor="#FF1B8D" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF1B8D" stopOpacity="0" />
              <stop offset="65%" stopColor="#FF1B8D" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FF4FA3" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {findings.map((f, i) => (
            <rect
              key={i}
              x={f.x}
              y={f.y}
              width={f.s}
              height={f.s}
              rx="0.5"
              fill="#FF1B8D"
              opacity="0"
              className="hg-finding"
              style={{ animationDelay: `${f.delay}ms` }}
            />
          ))}

          <g className="hg-scan">
            <rect x="-30" y="20" width="22" height="480" fill="url(#scanGrad)" opacity="0.5" />
            <line x1="-8" y1="20" x2="-8" y2="500" stroke="#FF1B8D" strokeWidth="1" opacity="0.6" />
          </g>

          {edges.map((e, i) => {
            const x1 = NCX(e.from);
            const y1 = NCY(e.from);
            const x2 = NCX(e.to);
            const y2 = NCY(e.to);
            const cx1 = (x1 + x2) / 2;
            const cy1 = y1;
            const cx2 = (x1 + x2) / 2;
            const cy2 = y2;
            const d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

            return (
              <g key={i}>
                <path d={d} stroke="#2A3046" strokeWidth="1" fill="none" opacity="0.6" />
                <path
                  d={d}
                  stroke="#FF1B8D"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0"
                  className="hg-edge"
                  style={{ animationDelay: `${e.delay}ms` }}
                />
                <circle
                  r="7"
                  fill="url(#cometGrad)"
                  opacity="0"
                  className="hg-comet"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <animateMotion
                    dur="2.6s"
                    repeatCount="indefinite"
                    begin={`${5 + i * 0.3}s`}
                    keyTimes="0;1"
                    keySplines="0.4 0 0.2 1"
                    calcMode="spline"
                  >
                    <mpath href={`#edge-path-${i}`} />
                  </animateMotion>
                </circle>
                <path id={`edge-path-${i}`} d={d} fill="none" stroke="none" />

                <g className="hg-label" style={{ animationDelay: `${e.to.delay}ms` }}>
                  <text
                    x={(x1 + x2) / 2}
                    y={y1 === y2 ? y1 - 14 : (y1 + y2) / 2}
                    textAnchor="middle"
                    fill="#A6ADC1"
                    fontFamily="var(--font-geist-mono), Geist Mono, monospace"
                    fontSize="10.5"
                  >
                    {e.call}
                  </text>
                </g>
              </g>
            );
          })}

          {nodes.map((n) => (
            <GraphNode key={n.id} {...n} w={NODE_W} h={NODE_H} />
          ))}

          <g className="hg-signed">
            <g transform="translate(950, 410)">
              <rect x="0" y="0" width="220" height="76" rx="10" fill="#0F1320" stroke="rgba(16,185,129,0.45)" strokeWidth="1" />
              <circle cx="22" cy="38" r="13" fill="rgba(16,185,129,0.16)" stroke="rgba(16,185,129,0.55)" strokeWidth="1" />
              <path
                d="M16 38 L21 43 L28 33"
                fill="none"
                stroke="#10B981"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="44"
                y="32"
                fill="#6B7388"
                fontFamily="var(--font-geist-sans), Geist, sans-serif"
                fontSize="9.5"
                fontWeight="600"
                letterSpacing="1.4"
              >
                SIGNED
              </text>
              <text
                x="44"
                y="49"
                fill="#F6F7FB"
                fontFamily="var(--font-geist-sans), Geist, sans-serif"
                fontSize="13"
                fontWeight="500"
              >
                Path closed · receipt #4f2a
              </text>
              <text
                x="44"
                y="64"
                fill="#6B7388"
                fontFamily="var(--font-geist-mono), Geist Mono, monospace"
                fontSize="9.5"
              >
                1.2s · 4 hops · 92% conf.
              </text>
            </g>
          </g>
        </svg>

        <div className="v2-mono absolute bottom-4 left-5 flex items-center gap-3 text-[10.5px] tracking-wider text-[var(--v2-ink3)]">
          <span>BREACH PATH · 4 HOPS</span>
          <span className="text-[var(--v2-ink4)]">·</span>
          <span>EVIDENCE: AWS CLOUDTRAIL</span>
        </div>
      </div>
    </div>
  );
}
