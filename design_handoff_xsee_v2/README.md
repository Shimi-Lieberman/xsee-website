# XSEE Homepage v2 — Polish Pass Handoff

## What this is

A premium polish pass on the existing xsee.io homepage. **The page logic, sections, and copy strategy are unchanged** — this is purely a visual and typographic elevation focused on:

1. Apple-scale editorial type with serif italic accents
2. A signature self-building attack-graph cinematic in the hero
3. Section rhythm: pitch-dark → warm bone interlude → cinematic dark close
4. Premium depth (layered glows, glass nav, button lift on hover)
5. Generous negative space — no more wall-of-text density

## How to use this with Cursor

Open the existing xsee marketing codebase in Cursor, then point it at this folder and use the prompt in `CURSOR_PROMPT.md`. The folder `source/` contains a fully working HTML reference — open `source/index.html` in a browser to see the target.

**Critical**: Keep your existing component structure, state management, routing, and copy. Replace **only** the visual layer (CSS variables, typography, spacing, animation, layout polish).

---

## Files in this bundle

```
design_handoff_xsee_v2/
├── README.md                ← this file (full spec)
├── CURSOR_PROMPT.md         ← paste this into Cursor
└── source/
    ├── index.html           ← shell + design tokens + animations
    └── src/
        ├── icons.jsx        ← Lucide-style stroke icons
        ├── nav.jsx          ← glass nav with scroll behavior
        ├── hero.jsx         ← THE centerpiece: type + cinematic graph
        ├── logos.jsx        ← marquee strip
        ├── reduction.jsx    ← editorial 4,000 → 3 moment
        ├── loop.jsx         ← 4 phase cards (SEE / CHAIN / PROVE / CLOSE)
        ├── proof-loop.jsx   ← signature cinematic — state-driven phase
        ├── how.jsx          ← LIGHT interlude — setup walkthrough
        ├── comparison.jsx   ← LIGHT — Before / With xsee table
        ├── cta.jsx          ← dark return, massive closing type
        ├── footer.jsx       ← minimal dense footer
        └── app.jsx          ← composition + reveal-on-scroll wiring
```

---

## ⚠️ Failure modes this bundle exists to prevent

Previous polish attempts on this codebase broke in three specific ways. The spec, the reference code, and the Cursor prompt are all written to prevent these. **Read this section before implementing.**

### 1. Phased content stacking on top of itself

**Symptom:** Multiple captions visible simultaneously below the proof-loop graph (e.g. *"Resimulated, verified at hop signed denied"*). Certificate card landing on top of caption text.

**Root cause:** All four phase captions were rendered into the DOM at once and only opacity-cycled by CSS — so the box always reserved space for all four, and overlapping text was inevitable.

**The fix in this bundle:** `source/src/proof-loop.jsx` uses **React state** for phase tracking. Only `captions[phase]` is in the DOM at a time. The caption slot has a fixed `min-height`. The certificate card is a sibling below the canvas — never overlapping — that fades in via `opacity` + `transform` when `phase === 3`.

**Rule for the implementation:** Any sequence-aware UI uses React state and renders only the active step. Never opacity-cycle a stack of CSS-stacked elements.

### 2. Sections crashing into each other

**Symptom:** No vertical breathing room between sections; hero butted into the logo strip; CTA touched footer.

**Root cause:** Ad-hoc section padding (`py-12`, `py-16`, sometimes `py-8`) instead of a single shared rule.

**The fix in this bundle:** Every `<section>` uses **exactly** `py-28 lg:py-40` (112/160px). No exceptions outside the hero's nav-clearance offset.

### 3. Cramped internal spacing

**Symptom:** Headlines kissing body copy, buttons touching mono labels, KPI cards with no breath between label and number.

**Root cause:** Reliance on default line-height instead of explicit spacing tokens.

**The fix in this bundle:** Every adjacent pair of block elements is separated by an explicit `mt-*`/`mb-*` or by `gap-*` on the parent. See `CURSOR_PROMPT.md` § 4.2 for the exact rhythm spec.

---

## Fidelity

**High-fidelity.** All colors, type scale, spacing, easing curves, animations, and layout are pixel-final. Implement these exact values in your codebase.

---

## Design Tokens

