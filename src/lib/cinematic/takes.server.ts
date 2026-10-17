import { randomUUID } from "node:crypto";
import path from "node:path";
import { download, extractLastFrame, withWorkdir, assembleFilm, probeDuration, ffmpegAvailable } from "./media.server";
import { describeRunwayError, invalidateRunwayStatus, retrieveTask, runwayStatus, submitGeneration, cancelTask } from "./runway.server";
import { composePrompt, estimateCredits, MODELS, previousShot, SHOTS, type ModelId, type Shot } from "./shots";
import { blobConfigured, deleteAssets, getTake, listTakes, putAsset, readFilm, removeTake, saveTake, writeFilm } from "./store.server";
import { isActive, type Film, type FilmJoin, type LabSnapshot, type Take, type TakeStatus } from "./types";

const TAKE_TIMEOUT_MS = 20 * 60 * 1000;
const SAVING_STALE_MS = 3 * 60 * 1000;
const inFlight = new Set<string>();

export class LabError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
  }
}

const RUNWAY_STATUS: Record<string, TakeStatus> = {
  PENDING: "pending",
  THROTTLED: "throttled",
  RUNNING: "running",
  CANCELLED: "cancelled",
  FAILED: "failed",
};

async function persistOutput(take: Take, outputUrl: string) {
  return withWorkdir(async (dir) => {
    const video = await download(outputUrl, path.join(dir, "take.mp4"));
    const frame = await extractLastFrame(video, dir);
    const { readFile } = await import("node:fs/promises");
    const [videoUrl, lastFrameUrl] = await Promise.all([
      putAsset(`assets/${take.shotId}-${take.id}.mp4`, await readFile(video), "video/mp4"),
      putAsset(`assets/${take.shotId}-${take.id}-last.jpg`, frame, "image/jpeg"),
    ]);
    return { videoUrl, lastFrameUrl };
  });
}

async function refreshTake(take: Take): Promise<Take> {
  if (!isActive(take.status) || inFlight.has(take.id)) return take;
  if (take.status === "saving" && Date.now() - Date.parse(take.updatedAt) < SAVING_STALE_MS) return take;
  inFlight.add(take.id);
  try {
    if (Date.now() - Date.parse(take.createdAt) > TAKE_TIMEOUT_MS) {
      return await saveTake({ ...take, status: "failed", error: "Timed out after 20 minutes. No output was saved." });
    }
    const task = await retrieveTask(take.runwayTaskId);
    if (task.status === "SUCCEEDED") {
      const outputUrl = task.output[0];
      if (!outputUrl) return await saveTake({ ...take, status: "failed", error: "Runway finished without a video." });
      await saveTake({ ...take, status: "saving", progress: 1 });
      const assets = await persistOutput(take, outputUrl);
      invalidateRunwayStatus();
      return await saveTake({ ...take, ...assets, status: "succeeded", progress: 1, error: null });
    }
    if (task.status === "FAILED") {
      const code = task.failureCode ? ` (${task.failureCode})` : "";
      return await saveTake({ ...take, status: "failed", error: `${task.failure}${code}` });
    }
    const status = RUNWAY_STATUS[task.status] ?? take.status;
    const progress = task.status === "RUNNING" ? task.progress : null;
    if (status === take.status && progress === take.progress) return take;
    return await saveTake({ ...take, status, progress });
  } catch (error) {
    if (take.status === "saving") {
      return await saveTake({ ...take, status: "failed", error: `Saving the video failed: ${describeRunwayError(error)}` });
    }
    return { ...take, error: describeRunwayError(error) };
  } finally {
    inFlight.delete(take.id);
  }
}

export async function snapshot(): Promise<LabSnapshot> {
  const blob = blobConfigured();
  const [runway, stored, film] = await Promise.all([
    runwayStatus(),
    blob ? listTakes() : Promise.resolve([]),
    blob ? readFilm() : Promise.resolve(null),
  ]);
  const takes = await Promise.all(stored.map(refreshTake));
  return {
    status: { runway, blob, ffmpeg: ffmpegAvailable(), production: process.env.NODE_ENV === "production" },
    takes,
    film,
  };
}

type CreateInput = { shot: Shot; model: ModelId; duration: number; chain: boolean; approvedCredits: number };

