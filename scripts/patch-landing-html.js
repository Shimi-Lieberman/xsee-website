#!/usr/bin/env node
/**
 * Reads stdin (full landing HTML), applies:
 * 1. Add favicon link after the Google Fonts stylesheet link
 * 2. Replace nav logo placeholder with img tag
 * Writes to public/landing.html
 */
const fs = require('fs');
const path = require('path');

let html = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { html += chunk; });
process.stdin.on('end', () => {
  if (!html) {
    console.error('No input. Pipe the full HTML: node scripts/patch-landing-html.js < full.html');
    process.exit(1);
  }
  // 1. Add favicon after stylesheet link (avoid adding twice)
  if (!html.includes('logo-symbol-only.svg')) {
    html = html.replace(
      /(<link href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]+" rel="stylesheet"\/>)/,
      '$1\n<link rel="icon" type="image/svg+xml" href="/logo-symbol-only.svg"/>'
    );
  }
  // 2. Replace nav logo text with img
  html = html.replace(
    /<div class="nav-logo" id="xsee-logo-placeholder">\s*<span class="nav-logo-txt">XSEE<\/span>\s*<\/div>/,
    '<div class="nav-logo" id="xsee-logo-placeholder">\n    <img src="/logo-primary-transparent.svg" height="36" style="height:36px;width:auto" alt="XSEE"/>\n  </div>'
  );
  const outPath = path.join(__dirname, '..', 'public', 'landing.html');
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('Wrote', outPath);
});
