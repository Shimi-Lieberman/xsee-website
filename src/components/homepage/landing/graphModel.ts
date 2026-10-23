export type Tier = "primary" | "secondary" | "minor";
export type GraphNode = { id: string; x: number; y: number; tier: Tier; label?: string; target?: boolean };
export type Zone = { x: number; y: number; w: number; h: number };
export type Composition = {
  key: string;
  viewBox: string;
  nodes: GraphNode[];
  links: [string, string][];
  path: string[];
  zones: Zone[];
};

export const DESKTOP: Composition = {
  key: "d",
  viewBox: "0 0 1200 640",
  path: ["entry", "gw", "work", "iden", "data"],
  nodes: [
    { id: "entry", x: 150, y: 170, tier: "primary", label: "Entry" },
    { id: "gw", x: 370, y: 280, tier: "primary" },
    { id: "work", x: 600, y: 160, tier: "primary", label: "Workload" },
    { id: "iden", x: 830, y: 290, tier: "primary", label: "Identity" },
    { id: "data", x: 1060, y: 190, tier: "primary", label: "Data", target: true },
    { id: "s1", x: 260, y: 64, tier: "secondary" },
    { id: "s2", x: 480, y: 380, tier: "secondary" },
    { id: "s3", x: 720, y: 58, tier: "secondary" },
    { id: "s4", x: 410, y: 110, tier: "secondary" },
    { id: "s5", x: 960, y: 390, tier: "secondary" },
    { id: "s6", x: 1150, y: 320, tier: "secondary" },
    { id: "s7", x: 700, y: 380, tier: "secondary" },
    { id: "s8", x: 990, y: 60, tier: "secondary" },
    { id: "m1", x: 160, y: 40, tier: "minor" },
    { id: "m2", x: 56, y: 250, tier: "minor" },
    { id: "m3", x: 60, y: 96, tier: "minor" },
    { id: "m4", x: 590, y: 430, tier: "minor" },
    { id: "m5", x: 820, y: 24, tier: "minor" },
    { id: "m6", x: 870, y: 120, tier: "minor" },
    { id: "m7", x: 1080, y: 450, tier: "minor" },
    { id: "m8", x: 860, y: 460, tier: "minor" },
    { id: "m9", x: 1140, y: 40, tier: "minor" },
    { id: "m10", x: 1170, y: 180, tier: "minor" },
    { id: "m11", x: 500, y: 40, tier: "minor" },
  ],
  links: [
    ["entry", "s1"], ["entry", "m2"], ["entry", "m3"], ["s1", "m1"], ["entry", "s4"], ["s4", "work"], ["s4", "m11"],
    ["gw", "s2"], ["s2", "m4"], ["s2", "s7"], ["work", "s3"], ["s3", "m5"], ["s3", "m6"],
    ["iden", "s7"], ["iden", "s5"], ["s5", "m8"], ["s5", "m7"], ["s5", "s6"], ["data", "s6"],
    ["data", "s8"], ["s8", "m9"], ["data", "m10"], ["s8", "m6"],
  ],
  zones: [
    { x: 40, y: 20, w: 470, h: 330 },
    { x: 640, y: 20, w: 540, h: 400 },
  ],
};

export const MOBILE: Composition = {
  key: "m",
  viewBox: "0 0 400 720",
  path: ["entry", "gw", "work", "iden", "data"],
  nodes: [
    { id: "entry", x: 76, y: 70, tier: "primary", label: "Entry" },
    { id: "gw", x: 260, y: 130, tier: "primary" },
    { id: "work", x: 104, y: 214, tier: "primary", label: "Workload" },
    { id: "iden", x: 300, y: 290, tier: "primary", label: "Identity" },
    { id: "data", x: 176, y: 372, tier: "primary", label: "Data", target: true },
    { id: "s1", x: 350, y: 46, tier: "secondary" },
    { id: "s2", x: 30, y: 312, tier: "secondary" },
    { id: "s3", x: 374, y: 388, tier: "secondary" },
    { id: "m1", x: 180, y: 22, tier: "minor" },
    { id: "m2", x: 18, y: 140, tier: "minor" },
    { id: "m3", x: 390, y: 178, tier: "minor" },
    { id: "m4", x: 56, y: 430, tier: "minor" },
    { id: "m5", x: 320, y: 450, tier: "minor" },
  ],
  links: [
    ["entry", "m1"], ["entry", "m2"], ["gw", "s1"], ["s1", "m3"], ["work", "s2"], ["s2", "m4"],
    ["iden", "s3"], ["s3", "m5"], ["iden", "m3"],
  ],
  zones: [{ x: 14, y: 14, w: 372, h: 230 }],
};

export const segment = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  return `M${a.x} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`;
};
