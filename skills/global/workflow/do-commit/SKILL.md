---
name: do-commit
description: Commit local changes in Conventional Commits format with GitButler and a git fallback, and optionally push, open a PR, or land it. Use when committing, pushing, `/do-commit`, `/do-commit push`, the shorthands CP, CPP, or land, GitButler, or No Mistakes publishing.
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
| Land | `land` | Commit, push, open a PR, land it with `but land` (falls back to `gh pr merge`). |

- **Commit (default).** Any request that does not ask to push. Do not push, do not run No Mistakes, and skip gates 4-5 and Step 5.
- **Every other mode** runs the push path in the procedure: No Mistakes, gates 4-5, publish, and Step 5. `cpp` and `land` then run Step 6. If there is nothing uncommitted, skip the commit and publish existing commits.

## Related skills

- Syncing, conflicts, undo, or merging after the commit: `do-git-safe-pr-workflow`, if installed.
- Work that should land as dependent PRs: `do-gh-stack`, if installed.
