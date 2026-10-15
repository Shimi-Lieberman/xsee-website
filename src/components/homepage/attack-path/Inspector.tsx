import type { Dispatch } from "react";
import { Ban, Check, ChevronRight, CircleDashed, GitPullRequestArrow, TriangleAlert, UserCheck, X } from "lucide-react";
import { EDGES, INSPECT_ORDER, NODES, POLICY, SCENARIO, TIMESTAMPS, TRAVERSE_ORDER } from "@/lib/attackPathScenario";
import { edgeById, edgeStatus, focusEdgeId, nodeById, type DemoAction, type DemoState } from "./demoState";
import { NODE_ICON, StatusChip } from "./parts";

type Props = { state: DemoState; dispatch: Dispatch<DemoAction> };

export default function Inspector({ state, dispatch }: Props) {
  const { selection } = state;
  if (selection?.kind === "edge") {
    return <EdgeDetail state={state} edgeId={selection.id} onClose={() => dispatch({ type: "select", selection: null })} />;
  }
  if (selection?.kind === "node") {
    return <NodeDetail nodeId={selection.id} onClose={() => dispatch({ type: "select", selection: null })} />;
  }
  switch (state.step) {
    case 0:
      return <DiscoverPanel />;
    case 1:
      return <InspectPanel state={state} />;
    case 2:
      return <ReviewPanel state={state} dispatch={dispatch} />;
    case 3:
      return <ApprovePanel state={state} dispatch={dispatch} />;
    case 4:
      return <VerifyPanel state={state} />;
    default:
      return <DriftPanel state={state} dispatch={dispatch} />;
  }
}

