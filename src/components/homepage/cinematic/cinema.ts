export const HOP_Z = 110;
export const WALL_HOP = 3.5;
export const WALL_Z = HOP_Z * WALL_HOP;

export type PathNode = { id: string; label: string; kind: string; x: number; finding?: string };

export const PATH_NODES: PathNode[] = [
  { id: "internet", label: "Internet", kind: "NET", x: 0 },
  { id: "alb", label: "alb-web-public", kind: "ELB", x: -46, finding: "Public :443" },
  { id: "web", label: "web-frontend", kind: "ECS", x: 34, finding: "Foothold · assumed" },
  { id: "role-web", label: "role-web-task", kind: "IAM", x: -30, finding: "Broad trust" },
  { id: "role-batch", label: "role-batch-ops", kind: "IAM", x: 42 },
  { id: "secret", label: "prod/orders-db", kind: "SECRET", x: 0, finding: "Sensitive data" },
];

export const HOPS = [
  { label: "HTTPS :443", evidence: "observed" },
  { label: "forwards", evidence: "observed" },
  { label: "task credentials", evidence: "observed" },
  { label: "sts:AssumeRole", evidence: "simulated" },
  { label: "GetSecretValue", evidence: "simulated" },
] as const;

export type InfraNode = { label: string; kind: string; x: number; z: number };

export const INFRA: InfraNode[] = [
  { label: "ec2-bastion", kind: "EC2", x: -220, z: 10 },
  { label: "vpc-prod", kind: "VPC", x: 200, z: 50 },
  { label: "cloudtrail-org", kind: "LOG", x: -290, z: 150 },
  { label: "lambda-ingest", kind: "FN", x: 240, z: 175 },
  { label: "s3-access-logs", kind: "S3", x: -210, z: 265 },
  { label: "sqs-fulfilment", kind: "SQS", x: 280, z: 300 },
  { label: "nw-exports", kind: "S3", x: 160, z: 380 },
  { label: "role-ci-deploy", kind: "IAM", x: -260, z: 430 },
  { label: "kms-orders", kind: "KMS", x: 190, z: 520 },
  { label: "rds-analytics", kind: "RDS", x: -180, z: 575 },
  { label: "eks-batch", kind: "EKS", x: 290, z: 640 },
  { label: "guardduty", kind: "SEC", x: -320, z: 720 },
  { label: "route53-prod", kind: "DNS", x: 230, z: 790 },
];

export const INFRA_LINKS: [number, number][] = [
  [0, 2], [2, 4], [4, 7], [7, 9], [9, 11], [1, 3], [3, 5], [5, 6], [6, 8], [8, 10], [10, 12],
];

/** Checks that are part of the evidence but not part of the route. */
export const BRANCH = { from: 3, infra: 6 } as const;
export const BLOCKED = { infra: 8 } as const;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function pathX(hop: number) {
  const i = Math.min(PATH_NODES.length - 2, Math.max(0, Math.floor(hop)));
  return lerp(PATH_NODES[i].x, PATH_NODES[i + 1].x, clamp(hop - i));
}

