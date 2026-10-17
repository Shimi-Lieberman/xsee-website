import "server-only";
import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import ffmpegPath from "ffmpeg-static";
import {
  DISSOLVE_SECONDS,
  FADE_IN_SECONDS,
  FILM_FPS,
  FILM_GRADE,
  FILM_HEIGHT,
  FILM_WIDTH,
  SHOT_SECONDS,
} from "./bible";
import type { FilmJoin } from "./types";

const run = promisify(execFile);
const MOBILE_WIDTH = 1280;
const MOBILE_HEIGHT = 720;

/**
 * Fits a clip to SHOT_SECONDS without breaking frame-chained cuts: a chained
 * clip's first frame continues the previous clip's last frame, so those frames
 * must survive. Free ends are trimmed; a clip bound at both ends is retimed.
 */
function fitToShot(duration: number, startBound: boolean, endBound: boolean) {
  const target = Math.min(SHOT_SECONDS, duration);
  if (duration - target < 0.05) return { filter: "setpts=PTS-STARTPTS", length: duration };
  if (startBound && endBound) {
    return { filter: `setpts=${(target / duration).toFixed(5)}*(PTS-STARTPTS)`, length: target };
  }
  if (endBound) {
    return { filter: `trim=start=${(duration - target).toFixed(3)},setpts=PTS-STARTPTS`, length: target };
  }
  return { filter: `trim=duration=${target.toFixed(3)},setpts=PTS-STARTPTS`, length: target };
}

export function ffmpegAvailable() {
  return Boolean(ffmpegPath && existsSync(ffmpegPath));
}

async function ffmpeg(args: string[]) {
  if (!ffmpegPath) throw new Error("ffmpeg is not available on this server.");
  await run(ffmpegPath, ["-hide_banner", "-loglevel", "error", "-y", ...args], { maxBuffer: 16 * 1024 * 1024 });
}

export async function withWorkdir<T>(task: (dir: string) => Promise<T>) {
  const dir = await mkdtemp(path.join(tmpdir(), "xsee-lab-"));
  try {
    return await task(dir);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

export async function download(url: string, destination: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed (${response.status}).`);
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  return destination;
}

export async function probeDuration(file: string) {
  if (!ffmpegPath) throw new Error("ffmpeg is not available on this server.");
  const stderr = await run(ffmpegPath, ["-hide_banner", "-i", file], { maxBuffer: 4 * 1024 * 1024 })
    .then((result) => result.stderr)
    .catch((error: { stderr?: string }) => error.stderr ?? "");
  const match = /Duration: (\d+):(\d+):([\d.]+)/.exec(stderr);
  if (!match) throw new Error("Could not read the clip's duration.");
  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
}

export async function extractLastFrame(video: string, dir: string) {
  const out = path.join(dir, "last-frame.jpg");
  await ffmpeg(["-sseof", "-0.1", "-i", video, "-frames:v", "1", "-q:v", "2", out]);
  return readFile(out);
}

type Clip = { file: string; duration: number };

export type AssembledFilm = {
  master: Buffer;
  mobile: Buffer;
  poster: Buffer;
  duration: number;
  boundaries: { start: number; end: number }[];
};

export async function assembleFilm(clips: Clip[], joins: FilmJoin[], dir: string): Promise<AssembledFilm> {
  const fitted = clips.map((clip, i) => fitToShot(clip.duration, joins[i - 1] === "cut", joins[i] === "cut"));
  const filters = fitted.map(
    (fit, i) =>
      `[${i}:v]${fit.filter},scale=${FILM_WIDTH}:${FILM_HEIGHT}:force_original_aspect_ratio=increase,crop=${FILM_WIDTH}:${FILM_HEIGHT},fps=${FILM_FPS},format=yuv420p,setsar=1,settb=AVTB[s${i}]`,
  );
  const starts = [0];
  let current = "s0";
  let length = fitted[0].length;

  for (let i = 1; i < clips.length; i += 1) {
    const next = `j${i}`;
    if (joins[i - 1] === "cut") {
      filters.push(`[${current}][s${i}]concat=n=2:v=1:a=0[${next}]`);
      starts.push(length);
      length += fitted[i].length;
    } else {
      const offset = Math.max(0, length - DISSOLVE_SECONDS);
      filters.push(`[${current}][s${i}]xfade=transition=fade:duration=${DISSOLVE_SECONDS}:offset=${offset.toFixed(3)}[${next}]`);
      starts.push(offset + DISSOLVE_SECONDS / 2);
      length += fitted[i].length - DISSOLVE_SECONDS;
    }
    current = next;
  }

  filters.push(`[${current}]${FILM_GRADE},fade=t=in:st=0:d=${FADE_IN_SECONDS},split=2[hd][sd0]`);
  filters.push(`[sd0]scale=${MOBILE_WIDTH}:${MOBILE_HEIGHT}[sd]`);

  const master = path.join(dir, "film-1080p.mp4");
  const mobile = path.join(dir, "film-720p.mp4");
  const poster = path.join(dir, "poster.jpg");
  const encode = ["-c:v", "libx264", "-preset", "slow", "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an"];

  await ffmpeg([
    ...clips.flatMap((clip) => ["-i", clip.file]),
    "-filter_complex",
    filters.join(";"),
    "-map", "[hd]", ...encode, "-crf", "21", master,
    "-map", "[sd]", ...encode, "-crf", "24", mobile,
  ]);
  await ffmpeg(["-ss", Math.min(2, length / 2).toFixed(2), "-i", master, "-frames:v", "1", "-q:v", "3", poster]);

  const boundaries = starts.map((start, i) => ({ start, end: starts[i + 1] ?? length }));
  const [masterBuffer, mobileBuffer, posterBuffer] = await Promise.all([readFile(master), readFile(mobile), readFile(poster)]);
  return { master: masterBuffer, mobile: mobileBuffer, poster: posterBuffer, duration: length, boundaries };
}
