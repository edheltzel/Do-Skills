---
name: do-commit
description: Commit local changes in Conventional Commits format with GitButler and a git fallback, and optionally push, open a PR, merge, or land. Use when committing, pushing, `/do-commit`, `/do-commit push`, the shorthands CP, CPP, PPM, or land, GitButler, or No Mistakes publishing.
disable-model-invocation: true
---

# Commit

Commit all local changes following Conventional Commits format. Push only when the user asks to push or passes a mode that pushes.

Read [references/procedure.md](references/procedure.md) and follow it.

## Modes

Pick the mode from the argument (`/do-commit cpp`) or the user's words. Shorthands are case-insensitive.

| Mode | Shorthand | Does |
|------|-----------|------|
| Commit (default) | none | Commit. Stop. |
| Push | `push`, `cp` (commit + push) | Commit, push. |
| Commit, push, PR | `cpp` | Commit, push, open a PR. |
| Push, PR, merge | `ppm` | No new commit. Push existing commits, open a PR, merge it. |
| Land | `land` | Commit, push, open a PR, land it with `but land`. |

- **Commit (default).** Any request that does not ask to push. Do not push, do not run No Mistakes, and skip gates 4-5 and Step 5.
- **`ppm`** skips Steps 2-3 and the stage/commit part of Step 4, but still runs Step 4's publish block. If there are uncommitted changes, stop and ask; do not commit them silently.

## Related skills

- Syncing, conflicts, undo, or merging after the commit: `do-git-safe-pr-workflow`, if installed.
- Work that should land as dependent PRs: `do-gh-stack`, if installed.
