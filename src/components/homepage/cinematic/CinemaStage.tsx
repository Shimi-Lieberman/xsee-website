import { memo, useMemo } from "react";
import type { Layout } from "./scene";
import { HOPS, HOP_Z, INFRA, INFRA_LINKS, PATH_NODES, WALL_HOP, WALL_Z, cinemaAt, pathX, type Cinema } from "./cinema";
import "./cinema.css";

type V3 = [number, number, number];
type P2 = { x: number; y: number; s: number; dz: number };

const VIEW: Record<Layout, { W: number; H: number; f: number; hz: number; xs: number; type: number }> = {
  wide: { W: 1000, H: 620, f: 540, hz: 200, xs: 1, type: 1 },
  tall: { W: 600, H: 780, f: 520, hz: 250, xs: 0.6, type: 1.25 },
};

const NEAR = 30;
const PYLON = 30;
const INFRA_PYLON = 14;

function seeded(n: number) {
  let s = 1337;
  const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: n }, () => ({ x: rand(), y: rand(), r: 0.35 + rand() * 0.9, a: 0.25 + rand() * 0.6 }));
}
const STARS = seeded(90);

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const pathPoint = (hop: number): V3 => [pathX(hop), 0, hop * HOP_Z];

type Props = { position: number; layout: Layout; animate: boolean; className?: string };

