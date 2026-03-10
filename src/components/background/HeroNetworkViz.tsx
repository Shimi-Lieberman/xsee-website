"use client";

/* Lightweight SVG network visualization — no heavy libraries, GPU-friendly */

const NODES = [
  { cx: 12, cy: 22 }, { cx: 88, cy: 18 }, { cx: 22, cy: 48 }, { cx: 78, cy: 45 },
  { cx: 35, cy: 72 }, { cx: 65, cy: 78 }, { cx: 50, cy: 35 }, { cx: 15, cy: 60 },
  { cx: 85, cy: 62 }, { cx: 42, cy: 15 }, { cx: 58, cy: 88 }, { cx: 28, cy: 82 },
];

const EDGES: [number, number][] = [
  [0, 6], [1, 6], [2, 6], [3, 6], [2, 4], [3, 5], [4, 5], [2, 7], [3, 8],
  [0, 2], [1, 3], [7, 4], [8, 5], [9, 6], [6, 2], [4, 10], [5, 10],
];

const ATTACK_PATH = [0, 6, 2, 4, 10];

const NODE_COLOR = "rgba(80,140,255,0.4)";
const EDGE_COLOR = "rgba(120,180,255,0.15)";
const ATTACK_PATH_COLOR = "rgba(255,80,80,0.5)";

export default function HeroNetworkViz() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden
    >
      {/* Dark gradient for contrast */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background:
            "linear-gradient(180deg, #0B1C3D 0%, #0a1732 40%, #081225 100%)",
        }}
      />
      {/* SVG network — nodes + edges + attack path */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.4]"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="hero-node-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hero-attack-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
            <feFlood floodColor="rgba(255,80,80,0.3)" floodOpacity="1" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Edges — occasional pulse via CSS */}
        <g className="hero-network-edges">
          {EDGES.map(([a, b], i) => {
            const isAttackPath =
              ATTACK_PATH.indexOf(a) >= 0 &&
              ATTACK_PATH.indexOf(b) >= 0 &&
              Math.abs(ATTACK_PATH.indexOf(a) - ATTACK_PATH.indexOf(b)) === 1;
            const n1 = NODES[a];
            const n2 = NODES[b];
            return (
              <line
                key={`${a}-${b}`}
                x1={n1.cx}
                y1={n1.cy}
                x2={n2.cx}
                y2={n2.cy}
                stroke={isAttackPath ? ATTACK_PATH_COLOR : EDGE_COLOR}
                strokeWidth={isAttackPath ? 0.8 : 0.5}
                strokeLinecap="round"
                className={isAttackPath ? "animate-hero-edge-pulse" : "animate-hero-edge-fade"}
              />
            );
          })}
        </g>
        {/* Nodes — subtle glow */}
        {NODES.map((node, i) => {
          const isOnAttackPath = ATTACK_PATH.includes(i);
          return (
            <circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r={1.8}
              fill={isOnAttackPath ? "rgba(255,90,90,0.5)" : NODE_COLOR}
              style={{
                filter: isOnAttackPath ? "url(#hero-attack-glow)" : "url(#hero-node-glow)",
              }}
              className="animate-hero-node-glow"
            />
          );
        })}
      </svg>
    </div>
  );
}
