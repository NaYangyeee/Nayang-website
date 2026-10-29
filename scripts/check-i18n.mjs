#!/usr/bin/env node
/**
 * Verifies that every localised object carries both languages.
 *
 * The `L` type requires `zh` and `en`, so TypeScript already guarantees both
 * at the type level — this exists for the same reason the type exists: a
 * guarantee is only as good as the thing enforcing it, and this check also
 * runs over data-driven content that a refactor might accidentally render
 * optional. It counts structurally: every `zh:` key inside a localised
 * object is one string, and the matching `en:` either exists or does not.
 *
 *   npm run check:i18n
 *   npm run check:i18n -- --missing     # list the untranslated strings
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, dirname, resolve, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SHOW_MISSING = process.argv.includes('--missing');

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (['.ts', '.tsx'].includes(extname(entry.name))) out.push(full);
  }
  return out;
}

const files = [];
const missing = new Map();
let total = 0;
let covered = 0;

for (const file of await walk(join(ROOT, 'src'))) {
  const source = await readFile(file, 'utf8');
  const fileTotal = (source.match(/\ben:\s/g) ?? []).length;
  if (!fileTotal) continue;
  total += fileTotal;

  const fileMissing = [];
  // For each `en:` string, check the matching locale on a nearby line.
  // Localised objects keep one language per line — but whether zh or en comes
  // first varies by file, so the window looks both directions.
  const lines = source.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (!/\ben:\s/.test(lines[i])) continue;
    const key = lines[i].match(/\ben:\s*'([^']*)'/)?.[1] ?? `(line ${i + 1})`;
    const window = lines.slice(Math.max(0, i - 2), i + 3).join('\n');
    if (!/\bzh:\s/.test(window)) fileMissing.push(key);
  }
  covered += fileTotal - fileMissing.length;
  if (fileMissing.length) missing.set(relative(ROOT, file), fileMissing);
  files.push([relative(ROOT, file), fileTotal - fileMissing.length, fileTotal]);
}

const pct = total ? Math.round((covered / total) * 100) : 100;

for (const [file, ok, all] of files.sort((a, b) => a[2] - b[2])) {
  const bar = '█'.repeat(Math.round((ok / all) * 20)).padEnd(20, '·');
  console.log(`  ${file.padEnd(58)} ${bar} ${ok}/${all}`);
}
console.log(`\n  TOTAL: ${covered}/${total} strings (${pct}%)`);

if (missing.size) {
  console.error('\nMissing zh: counterparts:\n');
  for (const [file, list] of missing) {
    for (const s of list) console.error(`  ${file}  ${s}`);
  }
  process.exit(1);
}
console.log('\n[i18n] OK — every localised string has both languages.');
