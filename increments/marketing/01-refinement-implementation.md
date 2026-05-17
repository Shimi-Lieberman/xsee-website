# Marketing homepage refinement — implementation record

**Handoff:** `https://api.anthropic.com/v1/design/h/iKWKCs4eggB8SSLOTGYUkg`  
**Repo:** [Shimi-Lieberman/xsee-website](https://github.com/Shimi-Lieberman/xsee-website)  
**Date:** 2026-05-16  
**Scope:** xsee.io marketing homepage only (not app.xsee.io / Phase 8 product pages)

## Strategic diff (live main → handoff)

| Area | Change class | Summary |
|------|----------------|---------|
| Section rhythm | VISUAL | Single `--sec-pad-y` / `--sec-pad-y-lg` scale (112px / 144px) replaces ad-hoc 120px / 160px on `.hp-section` |
| Headlines | VISUAL + COPY layout | `.hp-h-display` two-line `.block` pattern + `text-wrap: balance` + 22ch / 28ch max-width on Problem, Proof Loop, Proof, Stats, Comparison, Zero-write |
| Proof loop | NEW SECTION | `ProofLoopSection` after Problem: 12s CSS cycle SEE→CHAIN→PROVE→CLOSE; phase chips; **single caption per phase** (`visibility` + `steps(1)` — no crossfade overlap) |
| Zero-trust | STRUCTURAL + COPY | Tier-2A copy restored; role cards on 22px baseline grid; horizontal `FlowStrip` with **solid** IAM boundary divider; vendor strip in framed subsection |
| Scroll reveal | NEW MODULE | `HomeScrollReveal`: IO + scroll fallback + periodic re-tag (iframe-safe hybrid from handoff `app.jsx`) |
| Preserved sections | UNCHANGED | Pricing, `layout.tsx`, AiAttacker, Detection, Terminal (subheadline), Engines, Testimonials, SecurityCompliance, ComplianceBar, Contact, Footer |

**Classification:** POLISH + one additive section (Proof Loop). Not a full redesign.

## What landed

### CSS (`src/app/homepage.css`, `src/app/homepage-proof-loop.css`)

- Spacing tokens: `--sec-pad-y`, `--sec-pad-y-lg`, `--head-gap`, `--eyebrow-gap`, `--body-gap`
- `.hp-h-display` / `.hp-h-display--wide` headline pattern
- `.hp-scroll-reveal` + `.is-in` (700ms lift/fade)
- Full `pl-*` keyframe suite (12s master cycle) + `prefers-reduced-motion` static fallbacks
- Brand pink via existing `--color-primary` / `--hp-brand` (#FF1B8D)

### Components

| File | Role |
|------|------|
| `src/components/homepage/ProofLoopSection.tsx` | Proof loop stage SVG + section shell (~485 LOC) |
| `src/components/homepage/HomeScrollReveal.tsx` | Client-side reveal initializer |
| `src/components/homepage/ZeroWriteSection.tsx` | Handoff zero-write layout (FlowStrip, role cards, vendor frame) |
| `src/app/page.tsx` | Inserts `ProofLoopSection` after Problem; `hp-page-main` + `HomeScrollReveal` |

### Headline / copy updates (homepage components)

- **Problem:** two-line h-display
- **Proof:** two-line h-display; body spacing `mt-8`
- **Stats:** handoff two-line title
- **Comparison:** handoff headline + intro spacing
- **Zero-write:** “Zero write access. / Ever.” + single read-only XSEE role (no second write role marketing)

### Section order (`page.tsx`)

`Hero → TrustedBy → Problem → **ProofLoop** → Proof → Stats → ZeroWrite → …` (preserved blocks unchanged)

## Verification

```text
npm run build          → exit 0
check:forbidden        → passed
grep invariants (src/) → 0 matches in .ts/.tsx for live homepage paths
```

Tier-2A invariants: no “XSEE applies…”, no “we re-run L2…”, no Role 2 remediation agent copy on homepage components.

## Deferred polish (explicitly not in this pass)

1. **Headline “Ever.” clip check** — verify `overflow`/line-height on narrow viewports (375px) for zero-write `hp-h-display`; adjust if descender clips.
2. **Caption baseline nudge (increment 03)** — optional 1–2px vertical align on Proof Loop phase caption row vs. phase chips if design QA wants tighter optical alignment.

## Files touched (approx.)

| Path | ~LOC |
|------|------|
| `homepage.css` | +115 |
| `homepage-proof-loop.css` | +243 (new) |
| `ProofLoopSection.tsx` | +485 (new) |
| `HomeScrollReveal.tsx` | +75 (new) |
| `ZeroWriteSection.tsx` | ~300 (rewrite) |
| `page.tsx` + 4 section TSX | ~40 |

**Total:** ~1.2k LOC touched/added.

## Locked decisions honored

- Pink: `#FF1B8D` via `--color-primary`
- Fonts: Geist (no handoff Google extras in production)
- `Pricing.tsx`, `layout.tsx`: untouched
- No new `package.json` dependencies
- Tailwind v4 repo setup (no CDN)
