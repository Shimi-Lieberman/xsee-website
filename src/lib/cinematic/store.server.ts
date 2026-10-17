import "server-only";
import { del, get, list, put } from "@vercel/blob";
import type { Film, Take } from "./types";

const ROOT = "cinematic-lab";
const TAKE_PREFIX = `${ROOT}/takes/`;
const FILM_PATH = `${ROOT}/film.json`;
const ASSET_MAX_AGE = 60 * 60 * 24 * 365;

export function blobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readJson<T>(pathname: string): Promise<T | null> {
  const result = await get(pathname, { access: "public", useCache: false });
  if (!result || result.statusCode !== 200) return null;
  return JSON.parse(await new Response(result.stream).text()) as T;
}

async function writeJson(pathname: string, value: unknown) {
  await put(pathname, JSON.stringify(value), {
    access: "public",
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}

export async function putAsset(pathname: string, body: Buffer, contentType: string) {
  const blob = await put(`${ROOT}/${pathname}`, body, {
    access: "public",
    addRandomSuffix: true,
    contentType,
    cacheControlMaxAge: ASSET_MAX_AGE,
  });
  return blob.url;
}

export async function deleteAssets(urls: (string | null | undefined)[]) {
  const targets = urls.filter((url): url is string => Boolean(url));
  if (targets.length) await del(targets);
}

export async function listTakes(): Promise<Take[]> {
  const pathnames: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: TAKE_PREFIX, cursor });
    pathnames.push(...page.blobs.map((blob) => blob.pathname));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  const takes = await Promise.all(pathnames.map((pathname) => readJson<Take>(pathname)));
  return takes
    .filter((take): take is Take => take !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getTake(id: string) {
  return readJson<Take>(`${TAKE_PREFIX}${id}.json`);
}

export async function saveTake(take: Take) {
  const next = { ...take, updatedAt: new Date().toISOString() };
  await writeJson(`${TAKE_PREFIX}${take.id}.json`, next);
  return next;
}

export async function removeTake(take: Take) {
  await deleteAssets([take.videoUrl, take.lastFrameUrl]);
  await del(`${TAKE_PREFIX}${take.id}.json`);
}

export function readFilm() {
  return readJson<Film>(FILM_PATH);
}

export function writeFilm(film: Film) {
  return writeJson(FILM_PATH, film);
}
