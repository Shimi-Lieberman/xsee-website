"use client";

import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

/* Attack path: Internet → Bastion → EC2 → IAM → Database (percent of viewBox 0 0 100 100) */
const NODES = [
  { cx: 12, cy: 28 },
  { cx: 28, cy: 42 },
  { cx: 48, cy: 32 },
  { cx: 68, cy: 48 },
  { cx: 88, cy: 58 },
];

const PATH_D = "M 12 28 L 28 42 L 48 32 L 68 48 L 88 58";

const NODE_COLOR = "rgba(80,140,255,0.35)";
const EDGE_COLOR = "rgba(120,180,255,0.2)";
const PULSE_STROKE = "rgba(255,80,80,0.8)";
const PULSE_GLOW = "rgba(255,80,80,0.4)";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsMobile(typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

export default function AttackPulseOverlay() {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <div
      className="absolute inset-0 z-[1] opacity-[0.35]"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="attack-pulse-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
            <feFlood floodColor={PULSE_GLOW} floodOpacity="1" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
            <feFlood floodColor={NODE_COLOR} floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="soft" />
            <feMerge>
              <feMergeNode in="soft" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={PATH_D}
          fill="none"
          stroke={EDGE_COLOR}
          strokeWidth="1"
          opacity="0.2"
        />

        <path
          d={PATH_D}
          fill="none"
          stroke={PULSE_STROKE}
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="8 92"
          className="animate-attack-pulse-path"
          style={{ filter: "url(#attack-pulse-glow)" }}
        />

        {NODES.map((node, i) => (
          <circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r={3}
            fill={NODE_COLOR}
            style={{ filter: "url(#node-glow)" }}
          />
        ))}
      </svg>
    </div>
  );
}