### Colors

#### Dark surfaces (Hero / Logos / Reduction / Loop / CTA / Footer)
| Token       | Hex       | Usage |
|-------------|-----------|-------|
| `base`      | `#06080F` | page background — deep cool, not pure black |
| `base2`     | `#0A0D17` | footer / secondary dark surface |
| `elevated`  | `#0F1320` | card top surface |
| `overlay`   | `#161B2C` | icon glyph cells inside cards |
| `ink`       | `#F6F7FB` | primary text / display headlines |
| `ink2`      | `#A6ADC1` | body text |
| `ink3`      | `#6B7388` | tertiary / mono micro-labels |
| `ink4`      | `#3C4358` | hairline separators between mono text |
| `line`      | `#1B2030` | card / section borders |
| `line2`     | `#2A3046` | stronger borders, button ghost border |

#### Light interlude (How / Comparison)
| Token       | Hex       | Usage |
|-------------|-----------|-------|
| `bone`      | `#F2EFE8` | section background — warm cream, NOT white |
| `bone2`     | `#EAE6DD` | secondary light surface |
| `boneLine`  | `#D8D2C5` | warm hairlines |
| `ink5`      | `#13151C` | primary text on light |
| `ink6`      | `#4A4E5C` | body text on light |
| `ink7`      | `#7B8093` | tertiary on light |

#### Brand & state
| Token   | Hex       | Usage |
|---------|-----------|-------|
| `brand` | `#FF1B8D` | the singular accent — CTAs, brand mark, links, key data |
| `brand2`| `#FF4FA3` | brand hover / lighter brand |
| `ok`    | `#10B981` | success, "signed", path closed |
| `warn`  | `#F59E0B` | warning amber |

**Rule**: brand pink is used **sparingly** — primary CTA only, one or two emphasized data points per section, the brand mark, and the path-drawing color in the graph. Never use it as a fill on multiple elements per section.

### Typography

**Three families, loaded together:**
```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```

| Role               | Family            | Notes |
|--------------------|-------------------|-------|
| UI / body          | `Geist`           | 400/500/600/700/800. Feature settings `ss01 on, ss03 on` |
| Numbers / mono     | `Geist Mono`      | All KPI numbers, IDs, ARNs, API calls, mono micro-labels |
| Editorial accent   | `Instrument Serif` italic | The "wow" word in headlines. Use sparingly — one italic phrase per display headline maximum |

### Type scale (editorial)

| Class           | Size                              | Weight | Tracking | Line-height | Usage |
|-----------------|-----------------------------------|--------|----------|-------------|-------|
| `display-xxl`   | `clamp(64px, 11.5vw, 168px)`      | 600    | -0.045em | 0.94        | Hero only |
| `display-xl`    | `clamp(48px, 8vw, 120px)`         | 600    | -0.04em  | 0.98        | Section headlines |
| `display-lg`    | `clamp(36px, 5vw, 72px)`          | 600    | -0.035em | 1.02        | Sub-section headlines |
| Body large      | 18–20px                           | 400    | normal   | 1.6         | Lead paragraphs |
| Body            | 14.5–16px                         | 400    | normal   | 1.6         | Default copy |
| Eyebrow         | 11px                              | 500    | 0.16em   | uppercase   | Section markers |
| Mono micro      | 10.5–11.5px                       | 500    | 0.14–0.16em | uppercase | KPI captions, IDs |

**Display headline pattern** — always max-width ~15ch, balance with `text-wrap: balance`. Compose them as two- or three-line stacks where one line uses Instrument Serif italic as a counterpoint:

```html
<h1 class="display display-xxl text-ink">
  <span class="block">Prove</span>
  <span class="block">the breach <span class="serif-accent text-ink2 italic">before</span></span>
  <span class="block"><span class="serif-accent text-ink2 italic">they take it.</span></span>
</h1>
```

### Spacing (8pt rhythm — strict)

`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 112 / 144 / 192`

**Section vertical padding**: `py-28 lg:py-40` (112px / 160px) is the default. Hero is `pt-[120px] lg:pt-[160px]` to clear the fixed nav. CTA is `pt-28 lg:pt-44`.

**Page horizontal padding**: `px-6 lg:px-10`. Max content width: `max-w-[1400px]`.

