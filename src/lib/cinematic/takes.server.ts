import "server-only";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { download, extractLastFrame, withWorkdir, assembleFilm, probeDuration, ffmpegAvailable } from "./media.server";
import { checkGeneration, describeGatewayError, gatewayStatus, invalidateGatewayStatus, submitGeneration } from "./gateway.server";
import { renderEndCard } from "./endcard.server";
import { composePrompt, END_CARD, estimateCredits, formatUsd, isModelId, MODELS, previousShot, SHOTS, VIDEO_MIN_BALANCE, type ModelId, type Shot } from "./shots";
import { blobConfigured, deleteAssets, getTake, listTakes, putAsset, readFilm, removeTake, saveTake, writeFilm } from "./store.server";
import { isActive, type Film, type FilmJoin, type LabSnapshot, type Take } from "./types";

const TAKE_TIMEOUT_MS = 20 * 60 * 1000;
const SAVING_STALE_MS = 3 * 60 * 1000;
const inFlight = new Set<string>();

export class LabError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
  }
}

async function persistOutput(take: Take, video: Buffer) {
  return withWorkdir(async (dir) => {
    const { writeFile } = await import("node:fs/promises");
    const file = path.join(dir, "take.mp4");
    await writeFile(file, video);
    const frame = await extractLastFrame(file, dir);
    const [videoUrl, lastFrameUrl] = await Promise.all([
      putAsset(`assets/${take.shotId}-${take.id}.mp4`, video, "video/mp4"),
      putAsset(`assets/${take.shotId}-${take.id}-last.jpg`, frame, "image/jpeg"),
    ]);
    return { videoUrl, lastFrameUrl };
  });
}

async function refreshTake(take: Take): Promise<Take> {
  if (!isActive(take.status) || inFlight.has(take.id)) return take;
  if (take.status === "saving" && Date.now() - Date.parse(take.updatedAt) < SAVING_STALE_MS) return take;
  if (!take.operation || !isModelId(take.model)) {
    return saveTake({ ...take, status: "failed", error: "Started with the old Runway setup and can no longer be checked." });
  }
  inFlight.add(take.id);
  try {
    if (Date.now() - Date.parse(take.createdAt) > TAKE_TIMEOUT_MS) {
      return await saveTake({ ...take, status: "failed", error: "Timed out after 20 minutes. No output was saved." });
    }
    const result = await checkGeneration(take.model, take.operation);
    if (result.status === "error") return await saveTake({ ...take, status: "failed", error: result.error });
    if (result.status === "pending") {
      if (take.status === "running") return take;
      return await saveTake({ ...take, status: "running", progress: null });
    }
    await saveTake({ ...take, status: "saving", progress: 1 });
    const assets = await persistOutput(take, result.video);
    invalidateGatewayStatus();
    return await saveTake({ ...take, ...assets, status: "succeeded", progress: 1, error: null });
  } catch (error) {
    if (take.status === "saving") {
      return await saveTake({ ...take, status: "failed", error: `Saving the video failed: ${describeGatewayError(error)}` });
    }
    return { ...take, error: describeGatewayError(error) };
  } finally {
    inFlight.delete(take.id);
  }
}

export async function snapshot(): Promise<LabSnapshot> {
  const blob = blobConfigured();
  const [gateway, stored, film] = await Promise.all([
    gatewayStatus(),
    blob ? listTakes() : Promise.resolve([]),
    blob ? readFilm() : Promise.resolve(null),
  ]);
  const takes = await Promise.all(stored.map(refreshTake));
  return {
    status: { gateway, blob, ffmpeg: ffmpegAvailable(), production: process.env.NODE_ENV === "production" },
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

  const gateway = await gatewayStatus(true);
  if (gateway.state !== "ready") throw new LabError(gateway.message, 503);
  if (gateway.creditBalance < VIDEO_MIN_BALANCE) {
    throw new LabError(
      `AI Gateway only starts video generation with a balance of at least ${formatUsd(VIDEO_MIN_BALANCE)}. Current balance: ${formatUsd(gateway.creditBalance)}. This take would cost ${formatUsd(credits)}.`,
      402,
    );
  }
  if (gateway.creditBalance < credits) {
    throw new LabError(`Not enough AI Gateway balance: ${formatUsd(credits)} needed, ${formatUsd(gateway.creditBalance)} available.`, 402);
  }

  let chainedFrom: Take | null = null;
  if (chain) {
    const prior = previousShot(shot);
    if (!prior) throw new LabError("The first shot has nothing to chain from.");
    const takes = await listTakes();
    chainedFrom = takes.find((take) => take.shotId === prior.id && take.approved && take.lastFrameUrl) ?? null;
    if (!chainedFrom) throw new LabError(`Approve a take of “${prior.title}” first, so this shot can start on its last frame.`);
  }

  const { promptText } = composePrompt(shot, model);
  let operation: Awaited<ReturnType<typeof submitGeneration>>;
  try {
    operation = await submitGeneration({
      model,
      duration,
      promptText,
      startFrameUrl: chainedFrom?.lastFrameUrl ?? undefined,
    });
  } catch (error) {
    throw new LabError(describeGatewayError(error), 502);
  }
  invalidateGatewayStatus();

  const now = new Date().toISOString();
  return saveTake({
    id: randomUUID(),
    shotId: shot.id,
    model,
    duration,
    credits,
    chainedFromTakeId: chainedFrom?.id ?? null,
    promptText,
    operation,
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
        return { file, duration: await probeDuration(file), slot: SHOTS[i].seconds };
      }),
    );
    return assembleFilm(clips, joins, await renderEndCard(dir), dir);
  });

  const stamp = Date.now();
  const [url, mobileUrl, posterUrl] = await Promise.all([
    putAsset(`film/inside-the-attack-${stamp}-1080p.mp4`, assembled.master, "video/mp4"),
    putAsset(`film/inside-the-attack-${stamp}-720p.mp4`, assembled.mobile, "video/mp4"),
    putAsset(`film/inside-the-attack-${stamp}-poster.jpg`, assembled.poster, "image/jpeg"),
  ]);

  const previous = await readFilm();
  const film: Film = {
    url,
    mobileUrl,
    posterUrl,
    duration: assembled.duration,
    segments: assembled.boundaries.map((boundary, i) => ({ shotId: SHOTS[i]?.id ?? END_CARD.id, ...boundary })),
    joins,
    takeIds: approved.map((take) => take.id),
    createdAt: new Date().toISOString(),
  };
  await writeFilm(film);
  if (previous) await deleteAssets([previous.url, previous.mobileUrl, previous.posterUrl]).catch(() => undefined);
  return film;
}
