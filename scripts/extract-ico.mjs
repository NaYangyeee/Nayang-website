#!/usr/bin/env node
/**
 * Extracts the largest PNG frame from an .ico file.
 *
 * Modern favicons are ICO containers whose frames are PNG-encoded, and the
 * frames come in a mix of bit depths. PowerShell's System.Drawing chokes on
 * some of them (ArgumentOutOfRangeException on ToBitmap); this parser reads
 * the directory and cuts the biggest PNG blob out raw, which never decodes
 * anything.
 *
 *   node scripts/extract-ico.mjs in.ico out.png
 */

import { readFile, writeFile } from 'node:fs/promises';

const [, , src, dst] = process.argv;
if (!src || !dst) {
  console.error('usage: node extract-ico.mjs in.ico out.png');
  process.exit(1);
}

const buf = await readFile(src);
const count = buf.readUInt16LE(4);
let best = null;

for (let i = 0; i < count; i++) {
  const entry = 6 + i * 16;
  const width = buf[entry] || 256;
  const height = buf[entry + 1] || 256;
  const size = buf.readUInt32LE(entry + 8);
  const offset = buf.readUInt32LE(entry + 12);
  const chunk = buf.subarray(offset, offset + size);
  // PNG-encoded frame?
  const isPng = chunk.length >= 8 && chunk.readUInt32BE(0) === 0x89504e47;
  if (!isPng) continue;
  if (!best || width * height > best.w * best.h) {
    best = { w: width, h: height, chunk };
  }
}

if (!best) {
  console.error('no PNG frame found in', src);
  process.exit(1);
}

await writeFile(dst, best.chunk);
console.log(`extracted ${best.w}x${best.h} PNG -> ${dst}`);