function CinemaStage({ position, layout, animate, className }: Props) {
  const v = VIEW[layout];
  const c: Cinema = useMemo(() => cinemaAt(position), [position]);
  const speed = useMemo(() => Math.max(0, cinemaAt(position + 0.015).cam.z - c.cam.z), [position, c.cam.z]);
  const { cam } = c;
  const id = (name: string) => `cn-${name}-${layout}`;

  const project = ([x, y, z]: V3): P2 | null => {
    const dz = z - cam.z;
    if (dz < NEAR) return null;
    const s = v.f / dz;
    return { x: v.W / 2 + (x - cam.x) * v.xs * s, y: v.hz + (cam.h - y) * s, s, dz };
  };

  const clipLine = (a: V3, b: V3): [P2, P2] | null => {
    const near = cam.z + NEAR;
    if (a[2] < near && b[2] < near) return null;
    const cut = (p: V3, q: V3): V3 => {
      const k = (near - p[2]) / (q[2] - p[2]);
      return [lerp(p[0], q[0], k), lerp(p[1], q[1], k), near];
    };
    const pa = project(a[2] < near ? cut(a, b) : a);
    const pb = project(b[2] < near ? cut(b, a) : b);
    return pa && pb ? [pa, pb] : null;
  };

  const fog = (z: number) => 1 - seg(z - cam.z, 720, 1300);
  const vis = (z: number) => fog(z) * clamp((c.reveal - z) / 140);
  const font = (s: number, base = 4.4) => clamp(s * base * v.type, 8 * v.type, 14 * v.type);

  const ring = (cx: number, cz: number, r: number) => {
    const pts: string[] = [];
    for (let k = 0; k <= 48; k++) {
      const a = (k / 48) * Math.PI * 2;
      const p = project([cx + Math.cos(a) * r, 0, cz + Math.sin(a) * r]);
      if (!p) return null;
      pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
    }
    return pts.join(" ");
  };

  const beamPieces = (from: number, to: number) => {
    const out: { d: string; w: number }[] = [];
    if (to <= from) return out;
    const steps = Math.max(2, Math.ceil((to - from) * 6));
    for (let i = 0; i < steps; i++) {
      const a = lerp(from, to, i / steps);
      const b = lerp(from, to, (i + 1) / steps);
      const line = clipLine(pathPoint(a), pathPoint(b));
      if (!line) continue;
      const [p, q] = line;
      out.push({ d: `M${p.x.toFixed(1)} ${p.y.toFixed(1)}L${q.x.toFixed(1)} ${q.y.toFixed(1)}`, w: (p.s + q.s) / 2 });
    }
    return out;
  };

  const vanishing = { x: v.W / 2 - cam.x * v.xs * 0.02, y: v.hz };
  const starShift = (cam.h - 62) * 0.08;
  const streak = Math.min(46, speed * 0.55);

  const gridX = Array.from({ length: 13 }, (_, i) => -480 + i * 80);
  const gridZ = Array.from({ length: 26 }, (_, i) => -560 + i * 80);

  const attack = beamPieces(0, c.reach);
  const severed = c.severedFrom !== null ? beamPieces(c.severedFrom, 5) : [];
  const scanTrail = c.scan >= 0 ? beamPieces(0, c.scan) : [];
  const ahead = c.routeAhead ? beamPieces(c.reach, 5) : [];
  const headP = c.head ? project([pathX(c.reach), 1.5, c.reach * HOP_Z]) : null;
  const scanP = c.scan >= 0 ? project([pathX(c.scan), 1.5, c.scan * HOP_Z]) : null;

  const secretZ = 5 * HOP_Z;
  const perimeterRings = c.perimeter !== "hidden" ? [46, 64, 84].map((r) => ring(0, secretZ, r)) : [];
  const perimeterLabel = { hidden: "", intact: "Perimeter intact", breached: "Perimeter breached", sealed: "Perimeter sealed", reassessing: "Reassessing" }[c.perimeter];
  const perimeterTag = project([0, PYLON + 34, secretZ]);

  const wallCx = pathX(WALL_HOP);
  const wallH = 92 * c.wall;
  const wallHalf = layout === "wide" ? 130 : 110;
  const wallCorners =
    c.wallMode !== "none" && c.wallMode !== "broken"
      ? [project([wallCx - wallHalf, 0, WALL_Z]), project([wallCx + wallHalf, 0, WALL_Z]), project([wallCx + wallHalf, wallH, WALL_Z]), project([wallCx - wallHalf, wallH, WALL_Z])]
      : null;
  const wallOk = wallCorners && wallCorners.every(Boolean) ? (wallCorners as P2[]) : null;
  const flicker = c.wallMode === "flicker" ? 0.25 + 0.75 * Math.abs(Math.sin(c.t * 140)) : 1;

  const shards =
    c.wallMode === "broken" && c.breakF < 1
      ? Array.from({ length: 14 }, (_, i) => {
          const fx = -1 + (i % 7) / 3;
          const fy = 0.2 + Math.floor(i / 7) * 0.5;
          const spread = c.breakF * 90;
          const p = project([wallCx + fx * wallHalf * 0.8 + fx * spread, 92 * fy + c.breakF * 40 * (i % 3), WALL_Z - c.breakF * 60 * ((i % 4) + 1)]);
          return p ? { p, rot: c.breakF * 240 * (i % 2 ? 1 : -1) + i * 25, k: i } : null;
        })
      : [];

  return (
    <svg
      className={`cs-graph cn ${className ?? ""}`}
      viewBox={`0 0 ${v.W} ${v.H}`}
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      aria-hidden
      data-perimeter={c.perimeter}
      data-animate={animate || undefined}
    >
      <defs>
        <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2={v.hz} gradientUnits="userSpaceOnUse">
          <stop offset="0" className="cn-sky-top" />
          <stop offset="1" className="cn-sky-bottom" />
        </linearGradient>
        <linearGradient id={id("ground")} x1="0" y1={v.hz} x2="0" y2={v.H} gradientUnits="userSpaceOnUse">
          <stop offset="0" className="cn-ground-far" />
          <stop offset="1" className="cn-ground-near" />
        </linearGradient>
        <linearGradient id={id("grid")} x1="0" y1={v.hz} x2="0" y2={v.H} gradientUnits="userSpaceOnUse">
          <stop offset="0" className="cn-grid-far" />
          <stop offset="0.35" className="cn-grid-mid" />
          <stop offset="1" className="cn-grid-near" />
        </linearGradient>
        <linearGradient id={id("wall")} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" className="cn-wall-base" />
          <stop offset="1" className="cn-wall-top" />
        </linearGradient>
        <filter id={id("bloom")} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={layout === "wide" ? 5 : 6} />
        </filter>
        <filter id={id("soft")} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>

      <rect width={v.W} height={v.hz} fill={`url(#${id("sky")})`} />
      <rect y={v.hz} width={v.W} height={v.H - v.hz} fill={`url(#${id("ground")})`} />

      <g className="cn-stars">
        {STARS.map((s, i) => {
          const x = (((s.x * v.W - cam.x * v.xs * 0.12) % v.W) + v.W) % v.W;
          const y = s.y * (v.hz - 14) + starShift;
          if (y > v.hz - 6) return null;
          const dx = x - vanishing.x;
          const dy = y - vanishing.y;
          const dist = Math.hypot(dx, dy) || 1;
          const len = streak * (dist / v.W) * 2.2;
          return len > 1.5 ? (
            <line key={i} x1={x} y1={y} x2={x + (dx / dist) * len} y2={y + (dy / dist) * len} className="cn-streak" style={{ strokeOpacity: s.a, strokeWidth: s.r }} />
          ) : (
            <circle key={i} cx={x} cy={y} r={s.r} className="cn-star" style={{ fillOpacity: s.a }} />
          );
        })}
      </g>

      <g className="cn-horizon">
        <rect y={v.hz - 26} width={v.W} height={52} className="cn-haze" filter={`url(#${id("bloom")})`} />
        <line x1={0} x2={v.W} y1={v.hz} y2={v.hz} className="cn-horizon-line" />
      </g>

      <g className="cn-grid" style={{ opacity: c.gridAlpha }} stroke={`url(#${id("grid")})`}>
        {gridX.map((gx) => {
          const line = clipLine([gx, 0, Math.max(cam.z + NEAR, -600)], [gx, 0, 1400]);
          return line ? <line key={`x${gx}`} x1={line[0].x} y1={line[0].y} x2={line[1].x} y2={line[1].y} /> : null;
        })}
        {gridZ.map((gz) => {
          const line = clipLine([-480, 0, gz], [480, 0, gz]);
          const a = vis(gz);
          return line && a > 0.02 ? <line key={`z${gz}`} x1={line[0].x} y1={line[0].y} x2={line[1].x} y2={line[1].y} style={{ opacity: a }} /> : null;
        })}
      </g>

      <g className="cn-infra-links">
        {INFRA_LINKS.map(([a, b]) => {
          const na = INFRA[a];
          const nb = INFRA[b];
          const line = clipLine([na.x, 0, na.z], [nb.x, 0, nb.z]);
          const o = Math.min(vis(na.z), vis(nb.z));
          return line && o > 0.02 ? <line key={`${a}-${b}`} x1={line[0].x} y1={line[0].y} x2={line[1].x} y2={line[1].y} style={{ opacity: o }} /> : null;
        })}
      </g>

      <g className="cn-infra">
        {INFRA.map((n) => {
          const base = project([n.x, 0, n.z]);
          const top = project([n.x, INFRA_PYLON, n.z]);
          const o = vis(n.z);
          if (!base || !top || o < 0.02) return null;
          const showLabel = base.dz < (layout === "wide" ? 430 : 320);
          const fs = font(base.s, 3.6);
          return (
            <g key={n.label} style={{ opacity: o }}>
              <line x1={base.x} y1={base.y} x2={top.x} y2={top.y} className="cn-infra-stem" />
              <circle cx={top.x} cy={top.y} r={clamp(base.s * 0.9, 1, 3)} className="cn-infra-dot" />
              {showLabel ? (
                <text x={top.x + 6} y={top.y + fs * 0.35} className="cn-infra-label" style={{ fontSize: fs }}>
                  {n.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </g>

      {c.hint > 0 ? (
        <g className="cn-hint" style={{ opacity: c.hint * (animate ? 1 : 0.6) }}>
          {beamPieces(3, 4).map((p, i) => (
            <path key={i} d={p.d} style={{ strokeWidth: clamp(p.w * 0.5, 0.6, 2) }} />
          ))}
        </g>
      ) : null}

      {perimeterRings.length ? (
        <g className={`cn-perimeter is-${c.perimeter}`} style={{ opacity: vis(secretZ) }}>
          {perimeterRings.map((pts, i) =>
            pts ? <polyline key={i} points={pts} className={`cn-ring cn-ring-${i}`} pathLength={100} /> : null,
          )}
        </g>
      ) : null}

      <g className="cn-route">
        {ahead.map((p, i) => (
          <path key={i} d={p.d} className="cn-ahead" style={{ strokeWidth: clamp(p.w * 0.35, 0.5, 1.4) }} />
        ))}
        {severed.map((p, i) => (
          <path key={i} d={p.d} className="cn-severed" style={{ strokeWidth: clamp(p.w * 0.4, 0.6, 1.6) }} />
        ))}
      </g>

      <g className="cn-beam">
        <g filter={`url(#${id("bloom")})`} className="cn-beam-bloom">
          {attack.map((p, i) => (
            <path key={i} d={p.d} style={{ strokeWidth: clamp(p.w * 2.4, 2, 12) }} />
          ))}
        </g>
        {attack.map((p, i) => (
          <path key={i} d={p.d} className="cn-beam-core" style={{ strokeWidth: clamp(p.w * 0.75, 0.8, 3.4) }} />
        ))}
        {attack.map((p, i) => (
          <path key={`h${i}`} d={p.d} className="cn-beam-hot" style={{ strokeWidth: clamp(p.w * 0.25, 0.4, 1.2) }} />
        ))}
      </g>

      {scanTrail.length ? (
        <g className="cn-scan">
          {scanTrail.map((p, i) => (
            <path key={i} d={p.d} style={{ strokeWidth: clamp(p.w * 0.45, 0.6, 2) }} />
          ))}
        </g>
      ) : null}

      {wallOk ? (
        <g className={`cn-wall is-${c.wallMode}`} style={{ opacity: flicker }}>
          <polygon points={wallOk.map((p) => `${p.x},${p.y}`).join(" ")} fill={`url(#${id("wall")})`} className="cn-wall-face" />
          {[0.25, 0.5, 0.75].map((k) => {
            const l = project([wallCx - wallHalf, wallH * k, WALL_Z]);
            const r = project([wallCx + wallHalf, wallH * k, WALL_Z]);
            return l && r ? <line key={k} x1={l.x} y1={l.y} x2={r.x} y2={r.y} className="cn-wall-scan" /> : null;
          })}
          <line x1={wallOk[0].x} y1={wallOk[0].y} x2={wallOk[1].x} y2={wallOk[1].y} className="cn-wall-base-line" filter={`url(#${id("soft")})`} />
          <line x1={wallOk[0].x} y1={wallOk[0].y} x2={wallOk[1].x} y2={wallOk[1].y} className="cn-wall-base-line" />
          <line x1={wallOk[3].x} y1={wallOk[3].y} x2={wallOk[2].x} y2={wallOk[2].y} className="cn-wall-edge" />
          {c.wall > 0.6 ? (
            <text x={(wallOk[3].x + wallOk[2].x) / 2} y={wallOk[3].y - 8} textAnchor="middle" className="cn-wall-label" style={{ fontSize: font(wallOk[0].s, 3.4) }}>
              {c.wallMode === "flicker" ? "TRUST POLICY CHANGED" : "TRUST BOUNDARY · DENY"}
            </text>
          ) : null}
        </g>
      ) : null}

      {shards.length ? (
        <g className="cn-shards" style={{ opacity: 1 - c.breakF }}>
          {shards.map((sh) =>
            sh ? (
              <path
                key={sh.k}
                d="M -6 -4 L 7 -2 L 2 6 Z"
                transform={`translate(${sh.p.x} ${sh.p.y}) rotate(${sh.rot}) scale(${clamp(sh.p.s * 0.8, 0.4, 2.4)})`}
              />
            ) : null,
          )}
        </g>
      ) : null}

      <g className="cn-hops">
        {HOPS.map((hop, i) => {
          const showName = c.act === 1 && c.reach >= i + 1;
          const showEvidence = c.scanned > i;
          if (!showName && !showEvidence) return null;
          const mid = project([(PATH_NODES[i].x + PATH_NODES[i + 1].x) / 2, 0, (i + 0.5) * HOP_Z]);
          if (!mid || mid.dz > 820) return null;
          const fs = font(mid.s, 3.3);
          const blocked = i === 3 && c.severedFrom !== null && c.severedFrom <= WALL_HOP;
          const text = showEvidence ? (blocked ? "denied" : hop.evidence) : hop.label;
          const tone = showEvidence ? (blocked ? "denied" : hop.evidence) : "name";
          const side = PATH_NODES[i].x + PATH_NODES[i + 1].x >= 0 ? -1 : 1;
          return (
            <g key={hop.label} className={`cn-hop is-${tone}`} transform={`translate(${mid.x + side * 10} ${mid.y})`}>
              <text textAnchor={side < 0 ? "end" : "start"} y={fs * 0.35} style={{ fontSize: fs }}>
                {showEvidence ? `■ ${text.toUpperCase()}` : text}
              </text>
            </g>
          );
        })}
      </g>

      <g className="cn-nodes">
        {PATH_NODES.map((n, i) => {
          const z = i * HOP_Z;
          const base = project([n.x, 0, z]);
          const top = project([n.x, PYLON, z]);
          const o = vis(z);
          if (!base || !top || o < 0.02) return null;
          const lit = c.pathDistinct && c.lit >= i;
          const isSecret = n.id === "secret";
          const tone = !c.pathDistinct
            ? "dormant"
            : isSecret
              ? c.perimeter === "breached"
                ? "breached"
                : c.perimeter === "sealed"
                  ? "sealed"
                  : lit
                    ? "lit"
                    : "idle"
              : n.id === "role-batch" && c.wallMode === "flicker"
                ? "drift"
                : lit
                  ? "lit"
                  : "idle";
          const fs = font(base.s);
          const d = clamp(base.s * 2.2, 3, 9);
          const groundRing = ring(n.x, z, 12);
          const showFinding = lit && n.finding && (n.id !== "web" || c.foothold || c.act === 1);
          const labelX = top.x + d + 8;
          return (
            <g key={n.id} className={`cn-node is-${tone}`} style={{ opacity: o }}>
              {groundRing ? <polyline points={groundRing} className="cn-node-ring" /> : null}
              <line x1={base.x} y1={base.y} x2={top.x} y2={top.y} className="cn-node-stem" />
              {tone !== "idle" && tone !== "dormant" ? (
                <circle cx={top.x} cy={top.y} r={d * 2.2} className="cn-node-bloom" filter={`url(#${id("bloom")})`} />
              ) : null}
              <path d={`M ${top.x} ${top.y - d} L ${top.x + d} ${top.y} L ${top.x} ${top.y + d} L ${top.x - d} ${top.y} Z`} className="cn-node-mark" />
              {c.pathDistinct || base.dz < 340 ? (
                <g className="cn-node-text">
                  <text x={labelX} y={top.y - fs * 0.25} className="cn-node-kind" style={{ fontSize: fs * 0.72 }}>
                    {n.kind}
                  </text>
                  <text x={labelX} y={top.y + fs * 0.85} className="cn-node-label" style={{ fontSize: fs }}>
                    {n.label}
                  </text>
                  {showFinding ? (
                    <text x={labelX} y={top.y + fs * 2} className="cn-node-finding" style={{ fontSize: fs * 0.72 }}>
                      {n.finding!.toUpperCase()}
                    </text>
                  ) : null}
                </g>
              ) : null}
            </g>
          );
        })}
      </g>

      {perimeterTag && perimeterLabel && c.pathDistinct ? (
        <text x={perimeterTag.x} y={perimeterTag.y} textAnchor="middle" className={`cn-perimeter-tag is-${c.perimeter}`} style={{ fontSize: font(perimeterTag.s, 3.2), opacity: vis(secretZ) }}>
          {perimeterLabel.toUpperCase()}
        </text>
      ) : null}

      {headP ? (
        <g className="cn-head" transform={`translate(${headP.x} ${headP.y})`}>
          <circle r={clamp(headP.s * 6, 8, 26)} className="cn-head-bloom" filter={`url(#${id("bloom")})`} />
          <line x1={-clamp(headP.s * 30, 30, 120)} x2={clamp(headP.s * 30, 30, 120)} className="cn-head-flare" />
          <line y1={-clamp(headP.s * 8, 8, 30)} y2={clamp(headP.s * 8, 8, 30)} className="cn-head-flare" />
          <circle r={clamp(headP.s * 1.4, 2, 5)} className="cn-head-core" />
        </g>
      ) : null}

      {scanP ? (
        <g className="cn-scan-head" transform={`translate(${scanP.x} ${scanP.y})`}>
          <circle r={clamp(scanP.s * 5, 6, 20)} filter={`url(#${id("bloom")})`} />
          <circle r={clamp(scanP.s * 1.2, 1.8, 4)} className="cn-scan-core" />
        </g>
      ) : null}
    </svg>
  );
}

export default memo(CinemaStage);
