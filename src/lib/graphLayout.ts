/**
 * Shared graph/map visualization layout constants.
 * Use across all attack-path and topology visuals for consistent containment and balance.
 */

/** Inset from panel edge (in 0–100 viewBox). Content stays inside [SAFE_INSET, 100 - SAFE_INSET]. */
export const SAFE_INSET = 14;

/** Minimum x/y for node centers to avoid clipping. */
export const MIN = SAFE_INSET;
/** Maximum x/y for node centers. */
export const MAX = 100 - SAFE_INSET;

/** Vertical offset for label below node (in viewBox units). */
export const LABEL_OFFSET_Y = 7;

/** Ensure a value is within the safe zone. */
export function clampToSafeZone(v: number): number {
  return Math.max(MIN, Math.min(MAX, v));
}
