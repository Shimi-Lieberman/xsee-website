# Cursor Guidance — XSEE Homepage v2 Polish Pass

Paste this entire file into Cursor's chat. It is your complete brief.

---

## 0. Read this first — the failure modes we are explicitly preventing

Previous polish attempts on this codebase broke in three specific ways. **Every rule in this prompt exists to prevent one of these failures. Do not deviate.**

### Failure A — Elements rendering on top of each other
Captions stacked underneath each other (e.g. four phase captions visible simultaneously: *"Resimulated, verified at hop signed denied"*). A certificate card landed on top of caption text. Stat badges overlapped graph nodes.

**Root cause:** Multiple elements were positioned with `absolute` inside the same parent, or animation states were CSS-driven (all four caption strings present at all times, just opacity-cycled — so the layout box always reserved space for all four).

### Failure B — Sections crashing into each other
No vertical breathing room between sections. The hero butted directly into the logo strip. The CTA touched the footer. Section padding collapsed on mobile.

**Root cause:** Section padding was set per-section ad-hoc (`py-12`, `py-16`, sometimes `py-8`) instead of from a single shared spec. Many sections had no padding inside their inner container either.

### Failure C — Elements inside sections too close together
Headlines kissed body copy. Buttons touched mono micro-labels. KPI cards had no gap between their label and value.

**Root cause:** Internal spacing relied on text default line-height instead of explicit `gap`/`mt-*`/`mb-*` rhythms.

**Three rules that prevent all of the above:**

1. **State first, then style.** If a UI element has phases or steps, only ONE phase's content may render in the DOM at a time. Use React state, not opacity-cycled CSS, for any sequence-aware content (captions, status text, step indicators, certificates that appear in a "close" phase).
2. **A section is a slab.** Every `<section>` gets `py-28 lg:py-40` (112px / 160px). No exceptions. No `py-12`. No `pt-8 pb-16`. If a section feels too tall, it is correct — that is the point.
3. **Inner spacing uses tokens, not whitespace.** Children of a section are separated by explicit `mt-*`/`mb-*` or by a `gap-*` on the parent flex/grid. Never by leaving line-height as the only separator.

---

## 1. Role & posture

You are a senior frontend engineer doing a **visual polish pass** on the existing xsee marketing site. You are not redesigning the product, rewriting the architecture, or changing the copy. You are taking a high-fidelity design reference and bringing the existing implementation up to its quality, one section at a time.

**Default posture: precise, conservative, ship-in-PR-sized increments.**

Open a PR per section. Do not bundle multiple sections into one PR. Each PR must include a screenshot at 1440px width pasted into the description.

---

## 2. The two sources of truth

Open and read these before touching code:

1. **`design_handoff_xsee_v2/source/index.html`** — open this in a browser. It is the visual target. Every spacing, color, animation, and font choice you see is intentional and must be matched.
2. **`design_handoff_xsee_v2/README.md`** — the full spec: design tokens, type scale, section-by-section breakdown.

The `source/src/*.jsx` files are React reference implementations. Translate their structure into the existing codebase's idiom (its component library, its CSS approach, its existing files) — do not paste them verbatim if that fights the existing patterns.

**Pay specific attention to `source/src/proof-loop.jsx`** — it is the canonical example of how to handle phased content (state-driven captions + a certificate card that appears in a CLOSE phase). Copy its pattern wherever you have sequence-aware UI.

---

## 3. Hard constraints — keep vs. replace

### Keep — do not modify

- Page routes, file structure, build config
- All copy, headlines, body text, CTA labels (except where v2 explicitly rewrites a line, e.g. the hero headline)
- Section ordering: Hero → Logos → Reduction → Loop → ProofLoop → How → Comparison → CTA → Footer
- Component names (`Hero`, `Loop`, `How`, etc.) — keep them so diffs stay readable
- Form handlers, analytics events, conversion tracking, A/B test wiring
- Accessibility behavior, semantic HTML structure, focus management

### Replace — these are the upgrades

- **Fonts**: Geist (sans), Geist Mono (numbers), Instrument Serif (italic-only accents). Load via one Google Fonts `<link>`.
- **Color tokens**: adopt the dark + bone-light + brand palette in `README.md` § Design Tokens. No new colors.
- **Type scale**: `display-xxl / display-xl / display-lg / eyebrow / serif-accent`.
- **Section padding**: every section becomes `py-28 lg:py-40`. Page horizontal: `px-6 lg:px-10`, max content `1400px`.
- **Hero cinematic**: implement `AttackGraphCinematic` from `source/src/hero.jsx`.
- **Proof loop cinematic**: implement `ProofLoopStage` from `source/src/proof-loop.jsx` — state-driven captions + state-driven certificate card.
- **Section rhythm**: Hero/Logos/Reduction/Loop/ProofLoop dark → **How and Comparison bone cream `#F2EFE8`** → CTA/Footer dark.
- **Editorial italic**: exactly one Instrument Serif italic phrase per display headline.
- **Card primitives**: `.card-dark` and `.card-light` layered shadow recipes.
- **Atmospherics**: every dark section gets a pink radial glow + dot-grid background + SVG grain overlay.

