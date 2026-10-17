import type { ModelId, ShotId } from "./shots";

export type TakeStatus =
  | "pending"
  | "throttled"
  | "running"
  | "saving"
  | "succeeded"
  | "failed"
  | "cancelled";

export const ACTIVE_STATUSES: readonly TakeStatus[] = ["pending", "throttled", "running", "saving"];

export function isActive(status: TakeStatus) {
  return ACTIVE_STATUSES.includes(status);
}

export type Take = {
  id: string;
  shotId: ShotId;
  model: ModelId;
  duration: number;
  credits: number;
  chainedFromTakeId: string | null;
  promptText: string;
  runwayTaskId: string;
  status: TakeStatus;
  progress: number | null;
  error: string | null;
  videoUrl: string | null;
  lastFrameUrl: string | null;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FilmJoin = "cut" | "dissolve";

export type FilmSegment = { shotId: ShotId; start: number; end: number };

export type Film = {
  url: string;
  mobileUrl: string;
  posterUrl: string;
  duration: number;
  segments: FilmSegment[];
  joins: FilmJoin[];
  takeIds: string[];
  createdAt: string;
};

export type RunwayState =
  | { state: "missing" }
  | { state: "ready"; creditBalance: number }
  | { state: "unauthorized" | "error"; message: string };

export type LabStatus = {
  runway: RunwayState;
  blob: boolean;
  ffmpeg: boolean;
  production: boolean;
};

export type LabSnapshot = {
  status: LabStatus;
  takes: Take[];
  film: Film | null;
};
