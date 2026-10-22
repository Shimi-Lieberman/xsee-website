import type { Dispatch } from "react";
import { Ban, Check, ChevronRight, CircleDashed, GitPullRequestArrow, TriangleAlert, UserCheck, X } from "lucide-react";
import { EDGES, INSPECT_ORDER, NODES, POLICY, SCENARIO, TIMESTAMPS, TRAVERSE_ORDER } from "@/lib/attackPathScenario";
import { edgeById, edgeStatus, focusEdgeId, nodeById, type DemoAction, type DemoState } from "./demoState";
import { NODE_ICON, StatusChip } from "./parts";

type Props = { state: DemoState; dispatch: Dispatch<DemoAction> };

export default function Inspector({ state, dispatch }: Props) {
  const { selection } = state;
  const story = state.mode === "story";
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
      return story ? <EvidenceList state={state} /> : <InspectPanel state={state} />;
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
  if (status === "blocked") return "Policy simulation after the change denies this permission. Within the stated scope, the path stops here.";
  if (status === "changed" || status === "reassess") return "The trust policy changed after the re-check. The earlier blocked result may no longer hold.";
  if (status === "rechecking") return "A new policy simulation is running against the changed trust policy.";
  if (status === "reopened") return "Policy simulation supports this permission again via the role-web-* principal. No role was assumed.";
  if (status === "candidate") return "Not yet reviewed. Open the evidence stage to see what supports it.";
  return edge.assessment;
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
        {from.label} <ChevronRight aria-hidden /> {to.label}
      </p>
      <div className="apd-basis">
        <span className="apd-basis-label">Evidence basis</span>
        <StatusChip status={edge.base} />
        {status !== edge.base && status !== "candidate" ? <StatusChip status={status} /> : null}
      </div>
      <p className="apd-assessment">{edgeResult(edgeId, state)}</p>
      <details className="apd-more">
        <summary>What was checked</summary>
        <Facts
          rows={[
            ["Checked", edge.evidence],
            ["Method", edge.method],
            ["Limits", edge.limitations],
            ["Technical detail", `${edge.action} · ${from.name} → ${to.name}`],
          ]}
        />
      </details>
    </div>
  );
}

function NodeDetail({ nodeId, onClose }: { nodeId: string; onClose: () => void }) {
  const node = nodeById(nodeId)!;
  const Icon = NODE_ICON[node.kind];
  const related = EDGES.filter((edge) => edge.from === nodeId || edge.to === nodeId);
  return (
    <div className="apd-insp-body">
      <PanelHead overline={node.typeLabel} title={node.label} onClose={onClose} />
      <p className="apd-node-summary">
        <span className="apd-node-icon">
          <Icon aria-hidden />
        </span>
        {node.summary}
      </p>
      <Facts
        rows={[
          ["Synthetic name", `${node.name} · ${node.resource}`],
          ["Relationships", related.map((edge) => edge.label).join(" · ")],
        ]}
      />
    </div>
  );
}

