import "server-only";
import { del, list, put } from "@vercel/blob";
import type { Film, Take } from "./types";

const ROOT = "cinematic-lab";
const TAKE_PREFIX = `${ROOT}/takes/`;
const FILM_PREFIX = `${ROOT}/film/`;
const FILM_KEY = "current";
const ASSET_MAX_AGE = 60 * 60 * 24 * 365;

export function blobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

// Overwriting a fixed pathname lets Blob's CDN serve stale copies for minutes, which once
// reverted an approval. Every save is a new immutable version; reads take the newest via list().
type Version = { pathname: string; url: string; key: string; stamp: number };

async function listAll(prefix: string) {
  const blobs: { pathname: string; url: string }[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return blobs;
}

function parseVersion(prefix: string, blob: { pathname: string; url: string }): Version | null {
  const rest = blob.pathname.slice(prefix.length);
  const versioned = /^([^/]+)\/v(\d+)-[^/]*\.json$/.exec(rest);
  if (versioned) return { ...blob, key: versioned[1], stamp: Number(versioned[2]) };
  const legacy = /^([^/]+)\.json$/.exec(rest);
  return legacy ? { ...blob, key: legacy[1], stamp: 0 } : null;
}

async function latestVersions(prefix: string) {
  const byKey = new Map<string, Version[]>();
  for (const blob of await listAll(prefix)) {
    const version = parseVersion(prefix, blob);
    if (!version) continue;
    byKey.set(version.key, [...(byKey.get(version.key) ?? []), version]);
  }
  for (const versions of byKey.values()) versions.sort((a, b) => b.stamp - a.stamp);
  return byKey;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) return null;
  return (await response.json()) as T;
}

async function writeVersion(prefix: string, key: string, value: unknown) {
  const older = (await latestVersions(`${prefix}`)).get(key) ?? [];
  await put(`${prefix}${key}/v${Date.now()}-.json`, JSON.stringify(value), {
    access: "public",
    addRandomSuffix: true,
    contentType: "application/json",
    cacheControlMaxAge: ASSET_MAX_AGE,
  });
  if (older.length) await del(older.map((version) => version.url)).catch(() => undefined);
}

async function readLatest<T>(prefix: string, key: string): Promise<T | null> {
  const newest = (await latestVersions(`${prefix}`)).get(key)?.[0];
  return newest ? fetchJson<T>(newest.url) : null;
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
  const versions = await latestVersions(TAKE_PREFIX);
  const takes = await Promise.all([...versions.values()].map((group) => fetchJson<Take>(group[0].url)));
  return takes
    .filter((take): take is Take => take !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getTake(id: string) {
  return readLatest<Take>(TAKE_PREFIX, id);
}

export async function saveTake(take: Take) {
  const next = { ...take, updatedAt: new Date().toISOString() };
  await writeVersion(TAKE_PREFIX, take.id, next);
  return next;
}

export async function removeTake(take: Take) {
  await deleteAssets([take.videoUrl, take.lastFrameUrl]);
  const versions = (await latestVersions(TAKE_PREFIX)).get(take.id) ?? [];
  if (versions.length) await del(versions.map((version) => version.url));
}

export function readFilm() {
  return readLatest<Film>(FILM_PREFIX, FILM_KEY);
}

export function writeFilm(film: Film) {
  return writeVersion(FILM_PREFIX, FILM_KEY, film);
}
