export type Tier = "primary" | "context" | "ambient";
export type GraphNode = { id: string; x: number; y: number; tier: Tier; label?: string; target?: boolean };
export type Composition = {
  key: string;
  viewBox: string;
  nodes: GraphNode[];
  links: [string, string][];
  path: string[];
};

const PATH = ["entry", "hop", "work", "iden", "data"];

export const DESKTOP: Composition = {
  key: "d",
  viewBox: "0 0 1200 700",
  path: PATH,
  nodes: [
    { id: "entry", x: 170, y: 250, tier: "primary", label: "Entry" },
    { id: "hop", x: 380, y: 330, tier: "primary" },
    { id: "work", x: 590, y: 210, tier: "primary", label: "Workload" },
    { id: "iden", x: 800, y: 320, tier: "primary", label: "Identity" },
    { id: "data", x: 1020, y: 220, tier: "primary", label: "Data", target: true },
    { id: "c1", x: 300, y: 140, tier: "context" },
    { id: "c2", x: 500, y: 410, tier: "context" },
    { id: "c3", x: 700, y: 110, tier: "context" },
    { id: "c4", x: 910, y: 420, tier: "context" },
    { id: "c5", x: 1110, y: 340, tier: "context" },
    { id: "c6", x: 980, y: 96, tier: "context" },
    { id: "c7", x: 110, y: 380, tier: "context" },
    { id: "a1", x: 60, y: 96, tier: "ambient" },
    { id: "a2", x: 220, y: 56, tier: "ambient" },
    { id: "a3", x: 450, y: 70, tier: "ambient" },
    { id: "a4", x: 840, y: 40, tier: "ambient" },
    { id: "a5", x: 1160, y: 140, tier: "ambient" },
    { id: "a6", x: 1150, y: 560, tier: "ambient" },
    { id: "a7", x: 970, y: 600, tier: "ambient" },
    { id: "a8", x: 770, y: 530, tier: "ambient" },
    { id: "a9", x: 620, y: 650, tier: "ambient" },
    { id: "a10", x: 390, y: 600, tier: "ambient" },
    { id: "a11", x: 150, y: 570, tier: "ambient" },
    { id: "a12", x: 50, y: 480, tier: "ambient" },
    { id: "a13", x: 1070, y: 470, tier: "ambient" },
    { id: "a14", x: 860, y: 660, tier: "ambient" },
  ],
  links: [
    ["entry", "c1"], ["entry", "c7"], ["c1", "a2"], ["c1", "a3"], ["a1", "a2"],
    ["hop", "c2"], ["c2", "a10"], ["work", "c3"], ["c3", "a3"], ["c3", "a4"],
    ["iden", "c4"], ["c4", "a8"], ["c4", "a13"], ["data", "c6"], ["c6", "a4"], ["c6", "a5"],
    ["data", "c5"], ["c5", "a13"], ["a13", "a6"], ["a6", "a7"], ["a7", "a14"], ["a7", "a8"],
    ["a8", "a9"], ["a9", "a10"], ["a10", "a11"], ["a11", "a12"], ["a12", "c7"],
  ],
};

export const MOBILE: Composition = {
  key: "m",
  viewBox: "0 0 400 640",
  path: PATH,
  nodes: [
    { id: "entry", x: 80, y: 64, tier: "primary", label: "Entry" },
    { id: "hop", x: 270, y: 112, tier: "primary" },
    { id: "work", x: 110, y: 190, tier: "primary", label: "Workload" },
    { id: "iden", x: 300, y: 268, tier: "primary", label: "Identity" },
    { id: "data", x: 186, y: 352, tier: "primary", label: "Data", target: true },
    { id: "c1", x: 362, y: 40, tier: "context" },
    { id: "c2", x: 28, y: 126, tier: "context" },
    { id: "c3", x: 372, y: 186, tier: "context" },
    { id: "c4", x: 40, y: 300, tier: "context" },
    { id: "c5", x: 352, y: 380, tier: "context" },
    { id: "a1", x: 200, y: 22, tier: "ambient" },
    { id: "a2", x: 384, y: 300, tier: "ambient" },
    { id: "a3", x: 62, y: 444, tier: "ambient" },
    { id: "a4", x: 220, y: 476, tier: "ambient" },
    { id: "a5", x: 362, y: 500, tier: "ambient" },
    { id: "a6", x: 120, y: 560, tier: "ambient" },
    { id: "a7", x: 300, y: 600, tier: "ambient" },
    { id: "a8", x: 30, y: 612, tier: "ambient" },
  ],
  links: [
    ["entry", "a1"], ["a1", "c1"], ["hop", "c1"], ["entry", "c2"], ["work", "c4"],
    ["iden", "c3"], ["c3", "a2"], ["data", "c5"], ["c5", "a5"], ["c4", "a3"],
    ["a3", "a4"], ["a4", "a5"], ["a4", "a6"], ["a6", "a8"], ["a6", "a7"], ["a5", "a7"],
  ],
};

type Point = { x: number; y: number };

export const segment = (a: Point, b: Point) => {
  const mx = (a.x + b.x) / 2;
  return `M${a.x} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`;
};

/** Midpoint and tangent angle of `segment(a, b)` at t = 0.5, used to place direction chevrons. */
export const segmentMid = (a: Point, b: Point) => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
  angle: (Math.atan2(1.5 * (b.y - a.y), 0.75 * (b.x - a.x)) * 180) / Math.PI,
});
