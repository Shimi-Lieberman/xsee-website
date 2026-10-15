export const HOP_Z = 110;
export const WALL_HOP = 3.5;
export const WALL_Z = HOP_Z * WALL_HOP;

export type PathNode = { id: string; label: string; kind: string; x: number; finding?: string };

export const PATH_NODES: PathNode[] = [
  { id: "internet", label: "Internet", kind: "NET", x: 0 },
  { id: "alb", label: "alb-web-public", kind: "ELB", x: -46, finding: "Public :443" },
  { id: "web", label: "web-frontend", kind: "ECS", x: 34, finding: "Foothold assumed" },
  { id: "role-web", label: "role-web-task", kind: "IAM", x: -30, finding: "Broad trust" },
  { id: "role-batch", label: "role-batch-ops", kind: "IAM", x: 42 },
  { id: "secret", label: "prod/orders-db", kind: "SECRET", x: 0, finding: "Crown jewel" },
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

export type Cam = { x: number; z: number; h: number };
export type WallMode = "none" | "up" | "flicker" | "broken";
export type Perimeter = "hidden" | "intact" | "breached" | "sealed" | "reassessing";

export type Cinema = {
  act: number;
  t: number;
  cam: Cam;
  /** World z up to which the environment has materialised. */
  reveal: number;
  gridAlpha: number;
  /** How far the attack beam has advanced, in hops (0–5). */
  reach: number;
  head: boolean;
  /** Hops beyond this point are cut off by the trust boundary. */
  severedFrom: number | null;
  /** Validation scan position in hops, or -1 when idle. */
  scan: number;
  scanned: number;
  foothold: boolean;
  wall: number;
  wallMode: WallMode;
  breakF: number;
  perimeter: Perimeter;
  hint: number;
  routeAhead: boolean;
  lit: number;
  pathDistinct: boolean;
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function pathX(hop: number) {
  const i = Math.min(PATH_NODES.length - 2, Math.max(0, Math.floor(hop)));
  return lerp(PATH_NODES[i].x, PATH_NODES[i + 1].x, clamp(hop - i));
}

const FAR: Cam = { x: 0, z: -820, h: 260 };
const START: Cam = { x: 0, z: -170, h: 62 };
const OVERVIEW: Cam = { x: 0, z: -290, h: 150 };
const WALL_CAM: Cam = { x: pathX(WALL_HOP) * 0.6, z: WALL_Z - 215, h: 56 };
const EXIT: Cam = { x: 0, z: -560, h: 240 };

function blend(a: Cam, b: Cam, t: number): Cam {
  const e = ease(clamp(t));
  return { x: lerp(a.x, b.x, e), z: lerp(a.z, b.z, e), h: lerp(a.h, b.h, e) };
}

const LINE_TO_HOP = [0, 1, 2, 2, 3, 4, 5, 5];
const HOP_DONE_AT_LINE = [1, 2, 4, 5, 6];

/** Pure function of scroll position (0–5): scrubbing backwards replays the story in reverse. */
export function cinemaAt(position: number): Cinema {
  const x = clamp(position, 0, 4.9999);
  const act = Math.floor(x);
  const t = x - act;

  const c: Cinema = {
    act,
    t,
    cam: START,
    reveal: 4000,
    gridAlpha: 1,
    reach: 0,
    head: false,
    severedFrom: null,
    scan: -1,
    scanned: 0,
    foothold: false,
    wall: 0,
    wallMode: "none",
    breakF: 0,
    perimeter: "intact",
    hint: 0,
    routeAhead: false,
    lit: -1,
    pathDistinct: true,
  };

  if (act === 0) {
    c.cam = blend(FAR, START, t);
    c.reveal = lerp(-260, 950, seg(t, 0, 0.8));
    c.gridAlpha = seg(t, 0, 0.3);
    c.pathDistinct = false;
    c.hint = seg(t, 0.5, 0.85);
    c.perimeter = t > 0.62 ? "intact" : "hidden";
    return c;
  }

  if (act === 1) {
    const h = seg(t, 0.06, 0.9) * 5;
    c.reach = h;
    c.head = h > 0 && h < 5;
    c.lit = Math.floor(h + 0.02);
    c.routeAhead = h < 5;
    c.cam = { x: pathX(h) * 0.5, z: h * HOP_Z - 170, h: 62 };
    c.perimeter = h >= 4.99 ? "breached" : "intact";
    return c;
  }

  c.lit = 5;

  if (act === 2) {
    c.reach = 5;
    c.perimeter = "breached";
    const s = seg(t, 0.05, 0.85) * 7;
    const li = Math.min(6, Math.floor(s));
    c.scan = s < 7 ? lerp(LINE_TO_HOP[li], LINE_TO_HOP[li + 1], s - li) : -1;
    c.scanned = HOP_DONE_AT_LINE.filter((n) => Math.floor(s) >= n).length;
    c.foothold = Math.floor(s) >= 3;
    c.cam = blend({ x: 0, z: 5 * HOP_Z - 170, h: 62 }, OVERVIEW, seg(t, 0, 0.3));
    return c;
  }

  c.scanned = 5;
  c.foothold = true;

  if (act === 3) {
    c.reach = 5;
    c.wall = seg(t, 0.38, 0.55);
    c.wallMode = c.wall > 0 ? "up" : "none";
    if (t >= 0.55) {
      c.reach = WALL_HOP;
      c.severedFrom = WALL_HOP;
      c.perimeter = "sealed";
    } else c.perimeter = "breached";
    c.cam = t < 0.75 ? blend(OVERVIEW, WALL_CAM, seg(t, 0.08, 0.45)) : blend(WALL_CAM, OVERVIEW, seg(t, 0.75, 1));
    return c;
  }

  c.cam = t < 0.8 ? blend(OVERVIEW, WALL_CAM, seg(t, 0.1, 0.4)) : blend(WALL_CAM, EXIT, seg(t, 0.8, 1));
  c.wall = 1;
  if (t < 0.42) {
    c.wallMode = "up";
    c.reach = WALL_HOP;
    c.severedFrom = WALL_HOP;
    c.perimeter = "sealed";
  } else if (t < 0.62) {
    c.wallMode = "flicker";
    c.reach = WALL_HOP;
    c.severedFrom = WALL_HOP;
    c.perimeter = "reassessing";
  } else {
    c.wallMode = "broken";
    c.breakF = seg(t, 0.62, 0.8);
    c.reach = WALL_HOP + seg(t, 0.64, 0.8) * (5 - WALL_HOP);
    c.head = c.reach < 5;
    c.severedFrom = c.reach < 5 ? c.reach : null;
    c.perimeter = c.reach >= 4.99 ? "breached" : "reassessing";
  }
  return c;
}
