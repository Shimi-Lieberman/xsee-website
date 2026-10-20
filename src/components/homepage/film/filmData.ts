export const FILM_SRC = "https://nrxpnt6eu0asmp4i.public.blob.vercel-storage.com/film/xsee-film-v2.mp4";
export const FILM_POSTER = "https://nrxpnt6eu0asmp4i.public.blob.vercel-storage.com/film/poster-v2.jpg";
export const FILM_DURATION = 76.21;

export type FilmAct = { id: string; start: number; end: number; step: string; title: string; summary: string };

export const FILM_ACTS: FilmAct[] = [
  {
    id: "discover",
    start: 0,
    end: 12,
    step: "Discover",
    title: "Exposure hides in the connections",
    summary:
      "The most dangerous cloud exposures are not visible in a single finding. They emerge from how identities, permissions and resources connect.",
  },
  {
    id: "prioritize",
    start: 12,
    end: 28,
    step: "Prioritize",
    title: "Risk lives in the connections",
    summary:
      "XSEE maps identities, permissions, network exposure and resources, and surfaces candidate attack paths between findings.",
  },
  {
    id: "verify",
    start: 28,
    end: 45,
    step: "Verify",
    title: "Every step carries its evidence",
    summary:
      "Each step of a candidate path is labeled by what was checked: observed, simulated, assumed, untested or blocked.",
  },
  {
    id: "remediate",
    start: 45,
    end: 60,
    step: "Remediate",
    title: "Closure backed by evidence",
    summary:
      "One recommended fix with its impact. You approve it, your team applies it in your account, and XSEE re-validates the path before a closure record is issued.",
  },
  {
    id: "monitor",
    start: 60,
    end: FILM_DURATION,
    step: "Monitor",
    title: "Trust is re-earned on change",
    summary:
      "A change triggers reassessment. A closure record is revoked only when the path re-validates.",
  },
];

export type FilmCaption = { start: number; end: number; text: string };

/** Timed from the measured length of every narrated sentence. */
export const FILM_CAPTIONS: FilmCaption[] = [
  { start: 0.5, end: 2.49, text: "The most dangerous cloud exposures" },
  { start: 2.49, end: 5.3, text: "aren't always visible in a single finding." },
  { start: 5.45, end: 8.39, text: "They emerge from the connections between them." },
  { start: 12.5, end: 15.77, text: "On their own, findings show what might be exposed," },
  { start: 15.77, end: 19.16, text: "not what an attacker can actually reach." },
  { start: 19.51, end: 23.31, text: "XSEE maps identities, permissions, networks, and resources," },
  { start: 23.31, end: 27.58, text: "to uncover the attack paths hidden between isolated findings." },
  { start: 28.5, end: 30.82, text: "Then comes the critical difference:" },
  { start: 30.92, end: 31.83, text: "Proof." },
  { start: 32.28, end: 35.93, text: "XSEE evaluates each step against the available evidence," },
  { start: 35.93, end: 41.69, text: "separating what is supported from what is assumed, simulated, untested, or blocked." },
  { start: 45.5, end: 47.68, text: "Insight becomes action." },
  { start: 47.78, end: 54.1, text: "XSEE connects targeted remediation with impact assessment, human approval, and re-verification," },
  { start: 54.1, end: 57.71, text: "so closure is backed by evidence, not assumption." },
  { start: 60.5, end: 63.32, text: "But cloud environments never stand still." },
  { start: 63.32, end: 66.79, text: "When conditions change, XSEE reassesses the evidence," },
  { start: 66.79, end: 69.56, text: "and a closed finding can be reopened." },
  { start: 70.11, end: 72.92, text: "Because trust should never be assumed." },
  { start: 72.92, end: 74.36, text: "It should be proven." },
];

export const FILM_T = { titleIn: 8.6, titleOut: 11.8, impact: 46, closure: 56.5, drift: 64, reopen: 67, endCard: 72 } as const;

/** Mirrors the site's remediation model: your team applies the fix, XSEE re-validates. */
export const FILM_REMEDIATION = [
  { at: 46, label: "Impact assessment", detail: "Path reaches the billing-exports bucket" },
  { at: 48, label: "One recommended fix", detail: "Scope the IAM role's trust policy" },
  { at: 50, label: "You approve it", detail: "Security owner signs off" },
  { at: 52, label: "Runs in your account", detail: "Your team applies the approved change" },
  { at: 54.5, label: "XSEE re-validates", detail: "Step re-tested: now blocked" },
] as const;

export function filmActAt(t: number) {
  return FILM_ACTS.find((a) => t >= a.start && t < a.end) ?? FILM_ACTS[FILM_ACTS.length - 1];
}

export function filmCaptionAt(t: number) {
  return FILM_CAPTIONS.find((c) => t >= c.start && t < c.end);
}

export function formatFilmTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
