# XSEE Website — Design Prompt

## Color System: GREEN (replace all gold)

Replace ALL gold color references with green:

| Gold | Green |
|------|-------|
| `#d97706` | `#16a34a` (dark green) |
| `#b45309` | `#15803d` (deeper green) |
| `#fbbf24` | `#22c55e` (light green) |
| `rgba(217, 119, 6, ...)` | `rgba(22, 163, 74, ...)` |

---

## Nav CTA button

```css
.nav-cta {
  background: linear-gradient(135deg, #16a34a, #15803d);
  box-shadow: 0 4px 16px rgba(22, 163, 74, 0.25);
}
```

---

## Hero headline

Rename `.gold` to `.green`:

```css
.hero-content h1 .green {
  color: #22c55e;
  text-shadow: 0 0 40px rgba(22, 163, 74, 0.3);
}
```

---

## Hero CTA primary

```css
.cta-primary {
  background: linear-gradient(135deg, #16a34a, #15803d);
  box-shadow: 0 4px 20px rgba(22, 163, 74, 0.3);
}
```

---

## Hero badges

```css
.badge {
  border: 1px solid rgba(22, 163, 74, 0.2);
  background: rgba(22, 163, 74, 0.06);
  color: #22c55e;
}
```

---

## Problem card highlight

```css
.problem-card.highlight {
  background: rgba(22, 163, 74, 0.06);
  border-color: rgba(22, 163, 74, 0.15);
  box-shadow: 0 8px 32px rgba(22, 163, 74, 0.08);
}
```

---

## Step number

```css
.step-number { color: #16a34a; }
```

---

## Step connector

```css
.step-connector {
  background: linear-gradient(90deg, rgba(220, 38, 38, 0.3), rgba(22, 163, 74, 0.3));
}
```

---

## Number values

```css
.number-value {
  color: #22c55e;
  text-shadow: 0 0 30px rgba(22, 163, 74, 0.2);
}
```

---

## Pricing PRO card

```css
.pricing-card.pro {
  border: 2px solid rgba(22, 163, 74, 0.3);
  background: rgba(22, 163, 74, 0.04);
}
.recommended-badge {
  background: linear-gradient(135deg, #16a34a, #15803d);
}
```

---

## Final CTA glow

```css
.final-cta {
  background: radial-gradient(ellipse at center, rgba(22, 163, 74, 0.06), transparent 60%), #0a0a14;
}
```

---

## Footer hover

```css
footer a:hover { color: var(--brand); }
```

---

## Nav brand text

```css
.nav-brand { color: var(--brand); }
```

---

## Logo

The site uses the current temporary logo only: inline SVG (shield + check) and wordmark "XSEE" in the Nav and Footer. Do not reintroduce legacy logo image files (xsee-logo.svg, xsee-logo-light.svg, xsee-logo-dark.*).

---

## Hero copy

**Tagline:** Change to  
**"Trust Nothing. Prove Everything."**

**Sub:**  
"The only platform that discovers attack paths, proves they're exploitable, and verifies your fixes — continuously."

Keep the rest of the website structure identical.
