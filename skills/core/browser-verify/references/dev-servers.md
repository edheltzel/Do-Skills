# Dev Servers — detection and start recipes

Use this only when the target needs a local server that is not already running. `browser-verify` never edits source; starting a documented dev server is the one process it may spawn. Prefer a server the user already has running — check the resolved port first (see [changed-file-routes.md](changed-file-routes.md)).

## Detect the framework

Read the manifest and config files, not prose. The presence of a config file or a manifest dependency identifies the framework:

| Framework | Detect by | Default port |
| --- | --- | --- |
| Next.js | `next.config.*`, `next` in `package.json` | 3000 |
| Nuxt | `nuxt.config.*`, `nuxt` dep | 3000 |
| Remix (classic) | `remix.config.*`, `@remix-run/*` dep | 3000 |
| Vite (React/Vue/Svelte SPA) | `vite.config.*`, `vite` dep | 5173 |
| SvelteKit | `svelte.config.*` + `@sveltejs/kit` | 5173 |
| Astro | `astro.config.*`, `astro` dep | 4321 |
| Rails | `config/puma.rb`, `bin/dev`, `Gemfile` with `rails` | 3000 |
| Procfile-based | `Procfile.dev` | 3000 |

When a repo has more than one (a Rails + Vite app), the `Procfile.dev` / `bin/dev` entry usually starts them together — prefer it.

## Start recipes

Use the project's own documented command when one exists (a README, `bin/dev`, or an `AGENTS.md`/`CLAUDE.md` run instruction) — it wins over these defaults. Otherwise:

| Framework | Start command |
| --- | --- |
| Next.js | `npm run dev` (or `pnpm dev` / `yarn dev` / `bun dev` per the lockfile) |
| Nuxt | `npm run dev` |
| Remix | `npm run dev` |
| Vite / SvelteKit / Astro | `npm run dev` |
| Rails (with a Procfile) | `bin/dev` |
| Rails (plain) | `bin/rails server -p <port>` |
| Procfile-based | `foreman start -f Procfile.dev` or the documented equivalent |

Resolve the package manager from the lockfile: `pnpm-lock.yaml` -> pnpm, `yarn.lock` -> yarn, `bun.lockb` -> bun, otherwise npm.

When a manual run finds no server on the resolved port, do not silently start one and guess — tell the user the command to run and the port, then stop. Start the server yourself only in an unattended/automated context where that is the agreed contract.

Imported and adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT) — the ce-polish dev-server detection and start recipes.
