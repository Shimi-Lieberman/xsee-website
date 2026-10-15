export type Layout = "wide" | "tall";

export type NodeRole = "path" | "assumption" | "branch" | "infra";

export type GraphNode = {
  id: string;
  label: string;
  kind: string;
  role: NodeRole;
  pos: Record<Layout, [number, number]>;
};

export type GraphEdge = {
  id: string;
  from: string;
  to: string;
  label?: string;
  role: "path" | "branch" | "infra";
};

export const WORLD: Record<Layout, { w: number; h: number }> = {
  wide: { w: 1000, h: 620 },
  tall: { w: 600, h: 780 },
};

export const NODES: GraphNode[] = [
  { id: "internet", label: "Internet", kind: "NET", role: "path", pos: { wide: [70, 300], tall: [300, 50] } },
  { id: "alb", label: "alb-web-public", kind: "ELB", role: "path", pos: { wide: [210, 300], tall: [300, 165] } },
  { id: "web", label: "web-frontend", kind: "ECS", role: "path", pos: { wide: [360, 300], tall: [300, 285] } },
  { id: "foothold", label: "Assumed foothold", kind: "ASM", role: "assumption", pos: { wide: [360, 460], tall: [105, 310] } },
  { id: "role-web", label: "role-web-task", kind: "IAM", role: "path", pos: { wide: [520, 300], tall: [300, 410] } },
  { id: "role-batch", label: "role-batch-ops", kind: "IAM", role: "path", pos: { wide: [680, 210], tall: [300, 545] } },
  { id: "secret", label: "prod/orders-db", kind: "SEC", role: "path", pos: { wide: [860, 210], tall: [300, 690] } },
  { id: "bucket", label: "nw-exports", kind: "S3", role: "branch", pos: { wide: [680, 410], tall: [495, 455] } },
  { id: "ec2", label: "ec2-bastion", kind: "EC2", role: "infra", pos: { wide: [70, 130], tall: [100, 80] } },
  { id: "vpc", label: "vpc-prod", kind: "VPC", role: "infra", pos: { wide: [210, 140], tall: [500, 95] } },
  { id: "lambda", label: "lambda-ingest", kind: "FN", role: "infra", pos: { wide: [360, 120], tall: [500, 245] } },
  { id: "s3logs", label: "s3-access-logs", kind: "S3", role: "infra", pos: { wide: [520, 110], tall: [100, 445] } },
  { id: "kms", label: "kms-orders", kind: "KMS", role: "infra", pos: { wide: [860, 70], tall: [500, 690] } },
  { id: "rds", label: "rds-analytics", kind: "RDS", role: "infra", pos: { wide: [860, 390], tall: [500, 580] } },
  { id: "sqs", label: "sqs-fulfilment", kind: "SQS", role: "infra", pos: { wide: [520, 500], tall: [100, 590] } },
  { id: "cicd", label: "role-ci-deploy", kind: "IAM", role: "infra", pos: { wide: [700, 545], tall: [100, 720] } },
  { id: "trail", label: "cloudtrail-org", kind: "LOG", role: "infra", pos: { wide: [200, 500], tall: [100, 185] } },
  { id: "eks", label: "eks-batch", kind: "EKS", role: "infra", pos: { wide: [880, 540], tall: [500, 760] } },
];

export const EDGES: GraphEdge[] = [
  { id: "e-ingress", from: "internet", to: "alb", label: "HTTPS :443", role: "path" },
  { id: "e-forward", from: "alb", to: "web", label: "forwards", role: "path" },
  { id: "e-foothold", from: "foothold", to: "web", label: "assumed", role: "path" },
  { id: "e-web-role", from: "web", to: "role-web", label: "task credentials", role: "path" },
  { id: "e-assume", from: "role-web", to: "role-batch", label: "sts:AssumeRole", role: "path" },
  { id: "e-secret", from: "role-batch", to: "secret", label: "GetSecretValue", role: "path" },
  { id: "e-exports", from: "role-web", to: "bucket", label: "untested", role: "branch" },
  { id: "i-1", from: "ec2", to: "vpc", role: "infra" },
  { id: "i-2", from: "vpc", to: "lambda", role: "infra" },
  { id: "i-3", from: "lambda", to: "s3logs", role: "infra" },
  { id: "i-4", from: "trail", to: "ec2", role: "infra" },
  { id: "i-5", from: "lambda", to: "sqs", role: "infra" },
  { id: "i-6", from: "sqs", to: "cicd", role: "infra" },
  { id: "i-7", from: "cicd", to: "eks", role: "infra" },
  { id: "i-8", from: "eks", to: "rds", role: "infra" },
  { id: "i-9", from: "rds", to: "kms", role: "infra" },
  { id: "i-10", from: "kms", to: "secret", role: "infra" },
  { id: "i-11", from: "s3logs", to: "kms", role: "infra" },
];

