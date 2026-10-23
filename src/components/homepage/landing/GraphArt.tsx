"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const W = 848;
const H = 1264;
const CYCLE = "11s";

type Stop = { id: string; label: string; x: number; y: number; lx: number; ly: number; align: "start" | "end"; at: number };

// Coordinates are in the artwork's pixel space; `at` is when the pulse reaches the node, as a fraction of the cycle.
const STOPS: Stop[] = [
  { id: "entry", label: "Entry", x: 656, y: 405, lx: 738, ly: 398, align: "start", at: 0.1 },
  { id: "workload", label: "Workload", x: 700, y: 612, lx: 632, ly: 596, align: "end", at: 0.212 },
  { id: "identity", label: "Identity", x: 490, y: 745, lx: 566, ly: 764, align: "start", at: 0.344 },
  { id: "data", label: "Data", x: 245, y: 905, lx: 362, ly: 944, align: "start", at: 0.5 },
];

// Waypoints sit on the dotted connectors painted into the artwork, so the pulse rides the visible path.
const ROUTE = "M656 405 L676 523 L700 612 L601 689 L490 745 L385 832 L245 905";

function haloTiming(at: number) {
  const peak = Math.min(at + 0.03, 0.74);
  return { keyTimes: `0;${at};${peak};0.75;0.88;1`, values: "0;0;1;0.55;0;0" };
}

export default function GraphArt({ running, animated }: { running: boolean; animated: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !animated) return;
    if (running) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [running, animated]);

  return (
    <div className="lp-art" aria-hidden="true">
      <Image
        src="/images/exposure-path.webp"
        alt=""
        width={W}
        height={H}
        sizes="(min-width: 1024px) 560px, 100vw"
        className="lp-art-img"
      />
      <svg ref={svgRef} className="lp-art-fx" viewBox={`0 0 ${W} ${H}`} focusable="false">
        <defs>
          <radialGradient id="lp-halo-fill">
            <stop offset="0" stopColor="#ff2d8a" stopOpacity="0.55" />
            <stop offset="0.55" stopColor="#ff2d8a" stopOpacity="0.16" />
            <stop offset="1" stopColor="#ff2d8a" stopOpacity="0" />
          </radialGradient>
          <filter id="lp-bead-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {STOPS.map((s) => {
          const t = haloTiming(s.at);
          return (
            <ellipse key={s.id} cx={s.x} cy={s.y} rx="118" ry="70" fill="url(#lp-halo-fill)" opacity={animated ? 0 : 0.5}>
              {animated ? (
                <animate attributeName="opacity" dur={CYCLE} repeatCount="indefinite" calcMode="spline"
                  keyTimes={t.keyTimes} values={t.values} keySplines="0 0 1 1;0.2 0 0.2 1;0.4 0 0.6 1;0.4 0 0.6 1;0 0 1 1" />
              ) : null}
            </ellipse>
          );
        })}

        <path d={ROUTE} pathLength={1} className="lp-art-trail" strokeDasharray="1" strokeDashoffset={animated ? 1 : 0}>
          {animated ? (
            <>
              <animate attributeName="stroke-dashoffset" dur={CYCLE} repeatCount="indefinite"
                keyTimes="0;0.1;0.5;1" values="1;1;0;0" />
              <animate attributeName="opacity" dur={CYCLE} repeatCount="indefinite"
                keyTimes="0;0.75;0.9;1" values="1;1;0;0" />
            </>
          ) : null}
        </path>

        {animated ? (
          <g opacity="0">
            <animate attributeName="opacity" dur={CYCLE} repeatCount="indefinite"
              keyTimes="0;0.09;0.11;0.49;0.53;1" values="0;0;1;1;0;0" />
            <animateMotion dur={CYCLE} repeatCount="indefinite" calcMode="linear" path={ROUTE}
              keyPoints="0;0;1;1" keyTimes="0;0.1;0.5;1" />
            <circle r="11" fill="#ff2d8a" filter="url(#lp-bead-glow)" />
            <circle r="4.5" fill="#fff4f9" />
          </g>
        ) : null}
      </svg>

      {STOPS.map((s) => (
        <span
          key={s.id}
          className={`lp-art-label${s.align === "end" ? " is-end" : ""}`}
          style={{ left: `${(s.lx / W) * 100}%`, top: `${(s.ly / H) * 100}%` }}
        >
          {s.label}
        </span>
      ))}
    </div>
  );
}
