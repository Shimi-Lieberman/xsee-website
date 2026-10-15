import { memo } from "react";
import { EDGES, NODES, type EdgeTone, type Layout, type Scene } from "./scene";
import "./graph.css";

const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n]));
const AMBIENT_EDGES = ["i-2", "i-5", "i-8", "e-forward", "i-11", "e-web-role"];
const EMPHASIS: EdgeTone[] = ["lit", "danger", "observed", "simulated", "drift", "blocked"];
const FLOWING: EdgeTone[] = ["lit", "danger", "observed", "simulated", "drift"];

type Zone = { label: string; x: number; y: number; w: number; h: number };

const ZONES: Record<Layout, Zone[]> = {
  wide: [
    { label: "Public edge", x: 12, y: 16, w: 268, h: 588 },
    { label: "Workload", x: 288, y: 16, w: 152, h: 588 },
    { label: "Identity", x: 448, y: 16, w: 322, h: 588 },
    { label: "Crown jewels", x: 778, y: 16, w: 210, h: 588 },
  ],
  tall: [
    { label: "Public edge", x: 16, y: 8, w: 568, h: 216 },
    { label: "Workload", x: 16, y: 231, w: 568, h: 119 },
    { label: "Identity", x: 16, y: 357, w: 568, h: 263 },
    { label: "Crown jewels", x: 16, y: 627, w: 568, h: 150 },
  ],
};

type Pt = [number, number];

