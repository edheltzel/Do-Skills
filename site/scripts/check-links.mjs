// Checks every same-origin href/src in the built site: the target file must
// exist in dist/, and a #fragment must match an id on the target page.
// Usage: node scripts/check-links.mjs [dist]
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const origin = new URL(process.env.SITE_URL || 'https://doskills.edheltzel.codes').origin;

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(join(dir, d.name)) : d.name.endsWith('.html') ? [join(dir, d.name)] : [],
  );

function fileFor(pathname) {
  const p = join(dist, decodeURIComponent(pathname));
  if (pathname.endsWith('/')) return existsSync(join(p, 'index.html')) ? join(p, 'index.html') : null;
  if (existsSync(p) && statSync(p).isFile()) return p;
  if (existsSync(join(p, 'index.html'))) return join(p, 'index.html');
  return existsSync(`${p}.html`) ? `${p}.html` : null;
}

const idsCache = new Map();
function ids(file) {
  if (!idsCache.has(file)) {
    const html = readFileSync(file, 'utf8');
    idsCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsCache.get(file);
}

const pages = walk(dist);
const broken = [];
let checked = 0;
for (const page of pages) {
  const rel = relative(dist, page).split('\\').join('/');
  const base = new URL(`/${rel.replace(/(^|\/)index\.html$/, '$1')}`, origin);
  const html = readFileSync(page, 'utf8');
  for (const [, attr, raw] of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
    const value = raw.replaceAll('&amp;', '&');
    if (!value || /^(mailto|tel|data|javascript):/i.test(value)) continue;
    const url = new URL(value, base);
    if (url.origin !== origin) continue;
    // Nimbus gives the noindex 404 page a canonical of its own URL, /404/.
    if (rel === '404.html' && url.pathname === '/404/') continue;
    checked += 1;
    const target = fileFor(url.pathname);
    if (!target) {
      broken.push(`${rel}: ${attr}="${raw}" -> ${url.pathname} (missing)`);
    } else if (url.hash.length > 1 && target.endsWith('.html') && !ids(target).has(decodeURIComponent(url.hash.slice(1)))) {
      broken.push(`${rel}: ${attr}="${raw}" -> ${url.pathname}${url.hash} (no such id)`);
    }
  }
}

if (broken.length > 0) {
  console.error(broken.join('\n'));
  console.error(`\n${broken.length} broken of ${checked} same-origin links in ${pages.length} pages.`);
  process.exit(1);
}
console.log(`${checked} same-origin links in ${pages.length} pages: all resolve.`);
