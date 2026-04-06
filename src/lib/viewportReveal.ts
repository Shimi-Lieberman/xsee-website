/**
 * True when the element is fully below the viewport (user has not scrolled to it yet).
 * Used so above-fold / in-view content stays visible for LCP; only below-fold gets scroll-in animation.
 */
export function shouldAnimateRevealFromBelow(el: Element): boolean {
  const r = el.getBoundingClientRect();
  const h = window.innerHeight;
  if (r.height < 1 && r.width < 1) return false;
  if (r.bottom <= 0) return false;
  return r.top >= h;
}
