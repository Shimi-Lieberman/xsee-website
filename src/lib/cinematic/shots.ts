import { EDGES, NODES, PATH_EDGES } from "@/lib/attackPathScenario";
import { NEGATIVE_PROMPT, PROMPT_AVOID, PROMPT_LOOK } from "./bible";

export const FILM_TITLE = "XSEE — Inside the Attack";

export const CREDIT_USD = 0.01;
/** AI Gateway refuses to start any video job below this balance (in credits), regardless of the job's price. */
export const VIDEO_MIN_BALANCE = 1000;
export const PROMPT_LIMIT = 2000;
export const FILM_RATIO = "16:9" as const;
export const GENERATION_RESOLUTION = "1920x1080" as const;

export type ModelId = "veo3.1-fast" | "veo3.1";

export type ModelSpec = {
  id: ModelId;
  gatewayId: string;
  label: string;
  creditsPerSecond: number;
  durations: number[];
  defaultDuration: number;
  supportsNegativePrompt: boolean;
  recommended: boolean;
  note: string;
};

export const MODELS: Record<ModelId, ModelSpec> = {
  "veo3.1-fast": {
    id: "veo3.1-fast",
    gatewayId: "google/veo-3.1-fast-generate-001",
    label: "Google Veo 3.1 Fast (silent)",
    creditsPerSecond: 10,
    durations: [4, 6, 8],
    defaultDuration: 6,
    supportsNegativePrompt: false,
    recommended: false,
    note: "Veo 3.1 Fast at 1080p through Vercel AI Gateway, $0.10 per second with audio off. Cheaper drafts; can start from the previous take's last frame.",
  },
  "veo3.1": {
    id: "veo3.1",
    gatewayId: "google/veo-3.1-generate-001",
    label: "Google Veo 3.1 (silent)",
    creditsPerSecond: 20,
    durations: [4, 6, 8],
    defaultDuration: 6,
    supportsNegativePrompt: false,
    recommended: true,
    note: "Veo 3.1 Standard at 1080p through Vercel AI Gateway, $0.20 per second with audio off. Highest quality; can start from the previous take's last frame.",
  },
};

export function isModelId(value: unknown): value is ModelId {
  return value === "veo3.1-fast" || value === "veo3.1";
}

export function estimateCredits(model: ModelId, duration: number) {
  return MODELS[model].creditsPerSecond * duration;
}

export function formatUsd(credits: number) {
  return `$${(credits * CREDIT_USD).toFixed(2)}`;
}

export type ShotId = "enter-cloud" | "attack-path" | "proof-engine";

export type ShotFact = { label: string; value: string };

export type Shot = {
  id: ShotId;
  index: number;
  title: string;
  window: string;
  camera: string;
  mood: string;
  prompt: string;
  panelTitle: string;
  panelBody: string;
  facts: ShotFact[];
};

const nodeName = (id: string) => NODES.find((node) => node.id === id)?.name ?? id;
const pathEdges = PATH_EDGES.map((id) => EDGES.find((edge) => edge.id === id)!);
const statusCount = (status: string) => EDGES.filter((edge) => edge.base === status).length;

export const SHOTS: Shot[] = [
  {
    id: "enter-cloud",
    index: 0,
    title: "Enter the Cloud",
    window: "00:00–00:05",
    camera: "Slow forward dolly with controlled parallax",
    mood: "Mystery, precision, technological sophistication",
    panelTitle: "Cloud Infrastructure",
    panelBody:
      "The environment reveals the complexity of cloud identities, services, and permissions.",
    facts: [
      { label: "Resources", value: `${NODES.length} in this scenario` },
      { label: "Relationships", value: `${EDGES.length} mapped` },
    ],
    prompt:
      "Opening shot. A vast three-dimensional cloud infrastructure emerges slowly from black: three stacked tiers of matte graphite monolith towers on suspended smoked-glass decks, joined by thousands of hair-thin, dimly glowing conduits that recede to a distant vanishing point. Camera: slow, steady forward dolly at eye level, gently descending, with parallax between near and far towers. Composition: symmetrical one-point perspective, deep negative space above. Lighting: cool steel-blue ambient, conduits as the only light, a faint magenta glint on the nearest conduit. Motion: only the camera moves; conduits breathe very slowly. Ends travelling forward and slightly down.",
  },
  {
    id: "attack-path",
    index: 1,
    title: "The Hidden Attack Path",
    window: "00:05–00:10",
    camera: "Smooth tracking move following the emerging path",
    mood: "Discovery, intelligence, controlled tension",
    panelTitle: "Attack Path Discovery",
    panelBody: "XSEE identifies candidate relationships that may form an attack path.",
    facts: [
      {
        label: "Candidate path",
        value: [nodeName(pathEdges[0].from), ...pathEdges.map((edge) => nodeName(edge.to))].join(" → "),
      },
      { label: "Status", value: "Candidate. Not yet proven." },
    ],
    prompt:
      "Continuous with the previous shot, same world. Moving forward and down through the three tiers, one route of conduits lights up link by link: a thin, tentative magenta pulse travels from a tower on the top tier, down to a faceted prism on the middle tier, then down to a sealed hexagonal vault on the bottom tier, while every other conduit stays dim. Camera: smooth tracking move that follows the pulse downward from tier to tier. Composition: the route leads the eye diagonally through the frame, layered foreground and background. Lighting: the pulse is the key light, with soft magenta reflections on glass and titanium. Motion: deliberate and searching, a possible route being traced, never a burst.",
  },
  {
    id: "proof-engine",
    index: 2,
    title: "The Proof Engine",
    window: "00:10–00:15",
    camera: "Smooth deceleration into a hero composition",
    mood: "Confidence, technical authority, precision",
    panelTitle: "Proof Engine",
    panelBody:
      "XSEE evaluates available evidence and distinguishes what is supported from what remains unverified.",
    facts: [
      { label: "Observed", value: `${statusCount("observed")} relationships` },
      { label: "Simulated", value: `${statusCount("simulated")} relationships` },
      {
        label: "Unverified",
        value: `${statusCount("untested") + statusCount("assumed")} relationships`,
      },
    ],
    prompt:
      "Continuous with the previous shot. Following the magenta route down, the camera arrives in a precise analysis chamber of polished black stone: a clean circular verification ring of fine magenta light, inset in the floor, encloses a single glowing conduit segment. Thin concentric guide lines and calibrated titanium structures frame it. Camera: smooth cinematic deceleration into a stable, centred hero composition from a slight low angle. Lighting: controlled cool top light, crisp reflections, everything outside the ring falls to shadow. Motion: settles to near stillness. Ends holding on the ring with clean negative space above for a title.",
  },
];

export function getShot(id: unknown) {
  return SHOTS.find((shot) => shot.id === id) ?? null;
}

export function previousShot(shot: Shot) {
  return shot.index > 0 ? SHOTS[shot.index - 1] : null;
}

export function composePrompt(shot: Shot, model: ModelId) {
  const spec = MODELS[model];
  const parts = [shot.prompt, PROMPT_LOOK];
  if (!spec.supportsNegativePrompt) parts.push(PROMPT_AVOID);
  return {
    promptText: parts.join(" ").slice(0, PROMPT_LIMIT),
    negativePrompt: spec.supportsNegativePrompt ? NEGATIVE_PROMPT : undefined,
  };
}
