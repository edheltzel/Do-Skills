# Do Skills site

Nimbus (Astro) build that serves the landing page at `/` and the public skill
docs in the same static output. Canonical human-facing pages stay in
[`docs/`](../docs/) at the repo root; this package reads them at build time
and does not keep a second copy.

`docs/plans/` and other agent-only material are not published.

## Run

Needs Node 22.12 or later.

```bash
npm ci
npm run dev
```

`npm run build` writes the static site to `dist/`. `npm run preview` serves
that build. Set `SITE_URL` for a production origin; the default is
`https://doskills.edheltzel.codes`.

Nimbus is pre-1.0. `@cloudflare/nimbus-docs` is pinned.
