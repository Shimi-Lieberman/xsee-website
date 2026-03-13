#!/usr/bin/env node
/**
 * Injects XSEE logo SVG from public/logo-primary-transparent.svg into the website HTML file.
 * - NAVBAR: Replaces <span class="nav-logo-txt">XSEE</span> inside div.nav-logo#xsee-logo-placeholder with inline SVG (height 36px).
 * - FOOTER: Replaces inner span of div#footer-logo with inline SVG (height 32px), prefixing all ids with "ft-" and updating url(#...).
 * - Removes fixed width/height from SVG root so style controls size.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SVG_PATH = path.join(ROOT, 'public', 'logo-primary-transparent.svg');
const HTML_PATH = path.join(ROOT, 'public', 'landing.html');

function loadSvg() {
  let svg = fs.readFileSync(SVG_PATH, 'utf8').trim();
  // Remove fixed width/height so style controls size; keep viewBox
  svg = svg.replace(/\s*width="[^"]*"/i, '');
  svg = svg.replace(/\s*height="[^"]*"/i, '');
  return svg;
}

function svgForNav(svg) {
  // Add height and style on the opening <svg ...> tag
  const withAttrs = svg.replace(/<svg(\s)/i, '<svg height="36" style="height:36px;width:auto;"$1');
  return withAttrs;
}

function svgForFooter(svg) {
  // 1) Add height and style
  let out = svg.replace(/<svg(\s)/i, '<svg height="32" style="height:32px;width:auto;"$1');
  // 2) Collect all id="..." values and prefix with ft-
  const idRegex = /\bid="([^"]+)"/g;
  const ids = [];
  let m;
  while ((m = idRegex.exec(out)) !== null) ids.push(m[1]);
  // 3) Replace each id="X" with id="ft-X" (replace in reverse length order to avoid partial matches)
  const sortedIds = [...new Set(ids)].sort((a, b) => b.length - a.length);
  for (const id of sortedIds) {
    out = out.replace(new RegExp(`\\bid="${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g'), `id="ft-${id}"`);
  }
  // 4) Replace url(#x) with url(#ft-x)
  out = out.replace(/\burl\s*\(\s*#([^)\s]+)\s*\)/g, (_, ref) => `url(#ft-${ref})`);
  return out;
}

function main() {
  if (!fs.existsSync(HTML_PATH)) {
    console.error('HTML file not found:', HTML_PATH);
    process.exit(1);
  }
  const svgRaw = loadSvg();
  let html = fs.readFileSync(HTML_PATH, 'utf8');

  const navPlaceholder = /<div\s+class="nav-logo"\s+id="xsee-logo-placeholder">\s*<span\s+class="nav-logo-txt">XSEE<\/span>\s*<\/div>/;
  const navSvg = svgForNav(svgRaw);
  const navReplacement = `<div class="nav-logo" id="xsee-logo-placeholder">\n    ${navSvg}\n  </div>`;
  if (navPlaceholder.test(html)) {
    html = html.replace(navPlaceholder, navReplacement);
    console.log('Navbar: Replaced <span class="nav-logo-txt">XSEE</span> with inline SVG (height=36, style=height:36px;width:auto;).');
  } else {
    console.warn('Navbar: Placeholder not found (div.nav-logo#xsee-logo-placeholder with span.nav-logo-txt).');
  }

  // Footer: <div id="footer-logo" ...> <span ...>...</span> </div>
  const footerDivRegex = /<div\s+id="footer-logo"[^>]*>\s*<span[^>]*>[\s\S]*?<\/span>\s*<\/div>/;
  const footerSvg = svgForFooter(svgRaw);
  const footerReplacement = `<div id="footer-logo">\n${footerSvg}\n</div>`;
  if (footerDivRegex.test(html)) {
    html = html.replace(footerDivRegex, footerReplacement);
    console.log('Footer: Replaced inner <span> with inline SVG (height=32, style=height:32px;width:auto;), prefixed ids with "ft-" and updated url(#...).');
  } else {
    console.warn('Footer: Placeholder not found (div#footer-logo with inner span).');
  }

  fs.writeFileSync(HTML_PATH, html, 'utf8');
  console.log('Written:', HTML_PATH);
}

main();
