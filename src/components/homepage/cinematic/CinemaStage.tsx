import { memo } from "react";
import type { Layout } from "./scene";
import {
  BLOCKED,
  BRANCH,
  CONSTELLATION,
  HOPS,
  HOP_Z,
  INFRA,
  INFRA_LINKS,
  PATH_NODES,
  PERIMETER_LABEL,
  WALL_HOP,
  WALL_Z,
  pathX,
  type Cinema,
} from "./cinema";
import "./cinema.css";

type V3 = [number, number, number];
type P2 = { x: number; y: number; s: number; dz: number };

const VIEW: Record<Layout, { W: number; H: number; f: number; hz: number; xs: number; type: number }> = {
  wide: { W: 1000, H: 620, f: 540, hz: 200, xs: 1, type: 1 },
  tall: { W: 600, H: 780, f: 560, hz: 175, xs: 0.95, type: 1.15 },
};

const NEAR = 30;
const PYLON = 30;
const INFRA_PYLON = 14;
const CENTER: [number, number] = [0, 275];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const pathPoint = (hop: number, y = 0): V3 => [pathX(hop), y, hop * HOP_Z];
const f1 = (n: number) => n.toFixed(1);

function seeded(n: number) {
  let s = 1337;
  const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: n }, () => ({ x: rand(), y: rand(), r: 0.35 + rand() * 0.9, a: 0.25 + rand() * 0.6 }));
}
const STARS = seeded(110);

/**
 * A portrait screen crops the scene to a narrow column, so pulled-back shots read as a small
 * cluster in empty space. On the tall layout, wide shots move in, rise for depth separation
 * and stretch horizontally; follow shots near START are left untouched.
 */
function frame(c: Cinema, layout: Layout) {
  const base = VIEW[layout];
  if (layout !== "tall") return { v: base, cam: c.cam };
  const pulled = clamp((-170 - c.cam.z) / 130);
  const far = c.cam.z < -300;
  const z = far ? -300 + (c.cam.z + 300) * 0.35 : c.cam.z;
  const h = (far ? 158 + (c.cam.h - 158) * 0.5 : c.cam.h) + 60 * pulled;
  return {
    v: { ...base, xs: base.xs + 0.55 * pulled, hz: base.hz - 45 * pulled },
    cam: { x: c.cam.x, z, h },
  };
}

function projector(c: Cinema, layout: Layout) {
  const { v, cam } = frame(c, layout);
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
  const fog = (z: number) => 1 - seg(z - cam.z, 760, 1500);
  const reveal = (x: number, z: number) => clamp((c.revealR - Math.hypot(x - CENTER[0], z - CENTER[1])) / 160);
  const vis = (x: number, z: number) => fog(z) * reveal(x, z);
  const font = (s: number, base = 4.4) => clamp(s * base * v.type, 9, 12.5 * v.type);
  const ring = (cx: number, cz: number, r: number, y = 0) => {
    let d = "";
    let open = false;
    for (let k = 0; k <= 64; k++) {
      const a = (k / 64) * Math.PI * 2;
      const p = project([cx + Math.cos(a) * r, y, cz + Math.sin(a) * r]);
      if (!p) {
        open = false;
        continue;
      }
      d += `${open ? "L" : "M"}${f1(p.x)} ${f1(p.y)}`;
      open = true;
    }
    return d || null;
  };
  const pieces = (from: number, to: number, y = 0) => {
    const out: { d: string; w: number; hop: number }[] = [];
    if (to <= from) return out;
    const steps = Math.max(2, Math.ceil((to - from) * 6));
    for (let i = 0; i < steps; i++) {
      const a = lerp(from, to, i / steps);
      const b = lerp(from, to, (i + 1) / steps);
      const line = clipLine(pathPoint(a, y), pathPoint(b, y));
      if (!line) continue;
      const [p, q] = line;
      out.push({ d: `M${f1(p.x)} ${f1(p.y)}L${f1(q.x)} ${f1(q.y)}`, w: (p.s + q.s) / 2, hop: Math.floor((a + b) / 2) });
    }
    return out;
  };
  return { v, cam, project, clipLine, fog, vis, font, ring, pieces };
}

type Props = { c: Cinema; layout: Layout; animate: boolean; className?: string };

