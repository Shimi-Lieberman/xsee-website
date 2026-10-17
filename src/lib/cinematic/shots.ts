import { EDGES, NODES, PATH_EDGES, POLICY, SCENARIO, STEPS, TIMESTAMPS } from "@/lib/attackPathScenario";
import {
  END_CARD_DISSOLVE_SECONDS,
  END_CARD_SECONDS,
  NEGATIVE_PROMPT,
  PROMPT_AVOID,
  PROMPT_LOOK,
  PROMPT_PALETTE,
} from "./bible";

export const FILM_TITLE = "XSEE — Inside the Attack";
export const FILM_TAGLINE = "TRUST NOTHING. PROVE EVERYTHING.";

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

export type ShotId =
  | "enter-cloud"
  | "attack-path"
  | "proof-engine"
  | "evidence-trace"
  | "evidence-states"
  | "weakest-link"
  | "re-verification"
  | "verified-closure"
  | "drift"
  | "continuous-trust";

export type SegmentId = ShotId | "end-card";

export type ShotFact = { label: string; value: string };

export type SegmentInfo = {
  id: SegmentId;
  chapter: number;
  title: string;
  window: string;
  panelTitle: string;
  panelBody: string;
  facts: ShotFact[];
};

export type Shot = SegmentInfo & {
  id: ShotId;
  index: number;
  /** Length of the shot's slot in the assembled film. */
  seconds: number;
  /** Clip length requested from the model. */
  generateSeconds: number;
  camera: string;
  mood: string;
  palette: keyof typeof PROMPT_PALETTE;
  prompt: string;
};

const nodeName = (id: string) => NODES.find((node) => node.id === id)?.name ?? id;
const edge = (id: string) => EDGES.find((item) => item.id === id)!;
const pathEdges = PATH_EDGES.map(edge);
const statusCount = (status: string) => EDGES.filter((item) => item.base === status).length;
const STATUS_LABEL = { observed: "Observed", simulated: "Simulated", assumed: "Assumed", untested: "Untested" } as const;
const remediated = edge(SCENARIO.remediatedEdge);
const untested = EDGES.filter((item) => item.base === "untested");
const principal = (line: string) => line.replace(/^.*"(arn:[^"]+)".*$/, "$1").replace("arn:aws:iam::111122223333:", "");
const beforePrincipal = principal(POLICY.before.find((line) => "mark" in line && line.mark === "remove")!.text);
const afterPrincipal = principal(POLICY.after.find((line) => "mark" in line && line.mark === "add")!.text);
const driftPrincipal = principal(POLICY.drifted.find((line) => "mark" in line && line.mark === "drift")!.text);

export function formatTimecode(seconds: number) {
  const whole = Math.round(seconds);
  return `${String(Math.floor(whole / 60)).padStart(2, "0")}:${String(whole % 60).padStart(2, "0")}`;
}

type ShotDef = Omit<Shot, "index" | "window">;