/** Order in which the attack path lights up in Act II and is checked in Act III. */
export const PATH_ORDER = ["e-ingress", "e-forward", "e-foothold", "e-web-role", "e-assume", "e-secret"] as const;

export type EdgeTone = "idle" | "danger" | "lit" | "observed" | "assumed" | "simulated" | "blocked" | "faded" | "drift";
export type NodeTone = "idle" | "dim" | "lit" | "impact" | "fixed" | "drift";

export type EdgeState = { tone: EdgeTone; draw: number; label: boolean; pulse: boolean };
export type NodeState = { tone: NodeTone; label: boolean; finding?: string };

export type Scene = {
  act: number;
  local: number;
  camera: { x: number; y: number; w: number; h: number };
  nodes: Record<string, NodeState>;
  edges: Record<string, EdgeState>;
  ambient: boolean;
  /** Act III: number of validation log lines revealed (0–7). */
  logLines: number;
  /** Act IV: remediation step reached (-1–5). */
  fixStep: number;
  /** Shockwave on the remediated edge, 0–1. */
  fixWave: number;
  certificate: "hidden" | "verified" | "reassessing" | "revoked";
  driftNote: boolean;
};

export const ACTS = [
  { key: "invisible", label: "The invisible threat" },
  { key: "connect", label: "Connect the dots" },
  { key: "prove", label: "Possibility to proof" },
  { key: "close", label: "Close the loop" },
  { key: "drift", label: "Trust is never permanent" },
] as const;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const PATH_NODES = ["internet", "alb", "web", "foothold", "role-web", "role-batch", "secret"];
const FIX_NODES = ["role-web", "role-batch", "secret"];

const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n]));

function fit(ids: string[], layout: Layout, pad: number) {
  const world = WORLD[layout];
  const pts = ids.map((id) => nodeById[id].pos[layout]);
  let x0 = Math.min(...pts.map((p) => p[0])) - pad;
  let x1 = Math.max(...pts.map((p) => p[0])) + pad;
  let y0 = Math.min(...pts.map((p) => p[1])) - pad;
  let y1 = Math.max(...pts.map((p) => p[1])) + pad;
  const aspect = world.w / world.h;
  let w = x1 - x0;
  let h = y1 - y0;
  if (w / h > aspect) {
    const nh = w / aspect;
    y0 -= (nh - h) / 2;
    h = nh;
  } else {
    const nw = h * aspect;
    x0 -= (nw - w) / 2;
    w = nw;
  }
  x1 = x0 + w;
  y1 = y0 + h;
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}

function blend(a: Scene["camera"], b: Scene["camera"], t: number): Scene["camera"] {
  const e = ease(clamp(t));
  return { x: lerp(a.x, b.x, e), y: lerp(a.y, b.y, e), w: lerp(a.w, b.w, e), h: lerp(a.h, b.h, e) };
}

const CAMERAS = (layout: Layout) => {
  const world = WORLD[layout];
  const pad = layout === "wide" ? 70 : 60;
  return {
    all: { x: 0, y: 0, w: world.w, h: world.h },
    suspicious: fit(["web", "role-web", "role-batch", "secret"], layout, pad + 30),
    path: fit(PATH_NODES, layout, pad),
    fix: fit(FIX_NODES, layout, pad + 40),
  };
};

