"use client";

/* Cloud Environment Map — visualizes infrastructure relationships and attack path */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionFadeIn from "./SectionFadeIn";

const MOBILE_BREAKPOINT = 768;

/* Full topology: 8 nodes */
const NODES = [
  { id: "internet", label: "Internet", cx: 15, cy: 50 },
  { id: "iam", label: "IAM Role", cx: 32, cy: 28 },
  { id: "ec2", label: "EC2", cx: 52, cy: 45 },
  { id: "db", label: "Database", cx: 88, cy: 50 },
  { id: "lb", label: "Load Balancer", cx: 38, cy: 62 },
  { id: "s3", label: "S3 Bucket", cx: 22, cy: 78 },
  { id: "sg", label: "Security Group", cx: 68, cy: 72 },
  { id: "vpc", label: "VPC", cx: 50, cy: 22 },
];

/* Connections: [fromIdx, toIdx] — network access, permissions, dependencies */
const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [4, 2],
  [1, 5],
  [2, 6],
  [6, 3],
  [7, 4],
  [7, 2],
  [1, 2],
];

/* Attack path: Internet → IAM Role → EC2 → Database */
const ATTACK_PATH = [0, 1, 2, 3];

/* Mobile: 5 nodes — Internet, IAM, EC2, Database, Load Balancer */
const MOBILE_NODES = [
  { id: "internet", label: "Internet", cx: 12, cy: 55 },
  { id: "iam", label: "IAM", cx: 35, cy: 30 },
  { id: "ec2", label: "EC2", cx: 55, cy: 50 },
  { id: "db", label: "Database", cx: 90, cy: 55 },
  { id: "lb", label: "Load Balancer", cx: 35, cy: 75 },
];
const MOBILE_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [4, 2],
];

function isAttackEdge(a: number, b: number): boolean {
  const ia = ATTACK_PATH.indexOf(a);
  const ib = ATTACK_PATH.indexOf(b);
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

export default function CloudEnvironmentMap() {
  const isMobile = useIsMobile();
  const nodes = isMobile ? MOBILE_NODES : NODES;
  const edges = isMobile ? MOBILE_EDGES : EDGES;
  const mobileAttackPath = [0, 1, 2, 3]; /* Internet, IAM, EC2, Database */

  return (
    <section className="relative overflow-hidden bg-[#0f172a] py-20 px-6 sm:py-24 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionFadeIn>
          <h2 className="text-center text-section-title font-semibold tracking-tight text-white">
            Visualize Your Cloud Environment
          </h2>
        </SectionFadeIn>
        <SectionFadeIn>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-slate-400">
            XSEE builds a real-time graph of your cloud infrastructure and identifies the paths attackers could use to reach critical assets.
          </p>
        </SectionFadeIn>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mt-14 aspect-[1.6] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0B1C3D]/80 sm:mt-16 md:aspect-[1.8] md:mt-20"
          style={{
            boxShadow: "0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Subtle grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
          />

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="cloud-map-node-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="cloud-map-attack-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
                <feFlood floodColor="rgba(239,68,68,0.4)" floodOpacity="1" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="cloud-map-attack-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(249,115,22,0.7)" />
                <stop offset="100%" stopColor="rgba(239,68,68,0.7)" />
              </linearGradient>
            </defs>

            {/* Connection lines — muted gray, attack path red */}
            <g>
              {edges.map(([a, b], i) => {
                const n1 = nodes[a];
                const n2 = nodes[b];
                if (!n1 || !n2) return null;
                const attack = isAttackEdge(a, b);
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={n1.cx}
                    y1={n1.cy}
                    x2={n2.cx}
                    y2={n2.cy}
                    stroke={attack ? "url(#cloud-map-attack-grad)" : "rgba(148,163,184,0.2)"}
                    strokeWidth={attack ? 1.4 : 0.6}
                    strokeLinecap="round"
                    className={attack ? "cloud-map-attack-line" : "cloud-map-edge-line"}
                    style={attack ? { filter: "url(#cloud-map-attack-glow)" } : undefined}
                  />
                );
              })}
            </g>

            {/* Traveling pulse along attack path */}
            {edges
              .filter(([a, b]) => isAttackEdge(a, b))
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
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    pathLength={100}
                    strokeDasharray="10 90"
                    className="cloud-map-pulse-travel"
                    style={{ animationDelay: `${i * 1.8}s` }}
                  />
                );
              })}

            {/* Nodes — soft blue, attack path red */}
            {nodes.map((node, i) => {
              const onPath = (isMobile ? mobileAttackPath : ATTACK_PATH).includes(i);
              return (
                <g key={node.id}>
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={onPath ? 2.5 : 1.8}
                    fill={onPath ? "rgba(239,68,68,0.6)" : "rgba(96,165,250,0.5)"}
                    style={{
                      filter: onPath ? "url(#cloud-map-attack-glow)" : "url(#cloud-map-node-glow)",
                    }}
                    className={onPath ? "cloud-map-attack-node" : "cloud-map-node"}
                  />
                  {/* Node labels — visible on hover or always for key nodes on desktop */}
                  <text
                    x={node.cx}
                    y={node.cy + (isMobile ? 5 : 4.2)}
                    textAnchor="middle"
                    className="fill-slate-400 font-medium"
                    style={{
                      fontSize: isMobile ? 3.5 : 3,
                      pointerEvents: "none",
                    }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
