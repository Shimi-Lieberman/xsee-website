/**
 * XSEE logo paths and dimensions.
 * Two variants for adaptive visibility on light vs dark backgrounds.
 * See docs/LOGO_SYSTEM.md for full usage rules.
 */

/** Logo for white/light backgrounds: black wordmark, green shield */
export const LOGO_LIGHT = {
  src: "/xsee-logo-light.svg",
  alt: "XSEE — Cloud Attack Intelligence",
  width: 160,
  height: 44,
} as const;

/** Logo for dark backgrounds: white/light outlined shield + XSEE + slogan — premium asset */
export const LOGO_DARK = {
  src: "/xsee-logo-dark.png",
  alt: "XSEE — Trust Nothing. Prove Everything.",
  width: 220,
  height: 60,
} as const;

/** @deprecated Use LOGO_LIGHT or LOGO_DARK depending on background. Reports/print use LOGO_LIGHT. */
export const LOGO_FULL = LOGO_LIGHT;

export const LOGO_ICON = {
  src: "/xsee-icon.png",
  alt: "XSEE",
  width: 36,
  height: 36,
  sizeCompact: 32,
} as const;

/** Launch screen glow filter */
export const LOGO_GLOW_CSS =
  "drop-shadow(0 0 14px rgba(59,130,246,0.45))";

/** Heights for different surfaces */
export const LOGO_HEIGHTS = {
  navbar: 44,
  navbarMax: 52,
  hero: 48,
  login: 90,
  report: 80,
  launch: 110,
} as const;
