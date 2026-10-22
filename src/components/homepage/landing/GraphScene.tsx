import { segment, type Composition } from "./graphModel";

const STEP_SECONDS = 0.9;

export default function GraphScene({ composition, className }: { composition: Composition; className: string }) {
  const { viewBox, path, branches, field, links } = composition;
  const edges = path.slice(1).map((node, i) => segment(path[i], node));

  return (
    <svg className={`lp-graph ${className}`} viewBox={viewBox} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g className="lp-field">
        {links.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={field[a].x} y1={field[a].y} x2={field[b].x} y2={field[b].y} className="lp-field-link" />
        ))}
        {field.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={i % 5 === 0 ? 2.6 : 1.6} className="lp-field-node" />
        ))}
      </g>

      <g className="lp-structure">
        {branches.map(([a, b], i) => (
          <g key={i}>
            <path d={segment(a, b)} className="lp-edge-base lp-edge-base--branch" />
            <circle cx={b.x} cy={b.y} r={5} className="lp-node-stub" />
          </g>
        ))}
        {edges.map((d, i) => (
          <path key={i} d={d} className="lp-edge-base" />
        ))}
      </g>

      <g className="lp-lit">
        {edges.map((d, i) => (
          <path
            key={i}
            d={d}
            pathLength={1}
            className="lp-edge-lit"
            style={{ animationDelay: `${0.4 + i * STEP_SECONDS}s` }}
          />
        ))}
      </g>

      <g className="lp-nodes">
        {path.map((node, i) => (
          <g key={node.label} className={`lp-node${node.target ? " lp-node--target" : ""}`}>
            {node.target && (
              <circle cx={node.x} cy={node.y} r={26} className="lp-halo" style={{ animationDelay: `${0.4 + i * STEP_SECONDS}s` }} />
            )}
            <circle cx={node.x} cy={node.y} r={17} className="lp-node-ring" style={{ animationDelay: `${0.4 + i * STEP_SECONDS - 0.2}s` }} />
            <circle cx={node.x} cy={node.y} r={6} className="lp-node-core" style={{ animationDelay: `${0.4 + i * STEP_SECONDS - 0.2}s` }} />
            <text x={node.x} y={node.y + 40} textAnchor="middle" className="lp-node-label">
              {node.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
