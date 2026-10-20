export const FILM_SRC = "https://nrxpnt6eu0asmp4i.public.blob.vercel-storage.com/film2/xsee-film-2-web.mp4";
export const FILM_POSTER = "https://nrxpnt6eu0asmp4i.public.blob.vercel-storage.com/film2/poster.jpg";
export const FILM_DURATION = 90;

export type FilmAct = { id: string; start: number; end: number; step: string; title: string; summary: string };

export const FILM_ACTS: FilmAct[] = [
  {
    id: "surface",
    start: 0,
    end: 14,
    step: "Surface",
    title: "The invisible attack surface",
    summary:
      "Cloud environments change constantly. Among thousands of identities, permissions and resources, a single connection can change the risk.",
  },
  {
    id: "discover",
    start: 14,
    end: 25,
    step: "Discover",
    title: "Exposure is not exploitability",
    summary:
      "Security tools reveal exposures. Finding a potential path is not the same as knowing whether an attacker can actually use it.",
  },
  {
    id: "proof",
    start: 25,
    end: 43,
    step: "Proof",
    title: "Evidence over assumption",
    summary:
      "Each link in a path is marked by what the evidence supports: proven, inferred or unverified. The reasoning stays visible. Illustrative scenario.",
  },
  {
    id: "decide",
    start: 43,
    end: 58,
    step: "Decide",
    title: "The right action, approved by you",
    summary:
      "Understanding the risk is the beginning. The next step is choosing a precise action, with a person approving the change. Illustrative scenario.",
  },
  {
    id: "verify",
    start: 58,
    end: 73,
    step: "Verify",
    title: "Prove the fix worked",
    summary:
      "Applying a fix is not the same as proving the problem is resolved. Security decisions deserve evidence before and after the change. Illustrative scenario.",
  },
  {
    id: "beyond",
    start: 73,
    end: 83,
    step: "Beyond",
    title: "Beyond the visible",
    summary: "Attack paths are the beginning. Cloud security belongs to teams that move beyond assumptions.",
  },
  {
    id: "xsee",
    start: 83,
    end: FILM_DURATION,
    step: "XSEE",
    title: "Trust nothing. Prove everything.",
    summary: "See the path, prove the risk, verify the outcome.",
  },
];

export type FilmCaption = { start: number; end: number; text: string };

/** Timed from the measured length of every narrated line in Film 2.0. */
export const FILM_CAPTIONS: FilmCaption[] = [
  { start: 0.8, end: 3.47, text: "Your cloud is constantly changing." },
  { start: 3.67, end: 7.48, text: "Thousands of identities, permissions, and resources." },
  { start: 7.78, end: 10.3, text: "And somewhere within that complexity," },
  { start: 10.3, end: 13.25, text: "a single connection could change everything." },
  { start: 14.15, end: 17.57, text: "Traditional security tools reveal exposures." },
  { start: 17.87, end: 20.4, text: "But finding a potential path is not the same" },
  { start: 20.4, end: 23.54, text: "as knowing whether an attacker can actually use it." },
  { start: 25.8, end: 28.78, text: "XSEE brings evidence to the investigation." },
  { start: 29.08, end: 31.6, text: "Examining the relationships that matter," },
  { start: 31.6, end: 35.4, text: "distinguishing what can be established from what remains uncertain," },
  { start: 35.4, end: 39.03, text: "and making the reasoning behind each finding visible." },
  { start: 43.8, end: 47.14, text: "Understanding the risk is only the beginning." },
  { start: 47.44, end: 50.1, text: "The next challenge is choosing the right action," },
  { start: 50.1, end: 53.3, text: "without creating unnecessary disruption." },
  { start: 58.8, end: 61.4, text: "Because applying a fix is not the same" },
  { start: 61.4, end: 64.4, text: "as proving the problem is resolved." },
  { start: 64.7, end: 69.46, text: "Security decisions deserve evidence, before and after the change." },
  { start: 73.6, end: 75.96, text: "Attack paths are just the beginning." },
  { start: 76.16, end: 78.3, text: "The future of cloud security belongs" },
  { start: 78.3, end: 80.7, text: "to those who can move beyond assumptions." },
  { start: 84.0, end: 85.13, text: "XSEE." },
  { start: 85.33, end: 88.46, text: "Trust Nothing. Prove Everything." },
];

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
