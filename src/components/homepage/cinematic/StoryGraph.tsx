import { memo } from "react";
import { EDGES, NODES, WORLD, type Layout, type Scene } from "./scene";

const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n]));
const AMBIENT_EDGES = ["i-2", "i-5", "i-8", "e-forward", "i-11", "e-web-role"];

type Props = { scene: Scene; layout: Layout; reducedMotion: boolean; className?: string };

function StoryGraph({ scene, layout, reducedMotion, className }: Props) {
  const world = WORLD[layout];
  const { camera } = scene;
  const r = layout === "wide" ? 17 : 19;
  const labelSize = layout === "wide" ? 12 : 15;
  const animate = !reducedMotion;

  const pt = (id: string) => nodeById[id].pos[layout];
  const assume = EDGES.find((e) => e.id === "e-assume")!;
  const [ax, ay] = pt(assume.from);
  const [bx, by] = pt(assume.to);
  const mid = [(ax + bx) / 2, (ay + by) / 2];

  return (
    <svg
      className={`cs-graph ${className ?? ""}`}
      viewBox={`${camera.x} ${camera.y} ${camera.w} ${camera.h}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      data-layout={layout}
    >
      <defs>
        <pattern id={`cs-grid-${layout}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" className="cs-grid-line" />
        </pattern>
      </defs>
      <rect x={-200} y={-200} width={world.w + 400} height={world.h + 400} fill={`url(#cs-grid-${layout})`} />

      <g>
        {EDGES.map((edge) => {
          const s = scene.edges[edge.id];
          const [x1, y1] = pt(edge.from);
          const [x2, y2] = pt(edge.to);
          const d = `M ${x1} ${y1} L ${x2} ${y2}`;
          const drawing = s.draw < 1;
          return (
            <g key={edge.id} className={`cs-edge is-${s.tone} role-${edge.role}`}>
              <path
                d={d}
                pathLength={1}
                className="cs-edge-line"
                style={drawing ? { strokeDasharray: "1 1", strokeDashoffset: 1 - s.draw } : undefined}
              />
              {animate && s.pulse ? (
                <circle r={layout === "wide" ? 3.5 : 4.5} className="cs-edge-pulse">
                  <animateMotion dur={s.tone === "lit" ? "1.1s" : "2.2s"} repeatCount="indefinite" path={d} />
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
            const [x1, y1] = pt(edge.from);
            const [x2, y2] = pt(edge.to);
            return (
              <circle key={id} r={2.5} className="cs-signal">
                <animateMotion
                  dur={`${2.6 + (i % 3) * 0.7}s`}
                  begin={`${i * 0.45}s`}
                  repeatCount="indefinite"
                  path={i % 2 ? `M ${x2} ${y2} L ${x1} ${y1}` : `M ${x1} ${y1} L ${x2} ${y2}`}
                />
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

      <g>
        {EDGES.map((edge) => {
          const s = scene.edges[edge.id];
          if (!s.label || !edge.label) return null;
          const [x1, y1] = pt(edge.from);
          const [x2, y2] = pt(edge.to);
          const text = s.tone === "blocked" ? "denied" : edge.label;
          const w = text.length * (labelSize * 0.6) + 14;
          const h = labelSize + 9;
          const cx = (x1 + x2) / 2;
          const cy = (y1 + y2) / 2;
          return (
            <g key={edge.id} className={`cs-edge-label is-${s.tone}`} transform={`translate(${cx} ${cy})`}>
              <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} />
              <text y={labelSize * 0.36} textAnchor="middle" style={{ fontSize: labelSize - 1 }}>
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
          const isAssumption = node.role === "assumption";
          const below = layout === "tall" && node.role === "path" ? false : true;
          return (
            <g key={node.id} className={`cs-node is-${s.tone} role-${node.role}`} transform={`translate(${x} ${y})`}>
              {s.tone === "impact" || s.tone === "drift" ? <circle r={r + 9} className="cs-node-halo" /> : null}
              <circle r={r} className="cs-node-body" strokeDasharray={isAssumption ? "4 3" : undefined} />
              <text className="cs-node-kind" y={4} textAnchor="middle">
                {node.kind}
              </text>
              {s.label ? (
                <text
                  className="cs-node-label"
                  x={below ? 0 : r + 10}
                  y={below ? r + labelSize + 4 : labelSize * 0.35}
                  textAnchor={below ? "middle" : "start"}
                  style={{ fontSize: labelSize }}
                >
                  {node.label}
                </text>
              ) : null}
              {s.finding ? (
                <g className="cs-finding" transform={`translate(0 ${-(r + labelSize + 4)})`}>
                  <rect x={-(s.finding.length * labelSize * 0.31 + 10)} y={-(labelSize + 6) / 2} width={s.finding.length * labelSize * 0.62 + 20} height={labelSize + 6} rx={4} />
                  <text y={labelSize * 0.34} textAnchor="middle" style={{ fontSize: labelSize - 2 }}>
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
