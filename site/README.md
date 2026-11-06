# Do Skills site

Nimbus (Astro) build that serves the landing page at `/` and the public skill
docs in the same static output, live at https://doskills.edheltzel.codes.
Canonical human-facing pages stay in [`docs/`](../docs/) at the repo root;
this package reads `docs/global/**` and `docs/project/**` at build time and
keeps no second copy. The landing page's skill counts come from `skills/`.

`docs/plans/`, `docs/README.md`, and other agent-only material are not
published.

## Run

Needs Node 22.12 or later (`.nvmrc` pins 22.12.0).

```bash
npm ci
npm run dev
```

`npm run build` writes the static site to `dist/`. `npm run preview` serves
that build. Set `SITE_URL` for a production origin; the default is
`https://doskills.edheltzel.codes`.

The docs are read from the commit in `DOCS_REF`, else the build host's commit
(`CF_PAGES_COMMIT_SHA`, `GITHUB_SHA`), else local `HEAD`. Commit a docs edit
before previewing it locally.

## Checks

```bash
npm run typecheck
npm run build
npm run check:links   # every same-origin link and #fragment in dist/
npm run contrast      # theme token contrast
npm run flash         # theme flash on the landing page, needs Chrome
npm run install-box   # install commands at 390px, needs Chrome
```

`flash` and `install-box` read `CHROME_PATH` (default `/usr/bin/google-chrome`).
CI runs all of them in `.github/workflows/site.yml`.

## Deploy

Cloudflare Pages, Git integration on this repo:

| Setting | Value |
| --- | --- |
| Root directory | `site` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Production branch | `master` |
| `NODE_VERSION` | `22.12.0` |
| `SITE_URL` (production) | `https://doskills.edheltzel.codes` |

Nimbus is pre-1.0. `@cloudflare/nimbus-docs` is pinned.
