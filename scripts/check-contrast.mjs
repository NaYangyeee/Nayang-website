#!/usr/bin/env node
/**
 * Verifies the palette's contrast ratios against WCAG.
 *
 * "It looks fine on my monitor" is not an acceptable check for a site whose
 * entire brief was a specific palette. Every text/background pairing the
 * design actually uses is asserted here, and the thresholds are deliberately
 * stricter than the minimum:
 *
 *   - body and primary text must clear 7:1 (WCAG AAA for normal text);
 *   - secondary text and large display type must clear 4.5:1 (AA);
 *   - decorative-only pairings must clear 3:1 (AA for non-text/large).
 *
 * Values are read out of src/index.css so the check cannot drift from the
 * tokens it is meant to verify.
 *
 *   npm run check:contrast
 */

import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const n = hex.replace('#', '');
  const full = n.length === 3 ? [...n].map((c) => c + c).join('') : n;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Pull `--color-x: #hex;` out of a CSS block. */
function tokensIn(css, blockPattern) {
  const block = css.match(blockPattern)?.[0] ?? '';
  const out = {};
  for (const m of block.matchAll(/--color-([\w-]+):\s*(#[0-9a-fA-F]{3,8})/g)) out[m[1]] = m[2];
  return out;
}

const css = await readFile(join(ROOT, 'src', 'index.css'), 'utf8');
const light = tokensIn(css, /@theme\s*\{[\s\S]*?\n\}/);
const dark = tokensIn(css, /\.tone-ink\s*\{[\s\S]*?\n\}/);
const courtLight = tokensIn(css, /\.tone-court-light\s*\{[\s\S]*?\n\}/);

// [tone, fg token, bg token, min ratio, what it is]
const CHECKS = [
  ['light', 'ink', 'surface', 7, 'body text on page'],
  ['light', 'ink', 'surface-2', 7, 'body text on grey band'],
  ['light', 'ink', 'surface-3', 7, 'body text on card'],
  ['light', 'ink-2', 'surface', 4.5, 'secondary text on page'],
  ['light', 'ink-2', 'surface-2', 4.5, 'secondary text on band'],
  ['light', 'ink-2', 'surface-3', 4.5, 'secondary text on card'],
  ['light', 'ink-3', 'surface', 3, 'tertiary/label on page'],
  ['light', 'sakura-ink', 'surface', 4.5, 'sakura link text on page'],
  ['light', 'sakura-ink', 'surface-2', 4.5, 'sakura link text on band'],
  ['light', 'sakura-deep', 'sakura-soft', 4.5, 'sakura text on sakura tint'],
  ['light', 'sky-ink', 'surface', 4.5, 'measured number on page'],
  ['light', 'sky-ink', 'sky-soft', 4.5, 'sky text on sky tint'],
  ['light', 'line-hard', 'surface', 3, 'black edge on page'],

  ['dark', 'ink', 'surface', 7, 'body text on ink band'],
  ['dark', 'ink-2', 'surface', 4.5, 'secondary text on ink band'],
  ['dark', 'ink-3', 'surface', 3, 'tertiary on ink band'],
  ['dark', 'sakura-ink', 'surface', 4.5, 'sakura text on ink band'],
  ['dark', 'sakura-ink', 'surface-2', 4.5, 'sakura text on ink card'],
  ['dark', 'sky-ink', 'sky-soft', 4.5, 'sky text on ink sky tint'],

  ['court', 'ink', 'surface', 7, 'body text on court ground'],
  ['court', 'ink', 'surface-2', 7, 'body text on court band'],
  ['court', 'ink', 'surface-3', 7, 'body text on court card'],
  ['court', 'ink-2', 'surface', 4.5, 'secondary text on court'],
  ['court', 'ink-3', 'surface', 3, 'tertiary on court'],
  ['court', 'sakura-ink', 'surface', 4.5, 'court green text on court'],
  ['court', 'sakura-deep', 'sakura-soft', 4.5, 'court green on court tint'],
  ['court', 'line-hard', 'surface', 3, 'dark grey edge on court'],
];

// Pairings not expressible as two tokens, asserted directly.
const EXTRA = [
  // Sakura fill carries near-black text on the CTA and header contact button.
  ['light', light.ink, light.sakura, 4.5, 'ink text on sakura fill'],
  // Near-black fill carries light text on the primary hero button.
  ['light', light['ink-invert'], light.ink, 4.5, 'inverted text on ink fill'],
];

let failed = 0;
const rows = [];

for (const [tone, fg, bg, min, what] of CHECKS) {
  const set = tone === 'light' ? light : tone === 'court' ? courtLight : dark;
  const fgHex = set[fg];
  const bgHex = set[bg];
  if (!fgHex || !bgHex) {
    rows.push([tone, what, '—', min, 'TOKEN MISSING']);
    failed++;
    continue;
  }
  const r = ratio(fgHex, bgHex);
  const ok = r >= min;
  if (!ok) failed++;
  rows.push([tone, what, r.toFixed(2), min, ok ? 'ok' : 'FAIL']);
}

for (const [tone, fgHex, bgHex, min, what] of EXTRA) {
  const r = ratio(fgHex, bgHex);
  const ok = r >= min;
  if (!ok) failed++;
  rows.push([tone, what, r.toFixed(2), min, ok ? 'ok' : 'FAIL']);
}

const w = Math.max(...rows.map((r) => r[1].length));
for (const [tone, what, got, min, verdict] of rows) {
  console.log(
    `${tone.padEnd(5)} ${what.padEnd(w)}  ${String(got).padStart(6)} : 1  (min ${min})  ${verdict}`,
  );
}

if (failed) {
  console.error(`\n[contrast] ${failed} pairing(s) below target.`);
  process.exit(1);
}
console.log('\n[contrast] OK — every pairing meets its target.');
