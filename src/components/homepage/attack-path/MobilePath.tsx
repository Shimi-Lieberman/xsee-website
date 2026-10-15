import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { PATH_EDGES } from "@/lib/attackPathScenario";
import { edgeById, edgeStatus, focusSet, litEdges, nodeById, type DemoState, type Selection } from "./demoState";
import { NODE_ICON, StatusChip } from "./parts";

const CONTEXT_EDGES = ["e-ingress", "e-forward", "e-exports"] as const;

type Props = {
  state: DemoState;
  onSelect: (selection: Selection) => void;
};

export default function MobilePath({ state, onSelect }: Props) {
  const focus = focusSet(state);
  const lit = litEdges(state);
  const pathNodes = ["foothold", ...PATH_EDGES.map((id) => edgeById(id)!.to)];

  const nodeButton = (id: string) => {
    const node = nodeById(id)!;
    const Icon = NODE_ICON[node.kind];
    const selected = state.selection?.kind === "node" && state.selection.id === id;
    return (
      <button
        type="button"
        className={`apd-m-node apd-node-${node.kind}${selected ? " is-selected" : ""}${focus.active && !focus.nodes.has(id) ? " is-dim" : ""}`}
        aria-pressed={selected}
        onClick={() => onSelect(selected ? null : { kind: "node", id })}
      >
        <span className="apd-node-icon">
          <Icon aria-hidden />
        </span>
        <span className="apd-node-copy">
          <strong>{node.name}</strong>
          <small>{node.resource}</small>
        </span>
        {node.tag ? <span className="apd-m-tag">{node.tag}</span> : null}
      </button>
    );
  };

  const edgeButton = (id: string, withEndpoints = false) => {
    const edge = edgeById(id)!;
    const status = edgeStatus(edge, state);
    const selected = state.selection?.kind === "edge" && state.selection.id === id;
    const focused = focus.edges.has(id);
    return (
      <button
        type="button"
        className={`apd-m-edge apd-status-${status}${focused ? " is-focus" : ""}${focus.active && !focused ? " is-dim" : ""}${lit.has(id) ? " is-lit" : ""}`}
        aria-pressed={selected}
        onClick={() => onSelect(selected ? null : { kind: "edge", id })}
      >
        <span className="apd-m-edge-line" aria-hidden />
        <span className="apd-m-edge-copy">
          {withEndpoints ? (
            <small>
              {nodeById(edge.from)!.name} <ChevronRight aria-hidden /> {nodeById(edge.to)!.name}
            </small>
          ) : null}
          <strong>{edge.label}</strong>
        </span>
        <StatusChip status={status} />
      </button>
    );
  };

  return (
    <div className="apd-mobile" data-shown={state.step > 0 || state.beat >= 1}>
      <p className="apd-m-heading">Path AP-12</p>
      <ol className="apd-m-path">
        {pathNodes.map((id, index) => (
          <Fragment key={id}>
            <li>{nodeButton(id)}</li>
            {index < PATH_EDGES.length ? <li>{edgeButton(PATH_EDGES[index])}</li> : null}
          </Fragment>
        ))}
      </ol>
      <p className="apd-m-heading">Other relationships</p>
      <ul className="apd-m-context">
        {CONTEXT_EDGES.map((id) => (
          <li key={id}>{edgeButton(id, true)}</li>
        ))}
      </ul>
    </div>
  );
}
