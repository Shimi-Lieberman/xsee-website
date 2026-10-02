# Landing page (standalone HTML)

This file is archived and is no longer served from `public/`. To regenerate
`archive/legacy-html/landing.html` with the correct logo and favicon:

1. Save the full landing HTML (the single-file page with nav, hero, terminal, pricing, etc.) to a file, e.g. `landing-src.html`.
2. Run:
   ```bash
   node scripts/patch-landing-html.js < landing-src.html
   ```
   This writes `archive/legacy-html/landing.html` with:
   - Favicon: `<link rel="icon" type="image/svg+xml" href="/logo-symbol-only.svg"/>`
   - Nav logo: `<img src="/logo-primary-transparent.svg" height="36" style="height:36px;width:auto" alt="XSEE"/>`

3. Do not move the result back into `public/` unless you also restore a complete
   path-specific CSP in `next.config.ts` — files in `public/` are served raw
   and used to ship with a weaker policy than the React app.
