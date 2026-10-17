export type BibleSection = {
  id: string;
  title: string;
  rules: string[];
};

export const BIBLE: BibleSection[] = [
  {
    id: "geometry",
    title: "Graph geometry",
    rules: [
      "The world is one lattice in three stacked tiers that mirror an AWS attack path: edge tier on top (internet-facing load balancers and tasks), identity tier in the middle (IAM roles), data tier at the bottom (secrets and buckets).",
      "Resources are matte graphite monolith towers on suspended smoked-glass decks. Identity resources are faceted prisms. Data resources are sealed hexagonal vaults.",
      "Relationships are hair-thin conduits between resources. Conduits are the only emissive geometry in the world.",
      "Attack paths always travel downward through the tiers, edge to identity to data, so the direction of travel itself tells the story.",
    ],
  },
  {
    id: "materials",
    title: "Materials",
    rules: [
      "Matte graphite, brushed dark titanium, smoked glass and polished black stone. No chrome, no gold, no glossy plastic.",
      "Surfaces read through reflections of conduit light, never through their own colour.",
    ],
  },
  {
    id: "lighting",
    title: "Lighting",
    rules: [
      "Low-key and motivated: a cool steel-blue ambient, with conduit light as the only key light.",
      "One hot light per frame at most. Magenta appears only where XSEE is acting on a relationship.",
      "Soft volumetric haze gives atmospheric depth. Fine dust is allowed, and particle storms are not.",
    ],
  },
  {
    id: "camera",
    title: "Camera language",
    rules: [
      "35mm-equivalent lens, constant slow speed, no handheld shake, no whip pans and no roll.",
      "Every shot ends travelling in the direction the next shot begins, forward and down, so cuts carry momentum.",
      "Hero compositions are centred, from a slight low angle, with clean negative space above for titles.",
    ],
  },
  {
    id: "effects",
    title: "Visual effects",
    rules: [
      "Allowed: light pulses travelling along conduits, haze, slow conduit breathing and reflections.",
      "Banned: text, numbers, logos, interface panels, falling code, floating holograms, lens flares, particle storms, people and explosions.",
      "The video never shows labels, IAM names, terminal output or proof states. Those are rendered as deterministic overlays from XSEE data.",
    ],
  },
  {
    id: "evidence",
    title: "Evidence semantics",
    rules: [
      "A tentative magenta pulse means a candidate relationship. It is being traced, not proven.",
      "The magenta verification ring means evidence is being evaluated, never that exploitation succeeded.",
      "No shot depicts a verified compromise. Observed, simulated, untested and assumed are carried by the overlay text, sourced from the scenario data.",
      "Red is reserved for configuration drift in a later chapter.",
    ],
  },
  {
    id: "transitions",
    title: "Scene transitions",
    rules: [
      "Primary: match-frame chaining. The approved take's last frame becomes the next shot's first frame, joined with a straight cut.",
      "Fallback when a shot was generated without chaining: a 0.5-second dissolve, never a cut on stillness.",
    ],
  },
  {
    id: "grade",
    title: "Colour grade",
    rules: [
      "Blacks sit at #05070C, shadows lean navy, midtones are slightly desaturated, and magenta #FF1B8D is the only saturated hue.",
      "One shared grade is applied to the assembled film so every take matches: gentle contrast, cooler shadows, a soft vignette and a 0.6-second fade up from black.",
    ],
  },
];

export const PROMPT_LOOK =
  "Look: low-key near-black and midnight-navy world, steel-blue ambient light, magenta as the only saturated colour, soft volumetric haze for depth, physically based materials, fine film grain, 35mm lens, no camera shake.";

export const PROMPT_AVOID =
  "No text, numbers, logos, interfaces, falling code, holograms, lens flares, particle storms, people or explosions.";

export const NEGATIVE_PROMPT =
  "text, letters, numbers, logos, user interface, falling code, holograms, lens flares, particle storms, people, explosions, camera shake, warping";

export const FILM_GRADE =
  "eq=contrast=1.05:saturation=0.9:gamma=0.97,colorbalance=rs=-0.02:bs=0.05:bm=0.02,vignette=angle=PI/5";

export const DISSOLVE_SECONDS = 0.5;
export const FADE_IN_SECONDS = 0.6;
export const FILM_WIDTH = 1280;
export const FILM_HEIGHT = 720;
export const FILM_FPS = 24;

export type FilmChapter = {
  index: number;
  title: string;
  window: string;
  story: string;
  status: "prototype" | "planned";
};

export const FILM_CHAPTERS: FilmChapter[] = [
  {
    index: 1,
    title: "Inside the Attack",
    window: "00:00–00:15",
    story: "Enter the cloud, trace a candidate attack path, arrive at the Proof Engine.",
    status: "prototype",
  },
  {
    index: 2,
    title: "Evidence",
    window: "00:15–00:30",
    story: "Each relationship is tested. Observed and simulated evidence separate visibly.",
    status: "planned",
  },
  {
    index: 3,
    title: "Remediation",
    window: "00:30–00:45",
    story: "The weakest proven link is cut, with a human approving the change.",
    status: "planned",
  },
  {
    index: 4,
    title: "Re-verification",
    window: "00:45–01:00",
    story: "The path is re-tested and the closure is proven, not assumed.",
    status: "planned",
  },
  {
    index: 5,
    title: "Drift-aware closure",
    window: "01:00–01:15",
    story: "The environment keeps changing. XSEE watches for drift and reopens what moves.",
    status: "planned",
  },
];