function curve(a: Pt, b: Pt) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const horizontal = Math.abs(dx) >= Math.abs(dy);
  const c1: Pt = horizontal ? [a[0] + dx * 0.5, a[1]] : [a[0], a[1] + dy * 0.5];
  const c2: Pt = horizontal ? [b[0] - dx * 0.5, b[1]] : [b[0], b[1] - dy * 0.5];
  const at = (t: number): Pt => {
    const u = 1 - t;
    return [
      u * u * u * a[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * b[0],
      u * u * u * a[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * b[1],
    ];
  };
  const angle = (t: number) => {
    const u = 1 - t;
    const tx = 3 * u * u * (c1[0] - a[0]) + 6 * u * t * (c2[0] - c1[0]) + 3 * t * t * (b[0] - c2[0]);
    const ty = 3 * u * u * (c1[1] - a[1]) + 6 * u * t * (c2[1] - c1[1]) + 3 * t * t * (b[1] - c2[1]);
    return (Math.atan2(ty, tx) * 180) / Math.PI;
  };
  return { d: `M ${a[0]} ${a[1]} C ${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${b[0]} ${b[1]}`, at, angle, length: Math.hypot(dx, dy) };
}

function brackets(h: number, len: number) {
  return [
    `M ${-h} ${-h + len} V ${-h} H ${-h + len}`,
    `M ${h - len} ${-h} H ${h} V ${-h + len}`,
    `M ${h} ${h - len} V ${h} H ${h - len}`,
    `M ${-h + len} ${h} H ${-h} V ${h - len}`,
  ].join(" ");
}

type Props = { scene: Scene; layout: Layout; reducedMotion: boolean; className?: string };

function StoryGraph({ scene, layout, reducedMotion, className }: Props) {
  const wide = layout === "wide";
  const r = wide ? 17 : 20;
  const labelSize = wide ? 12 : 15;
  const zoneSize = wide ? 10 : 12;
  const animate = !reducedMotion;
  const ids = { dots: `cs-dots-${layout}`, glow: `cs-glow-${layout}`, fill: `cs-fill-${layout}`, soft: `cs-soft-${layout}` };

  const pt = (id: string) => nodeById[id].pos[layout] as Pt;
  const assume = EDGES.find((e) => e.id === "e-assume")!;
  const [ax, ay] = pt(assume.from);
  const [bx, by] = pt(assume.to);
  const mid = [(ax + bx) / 2, (ay + by) / 2];

  const sealed = scene.edges["e-assume"].tone === "blocked";
  const breached = !sealed && scene.nodes.secret.tone === "impact";
  const reassessing = !sealed && !breached && scene.edges["e-assume"].tone === "drift";
  const moat = sealed ? "sealed" : breached ? "breached" : reassessing ? "reassessing" : "idle";
  const moatText = { sealed: "Moat sealed", breached: "Moat breached", reassessing: "Reassessing", idle: "Protected" }[moat];

  return (
    <svg
      className={`cs-graph ${className ?? ""}`}
      viewBox={`${scene.camera.x} ${scene.camera.y} ${scene.camera.w} ${scene.camera.h}`}
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      aria-hidden
      data-layout={layout}
    >
      <defs>
        <pattern id={ids.dots} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="0.9" className="cs-dot" />
        </pattern>
        <linearGradient id={ids.fill} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="cs-fill-top" />
          <stop offset="1" className="cs-fill-bottom" />
        </linearGradient>
        <filter id={ids.glow} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation={wide ? 4 : 5} />
        </filter>
        <filter id={ids.soft} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x={-400} y={-400} width={2000} height={2000} fill={`url(#${ids.dots})`} />

      <g className="cs-zones">
        {ZONES[layout].map((z) => (
          <g key={z.label} className={`cs-zone ${z.label === "Crown jewels" ? "is-core" : ""}`}>
            <rect x={z.x} y={z.y} width={z.w} height={z.h} rx={12} />
            <text x={z.x + 12} y={z.y + zoneSize + 10} style={{ fontSize: zoneSize }}>
              {z.label.toUpperCase()}
            </text>
          </g>
        ))}
      </g>

      <g>
        {EDGES.map((edge) => {
          const s = scene.edges[edge.id];
          const c = curve(pt(edge.from), pt(edge.to));
          const drawing = s.draw < 1;
          const emphasized = EMPHASIS.includes(s.tone);
          const showArrow = edge.role !== "infra" && !drawing && s.tone !== "idle" && s.tone !== "faded";
          const arrowT = Math.max(0.5, 1 - (r + 12) / c.length);
          const [arx, ary] = c.at(arrowT);
          const a = wide ? 5 : 6;
          return (
            <g key={edge.id} className={`cs-edge is-${s.tone} role-${edge.role}`}>
              {emphasized && !drawing ? <path d={c.d} className="cs-edge-glow" filter={`url(#${ids.glow})`} /> : null}
              <path
                d={c.d}
                pathLength={1}
                className="cs-edge-line"
                style={drawing ? { strokeDasharray: "1 1", strokeDashoffset: 1 - s.draw } : undefined}
              />
              {animate && !drawing && FLOWING.includes(s.tone) ? (
                <path d={c.d} pathLength={1} className="cs-edge-flow">
                  <animate attributeName="stroke-dashoffset" from="0" to="-0.08" dur={s.tone === "danger" ? "0.9s" : "1.6s"} repeatCount="indefinite" />
                </path>
              ) : null}
              {showArrow ? (
                <path
                  d={`M ${-a} ${-a * 0.8} L ${a * 0.4} 0 L ${-a} ${a * 0.8}`}
                  className="cs-edge-arrow"
                  transform={`translate(${arx} ${ary}) rotate(${c.angle(arrowT)})`}
                />
              ) : null}
              {animate && s.pulse ? (
                <circle r={wide ? 3.5 : 4.5} className="cs-edge-pulse" filter={`url(#${ids.soft})`}>
                  <animateMotion dur={s.tone === "lit" ? "1.1s" : "2.2s"} repeatCount="indefinite" path={c.d} />
                </circle>
              ) : null}
            </g>
          );
        })}
      </g>

      {animate && scene.ambient ? (
        <g className="cs-ambient">
          {AMBIENT_EDGES.map((id, i) => {
            const edge = EDGES.find((e) => e.id === id)!;
            const forward = curve(pt(edge.from), pt(edge.to)).d;
            const backward = curve(pt(edge.to), pt(edge.from)).d;
            return (
              <circle key={id} r={2.4} className="cs-signal" filter={`url(#${ids.soft})`}>
                <animateMotion dur={`${2.6 + (i % 3) * 0.7}s`} begin={`${i * 0.45}s`} repeatCount="indefinite" path={i % 2 ? backward : forward} />
              </circle>
            );
          })}
        </g>
      ) : null}

      {scene.fixWave > 0 && scene.fixWave < 1 ? (
        <g className="cs-fix-wave">
          <circle cx={mid[0]} cy={mid[1]} r={12 + scene.fixWave * 110} style={{ opacity: 1 - scene.fixWave }} />
          <circle cx={mid[0]} cy={mid[1]} r={6 + scene.fixWave * 60} style={{ opacity: (1 - scene.fixWave) * 0.6 }} />
        </g>
      ) : null}

      <g className={`cs-moat is-${moat}`} transform={`translate(${pt("secret")[0]} ${pt("secret")[1]})`}>
        <circle r={r + 40} className="cs-moat-field" />
        <g className="cs-moat-spin is-reverse">
          <circle r={r + 40} className="cs-moat-outer" />
        </g>
        <g className="cs-moat-spin">
          <circle r={r + 27} className="cs-moat-ticks" />
        </g>
        <circle r={r + 15} className="cs-moat-inner" />
        <g transform={`translate(0 ${-(r + 40) - 8})`} className="cs-moat-tag">
          <rect x={-moatText.length * zoneSize * 0.36 - 10} y={-zoneSize} width={moatText.length * zoneSize * 0.72 + 20} height={zoneSize + 8} rx={(zoneSize + 8) / 2} />
          <text y={zoneSize * 0.05} textAnchor="middle" style={{ fontSize: zoneSize }}>
            {moatText.toUpperCase()}
          </text>
        </g>
      </g>

      <g>
        {EDGES.map((edge) => {
          const s = scene.edges[edge.id];
          if (!s.label || !edge.label) return null;
          const [x1, y1] = pt(edge.from);
          const [x2, y2] = pt(edge.to);
          const text = s.tone === "blocked" ? "denied" : edge.label;
          const w = text.length * (labelSize * 0.6) + 16;
          const h = labelSize + 10;
          return (
            <g key={edge.id} className={`cs-edge-label is-${s.tone}`} transform={`translate(${(x1 + x2) / 2} ${(y1 + y2) / 2})`}>
              <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={4} />
              <text y={labelSize * 0.34} textAnchor="middle" style={{ fontSize: labelSize - 1 }}>
                {text}
              </text>
            </g>
          );
        })}
      </g>

      <g>
        {NODES.map((node) => {
          const s = scene.nodes[node.id];
          const [x, y] = node.pos[layout];
          const isInfra = node.role === "infra";
          const h = isInfra ? r * 0.78 : r;
          const below = !(layout === "tall" && node.role === "path");
          const glowing = s.tone === "lit" || s.tone === "impact" || s.tone === "fixed" || s.tone === "drift";
          return (
            <g key={node.id} className={`cs-node is-${s.tone} role-${node.role}`} transform={`translate(${x} ${y})`}>
              {glowing ? <rect x={-h} y={-h} width={h * 2} height={h * 2} rx={h * 0.32} className="cs-node-glow" filter={`url(#${ids.glow})`} /> : null}
              {s.tone === "impact" || s.tone === "drift" ? <rect x={-h - 6} y={-h - 6} width={h * 2 + 12} height={h * 2 + 12} rx={h * 0.45} className="cs-node-halo" /> : null}
              <rect
                x={-h}
                y={-h}
                width={h * 2}
                height={h * 2}
                rx={h * 0.32}
                className="cs-node-body"
                fill={`url(#${ids.fill})`}
                strokeDasharray={node.role === "assumption" ? "4 3" : undefined}
              />
              <rect x={-h + 1.5} y={-h + 1.5} width={h * 2 - 3} height={h * 2 - 3} rx={h * 0.26} className="cs-node-inner" />
              {!isInfra && glowing ? <path d={brackets(h + 7, wide ? 6 : 7)} className="cs-node-brackets" /> : null}
              <text className="cs-node-kind" y={h * 0.2} textAnchor="middle" style={{ fontSize: h * 0.56 }}>
                {node.kind}
              </text>
              {s.label ? (
                <text
                  className="cs-node-label"
                  x={below ? 0 : h + 14}
                  y={below ? h + labelSize + 6 : labelSize * 0.35}
                  textAnchor={below ? "middle" : "start"}
                  style={{ fontSize: isInfra ? labelSize - 1 : labelSize }}
                >
                  {node.label}
                </text>
              ) : null}
              {s.finding ? (
                <g className="cs-finding" transform={`translate(0 ${-(h + labelSize + 6)})`}>
                  <rect x={-(s.finding.length * labelSize * 0.31 + 12)} y={-(labelSize + 8) / 2} width={s.finding.length * labelSize * 0.62 + 24} height={labelSize + 8} rx={4} />
                  <circle cx={-(s.finding.length * labelSize * 0.31 + 4)} cy={0} r={2.5} className="cs-finding-dot" />
                  <text x={4} y={labelSize * 0.34} textAnchor="middle" style={{ fontSize: labelSize - 2 }}>
                    {s.finding}
                  </text>
                </g>
              ) : null}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export default memo(StoryGraph);
