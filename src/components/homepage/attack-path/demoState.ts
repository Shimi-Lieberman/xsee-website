import {
  EDGES,
  INSPECT_ORDER,
  NODES,
  PATH_EDGES,
  SCENARIO,
  STEP_BEATS,
  STEPS,
  TIMESTAMPS,
  TRAVERSE_ORDER,
  type ScenarioEdge,
} from "@/lib/attackPathScenario";

export type Selection = { kind: "node" | "edge"; id: string } | null;
export type Approval = "pending" | "approved" | "applied";
export type Drift = "none" | "changed" | "reassess" | "rechecking" | "reopened";
export type Compare = "before" | "after";
export type Mode = "story" | "explore";
export type StoryStatus = "idle" | "playing" | "paused" | "ended";

export type DemoState = {
  mode: Mode;
  story: StoryStatus;
  storyMs: number;
  step: number;
  beat: number;
  selection: Selection;
  compare: Compare;
  approval: Approval;
  drift: Drift;
};

export type DemoAction =
  | { type: "storyStart" }
  | { type: "storyTick"; ms: number }
  | { type: "storyPause" }
  | { type: "storyResume" }
  | { type: "storyReplay" }
  | { type: "explore" }
  | { type: "goTo"; step: number }
  | { type: "next" }
  | { type: "prev" }
  | { type: "settle" }
  | { type: "tick" }
  | { type: "select"; selection: Selection }
  | { type: "setCompare"; compare: Compare }
  | { type: "approve" }
  | { type: "approvalApplied" }
  | { type: "introduceDrift" }
  | { type: "advanceDrift" };

export const LAST_STEP = STEPS.length - 1;

/* ---------------- Story timeline ---------------- */

export const STORY_MS = 30000;

export const STORY_PHASES = [
  { step: 0, start: 0, end: 4000, label: "Discover", caption: "Identify the route that needs investigation." },
  { step: 1, start: 4000, end: 9000, label: "Validate", caption: "Inspect the evidence behind each step." },
  { step: 2, start: 9000, end: 14000, label: "Review the fix", caption: "Review the change intended to break the path." },
  { step: 3, start: 14000, end: 18000, label: "Approval and change", caption: "Approve the proposed remediation." },
  { step: 4, start: 18000, end: 24000, label: "Verify closure", caption: "Re-test the original path after the change." },
  { step: 5, start: 24000, end: 30000, label: "Detect drift", caption: "Reassess closure when the environment changes." },
] as const;

const countPassed = (t: number, marks: number[]) => marks.filter((mark) => t >= mark).length;

type Frame = Pick<DemoState, "step" | "beat" | "compare" | "approval" | "drift">;

/** Derives the visible scenario state for a point on the story timeline. */
export function storyFrame(ms: number): Frame {
  const phase = [...STORY_PHASES].reverse().find((item) => ms >= item.start) ?? STORY_PHASES[0];
  const t = ms - phase.start;
  const base: Frame = { step: phase.step, beat: 0, compare: "before", approval: "pending", drift: "none" };
  switch (phase.step) {
    case 0:
      return { ...base, beat: countPassed(t, [1200]) };
    case 1:
      return { ...base, beat: Math.min(INSPECT_ORDER.length - 1, Math.floor(t / 1000)) };
    case 2: {
      const beat = countPassed(t, [2000, 3500]);
      return { ...base, beat, compare: beat >= 1 ? "after" : "before" };
    }
    case 3:
      return { ...base, approval: t < 1200 ? "pending" : t < 2600 ? "approved" : "applied" };
    case 4:
      return { ...base, approval: "applied", beat: countPassed(t, [600, 1400, 2400, 3600]) };
    default:
      return {
        ...base,
        approval: "applied",
        drift: t < 1500 ? "changed" : t < 3000 ? "reassess" : t < 4500 ? "rechecking" : "reopened",
      };
  }
}

export function storyPhaseIndex(ms: number) {
  const index = STORY_PHASES.findIndex((phase) => ms < phase.end);
  return index === -1 ? STORY_PHASES.length - 1 : index;
}

/* ---------------- Reducer ---------------- */

function enterStep(state: DemoState, step: number): DemoState {
  return {
    ...state,
    step,
    beat: 0,
    selection: null,
    compare: "before",
    approval: step >= 4 ? "applied" : "pending",
    drift: "none",
  };
}

export const INITIAL_STATE: DemoState = {
  mode: "story",
  story: "idle",
  storyMs: 0,
  ...storyFrame(0),
  selection: null,
};

function toExplore(state: DemoState): DemoState {
  if (state.mode === "explore") return state;
  return { ...state, mode: "explore", story: state.story === "ended" ? "ended" : "paused" };
}