---

## 4. Layout & spacing rules (anti-overlap charter)

These rules exist because they were violated last time. Hold them literally.

### 4.1 Section padding spec

Every section root element gets exactly:
```
py-28 lg:py-40        (vertical — 112px / 160px)
px-6 lg:px-10         (horizontal)
```
Inner content wraps in `max-w-[1400px] mx-auto`. Section headers inside that wrap get a `mb-12 lg:mb-20` (48/80px) breathing rule before the body.

Hero is the only section allowed to override vertical (`pt-[120px] lg:pt-[160px]` to clear the fixed nav) — but its bottom padding is still `pb-20 lg:pb-28`.

### 4.2 Inner spacing rhythm

| Between | Spacing |
|---------|---------|
| Eyebrow → headline | `mb-3` to `mb-5` (12–20px) |
| Headline → lead paragraph | `mt-6` to `mt-8` (24–32px) |
| Paragraph → CTA row | `mt-8` to `mt-10` (32–40px) |
| CTA row → trust strip | `mt-8` to `mt-10` (32–40px) |
| Section header block → body grid | `mb-12 lg:mb-20` (48/80px) |
| Card to card in a grid | `gap-5` or `gap-6` (20/24px) |
| Inside a card: glyph → title | `mb-5` (20px) |
| Inside a card: title → body | `mb-3` (12px) |
| Inside a card: body → bottom mono detail | `pt-5 mt-5 border-t hairline` |

**Never** rely on `line-height` alone to space adjacent block elements. **Never** rely on default margin-collapse of `<p>` tags.

### 4.3 Absolute positioning rules

`absolute` is permitted only for:
- Atmospherics (`glow-*`, `grain`, `dotgrid-*`) inside an explicitly relative parent
- Inline overlays on SVG canvases (e.g. status text in the bottom-left of a graph card)
- Nav (fixed) and dropdowns
- Image overlays inside an aspect-ratio container

**Never** position a piece of section content (caption, certificate, callout) absolutely on top of another piece of section content. If two elements relate to the same anchor in time (e.g. "show this when phase = CLOSE"), they must be siblings in normal flow — switched in/out by state, not stacked by z-index.

### 4.4 Phased content rule — the single biggest source of last round's breakage

Any UI that walks through a sequence (the proof loop, an onboarding stepper, a tabbed comparison) must follow this contract:

1. **State is React-owned.** A `phase` integer in `useState`. An `IntersectionObserver` resets it to 0 when the section enters view. A `setInterval` increments it.
2. **Only the active item is in the DOM.** Wrong: render all four captions, fade three to opacity 0. Right: render `captions[phase]` only.
3. **The slot has a `min-height`.** So that swapping content doesn't reflow neighboring elements. Use `min-h-[28px]` or whatever matches the tallest variant.
4. **Adjacent reveal-on-state elements** (e.g. the certificate appearing in CLOSE) live in their own DOM slot below or beside the canvas — never overlapping. They use `opacity` + `transform` for the in/out — but their box always exists, with a fixed height.

`source/src/proof-loop.jsx` is the literal reference for this pattern. Read it.

### 4.5 Section-transition seams

When the surface changes (dark → bone cream → dark), there must be a hard 1px seam, never a gradient. Implement as `border-t` and `border-b` of `bg-base` on the light section. The visual reads as two materials meeting, not as one fading.

---

## 5. Order of operations

Tackle in this order. **Stop and post a screenshot after each step.** Wait for review before continuing.

1. **Foundation** — fonts loaded, color tokens in your theme/CSS, type scale utilities, the full `<style>` block with all `@keyframes` and `.card-*`, `.btn-*`, `.glow-*`, `.dotgrid-*`, `.grain`, `.reveal`, `.pl-*` (proof-loop) utilities.
2. **Nav** — glass-on-scroll, 64px tall, pill CTA on the right.
3. **Hero** — type moment first, then the cinematic attack graph below.
4. **Reduction** — `4,000 → 3` editorial slab with the brand-pink strike-through, 4-cell stat strip with arrow circles between cells.
5. **Loop** — 4 phase cards in a row with their bespoke mini-SVG visuals.
6. **ProofLoop** — the signature cinematic. State-driven phase + state-driven caption + state-driven certificate card. **Do this one with extra care — it was the source of last round's worst breakage.**
7. **How + Comparison** — bone-light surfaces. Hard seams above and below.
8. **CTA + Footer** — dark return, massive closing headline.

