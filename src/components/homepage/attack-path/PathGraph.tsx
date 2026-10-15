import type { CSSProperties } from "react";
import { EDGES, NODES, SCENARIO } from "@/lib/attackPathScenario";
import { GRAPH_VIEWBOX, LABEL_POSITIONS, NODE_BOX, NODE_POSITIONS } from "@/lib/attackPathLayout";
import {
  EDGE_STATUS_LABEL,
  edgeStatus,
  focusSet,
  litEdges,
  type DemoState,
  type EdgeStatus,
  type Selection,
} from "./demoState";
import { NODE_ICON, STATUS_ICON } from "./parts";

const { width: VW, height: VH } = GRAPH_VIEWBOX;

function trimmedLine(fromId: string, toId: string) {
  const a = NODE_POSITIONS[fromId];
  const b = NODE_POSITIONS[toId];
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const hw = NODE_BOX.width / 2 + 8;
  const hh = NODE_BOX.height / 2 + 8;
  const t = Math.min(dx ? hw / Math.abs(dx) : Infinity, dy ? hh / Math.abs(dy) : Infinity);
  return { x1: a.x + dx * t, y1: a.y + dy * t, x2: b.x - dx * t, y2: b.y - dy * t };
}

function markerFor(status: EdgeStatus, focused: boolean) {
  if (status === "blocked") return "apd-arrow-verified";
  if (["changed", "reassess", "rechecking", "reopened"].includes(status)) return "apd-arrow-drift";
  if (focused) return "apd-arrow-focus";
  return "apd-arrow-neutral";
}

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

const PULSE_EXCLUDED = new Set<EdgeStatus>(["blocked", "changed", "reassess", "rechecking", "reopened"]);

/** Compact evidence marker shown inside a relationship label. */
function labelState(status: EdgeStatus, focused: boolean) {
  if (status === "blocked") return "Blocked";
  if (status === "reopened") return "Reopened";
  if (status === "rechecking") return "Re-checking";
  if (status === "reassess" || status === "changed") return "Reassess";
  if (focused && status !== "candidate") return EDGE_STATUS_LABEL[status];
  return null;
}

type Props = {
  state: DemoState;
  onSelect: (selection: Selection) => void;
};

export default function PathGraph({ state, onSelect }: Props) {
  const focus = focusSet(state);
  const lit = litEdges(state);

  return (
    <div className="apd-graph">
      <svg viewBox={`0 0 ${VW} ${VH}`} className="apd-graph-svg" aria-hidden focusable="false">
        <defs>
          {[
            ["apd-arrow-neutral", "#7d8695"],
            ["apd-arrow-focus", "#ff4ba6"],
            ["apd-arrow-verified", "#3ad6c0"],
            ["apd-arrow-drift", "#f2b34b"],
          ].map(([id, fill]) => (
            <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill={fill} />
            </marker>
          ))}
        </defs>
        {EDGES.map((edge) => {
          const status = edgeStatus(edge, state);
          const line = trimmedLine(edge.from, edge.to);
          const focused = focus.edges.has(edge.id);
          const dimmed = focus.active && !focused;
          const traced = lit.has(edge.id);
          const stopsHere = traced && status === "blocked";
          const pulses = focused && !traced && !PULSE_EXCLUDED.has(status);
          return (
            <g key={edge.id} className={`apd-edge apd-status-${status}${focused ? " is-focus" : ""}${dimmed ? " is-dim" : ""}`}>
              <line {...line} className="apd-edge-line" markerEnd={`url(#${markerFor(status, focused)})`} />
              {pulses ? <line {...line} pathLength={1} className="apd-edge-pulse" /> : null}
              {traced ? (
                <line
                  key={`${edge.id}-${state.step}-${state.drift}`}
                  {...line}
                  pathLength={1}
                  className={`apd-edge-trace${stopsHere ? " is-stopped" : ""}`}
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      {EDGES.map((edge) => {
        const status = edgeStatus(edge, state);
        const line = trimmedLine(edge.from, edge.to);
        const pos = LABEL_POSITIONS[edge.id] ?? { x: (line.x1 + line.x2) / 2, y: (line.y1 + line.y2) / 2 };
        const focused = focus.edges.has(edge.id);
        const selected = state.selection?.kind === "edge" && state.selection.id === edge.id;
        const Icon = STATUS_ICON[status];
        const from = NODES.find((node) => node.id === edge.from)?.name;
        const to = NODES.find((node) => node.id === edge.to)?.name;
        return (
          <button
            key={edge.id}
            type="button"
            className={`apd-edge-label apd-status-${status}${focused ? " is-focus" : ""}${focus.active && !focused ? " is-dim" : ""}${pos.align === "start" ? " is-start" : ""}`}
            style={{ left: pct(pos.x, VW), top: pct(pos.y, VH) }}
            aria-pressed={selected}
            aria-label={`Relationship ${from} to ${to}: ${edge.label}. Status: ${EDGE_STATUS_LABEL[status]}`}
            onClick={() => onSelect(selected ? null : { kind: "edge", id: edge.id })}
          >
            <Icon aria-hidden />
            <span>{edge.label}</span>
            {labelState(status, focused && state.step >= 1) ? (
              <span key={status} className="apd-edge-label-state">
                {labelState(status, focused && state.step >= 1)}
              </span>
            ) : null}
          </button>
        );
      })}

      {NODES.map((node, index) => {
        const pos = NODE_POSITIONS[node.id];
        const Icon = NODE_ICON[node.kind];
        const selected = state.selection?.kind === "node" && state.selection.id === node.id;
        const dimmed = focus.active && !focus.nodes.has(node.id);
        return (
          <button
            key={node.id}
            type="button"
            className={`apd-node apd-node-${node.kind}${selected ? " is-selected" : ""}${dimmed ? " is-dim" : ""}${node.id === "secret" ? " is-target" : ""}`}
            style={
              {
                left: pct(pos.x, VW),
                top: pct(pos.y, VH),
                width: pct(NODE_BOX.width, VW),
                height: pct(NODE_BOX.height, VH),
                "--node-delay": `${index * 60}ms`,
              } as CSSProperties
            }
            aria-pressed={selected}
            aria-label={`${node.name}, ${node.typeLabel}${node.tag ? `, ${node.tag}` : ""}`}
            onClick={() => onSelect(selected ? null : { kind: "node", id: node.id })}
          >
            {node.tag ? <span className="apd-node-tag">{node.tag}</span> : null}
            <span className="apd-node-icon">
              <Icon aria-hidden />
            </span>
            <span className="apd-node-copy">
              <strong>{node.name}</strong>
              <small>{node.resource}</small>
            </span>
          </button>
        );
      })}

      <p className="sr-only">
        Path {SCENARIO.pathId}: assumed foothold in web-frontend, task role credentials to role-web-task, sts:AssumeRole to
        role-batch-ops, GetSecretValue on prod/orders-db.
      </p>
    </div>
  );
}
