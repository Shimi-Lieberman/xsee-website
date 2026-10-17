import "server-only";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";
import { END_CARD_BACKGROUND, END_CARD_INK, FILM_HEIGHT, FILM_WIDTH } from "./bible";
import { CHAPTERS, type Shot } from "./shots";

const FONT_DIR = path.join(process.cwd(), "node_modules/geist/dist/fonts");
const MAGENTA = "#FF1B8D";
const MUTED = "#9AA3B5";

const MARGIN_X = 96;
const MARGIN_BOTTOM = 80;
const HEADLINE_WIDTH = 1500;
const FACTS_WIDTH = 1720;

const CHAPTER_SIZE = 32;
const HEADLINE_SIZE = 66;
const HEADLINE_LEADING = 1.16;
const FACT_SIZE = 38;
const FACT_LEADING = 1.4;
const MAX_FACT_LINES = 4;

type Font = opentype.Font;

async function loadFont(file: string) {
  const data = await readFile(path.join(FONT_DIR, file));
  return opentype.parse(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength));
}

function wrap(font: Font, text: string, size: number, width: number, tracking = 0) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (line && font.getAdvanceWidth(next, size, { letterSpacing: tracking }) > width) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function pathData(font: Font, text: string, x: number, baseline: number, size: number, tracking = 0) {
  return font.getPath(text, x, baseline, size, { letterSpacing: tracking }).toPathData(2);
}

type Fonts = { title: Font; label: Font; mono: Font };

function captionSvg(shot: Shot, fonts: Fonts) {
  const chapter = CHAPTERS.find((item) => item.index === shot.chapter)!;
  const chapterText = `CHAPTER ${shot.chapter}  ·  ${chapter.title.toUpperCase()}`;
  const headline = wrap(fonts.title, shot.panelBody, HEADLINE_SIZE, HEADLINE_WIDTH);

  const factLines: { label: string; value: string }[] = [];
  for (const fact of shot.facts) {
    const labelText = `${fact.label.toUpperCase()}   `;
    const labelWidth = fonts.mono.getAdvanceWidth(labelText, FACT_SIZE, { letterSpacing: 0.04 });
    wrap(fonts.mono, fact.value, FACT_SIZE, FACTS_WIDTH - labelWidth).forEach((value, i) =>
      factLines.push({ label: i === 0 ? labelText : " ".repeat(labelText.length), value }),
    );
  }
  const facts = factLines.slice(0, MAX_FACT_LINES);

  const factBlock = facts.length * FACT_SIZE * FACT_LEADING;
  const headlineBlock = headline.length * HEADLINE_SIZE * HEADLINE_LEADING;
  const blockHeight = CHAPTER_SIZE + 28 + headlineBlock + 36 + factBlock;
  let y = FILM_HEIGHT - MARGIN_BOTTOM - blockHeight;

  const paths: string[] = [];
  y += CHAPTER_SIZE;
  paths.push(`<rect x="${MARGIN_X}" y="${y - CHAPTER_SIZE * 0.72}" width="6" height="${CHAPTER_SIZE * 0.8}" fill="${MAGENTA}"/>`);
  paths.push(`<path d="${pathData(fonts.label, chapterText, MARGIN_X + 22, y, CHAPTER_SIZE, 0.16)}" fill="${MAGENTA}"/>`);
  y += 28;

  for (const line of headline) {
    y += HEADLINE_SIZE * HEADLINE_LEADING;
    paths.push(`<path d="${pathData(fonts.title, line, MARGIN_X, y - HEADLINE_SIZE * 0.22, HEADLINE_SIZE)}" fill="${END_CARD_INK}"/>`);
  }
  y += 36;

  for (const fact of facts) {
    y += FACT_SIZE * FACT_LEADING;
    const baseline = y - FACT_SIZE * 0.4;
    const labelWidth = fonts.mono.getAdvanceWidth(fact.label, FACT_SIZE, { letterSpacing: 0.04 });
    paths.push(`<path d="${pathData(fonts.mono, fact.label, MARGIN_X, baseline, FACT_SIZE, 0.04)}" fill="${MUTED}"/>`);
    paths.push(`<path d="${pathData(fonts.mono, fact.value, MARGIN_X + labelWidth, baseline, FACT_SIZE)}" fill="${END_CARD_INK}"/>`);
  }

  const scrimTop = Math.max(0, FILM_HEIGHT - MARGIN_BOTTOM - blockHeight - 220);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${FILM_WIDTH}" height="${FILM_HEIGHT}">
<defs>
<linearGradient id="v" x1="0" y1="${scrimTop}" x2="0" y2="${FILM_HEIGHT}" gradientUnits="userSpaceOnUse">
<stop offset="0" stop-color="${END_CARD_BACKGROUND}" stop-opacity="0"/>
<stop offset="0.45" stop-color="${END_CARD_BACKGROUND}" stop-opacity="0.62"/>
<stop offset="1" stop-color="${END_CARD_BACKGROUND}" stop-opacity="0.86"/>
</linearGradient>
</defs>
<rect x="0" y="${scrimTop}" width="${FILM_WIDTH}" height="${FILM_HEIGHT - scrimTop}" fill="url(#v)"/>
${paths.join("\n")}
</svg>`;
}

/** Renders one transparent 1080p caption plate per shot. Text is vector-converted so no system fonts are needed. */
export async function renderCaptions(shots: Shot[], dir: string) {
  const [title, label, mono] = await Promise.all([
    loadFont("geist-sans/Geist-SemiBold.ttf"),
    loadFont("geist-sans/Geist-Medium.ttf"),
    loadFont("geist-mono/GeistMono-Regular.ttf"),
  ]);
  const fonts = { title, label, mono };
  return Promise.all(
    shots.map(async (shot) => {
      const file = path.join(dir, `caption-${shot.id}.png`);
      await writeFile(file, await sharp(Buffer.from(captionSvg(shot, fonts))).png().toBuffer());
      return file;
    }),
  );
}