const SHOT_DEFS: ShotDef[] = [
  {
    id: "enter-cloud",
    chapter: 1,
    seconds: 5,
    generateSeconds: 6,
    title: "Enter the Cloud",
    camera: "Slow forward dolly with controlled parallax",
    mood: "Mystery, precision, technological sophistication",
    palette: "proof",
    panelTitle: "The Invisible Cloud",
    panelBody: "The environment reveals the complexity of cloud identities, services, and permissions.",
    facts: [
      { label: "Resources", value: `${NODES.length} in this scenario` },
      { label: "Relationships", value: `${EDGES.length} mapped` },
    ],
    prompt:
      "Opening shot. A vast three-dimensional cloud infrastructure emerges slowly from black: three stacked tiers of matte graphite monolith towers on suspended smoked-glass decks, joined by thousands of hair-thin, dimly glowing conduits that recede to a distant vanishing point. Camera: slow, steady forward dolly at eye level, gently descending, with parallax between near and far towers. Composition: symmetrical one-point perspective, deep negative space above. Lighting: cool steel-blue ambient, conduits as the only light, a faint magenta glint on the nearest conduit. Motion: only the camera moves; conduits breathe very slowly. Ends travelling forward and slightly down.",
  },
  {
    id: "attack-path",
    chapter: 2,
    seconds: 5,
    generateSeconds: 6,
    title: "The Hidden Attack Path",
    camera: "Smooth tracking move following the emerging path",
    mood: "Discovery, intelligence, controlled tension",
    palette: "proof",
    panelTitle: "The Attack Path",
    panelBody: "XSEE identifies candidate relationships that may form an attack path.",
    facts: [
      {
        label: "Candidate path",
        value: [nodeName(pathEdges[0].from), ...pathEdges.map((item) => nodeName(item.to))].join(" → "),
      },
      { label: "Status", value: "Candidate. Not yet proven." },
    ],
    prompt:
      "Continuous with the previous shot, same world. Moving forward and down through the three tiers, one route of conduits lights up link by link: a thin, tentative magenta pulse travels from a tower on the top tier, down to a faceted prism on the middle tier, then down to a sealed hexagonal vault on the bottom tier, while every other conduit stays dim. Camera: smooth tracking move that follows the pulse downward from tier to tier. Composition: the route leads the eye diagonally through the frame, layered foreground and background. Lighting: the pulse is the key light, with soft magenta reflections on glass and titanium. Motion: deliberate and searching, a possible route being traced, never a burst.",
  },
  {
    id: "proof-engine",
    chapter: 3,
    seconds: 5,
    generateSeconds: 6,
    title: "The Proof Engine",
    camera: "Smooth deceleration into a hero composition",
    mood: "Confidence, technical authority, precision",
    palette: "proof",
    panelTitle: "The Proof Engine",
    panelBody:
      "XSEE evaluates available evidence and distinguishes what is supported from what remains unverified.",
    facts: [
      { label: "Observed", value: `${statusCount("observed")} relationships` },
      { label: "Simulated", value: `${statusCount("simulated")} relationships` },
      { label: "Unverified", value: `${statusCount("untested") + statusCount("assumed")} relationships` },
    ],
    prompt:
      "Continuous with the previous shot. Following the magenta route down, the camera arrives in a precise analysis chamber of polished black stone: a clean circular verification ring of fine magenta light, inset in the floor, encloses a single glowing conduit segment. Thin concentric guide lines and calibrated titanium structures frame it. Camera: smooth cinematic deceleration into a stable, centred hero composition from a slight low angle. Lighting: controlled cool top light, crisp reflections, everything outside the ring falls to shadow. Motion: settles to near stillness. Ends holding on the ring with clean negative space above for a title.",
  },
  {
    id: "evidence-trace",
    chapter: 3,
    seconds: 8,
    generateSeconds: 8,
    title: "Evidence, Link by Link",
    camera: "Slow crane up and back, revealing the route",
    mood: "Method, rigour, patience",
    palette: "proof",
    panelTitle: "The Proof Engine · Evidence",
    panelBody: `Each relationship in ${SCENARIO.pathId} is tested on its own, and its evidence is recorded with its limits.`,
    facts: pathEdges.map((item) => ({
      label: `${nodeName(item.from)} → ${nodeName(item.to)}`,
      value: STATUS_LABEL[item.base],
    })),
    prompt:
      "Continuous with the previous shot. From the magenta verification ring in the black-stone chamber, the camera slowly rises and turns to look back up the route of conduits it followed: a tower on the top tier, a faceted prism on the middle tier, a second prism, and the sealed hexagonal vault below. One by one, a small, fine magenta ring forms around each link of that route and holds it, as if measuring it. The light inside each link settles into its own character: the lower link burns steady and solid, the two middle links pulse slowly and evenly, and the topmost link stays a faint, hollow outline. Camera: slow, steady crane up and back that reveals the whole route on a diagonal across the three tiers. Lighting: cool top light, the small rings are the key lights. Motion: methodical and measured. Ends on a wide, stable view of the entire route.",
  },
  {
    id: "evidence-states",
    chapter: 3,
    seconds: 8,
    generateSeconds: 8,
    title: "Known and Unknown",
    camera: "Lateral truck with parallax, then a slow push in",
    mood: "Clarity, honesty, technical authority",
    palette: "proof",
    panelTitle: "The Proof Engine · Evidence states",
    panelBody: "Observed, simulated, assumed and untested evidence stay separate. Nothing unverified is presented as proven.",
    facts: [
      { label: "Observed", value: `${nodeName("web")} → ${nodeName("role-web")} task role` },
      { label: "Simulated", value: `${remediated.label}, GetSecretValue. Simulation only.` },
      { label: "Assumed", value: "Code execution in web-frontend. Not validated." },
      ...untested.map((item) => ({ label: "Untested", value: `${nodeName(item.from)} → ${nodeName(item.to)}. No result implied.` })),
    ],
    prompt:
      "Continuous with the previous shot, same world. A wide, stable view of the three tiers with one evaluated route of conduits lit: its links stay visibly different, one steady and solid, two pulsing slowly and evenly, one only a faint hollow outline. A side branch from a middle-tier prism to a smaller vault stays completely dark and unlit. Camera: slow lateral truck along the route with gentle parallax between near and far towers, then a slow push in toward the middle tier, where two faceted prisms are joined by a single slowly pulsing magenta conduit. Lighting: cool steel-blue ambient, the route is the only key light. Motion: calm and deliberate. Ends close on that one pulsing conduit between the two prisms, centred in frame.",
  },
  {
    id: "weakest-link",
    chapter: 4,
    seconds: 8,
    generateSeconds: 8,
    title: "The Weakest Link",
    camera: "Slow 30-degree orbit around the closing gate",
    mood: "Decisive, engineered, controlled",
    palette: "proof",
    panelTitle: "Verified Closure · Remediation",
    panelBody: `One reviewed change targets the weakest link: ${nodeName(remediated.from)} → ${nodeName(remediated.to)}.`,
    facts: [
      { label: "Change", value: `${nodeName(remediated.to)} trust policy: ${beforePrincipal} → ${afterPrincipal}` },
      { label: "Approved by a human", value: TIMESTAMPS.approved },
      { label: "Predicted effect", value: `${remediated.label} denied. Not verified yet.` },
    ],
    prompt:
      "Continuous with the previous shot. Close on a slowly pulsing magenta conduit joining two faceted prisms on the middle tier. A slender, precise ring-shaped gate of brushed dark titanium descends slowly and closes around the conduit near the far prism, sealing it with one clean mechanical motion. Before the gate, the magenta light stops cleanly against the titanium; beyond the gate, the conduit light drains away into darkness. Camera: slow orbit of about thirty degrees around the gate, then holds. Lighting: soft magenta rim light on the titanium, everything else in cool shadow. Motion: deliberate and engineered, no sparks, no debris. Ends holding on the closed gate, centred in frame.",
  },
  {
    id: "re-verification",
    chapter: 4,
    seconds: 8,
    generateSeconds: 8,
    title: "Re-verification",
    camera: "Pull back and up, then follow the test pulse down",
    mood: "Rigour, calm certainty",
    palette: "proof",
    panelTitle: "Verified Closure · Re-test",
    panelBody: "The path is replayed after the change. The closure is proven, not assumed.",
    facts: [
      { label: "Change applied", value: TIMESTAMPS.applied },
      { label: `${nodeName(remediated.from)} → ${nodeName(remediated.to)}`, value: `Blocked. ${remediated.label} denied by the trust policy.` },
      { label: "Traversal", value: "Stops at the blocked link." },
    ],
    prompt:
      "Continuous with the previous shot. The closed titanium gate on the conduit between two faceted prisms on the middle tier. The camera pulls back and rises to reveal the route from the top tier. A new, thin magenta test pulse starts at a tower on the top tier, travels down to the first prism, runs along the conduit and stops dead against the titanium gate; it does not pass through. Beyond the gate, the conduits to the far prism and down to the sealed vault stay dark. Camera: smooth pull back and up, then follows the pulse down to the gate. Lighting: the pulse is the key light, cool shadow elsewhere. Motion: precise and calm. Ends on the pulse resting against the gate, with the dark route beyond it.",
  },
  {
    id: "verified-closure",
    chapter: 4,
    seconds: 8,
    generateSeconds: 8,
    title: "Evidence-backed Closure",
    camera: "Slow crane up and back to a high three-quarter view",
    mood: "Resolution, serenity, authority",
    palette: "proof",
    panelTitle: "Verified Closure",
    panelBody: `${SCENARIO.pathId} is closed with evidence: the re-test result is attached to the closure record.`,
    facts: [
      { label: "Status", value: `${SCENARIO.pathId} verified closed` },
      { label: "Verified", value: TIMESTAMPS.verified },
      { label: "Impact", value: `${nodeName(remediated.to)} now trusts only ${afterPrincipal}` },
    ],
    prompt:
      "Continuous with the previous shot. A magenta test pulse rests against a closed titanium gate on a conduit in the middle tier. A clean, steady ring of magenta light forms flat around the gate and locks in place, calm and complete. The section of the route beyond the gate stays dark; the rest of the lattice breathes softly in steel-blue. Camera: slow, smooth crane up and back to a high three-quarter view of the whole three-tier lattice, the sealed gate becoming a single small point of magenta in the middle tier. Lighting: serene and low-key. Motion: settles to stillness. Ends on the wide, stable high view of the lattice.",
  },
  {
    id: "drift",
    chapter: 5,
    seconds: 8,
    generateSeconds: 8,
    title: "Drift",
    camera: "Slow descending push in toward the gate",
    mood: "Unease, vigilance, controlled tension",
    palette: "drift",
    panelTitle: "Continuous Trust · Drift",
    panelBody: "The environment keeps changing. A later edit to the trust policy means the earlier result may no longer hold.",
    facts: [
      { label: "Drift detected", value: TIMESTAMPS.drift },
      { label: "Added principal", value: driftPrincipal },
      { label: "Status", value: "Reassessing. The blocked result may no longer hold." },
    ],
    prompt:
      "Continuous with the previous shot. A high, wide, stable view of the three-tier lattice with one sealed magenta ring around a titanium gate on the middle tier. The camera slowly descends back toward the gate. As it approaches, a thin seam of deep, controlled red light opens in the titanium gate, and the magenta ring around it dims and wavers; a faint red glow leaks along the conduit past the gate toward the far prism. No sparks, no smoke, nothing breaks apart. Camera: slow, steady descending push in. Lighting: the deep red seam is the only hot light, cool shadow everywhere else. Motion: quiet and unsettling. Ends close on the red seam in the gate, centred in frame.",
  },
  {
    id: "continuous-trust",
    chapter: 5,
    seconds: 8,
    generateSeconds: 8,
    title: "Continuous Trust",
    camera: "Pull back and crane up to a wide hero view",
    mood: "Vigilance, completeness, confidence",
    palette: "drift",
    panelTitle: "Continuous Trust · Reassessment",
    panelBody: `XSEE re-checks what moved. ${SCENARIO.pathId} is reopened on evidence, and the loop continues.`,
    facts: [
      { label: "Re-check", value: `${TIMESTAMPS.recheck}: ${remediated.label} allowed again via ${driftPrincipal}` },
      { label: "Status", value: `${SCENARIO.pathId} reopened` },
      { label: "The loop", value: STEPS.map((step) => step.title).join(" → ") },
    ],
    prompt:
      "Continuous with the previous shot. Close on a titanium gate with a thin seam of soft red light. A fine ring of magenta light gently forms around the gate and glows steadily. The camera then pulls back and rises smoothly, revealing the whole three-tier architectural lattice of graphite towers, glass prisms and stone vaults. A slow, thin line of magenta light travels in a continuous loop around the outside of the structure. Camera: smooth pull back and crane up to a wide, calm hero view. Lighting: low-key, soft steel-blue haze, magenta as the key light. Motion: calm and continuous. Ends on the full lattice encircled by the slow magenta loop, surrounded by dark empty space.",
  },
];

