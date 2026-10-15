import {
  Archive,
  Ban,
  CircleDashed,
  CircleHelp,
  Container,
  Crosshair,
  Eye,
  FlaskConical,
  Globe,
  KeyRound,
  LockKeyhole,
  Network,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import type { NodeKind } from "@/lib/attackPathScenario";
import { EDGE_STATUS_LABEL, type EdgeStatus, type PathResult } from "./demoState";

export const NODE_ICON: Record<NodeKind, LucideIcon> = {
  internet: Globe,
  alb: Network,
  foothold: Crosshair,
  ecs: Container,
  role: KeyRound,
  secret: LockKeyhole,
  bucket: Archive,
};

export const STATUS_ICON: Record<EdgeStatus, LucideIcon> = {
  candidate: CircleDashed,
  assumed: Crosshair,
  observed: Eye,
  simulated: FlaskConical,
  untested: CircleHelp,
  blocked: Ban,
  changed: TriangleAlert,
  reassess: TriangleAlert,
  rechecking: RefreshCw,
  reopened: ShieldAlert,
};

export function StatusChip({ status }: { status: EdgeStatus }) {
  const Icon = STATUS_ICON[status];
  return (
    <span className={`apd-chip apd-status-${status}`}>
      <Icon aria-hidden />
      {EDGE_STATUS_LABEL[status]}
    </span>
  );
}

const RESULT_ICON: Record<PathResult["tone"], LucideIcon> = {
  risk: ShieldAlert,
  pending: CircleDashed,
  verified: ShieldCheck,
  drift: TriangleAlert,
  neutral: RefreshCw,
};

export function ResultChip({ result }: { result: PathResult }) {
  const Icon = RESULT_ICON[result.tone];
  return (
    <span className={`apd-result apd-tone-${result.tone}`}>
      <Icon aria-hidden />
      {result.label}
    </span>
  );
}
