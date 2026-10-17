import RunwayML, {
  APIConnectionError,
  APIError,
  AuthenticationError,
  PermissionDeniedError,
  RateLimitError,
} from "@runwayml/sdk";
import { FILM_RATIO, type ModelId } from "./shots";
import type { RunwayState } from "./types";

const STATUS_TTL_MS = 30_000;
let cachedStatus: { at: number; value: RunwayState } | null = null;

export function runwayConfigured() {
  return Boolean(process.env.RUNWAYML_API_SECRET);
}

function client() {
  return new RunwayML({
    apiKey: process.env.RUNWAYML_API_SECRET,
    maxRetries: 3,
    timeout: 60_000,
  });
}

export function describeRunwayError(error: unknown) {
  if (error instanceof AuthenticationError) return "Runway rejected the API secret. Check RUNWAYML_API_SECRET.";
  if (error instanceof PermissionDeniedError) return "This Runway key is not allowed to use that model.";
  if (error instanceof RateLimitError) return "Runway's rate limit was reached. Wait a minute and try again.";
  if (error instanceof APIConnectionError) return "Could not reach Runway. Try again shortly.";
  if (error instanceof APIError) return error.message || `Runway returned an error (${error.status}).`;
  return error instanceof Error ? error.message : "Unknown Runway error.";
}

export async function runwayStatus(force = false): Promise<RunwayState> {
  if (!runwayConfigured()) return { state: "missing" };
  if (!force && cachedStatus && Date.now() - cachedStatus.at < STATUS_TTL_MS) return cachedStatus.value;
  let value: RunwayState;
  try {
    const org = await client().organization.retrieve();
    value = { state: "ready", creditBalance: org.creditBalance };
  } catch (error) {
    value = {
      state: error instanceof AuthenticationError ? "unauthorized" : "error",
      message: describeRunwayError(error),
    };
  }
  cachedStatus = { at: Date.now(), value };
  return value;
}

export function invalidateRunwayStatus() {
  cachedStatus = null;
}

type Submission = {
  model: ModelId;
  duration: number;
  promptText: string;
  negativePrompt?: string;
  promptImage?: string;
};

export async function submitGeneration({ model, duration, promptText, negativePrompt, promptImage }: Submission) {
  const runway = client();
  if (model === "gen4.5") {
    const task = promptImage
      ? await runway.imageToVideo.create({ model, promptImage, promptText, ratio: FILM_RATIO, duration })
      : await runway.textToVideo.create({ model, promptText, ratio: FILM_RATIO, duration });
    return task.id;
  }
  const veoDuration = duration as 4 | 6 | 8;
  const task = promptImage
    ? await runway.imageToVideo.create({
        model,
        promptImage,
        promptText,
        negativePrompt,
        ratio: FILM_RATIO,
        duration: veoDuration,
        audio: false,
      })
    : await runway.textToVideo.create({
        model,
        promptText,
        negativePrompt,
        ratio: FILM_RATIO,
        duration: veoDuration,
        audio: false,
      });
  return task.id;
}

export function retrieveTask(taskId: string) {
  return client().tasks.retrieve(taskId);
}

export function cancelTask(taskId: string) {
  return client().tasks.delete(taskId);
}
