import "server-only";
import { experimental_getVideoStatus, experimental_startVideo, gateway, type JSONValue } from "ai";
import { CREDIT_USD, FILM_RATIO, formatUsd, GENERATION_RESOLUTION, MODELS, VIDEO_MIN_BALANCE, type ModelId } from "./shots";
import type { GatewayState } from "./types";

const STATUS_TTL_MS = 30_000;
let cachedStatus: { at: number; value: GatewayState } | null = null;

export function describeGatewayError(error: unknown) {
  if (error instanceof Error) {
    if (error.name === "GatewayAuthenticationError") return "AI Gateway rejected the request. Check the Vercel project's AI Gateway access.";
    if (error.name === "GatewayRateLimitError") return "AI Gateway rate limit reached. Wait a minute and try again.";
    if (/minimum balance/i.test(error.message)) {
      return `AI Gateway requires a balance of at least ${formatUsd(VIDEO_MIN_BALANCE)} before it will start any video generation. Top up credits on Vercel.`;
    }
    if (error.name === "GatewayInsufficientFundsError" || /insufficient/i.test(error.message)) {
      return "The AI Gateway balance is too low for this generation. Top up credits on Vercel.";
    }
    return error.message;
  }
  return "Unknown AI Gateway error.";
}

export async function gatewayStatus(force = false): Promise<GatewayState> {
  if (!force && cachedStatus && Date.now() - cachedStatus.at < STATUS_TTL_MS) return cachedStatus.value;
  let value: GatewayState;
  try {
    const { balance } = await gateway.getCredits();
    value = { state: "ready", creditBalance: Math.floor(Number(balance) / CREDIT_USD) };
  } catch (error) {
    value = {
      state: error instanceof Error && error.name === "GatewayAuthenticationError" ? "unauthorized" : "error",
      message: describeGatewayError(error),
    };
  }
  cachedStatus = { at: Date.now(), value };
  return value;
}

export function invalidateGatewayStatus() {
  cachedStatus = null;
}

type Submission = {
  model: ModelId;
  duration: number;
  promptText: string;
  startFrameUrl?: string;
};

export async function submitGeneration({ model, duration, promptText, startFrameUrl }: Submission) {
  // Gateway async video jobs reject inline image data over 300KB, so chained frames go by hosted URL.
  const prompt = startFrameUrl ? { image: startFrameUrl, text: promptText } : promptText;
  const { operation } = await experimental_startVideo({
    model: MODELS[model].gatewayId,
    prompt,
    aspectRatio: FILM_RATIO,
    resolution: GENERATION_RESOLUTION,
    duration,
    generateAudio: false,
  });
  return operation;
}

export type GenerationStatus =
  | { status: "pending" }
  | { status: "completed"; video: Buffer }
  | { status: "error"; error: string };

export async function checkGeneration(model: ModelId, operation: JSONValue): Promise<GenerationStatus> {
  const result = await experimental_getVideoStatus(MODELS[model].gatewayId, { operation });
  if (result.status === "pending") return { status: "pending" };
  if (result.status === "error") return { status: "error", error: result.error };
  const video = result.videos[0];
  if (!video) return { status: "error", error: "AI Gateway finished without a video." };
  if (video.type === "url") {
    const response = await fetch(video.url);
    if (!response.ok) throw new Error(`Download failed (${response.status}).`);
    return { status: "completed", video: Buffer.from(await response.arrayBuffer()) };
  }
  if (video.type === "base64") return { status: "completed", video: Buffer.from(video.data, "base64") };
  return { status: "completed", video: Buffer.from(video.data) };
}
