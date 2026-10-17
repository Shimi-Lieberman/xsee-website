import "server-only";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";
import { END_CARD_BACKGROUND, END_CARD_INK, FILM_HEIGHT, FILM_WIDTH } from "./bible";
import { FILM_TAGLINE } from "./shots";

const LOGO_FILE = path.join(process.cwd(), "public/logo-primary-transparent.svg");
const FONT_FILE = path.join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Medium.ttf");
const LOGO_WIDTH = 720;
const TAGLINE_SIZE = 40;
const TAGLINE_TRACKING = 0.22;
const GAP = 88;

/** Renders the closing card (logo + tagline) as a PNG. Text is vector-converted so no system fonts are needed. */
export async function renderEndCard(dir: string) {
  const [logoSvg, fontFile] = await Promise.all([readFile(LOGO_FILE, "utf8"), readFile(FONT_FILE)]);
  const font = opentype.parse(fontFile.buffer.slice(fontFile.byteOffset, fontFile.byteOffset + fontFile.byteLength));

  const logo = await sharp(Buffer.from(logoSvg.trim()), { density: 144 }).resize({ width: LOGO_WIDTH }).png().toBuffer();
  const logoHeight = (await sharp(logo).metadata()).height ?? 0;

  const options = { letterSpacing: TAGLINE_TRACKING };
  const textWidth = font.getAdvanceWidth(FILM_TAGLINE, TAGLINE_SIZE, options);
  const blockHeight = logoHeight + GAP + TAGLINE_SIZE;
  const logoTop = Math.round((FILM_HEIGHT - blockHeight) / 2);
  const baseline = logoTop + logoHeight + GAP + TAGLINE_SIZE * 0.72;
  const tagline = font.getPath(FILM_TAGLINE, (FILM_WIDTH - textWidth) / 2, baseline, TAGLINE_SIZE, options).toPathData(2);

  const background = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${FILM_WIDTH}" height="${FILM_HEIGHT}"><rect width="100%" height="100%" fill="${END_CARD_BACKGROUND}"/><path d="${tagline}" fill="${END_CARD_INK}"/></svg>`,
  );
  const card = await sharp(background)
    .composite([{ input: logo, left: Math.round((FILM_WIDTH - LOGO_WIDTH) / 2), top: logoTop }])
    .png()
    .toBuffer();

  const file = path.join(dir, "end-card.png");
  await writeFile(file, card);
  return file;
}
