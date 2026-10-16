import { memo, type KeyboardEvent } from "react";
import { CONSTELLATION } from "../cinematic/cinema";
import {
  CLAIMS,
  EVIDENCE_CLAIMS,
  POINTS,
  ROUTE,
  STATE_LABEL,
  isResolved,
  type Anchor,
  type Cam,
  type Claim,
  type Proof,
} from "./proofModel";

export type Layout = "wide" | "tall";
type V3 = [number, number, number];
type P2 = { x: number; y: number; s: number };

const VIEW: Record<Layout, { W: number; H: number; f: number; hz: number; xs: number; type: number }> = {
  wide: { W: 1600, H: 900, f: 860, hz: 300, xs: 1, type: 1 },
  tall: { W: 500, H: 1000, f: 780, hz: 330, xs: 0.5, type: 1.12 },
};

const LIFT = 72;
const EVID = 168;
const NEAR = 28;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const f1 = (n: number) => n.toFixed(1);

function makeProjector(cam: Cam, layout: Layout, hzShift = 0) {
  const v = VIEW[layout];
  const hz = v.hz + hzShift;
  const project = ([x, y, z]: V3): P2 | null => {
    const dz = z - cam.z;
    if (dz < NEAR) return null;
    const s = v.f / dz;
    return { x: v.W / 2 + (x - cam.x) * v.xs * s, y: hz + (cam.h - y) * s, s };
  };
  const fog = (z: number) => 1 - seg(z - cam.z, 900, 1700);
  const font = (s: number, base = 6.4) => clamp(s * base * v.type, 10, 13.5 * v.type);
  return { project, fog, font, v };
}

const pos3 = (a: Anchor, open: number): V3 => [a.x, a.layer * LIFT * open, a.z];

/** Closed capsule outline around a polyline on the ground plane. */
function capsule(keys: string[], r: number): V3[] {
  const pts = keys.map((k) => POINTS[k]);
  const samples: { x: number; z: number; nx: number; nz: number }[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const len = Math.hypot(b.x - a.x, b.z - a.z);
    const tx = (b.x - a.x) / len;
    const tz = (b.z - a.z) / len;
    const n = Math.max(2, Math.ceil(len / 14));
    for (let k = 0; k < n; k++) {
      const u = k / n;
      samples.push({ x: lerp(a.x, b.x, u), z: lerp(a.z, b.z, u), nx: -tz, nz: tx });
    }
  }
  const last = pts[pts.length - 1];
  const prev = samples[samples.length - 1];
  samples.push({ x: last.x, z: last.z, nx: prev.nx, nz: prev.nz });
  const smooth = samples.map((s, i) => {
    const a = samples[Math.max(0, i - 3)];
    const b = samples[Math.min(samples.length - 1, i + 3)];
    const nx = a.nx + s.nx + b.nx;
    const nz = a.nz + s.nz + b.nz;
    const l = Math.hypot(nx, nz) || 1;
    return { ...s, nx: nx / l, nz: nz / l };
  });
  const left = smooth.map((s): V3 => [s.x + s.nx * r, 0, s.z + s.nz * r]);
  const right = smooth.map((s): V3 => [s.x - s.nx * r, 0, s.z - s.nz * r]).reverse();
  const cap = (c: { x: number; z: number; nx: number; nz: number }, from: number): V3[] =>
    Array.from({ length: 11 }, (_, k) => {
      const ang = Math.atan2(c.nz, c.nx) + from + (k / 10) * Math.PI;
      return [c.x + Math.cos(ang) * r, 0, c.z + Math.sin(ang) * r];
    });
  const end = smooth[smooth.length - 1];
  const start = smooth[0];
  return [...left, ...cap(end, -Math.PI).reverse(), ...right, ...cap(start, 0).reverse()];
}

const BOUNDARY_OUTER = capsule(ROUTE, 44);
const BOUNDARY_OBSERVED = capsule(ROUTE.slice(0, 4), 26);

