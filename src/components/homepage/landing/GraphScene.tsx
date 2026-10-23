import { segment, type Composition, type GraphNode } from "./graphModel";

export const LOOP_SECONDS = 14;
const PATH_START = 1.4;
const EDGE_SECONDS = 1.1;
const HOLD_END = 10.4;
const SETTLE_END = 12.2;

const pct = (t: number) => `${((t / LOOP_SECONDS) * 100).toFixed(2)}%`;

function buildChoreography(key: string, edgeCount: number) {
  const pathEnd = PATH_START + edgeCount * EDGE_SECONDS;
  const rules: string[] = [];

  for (let i = 0; i < edgeCount; i++) {
    const start = PATH_START + i * EDGE_SECONDS;
    const end = start + EDGE_SECONDS;
    rules.push(
      `@keyframes lp-${key}-lit${i}{0%,${pct(start)}{stroke-dashoffset:1;opacity:1}${pct(end)},${pct(HOLD_END)}{stroke-dashoffset:0;opacity:1}${pct(SETTLE_END)},100%{stroke-dashoffset:0;opacity:0}}`,
      `@keyframes lp-${key}-pulse${i}{0%,${pct(start)}{stroke-dashoffset:0.14}${pct(end)},100%{stroke-dashoffset:-1}}`,
    );
  }

  for (let i = 0; i <= edgeCount; i++) {
    const arrive = i === 0 ? PATH_START - 0.2 : PATH_START + i * EDGE_SECONDS;
    rules.push(
      `@keyframes lp-${key}-on${i}{0%,${pct(arrive - 0.15)}{opacity:0}${pct(arrive + 0.15)},${pct(HOLD_END)}{opacity:1}${pct(SETTLE_END)},100%{opacity:0}}`,
      `@keyframes lp-${key}-halo${i}{0%,${pct(arrive)}{opacity:0;transform:scale(.7)}${pct(arrive + 0.2)}{opacity:.85;transform:scale(1)}${pct(arrive + 1.3)},100%{opacity:0;transform:scale(2.1)}}`,
    );
  }

  rules.push(
    `@keyframes lp-${key}-recede{0%,${pct(pathEnd - 0.4)}{opacity:1}${pct(pathEnd + 1)},${pct(HOLD_END)}{opacity:.3}${pct(SETTLE_END)},100%{opacity:1}}`,
  );
  return rules.join("");
}

const anim = (name: string, timing = "ease-in-out") => ({ animation: `${name} ${LOOP_SECONDS}s ${timing} infinite both` });

export default function GraphScene({ composition, className }: { composition: Composition; className: string }) {
  const { key, viewBox, nodes, links, path, zones } = composition;
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const pathNodes = path.map((id) => byId.get(id) as GraphNode);
  const pathEdges = pathNodes.slice(1).map((n, i) => segment(pathNodes[i], n));
  const context = nodes.filter((n) => n.tier !== "primary");

  return (
    <>
      <style>{buildChoreography(key, pathEdges.length)}</style>
      <svg className={`lp-graph ${className}`} viewBox={viewBox} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <g className="lp-context" style={anim(`lp-${key}-recede`)}>
          {zones.map((z, i) => (
            <rect key={i} x={z.x} y={z.y} width={z.w} height={z.h} rx={20} className="lp-zone" />
          ))}
          {links.map(([a, b]) => {
            const p = byId.get(a) as GraphNode;
            const q = byId.get(b) as GraphNode;
            const minor = p.tier === "minor" || q.tier === "minor";
            return <line key={`${a}-${b}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} className={minor ? "lp-link lp-link--minor" : "lp-link"} />;
          })}
          {context.map((n, i) =>
            n.tier === "secondary" ? (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r={7} className="lp-node-secondary" />
                <circle cx={n.x} cy={n.y} r={2} className="lp-node-secondary-core" />
              </g>
            ) : (
              <circle
                key={n.id}
                cx={n.x}
                cy={n.y}
                r={2.5}
                className="lp-node-minor"
                style={{ animation: `lp-twinkle 7s ease-in-out ${(i % 5) * 1.3}s infinite alternate` }}
              />
            ),
          )}
        </g>

        <g className="lp-path-base">
          {pathEdges.map((d, i) => (
            <path key={i} d={d} className="lp-edge-base" />
          ))}
        </g>

        <g className="lp-path-lit">
          {pathEdges.map((d, i) => (
            <path key={i} d={d} pathLength={1} className="lp-edge-lit" style={anim(`lp-${key}-lit${i}`, "linear")} />
          ))}
        </g>
        <g>
          {pathEdges.map((d, i) => (
            <path key={i} d={d} pathLength={1} className="lp-pulse" style={anim(`lp-${key}-pulse${i}`, "linear")} />
          ))}
        </g>

        <g>
          {pathNodes.map((n, i) => (
            <g key={n.id} className={n.target ? "lp-node lp-node--target" : "lp-node"}>
              {n.target && <circle cx={n.x} cy={n.y} r={34} className="lp-target-glow" style={anim(`lp-${key}-on${i}`)} />}
              <circle cx={n.x} cy={n.y} r={n.label ? 16 : 11} className="lp-node-ring" />
              <circle cx={n.x} cy={n.y} r={n.label ? 16 : 11} className="lp-node-ring-lit" style={anim(`lp-${key}-on${i}`)} />
              <circle cx={n.x} cy={n.y} r={n.label ? 22 : 16} className="lp-halo" style={anim(`lp-${key}-halo${i}`, "ease-out")} />
              <circle cx={n.x} cy={n.y} r={n.label ? 5 : 3.5} className="lp-node-core" />
              <circle cx={n.x} cy={n.y} r={n.label ? 5 : 3.5} className="lp-node-core-lit" style={anim(`lp-${key}-on${i}`)} />
              {n.label && (
                <text x={n.x} y={n.y + 38} textAnchor="middle" className="lp-node-label">
                  {n.label}
                </text>
              )}
            </g>
          ))}
        </g>
      </svg>
    </>
  );
}
