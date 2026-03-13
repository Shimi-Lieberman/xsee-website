# Landing page (standalone HTML)

The standalone landing HTML (Cloud Attack Intelligence) is not stored in the repo. To generate `landing.html` with the correct logo and favicon:

1. Save the full landing HTML (the single-file page with nav, hero, terminal, pricing, etc.) to a file, e.g. `landing-src.html`.
2. Run:
   ```bash
   node scripts/patch-landing-html.js < landing-src.html
   ```
   This writes `public/landing.html` with:
   - Favicon: `<link rel="icon" type="image/svg+xml" href="/logo-symbol-only.svg"/>`
   - Nav logo: `<img src="/logo-primary-transparent.svg" height="36" style="height:36px;width:auto" alt="XSEE"/>`

3. Open `/landing.html` (or serve `public/` and go to `.../landing.html`). Ensure `public/logo-primary-transparent.svg` and `public/logo-symbol-only.svg` exist.