function pathD(points: V3[], project: (p: V3) => P2 | null) {
  let d = "";
  for (const p of points) {
    const q = project(p);
    if (!q) return "";
    d += `${d ? "L" : "M"}${f1(q.x)} ${f1(q.y)}`;
  }
  return `${d}Z`;
}

type Phase = "latent" | "candidate" | "provisional" | "attached" | "verifying" | Claim["state"];

function phaseOf(c: Claim, p: Proof): Phase {
  if (isResolved(p, c)) return c.state;
  if (p.stage === 2 && p.resolved === c.line) return "verifying";
  if (p.stage === 0) return c.onRoute ? "candidate" : "latent";
  const k = EVIDENCE_CLAIMS.indexOf(c);
  if (k >= 0 && p.evidence[k] >= 1) return "attached";
  return c.onRoute ? "provisional" : "latent";
}

const NODE_SHAPE: Record<string, "diamond" | "hex" | "circle" | "square"> = {
  IAM: "diamond",
  SECRET: "hex",
  NET: "circle",
};

function shape(kind: string, x: number, y: number, r: number) {
  const k = NODE_SHAPE[kind] ?? "square";
  if (k === "circle") return <circle cx={x} cy={y} r={r} />;
  if (k === "diamond") return <path d={`M${f1(x)} ${f1(y - r * 1.25)}L${f1(x + r * 1.25)} ${f1(y)}L${f1(x)} ${f1(y + r * 1.25)}L${f1(x - r * 1.25)} ${f1(y)}Z`} />;
  if (k === "hex") {
    const d = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      return `${i ? "L" : "M"}${f1(x + Math.cos(a) * r * 1.2)} ${f1(y + Math.sin(a) * r * 1.2)}`;
    }).join("");
    return <path d={`${d}Z`} />;
  }
  return <rect x={x - r} y={y - r} width={r * 2} height={r * 2} rx={r * 0.3} />;
}

type Box = { x0: number; y0: number; x1: number; y1: number };
type Lbl = {
  key: string;
  text: string;
  x: number;
  y: number;
  fs: number;
  cls: string;
  pri: number;
  anchor?: "start" | "middle" | "end";
  wrap?: string;
  opacity?: number;
  /** letter-spacing in em, used to estimate rendered width */
  ls?: number;
  keep?: boolean;
};

const MONO_ADVANCE = 0.6;
const hits = (a: Box, b: Box) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

function boxOf(l: Lbl, dy: number): Box {
  const w = l.text.length * l.fs * (MONO_ADVANCE + (l.ls ?? 0.02));
  const x0 = l.anchor === "middle" ? l.x - w / 2 : l.anchor === "end" ? l.x - w : l.x;
  const y = l.y + dy;
  return { x0: x0 - 3, x1: x0 + w + 3, y0: y - l.fs * 0.85 - 2, y1: y + l.fs * 0.25 + 2 };
}

/** Greedy placement: highest priority first, nudge vertically, drop what still collides. */
function placeLabels(labels: Lbl[], obstacles: Box[]) {
  const taken = [...obstacles];
  return [...labels]
    .sort((a, b) => b.pri - a.pri)
    .map((l) => {
      const step = l.fs * 1.3;
      let dy: number | null = null;
      for (const d of [0, -step, step]) {
        const b = boxOf(l, d);
        if (!taken.some((t) => hits(b, t))) {
          dy = d;
          taken.push(b);
          break;
        }
      }
      if (dy === null && l.keep) {
        dy = 0;
        taken.push(boxOf(l, 0));
      }
      if (dy === null) return null;
      return (
        <g key={l.key} className={l.wrap} opacity={l.opacity}>
          <text className={l.cls} x={f1(l.x)} y={f1(l.y + dy)} fontSize={l.fs} textAnchor={l.anchor ?? "start"}>
            {l.text}
          </text>
        </g>
      );
    });
}

type Props = {
  proof: Proof;
  layout: Layout;
  selected: string | null;
  interactive: boolean;
  onSelect: (id: string) => void;
};

