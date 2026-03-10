"use client";

/* Animated attack-path visualization — lightweight SVG, no heavy libraries */

import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

/* Semantic nodes: Internet, IAM Role, EC2, Database (crown jewel) */
const NODES = [
  { id: "internet", cx: 12, cy: 42, label: "Internet" },
  { id: "iam", cx: 32, cy: 28, label: "IAM Role" },
  { id: "ec2", cx: 52, cy: 48, label: "EC2" },
  { id: "db", cx: 88, cy: 52, label: "Database" },
  { id: "lb", cx: 48, cy: 22, label: "Load Balancer" },
  { id: "s3", cx: 24, cy: 72, label: "S3" },
];

/* Connections: [fromIdx, toIdx]. Attack path: Internet → IAM → EC2 → Database */
const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [4, 2],
  [1, 5],
];

const ATTACK_PATH_INDICES = [0, 1, 2, 3]; /* Internet → IAM → EC2 → Database */

/* Mobile: fewer nodes (only attack path) */
const MOBILE_NODES = NODES.slice(0, 4);
const MOBILE_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
];

function isAttackPathEdge(a: number, b: number, indices: number[]): boolean {
  const ia = indices.indexOf(a);
  const ib = indices.indexOf(b);
  return ia >= 0 && ib >= 0 && Math.abs(ia - ib) === 1;
}

function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setMobile(typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

export default function HeroAttackPathViz() {
  const isMobile = useIsMobile();
  const nodes = isMobile ? MOBILE_NODES : NODES;
  const edges = isMobile ? MOBILE_EDGES : EDGES;
  const attackIndices = [0, 1, 2, 3];

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden
    >
      {/* Dark gradient for contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0B1C3D 0%, #0a1732 40%, #081225 100%)",
        }}
      />
      {/* SVG graph — nodes, connections, attack path */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.45 }}
      >
        <defs>
          <filter
            id="hero-attack-node-glow"
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
            <feFlood floodColor="rgba(239,68,68,0.5)" floodOpacity="1" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hero-node-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="hero-attack-path-glow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
            <feFlood floodColor="rgba(239,68,68,0.35)" floodOpacity="1" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="attack-path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(249,115,22,0.6)" />
            <stop offset="100%" stopColor="rgba(239,68,68,0.6)" />
          </linearGradient>
        </defs>

        {/* Connection lines — muted gray, attack path red */}
        <g>
          {edges.map(([a, b], i) => {
            const n1 = nodes[a];
            const n2 = nodes[b];
            const attack = isAttackPathEdge(a, b, attackIndices);
            if (!n1 || !n2) return null;
            return (
              <line
                key={`${a}-${b}`}
                x1={n1.cx}
                y1={n1.cy}
                x2={n2.cx}
                y2={n2.cy}
                stroke={attack ? "url(#attack-path-grad)" : "rgba(148,163,184,0.18)"}
                strokeWidth={attack ? 1.2 : 0.6}
                strokeLinecap="round"
                className={
                  attack
                    ? "animate-hero-attack-path-pulse"
                    : "animate-hero-edge-soft"
                }
                style={
                  attack
                    ? { filter: "url(#hero-attack-path-glow)" }
                    : undefined
                }
              />
            );
          })}
        </g>

        {/* Attack path pulse — travels along path every ~6s */}
        <g>
          {edges
            .filter(([a, b]) => isAttackPathEdge(a, b, attackIndices))
            .map(([a, b], i) => {
              const n1 = nodes[a];
              const n2 = nodes[b];
              if (!n1 || !n2) return null;
              const pathD = `M ${n1.cx} ${n1.cy} L ${n2.cx} ${n2.cy}`;
              return (
                <path
                  key={`pulse-${a}-${b}`}
                  d={pathD}
                  fill="none"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray="12 88"
                  className="animate-hero-attack-pulse-travel"
                  style={{
                    filter: "url(#hero-attack-path-glow)",
                    animationDelay: `${i * 2}s`,
                  }}
                />
              );
            })}
        </g>

        {/* Nodes — soft blue, attack path nodes pulse red */}
        {nodes.map((node, i) => {
          const onAttackPath = attackIndices.includes(i);
          return (
            <g key={node.id}>
              <circle
                cx={node.cx}
                cy={node.cy}
                r={onAttackPath ? 2.2 : 1.6}
                fill={
                  onAttackPath
                    ? "rgba(239,68,68,0.5)"
                    : "rgba(96,165,250,0.4)"
                }
                style={{
                  filter: onAttackPath
                    ? "url(#hero-attack-node-glow)"
                    : "url(#hero-node-glow)",
                }}
                className={
                  onAttackPath
                    ? "animate-hero-attack-node-pulse"
                    : "animate-hero-node-drift"
                }
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
