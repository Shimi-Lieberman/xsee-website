import { HOP_Z, INFRA, PATH_NODES, pathX } from "../cinematic/cinema";
import { VALIDATION_LOG, type EvidenceState } from "../cinematic/scene";

export type ProofState = Exclude<EvidenceState, "validated">;
export type Layer = 0 | 1;
export type Anchor = { x: number; z: number; layer: Layer; label: string; kind: string };

/** Infrastructure sits on the ground plane, permissions are lifted onto their own plane when the graph opens. */
export const POINTS: Record<string, Anchor> = {
  ...Object.fromEntries(
    PATH_NODES.map((n, i) => [`n${i}`, { x: n.x, z: i * HOP_Z, layer: n.kind === "IAM" ? 1 : 0, label: n.label, kind: n.kind }]),
  ),
  exports: { x: INFRA[6].x, z: INFRA[6].z, layer: 0, label: INFRA[6].label, kind: INFRA[6].kind },
  kms: { x: INFRA[8].x, z: INFRA[8].z, layer: 0, label: INFRA[8].label, kind: INFRA[8].kind },
};

export const ROUTE = ["n0", "n1", "n2", "n3", "n4", "n5"];

export type Claim = {
  id: string;
  step: string;
  label: string;
  a: string;
  b?: string;
  state: ProofState;
  /** Index into VALIDATION_LOG: the line that resolves this claim. */
  line: number;
  onRoute: boolean;
  evidence?: { type: string; detail: string };
  supports: string;
  uncertainty: string;
  next: string;
};

/** Ordered to match VALIDATION_LOG so the terminal, the graph and the inspector resolve the same claim at the same moment. */
export const CLAIMS: Claim[] = [
  {
    id: "ingress",
    step: "Internet → alb-web-public",
    label: "HTTPS :443",
    a: "n0",
    b: "n1",
    state: "observed",
    line: 0,
    onRoute: true,
    evidence: { type: "Resource configuration", detail: "Internet-facing listener :443" },
    supports: "The load balancer accepts traffic from the internet on :443.",
    uncertainty: "None for this step in the collected configuration.",
    next: "Re-collect when listeners or security groups change.",
  },
  {
    id: "forward",
    step: "alb-web-public → web-frontend",
    label: "forwards",
    a: "n1",
    b: "n2",
    state: "observed",
    line: 1,
    onRoute: true,
    evidence: { type: "Network reachability", detail: "Target group forwards to web-frontend" },
    supports: "Traffic that reaches the listener is forwarded to web-frontend.",
    uncertainty: "Observed in configuration, not in live traffic.",
    next: "Revalidate when target groups change.",
  },
  {
    id: "foothold",
    step: "web-frontend",
    label: "code execution",
    a: "n2",
    state: "assumed",
    line: 2,
    onRoute: true,
    evidence: { type: "Stated assumption", detail: "Code execution in the web-frontend task" },
    supports: "Nothing on its own. This is the stated starting assumption of the path.",
    uncertainty: "XSEE does not claim web-frontend is compromised.",
    next: "Review web-frontend exposure to judge whether the assumption is realistic.",
  },
  {
    id: "creds",
    step: "web-frontend → role-web-task",
    label: "task credentials",
    a: "n2",
    b: "n3",
    state: "observed",
    line: 3,
    onRoute: true,
    evidence: { type: "IAM policy observation", detail: "role-web-task is the task role" },
    supports: "Code running in the task would hold role-web-task credentials.",
    uncertainty: "Only matters if the stated foothold holds.",
    next: "Re-collect when the task definition changes.",
  },
  {
    id: "assume",
    step: "role-web-task → role-batch-ops",
    label: "sts:AssumeRole",
    a: "n3",
    b: "n4",
    state: "simulated",
    line: 4,
    onRoute: true,
    evidence: { type: "Policy simulation", detail: "AssumeRole to role-batch-ops allowed" },
    supports: "IAM policy simulation allows role-web-task to assume role-batch-ops.",
    uncertainty: "Simulated. The call was not made in your account.",
    next: "Narrow the role-batch-ops trust policy. This is the remediation step.",
  },
  {
    id: "read",
    step: "role-batch-ops → prod/orders-db",
    label: "GetSecretValue",
    a: "n4",
    b: "n5",
    state: "simulated",
    line: 5,
    onRoute: true,
    evidence: { type: "Policy simulation", detail: "GetSecretValue on prod/orders-db allowed" },
    supports: "role-batch-ops is allowed to read the prod/orders-db secret.",
    uncertainty: "Simulated. The secret was not read.",
    next: "Re-check the path after the trust change.",
  },
  {
    id: "exports",
    step: "role-web-task → nw-exports",
    label: "branch",
    a: "n3",
    b: "exports",
    state: "untested",
    line: 6,
    onRoute: false,
    supports: "No conclusion. This branch was not tested in this run.",
    uncertainty: "Whether nw-exports is reachable is unknown.",
    next: "Include the branch in the next validation run.",
  },
  {
    id: "kms",
    step: "prod/orders-db → kms-orders",
    label: "key policy",
    a: "n5",
    b: "kms",
    state: "blocked",
    line: 7,
    onRoute: false,
    supports: "No conclusion. Reading the kms-orders key policy was denied.",
    uncertainty: "Whether the key would stop decryption is unknown.",
    next: "Grant read access to the key policy, then re-run the check.",
  },
];

