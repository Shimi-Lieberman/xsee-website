# XSEE Logo System

Two variants for consistent SaaS branding across the website and platform.

## Assets

| Variant | File | Use for |
|--------|------|--------|
| **Full logo** | `public/xsee-logo.png` | Reports, launch screens, login pages, report cover pages |
| **Icon** | `public/xsee-icon.png` | Navbar, sidebar, favicon, compact UI |

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
- Do not stretch the logo (use fixed height + `width: auto` / `object-contain`).
- Do not add backgrounds behind it.
- Do not duplicate logos in the same section.
- Do not place logo on light boxes (prefer dark or transparent).
- Keep transparent background.

## Result
- **Icon:** navbar, sidebar, favicon, compact UI.
- **Full logo:** reports, login, launch screens.
- **Hero:** no logo — headline and subtext only.