function PanelHead({ overline, title, onClose }: { overline: string; title: string; onClose?: () => void }) {
  return (
    <div className="apd-insp-head">
      <div>
        <p className="apd-overline">{overline}</p>
        <h4>{title}</h4>
      </div>
      {onClose ? (
        <button type="button" className="apd-icon-button" onClick={onClose} aria-label="Close details and return to step overview">
          <X aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

function Facts({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="apd-facts">
      {rows.map(([term, value]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function edgeResult(edgeId: string, state: DemoState) {
  const edge = edgeById(edgeId)!;
  const status = edgeStatus(edge, state);
  if (status === "blocked") return "Re-check after the change: sts:AssumeRole is denied by the trust policy. Traversal stops here.";
  if (status === "changed" || status === "reassess") return "The trust policy changed after verification. The earlier blocked result may no longer hold.";
  if (status === "rechecking") return "A new simulation is running against the changed trust policy.";
  if (status === "reopened") return "New check: sts:AssumeRole is allowed again via the role-web-* principal.";
  if (status === "candidate") return "Candidate. Not yet inspected.";
  return edge.result;
}

function EdgeDetail({ state, edgeId, onClose }: { state: DemoState; edgeId: string; onClose?: () => void }) {
  const edge = edgeById(edgeId)!;
  const from = nodeById(edge.from)!;
  const to = nodeById(edge.to)!;
  const status = edgeStatus(edge, state);
  return (
    <div className="apd-insp-body">
      <PanelHead overline="Relationship" title={edge.label} onClose={onClose} />
      <p className="apd-endpoints">
        {from.name} <ChevronRight aria-hidden /> {to.name}
      </p>
      <StatusChip status={status} />
      <Facts
        rows={[
          ["Evidence", edge.evidence],
          ["Method", edge.method],
          ["Result", edgeResult(edgeId, state)],
          ["Limitations", edge.limitations],
        ]}
      />
    </div>
  );
}

function NodeDetail({ nodeId, onClose }: { nodeId: string; onClose: () => void }) {
  const node = nodeById(nodeId)!;
  const Icon = NODE_ICON[node.kind];
  const related = EDGES.filter((edge) => edge.from === nodeId || edge.to === nodeId);
  return (
    <div className="apd-insp-body">
      <PanelHead overline={node.typeLabel} title={node.name} onClose={onClose} />
      <p className="apd-node-summary">
        <span className="apd-node-icon">
          <Icon aria-hidden />
        </span>
        {node.summary}
      </p>
      <Facts
        rows={[
          ["Resource", node.resource],
          ["Relationships", related.map((edge) => edge.label).join(" · ")],
        ]}
      />
    </div>
  );
}

function DiscoverPanel() {
  return (
    <div className="apd-insp-body">
      <PanelHead overline="Step 1 · Discover" title="Resources and candidate relationships" />
      <p className="apd-copy">
        A read-only collection maps {NODES.length - 1} resources and {EDGES.length} relationships. Dashed lines are candidates: nothing has been
        evaluated yet.
      </p>
      <Facts
        rows={[
          ["Sensitive target", "prod/orders-db (Secrets Manager)"],
          ["Starting condition", "Assumed code execution in web-frontend. Public exposure alone is not treated as compromise."],
        ]}
      />
      <p className="apd-hint">Select any resource or relationship to inspect it.</p>
    </div>
  );
}

function InspectPanel({ state }: { state: DemoState }) {
  const focused = focusEdgeId(state) ?? INSPECT_ORDER[0];
  const index = INSPECT_ORDER.indexOf(focused as (typeof INSPECT_ORDER)[number]);
  return (
    <div className="apd-insp-stack">
      <p className="apd-progress">
        Inspecting relationship {index + 1} of {INSPECT_ORDER.length}
      </p>
      <EdgeDetail state={state} edgeId={focused} />
    </div>
  );
}

function PolicyBlock({ lines, label }: { lines: readonly { text: string; mark?: string }[]; label: string }) {
  return (
    <figure className="apd-policy">
      <figcaption>{label}</figcaption>
      <pre>
        <code>
          {lines.map((line, index) => (
            <span key={index} className={`apd-policy-line${line.mark ? ` is-${line.mark}` : ""}`}>
              <span className="apd-policy-mark" aria-hidden>
                {line.mark === "remove" ? "−" : line.mark === "add" ? "+" : line.mark === "drift" ? "!" : " "}
              </span>
              {line.text}
              {line.mark === "drift" ? <span className="sr-only"> (changed field)</span> : null}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

function ReviewPanel({ state, dispatch }: Props) {
  const after = state.compare === "after";
  return (
    <div className="apd-insp-body">
      <PanelHead overline="Step 3 · Review fix" title="Narrow the role-batch-ops trust policy" />
      <div className="apd-segmented" role="group" aria-label="Compare configuration">
        {(["before", "after"] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={state.compare === value}
            onClick={() => dispatch({ type: "setCompare", compare: value })}
          >
            {value === "before" ? "Before" : "After"}
          </button>
        ))}
      </div>
      <PolicyBlock
        lines={after ? POLICY.after : POLICY.before}
        label={after ? "Proposed trust policy · role-batch-ops" : "Current trust policy · role-batch-ops"}
      />
      <div className="apd-predicted">
        <span className="apd-chip apd-status-candidate">
          <CircleDashed aria-hidden /> Predicted · not verified
        </span>
        <p>
          Only <strong>batch-scheduler</strong> can assume role-batch-ops. role-web-task loses sts:AssumeRole, so {SCENARIO.pathId} should stop at hop 3.
          Other relationships are unchanged.
        </p>
      </div>
    </div>
  );
}

function ApprovePanel({ state, dispatch }: Props) {
  const approved = state.approval !== "pending";
  const applied = state.approval === "applied";
  return (
    <div className="apd-insp-body">
      <PanelHead overline="Step 4 · Approve" title="A person decides. Your pipeline applies." />
      <ol className="apd-timeline">
        <li className="is-done">
          <span className="apd-timeline-icon">
            <GitPullRequestArrow aria-hidden />
          </span>
          <div>
            <strong>Change proposed</strong>
            <small>Trust policy diff and predicted effect attached</small>
          </div>
        </li>
        <li className={approved ? "is-done" : "is-current"}>
          <span className="apd-timeline-icon">
            <UserCheck aria-hidden />
          </span>
          <div>
            <strong>{approved ? "Approved by security reviewer (demo)" : "Waiting for a human decision"}</strong>
            <small>{approved ? TIMESTAMPS.approved : "Nothing changes until someone approves"}</small>
          </div>
        </li>
        <li className={applied ? "is-done" : approved ? "is-current" : ""}>
          <span className="apd-timeline-icon">{applied ? <Check aria-hidden /> : <CircleDashed aria-hidden />}</span>
          <div>
            <strong>{applied ? "Applied by your IaC pipeline" : "Apply in your pipeline"}</strong>
            <small>{applied ? `${TIMESTAMPS.applied} · outside XSEE` : approved ? "Applying outside XSEE…" : "A separate event, run by your team"}</small>
          </div>
        </li>
      </ol>
      {approved ? null : (
        <button type="button" className="apd-primary" onClick={() => dispatch({ type: "approve" })}>
          <UserCheck aria-hidden /> Approve change (demo)
        </button>
      )}
      <p className="apd-boundary">XSEE has read-only access. It prepares the change and evidence; it cannot apply the change.</p>
    </div>
  );
}

function VerifyPanel({ state }: { state: DemoState }) {
  const verified = state.beat >= 4;
  const hops = TRAVERSE_ORDER.map((id) => edgeById(id)!);
  return (
    <div className="apd-insp-body">
      <PanelHead overline="Step 5 · Verify" title={`Replay ${SCENARIO.pathId} against the new configuration`} />
      <ol className="apd-hops">
        {hops.map((edge, index) => {
          const reached = state.beat > index;
          const blocked = edge.id === SCENARIO.remediatedEdge && state.beat >= 3;
          return (
            <li key={edge.id} className={blocked ? "is-blocked" : reached ? "is-reached" : ""}>
              <span className="apd-hop-icon">{blocked ? <Ban aria-hidden /> : reached ? <Check aria-hidden /> : <CircleDashed aria-hidden />}</span>
              <span>
                Hop {index + 1} · {edge.label}
              </span>
              <em>{blocked ? "Blocked" : reached ? "Reached" : "Pending"}</em>
            </li>
          );
        })}
        <li className={verified ? "is-unreached" : ""}>
          <span className="apd-hop-icon">
            <CircleDashed aria-hidden />
          </span>
          <span>Hop 4 · GetSecretValue</span>
          <em>{verified ? "Not reached" : "Pending"}</em>
        </li>
      </ol>
      {verified ? (
        <div className="apd-verdict apd-tone-verified">
          <strong>{SCENARIO.pathId} verified closed</strong>
          <p>Unchanged: public exposure via alb-web-public is still observed, and s3:GetObject on nw-exports is still untested.</p>
        </div>
      ) : null}
    </div>
  );
}

const DRIFT_STAGES = [
  { key: "changed", label: "Configuration change detected" },
  { key: "reassess", label: "Previous verification needs reassessment" },
  { key: "rechecking", label: "New check against the changed policy" },
  { key: "reopened", label: "Result: path reopened" },
] as const;

function DriftPanel({ state, dispatch }: Props) {
  const stageIndex = DRIFT_STAGES.findIndex((stage) => stage.key === state.drift);
  if (state.drift === "none") {
    return (
      <div className="apd-insp-body">
        <PanelHead overline="Step 6 · Drift" title="Closure holds only while the configuration holds" />
        <p className="apd-copy">
          {SCENARIO.pathId} is verified closed as of {TIMESTAMPS.verified}. Introduce an illustrative change to see how the earlier result is
          handled.
        </p>
        <button type="button" className="apd-primary is-drift" onClick={() => dispatch({ type: "introduceDrift" })}>
          <TriangleAlert aria-hidden /> Introduce demo drift
        </button>
      </div>
    );
  }
  return (
    <div className="apd-insp-body">
      <PanelHead overline={`Step 6 · Drift · ${TIMESTAMPS.drift}`} title="Trust policy changed by a later deploy" />
      <PolicyBlock lines={POLICY.drifted} label="role-batch-ops · Principal.AWS" />
      <ol className="apd-drift-stages">
        {DRIFT_STAGES.map((stage, index) => (
          <li key={stage.key} className={index < stageIndex ? "is-done" : index === stageIndex ? "is-current" : ""}>
            <span className="apd-hop-icon">{index < stageIndex ? <Check aria-hidden /> : index === stageIndex ? <TriangleAlert aria-hidden /> : <CircleDashed aria-hidden />}</span>
            {stage.label}
          </li>
        ))}
      </ol>
      {state.drift === "reopened" ? (
        <div className="apd-verdict apd-tone-drift">
          <strong>{SCENARIO.pathId} reopened</strong>
          <p>role-web-task matches role-web-* and can assume role-batch-ops again. The closure record is updated below.</p>
        </div>
      ) : null}
    </div>
  );
}
