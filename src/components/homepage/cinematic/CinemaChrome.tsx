import { ArrowDown } from "lucide-react";

const ROMAN = ["I", "II", "III", "IV", "V"];

const CARDS = [
  { title: "System awakening", line: "" },
  { title: "The path ignites", line: "Three findings. One candidate route." },
  { title: "The evidence chamber", line: "Possible is not proven." },
  { title: "Verify the fix", line: "A change is applied. Is the path closed?" },
  { title: "Drift", line: "The cloud keeps changing." },
];

const TEASERS = ["One relationship looks wrong", "But is the path real?", "Now close it", "Until something changes"];

const RUNTIME_SECONDS = 150;
const FPS = 24;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));

function split(position: number) {
  const x = clamp(position, 0, 4.9999);
  const act = Math.floor(x);
  return { act, t: x - act };
}

/** Opening "presents" card covers the first part of act I; later acts get a short title card as they begin. */
export function titleCardOpacity(position: number) {
  const { act, t } = split(position);
  if (act === 0) return 0;
  return seg(t, 0.0, 0.05) * (1 - seg(t, 0.15, 0.24));
}

function timecode(position: number) {
  const total = (clamp(position, 0, 5) / 5) * RUNTIME_SECONDS;
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  const f = Math.floor((total * FPS) % FPS);
  return [0, m, s, f].map((n) => String(n).padStart(2, "0")).join(":");
}

export default function CinemaChrome({ position, onNext }: { position: number; onNext: (act: number) => void }) {
  const { act, t } = split(position);
  const card = titleCardOpacity(position);
  const opening = act === 0;
  const emblem = 1 - seg(t, 0.18, 0.42);
  const letterbox = opening ? 1 - seg(t, 0.2, 0.45) * 0.55 : 0.45;
  const teaser = act < 4 ? seg(t, 0.84, 0.92) * (1 - seg(t, 0.985, 1)) : 0;

  return (
    <div className="cc" aria-hidden style={{ ["--cc-bars" as string]: letterbox }}>
      <div className="cc-bar cc-bar--top" />
      <div className="cc-bar cc-bar--bottom" />
      <div className="cc-grain" />

      <div className="cc-hud">
        <span>
          Scene {ROMAN[act]} <i>/</i> V
        </span>
        <span className="cc-hud-tag">AP-12 · illustrative</span>
        <span className="cc-timecode">{timecode(position)}</span>
      </div>

      {opening && emblem > 0.01 ? (
        <div className="cc-emblem" style={{ opacity: emblem, transform: `translate(-50%, -50%) scale(${1 - seg(t, 0.1, 0.45) * 0.18})` }}>
          <span className="cc-emblem-glow" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-symbol-only.svg" alt="" width={96} height={96} className="cc-emblem-mark" />
          <span className="cc-emblem-sweep" />
        </div>
      ) : null}

      {card > 0.01 && !opening ? (
        <div className="cc-card" style={{ opacity: card }}>
          <p className="cc-card-kicker">Act {ROMAN[act]}</p>
          <p className="cc-card-title">{CARDS[act].title}</p>
          <p className="cc-card-line">{CARDS[act].line}</p>
          <span className="cc-card-sweep" />
        </div>
      ) : null}

      {teaser > 0.01 ? (
        <button
          type="button"
          tabIndex={-1}
          className="cc-teaser"
          style={{ opacity: teaser, transform: `translate(-50%, ${(1 - teaser) * 8}px)` }}
          onClick={() => onNext(act + 1)}
        >
          <span className="cc-teaser-next">Next · Act {ROMAN[act + 1]}</span>
          <span className="cc-teaser-line">{TEASERS[act]}…</span>
          <ArrowDown size={14} className="cc-teaser-arrow" />
        </button>
      ) : null}
    </div>
  );
}
