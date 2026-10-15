export const GRAPH_VIEWBOX = { width: 1000, height: 560 } as const;
export const NODE_BOX = { width: 200, height: 72 } as const;

export const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  internet: { x: 102, y: 110 },
  alb: { x: 351, y: 110 },
  web: { x: 600, y: 110 },
  foothold: { x: 351, y: 300 },
  "role-web": { x: 600, y: 300 },
  "role-batch": { x: 896, y: 300 },
  bucket: { x: 600, y: 480 },
  secret: { x: 896, y: 480 },
};

/** Label anchor overrides, in viewBox units. Defaults to the edge midpoint. */
export const LABEL_POSITIONS: Record<string, { x: number; y: number; align?: "start" | "center" }> = {
  "e-ingress": { x: 226, y: 48 },
  "e-forward": { x: 475, y: 48 },
  "e-foothold": { x: 452, y: 214 },
  "e-web-role": { x: 614, y: 192, align: "start" },
  "e-assume": { x: 748, y: 238 },
};
