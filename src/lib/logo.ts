/**
 * XSEE logo paths and dimensions.
 * Use with Next.js Image: src={LOGO_ICON.src} width={LOGO_ICON.width} height={LOGO_ICON.height}
 * See docs/LOGO_SYSTEM.md for full usage rules.
 */
export const LOGO_ICON = {
  src: "/xsee-icon.png",
  alt: "Xsee",
  width: 36,
  height: 36,
  /** Sidebar / compact: 32px */
  sizeCompact: 32,
} as const;

export const LOGO_FULL = {
  src: "/xsee-logo.png",
  alt: "XSEE — Cloud Attack Intelligence",
  /** Login: 90px. Reports: 80px. Launch: 110px */
  heightLogin: 90,
  heightReport: 80,
  heightLaunch: 110,
} as const;

/** Launch screen glow filter */
export const LOGO_GLOW_CSS =
  "drop-shadow(0 0 14px rgba(59,130,246,0.45))";
