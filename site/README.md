# Do Skills site

Nimbus (Astro) build that serves the landing page at `/` and the public skill
docs in the same static output, targeting https://doskills.edheltzel.codes.
Canonical human-facing pages stay in [`docs/`](../docs/) at the repo root;
this package reads `docs/global/**` and `docs/project/**` at build time and
keeps no second copy. The landing page's skill counts come from `skills/`.

`docs/plans/`, `docs/README.md`, and other agent-only material are not
published.

`/docs/` indexes the public pages at `/<scope>/<group>/<slug>/`.
HTML links to scope and group directories under `docs/{global,project}` lead
to matching docs hub sections; links to other repository directories lead to GitHub.
Nimbus's Markdown downloads and `llms-full.txt` keep directory links as authored.

## Run

Needs Node 22.23.4 or later (`.nvmrc` pins it). That is the highest minimum
any locked package declares (`@astrojs/prism` needs `>=22.23.4`).

Run these commands from `site/`:

```bash
npm ci
npm run dev
```

`npm run build` writes the static site to `dist/`. `npm run preview` serves
that build. Set `SITE_URL` for a production origin; the default is
`https://doskills.edheltzel.codes`.

The docs are read from the checkout's `HEAD` commit. A checkout without a
resolvable commit fails the build. Commit a docs edit before previewing it locally.

## Checks

```bash
npm run typecheck
npm run build
npm run check:links   # every same-origin link and #fragment in dist/
npm run contrast      # rendered theme contrast, needs Chrome
npm run flash         # theme flash on the landing page, needs Chrome
npm run install-box   # install commands at 390px, needs Chrome
```

`contrast`, `flash`, and `install-box` read `CHROME_PATH` (default `/usr/bin/google-chrome`).
CI runs all of them in `.github/workflows/site.yml`.

## Deploy

Cloudflare Pages, Git integration on this repo:

| Setting | Value |
| --- | --- |
| Root directory | `site` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Production branch | `master` |
| `NODE_VERSION` (production and preview) | `22.23.4` |
| `SITE_URL` (production) | `https://doskills.edheltzel.codes` |

The domain cutover and rollback are in the
[cutover plan](../docs/plans/2026-11-06-doskills-pages-cutover.md).

Nimbus is pre-1.0. `@cloudflare/nimbus-docs` is pinned.