const DRIFT_SEQUENCE: Drift[] = ["changed", "reassess", "rechecking", "reopened"];

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "storyStart":
      if (state.mode !== "story" || state.story !== "idle") return state;
      return { ...state, story: "playing" };
    case "storyTick": {
      if (state.mode !== "story" || state.story !== "playing") return state;
      const storyMs = Math.min(STORY_MS, state.storyMs + action.ms);
      return { ...state, ...storyFrame(storyMs), storyMs, story: storyMs >= STORY_MS ? "ended" : "playing" };
    }
    case "storyPause":
      return state.story === "playing" ? { ...state, story: "paused" } : state;
    case "storyResume":
      if (state.mode !== "story" || state.story === "ended") return state;
      return { ...state, story: "playing" };
    case "storyReplay":
      return { ...state, ...storyFrame(0), mode: "story", story: "playing", storyMs: 0, selection: null };
    case "explore":
      return toExplore(state);
    case "goTo":
      return enterStep(toExplore(state), action.step);
    case "next":
      return enterStep(toExplore(state), Math.min(LAST_STEP, state.step + 1));
    case "prev":
      return enterStep(toExplore(state), Math.max(0, state.step - 1));
    case "settle":
      return { ...state, beat: STEP_BEATS[state.step].length, compare: state.step === 2 ? "after" : state.compare };
    case "tick": {
      const nextBeat = Math.min(state.beat + 1, STEP_BEATS[state.step].length);
      return { ...state, beat: nextBeat, compare: state.step === 2 && nextBeat >= 1 ? "after" : state.compare };
    }
    case "select":
      return { ...(action.selection ? toExplore(state) : state), selection: action.selection };
    case "setCompare":
      return { ...toExplore(state), compare: action.compare, beat: STEP_BEATS[state.step].length };
    case "approve":
      if (state.step !== 3 || state.approval !== "pending") return state;
      return { ...toExplore(state), approval: "approved" };
    case "approvalApplied":
      return state.approval === "approved" ? { ...state, approval: "applied" } : state;
    case "introduceDrift":
      if (state.step !== LAST_STEP || state.drift !== "none") return state;
      return { ...toExplore(state), drift: "changed", selection: null };
    case "advanceDrift": {
      const index = DRIFT_SEQUENCE.indexOf(state.drift);
      if (index < 0 || index === DRIFT_SEQUENCE.length - 1) return state;
      return { ...state, drift: DRIFT_SEQUENCE[index + 1] };
    }
    default:
      return state;
  }
}

/* ---------------- Derived view state ---------------- */

export type EdgeStatus =
  | "candidate"
  | "assumed"
  | "observed"
  | "simulated"
  | "untested"
  | "blocked"
  | "changed"
  | "reassess"
  | "rechecking"
  | "reopened";

export const EDGE_STATUS_LABEL: Record<EdgeStatus, string> = {
  candidate: "Candidate",
  assumed: "Assumed",
  observed: "Observed",
  simulated: "Simulated",
  untested: "Untested",
  blocked: "Blocked · verified",
  changed: "Changed",
  reassess: "Reassess",
  rechecking: "Re-checking",
  reopened: "Reopened",
};

export function edgeStatus(edge: ScenarioEdge, s: DemoState): EdgeStatus {
  if (s.step === 0) return "candidate";
  if (s.step === 1) {
    const index = INSPECT_ORDER.indexOf(edge.id as (typeof INSPECT_ORDER)[number]);
    if (index > s.beat) return "candidate";
  }
  if (edge.id !== SCENARIO.remediatedEdge) return edge.base;
  if (s.step < 4) return edge.base;
  if (s.step === 4) return s.beat >= 3 ? "blocked" : edge.base;
  if (s.drift === "none") return "blocked";
  return s.drift;
}

/** The single relationship in focus for the current state, if any. */
export function focusEdgeId(s: DemoState): string | null {
  if (s.selection?.kind === "edge") return s.selection.id;
  if (s.selection) return null;
  switch (s.step) {
    case 1:
      return INSPECT_ORDER[Math.min(s.beat, INSPECT_ORDER.length - 1)];
    case 2:
    case 3:
      return SCENARIO.remediatedEdge;
    case 4:
      return s.beat >= 1 ? TRAVERSE_ORDER[Math.min(s.beat - 1, TRAVERSE_ORDER.length - 1)] : null;
    case 5:
      return s.drift === "none" ? null : SCENARIO.remediatedEdge;
    default:
      return null;
  }
}

