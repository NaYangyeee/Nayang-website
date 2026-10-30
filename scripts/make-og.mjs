#!/usr/bin/env node
/**
 * Generates public/og.png — the social share card.
 *
 * Every link shared in WeChat, LinkedIn or Telegram renders this image as
 * the preview. The design is the site's own vocabulary: light grey ground,
 * black hairline frame, sakura rule, Playfair name — recognisably the same
 * document a click later. Rendered in headless Chrome so the fonts are the
 * real ones.
 *
 *   node scripts/make-og.mjs
 */

import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'og.png');

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const chromePath = CHROME_CANDIDATES.find((p) => p && existsSync(p));
if (!chromePath) {
  console.log('[og] Chrome not found — skipping.');
  process.exit(0);
}

const W = 1200;
const H = 630;

const page = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${W}px; height: ${H}px; overflow: hidden;
    background: #f4f4f2; color: #2b2e2a;
    font-family: Georgia, 'Times New Roman', 'Microsoft YaHei', serif;
    display: flex; flex-direction: column; justify-content: space-between;
    border: 14px solid #2b2e2a;
    padding: 56px 64px 44px;
  }
  .top { display: flex; align-items: center; gap: 16px; }
  .rule { width: 56px; height: 3px; background: #e4849f; }
  .tag {
    font-family: 'Courier New', monospace; font-size: 15px;
    letter-spacing: 0.22em; text-transform: uppercase; color: #b03a60;
  }
  h1 { font-size: 76px; line-height: 1.04; letter-spacing: -0.01em; }
  .role { font-size: 27px; color: #b03a60; margin-top: 18px; }
  .foot { display: flex; justify-content: space-between; align-items: flex-end; }
  .glyph { display: flex; gap: 10px; }
  .glyph svg { display: block; }
  .url { font-family: 'Courier New', monospace; font-size: 15px; color: #8a8f86; letter-spacing: 0.08em; }
</style></head><body>
  <div class="top"><span class="rule"></span><span class="tag">LLM Application Engineer · Agent &amp; RAG</span></div>
  <div>
    <h1>崔力娜<br/>Lina Cui</h1>
    <p class="role">让 Agent 在真实业务里可靠工作</p>
  </div>
  <div class="foot">
    <div class="glyph">
      <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#b03a60" stroke-width="2.5">
        <path d="M24 6c7 5 11 11 11 18 0 3-1 5-3 6l-8-8-8 8c-2-1-3-3-3-6 0-7 4-13 11-18Z"/>
        <path d="M24 30l-8 8M24 30l8 8" opacity="0.6"/>
      </svg>
      <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#b03a60" stroke-width="2.5">
        <path d="M10 38V14a2 2 0 0 1 2-2h6v26h-6a2 2 0 0 0-2 2Z" fill="#b03a60" fill-opacity="0.15"/>
        <path d="M20 12h8v26h-8" fill="#b03a60" fill-opacity="0.12"/>
        <path d="M30 12h6a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2h-6V12Z" fill="#b03a60" fill-opacity="0.15"/>
      </svg>
    </div>
    <span class="url">nayang-website.pages.dev</span>
  </div>
</body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'og-'));
const html = join(dir, 'card.html');
writeFileSync(html, page);

const PORT = 9700 + Math.floor(Math.random() * 200);
const profile = mkdtempSync(join(tmpdir(), 'og-profile-'));
const chrome = spawn(
  chromePath,
  [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    `--window-size=${W},${H}`,
    '--hide-scrollbars',
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
  await send('Emulation.setDeviceMetricsOverride', {
    width: W,
    height: H,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send('Page.navigate', { url: `file:///${html.replace(/\\/g, '/')}` });
  await sleep(1500);

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  if (!shot.result?.data) throw new Error('screenshot failed');
  writeFileSync(OUT, Buffer.from(shot.result.data, 'base64'));
  console.log(`[og] wrote ${OUT} (${W}x${H})`);
} catch (e) {
  console.error('[og] ' + e.message);
  process.exitCode = 1;
} finally {
  try {
    chrome.kill();
  } catch {
    /* gone */
  }
  for (const d of [dir, profile]) {
    try {
      rmSync(d, { recursive: true, force: true });
    } catch {
      /* best effort */
    }
  }
}