### Border radii

| Token              | Value | Usage |
|--------------------|-------|-------|
| Cards              | 14px  | Section cards, graph canvas |
| Inner cells        | 10px  | Nodes inside the graph |
| Glyph cells        | 7px   | 28×28 icon containers |
| Buttons            | 999px (pill) | All primary/ghost buttons |
| Pills / badges     | 999px | Status pills, phase chips |

### Shadows / depth

```css
/* Card primitive — subtle layered depth */
.card-dark {
  background: linear-gradient(180deg, #0F1320 0%, #0C0F1A 100%);
  border: 1px solid #1B2030;
  border-radius: 14px;
  box-shadow:
    0 1px 0 rgba(255,255,255,0.025) inset,
    0 20px 40px -20px rgba(0,0,0,0.6);
}

/* Brand button — earned glow */
.btn-pink {
  background: linear-gradient(180deg, #FF1B8D 0%, #E51480 100%);
  box-shadow:
    0 1px 0 rgba(255,255,255,0.15) inset,
    0 0 0 1px rgba(255,27,141,0.5),
    0 8px 24px -6px rgba(255,27,141,0.45);
}
.btn-pink:hover {
  transform: translateY(-1px);
  box-shadow:
    0 1px 0 rgba(255,255,255,0.2) inset,
    0 0 0 1px rgba(255,27,141,0.7),
    0 12px 32px -6px rgba(255,27,141,0.6);
}
```

### Atmospheric layers (depth)

Every dark section gets:
1. A large pink **radial glow** off-center: `radial-gradient(closest-side, rgba(255,27,141,0.22), transparent 70%)` with `filter: blur(8px)`, ~900×900px
2. A second softer glow (`0.10` opacity, `blur(12px)`, ~720×720px) for layering
3. **Dot grid** background `radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)` size `22px 22px`
4. SVG **grain** overlay (mix-blend-mode: overlay, 4% white noise) for tactile depth

Light sections use the same dot grid but at `rgba(19,21,28,0.07)`.

### Motion / easing

```css
--ease-premium: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1);
```

| Duration | Used for |
|----------|----------|
| `120ms`  | Micro state changes (hover color) |
| `200ms`  | Default transitions (border, background) |
| `300ms`  | Nav glass appearance, card lift |
| `700–800ms` | Reveal-on-scroll fade-up (`opacity` + `translateY(16px)` → `0`) |
| `12s`    | The hero graph master loop |

**Hover rules:**
- Cards: `translateY(-2px)`, border darkens one step. Never change background.
- Buttons: `translateY(-1px)`, shadow deepens. `:active` → `scale(0.985)`.
- Nav: when `scrollY > 20`, apply `backdrop-filter: saturate(160%) blur(14px)` + `rgba(6,8,15,0.72)` background + 1px hairline-bottom.

---

## Sections — section-by-section spec

Each section description lists: **layout · key elements · what changed from current site**.

### 0 · Nav (fixed, glass on scroll)

- 64px tall, fixed, `z-50`
- Brand mark (22px) + "xsee" wordmark
- Center: `Product · How it works · Pricing · Docs` (13.5px, `text-ink2 → text-ink` on hover)
- Right: "Sign in" ghost + "Free breach report" pink pill (h-9, px-4, rounded-full)
- **Scroll behavior**: scrolled state adds glass blur + hairline bottom border (200ms ease)

### 1 · Hero (`#top`)

**Layout**: 
- `pt-[120px] lg:pt-[160px] pb-20 lg:pb-28` 
- max-w-[1400px], px-6 lg:px-10
- Two stacks: (a) type moment, (b) cinematic graph below with 24/32-unit gap

**Atmosphere**:
- Pink radial glow upper-right (920×920, opacity 0.22)
- Soft pink glow bottom-left (720×720, opacity 0.10)
- Vertical hairline at `right-[6%]` with fade-to-transparent ends
- SVG grain overlay

**Elements**:
1. **Eyebrow row** — version pill `v1.5 · AUTONOMOUS AGENTS LIVE` + brand sub-eyebrow `Cloud attack intelligence · AWS`
2. **Headline** — 3 lines, `display-xxl`, max-width 15ch:
   > **Prove**  
   > **the breach** *before*  
   > *they take it.*
   
   (Italic = Instrument Serif, color ink2)
