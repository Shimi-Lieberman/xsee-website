import {
  EDGES,
  INSPECT_ORDER,
  NODES,
  SCENARIO,
  STEPS,
  STEP_BEATS,
  TIMESTAMPS,
  TRAVERSE_ORDER,
  type ScenarioEdge,
} from "@/lib/attackPathScenario";

export type Selection = { kind: "node" | "edge"; id: string } | null;
export type Approval = "pending" | "approved" | "applied";
export type Drift = "none" | "changed" | "reassess" | "rechecking" | "reopened";
export type Compare = "before" | "after";

export type DemoState = {
  step: number;
  beat: number;
  playing: boolean;
  selection: Selection;
  compare: Compare;
  approval: Approval;
  drift: Drift;
  resumeAfterApproval: boolean;
};

export type DemoAction =
  | { type: "goTo"; step: number }
  | { type: "next" }
  | { type: "prev" }
  | { type: "play" }
  | { type: "pause" }
  | { type: "replay" }
  | { type: "settle" }
  | { type: "tick" }
  | { type: "select"; selection: Selection }
  | { type: "setCompare"; compare: Compare }
  | { type: "approve" }
  | { type: "approvalApplied" }
  | { type: "introduceDrift" }
  | { type: "advanceDrift" }
  | { type: "decisionReached" };

export const LAST_STEP = STEPS.length - 1;

function enterStep(state: DemoState, step: number): DemoState {
  return {
    ...state,
    step,
    beat: 0,
    selection: null,
    compare: "before",
    approval: step >= 4 ? "applied" : "pending",
    drift: "none",
    resumeAfterApproval: false,
  };
}

export const INITIAL_STATE: DemoState = enterStep(
  {
    step: 0,
    beat: 0,
    playing: false,
    selection: null,
    compare: "before",
    approval: "pending",
    drift: "none",
    resumeAfterApproval: false,
  },
  0,
);

const DRIFT_SEQUENCE: Drift[] = ["changed", "reassess", "rechecking", "reopened"];

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "goTo":
      return { ...enterStep(state, action.step), playing: false };
    case "next":
      if (state.step >= LAST_STEP) return { ...state, playing: false };
      return enterStep(state, state.step + 1);
    case "prev":
      return { ...enterStep(state, Math.max(0, state.step - 1)), playing: false };
    case "play":
      if (state.step === 3 && state.approval === "pending") return { ...state, playing: false };
      return { ...state, playing: true };
    case "pause":
      return { ...state, playing: false };
    case "replay":
      return { ...enterStep(state, 0), playing: true };
    case "settle":
      return { ...state, beat: STEP_BEATS[state.step].length };
    case "tick": {
      const nextBeat = Math.min(state.beat + 1, STEP_BEATS[state.step].length);
      return {
        ...state,
        beat: nextBeat,
        compare: state.step === 2 && nextBeat >= 1 ? "after" : state.compare,
      };
    }
    case "select":
      return {
        ...state,
        selection: action.selection,
        playing: action.selection ? false : state.playing,
      };
    case "setCompare":
      return {
        ...state,
        compare: action.compare,
        playing: false,
        beat: STEP_BEATS[state.step].length,
      };
    case "approve":
      if (state.step !== 3 || state.approval !== "pending") return state;
      return { ...state, approval: "approved", playing: state.resumeAfterApproval };
    case "approvalApplied":
      return state.approval === "approved" ? { ...state, approval: "applied" } : state;
    case "introduceDrift":
      if (state.step !== LAST_STEP || state.drift !== "none") return state;
      return { ...state, drift: "changed", selection: null, playing: false };
    case "advanceDrift": {
      const index = DRIFT_SEQUENCE.indexOf(state.drift);
      if (index < 0 || index === DRIFT_SEQUENCE.length - 1) return state;
      return { ...state, drift: DRIFT_SEQUENCE[index + 1] };
    }
    case "decisionReached":
      return { ...state, playing: false, resumeAfterApproval: true };
    default:
      return state;
  }
}

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

export function focusSet(s: DemoState) {
  const edges = new Set<string>();
  const nodes = new Set<string>();
  const focused = focusEdgeId(s);
  if (s.selection?.kind === "node") {
    nodes.add(s.selection.id);
    EDGES.forEach((edge) => {
      if (edge.from === s.selection?.id || edge.to === s.selection?.id) {
        edges.add(edge.id);
        nodes.add(edge.from);
        nodes.add(edge.to);
      }
    });
  } else if (focused) {
    const edge = EDGES.find((item) => item.id === focused);
    if (edge) {
      edges.add(edge.id);
      nodes.add(edge.from);
      nodes.add(edge.to);
    }
  }
  if (s.step === 4 || (s.step === 5 && s.drift !== "none")) {
    litEdges(s).forEach((id) => {
      const edge = EDGES.find((item) => item.id === id);
      if (!edge) return;
      edges.add(id);
      nodes.add(edge.from);
      nodes.add(edge.to);
    });
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