const shotStarts = SHOT_DEFS.reduce<number[]>((starts, def, i) => [...starts, i === 0 ? 0 : starts[i - 1] + SHOT_DEFS[i - 1].seconds], []);
export const SHOTS_SECONDS = SHOT_DEFS.reduce((sum, def) => sum + def.seconds, 0);
export const FILM_SECONDS = SHOTS_SECONDS - END_CARD_DISSOLVE_SECONDS + END_CARD_SECONDS;

export const SHOTS: Shot[] = SHOT_DEFS.map((def, index) => ({
  ...def,
  index,
  window: `${formatTimecode(shotStarts[index])}–${formatTimecode(shotStarts[index] + def.seconds)}`,
}));

export const END_CARD: SegmentInfo = {
  id: "end-card",
  chapter: 5,
  title: "Trust Nothing. Prove Everything.",
  window: `${formatTimecode(SHOTS_SECONDS - END_CARD_DISSOLVE_SECONDS)}–${formatTimecode(FILM_SECONDS)}`,
  panelTitle: "XSEE",
  panelBody: "Cloud attack intelligence, backed by evidence.",
  facts: [{ label: "The loop", value: STEPS.map((step) => step.title).join(" → ") }],
};

export const SEGMENTS: SegmentInfo[] = [...SHOTS, END_CARD];