function DiscoverPanel() {
  return (
    <div className="apd-insp-body">
      <PanelHead overline="Understand the path" title="Four relationships connect an assumed foothold to production credentials" />
      <p className="apd-copy">
        The scenario maps {NODES.length - 1} resources and {EDGES.length} relationships. The highlighted route is the one under review. Nothing
        has been assessed yet.
      </p>
      <Facts
        rows={[
          ["Sensitive target", "Data store credentials (Secrets Manager)"],
          ["Starting condition", "Code execution in the application is assumed. Public exposure alone is not treated as compromise."],
        ]}
      />
      <p className="apd-hint">Select any resource or relationship to see what it depends on.</p>
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

function EvidenceList({ state }: { state: DemoState }) {
  const focused = focusEdgeId(state);
  return (
    <div className="apd-insp-body">
      <PanelHead overline="Inspect the evidence" title="What supports each relationship" />
      <ul className="apd-evidence">
        {INSPECT_ORDER.map((id) => {
          const edge = edgeById(id)!;
          const status = edgeStatus(edge, state);
          const revealed = status !== "candidate";
          return (
            <li key={id} className={`${id === focused ? "is-current" : ""}${revealed ? " is-revealed" : ""}`}>
              <div>
                <strong>{edge.label}</strong>
                <small>{revealed ? edge.assessment : "Pending review"}</small>
              </div>
              <StatusChip status={edge.base} />
            </li>
          );
        })}
      </ul>
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
      <PanelHead overline="Reassessment · Proposed change" title="Narrow the operations role's trust policy" />
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
          Only <strong>batch-scheduler</strong> could assume the operations role. The application role would lose sts:AssumeRole, so{" "}
          {SCENARIO.pathId} should stop at hop 3. This is a prediction until it is re-checked. Other relationships are unchanged.
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
      <PanelHead overline="Reassessment · Approval" title="A person decides. In this scenario, the customer's pipeline applies it." />
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
      {approved ? null : state.mode === "story" ? (
        <p className="apd-hint">Simulated operator approval in progress…</p>
      ) : (
        <button type="button" className="apd-primary" onClick={() => dispatch({ type: "approve" })}>
          <UserCheck aria-hidden /> Approve change (demo)
        </button>
      )}
      <p className="apd-boundary">This illustration depicts read-only collection and a change applied by the customer. Access requirements, action permissions and evaluation scope are agreed before onboarding.</p>
    </div>
  );
}

function VerifyPanel({ state }: { state: DemoState }) {
  const verified = state.beat >= 4;
  const hops = TRAVERSE_ORDER.map((id) => edgeById(id)!);
  return (
    <div className="apd-insp-body">
      <PanelHead overline="Reassessment · Re-check" title={`Re-check ${SCENARIO.pathId} against the new configuration`} />
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
          <strong>Bounded result · {SCENARIO.pathId} blocked at hop 3</strong>
          <dl className="apd-mini-record">
            <div>
              <dt>Changed</dt>
              <dd>Trust policy on the operations role</dd>
            </div>
            <div>
              <dt>Re-checked</dt>
              <dd>sts:AssumeRole by the application role: denied in policy simulation</dd>
            </div>
            <div>
              <dt>Checked at</dt>
              <dd>{TIMESTAMPS.verified}</dd>
            </div>
          </dl>
          <p>Still assumed: code execution in the application. Unchanged: public exposure is still observed and the storage bucket is not assessed. This result covers this path only.</p>
        </div>
      ) : null}
    </div>
  );
}

const DRIFT_STAGES = [
  { key: "changed", label: "What changed: the trust policy now allows role-web-*" },
  { key: "reassess", label: "The earlier blocked result is marked for reassessment" },
  { key: "rechecking", label: "What is rechecked: sts:AssumeRole against the new policy" },
  { key: "reopened", label: "Result: permission supported again under stated conditions" },
] as const;

function DriftPanel({ state, dispatch }: Props) {
  const stageIndex = DRIFT_STAGES.findIndex((stage) => stage.key === state.drift);
  if (state.drift === "none") {
    return (
      <div className="apd-insp-body">
        <PanelHead overline="Reassessment · Later change" title="A result holds only while the configuration holds" />
        <p className="apd-copy">
          {SCENARIO.pathId} was blocked at re-check as of {TIMESTAMPS.verified}. Introduce an illustrative change to see how the earlier result is
          reassessed.
        </p>
        <button type="button" className="apd-primary is-drift" onClick={() => dispatch({ type: "introduceDrift" })}>
          <TriangleAlert aria-hidden /> Introduce a demo change
        </button>
      </div>
    );
  }
  return (
    <div className="apd-insp-body">
      <PanelHead overline={`Later change · ${TIMESTAMPS.drift}`} title="Trust policy changed by a later deploy" />
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
          <strong>{SCENARIO.pathId} reopened within the stated scope</strong>
          <p>role-web-task matches role-web-* and policy simulation supports sts:AssumeRole again. Code execution in the application is still an assumption, not a test. The assessment record below is updated.</p>
        </div>
      ) : null}
    </div>
  );
}
