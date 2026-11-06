# doskills.edheltzel.codes: Pages cutover to Do-Skills/site

Moves production for `doskills.edheltzel.codes` from the Pages project
`doskills-site` (repo `edheltzel/doskills-site`) to a new Pages project
`doskills` that builds `site/` in `edheltzel/Do-Skills`. Unpublished: this
file lives under `docs/plans/`.

## Why a new project

A Pages project cannot change its Git repository. Cloudflare documents no
way to do it, and the API ignores it: on 2026-11-06 a scratch project
`doskills-repo-switch-probe` connected to `doskills-site` was sent
`PATCH .../pages/projects/doskills-repo-switch-probe` with
`source.config.repo_name: "Do-Skills"` (with and without `repo_id`). Both
calls returned `success: true`, and the readback still said
`repo_name: doskills-site`, `repo_id: 1437772609`. The probe was deleted.

## Current production (unchanged until cutover)

| Item | Value |
| --- | --- |
| Project | `doskills-site` (id `fbcb0a9b-e0ce-4241-8b6c-5cfb8949b69e`) |
| Source | GitHub `edheltzel/doskills-site`, production branch `master`, previews `none` |
| Build | `npm run build`, output `dist`, root `""`, build image v3 |
| Env, production | `NODE_VERSION=22`, `SITE_URL=https://doskills.edheltzel.codes` |
| Env, preview | `NODE_VERSION=22` |
| Compatibility date | `2026-10-29` |
| Live deployment | `79ae52ec` from `83f90f6` |
| Custom domain | `doskills.edheltzel.codes`, active, Google CA, HTTP validation |
| DNS (zone `bafd5eed99c0c3ccf2d2c22e09d49b34`) | `CNAME doskills -> doskills-site.pages.dev`, proxied, record `b75952295e74f3230872815d08409e1e` |
| Zone rules | none for this host (only managed rulesets) |

## New project

Project `doskills` uses GitHub repo id `1249358413`, build image v3, and
compatibility date `2026-10-29`. Use the build, branch, and environment
settings in [site/README.md](../../site/README.md#deploy).

It was created on 2026-11-06 with production deployments off and previews
only for the PR branch. Its Pages hostname is `doskills.pages.dev` (no
suffix was needed). Preview `8beacec9` built `90c4a2e` from `site/` on Node
22.23.4 and passed the desktop and mobile browser checks before approval.

Shell setup for every step. `cf` fails on an HTTP error or `success: false`,
so with `set -e` a failed call stops the sequence:

```bash
set -euo pipefail
API="https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects"
ZONE="https://api.cloudflare.com/client/v4/zones/bafd5eed99c0c3ccf2d2c22e09d49b34"
cf() { curl -fsS -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" "$@" | jq -e '.success' >/dev/null; }
J=(-H "Content-Type: application/json")
```

## Cutover (after approval)

1. Merge PR #60 into `master`.
2. Turn on production builds for the new project and deploy `master`:

   ```bash
   cf "${J[@]}" -X PATCH "$API/doskills" -d '{"source":{"config":{"production_deployments_enabled":true,"preview_deployment_setting":"none"}}}'
   cf -X POST "$API/doskills/deployments" -F branch=master
   ```

   Verify `https://doskills.pages.dev` serves the landing page, `/docs/`,
   assets, and a 404 before touching the domain.
3. Stop the old project from deploying (its live deployment stays):

   ```bash
   cf "${J[@]}" -X PATCH "$API/doskills-site" -d '{"source":{"config":{"production_deployments_enabled":false}}}'
   ```

4. Move the domain. A custom domain belongs to one project, so this is a
   short window (minutes, while the new project validates the domain):

   ```bash
   cf -X DELETE "$API/doskills-site/domains/doskills.edheltzel.codes"
   cf "${J[@]}" -X POST "$API/doskills/domains" -d '{"name":"doskills.edheltzel.codes"}'
   cf "${J[@]}" -X PATCH "$ZONE/dns_records/b75952295e74f3230872815d08409e1e" -d '{"content":"doskills.pages.dev"}'
   curl -fsS -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" "$API/doskills/domains/doskills.edheltzel.codes" | jq -r .result.status   # repeat until active
   ```

5. Verify on `https://doskills.edheltzel.codes`: landing page, `/docs/`,
   `/docs/do-grit/` compatibility page, both slashless URLs, a docs page,
   images, code blocks, install links, `/og.png`, `/sitemap-index.xml`,
   404 status, HTTPS certificate, desktop and mobile.
6. Only then: update the `doskills-site` README, settle its open issues and
   PRs, and archive the repo. Keep the `doskills-site` Pages project and its
   deployment as the rollback target.

## Rollback

The old project and deployment `79ae52ec` are never deleted, so rollback is
the domain move in reverse:

```bash
cf -X DELETE "$API/doskills/domains/doskills.edheltzel.codes"
cf "${J[@]}" -X POST "$API/doskills-site/domains" -d '{"name":"doskills.edheltzel.codes"}'
cf "${J[@]}" -X PATCH "$ZONE/dns_records/b75952295e74f3230872815d08409e1e" -d '{"content":"doskills-site.pages.dev"}'
cf "${J[@]}" -X PATCH "$API/doskills-site" -d '{"source":{"config":{"production_deployments_enabled":true}}}'
```

If the old repo is already archived, its Pages project still serves the last
deployment; unarchive the repo only if it must build again.

## todo.txt

- Cutover doskills.edheltzel.codes to the `doskills` Pages project after PR #60 is approved +doskills
- Archive edheltzel/doskills-site after production is verified on the new project +doskills