export const EVIDENCE_CLAIMS = CLAIMS.filter((c) => c.evidence);
export const LOG = VALIDATION_LOG;
export const LOG_LENGTH = VALIDATION_LOG.length;

export const STATE_LABEL: Record<ProofState, string> = {
  observed: "Observed",
  simulated: "Simulated",
  assumed: "Assumed",
  untested: "Untested",
  blocked: "Blocked",
};

export const STATE_MEANING: Record<ProofState, string> = {
  observed: "Seen in read-only collected configuration.",
  simulated: "Allowed by IAM policy simulation. Not exercised.",
  assumed: "A stated assumption. Not a finding.",
  untested: "Not tested. No conclusion is drawn.",
  blocked: "The check could not complete. Not a pass.",
};

export const VERDICT = "Reachable under 1 stated assumption · 2 checks not proven";

export const STAGES = [
  {
    key: "hypothesis",
    label: "Hypothesis",
    title: "A path is a hypothesis.",
    body: "Five relationships connect the internet to prod/orders-db. None of them is proven yet.",
  },
  {
    key: "evidence",
    label: "Evidence",
    title: "Evidence changes the picture.",
    body: "Configuration, reachability and policy simulation attach to the relationships they describe. One step rests on a stated assumption.",
  },
  {
    key: "verify",
    label: "Verification",
    title: "Not every claim survives verification.",
    body: "Each relationship receives only the state its evidence supports.",
  },
  {
    key: "boundary",
    label: "Proof boundary",
    title: "Know what is proven.",
    body: "The boundary holds what the evidence supports. Everything outside it stays unresolved.",
  },
  {
    key: "decision",
    label: "Decision",
    title: "Evidence you can act on.",
    body: "A conclusion with its limits stated, and a clear next step.",
  },
] as const;

export type Cam = { x: number; z: number; h: number };

