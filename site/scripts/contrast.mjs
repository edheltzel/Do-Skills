import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { chromium } from 'playwright-core';

const lightPalette = {
  '--bg': [246, 245, 241],
  '--s1': [252, 251, 248],
  '--s2': [236, 235, 230],
  '--text': [17, 17, 17],
  '--t2': [74, 74, 74],
  '--t3': [95, 95, 95],
  '--l2': [90, 90, 90],
  '--callout': [44, 44, 44],
  '--btn-bg': [17, 17, 17],
  '--btn-fg': [246, 245, 241],
  '--btn-hv': [0, 0, 0],
  '--acc': [138, 90, 12],
  '--acc2': [74, 51, 16],
  '--mid': [154, 106, 20],
  '--bg-rgb': [246, 245, 241],
  '--s1-rgb': [252, 251, 248],
  '--ink-rgb': [17, 17, 17],
  '--acc-rgb': [138, 90, 12],
  '--acc2-rgb': [74, 51, 16],
  '--hot-rgb': [255, 210, 122],
  '--b1': [0, 0, 0, 0.07],
  '--b2': [0, 0, 0, 0.11],
  '--b3': [0, 0, 0, 0.17],
  '--b4': [0, 0, 0, 0.27],
  '--hi': [255, 255, 255, 0.8],
  '--stripe': [0, 0, 0, 0.03],
};

const root = path.resolve('dist');
await readFile(path.join(root, 'index.html'));
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.join(root, pathname.endsWith('/') ? pathname + 'index.html' : pathname);
    const data = await readFile(file);
    const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
    res.setHeader('content-type', types[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  } catch {
    res.writeHead(404).end('not found');
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const themes = {};
let browser;
try {
  browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  for (const javaScriptEnabled of [true, false]) {
    for (const colorScheme of ['dark', 'light']) {
      const context = await browser.newContext({ javaScriptEnabled, colorScheme });
      try {
        const page = await context.newPage();
        const response = await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: 'load' });
        assert.equal(response.status(), 200);
        const name = colorScheme + (javaScriptEnabled ? '' : '-nojs');
        themes[name] = await page.evaluate((tokens) => {
          const probe = document.createElement('span');
          document.body.append(probe);
          const values = {};
          for (const token of tokens) {
            probe.style.backgroundColor = token.endsWith('-rgb') ? `rgb(var(${token}))` : `var(${token})`;
            values[token] = getComputedStyle(probe).backgroundColor;
          }
          probe.style.boxShadow = 'var(--glow)';
          probe.style.opacity = 'var(--shade-edge)';
          values.glow = getComputedStyle(probe).boxShadow;
          values.shadeEdge = getComputedStyle(probe).opacity;
          values.background = getComputedStyle(document.documentElement).backgroundColor;
          values.foreground = getComputedStyle(document.body).color;
          values.colorScheme = getComputedStyle(document.documentElement).colorScheme;
          probe.remove();
          return values;
        }, Object.keys(lightPalette));
      } finally {
        await context.close();
      }
    }
  }
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}

function parse(value) {
  const parts = value.match(/[\d.]+/g);
  if (!parts) throw new Error('cannot parse color ' + value);
  const n = parts.map(Number);
  return { c: n.slice(0, 3), a: n.length > 3 ? n[3] : 1 };
}

function channels(vars, name) {
  return parse(vars[name]).c;
}

const lin = (v) => {
  const s = v / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const lum = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
const contrast = (a, b) => {
  const x = lum(a);
  const y = lum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
const over = (fg, bg, a) => fg.map((v, i) => v * a + bg[i] * (1 - a));

for (const name of ['light', 'light-nojs']) {
  for (const [token, expected] of Object.entries(lightPalette)) {
    assert.deepEqual(parse(themes[name][token]), { c: expected.slice(0, 3), a: expected[3] ?? 1 }, `${name} ${token}: preserved landing palette`);
  }
  assert.equal(themes[name].glow, 'none', `${name} glow`);
  assert.equal(Number(themes[name].shadeEdge), 0.35, `${name} shade edge`);
  assert.deepEqual(parse(themes[name].background).c, [246, 245, 241], `${name} page background`);
  assert.deepEqual(parse(themes[name].foreground).c, [17, 17, 17], `${name} page text`);
  assert.equal(themes[name].colorScheme, 'light');
}
for (const scheme of ['light', 'dark']) {
  for (const token of Object.keys(lightPalette)) {
    assert.deepEqual(parse(themes[scheme][token]), parse(themes[`${scheme}-nojs`][token]), `${scheme} JavaScript/no-JavaScript ${token}`);
  }
}

const textOn = ['--bg', '--s1', '--s2'];
const textFg = ['--text', '--t2', '--t3', '--l2', '--acc', '--acc2'];

let failed = false;

for (const name of ['dark', 'light', 'dark-nojs', 'light-nojs']) {
  const v = themes[name];
  const bg = channels(v, '--bg');
  const rows = [];
  const add = (kind, label, ratio) => rows.push({ kind, label, ratio });

  for (const fg of textFg) {
    for (const surface of textOn) add('text', `${fg} on ${surface}`, contrast(channels(v, fg), channels(v, surface)));
  }
  add('text', '--btn-fg on --btn-bg', contrast(channels(v, '--btn-fg'), channels(v, '--btn-bg')));

  const note = over(channels(v, '--acc-rgb'), bg, 0.07);
  const tip = over(channels(v, '--acc2-rgb'), bg, 0.08);
  add('text', '--callout on note tint', contrast(channels(v, '--callout'), note));
  add('text', '--callout on tip tint', contrast(channels(v, '--callout'), tip));
  add('text', '--acc on note tint', contrast(channels(v, '--acc'), note));
  add('text', '--acc2 on tip tint', contrast(channels(v, '--acc2'), tip));

  for (const fg of ['--acc', '--acc2', '--mid']) {
    for (const surface of textOn) add('line', `${fg} on ${surface}`, contrast(channels(v, fg), channels(v, surface)));
  }
  add('line', 'note border on its tint', contrast(channels(v, '--acc'), note));
  add('line', 'tip border on its tint', contrast(channels(v, '--acc2'), tip));

  const hair = ['--b1', '--b2', '--b3', '--b4'].map((token) => {
    const c = parse(v[token]);
    return `${token} ${contrast(over(c.c, bg, c.a), bg).toFixed(2)}`;
  });

  console.log(name);
  for (const row of rows) {
    const min = row.kind === 'text' ? 4.5 : 3;
    const ok = row.ratio >= min;
    if (!ok) failed = true;
    console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${row.kind.padEnd(4)} ${row.ratio.toFixed(2).padStart(5)}  ${row.label}`);
  }
  console.log('  hairlines (decorative, not gated): ' + hair.join(', '));

  const texts = rows.filter((r) => r.kind === 'text');
  const lines = rows.filter((r) => r.kind === 'line');
  const lowText = texts.reduce((a, b) => (b.ratio < a.ratio ? b : a));
  const lowLine = lines.reduce((a, b) => (b.ratio < a.ratio ? b : a));
  console.log(`  lowest text ${lowText.ratio.toFixed(2)} (${lowText.label})`);
  console.log(`  lowest line ${lowLine.ratio.toFixed(2)} (${lowLine.label})\n`);
}

console.log(failed ? 'FAIL' : 'PASS');
if (failed) process.exit(1);