/** Pure scene function: a story position (0–5) maps to one deterministic visual state, so scrubbing works in both directions. */
export function sceneAt(position: number, layout: Layout): Scene {
  const x = clamp(position, 0, 4.9999);
  const act = Math.floor(x);
  const t = x - act;
  const cams = CAMERAS(layout);

  const nodes: Record<string, NodeState> = {};
  const edges: Record<string, EdgeState> = {};
  for (const n of NODES) nodes[n.id] = { tone: "idle", label: n.role !== "infra" || layout === "wide" };
  for (const e of EDGES) edges[e.id] = { tone: "idle", draw: 1, label: false, pulse: false };

  const scene: Scene = {
    act,
    local: t,
    camera: cams.all,
    nodes,
    edges,
    ambient: false,
    logLines: 0,
    fixStep: -1,
    fixWave: 0,
    certificate: "hidden",
    driftNote: false,
  };

  const dimInfra = (amount: boolean) => {
    if (!amount) return;
    for (const n of NODES) if (n.role === "infra") nodes[n.id] = { ...nodes[n.id], tone: "dim", label: false };
    for (const e of EDGES) if (e.role === "infra") edges[e.id] = { ...edges[e.id], tone: "faded" };
  };

  const lightPath = (progress: number) => {
    PATH_ORDER.forEach((id, i) => {
      const local = seg(progress, i / PATH_ORDER.length, (i + 1) / PATH_ORDER.length);
      edges[id] = { tone: local > 0 ? "lit" : "idle", draw: local > 0 ? local : 1, label: local >= 1, pulse: local > 0 && local < 1 };
    });
  };

  const validatedPath = () => {
    edges["e-ingress"] = { tone: "observed", draw: 1, label: true, pulse: false };
    edges["e-forward"] = { tone: "observed", draw: 1, label: true, pulse: false };
    edges["e-foothold"] = { tone: "assumed", draw: 1, label: true, pulse: false };
    edges["e-web-role"] = { tone: "observed", draw: 1, label: true, pulse: false };
    edges["e-assume"] = { tone: "simulated", draw: 1, label: true, pulse: false };
    edges["e-secret"] = { tone: "simulated", draw: 1, label: true, pulse: false };
    edges["e-exports"] = { tone: "faded", draw: 1, label: layout === "wide", pulse: false };
    for (const id of PATH_NODES) nodes[id] = { ...nodes[id], tone: "lit", label: true };
    nodes.secret = { ...nodes.secret, tone: "impact" };
  };

  if (act === 0) {
    scene.ambient = true;
    scene.camera = blend(cams.all, cams.suspicious, seg(t, 0.15, 1));
    edges["e-assume"] = { tone: "danger", draw: 1, label: t > 0.45, pulse: true };
    if (t > 0.6) nodes.secret = { ...nodes.secret, tone: "impact" };
    return scene;
  }

  if (act === 1) {
    scene.camera = blend(cams.suspicious, cams.path, seg(t, 0, 0.35));
    dimInfra(t > 0.12);
    if (t > 0.04) nodes.alb = { ...nodes.alb, finding: "Public :443" };
    if (t > 0.1) nodes["role-web"] = { ...nodes["role-web"], finding: "Broad trust" };
    if (t > 0.16) nodes.secret = { ...nodes.secret, finding: "Sensitive data" };
    lightPath(seg(t, 0.25, 0.85));
    PATH_ORDER.forEach((id) => {
      if (edges[id].tone !== "idle") {
        const e = EDGES.find((edge) => edge.id === id)!;
        nodes[e.from] = { ...nodes[e.from], tone: "lit", label: true };
        nodes[e.to] = { ...nodes[e.to], tone: "lit", label: true };
      }
    });
    if (t > 0.85) nodes.secret = { ...nodes.secret, tone: "impact" };
    return scene;
  }

  if (act === 2) {
    scene.camera = cams.path;
    dimInfra(true);
    for (const id of PATH_NODES) nodes[id] = { ...nodes[id], tone: "lit", label: true };
    const lines = Math.floor(seg(t, 0.05, 0.85) * 7);
    scene.logLines = lines;
    validatedPath();
    PATH_ORDER.forEach((id, i) => {
      if (i >= lines) edges[id] = { tone: "lit", draw: 1, label: false, pulse: i === lines };
    });
    if (lines < 7) nodes.secret = { ...nodes.secret, tone: "lit" };
    return scene;
  }

  if (act === 3) {
    dimInfra(true);
    validatedPath();
    scene.camera = blend(cams.path, cams.fix, seg(t, 0.15, 0.55));
    const step = t < 0.05 ? 0 : t < 0.22 ? 1 : t < 0.38 ? 2 : t < 0.55 ? 3 : t < 0.72 ? 4 : 5;
    scene.fixStep = step;
    if (step === 3) scene.fixWave = seg(t, 0.38, 0.55);
    if (step >= 4) {
      edges["e-assume"] = { tone: "blocked", draw: 1, label: true, pulse: false };
      edges["e-secret"] = { tone: "faded", draw: 1, label: false, pulse: false };
      nodes["role-batch"] = { ...nodes["role-batch"], tone: "fixed" };
      nodes.secret = { ...nodes.secret, tone: "lit" };
    }
    if (step >= 5) {
      scene.certificate = "verified";
      scene.camera = blend(cams.fix, cams.path, seg(t, 0.75, 1));
    }
    return scene;
  }

  dimInfra(t < 0.8);
  validatedPath();
  edges["e-assume"] = { tone: "blocked", draw: 1, label: true, pulse: false };
  edges["e-secret"] = { tone: "faded", draw: 1, label: false, pulse: false };
  nodes["role-batch"] = { ...nodes["role-batch"], tone: "fixed" };
  nodes.secret = { ...nodes.secret, tone: "lit" };
  scene.certificate = "verified";
  scene.ambient = t < 0.2 || t > 0.8;
  scene.camera = t < 0.75 ? blend(cams.path, cams.fix, seg(t, 0.05, 0.3)) : blend(cams.fix, cams.all, seg(t, 0.75, 1));

  if (t >= 0.22) {
    scene.driftNote = true;
    nodes["role-batch"] = { ...nodes["role-batch"], tone: "drift", finding: "Trust: role-web-*" };
  }
  if (t >= 0.42) {
    scene.certificate = "reassessing";
    edges["e-assume"] = { tone: "drift", draw: 1, label: true, pulse: true };
  }
  if (t >= 0.62) {
    scene.certificate = "revoked";
    edges["e-assume"] = { tone: "danger", draw: 1, label: true, pulse: true };
    edges["e-secret"] = { tone: "danger", draw: 1, label: true, pulse: true };
    nodes.secret = { ...nodes.secret, tone: "impact" };
  }
  if (t >= 0.8) {
    for (const n of NODES) if (n.role === "infra") nodes[n.id] = { ...nodes[n.id], tone: "idle", label: layout === "wide" };
    for (const e of EDGES) if (e.role === "infra") edges[e.id] = { ...edges[e.id], tone: "idle" };
  }
  return scene;
}

export const VALIDATION_LOG = [
  { verb: "collect", target: "alb-web-public listener :443", result: "observed" },
  { verb: "collect", target: "target group → web-frontend", result: "observed" },
  { verb: "assume", target: "code execution in web-frontend task", result: "assumed" },
  { verb: "collect", target: "task role role-web-task", result: "observed" },
  { verb: "simulate", target: "sts:AssumeRole → role-batch-ops", result: "allowed" },
  { verb: "simulate", target: "GetSecretValue prod/orders-db", result: "allowed" },
  { verb: "result", target: "AP-12 reachable under stated assumption", result: "validated" },
] as const;

export const FIX_STEPS = [
  { title: "Validated exposure", detail: "AP-12 reaches prod/orders-db." },
  { title: "Proposed remediation", detail: "Narrow role-batch-ops trust to its pipeline only." },
  { title: "Human approval", detail: "A person on your team reviews and approves it." },
  { title: "Fix applied by your team", detail: "Your pipeline applies the change in AWS." },
  { title: "Revalidation", detail: "sts:AssumeRole is now denied. The path stops." },
  { title: "Evidence-backed closure", detail: "A closure record is issued for AP-12." },
] as const;