export type Proof = {
  stage: number;
  t: number;
  cam: Cam;
  /** Background infrastructure strength. */
  env: number;
  /** Plane separation: 0 flat, 1 fully layered. */
  open: number;
  /** Candidate pulse travelling along the route (hop units), -1 when hidden. */
  pulse: number;
  /** Per evidence claim: 0 hidden, 0–0.4 card appears, 0.4–1 signal travels, 1 attached. */
  evidence: number[];
  cards: number;
  /** Validation log lines resolved (0–LOG_LENGTH). */
  resolved: number;
  boundary: number;
  outside: number;
  decision: number;
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function blend(a: Cam, b: Cam, t: number): Cam {
  const e = ease(clamp(t));
  return { x: lerp(a.x, b.x, e), z: lerp(a.z, b.z, e), h: lerp(a.h, b.h, e) };
}

/** Matches the film's overview framing so the chamber opens on the shot the previous scene ended with. */
const START: Cam = { x: 0, z: -300, h: 158 };
const follow = (hop: number): Cam => ({ x: pathX(hop) * 0.5, z: hop * HOP_Z - 230, h: 84 });
const APPROACH: Cam = { x: pathX(4.5) * 0.5, z: 4.5 * HOP_Z - 175, h: 58 };
const OPEN: Cam = { x: -10, z: -250, h: 255 };
const VERIFY: Cam = { x: 20, z: -225, h: 235 };
const BOUNDARY: Cam = { x: 55, z: -360, h: 300 };
const DECISION: Cam = { x: 45, z: -330, h: 285 };

const EVIDENCE_START = 0.3;
const EVIDENCE_STEP = 0.1;

/** Pure function of position (0–5). Scrolling back, replaying or refreshing always lands on the same frame. */
export function proofAt(position: number): Proof {
  const x = clamp(position, 0, 4.9999);
  const stage = Math.floor(x);
  const t = x - stage;

  const p: Proof = {
    stage,
    t,
    cam: START,
    env: 0.3,
    open: 0,
    pulse: -1,
    evidence: EVIDENCE_CLAIMS.map(() => 0),
    cards: 0,
    resolved: 0,
    boundary: 0,
    outside: 0,
    decision: 0,
  };

  if (stage === 0) {
    p.env = 1 - 0.7 * seg(t, 0.05, 0.4);
    p.pulse = seg(t, 0.1, 0.88) * 5;
    const hop = seg(t, 0.1, 0.74) * 4.5;
    p.cam = t < 0.1 ? blend(START, follow(0), seg(t, 0, 0.1)) : t < 0.74 ? follow(hop) : blend(follow(4.5), APPROACH, seg(t, 0.74, 1));
    return p;
  }

  if (stage === 1) {
    p.open = ease(seg(t, 0, 0.32));
    p.cam = blend(APPROACH, OPEN, seg(t, 0, 0.36));
    p.evidence = EVIDENCE_CLAIMS.map((_, k) => seg(t, EVIDENCE_START + k * EVIDENCE_STEP, EVIDENCE_START + (k + 1) * EVIDENCE_STEP));
    p.cards = 1;
    return p;
  }

  p.evidence = EVIDENCE_CLAIMS.map(() => 1);

  if (stage === 2) {
    p.open = 1;
    p.cards = 1;
    p.cam = blend(OPEN, VERIFY, t);
    p.resolved = Math.min(LOG_LENGTH, Math.floor(seg(t, 0.05, 0.9) * LOG_LENGTH + 1e-6));
    return p;
  }

  p.resolved = LOG_LENGTH;

  if (stage === 3) {
    p.open = 1 - ease(seg(t, 0, 0.34));
    p.cards = 1 - seg(t, 0, 0.26);
    p.cam = blend(VERIFY, BOUNDARY, seg(t, 0, 0.46));
    p.boundary = seg(t, 0.3, 0.74);
    p.outside = seg(t, 0.62, 0.86);
    return p;
  }

  p.boundary = 1;
  p.outside = 1;
  p.decision = seg(t, 0.06, 0.32);
  p.cam = blend(BOUNDARY, DECISION, seg(t, 0, 0.6));
  p.env = 0.3 + 0.25 * seg(t, 0.8, 1);
  return p;
}

/** The evidence item most recently arriving, or the claim most recently resolved. */
export function focusClaim(p: Proof): Claim | null {
  if (p.stage === 1) {
    let k = -1;
    p.evidence.forEach((v, i) => {
      if (v > 0) k = i;
    });
    return k >= 0 ? EVIDENCE_CLAIMS[k] : null;
  }
  if (p.stage === 2) {
    const line = Math.min(p.resolved, CLAIMS.length) - 1;
    return line >= 0 ? CLAIMS[line] : null;
  }
  return null;
}

export const isResolved = (p: Proof, c: Claim) => p.resolved > c.line;