3. **Two-column body** — 7/5 grid:
   - Left: 19px paragraph (max 54ch), CTA row (pink "Free breach report" + ghost "See it work"), mono detail strip
   - Right: editorial pull-quote in serif italic at 28–34px on a left-hairline border
4. **The cinematic graph** — see below

**Cinematic attack-graph cinematic** — the signature visual

A `1200x520` SVG inside a card-dark with `aspectRatio: '1200 / 520'`. A 12-second master loop runs through four phases:

| Phase | Window  | What happens |
|-------|---------|--------------|
| **SEE**   | 0%–22%  | 70 scattered architectural-square findings fade in across the canvas with a left-to-right scanline sweep |
| **CHAIN** | 22%–45% | 5 nodes pop in (Internet → ALB → EC2 → IAM Role → RDS) with bounce easing; cubic-bezier edges draw between them in brand pink |
| **PROVE** | 45%–78% | Comet particles (radial gradient circles) travel each edge via SVG `animateMotion`; target node halos pulse (two concentric rings, 1.4s offset) |
| **CLOSE** | 78%–100% | A signed-receipt card stamps in at bottom-right with green checkmark + receipt id |

Phase chips along the top swap one-at-a-time using `steps(1, end)` to prevent overlap. Each chip is a pill with mono number `01–04` + label + caption.

See `source/index.html` for the exact `@keyframes` (`hgFinding`, `hgEdgeDraw`, `hgNode`, `hgLabel`, `hgComet`, `hgHalo`, `hgPhase1–4`, `hgScan`) and `source/src/hero.jsx` for the SVG implementation. Copy these one-to-one.

### 2 · Logos (`Logos`)

Marquee strip with edge fades. 8 wordmarks (typography-only, no fake brand logos), duplicated for infinite scroll. `animation: marquee 40s linear infinite` translates `-50%`.

Top row: `eyebrow "IN PRODUCTION AT"` left + thin rule + mono stat `38 teams · 14 verticals` right.

### 3 · Reduction (`Reduction`)

The editorial **4,000 → 3** moment.

- Headline (3 stacked lines, `clamp(56px, 9vw, 132px)`):
  > Your scanner found  
  > ~~**4,000**~~ findings.  
  > **3** *actually* matter.
- Strike-through on "4,000" is a `::after` pseudo with `transform: scaleX(0) → 1` over 1.6s, delay 0.4s
- Right column: serif-style body paragraph on left-hairline border
- Below: 4-cell stat strip in a `grid grid-cols-4 gap-px bg-line border rounded-[14px]` with arrow circles between cells:
  - `Findings produced · 4,127`
  - `Reach prod data · 23`
  - `Genuinely novel · 3` (brand)
  - `Need a human · 1` (brand)

### 4 · Loop (`#product`)

**4 phase cards in a `grid-cols-4` row** (responsive: 2-col on md, 1-col on sm).

Each card has:
- `card-dark p-7 lg:p-8`, hover: `border-line2 -translate-y-0.5`
- Top row: mono `01 · SEE` (brand) + mono accent `~120s` (ink3)
- Mini visual in `aspect-[2/1]` rounded inner panel — each phase has its own bespoke SVG:
  - **SEE**: scattered finding squares + horizontal scanline animation
  - **CHAIN**: 4 hop boxes connected by dashed animated lines
  - **PROVE**: 3 API-call rows with green checks + pulsing focus ring
  - **CLOSE**: receipt card with green checkmark + signed dotted line
- Phase name in `display` weight, 26–30px
- Body blurb 14.5px ink2, max 36ch
- Bottom border-top + mono detail strip (lowercase: `cloudtrail · iam · ec2 · rds · s3`)

### 5 · How (`#how`) — **LIGHT** (`#F2EFE8`)

**The major rhythm shift.** Cream surface. 3-step setup walkthrough.

- Section header: eyebrow `03 · SETUP` in `ink7`
- Headline: `From sign-up to first proof in under thirty minutes.` (italic on the second line)
- 3-column grid of `HowStep` cards:
  - White rounded card (border `#E5E0D2`) with mini illustration SVG
  - Mono caption `01 · 2 MIN`
  - Title 26–28px ink5
  - Body 14.5px ink6, max 36ch
