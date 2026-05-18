# Marketing homepage refinement — implementation record

**Handoff:** `https://api.anthropic.com/v1/design/h/iKWKCs4eggB8SSLOTGYUkg`  
**Verified export:** `XSEE Homepage (3).html` / `design_handoff_xsee_marketing/source/homepage/src/app.jsx`  
**Repo:** [Shimi-Lieberman/xsee-website](https://github.com/Shimi-Lieberman/xsee-website)  
**Branch:** `polish/marketing-refinement-may17` (rebased onto `main`, not merged)  
**Refinement commit (historical):** `a7c3a8b` — sec-pad, `.hp-h-display`, ProofLoop, ZeroWrite rebuild

## Rebase & integration (2026-05-18)

`git rebase main` on `polish/marketing-refinement-may17` fast-forwarded to current `main` (`aae40ba`). No conflict files — refinement from `a7c3a8b` is already in history via later commits; branch tip inherits:

| Commit | What |
|--------|------|
| `a7c3a8b` | ProofLoop, ZeroWrite, sec-pad, hp-h-display, HomeScrollReveal (initial) |
| `fda8484` | Hero clamp 112px, Proof min-heights, CTA two-tone + trial footnote |
| `a0064b3` | HomeScrollReveal below-fold only (no above-fold opacity:0) |
| `afacdab` | AI / Detection / Engines / Quote hp-section components |
| `38ef649` | Terminal hp-section (removed from homepage in composition pass) |
| `aae40ba` | Design System (2) tokens `#050810`, hero parity |

**Conflict resolution policy:** N/A (clean rebase). Rule for future conflicts: **main** for `HomeScrollReveal` / scroll-reveal; **branch** for refinement CSS and homepage components.

## Section order (`page.tsx` — matches `app.jsx`)

```text
Hero → TrustedBy → Problem → ProofLoop → Proof
→ AI → Detection → Stats → Engines → ZeroWrite
→ Loop → Quote → Certificate → Comparison → Pricing → BuiltBy
→ [production] CTABanner → ContactForm → Footer
```

**Removed from homepage (not in export / breaks dark flow):**

- Legacy `TerminalSection` on homepage
- `Testimonials` white band
- `SecurityComplianceTrustSection` white band
- `#f4f4f2` dot-texture wrapper around `Pricing`
- `ComplianceBar` block

**Production-only (after BuiltBy, before Footer):** `CTABanner` (`hp-section` dark), `ContactForm` (`sec-light` — known light tail; not in export).

## Tokens & hero

- `.hp-page` base: `#050810` (Design System README)
- Hero `h1`: `clamp(52px, 8.4vw, 112px)`, `maxWidth: 14ch` (`fda8484` / handoff README)
- Pink: `#FF1B8D` via `--color-primary` / `--hp-brand`
- Fonts: Geist via `geist/font` in `layout.tsx` (export uses Google Fonts link — minor metric delta possible)

## CSS load / collisions (diagnostic)

- `homepage.css` imported from `page.tsx`; bundled in production CSS chunk.
- `.hp-section` padding uses `--sec-pad-y` / `--sec-pad-y-lg` (112px / 144px) — not overridden by globals when scoped under `.hp-page`.
- `HomeScrollReveal` (`a0064b3`): only below-fold nodes get `hp-scroll-reveal`; `#proof-loop` and `#get-started` excluded.
- Legacy `globals.css` `.reveal` no longer wraps homepage sections (removed `className="reveal"` wrappers).

## Diagnostic screenshots (post-rebase composition)

Captured at **http://localhost:3017** (production `npm run start`), viewport **1440×900**:

| File | Purpose |
|------|---------|
| `.diagnostic-screenshots-refinement-may17/00-full-page.png` | Full-page scroll |
| `.diagnostic-screenshots-refinement-may17/01-hero-at-first-paint.png` | Hero + LIVE card |
| `.diagnostic-screenshots-refinement-may17/02-proof-loop-mid-cycle.png` | ProofLoop ~6s |
| `.diagnostic-screenshots-refinement-may17/03-zero-write.png` | Zero-write (`#trust`) |

**Post-rebase checks:** hero LIVE card does not overlap headline; ProofLoop captions `steps(1)` (one visible); `#problem-title` opacity 1 at first paint.

## Verification

```bash
npm run build          # exit 0
npm run check:forbidden  # passed
```

Tier-2A: no forbidden remediation copy on homepage paths.

## Deferred / known deltas vs standalone HTML

1. **`Pricing.tsx`** — not restyled to `hp-section`; cards use inline dark styles; no white wrapper on homepage.
2. **`ContactForm`** — `sec-light` tail section (production).
3. **Ch unit at large display sizes** — `28ch` on `.hp-h-display--wide` resolves to ~1000px+ at 60px font; block spans + grid columns control line length in practice.

## Locked decisions

- Do not edit `Pricing.tsx` / `layout.tsx` in refinement passes unless explicitly scoped.
- Do not merge to `main` until QA signs off on rebased branch screenshots vs export.
