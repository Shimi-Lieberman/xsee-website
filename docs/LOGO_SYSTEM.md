# XSEE Logo System

Two variants for consistent SaaS branding across the website and platform.

## Assets

| Variant | File | Use for |
|--------|------|--------|
| **Full logo** | `public/xsee-logo.svg` | **Deprecated.** Use Logo Light / Logo Dark. |
| **Logo Light** | `public/xsee-logo-light.svg` | White/light: navbar (scrolled), reports, login, print |
| **Logo Dark** | `public/xsee-logo-dark.png` | Dark: navbar (over hero), hero, footer |
| **Icon** | `public/xsee-icon.png` | Footer, sidebar, favicon |

### Replacing the navbar logo (`xsee-logo.svg`)

To avoid clipping and ensure the full logo is visible:

- **Format:** SVG (recommended) or PNG.
- **Content:** Emblem + “XSEE” wordmark (optionally include a tagline; navbar can show emblem + wordmark only).
- **ViewBox:** Set the SVG `viewBox` so all important content is inside it. The navbar reserves **160–220px width** and **44–52px height**; the image uses `object-fit: contain`, so the full viewBox is visible if nothing is drawn outside it.
- **Background:** Transparent. Use `currentColor` for the logo so it adapts to light/dark nav.
- If only part shows: check the SVG `viewBox` includes all art and there is no `overflow="hidden"` clipping content.

## Usage by surface

### Website (xsee.io) — this repo
- **Navbar:** Icon only. `width={36}` `height={36}`. Left side.
- **Hero:** No logo. Starts with headline “Understand Your Cloud Attack Paths” and subtext. Section has `.hero { margin-top: 80px }`.
- **Footer:** Icon. Height 32px. Left above copyright and in main column.

### Platform (app.xsee.io)
- **Sidebar:** Icon. Height 32px. Top of sidebar above navigation.
- **Launch screen:** Full logo. Centered. Height 110px. Glow:  
  `filter: drop-shadow(0 0 14px rgba(59,130,246,0.45));`

### Login page
- **Full logo.** Centered above login card. Height 90px.

### Reports
Every generated report must include the **full logo** in the header:

```
------------------------------------------------
[ XSEE LOGO ]
Cloud Attack Intelligence

Report Title
Environment
Date
------------------------------------------------
```

- Logo height: 80px, centered.

### Favicon
- Use **icon** (`public/xsee-icon.png`).  
- For `public/favicon.ico`, generate from the icon (e.g. ImageMagick:  
  `convert public/xsee-icon.png -resize 32x32 public/favicon.ico`).

## Global rules
- Use Logo Light on white/light backgrounds; Logo Dark on dark backgrounds. Do not stretch; use `object-fit: contain`. Scale properly on desktop, tablet, mobile. No plain text "XSEE" fallback in header; always render the logo image. Keep transparent background.

## Result
- **Light:** navbar (scrolled), reports, login (light), print.
- **Dark:** navbar (over hero), hero, footer area, launch screen.
- **Icon:** footer, sidebar, favicon.
