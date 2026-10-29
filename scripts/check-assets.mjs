#!/usr/bin/env node
/**
 * Verifies that every asset path referenced from src/ exists under public/.
 *
 * A missing image is invisible in development (the browser shows a broken
 * image you may never scroll to) and embarrassing in production. This turns
 * it into a failed build. Runs automatically as part of `npm run build`.
 *
 * Paths are parsed out of the source as string literals starting with `/`
 * and ending in a known asset extension, so this stays a plain Node script
 * with no TypeScript build step of its own. Favicon and any other file
 * referenced from index.html are checked separately.
 */

import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const SRC = join(ROOT, 'src');

const EXT = /\.(avif|webp|png|jpe?g|svg|mp4|webm|pdf|json|txt|woff2?)$/i;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (['.ts', '.tsx'].includes(extname(entry.name))) out.push(full);
  }
  return out;
}

const missing = [];
const seen = new Set();

for (const file of await walk(SRC)) {
  const source = await readFile(file, 'utf8');
  // Strip comments: docs cite example paths that deliberately do not exist.
  const code = source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((line) => !line.trim().startsWith('//'))
    .join('\n');

  for (const m of code.matchAll(/['"](\/assets?\/[^'"\s()]+\.(?:avif|webp|png|jpe?g|svg|mp4|webm|pdf))['"]/gi)) {
    const path = m[1];
    if (seen.has(path)) continue;
    seen.add(path);
    if (!existsSync(join(PUBLIC, path))) missing.push(`${file}  ${path}`);
  }
}

// Files referenced from index.html (favicon and the like).
const html = await readFile(join(ROOT, 'index.html'), 'utf8');
for (const m of html.matchAll(/(?:href|src)="(\/[^"#]+)"/g)) {
  const path = m[1];
  if (!EXT.test(path)) continue;
  if (!existsSync(join(PUBLIC, path))) missing.push(`index.html  ${path}`);
}

if (missing.length) {
  console.error(`[assets] ${missing.length} referenced asset(s) missing from public/:\n`);
  for (const line of missing) console.error(`  ${line}`);
  process.exit(1);
}
console.log(`[assets] OK — ${seen.size} referenced asset(s), all present.`);
