#!/usr/bin/env node
/**
 * Prints /cv to public/assets/CuiLina-CV.pdf.
 *
 * The CV page is drawn from the same content files as the site, so the PDF
 * can never drift from what the site says. Chrome's printToPDF gives a real
 * A4 document with the page's print styles applied (site chrome hidden).
 *
 * Needs the preview server running:
 *
 *   npm run build && npm run preview &
 *   node scripts/make-cv.mjs
 */

import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'assets', 'CuiLina-CV.pdf');
const URL_TO_PRINT = process.env.CV_URL ?? 'http://localhost:4174/cv';

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const chromePath = CHROME_CANDIDATES.find((p) => p && existsSync(p));
if (!chromePath) {
  console.log('[cv] Chrome not found — skipping.');
  process.exit(0);
}

const PORT = 9900 + Math.floor(Math.random() * 80);
const profile = mkdtempSync(join(tmpdir(), 'cv-'));
const chrome = spawn(
  chromePath,
  [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    '--window-size=1440,900',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank',
  ],
  { stdio: 'ignore' },
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let target;
  for (let i = 0; i < 40 && !target; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      target = list.find((t) => t.type === 'page');
    } catch {
      /* not up */
    }
    if (!target) await sleep(250);
  }
  if (!target) throw new Error('Chrome did not expose a debugging target');

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = rej;
  });

  let id = 0;
  const pending = new Map();
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m);
      pending.delete(m.id);
    }
  };
  const send = (method, params = {}) =>
    new Promise((res) => {
      const myId = ++id;
      pending.set(myId, res);
      ws.send(JSON.stringify({ id: myId, method, params }));
    });

  await send('Page.enable');
  await send('Page.navigate', { url: URL_TO_PRINT });
  await sleep(3500);

  const pdf = await send('Page.printToPDF', {
    printBackground: true,
    paperWidth: 8.27,
    paperHeight: 11.69,
    marginTop: 0.5,
    marginBottom: 0.5,
    marginLeft: 0.5,
    marginRight: 0.5,
  });
  if (!pdf.result?.data) throw new Error('printToPDF returned no data');
  writeFileSync(OUT, Buffer.from(pdf.result.data, 'base64'));
  console.log(`[cv] wrote ${OUT}`);
} catch (e) {
  console.error('[cv] ' + e.message);
  console.error('[cv] is the preview server running at ' + URL_TO_PRINT + '?');
  process.exitCode = 1;
} finally {
  try {
    chrome.kill();
  } catch {
    /* gone */
  }
  try {
    rmSync(profile, { recursive: true, force: true });
  } catch {
    /* best effort */
  }
}