export async function createTake({ shot, model, duration, chain, approvedCredits }: CreateInput) {
  if (!blobConfigured()) throw new LabError("Blob storage is not connected.", 503);
  if (!MODELS[model].durations.includes(duration)) throw new LabError(`${MODELS[model].label} cannot make a ${duration}-second clip.`);
  const credits = estimateCredits(model, duration);
  if (approvedCredits !== credits) throw new LabError("The approved cost does not match this generation. Review it and approve again.", 409);

  const runway = await runwayStatus(true);
  if (runway.state !== "ready") throw new LabError(runway.state === "missing" ? "RUNWAYML_API_SECRET is not set." : runway.message, 503);
  if (runway.creditBalance < credits) throw new LabError(`Not enough Runway credits: ${credits} needed, ${runway.creditBalance} available.`, 402);

  let chainedFrom: Take | null = null;
  if (chain) {
    const prior = previousShot(shot);
    if (!prior) throw new LabError("The first shot has nothing to chain from.");
    const takes = await listTakes();
    chainedFrom = takes.find((take) => take.shotId === prior.id && take.approved && take.lastFrameUrl) ?? null;
    if (!chainedFrom) throw new LabError(`Approve a take of “${prior.title}” first, so this shot can start on its last frame.`);
  }

  const { promptText, negativePrompt } = composePrompt(shot, model);
  let runwayTaskId: string;
  try {
    runwayTaskId = await submitGeneration({
      model,
      duration,
      promptText,
      negativePrompt,
      promptImage: chainedFrom?.lastFrameUrl ?? undefined,
    });
  } catch (error) {
    throw new LabError(describeRunwayError(error), 502);
  }
  invalidateRunwayStatus();

  const now = new Date().toISOString();
  return saveTake({
    id: randomUUID(),
    shotId: shot.id,
    model,
    duration,
    credits,
    chainedFromTakeId: chainedFrom?.id ?? null,
    promptText,
    runwayTaskId,
    status: "pending",
    progress: null,
    error: null,
    videoUrl: null,
    lastFrameUrl: null,
    approved: false,
    createdAt: now,
    updatedAt: now,
  });
}

export async function approveTake(id: string, approved: boolean) {
  const take = await getTake(id);
  if (!take) throw new LabError("Take not found.", 404);
  if (approved && take.status !== "succeeded") throw new LabError("Only finished takes can be approved.");
  if (approved) {
    const siblings = (await listTakes()).filter((other) => other.shotId === take.shotId && other.approved && other.id !== id);
    await Promise.all(siblings.map((other) => saveTake({ ...other, approved: false })));
  }
  return saveTake({ ...take, approved });
}

export async function deleteTake(id: string) {
  const take = await getTake(id);
  if (!take) throw new LabError("Take not found.", 404);
  if (isActive(take.status)) {
    await cancelTask(take.runwayTaskId).catch(() => undefined);
  }
  await removeTake(take);
}

export async function buildFilm(): Promise<Film> {
  if (!ffmpegAvailable()) throw new LabError("ffmpeg is not available on this server, so the film cannot be assembled.", 503);
  const takes = await listTakes();
  const chosen = SHOTS.map((shot) => takes.find((take) => take.shotId === shot.id && take.approved && take.videoUrl));
  const missing = SHOTS.filter((_, i) => !chosen[i]);
  if (missing.length) throw new LabError(`Approve a take for: ${missing.map((shot) => shot.title).join(", ")}.`);
  const approved = chosen as Take[];
  const joins: FilmJoin[] = approved.slice(1).map((take, i) => (take.chainedFromTakeId === approved[i].id ? "cut" : "dissolve"));

  const assembled = await withWorkdir(async (dir) => {
    const clips = await Promise.all(
      approved.map(async (take, i) => {
        const file = await download(take.videoUrl!, path.join(dir, `clip-${i}.mp4`));
        return { file, duration: await probeDuration(file) };
      }),
    );
    return assembleFilm(clips, joins, dir);
  });

  const stamp = Date.now();
  const [url, mobileUrl, posterUrl] = await Promise.all([
    putAsset(`film/inside-the-attack-${stamp}-1280.mp4`, assembled.master, "video/mp4"),
    putAsset(`film/inside-the-attack-${stamp}-854.mp4`, assembled.mobile, "video/mp4"),
    putAsset(`film/inside-the-attack-${stamp}-poster.jpg`, assembled.poster, "image/jpeg"),
  ]);

  const previous = await readFilm();
  const film: Film = {
    url,
    mobileUrl,
    posterUrl,
    duration: assembled.duration,
    segments: assembled.boundaries.map((boundary, i) => ({ shotId: SHOTS[i].id, ...boundary })),
    joins,
    takeIds: approved.map((take) => take.id),
    createdAt: new Date().toISOString(),
  };
  await writeFilm(film);
  if (previous) await deleteAssets([previous.url, previous.mobileUrl, previous.posterUrl]).catch(() => undefined);
  return film;
}