- Each illustration is hand-built SVG (Connect: cloud + dashed IAM badge; Scan: stacked resource bars with sweeping dot; Review: approval card with cursor hint pointing at "Approve")
- Bottom strip: paragraph + primary dark button + ghost button

### 6 · Comparison — **LIGHT** continues

Editorial Before/With xsee 2-column comparison.

- Headline: `Every other tool reports. xsee proves.` (italic on "xsee")
- Header row with thick `border-b-2 border-ink5` separator: `[blank · 3 cols] [Traditional CSPM · 4 cols] [⨯ xsee · 5 cols]`
- 6 comparison rows, each `py-6 border-b border-boneLine`, 3/4/5 column split:
  - What you receive
  - How they're proved
  - What happens next
  - When it's resolved
  - Time-to-first-proof
  - What audit gets

Each row: lowercase mono label · "before" text in ink6 · "after" text in ink5. No checkmarks or X-marks — the contrast is editorial, not iconographic.

### 7 · CTA (`#cta`) — **dark return**

Centered, full-width hero-scale closing.

- Status pill: `pink-dot · FREE · NO COMMITMENT`
- Massive headline (`clamp(56px, 9.5vw, 156px)`):
  > Show me  
  > *my own* breach paths.
- 18–19px paragraph (max 560px)
- Two CTAs: pink "Free breach report" (h-14, px-7) + ghost "Book a 20-min walkthrough"
- Mono trust strip below: `2 MIN TO CONNECT · READ-ONLY IAM · NO AGENTS · SOC2 TYPE II`
- Atmospherics: 2 layered pink glows (1200×800 at 0.22 + 1600×1200 at 0.10) + grain

### 8 · Footer

- `bg-base2 border-t hairline`
- 5/2/2/2/1 column grid:
  - Brand block (logo + serif-italic thesis line + status dot `ALL SYSTEMS NORMAL`)
  - Product / Resources / Company link groups (eyebrow + 14px links)
- Bottom strip: © · Privacy · Terms · DPA · SOC 2 · `San Francisco · Tel Aviv`

---

## Interactions & state

**State to wire:**
- Nav: `scrolled` boolean (window.scrollY > 20) → glass background
- Hero `HeroLiveCard` (existing): countdown ticker, decrement every second 134 → 0 → reset 240
- IntersectionObserver for `.reveal` class: add `is-in` on intersection (`rootMargin: '0px 0px -8% 0px'`), unobserve after first trigger

**Accessibility:**
- `prefers-reduced-motion: reduce` disables all animations and shows the final/resolved state of each (e.g., paths drawn, certificate visible, scanlines hidden). See `source/index.html` `@media (prefers-reduced-motion: reduce)` block at end of `<style>`.
- All interactive elements maintain native focus rings.

---

## Assets

The bundle is **fully self-contained** — all visuals are inline SVG or CSS. No external images. The brand X mark is reproduced inline (path data is in `nav.jsx`, `cta.jsx`, `comparison.jsx`, `footer.jsx`, and the bundler thumbnail).

If your codebase already has `/public/logo-symbol.svg`, swap the inline SVG for `<img>` tags at the same dimensions.

---

## What to keep from the existing codebase

- All routes, page structure, and data fetching
- The existing component hierarchy (`Hero`, `Logos`, `Reduction`, `Loop`, etc.) — match these names so you can drop sections in one at a time
- Copy and content strategy is preserved nearly verbatim — only the type *treatment* changes
- Any analytics, conversion tracking, form handlers stay as-is

## What to replace

- Font stack: switch to Geist + Instrument Serif + Geist Mono
- All color tokens: adopt the dark/light palette above
- Section padding: increase to `py-28 lg:py-40` (most sections were under-padded)
- Card shadows: replace flat borders with the layered shadow primitives
- Hero treatment: rebuild around the 3-line display-xxl + serif italic accent
- The attack graph: implement the cinematic SVG from `hero.jsx` verbatim
- Add the **bone-light "How"+"Comparison" surfaces** — this is the rhythm fix