function ProofStage({ proof: p, layout, selected, interactive, onSelect }: Props) {
  const tall = layout === "tall";
  const dockRise = p.stage >= 4 ? 1 : p.stage === 3 ? seg(p.t, 0, 0.4) : 0;
  const { project, fog, font, v } = makeProjector(p.cam, layout, tall ? -190 * dockRise : 0);
  const open = p.open;

  const bg = CONSTELLATION.pts.map((pt) => {
    const q = project([pt.x, pt.y, pt.z + 120]);
    return q ? { q, a: fog(pt.z + 120) * p.env, r: pt.r } : null;
  });

  const planeQuad = (y: number, x0: number, x1: number, z0: number, z1: number) => {
    const c = ([[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]] as V3[]).map(project);
    if (c.some((q) => !q)) return null;
    return { d: `M${c.map((q) => `${f1(q!.x)} ${f1(q!.y)}`).join("L")}Z`, label: c[0]! };
  };
  const planes = [
    { key: "infra", name: "Infrastructure", y: 0, x0: -190, x1: 250, show: 0.35 + open * 0.65 },
    { key: "perm", name: "Permissions", y: LIFT * open, x0: -120, x1: 120, show: open },
    ...(tall ? [] : [{ key: "evid", name: "Evidence", y: EVID * open, x0: -230, x1: 230, show: open * p.cards }]),
  ].map((pl) => ({ ...pl, quad: pl.show > 0.02 ? planeQuad(pl.y, pl.x0, pl.x1, -60, 610) : null }));

  const keyHandler = (id: string) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(id);
    }
  };

  const outerD = p.boundary > 0 ? pathD(BOUNDARY_OUTER, project) : "";
  const innerD = p.boundary > 0 ? pathD(BOUNDARY_OBSERVED, project) : "";
  const tagAt = project([POINTS.n0.x - 70, 0, POINTS.n0.z - 34]);
  const assumeTag = project([POINTS.n2.x + 64, 0, POINTS.n2.z]);

  const pulsePoint = (() => {
    if (p.pulse < 0) return null;
    const i = Math.min(ROUTE.length - 2, Math.floor(p.pulse));
    const a = POINTS[ROUTE[i]];
    const b = POINTS[ROUTE[i + 1]];
    const u = clamp(p.pulse - i);
    return project([lerp(a.x, b.x, u), 0, lerp(a.z, b.z, u)]);
  })();

  const labels: Lbl[] = [];
  const obstacles: Box[] = [];

  const nodeEls = Object.entries(POINTS).map(([k, a]) => {
    const q = project(pos3(a, open));
    if (!q) return null;
    const r = clamp(7 * q.s, 4.5, 11);
    const crown = a.kind === "SECRET";
    const side = !ROUTE.includes(k);
    const fs = font(q.s, 5.8);
    const wrap = `pe-node${crown ? " is-crown" : ""}${side ? " is-side" : ""}`;
    const nodeOpacity = side && p.stage < 2 ? 0.45 : 1;
    const ext = r * 1.35;
    obstacles.push({ x0: q.x - ext, x1: q.x + ext, y0: q.y - ext, y1: q.y + ext });
    labels.push({
      key: `n-${k}`,
      text: a.label,
      x: q.x,
      y: q.y - r * 1.5 - 5,
      fs,
      cls: "pe-node-label",
      wrap,
      opacity: nodeOpacity,
      anchor: "middle",
      pri: crown ? 90 : side ? 55 : 80,
      keep: crown,
    });
    if (!tall) {
      labels.push({
        key: `nk-${k}`,
        text: a.kind,
        x: q.x,
        y: q.y - r * 1.5 - 5 - fs * 1.05,
        fs: fs * 0.72,
        cls: "pe-node-kind",
        wrap,
        opacity: nodeOpacity,
        anchor: "middle",
        ls: 0.2,
        pri: 20,
      });
    }
    return (
      <g key={k} className={wrap} opacity={nodeOpacity}>
        {crown ? <circle cx={q.x} cy={q.y} r={r * 6} fill={`url(#pe-core-${layout})`} className="pe-crown-glow" /> : null}
        <g className="pe-node-shape">{shape(a.kind, q.x, q.y, r)}</g>
      </g>
    );
  });

  const claimEls = CLAIMS.map((c) => {
    const phase = phaseOf(c, p);
    const A = pos3(POINTS[c.a], open);
    const pa = project(A);
    if (!pa) return null;
    const isSel = selected === c.id;
    const dim = selected && !isSel ? " is-dim" : "";
    const sel = isSel ? " is-selected" : "";
    const showOutside = !c.onRoute && p.outside > 0;
    const tag = isResolved(p, c) ? STATE_LABEL[c.state] : null;
    const interactiveProps = interactive
      ? {
          role: "button" as const,
          tabIndex: 0,
          "aria-label": `${c.step}: ${STATE_LABEL[c.state]}`,
          "aria-pressed": isSel,
          onClick: () => onSelect(c.id),
          onKeyDown: keyHandler(c.id),
        }
      : { "aria-hidden": true as const };

    if (!c.b) {
      const r = clamp(22 * pa.s, 12, 30);
      const wrap = `pe-claim pe-claim--node is-${phase}${dim}${sel}`;
      if (tag) {
        labels.push({
          key: `t-${c.id}`,
          text: tag,
          x: pa.x,
          y: pa.y + r + font(pa.s) + 4,
          fs: font(pa.s, 5.2),
          cls: "pe-tag",
          wrap,
          anchor: "middle",
          ls: 0.14,
          pri: isSel ? 100 : 70,
          keep: isSel,
        });
      }
      return (
        <g key={c.id} className={wrap} {...interactiveProps}>
          <circle cx={pa.x} cy={pa.y} r={r + 10} className="pe-hit" />
          <circle cx={pa.x} cy={pa.y} r={r} className="pe-ring" />
        </g>
      );
    }

    const B = pos3(POINTS[c.b], open);
    const pb = project(B);
    if (!pb) return null;
    const mx = (pa.x + pb.x) / 2;
    const my = (pa.y + pb.y) / 2;
    const bend = c.onRoute ? 0 : -18 * Math.min(pa.s, pb.s);
    const d = `M${f1(pa.x)} ${f1(pa.y)}Q${f1(mx)} ${f1(my + bend)} ${f1(pb.x)} ${f1(pb.y)}`;
    const ms = (pa.s + pb.s) / 2;
    const labelSide = c.onRoute ? (POINTS[c.b].x > POINTS[c.a].x ? 1 : -1) : 1;
    const lx = mx + labelSide * clamp(14 * ms, 10, 22);
    const anchor = labelSide > 0 ? "start" : "end";
    const showLabel = !tall || p.stage <= 2 || isSel;
    const wrap = `pe-claim is-${phase}${dim}${sel}${showOutside ? " is-outside" : ""}`;
    if (showLabel) {
      labels.push({
        key: `e-${c.id}`,
        text: c.label,
        x: lx,
        y: my - 2,
        fs: font(ms, 5),
        cls: "pe-edge-label",
        wrap,
        anchor,
        ls: 0.04,
        pri: isSel ? 99 : 40,
        keep: isSel,
      });
    }
    if (tag) {
      labels.push({
        key: `t-${c.id}`,
        text: showOutside ? `${tag} · outside` : tag,
        x: lx,
        y: my + font(ms, 5) + (showLabel ? 2 : -2),
        fs: font(ms, 4.8),
        cls: "pe-tag",
        wrap,
        anchor,
        ls: 0.14,
        pri: isSel ? 100 : showOutside ? 50 : 70,
        keep: isSel,
      });
    }
    return (
      <g key={c.id} className={wrap} {...interactiveProps}>
        <path d={d} className="pe-hit" />
        <path d={d} className="pe-halo" />
        <path d={d} className="pe-line" />
        {phase === "verifying" ? <path d={d} className="pe-sweep" pathLength={1} /> : null}
        {c.state === "blocked" && tag ? (
          <g className="pe-x" transform={`translate(${f1(mx)} ${f1(my + bend / 2)})`}>
            <path d="M-5 -5L5 5M5 -5L-5 5" />
          </g>
        ) : null}
      </g>
    );
  });

  return (
    <svg
      className={`pe-svg pe-svg--${layout}`}
      viewBox={`0 0 ${v.W} ${v.H}`}
      preserveAspectRatio="xMidYMid slice"
      role="group"
      aria-label="AP-12 attack path in the proof chamber"
      data-selected={selected ? "" : undefined}
    >
      <defs>
        <radialGradient id={`pe-core-${layout}`}>
          <stop offset="0" stopColor="var(--pe-ink)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--pe-ink)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`pe-holo-${layout}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--pe-magenta)" stopOpacity="0.16" />
          <stop offset="1" stopColor="var(--pe-magenta)" stopOpacity="0.02" />
        </linearGradient>
        <pattern id={`pe-scan-${layout}`} width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 5.5H6" stroke="var(--pe-magenta)" strokeOpacity="0.16" strokeWidth="0.8" />
        </pattern>
      </defs>

      <g aria-hidden="true">
        <g className="pe-bg-links">
          {CONSTELLATION.links.map(([i, j]) => {
            const a = bg[i];
            const b = bg[j];
            if (!a || !b) return null;
            const op = Math.min(a.a, b.a) * 0.2;
            return op > 0.01 ? <line key={`${i}-${j}`} x1={f1(a.q.x)} y1={f1(a.q.y)} x2={f1(b.q.x)} y2={f1(b.q.y)} opacity={op.toFixed(3)} /> : null;
          })}
        </g>
        <g className="pe-bg-pts">
          {bg.map((b, i) => (b && b.a > 0.02 ? <circle key={i} cx={f1(b.q.x)} cy={f1(b.q.y)} r={f1(clamp(b.r * b.q.s * 1.4, 0.5, 2.6))} opacity={b.a * 0.7} /> : null))}
        </g>

        {planes.map((pl) =>
          pl.quad ? (
            <g key={pl.key} className={`pe-plane pe-plane--${pl.key}`} opacity={pl.show}>
              <path d={pl.quad.d} />
              {open > 0.4 ? (
                <text x={pl.quad.label.x + 10} y={pl.quad.label.y - 10} fontSize={font(pl.quad.label.s, 5.6)}>
                  {pl.name}
                </text>
              ) : null}
            </g>
          ) : null,
        )}

        {p.boundary > 0 && outerD ? (
          <g className="pe-boundary" style={{ opacity: seg(p.boundary, 0, 0.25) }}>
            <path d={outerD} className="pe-boundary-fill" fill={`url(#pe-holo-${layout})`} />
            <path d={outerD} className="pe-boundary-scan" fill={`url(#pe-scan-${layout})`} />
            <path d={innerD} className="pe-boundary-core" />
            <path d={outerD} className="pe-boundary-glow" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p.boundary} />
            <path d={outerD} className="pe-boundary-edge" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p.boundary} />
            {tagAt && p.boundary > 0.6 ? (
              <text className="pe-boundary-tag" x={tagAt.x} y={tagAt.y} fontSize={font(tagAt.s, 6)} textAnchor="middle">
                Proof boundary
              </text>
            ) : null}
            {assumeTag && p.boundary > 0.85 && !tall ? (
              <text className="pe-boundary-note" x={assumeTag.x} y={assumeTag.y} fontSize={font(assumeTag.s, 5.4)}>
                rests on 1 stated assumption
              </text>
            ) : null}
          </g>
        ) : null}

        {open > 0.05
          ? Object.entries(POINTS)
              .filter(([, a]) => a.layer === 1)
              .map(([k, a]) => {
                const top = project(pos3(a, open));
                const foot = project([a.x, 0, a.z]);
                return top && foot ? <line key={k} className="pe-riser" x1={f1(foot.x)} y1={f1(foot.y)} x2={f1(top.x)} y2={f1(top.y)} opacity={open} /> : null;
              })
          : null}
      </g>

      <g className="pe-claims">{claimEls}</g>

      <g className="pe-nodes" aria-hidden="true">
        {nodeEls}
      </g>

      <g className="pe-labels" aria-hidden="true">
        {placeLabels(labels, obstacles)}
      </g>

      {p.cards > 0.01 ? (
        <g className="pe-evidence" aria-hidden="true" opacity={p.cards}>
          {EVIDENCE_CLAIMS.map((c, k) => {
            const e = p.evidence[k];
            if (e <= 0) return null;
            const side = k % 2 === 0 ? -1 : 1;
            const A = c.b
              ? (() => {
                  const a = pos3(POINTS[c.a], open);
                  const b = pos3(POINTS[c.b!], open);
                  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2] as V3;
                })()
              : pos3(POINTS[c.a], open);
            const pa = project(A);
            const pc = project([A[0] + side * (tall ? 72 : 150), EVID * open, A[2]]);
            if (!pa || !pc) return null;
            const appear = seg(e, 0, 0.4);
            const travel = seg(e, 0.4, 1);
            const resolved = isResolved(p, c);
            const dot = { x: lerp(pc.x, pa.x, travel), y: lerp(pc.y, pa.y, travel) };
            const stateCls = resolved ? ` is-${c.state}` : "";
            return (
              <g key={c.id} className={`pe-ev${stateCls}${e >= 1 ? " is-attached" : ""}`} opacity={appear}>
                <line className="pe-ev-wire" x1={f1(pc.x)} y1={f1(pc.y)} x2={f1(lerp(pc.x, pa.x, Math.max(travel, 0.001)))} y2={f1(lerp(pc.y, pa.y, Math.max(travel, 0.001)))} />
                {travel > 0 && travel < 1 ? <circle className="pe-ev-signal" cx={dot.x} cy={dot.y} r={tall ? 4 : 4.5} /> : null}
                {e >= 1 && !resolved ? <circle className="pe-ev-hit" cx={pa.x} cy={pa.y} r={10} /> : null}
                {tall ? (
                  <g className="pe-ev-chip">
                    <circle cx={pc.x} cy={pc.y} r={13} />
                    <text x={pc.x} y={pc.y + 4.5} textAnchor="middle">
                      {k + 1}
                    </text>
                  </g>
                ) : (
                  (() => {
                    const sc = clamp(pc.s * 0.85, 0.78, 1.15);
                    const w = 214 * sc;
                    const h = 50 * sc;
                    const x = pc.x - w / 2;
                    const y = pc.y - h;
                    return (
                      <g className="pe-ev-card">
                        <rect x={x} y={y} width={w} height={h} rx={7 * sc} />
                        <rect x={x} y={y} width={3 * sc} height={h} rx={1.5 * sc} className="pe-ev-bar" />
                        <text x={x + 14 * sc} y={y + 19 * sc} fontSize={10 * sc} className="pe-ev-type">
                          {String(k + 1).padStart(2, "0")} · {c.evidence!.type}
                        </text>
                        <text x={x + 14 * sc} y={y + 37 * sc} fontSize={12.5 * sc} className="pe-ev-detail">
                          {c.evidence!.detail}
                        </text>
                      </g>
                    );
                  })()
                )}
              </g>
            );
          })}
        </g>
      ) : null}

      {pulsePoint ? (
        <g className="pe-pulse" aria-hidden="true">
          <circle cx={pulsePoint.x} cy={pulsePoint.y} r={clamp(16 * pulsePoint.s, 8, 26)} className="pe-pulse-glow" />
          <circle cx={pulsePoint.x} cy={pulsePoint.y} r={clamp(3.2 * pulsePoint.s, 2.2, 5)} className="pe-pulse-core" />
        </g>
      ) : null}
    </svg>
  );
}

export default memo(ProofStage);
