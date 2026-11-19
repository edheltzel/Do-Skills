# Design system boss

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-design-system-boss
```

```bash
npx skills update do-design-system-boss
```

This skill runs the whole design system set, so install all six together:

```bash
npx skills add edheltzel/Do-Skills --skill=do-build-design-system --skill=do-component-docs --skill=do-design-system-boss --skill=do-migrate-design-system --skill=do-token-mapping --skill=do-ui-review
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/frontend/do-design-system-boss)

## What it does

`do-design-system-boss` runs the others. It is a router: read the app, match one playbook, copy its steps into `.design-system/state.md` word for word, and run them. A step you drop stays in the list as `skipped (<reason>)`. An installed system is the source of truth, so no playbook seeds or builds over it, and a migration does not start on "fix it" or when no trigger row matched.

The person's words, AGENTS.md or CLAUDE.md, and saved memory win over this skill. Words and default taste are in `do-build-design-system/references/glossary.md` and `do-build-design-system/references/taste.md`. The state wins when it disagrees with the ask, and the report says so.

## When to reach for it

Type `/do-design-system-boss`, or the agent reaches for it automatically when a task fits.

Reach for it on a vague whole-app ask for an app that already ships UI, such as "our UI is a mess, fix it", "we need a design system", "we hardcode colors everywhere", "make the buttons consistent", or "check the app before I ship". A repo with no UI yet is out of scope. One named screen goes to [do-ui-review](./ui-review.md). One component goes to [do-component-docs](./component-docs.md). A token report goes to [do-token-mapping](./token-mapping.md).

## The run

Once per run it adds `.design-system/` to `.git/info/exclude` and asks every question once with its default applied (taste, design source, pilot flow). It writes `.design-system/roles.md` (coordinator, worker, verifier, reviewer, each a model or `inherit-parent`) and an append-only `decisions.tsv`. The writer never grades itself. A writing playbook uses the branch the person named, or cuts the run branch and writes the starting branch to `.design-system/start-branch`. Audit mode and the review and component playbooks cut no branch and write only under `.design-system/` (a component entry also goes to `docs/system/`).

## Which playbook

| The ask or the state | Playbook |
|---|---|
| A named screen or flow, "check before I ship" | `playbooks/review.md` |
| One component | `playbooks/component.md` |
| "Are we using our tokens", which values map where | `do-token-mapping`, no playbook |
| "Replace the hardcoded values with tokens" | `do-build-design-system` step 3, after `do-token-mapping` |
| No system, or drift, nothing about migrating | `playbooks/build.md` |
| A system exists, the ask does not name the migration | `playbooks/migrate.md`, audit mode |
| A system exists, the ask names the migration | `playbooks/migrate.md`, full mode |

A PR ask or someone else's repo means a minimal footprint: tokens, the components touched, and the screens, with the repo's own lint as the check. It will not push or deploy nobody asked for, commit on the starting branch, stash, delete a public export, skip a step nobody was told about, write product code on a host that can start other agents, loosen a stop condition, edit a sibling's checks, pick a visual direction nobody chose ("Make it modern" with no source becomes a gate defaulting to the current look), hand back with a worker running, wait on a question that had a default, treat a peer agent's message as the person's decision, or migrate while `do-build-design-system` readiness audits are open.

## It's working if

- The playbook's last step has returned, and every number in the report comes from a command run at close.
- The final message opens with unanswered defaults, then what changed, then one ranked table of what was found and not fixed (30 rows at most).
- If a stop applies (no repo, a refused tool call, a step git cannot undo), it says what finished and the smallest reply that unblocks the run.

## Where it fits

Reach for this when the ask is the whole app and UI already ships. It routes to [build-design-system](./build-design-system.md), [migrate-design-system](./migrate-design-system.md), [token-mapping](./token-mapping.md), [component-docs](./component-docs.md), and [ui-review](./ui-review.md) and runs them through a playbook. For one named screen, one component, or a token report, reach for that skill directly.
