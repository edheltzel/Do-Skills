# This Nimbus docs site

> `CLAUDE.md` delegates here. Keep project instructions canonical in this file.

Astro-based docs plus a custom landing page at `src/pages/index.astro` (amber B, ported from doskills-site). Skill pages are loaded from the repo-root `docs/{global,project}/**/*.md` tree — do not duplicate them under `src/content/docs/`. Leave `docs/plans/` unpublished.

The `nimbus-docs` package handles content schemas, sidebar/TOC, MDX→markdown, build hooks, and the `nimbus-docs` CLI. Install dependencies first, then run it as `npx @cloudflare/nimbus-docs <command>`: npx uses the project's installed version. Before an install, npx fetches the latest release instead, which may differ from the site's version and give different results. The scoped name keeps npx from fetching the unrelated `nimbus-docs` package. Everything in `src/` is yours to edit.

## File layout

```
astro.config.ts              # imports nimbus + defineNimbusConfig
nimbus.json                  # records the last reviewed Nimbus package version
src/
├── components/              # AgentDirective, Header, Logo (drawn from logo.ts) + ui/<slug>/
├── content.config.ts        # registers docsCollection()
├── layouts/                 # BaseLayout (NimbusHead), DocsLayout (sidebar/TOC/breadcrumbs)
├── lib/cn.ts                # Tailwind className merger
├── pages/
│   ├── [...slug].astro
│   ├── [...slug]/index.md.ts   # Markdown version of every page, all collections
│   ├── [...slug]/index.mdx.ts  # authored source of every page, all collections
│   ├── [...section]/llms.txt.ts  # per-section llms.txt, nested sections included
│   ├── 404.astro
│   ├── llms.txt.ts
│   ├── llms-full.txt.ts
│   ├── og/
│   │   ├── _card.ts             # per-page card renderer (underscore = not a route)
│   │   ├── _fonts/              # the card's fonts
│   │   └── [...slug].ts         # per-page OG cards
│   └── robots.txt.ts
└── styles/                  # globals.css, prose.css
```

