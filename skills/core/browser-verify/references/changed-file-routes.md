# Changed Files -> Routes and Port

When the target is "verify what this branch/PR changed" rather than a single URL, derive the routes to test from the diff, and resolve the dev-server port.

## Scope the diff

```bash
gh pr view <number> --json files -q '.files[].path'   # a PR
git diff --name-only main...HEAD                        # current branch
git diff --name-only main...<branch>                    # a named branch
```

## Map changed files to routes

Map each changed file to the route(s) that render it, then build the list of URLs to open. This table is a starting point, not an exhaustive rule — apply judgment for the project's actual layout:

| File pattern | Route(s) |
| --- | --- |
| `app/views/users/*` | `/users`, `/users/:id`, `/users/new` |
| `app/controllers/settings_controller.rb` | `/settings` |
| `app/javascript/controllers/*_controller.js` | pages using that Stimulus controller |
| `app/components/*_component.rb` | pages rendering that component |
| `app/views/layouts/*` | all pages (test the homepage at minimum) |
| `app/assets/stylesheets/*` | key pages, for visual regression |
| `src/app/*` (Next.js app router) | the corresponding route |
| `src/pages/*` (Next.js pages router) | the corresponding route |
| `src/components/*` | pages using those components |
| shared layout / theme / design-token files | the homepage plus one representative page per major template |

A change to a widely-shared file (layout, token, root component) fans out — test a representative set, not every page.

## Resolve the port

Run `scripts/resolve-port.sh` (from this skill's directory) — it probes, first hit wins: an explicit `--port`, framework config files (`next.config.*`, `vite.config.*`, `nuxt.config.*`, `astro.config.*` — numeric literals only), Rails `config/puma.rb`, `Procfile.dev`, `docker-compose.yml`, `package.json` dev/start scripts, `.env*` files, then the framework default. It deliberately does **not** grep `AGENTS.md`/`CLAUDE.md` for a port (prose mentions are false-positive-prone) — but you may honor a dev-server port stated in your in-context project instructions by passing `--port`.

```bash
bash "<skill-dir>/scripts/resolve-port.sh"            # auto-detect
bash "<skill-dir>/scripts/resolve-port.sh" --port 5000  # explicit override
```

Then confirm the server is up before opening the browser:

```bash
lsof -i ":${PORT}" -sTCP:LISTEN -t >/dev/null 2>&1 && echo "up on ${PORT}" || echo "not running on ${PORT}"
```

If it is not running, see [dev-servers.md](dev-servers.md) for start recipes.

Imported and adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT) — the ce-test-browser route mapping and port cascade.