/** A deterministic constellation of background infrastructure: hundreds of plausible relationships around the route. */
export type Star = { x: number; y: number; z: number; r: number; kind: number };
function buildConstellation() {
  let s = 90210;
  const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const pts: Star[] = [];
  while (pts.length < 150) {
    const x = (rand() * 2 - 1) * 680;
    const z = -260 + rand() * 1620;
    const hop = clamp(z / HOP_Z, 0, 5);
    if (z > -40 && z < 600 && Math.abs(x - pathX(hop)) < 70) continue;
    pts.push({ x, y: rand() < 0.22 ? 10 + rand() * 46 : 0, z, r: 0.6 + rand() * 1.2, kind: Math.floor(rand() * 4) });
  }
  const links: [number, number][] = [];
  const seen = new Set<string>();
  pts.forEach((p, i) => {
    const near = pts
      .map((q, j) => ({ j, d: (q.x - p.x) ** 2 + (q.z - p.z) ** 2 }))
      .filter((n) => n.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    for (const n of near) {
      const key = i < n.j ? `${i}-${n.j}` : `${n.j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        links.push([i, n.j]);
      }
    }
  });
  return { pts, links };
}
export const CONSTELLATION = buildConstellation();

export type Cam = { x: number; z: number; h: number };
export type WallMode = "none" | "up" | "flicker" | "broken";
export type Perimeter = "hidden" | "intact" | "candidate" | "exposed" | "pending" | "sealed" | "drift" | "reassessing" | "reopened";
export type Certificate = "hidden" | "verified" | "drift" | "reassessing" | "revoked";

export const PERIMETER_LABEL: Record<Perimeter, string> = {
  hidden: "",
  intact: "Sensitive resource",
  candidate: "Candidate path · unproven",
  exposed: "Reachable · validated",
  pending: "Change applied · awaiting re-check",
  sealed: "Verified closed",
  drift: "Drift detected · not yet assessed",
  reassessing: "Reassessing",
  reopened: "Reopened · re-validated",
};

export type Cinema = {
  act: number;
  t: number;
  cam: Cam;
  /** The world materialises outward from the route as the system wakes. */
  revealR: number;
  awakening: number;
  /** Background constellation strength (unrelated nodes fade when the path ignites). */
  env: number;
  /** Depth-of-field and plane separation (0–1). */
  focus: number;
  chamber: number;
  pathDistinct: boolean;
  /** Act I discovery glow on the one dangerous relationship. */
  discovery: number;
  reach: number;
  head: boolean;
  /** Hops proven by evidence; anything beyond is still a candidate. */
  validatedTo: number;
  severedFrom: number | null;
  collapse: number;
  scan: number;
  scanTone: "verify" | "recheck";
  scanned: number;
  foothold: boolean;
  branchTag: boolean;
  blockedTag: boolean;
  wall: number;
  wallMode: WallMode;
  wallLabel: string;
  breakF: number;
  perimeter: Perimeter;
  driftWave: number;
  driftLink: boolean;
  routeAhead: boolean;
  lit: number;
  logLines: number;
  fixStep: number;
  certificate: Certificate;
  /** Second-beat copy reveal within an act. */
  beat: boolean;
};

const CLOSE: Cam = { x: -10, z: 150, h: 30 };
const WIDE: Cam = { x: 0, z: -560, h: 300 };
const START: Cam = { x: 0, z: -170, h: 62 };
const OVERVIEW: Cam = { x: 0, z: -300, h: 158 };
const WALL_CAM: Cam = { x: pathX(WALL_HOP) * 0.5, z: WALL_Z - 310, h: 92 };
const EXIT: Cam = { x: 0, z: -600, h: 260 };

function blend(a: Cam, b: Cam, t: number): Cam {
  const e = ease(clamp(t));
  return { x: lerp(a.x, b.x, e), z: lerp(a.z, b.z, e), h: lerp(a.h, b.h, e) };
}

/** Validation log line index → hop the scan has reached when that line resolves. */
export const LINE_HOP = [0, 1, 2, 2, 3, 4, 5, 5, 5, 5];
const HOP_DONE_AT_LINE = [1, 2, 4, 5, 6];
export const LOG_LENGTH = 9;

/** Pure function of scroll position (0–5): scrubbing backwards replays the film in reverse. */
export function cinemaAt(position: number): Cinema {
  const x = clamp(position, 0, 4.9999);
  const act = Math.floor(x);
  const t = x - act;

  const c: Cinema = {
    act,
    t,
    cam: START,
    revealR: 5000,
    awakening: 1,
    env: 1,
    focus: 0,
    chamber: 0,
    pathDistinct: true,
    discovery: 0,
    reach: 0,
    head: false,
    validatedTo: 0,
    severedFrom: null,
    collapse: 0,
    scan: -1,
    scanTone: "verify",
    scanned: 0,
    foothold: false,
    branchTag: false,
    blockedTag: false,
    wall: 0,
    wallMode: "none",
    wallLabel: "",
    breakF: 0,
    perimeter: "intact",
    driftWave: -1,
    driftLink: false,
    routeAhead: false,
    lit: -1,
    logLines: 0,
    fixStep: -1,
    certificate: "hidden",
    beat: false,
  };

  if (act === 0) {
    c.awakening = seg(t, 0, 0.7);
    c.revealR = lerp(260, 1900, ease(seg(t, 0.02, 0.75)));
    c.cam = blend(CLOSE, WIDE, seg(t, 0.04, 0.8));
    c.pathDistinct = false;
    c.discovery = seg(t, 0.55, 0.8);
    c.perimeter = t > 0.7 ? "intact" : "hidden";
    c.beat = t > 0.35;
    return c;
  }

  if (act === 1) {
    const h = seg(t, 0.14, 0.82) * 5;
    c.env = 1 - 0.72 * seg(t, 0.06, 0.26);
    c.focus = seg(t, 0.1, 0.3) * (1 - seg(t, 0.84, 1)) * 0.6;
    c.reach = h;
    c.head = h > 0 && h < 5;
    c.lit = h > 0 ? Math.floor(h + 0.02) : -1;
    c.routeAhead = h > 0 && h < 5;
    const follow: Cam = { x: pathX(h) * 0.5, z: h * HOP_Z - 170, h: 62 };
    c.cam = t < 0.14 ? blend(WIDE, START, seg(t, 0, 0.14)) : t < 0.84 ? follow : blend(follow, OVERVIEW, seg(t, 0.84, 1));
    c.perimeter = h >= 4.99 ? "candidate" : "intact";
    c.beat = t > 0.8;
    return c;
  }

  c.lit = 5;
  c.env = 0.28;

  if (act === 2) {
    c.reach = 5;
    c.perimeter = "candidate";
    c.chamber = seg(t, 0.04, 0.16) * (1 - seg(t, 0.9, 1));
    c.focus = c.chamber;
    const s = seg(t, 0.12, 0.86) * LOG_LENGTH;
    const li = Math.min(LOG_LENGTH - 1, Math.floor(s));
    c.logLines = Math.min(LOG_LENGTH, Math.floor(s) + 1);
    c.scan = s < LOG_LENGTH ? lerp(LINE_HOP[li], LINE_HOP[li + 1], s - li) : -1;
    c.scanned = HOP_DONE_AT_LINE.filter((n) => Math.floor(s) >= n).length;
    c.validatedTo = c.scanned;
    c.foothold = Math.floor(s) >= 3;
    c.branchTag = Math.floor(s) >= 7;
    c.blockedTag = Math.floor(s) >= 8;
    if (s >= LOG_LENGTH) c.perimeter = "exposed";
    c.cam = blend({ x: 0, z: 5 * HOP_Z - 170, h: 62 }, OVERVIEW, seg(t, 0, 0.25));
    c.beat = t > 0.86;
    return c;
  }

  c.scanned = 5;
  c.validatedTo = 5;
  c.foothold = true;
  c.branchTag = true;
  c.blockedTag = true;
  c.logLines = LOG_LENGTH;

  if (act === 3) {
    c.reach = 5;
    c.perimeter = "exposed";
    c.fixStep = t < 0.06 ? 0 : t < 0.2 ? 1 : t < 0.34 ? 2 : t < 0.5 ? 3 : t < 0.7 ? 4 : 5;
    c.wall = seg(t, 0.36, 0.48);
    c.wallMode = c.wall > 0 ? "up" : "none";
    c.wallLabel = "Change applied by your team";
    if (t >= 0.48) c.perimeter = "pending";
    if (t >= 0.5 && t < 0.66) {
      c.scanTone = "recheck";
      c.scan = seg(t, 0.5, 0.66) * WALL_HOP;
    }
    if (t >= 0.66) {
      c.reach = WALL_HOP;
      c.severedFrom = WALL_HOP;
      c.collapse = seg(t, 0.66, 0.82);
      c.wallLabel = "Re-check · AssumeRole denied";
    }
    if (t >= 0.72) {
      c.perimeter = "sealed";
      c.certificate = "verified";
    }
    c.focus = c.fixStep >= 4 && t < 0.72 ? 0.35 : 0;
    c.cam = t < 0.8 ? blend(OVERVIEW, WALL_CAM, seg(t, 0.3, 0.5)) : blend(WALL_CAM, OVERVIEW, seg(t, 0.8, 1));
    c.beat = t > 0.72;
    return c;
  }

  c.wall = 1;
  c.wallMode = "up";
  c.reach = WALL_HOP;
  c.severedFrom = WALL_HOP;
  c.collapse = 1;
  c.perimeter = "sealed";
  c.certificate = "verified";
  c.wallLabel = "Verified closed";
  c.cam = t < 0.84 ? blend(OVERVIEW, WALL_CAM, seg(t, 0.12, 0.36)) : blend(WALL_CAM, EXIT, seg(t, 0.84, 1));
  c.env = t < 0.18 ? lerp(0.28, 0.6, seg(t, 0, 0.12)) : 0.28 + 0.62 * seg(t, 0.84, 1);

  if (t >= 0.18) {
    c.perimeter = "drift";
    c.certificate = "drift";
    c.driftWave = seg(t, 0.18, 0.4);
    c.driftLink = true;
    c.wallLabel = "Trust policy changed";
  }
  if (t >= 0.38) {
    c.perimeter = "reassessing";
    c.certificate = "reassessing";
    c.wallMode = "flicker";
    c.scanTone = "recheck";
    c.scan = seg(t, 0.38, 0.58) * 5;
    c.wallLabel = "Reassessing";
  }
  if (t >= 0.58) {
    c.scan = -1;
    c.wallMode = "broken";
    c.breakF = seg(t, 0.58, 0.74);
    c.reach = WALL_HOP + seg(t, 0.6, 0.76) * (5 - WALL_HOP);
    c.head = c.reach < 5;
    c.severedFrom = c.reach < 5 ? c.reach : null;
    c.collapse = 0;
    c.driftLink = false;
    c.perimeter = c.reach >= 4.99 ? "reopened" : "reassessing";
    c.certificate = c.reach >= 4.99 ? "revoked" : "reassessing";
  }
  c.beat = t > 0.62;
  return c;
}
