export type Point = { x: number; y: number };
export type PathNode = Point & { label: string; target?: boolean };
export type Composition = {
  viewBox: string;
  width: number;
  height: number;
  path: PathNode[];
  branches: [Point, Point][];
  field: Point[];
  links: [number, number][];
};

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const round = (n: number) => Math.round(n * 10) / 10;

function buildField(width: number, height: number, count: number, seed: number) {
  const rand = seeded(seed);
  const field: Point[] = Array.from({ length: count }, () => ({
    x: round(rand() * width),
    y: round(rand() * height),
  }));
  const links: [number, number][] = [];
  field.forEach((p, i) => {
    let best = -1;
    let bestDist = Infinity;
    field.forEach((q, j) => {
      if (j <= i) return;
      const d = (p.x - q.x) ** 2 + (p.y - q.y) ** 2;
      if (d < bestDist) {
        bestDist = d;
        best = j;
      }
    });
    if (best !== -1) links.push([i, best]);
  });
  return { field, links };
}

const DESKTOP_PATH: PathNode[] = [
  { x: 170, y: 190, label: "Public endpoint" },
  { x: 410, y: 290, label: "Load balancer" },
  { x: 650, y: 175, label: "Web service" },
  { x: 880, y: 305, label: "Workload role" },
  { x: 1080, y: 200, label: "Customer data", target: true },
];

const MOBILE_PATH: PathNode[] = [
  { x: 90, y: 90, label: "Public endpoint" },
  { x: 290, y: 200, label: "Load balancer" },
  { x: 110, y: 320, label: "Web service" },
  { x: 290, y: 440, label: "Workload role" },
  { x: 180, y: 570, label: "Customer data", target: true },
];

export const DESKTOP: Composition = {
  viewBox: "0 0 1200 640",
  width: 1200,
  height: 640,
  path: DESKTOP_PATH,
  branches: [
    [DESKTOP_PATH[1], { x: 520, y: 470 }],
    [DESKTOP_PATH[2], { x: 760, y: 60 }],
    [DESKTOP_PATH[3], { x: 1000, y: 470 }],
    [DESKTOP_PATH[0], { x: 260, y: 40 }],
  ],
  ...buildField(1200, 640, 46, 11),
};

export const MOBILE: Composition = {
  viewBox: "0 0 400 900",
  width: 400,
  height: 900,
  path: MOBILE_PATH,
  branches: [
    [MOBILE_PATH[1], { x: 370, y: 90 }],
    [MOBILE_PATH[2], { x: 30, y: 470 }],
    [MOBILE_PATH[3], { x: 380, y: 610 }],
  ],
  ...buildField(400, 900, 28, 23),
};

export const segment = (a: Point, b: Point) => {
  const mx = (a.x + b.x) / 2;
  return `M${a.x} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`;
};
