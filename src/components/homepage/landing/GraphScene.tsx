import { segment, segmentMid, type Composition, type GraphNode } from "./graphModel";

export const LOOP_SECONDS = 14;
const EMPHASIS_START = 0.8;
const EMPHASIS_END = 1.8;
const PATH_START = 2;
const EDGE_SECONDS = 1;
const HOLD_END = 10;
const SETTLE_END = 11.8;

const pct = (t: number) => `${((t / LOOP_SECONDS) * 100).toFixed(2)}%`;
const fadeOnAt = (name: string, t: number) =>
  `@keyframes ${name}{0%,${pct(t - 0.15)}{opacity:0}${pct(t + 0.2)},${pct(HOLD_END)}{opacity:1}${pct(SETTLE_END)},100%{opacity:0}}`;

function buildChoreography(key: string, edgeCount: number) {
  const pathEnd = PATH_START + edgeCount * EDGE_SECONDS;
  const rules = [
    `@keyframes lp-${key}-emph{0%,${pct(EMPHASIS_START)}{opacity:.35}${pct(EMPHASIS_END)},${pct(HOLD_END)}{opacity:1}${pct(SETTLE_END)},100%{opacity:.35}}`,
    `@keyframes lp-${key}-recede{0%,${pct(EMPHASIS_START)}{opacity:1}${pct(pathEnd + 0.8)},${pct(HOLD_END)}{opacity:.4}${pct(SETTLE_END)},100%{opacity:1}}`,
  ];

  for (let i = 0; i < edgeCount; i++) {
    const start = PATH_START + i * EDGE_SECONDS;
    const end = start + EDGE_SECONDS;
    rules.push(
      `@keyframes lp-${key}-lit${i}{0%,${pct(start)}{stroke-dashoffset:1;opacity:1}${pct(end)},${pct(HOLD_END)}{stroke-dashoffset:0;opacity:1}${pct(SETTLE_END)},100%{stroke-dashoffset:0;opacity:0}}`,
      `@keyframes lp-${key}-pulse${i}{0%,${pct(start)}{stroke-dashoffset:.07;opacity:1}${pct(end - 0.02)}{stroke-dashoffset:-.93;opacity:1}${pct(end)},100%{stroke-dashoffset:-1;opacity:0}}`,
      fadeOnAt(`lp-${key}-dir${i}`, start + EDGE_SECONDS / 2),
    );
  }

  for (let i = 0; i <= edgeCount; i++) {
    const arrive = i === 0 ? PATH_START - 0.1 : PATH_START + i * EDGE_SECONDS;
    rules.push(
      fadeOnAt(`lp-${key}-on${i}`, arrive),
      `@keyframes lp-${key}-halo${i}{0%,${pct(arrive)}{opacity:0;transform:scale(.8)}${pct(arrive + 0.15)}{opacity:.7;transform:scale(1)}${pct(arrive + 1.1)},100%{opacity:0;transform:scale(1.9)}}`,
    );
  }
  return rules.join("");
}

const anim = (name: string, timing = "ease-in-out") => ({ animation: `${name} ${LOOP_SECONDS}s ${timing} infinite both` });
const CHEVRON = "M-2.5 -3.5 L2 0 L-2.5 3.5";

type SceneProps = { composition: Composition; className: string; fit: "slice" | "meet" };

export default function GraphScene({ composition, className, fit }: SceneProps) {
  const { key, viewBox, nodes, links, path } = composition;
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const pathNodes = path.map((id) => byId.get(id) as GraphNode);
  const pairs = pathNodes.slice(1).map((n, i) => [pathNodes[i], n] as const);
  const edges = pairs.map(([a, b]) => segment(a, b));
  const mids = pairs.map(([a, b]) => segmentMid(a, b));
  const backdrop = nodes.filter((n) => n.tier !== "primary");

  return (
    <>
      <style>{buildChoreography(key, edges.length)}</style>
      <svg
        className={`lp-graph ${className}`}
        viewBox={viewBox}
        preserveAspectRatio={`xMidYMid ${fit}`}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id={`lp-${key}-target`}>
            <stop offset="0%" stopColor="#ff1b8d" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ff1b8d" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="lp-backdrop" style={anim(`lp-${key}-recede`)}>
          {links.map(([a, b]) => {
            const p = byId.get(a) as GraphNode;
            const q = byId.get(b) as GraphNode;
            const ambient = p.tier === "ambient" || q.tier === "ambient";
            return (
              <line key={`${a}-${b}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} className={ambient ? "lp-link lp-link--ambient" : "lp-link"} />
            );
          })}
          {backdrop.map((n) =>
            n.tier === "context" ? (
              <circle key={n.id} cx={n.x} cy={n.y} r={3.5} className="lp-node-context" />
            ) : (
              <circle key={n.id} cx={n.x} cy={n.y} r={1.6} className="lp-node-ambient" />
            ),
          )}
        </g>

        <g className="lp-route" style={anim(`lp-${key}-emph`)}>
          {edges.map((d, i) => (
            <path key={i} d={d} className="lp-edge-base" />
          ))}
          {mids.map((m, i) => (
            <path key={i} d={CHEVRON} transform={`translate(${m.x} ${m.y}) rotate(${m.angle})`} className="lp-dir" />
          ))}
        </g>

        <g className="lp-route-lit">
          {edges.map((d, i) => (
            <path key={i} d={d} pathLength={1} className="lp-edge-lit" style={anim(`lp-${key}-lit${i}`, "linear")} />
          ))}
          {mids.map((m, i) => (
            <path
              key={i}
              d={CHEVRON}
              transform={`translate(${m.x} ${m.y}) rotate(${m.angle})`}
              className="lp-dir lp-dir--lit"
              style={anim(`lp-${key}-dir${i}`)}
            />
          ))}
        </g>

        <g>
          {edges.map((d, i) => (
            <path key={i} d={d} pathLength={1} className="lp-pulse" style={anim(`lp-${key}-pulse${i}`, "cubic-bezier(.45,0,.55,1)")} />
          ))}
        </g>

        <g>
          {pathNodes.map((n, i) => {
            const ring = n.label ? 9 : 6;
            const core = n.label ? 2.5 : 2;
            return (
              <g key={n.id} className={n.target ? "lp-node lp-node--target" : "lp-node"}>
                {n.target && (
                  <circle cx={n.x} cy={n.y} r={30} fill={`url(#lp-${key}-target)`} style={anim(`lp-${key}-on${i}`)} />
                )}
                <circle cx={n.x} cy={n.y} r={ring} className="lp-node-ring" />
                <circle cx={n.x} cy={n.y} r={ring} className="lp-node-ring-lit" style={anim(`lp-${key}-on${i}`)} />
                <circle cx={n.x} cy={n.y} r={ring + 5} className="lp-halo" style={anim(`lp-${key}-halo${i}`, "ease-out")} />
                <circle cx={n.x} cy={n.y} r={core} className="lp-node-core" />
                <circle cx={n.x} cy={n.y} r={core} className="lp-node-core-lit" style={anim(`lp-${key}-on${i}`)} />
                {n.label && (
                  <text x={n.x} y={n.y + ring + 16} textAnchor="middle" className="lp-node-label">
                    {n.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </>
  );
}