After step 8, do a full responsive pass at 375px, 834px, 1440px, 1920px, and test `prefers-reduced-motion: reduce`.

---

## 6. The five details that separate this from generic SaaS polish

If you skip these, the page will still feel un-premium.

1. **Three lines of type**, never one. Display headlines stack vertically with `<span class="block">` per line so each line gets `text-wrap: balance`.
2. **One serif italic word per headline.** Used right, this gives brand voice. Twice in the same headline is affectation.
3. **Light interlude.** Pages that stay one surface from top to bottom feel cheap regardless of typography. The bone cream `#F2EFE8` for How and Comparison is what gives this page rhythm.
4. **Empty space at the headline.** Each major headline has ~15ch max-width with vast empty real estate around it. Resist filling it with supporting graphics.
5. **Brand pink earned, not sprayed.** Pink: brand mark, primary CTA, the path-drawing color in graphs, one or two emphasized data points per section. Never a background fill. Never on more than ~5% of any section.

---

## 7. Pre-commit checklist (per section)

Before opening a PR for a section, verify all of these:

**Spacing & overlap**
- [ ] Section root has `py-28 lg:py-40 px-6 lg:px-10`
- [ ] Content wraps in `max-w-[1400px] mx-auto`
- [ ] No two pieces of section content are positioned `absolute` on the same anchor
- [ ] No grid/flex child is missing a `gap-*` token
- [ ] Headline → paragraph has at least `mt-6` (24px)
- [ ] Paragraph → CTA row has at least `mt-8` (32px)

**Type**
- [ ] Display headline is `<h2>` (or `<h1>` for hero) with `display-xl` or larger class
- [ ] Eyebrow above the headline uses the `eyebrow` utility (11px, 0.16em tracking, uppercase)
- [ ] Exactly one Instrument Serif italic phrase per headline
- [ ] Mono numbers use `font-feature-settings: 'tnum' 1`

**State & phased content** (if applicable)
- [ ] All sequence states are React `useState`, not opacity-cycled CSS
- [ ] Only the active item is in the DOM
- [ ] The slot has an explicit `min-height` so swaps don't reflow neighbors
- [ ] An `IntersectionObserver` resets the cycle on scroll-in

**Surfaces**
- [ ] Dark section background is `#06080F` (not `#000`, not `#0A0A0A`)
- [ ] Light interlude background is `#F2EFE8` (not `#FFF`, not `#FAFAFA`)
- [ ] Section transition is a hard 1px seam, not a gradient

**Atmospherics (dark sections only)**
- [ ] One pink radial glow positioned off-center
- [ ] One dot-grid background at `rgba(255,255,255,0.045)`
- [ ] One SVG grain overlay at 4% white noise, `mix-blend-mode: overlay`

**Motion**
- [ ] All animations honor `@media (prefers-reduced-motion: reduce)`
- [ ] No animation duration < 120ms (looks jittery) or > 800ms (looks slow) for hover/state changes
- [ ] Sequence cinematics loop cleanly (no flash on cycle reset)

**Responsive**
- [ ] 375px: headlines clamp down, multi-col grids collapse to single col, padding stays generous
- [ ] 834px: 2-col grids where appropriate, hero graph adapts aspect ratio
- [ ] 1440px+: full design intent visible, no awkward stretch

---

## 8. When to ask vs. when to ship

**Ship without asking:**
- Token swaps, font swaps, type-scale upgrades
- Section padding fixes, max-width adjustments
- Copying animations from the reference verbatim
- Adding atmospheric layers
- Replacing flat borders with the layered card primitives

**Ask first:**
- Changing any product copy not explicitly rewritten in the v2 reference
- Removing or reordering sections
- Introducing a new color or font outside the spec
- Skipping the bone-light interlude or merging it into the dark sections
- Diverging from the cinematic graph or proof-loop implementations
- Adding any non-state-driven sequence/animation (the previous code's biggest landmine)

---

## 9. Output format for each PR

1. PR title: `polish(section): <section name> — v2 pass`
2. PR description includes:
   - One-paragraph summary of what changed
   - List of files modified, with line-count diffs
   - Screenshot of the section at **1440px**
   - Screenshot at **375px**
   - Screenshot of the state-toggled variant if any (e.g. ProofLoop at phase=3)
3. Self-check: paste the relevant items from § 7 with `[x]` next to each

**Begin with Step 1 (Foundation).** Post a screenshot of the rendered tokens + type scale + a single animation test before moving to Step 2.