The site-level OG card is `public/og.png`. Deployment uses Cloudflare Pages
Git integration; see [README.md](./README.md#deploy).

## Writing docs

Follow the repository's [writing guide](../.agents/writing-docs.md), including
its H1 and repo-relative link rules. Nimbus infers a missing frontmatter
`title` from the first heading; the site hides that body H1 in
`src/styles/prose.css` because the layout renders the title.

Rules:

- **Icons use Nimbus's `Icon` + Phosphor.** `<Icon name="ph:<glyph>" class="w-4 h-4" />` from `@cloudflare/nimbus-docs/components/Icon.astro`. Glyphs: [phosphoricons.com](https://phosphoricons.com).
- **Don't remove `<AgentDirective />` from `BaseLayout.astro`.** It points agents at `/llms.txt`.

## Adding things

| Goal | Action |
|---|---|
| New skill docs page | Follow the repository's [writing guide](../.agents/writing-docs.md). |
| UI from registry | `npx @cloudflare/nimbus-docs add <slug>`. |
| Feature recipe | `npx @cloudflare/nimbus-docs add <feature-slug> --print`. Prints the recipe for you to follow; it changes no files itself. |
| Check it builds | `npx @cloudflare/nimbus-docs check` — build-free preflight (env + structure + authoring + types). `--json` for an agent loop, `--fix` to repair what's safe. |
| Custom page route | Add a file under `src/pages/`. |
| Custom OG style | Edit `src/pages/og/_card.ts`. The card draws the logo from `src/components/logo.ts`, the same drawing as the header. |
| Check for updates | `npx @cloudflare/nimbus-docs outdated` — starter files behind their tag + registry components behind. |
| Upgrade Nimbus | Update the package, then run `npx @cloudflare/nimbus-docs migrate --dry-run --diff`. Review every change and required manual step before applying. |
| Upgrade a starter file | `npx @cloudflare/nimbus-docs diff <file>` to review, `diff --apply <file>` to pull a clean upstream change. |
| Upgrade a registry component | `npx @cloudflare/nimbus-docs add <slug> --overwrite`, then review with GitButler. Components you edited are kept and listed. To compare one with upstream, commit when authorized, run the `--overwrite --yes` command it prints, and review the diff; unless the user decided to keep the overwrite, use GitButler to undo only that run's changes, including `nimbus.json`, while preserving unrelated work. |

Sätteri is Nimbus's default Markdown and MDX processor. Extend it using `markdown.mdastPlugins` for Markdown AST transformations or `markdown.hastPlugins` for HTML AST transformations.
If the site replaces Sätteri with another processor, set `admonitions: false` and keep that processor's existing callout implementation.

List installable items: `npx @cloudflare/nimbus-docs list`.

## Sidebar

The sidebar mirrors the imported docs tree selected in `src/content.config.ts`.
The Global and Project groups are configured in `astro.config.ts`. Within a
group, `sidebar.order` sorts entries (lowest first, otherwise alphabetical),
`sidebar.label` shortens a page's rail title, and `sidebar.hidden: true` builds
a page without listing it.

To add an external link or fix the top-level order, set `sidebar.items` in `defineNimbusConfig` in `astro.config.ts`. Items you list replace the generated top level, and a listed item's `label` wins over the folder's `sidebar.group.label`:

```ts
sidebar: {
  items: [
    { label: "Guides", autogenerate: { directory: "guides" } },
    { label: "GitHub", link: "https://github.com/you/repo" },
  ],
},
```

The header's section tabs come from the same list: each top-level item that autogenerates from another collection (`{ label: "API", autogenerate: { collection: "api", prefix: "/reference" } }`) becomes a tab, and the tabs show once there are two. Folders of the imported docs tree and external links stay in the sidebar. For any other header link, edit `src/components/Header.astro`.

Everything else: <https://nimbus-docs.com/navigation/sidebar/>.

## Agent interfaces

Read the release-matched guide at [`node_modules/@cloudflare/nimbus-docs/dist/docs-for-agents.md`](node_modules/@cloudflare/nimbus-docs/dist/docs-for-agents.md), especially for preview packages. Nimbus publishes discovery automatically. Keep `<WebMCP />` in `BaseLayout.astro` for browser-agent search with default Pagefind. Markdown negotiation applies to request-rendered pages; static hosting and response headers follow the deployment target's setup.

## Upgrading Nimbus

Keep `nimbus.json` committed. Its `lastReviewedNimbusVersion` is the baseline Nimbus uses to select the versioned reviews crossed by a package upgrade; state-detected migrations come from the current project files. It is not a package pin and should not be edited by hand.

1. Update `@cloudflare/nimbus-docs` with the project's package manager.
2. Preview the complete plan with `npx @cloudflare/nimbus-docs migrate --dry-run --diff`. If no baseline exists yet, add `--from <previous-version>`.
3. Review every versioned entry and resolve each blocked/manual item.
4. Apply safe edits only with explicit consent: `npx @cloudflare/nimbus-docs migrate --yes`. Review the resulting diff, then rerun the preview.
5. When no migration remains, run `npx @cloudflare/nimbus-docs migrate --yes` again to record the completed review in `nimbus.json`.
6. Pull in starter fixes: `npx @cloudflare/nimbus-docs outdated` lists starter files that changed upstream. For each one, review it with `npx @cloudflare/nimbus-docs diff <file>`, and take a clean update with `diff --apply <file>`. Merge files you've edited by hand. `migrate` doesn't cover these.
7. Run the project's typecheck and production build, then run `npx @cloudflare/nimbus-docs check` again for post-build coverage.

Except for task-printing mode (`--print`), `migrate` exits nonzero while work or review remains; that is a pending-upgrade signal, not necessarily a command failure. Never skip versions by changing `nimbus.json` directly.

## Audit this site

The production origin and local override are documented in [README.md](./README.md#run).

Then run `npx @cloudflare/nimbus-docs check --json`. It runs the environment, structural, authoring, and type checks build-free — config validity, `site` placeholder, route collisions, MDX component resolution, the lint rules, and a `tsc` type-check — and returns three top-level signals plus per-scope detail:

- **`status`** (`passed` | `failed` | `partial`) and **`readiness`** (`buildable` | `blocked` | `unknown`) are the primary signals. `status` is the whole-run verdict; `readiness` answers "does env + structure say it builds?". `ok` (=== zero errors) is kept for back-compat only.
- **`findings[{scope,code,severity,file,line,message,fixable,fix}]`** are problems we evaluated. Apply each `fix` (or `check --fix`).
- **`scopes[].notes[{code,reason,requiresBuild?,requiresInput?}]`** are checks we *couldn't* evaluate yet (e.g. types before a build). A note is never a finding and never carries a `fix` — you resolve it by making the missing thing exist (usually a build), not by `--fix`. `summary.notes` counts them.

Loop until `status !== "failed"` and no finding has a `fix` without `fix.requiresInput` — `summary.fixable` also counts fixes that need input (a placeholder `site`), which `--fix` can't apply for you. An error with no `fix` (such as `nimbus/dependencies-missing`) ends the loop too: do what its message says (install dependencies), then run `check` again, or stop and report it. A `partial` run with nothing left to fix is a **stop** (optionally build, then re-check), not a `--fix` retry. Exit is `1` only when `status` is `"failed"`. For full coverage (types + link-checking) run a build first, then `check` again. With server output, `check` stays `partial` with the note `nimbus/request-rendering-build-required` even after a build: it doesn't verify request-rendered pages, so a passing production build is the gate.

Then walk the categories below for what `check` doesn't cover yet — route-file existence, registry hygiene, the AI surface, post-build search, and Cloudflare config. Emit findings as:

```
- [error|warn|info] FILE:LINE — what + why + fix.
```

End with `Summary: N errors, N warnings.`

- **Config** — `astro.config.ts` calls `nimbus(defineNimbusConfig({ ... }))`; `site` is set; `editPattern` (if set) contains `{path}`; `output:` matches the deploy target.
- **Content** — `content.config.ts` registers `docsCollection()` (and `partialsCollection()` if used); every `.mdx` is inside a registered collection; frontmatter validates.
- **Sidebar** — every sidebar ref resolves to a content entry; no orphans; no slug collisions.
- **MDX** — every PascalCase component in `*.mdx` is registered or imported; every `<Render file=...>` resolves; code-fence languages are valid.
- **Routes** — route files and public assets listed in the file layout above exist.
- **Registry hygiene** — every `src/components/ui/<slug>/` is either MDX-registered or imported in `src/`; transitive deps (`lib/cn.ts`, etc.) exist.
- **AI surface** — `<AgentDirective />` renders in `BaseLayout.astro`; doc `<head>` has `<link rel="alternate" type="text/markdown" ...>`.
- **Search** — `data-pagefind-body` is on the docs main wrapper; after a production build, `dist/pagefind/` exists with ≥1 indexed page.
- **Cloudflare** — use the Pages deployment settings linked from [README.md](./README.md#deploy).

## Don't

- Hand-add components under `src/components/ui/` that exists in the Nimbus registry — use `npx @cloudflare/nimbus-docs add <slug>` so deps resolve.
- Remove `<AgentDirective />` unless asked.

## Project home

[nimbus-docs.com](https://nimbus-docs.com)
