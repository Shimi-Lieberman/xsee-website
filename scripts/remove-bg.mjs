import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

async function removeBg(inputPath, outputPath = inputPath) {
  const resolved = path.resolve(root, inputPath);
  await sharp(resolved)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
      const { width, height, channels } = info;
      for (let i = 0; i < width * height; i++) {
        const r = data[i * channels];
        const g = data[i * channels + 1];
        const b = data[i * channels + 2];
        if (r < 30 && g < 30 && b < 60) {
          data[i * channels + 3] = 0;
        }
      }
      return sharp(data, { raw: { width, height, channels } })
        .png()
        .toFile(path.resolve(root, outputPath));
    });
  console.log('Done:', outputPath);
}

const files = ['public/logo.png', 'public/favicon.png'];
for (const f of files) {
  const p = path.join(root, f);
  if (fs.existsSync(p)) {
    await removeBg(f, f);
  } else {
    console.log('Skip (not found):', f);
  }
}
