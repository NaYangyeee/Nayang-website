#!/usr/bin/env node
/**
 * Emits dist/sitemap.xml and dist/robots.txt after the Vite build.
 *
 * This is a single-page site, so the sitemap has exactly one entry — the
 * point is that crawlers are told the page exists and where it lives, not
 * that there are many URLs to enumerate. SITE_URL is read out of the
 * content file rather than hardcoded, so changing the domain in one place
 * cannot leave the sitemap pointing at the old one.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

const siteSource = await readFile(join(ROOT, 'src', 'content', 'site.ts'), 'utf8');
const match = siteSource.match(/SITE_URL\s*=\s*'([^']+)'/);
if (!match) {
  console.error('[seo] SITE_URL not found in src/content/site.ts');
  process.exit(1);
}
const SITE_URL = process.env.SITE_URL ?? match[1];

async function main() {
  if (!existsSync(DIST)) {
    console.error('[seo] dist/ not found — run `vite build` first.');
    process.exit(1);
  }

  const lastmod = new Date().toISOString().slice(0, 10);

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    `    <loc>${SITE_URL}/</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    '    <changefreq>monthly</changefreq>',
    '    <priority>1.0</priority>',
    '  </url>',
    '</urlset>',
    '',
  ].join('\n');

  const robots = ['User-agent: *', 'Allow: /', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join(
    '\n',
  );

  await writeFile(join(DIST, 'sitemap.xml'), xml, 'utf8');
  await writeFile(join(DIST, 'robots.txt'), robots, 'utf8');
  console.log(`[seo] sitemap.xml + robots.txt written for ${SITE_URL}`);
}

main().catch((error) => {
  console.error('[seo] failed:', error);
  process.exit(1);
});