/** Edges lit by the path replay (verify step or drift re-check). */
export function litEdges(s: DemoState): Set<string> {
  if (s.step === 4) {
    return new Set(TRAVERSE_ORDER.slice(0, Math.min(s.beat, TRAVERSE_ORDER.length)));
  }
  if (s.step === 5 && s.drift === "reopened") {
    return new Set([...TRAVERSE_ORDER, "e-secret"]);
  }
  if (s.step === 5 && s.drift === "rechecking") return new Set(TRAVERSE_ORDER);
  return new Set();
}

function addEdge(id: string, edges: Set<string>, nodes: Set<string>) {
  const edge = EDGES.find((item) => item.id === id);
  if (!edge) return;
  edges.add(edge.id);
  nodes.add(edge.from);
  nodes.add(edge.to);
}

export function focusSet(s: DemoState) {
  const edges = new Set<string>();
  const nodes = new Set<string>();
  const focused = focusEdgeId(s);
  if (s.selection?.kind === "node") {
    nodes.add(s.selection.id);
    EDGES.forEach((edge) => {
      if (edge.from === s.selection?.id || edge.to === s.selection?.id) addEdge(edge.id, edges, nodes);
    });
  } else if (focused) {
    addEdge(focused, edges, nodes);
  } else if (!s.selection && s.step === 0 && s.beat >= 1) {
    PATH_EDGES.forEach((id) => addEdge(id, edges, nodes));
  }
  if (s.step === 4 || (s.step === 5 && s.drift !== "none")) {
    litEdges(s).forEach((id) => addEdge(id, edges, nodes));
  }
  return { edges, nodes, active: edges.size > 0 || nodes.size > 0 };
}

export type PathResult = { label: string; tone: "risk" | "pending" | "verified" | "drift" | "neutral" };

export function pathResult(s: DemoState): PathResult {
  if (s.step <= 1) return { label: s.step === 0 ? "Candidate path" : "Open · evidence reviewed", tone: "risk" };
  if (s.step === 2) return { label: "Fix proposed · not applied", tone: "pending" };
  if (s.step === 3) {
    if (s.approval === "pending") return { label: "Awaiting approval", tone: "pending" };
    if (s.approval === "approved") return { label: "Approved · not yet applied", tone: "pending" };
    return { label: "Applied · not yet verified", tone: "pending" };
  }
  if (s.step === 4) return s.beat >= 4 ? { label: "Verified closed", tone: "verified" } : { label: "Verifying…", tone: "neutral" };
  switch (s.drift) {
    case "none":
      return { label: "Verified closed", tone: "verified" };
    case "changed":
      return { label: "Configuration changed", tone: "drift" };
    case "reassess":
      return { label: "Needs reassessment", tone: "drift" };
    case "rechecking":
      return { label: "Re-checking…", tone: "drift" };
    case "reopened":
      return { label: "Reopened", tone: "drift" };
  }
}

export type HistoryEvent = { time: string; label: string; tone: PathResult["tone"] };

export function closureHistory(s: DemoState): HistoryEvent[] {
  const events: HistoryEvent[] = [
    { time: TIMESTAMPS.discovered, label: `${SCENARIO.pathId} identified as a candidate path`, tone: "risk" },
  ];
  if (s.step >= 2) events.push({ time: TIMESTAMPS.discovered, label: "Trust-policy fix proposed (predicted effect)", tone: "pending" });
  if (s.approval !== "pending") events.push({ time: TIMESTAMPS.approved, label: "Approved by a security reviewer (demo)", tone: "pending" });
  if (s.approval === "applied") events.push({ time: TIMESTAMPS.applied, label: "Applied by the customer's IaC pipeline, outside XSEE", tone: "pending" });
  if (s.step === 5 || (s.step === 4 && s.beat >= 4)) {
    events.push({ time: TIMESTAMPS.verified, label: "Re-check stopped at sts:AssumeRole · verified closed", tone: "verified" });
  }
  if (s.step === 5 && s.drift !== "none") {
    events.push({ time: TIMESTAMPS.drift, label: "Trust policy changed: role-web-* principal added", tone: "drift" });
  }
  if (s.step === 5 && ["reassess", "rechecking", "reopened"].includes(s.drift)) {
    events.push({ time: TIMESTAMPS.drift, label: "Previous verification marked for reassessment", tone: "drift" });
  }
  if (s.step === 5 && s.drift === "reopened") {
    events.push({ time: TIMESTAMPS.recheck, label: "New check: sts:AssumeRole allowed again · path reopened", tone: "drift" });
  }
  return events;
}

export function nodeById(id: string) {
  return NODES.find((node) => node.id === id);
}

export function edgeById(id: string) {
  return EDGES.find((edge) => edge.id === id);
}