/** Far plane: sky, starfield, ground grid and the constellation of unrelated infrastructure. */
function EnvironmentLayer({ c, layout, animate, className }: Props) {
  const { v, cam, project, clipLine, vis, font, ring } = projector(c, layout);
  const id = (name: string) => `cne-${name}-${layout}`;
  const starShift = (cam.h - 62) * 0.06;
  const gridX = Array.from({ length: 17 }, (_, i) => -640 + i * 80);
  const gridZ = Array.from({ length: 28 }, (_, i) => -640 + i * 80);
  const pts = CONSTELLATION.pts.map((p) => {
    const base = project([p.x, 0, p.z]);
    const top = p.y ? project([p.x, p.y, p.z]) : base;
    return base && top ? { base, top, o: vis(p.x, p.z) * c.env } : null;
  });
  const wave = c.awakening < 1 ? ring(CENTER[0], CENTER[1], c.revealR - 60) : null;

  return (
    <svg
      className={`cs-graph cn cn-env ${className ?? ""}`}
      viewBox={`0 0 ${v.W} ${v.H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
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
        <filter id={id("haze")} x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <rect width={v.W} height={v.hz} fill={`url(#${id("sky")})`} />
      <rect y={v.hz} width={v.W} height={v.H - v.hz} fill={`url(#${id("ground")})`} />

      <g className="cn-stars" style={{ opacity: 0.35 + 0.65 * c.awakening }}>
        {STARS.map((s, i) => {
          const x = (((s.x * v.W - cam.x * v.xs * 0.12) % v.W) + v.W) % v.W;
          const y = s.y * (v.hz - 14) + starShift;
          if (y > v.hz - 6) return null;
          const fade = clamp((v.hz - y) / 60);
          return <circle key={i} cx={x} cy={y} r={s.r * 0.8} className="cn-star" style={{ fillOpacity: s.a * fade, animationDelay: `${(i % 9) * -0.7}s` }} />;
        })}
      </g>

      <rect y={v.hz - 30} width={v.W} height={60} className="cn-haze" filter={`url(#${id("haze")})`} style={{ opacity: 0.4 + 0.6 * c.awakening }} />

      <g className="cn-grid" style={{ opacity: c.awakening * (0.5 + 0.5 * c.env) }} stroke={`url(#${id("grid")})`}>
        {gridX.map((gx) => {
          const line = clipLine([gx, 0, Math.max(cam.z + NEAR, -640)], [gx, 0, 1500]);
          return line ? <line key={`x${gx}`} x1={line[0].x} y1={line[0].y} x2={line[1].x} y2={line[1].y} /> : null;
        })}
        {gridZ.map((gz) => {
          const line = clipLine([-640, 0, gz], [640, 0, gz]);
          const a = vis(0, gz);
          return line && a > 0.02 ? <line key={`z${gz}`} x1={line[0].x} y1={line[0].y} x2={line[1].x} y2={line[1].y} style={{ opacity: a }} /> : null;
        })}
      </g>

      {wave ? <path d={wave} className="cn-wake" style={{ opacity: 0.7 * (1 - c.awakening) }} /> : null}

      <g className="cn-mesh">
        {CONSTELLATION.links.map(([a, b], i) => {
          const pa = pts[a];
          const pb = pts[b];
          if (!pa || !pb) return null;
          const o = Math.min(pa.o, pb.o);
          if (o < 0.03) return null;
          return (
            <line
              key={i}
              x1={f1(pa.top.x)}
              y1={f1(pa.top.y)}
              x2={f1(pb.top.x)}
              y2={f1(pb.top.y)}
              className={i % 5 === 0 ? "cn-flow" : undefined}
              style={{ opacity: o, animationDelay: `${(i % 7) * -0.9}s` }}
            />
          );
        })}
      </g>

      <g className="cn-mesh-nodes">
        {pts.map((p, i) => {
          if (!p || p.o < 0.03) return null;
          const star = CONSTELLATION.pts[i];
          return (
            <g key={i} style={{ opacity: p.o }}>
              {star.y ? <line x1={p.base.x} y1={p.base.y} x2={p.top.x} y2={p.top.y} className="cn-mesh-stem" /> : null}
              <circle cx={f1(p.top.x)} cy={f1(p.top.y)} r={clamp(p.base.s * star.r, 0.6, 2.6)} className={`cn-mesh-dot k${star.kind}`} />
            </g>
          );
        })}
      </g>

      <g className="cn-infra-links">
        {INFRA_LINKS.map(([a, b]) => {
          const na = INFRA[a];
          const nb = INFRA[b];
          const line = clipLine([na.x, 0, na.z], [nb.x, 0, nb.z]);
          const o = Math.min(vis(na.x, na.z), vis(nb.x, nb.z)) * c.env;
          return line && o > 0.02 ? <line key={`${a}-${b}`} x1={line[0].x} y1={line[0].y} x2={line[1].x} y2={line[1].y} style={{ opacity: o }} /> : null;
        })}
      </g>

      <g className="cn-infra">
        {INFRA.map((n) => {
          const base = project([n.x, 0, n.z]);
          const top = project([n.x, INFRA_PYLON, n.z]);
          const o = vis(n.x, n.z) * (0.4 + 0.6 * c.env);
          if (!base || !top || o < 0.02) return null;
          const showLabel = base.dz < (layout === "wide" ? 460 : 340) && c.env > 0.5;
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
    </svg>
  );
}

const CORE_TONE: Record<Cinema["perimeter"], string> = {
  hidden: "neutral",
  intact: "neutral",
  candidate: "danger",
  exposed: "danger",
  pending: "verify",
  sealed: "sealed",
  drift: "drift",
  reassessing: "verify",
  reopened: "danger",
};

/** Near plane: the route, its evidence, the boundary and the sensitive resource's light core. */
function RouteLayer({ c, layout, animate, className }: Props) {
  const { v, project, vis, font, ring, pieces } = projector(c, layout);
  const id = (name: string) => `cnr-${name}-${layout}`;
  const visZ = (x: number, z: number) => vis(x, z);

  const routeEnd = c.severedFrom ?? c.reach;
  const beam = pieces(0, Math.min(c.reach, routeEnd));
  const severed = c.severedFrom !== null ? pieces(c.severedFrom, 5) : [];
  const ahead = c.routeAhead ? pieces(c.reach, 5) : [];
  const scanTrail = c.scan >= 0 ? pieces(0, c.scan, 1) : [];
  const headP = c.head ? project([pathX(c.reach), 1.5, c.reach * HOP_Z]) : null;
  const scanP = c.scan >= 0 ? project([pathX(c.scan), 1.5, c.scan * HOP_Z]) : null;
  const discovery = c.discovery > 0 ? pieces(3, 4) : [];
  const discoveryMid = c.discovery > 0 ? project(pathPoint(3.5, 2)) : null;

  const secretZ = 5 * HOP_Z;
  const coreBase = project([0, 0, secretZ]);
  const coreTop = project([0, PYLON, secretZ]);
  const coreSky = project([0, PYLON + 280, secretZ]);
  const coreOn = c.pathDistinct ? 1 : c.discovery * 0.55;
  const tone = CORE_TONE[c.perimeter];
  const perimeterRings = c.perimeter !== "hidden" ? [46, 64, 86].map((r) => ring(0, secretZ, r)) : [];
  const perimeterTag = project([0, PYLON + 36, secretZ]);
  const perimeterLabel = PERIMETER_LABEL[c.perimeter];

  const wallCx = pathX(WALL_HOP);
  const wallH = (layout === "wide" ? 90 : 64) * c.wall;
  const wallHalf = layout === "wide" ? 130 : 92;
  const wallCorners =
    c.wallMode !== "none" && c.wallMode !== "broken"
      ? [project([wallCx - wallHalf, 0, WALL_Z]), project([wallCx + wallHalf, 0, WALL_Z]), project([wallCx + wallHalf, wallH, WALL_Z]), project([wallCx - wallHalf, wallH, WALL_Z])]
      : null;
  const wallOk = wallCorners && wallCorners.every(Boolean) ? (wallCorners as P2[]) : null;
  const flicker = c.wallMode === "flicker" ? 0.3 + 0.7 * Math.abs(Math.sin(c.t * 150)) : 1;
  const verified = c.collapse > 0 || c.perimeter === "sealed";

  const shards =
    c.wallMode === "broken" && c.breakF < 1
      ? Array.from({ length: 10 }, (_, i) => {
          const fx = -1 + (i % 5) / 2;
          const fy = 0.2 + Math.floor(i / 5) * 0.5;
          const spread = c.breakF * 28;
          const p = project([wallCx + fx * wallHalf * 0.8 + fx * spread, 96 * fy + c.breakF * 14 * (i % 3), WALL_Z + c.breakF * 30 * ((i % 3) + 1)]);
          return p ? { p, rot: c.breakF * 240 * (i % 2 ? 1 : -1) + i * 25, k: i } : null;
        })
      : [];

  const particles =
    c.collapse > 0 && c.collapse < 1
      ? Array.from({ length: 42 }, (_, k) => {
          const hop = WALL_HOP + ((k * 37) % 42) / 42 * (5 - WALL_HOP);
          const drift = c.collapse * (14 + (k % 6) * 9);
          const p = project([pathX(hop) + Math.sin(k * 1.7) * drift * 0.8, 2 + drift * (0.6 + (k % 3) * 0.3), hop * HOP_Z + Math.cos(k) * drift * 0.5]);
          return p ? { p, k } : null;
        })
      : [];

  const roleWeb = PATH_NODES[3];
  const branchInfra = INFRA[BRANCH.infra];
  const blockedInfra = INFRA[BLOCKED.infra];
  const branchA = project([roleWeb.x, 2, BRANCH.from * HOP_Z]);
  const branchB = project([branchInfra.x, 2, branchInfra.z]);
  const blockedP = project([blockedInfra.x, INFRA_PYLON, blockedInfra.z]);

  const roleBatch = PATH_NODES[4];
  const driftRing = c.driftWave >= 0 && c.driftWave < 1 ? ring(roleBatch.x, 4 * HOP_Z, 40 + c.driftWave * 620) : null;
  const driftLink = c.driftLink ? pieces(3, 4, 10) : [];

  const nodeTone = (i: number) => {
    const n = PATH_NODES[i];
    if (!c.pathDistinct) return "dormant";
    if (n.id === "secret") {
      if (c.perimeter === "sealed" || c.perimeter === "pending") return c.perimeter === "sealed" ? "sealed" : "lit";
      if (c.perimeter === "drift" || c.perimeter === "reassessing") return "sealed";
      if (c.perimeter === "exposed" || c.perimeter === "reopened") return "breached";
      return c.lit >= i ? "candidate" : "idle";
    }
    if (n.id === "role-batch" && (c.perimeter === "drift" || c.perimeter === "reassessing")) return "drift";
    if (c.severedFrom !== null && i > c.severedFrom) return "idle";
    if (c.lit < i) return "idle";
    return i <= c.validatedTo ? "lit" : "candidate";
  };

  return (
    <svg
      className={`cs-graph cn cn-route-layer ${className ?? ""}`}
      viewBox={`0 0 ${v.W} ${v.H}`}
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      aria-hidden
      data-animate={animate || undefined}
    >
      <defs>
        <filter id={id("bloom")} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={layout === "wide" ? 5 : 6} />
        </filter>
        <filter id={id("soft")} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        <radialGradient id={id("core")}>
          <stop offset="0" className="cn-core-0" />
          <stop offset="0.35" className="cn-core-1" />
          <stop offset="1" className="cn-core-2" />
        </radialGradient>
        <linearGradient id={id("shaft")} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" className="cn-shaft-0" />
          <stop offset="1" className="cn-shaft-1" />
        </linearGradient>
        <linearGradient id={id("wall")} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" className="cn-wall-base" />
          <stop offset="1" className="cn-wall-top" />
        </linearGradient>
      </defs>

      {coreBase && coreTop && coreOn > 0.01 ? (
        <g className={`cn-core is-${tone}`} style={{ opacity: coreOn * visZ(0, secretZ) }}>
          <ellipse cx={coreBase.x} cy={coreBase.y} rx={clamp(coreBase.s * 200, 60, 540)} ry={clamp(coreBase.s * 48, 14, 130)} fill={`url(#${id("core")})`} />
          {coreSky ? (
            <polygon
              points={`${coreBase.x - coreBase.s * 8},${coreBase.y} ${coreBase.x + coreBase.s * 8},${coreBase.y} ${coreSky.x + 1},${coreSky.y} ${coreSky.x - 1},${coreSky.y}`}
              fill={`url(#${id("shaft")})`}
              className="cn-core-shaft"
            />
          ) : null}
          <circle cx={coreTop.x} cy={coreTop.y} r={clamp(coreTop.s * 72, 26, 210)} fill={`url(#${id("core")})`} className="cn-core-halo" />
        </g>
      ) : null}

      {perimeterRings.length ? (
        <g className={`cn-perimeter is-${tone}`} style={{ opacity: visZ(0, secretZ) * (c.pathDistinct ? 1 : 0.5) }}>
          {perimeterRings.map((d, i) => (d ? <path key={i} d={d} className={`cn-ring cn-ring-${i}`} pathLength={100} /> : null))}
        </g>
      ) : null}

      {driftRing ? <path d={driftRing} className="cn-drift-wave" style={{ opacity: 1 - c.driftWave }} /> : null}

      {c.act >= 2 && branchA && branchB ? (
        <g className="cn-branch">
          <line x1={branchA.x} y1={branchA.y} x2={branchB.x} y2={branchB.y} />
          {c.branchTag ? (
            <text x={(branchA.x + branchB.x) / 2} y={(branchA.y + branchB.y) / 2 - 8} textAnchor="middle" style={{ fontSize: font(branchB.s, 3) }}>
              UNTESTED
            </text>
          ) : null}
        </g>
      ) : null}

      {c.blockedTag && blockedP && blockedP.dz < 900 ? (
        <g className="cn-blocked" transform={`translate(${blockedP.x} ${blockedP.y})`}>
          <circle r={clamp(blockedP.s * 5, 4, 9)} />
          <line x1={-clamp(blockedP.s * 3.5, 3, 6)} y1={clamp(blockedP.s * 3.5, 3, 6)} x2={clamp(blockedP.s * 3.5, 3, 6)} y2={-clamp(blockedP.s * 3.5, 3, 6)} />
          <text
            x={(blockedP.x > v.W * 0.55 ? -1 : 1) * clamp(blockedP.s * 8, 8, 14)}
            y={4}
            textAnchor={blockedP.x > v.W * 0.55 ? "end" : "start"}
            style={{ fontSize: font(blockedP.s, 3) }}
          >
            {layout === "wide" ? "CHECK BLOCKED · NO READ ACCESS" : "BLOCKED"}
          </text>
        </g>
      ) : null}

      {discovery.length ? (
        <g className="cn-discovery" style={{ opacity: c.discovery }}>
          <g filter={`url(#${id("bloom")})`}>
            {discovery.map((p, i) => (
              <path key={i} d={p.d} style={{ strokeWidth: clamp(p.w * 2.6, 2, 12) }} />
            ))}
          </g>
          {discovery.map((p, i) => (
            <path key={`c${i}`} d={p.d} className="cn-discovery-core" style={{ strokeWidth: clamp(p.w * 0.7, 0.8, 3) }} />
          ))}
          {discoveryMid ? (
            <g transform={`translate(${discoveryMid.x} ${discoveryMid.y})`}>
              <circle r={clamp(discoveryMid.s * 14, 10, 40)} className="cn-discovery-ping" />
              <circle r={clamp(discoveryMid.s * 14, 10, 40)} className="cn-discovery-ping cn-discovery-ping--late" />
            </g>
          ) : null}
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
          {beam.map((p, i) => (
            <path key={i} d={p.d} className={p.hop < c.validatedTo ? "is-proven" : "is-candidate"} style={{ strokeWidth: clamp(p.w * 2.4, 2, 12) }} />
          ))}
        </g>
        {beam.map((p, i) => {
          const proven = p.hop < c.validatedTo;
          const sim = proven && HOPS[Math.min(4, p.hop)].evidence === "simulated";
          return (
            <path
              key={i}
              d={p.d}
              className={`cn-beam-core ${proven ? (sim ? "is-simulated" : "is-observed") : "is-candidate"}`}
              style={{ strokeWidth: clamp(p.w * (proven ? 0.8 : 0.55), 0.8, 3.4) }}
            />
          );
        })}
        {beam.map((p, i) =>
          p.hop < c.validatedTo ? <path key={`h${i}`} d={p.d} className="cn-beam-hot" style={{ strokeWidth: clamp(p.w * 0.25, 0.4, 1.2) }} /> : null,
        )}
      </g>

      {particles.length ? (
        <g className="cn-particles" style={{ opacity: 1 - c.collapse }}>
          {particles.map((pt) => (pt ? <circle key={pt.k} cx={pt.p.x} cy={pt.p.y} r={clamp(pt.p.s * 1.2, 0.8, 2.6)} /> : null))}
        </g>
      ) : null}

      {driftLink.length ? (
        <g className="cn-drift-link">
          {driftLink.map((p, i) => (
            <path key={i} d={p.d} style={{ strokeWidth: clamp(p.w * 0.5, 0.6, 2) }} />
          ))}
        </g>
      ) : null}

      {scanTrail.length ? (
        <g className={`cn-scan is-${c.scanTone}`}>
          {scanTrail.map((p, i) => (
            <path key={i} d={p.d} style={{ strokeWidth: clamp(p.w * 0.45, 0.6, 2) }} />
          ))}
        </g>
      ) : null}

      {wallOk ? (
        <g className={`cn-wall is-${c.wallMode}${verified ? " is-verified" : ""}`} style={{ opacity: flicker }}>
          <polygon points={wallOk.map((p) => `${f1(p.x)},${f1(p.y)}`).join(" ")} fill={`url(#${id("wall")})`} className="cn-wall-face" />
          {[0.25, 0.5, 0.75].map((k) => {
            const l = project([wallCx - wallHalf, wallH * k, WALL_Z]);
            const r = project([wallCx + wallHalf, wallH * k, WALL_Z]);
            return l && r ? <line key={k} x1={l.x} y1={l.y} x2={r.x} y2={r.y} className="cn-wall-scan" /> : null;
          })}
          <line x1={wallOk[0].x} y1={wallOk[0].y} x2={wallOk[1].x} y2={wallOk[1].y} className="cn-wall-base-line" filter={`url(#${id("soft")})`} />
          <line x1={wallOk[0].x} y1={wallOk[0].y} x2={wallOk[1].x} y2={wallOk[1].y} className="cn-wall-base-line" />
          <line x1={wallOk[3].x} y1={wallOk[3].y} x2={wallOk[2].x} y2={wallOk[2].y} className="cn-wall-edge" />
          {c.wall > 0.6 && c.wallLabel && c.wallLabel !== perimeterLabel ? (
            <text x={(wallOk[3].x + wallOk[2].x) / 2} y={wallOk[3].y - 8} textAnchor="middle" className="cn-wall-label" style={{ fontSize: font(wallOk[0].s, 3.4) }}>
              {c.wallLabel.toUpperCase()}
            </text>
          ) : null}
        </g>
      ) : null}

      {shards.length ? (
        <g className="cn-shards" style={{ opacity: 1 - c.breakF }}>
          {shards.map((sh) =>
            sh ? (
              <path key={sh.k} d="M -6 -4 L 7 -2 L 2 6 Z" transform={`translate(${sh.p.x} ${sh.p.y}) rotate(${sh.rot}) scale(${clamp(sh.p.s * 0.8, 0.4, 2.4)})`} />
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
          const maxDz = layout === "wide" ? 820 : 520;
          if (!mid || mid.dz > maxDz || mid.dz < 150 || mid.y > v.H * 0.58) return null;
          const fs = font(mid.s, 3.3);
          const denied = i === 3 && c.severedFrom !== null && c.severedFrom <= WALL_HOP && c.collapse > 0;
          const text = showEvidence ? (denied ? "denied · re-checked" : hop.evidence) : hop.label;
          const toneName = showEvidence ? (denied ? "denied" : hop.evidence) : "name";
          const side = PATH_NODES[i].x + PATH_NODES[i + 1].x >= 0 ? -1 : 1;
          return (
            <g key={hop.label} className={`cn-hop is-${toneName}`} transform={`translate(${mid.x + side * 10} ${mid.y})`}>
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
          const o = visZ(n.x, z);
          if (!base || !top || o < 0.02) return null;
          const nt = nodeTone(i);
          const fs = font(base.s);
          const d = clamp(base.s * 2.2, 3, 9);
          const groundRing = base.dz > 220 ? ring(n.x, z, 12) : null;
          const lit = nt !== "idle" && nt !== "dormant";
          const drifted = n.id === "role-batch" && (c.perimeter === "drift" || c.perimeter === "reassessing" || c.perimeter === "reopened");
          const finding = drifted ? "Trust: role-web-*" : n.finding;
          const showFinding = (lit || drifted) && finding && (n.id !== "web" || c.foothold || c.act === 1);
          const flip = layout === "tall" && top.x > v.W / 2 + 4;
          const labelX = flip ? top.x - d - 8 : top.x + d + 8;
          const anchor = flip ? "end" : "start";
          const sky = lit ? project([n.x, PYLON + 130, z]) : null;
          const w = clamp(base.s * 2.4, 1, 6);
          const emitting = c.act >= 2 && i <= c.validatedTo && nt === "lit";
          return (
            <g key={n.id} className={`cn-node is-${nt}`} style={{ opacity: o }}>
              {groundRing ? <path d={groundRing} className="cn-node-ring" /> : null}
              {sky ? <polygon points={`${top.x - w},${top.y} ${top.x + w},${top.y} ${sky.x},${sky.y} ${sky.x},${sky.y}`} className="cn-node-shaft" /> : null}
              <line x1={base.x} y1={base.y} x2={top.x} y2={top.y} className="cn-node-stem" />
              {lit ? <circle cx={top.x} cy={top.y} r={d * 2.2} className="cn-node-bloom" filter={`url(#${id("bloom")})`} /> : null}
              {emitting ? <circle cx={top.x} cy={top.y} r={d * 1.6} className="cn-emit" style={{ animationDelay: `${i * -0.4}s` }} /> : null}
              <path d={`M ${top.x} ${top.y - d} L ${top.x + d} ${top.y} L ${top.x} ${top.y + d} L ${top.x - d} ${top.y} Z`} className="cn-node-mark" />
              {c.pathDistinct ? (
                <g className="cn-node-text" textAnchor={anchor}>
                  <text x={labelX} y={top.y - fs * 0.25} className="cn-node-kind" style={{ fontSize: fs * 0.72 }}>
                    {n.kind}
                  </text>
                  <text x={labelX} y={top.y + fs * 0.85} className="cn-node-label" style={{ fontSize: fs }}>
                    {n.label}
                  </text>
                  {showFinding ? (
                    <text x={labelX} y={top.y + fs * 2} className={`cn-node-finding${n.id === "web" ? " is-assumed" : ""}`} style={{ fontSize: fs * 0.72 }}>
                      {finding!.toUpperCase()}
                    </text>
                  ) : null}
                </g>
              ) : null}
            </g>
          );
        })}
      </g>

      {perimeterTag && perimeterLabel && c.pathDistinct ? (
        <text
          x={perimeterTag.x}
          y={perimeterTag.y}
          textAnchor="middle"
          className={`cn-perimeter-tag is-${tone}`}
          style={{ fontSize: font(perimeterTag.s, 3.2), opacity: visZ(0, secretZ) }}
        >
          {perimeterLabel.toUpperCase()}
        </text>
      ) : null}

      {headP ? (
        <g className={`cn-head${c.act === 1 ? " is-candidate" : ""}`} transform={`translate(${headP.x} ${headP.y})`}>
          <circle r={clamp(headP.s * 6, 8, 26)} className="cn-head-bloom" filter={`url(#${id("bloom")})`} />
          <line x1={-clamp(headP.s * 30, 30, 120)} x2={clamp(headP.s * 30, 30, 120)} className="cn-head-flare" />
          <line y1={-clamp(headP.s * 8, 8, 30)} y2={clamp(headP.s * 8, 8, 30)} className="cn-head-flare" />
          <circle r={clamp(headP.s * 1.4, 2, 5)} className="cn-head-core" />
        </g>
      ) : null}

      {scanP ? (
        <g className={`cn-scan-head is-${c.scanTone}`} transform={`translate(${scanP.x} ${scanP.y})`}>
          <circle r={clamp(scanP.s * 5, 6, 20)} filter={`url(#${id("bloom")})`} />
          <circle r={clamp(scanP.s * 14, 12, 46)} className="cn-scan-ring" />
          <circle r={clamp(scanP.s * 1.2, 1.8, 4)} className="cn-scan-core" />
        </g>
      ) : null}
    </svg>
  );
}

function CinemaStage(props: Props & { layer: "env" | "route" }) {
  return props.layer === "env" ? <EnvironmentLayer {...props} /> : <RouteLayer {...props} />;
}

export default memo(CinemaStage);
