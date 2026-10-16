import type { Cinema } from "./cinema";

export type Atmosphere = {
  /** How much of the world is perceptible: 0 is restrained near-black, 1 is full spatial depth. */
  depth: number;
  /** Electric-blue horizon light from the cloud estate. */
  blue: number;
  /** XSEE magenta key light: verification at work. */
  magenta: number;
  /** Red underglow from the attack path. */
  red: number;
  /** Settled light once closure is verified. */
  calm: number;
  /** Edge pressure that tightens the frame during drift. */
  tension: number;
  /** Camera dolly into the scene, driving the parallax between the two depth planes. */
  push: number;
  /** Verification lattice inside the Proof Engine. */
  lattice: number;
};

type Channel = Exclude<keyof Atmosphere, "lattice">;

/** Keyframes over scroll position (0–5), aligned to the beats in cinemaAt. */
const KEYS: [number, Record<Channel, number>][] = [
  [0.0, { depth: 0.1, blue: 0, magenta: 0, red: 0, calm: 0, tension: 0, push: 0 }],
  [0.55, { depth: 0.45, blue: 0.45, magenta: 0.12, red: 0.12, calm: 0, tension: 0, push: 0.2 }],
  [0.95, { depth: 0.62, blue: 0.55, magenta: 0.18, red: 0.2, calm: 0, tension: 0, push: 0.3 }],
  [1.3, { depth: 0.75, blue: 0.35, magenta: 0.08, red: 0.45, calm: 0, tension: 0.15, push: 0.55 }],
  [1.85, { depth: 0.9, blue: 0.3, magenta: 0.1, red: 0.75, calm: 0, tension: 0.3, push: 0.8 }],
  [2.15, { depth: 1, blue: 0.6, magenta: 0.85, red: 0.35, calm: 0, tension: 0.1, push: 0.85 }],
  [2.85, { depth: 1, blue: 0.65, magenta: 0.95, red: 0.45, calm: 0, tension: 0.1, push: 0.85 }],
  [3.05, { depth: 0.9, blue: 0.45, magenta: 0.35, red: 0.55, calm: 0, tension: 0.15, push: 0.6 }],
  [3.5, { depth: 0.85, blue: 0.4, magenta: 0.6, red: 0.35, calm: 0, tension: 0.05, push: 0.7 }],
  [3.66, { depth: 0.8, blue: 0.4, magenta: 0.55, red: 0.25, calm: 0.15, tension: 0, push: 0.7 }],
  [3.85, { depth: 0.6, blue: 0.3, magenta: 0.15, red: 0, calm: 0.7, tension: 0, push: 0.35 }],
  [4.12, { depth: 0.55, blue: 0.3, magenta: 0.1, red: 0, calm: 0.6, tension: 0, push: 0.3 }],
  [4.3, { depth: 0.7, blue: 0.2, magenta: 0.12, red: 0.5, calm: 0.15, tension: 0.55, push: 0.5 }],
  [4.5, { depth: 0.8, blue: 0.2, magenta: 0.5, red: 0.45, calm: 0, tension: 0.5, push: 0.6 }],
  [4.76, { depth: 0.9, blue: 0.15, magenta: 0.2, red: 0.9, calm: 0, tension: 0.9, push: 0.8 }],
  [4.86, { depth: 0.9, blue: 0.3, magenta: 0.2, red: 0.55, calm: 0, tension: 0.4, push: 0.5 }],
  [5.0, { depth: 1, blue: 0.7, magenta: 0.35, red: 0.25, calm: 0.1, tension: 0, push: 0 }],
];

const CHANNELS = Object.keys(KEYS[0][1]) as Channel[];
const smooth = (t: number) => t * t * (3 - 2 * t);

export function atmosphereAt(position: number, c: Cinema): Atmosphere {
  const p = Math.min(5, Math.max(0, position));
  let i = 0;
  while (i < KEYS.length - 2 && p > KEYS[i + 1][0]) i++;
  const [p0, a] = KEYS[i];
  const [p1, b] = KEYS[i + 1];
  const k = smooth(Math.min(1, Math.max(0, (p - p0) / (p1 - p0))));
  const out = { lattice: c.chamber } as Atmosphere;
  for (const ch of CHANNELS) out[ch] = a[ch] + (b[ch] - a[ch]) * k;
  return out;
}

export function atmosphereVars(a: Atmosphere) {
  return {
    "--atm-depth": a.depth.toFixed(3),
    "--atm-blue": a.blue.toFixed(3),
    "--atm-magenta": a.magenta.toFixed(3),
    "--atm-red": a.red.toFixed(3),
    "--atm-calm": a.calm.toFixed(3),
    "--atm-tension": a.tension.toFixed(3),
    "--atm-push": a.push.toFixed(3),
    "--atm-lattice": a.lattice.toFixed(3),
  };
}