export function segmentInfo(id: SegmentId) {
  return SEGMENTS.find((segment) => segment.id === id) ?? null;
}

export type Chapter = { index: number; title: string; story: string; window: string; shotIds: ShotId[] };

const CHAPTER_COPY: Omit<Chapter, "window" | "shotIds">[] = [
  { index: 1, title: "The Invisible Cloud", story: "The scale and complexity of AWS cloud infrastructure." },
  { index: 2, title: "The Attack Path", story: "A candidate path emerges from connected identities, permissions and resources." },
  { index: 3, title: "The Proof Engine", story: "Each link is tested. Observed, simulated, assumed and untested evidence stay distinct." },
  { index: 4, title: "Verified Closure", story: "A reviewed fix blocks the weakest link, and a re-test proves the closure." },
  { index: 5, title: "Continuous Trust", story: "Drift is detected, the path is reassessed and the XSEE loop continues." },
];

export const CHAPTERS: Chapter[] = CHAPTER_COPY.map((copy) => {
  const shots = SHOTS.filter((shot) => shot.chapter === copy.index);
  const start = shotStarts[shots[0].index];
  const end = copy.index === 5 ? FILM_SECONDS : shotStarts[shots[shots.length - 1].index] + shots[shots.length - 1].seconds;
  return { ...copy, window: `${formatTimecode(start)}–${formatTimecode(end)}`, shotIds: shots.map((shot) => shot.id) };
});

export function getShot(id: unknown) {
  return SHOTS.find((shot) => shot.id === id) ?? null;
}

export function previousShot(shot: Shot) {
  return shot.index > 0 ? SHOTS[shot.index - 1] : null;
}

export function composePrompt(shot: Shot, model: ModelId) {
  const spec = MODELS[model];
  const parts = [shot.prompt, PROMPT_LOOK, PROMPT_PALETTE[shot.palette]];
  if (!spec.supportsNegativePrompt) parts.push(PROMPT_AVOID);
  return {
    promptText: parts.join(" ").slice(0, PROMPT_LIMIT),
    negativePrompt: spec.supportsNegativePrompt ? NEGATIVE_PROMPT : undefined,
  };
}
