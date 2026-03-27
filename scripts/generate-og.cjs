/* Generates public/og-image.png (1200×630) for social sharing. Run: node scripts/generate-og.cjs */
const sharp = require("sharp");
const path = require("path");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#080C14"/>
  <text x="600" y="300" text-anchor="middle" fill="#FF1B8D" font-family="system-ui,Segoe UI,Helvetica,Arial,sans-serif" font-size="84" font-weight="800">XSEE</text>
  <text x="600" y="392" text-anchor="middle" fill="#94A3B8" font-family="system-ui,Segoe UI,Helvetica,Arial,sans-serif" font-size="30" font-weight="500">Stop Guessing. Prove the Breach.</text>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(__dirname, "..", "public", "og-image.png"))
  .then(() => console.log("Wrote public/og-image.png"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
