---
name: do-commit
description: Commit local changes in Conventional Commits format with GitButler and a git fallback, and optionally push or publish through No Mistakes. Use when committing, pushing to a remote, `/do-commit`, `/do-commit push`, GitButler, or No Mistakes publishing.
disable-model-invocation: true
---

# Commit

Commit all local changes following Conventional Commits format. Push only when the user asks to push or passes `push` (`/do-commit push`).

Read [references/procedure.md](references/procedure.md) and follow it.

## Modes

- **Commit (default).** `/do-commit` with no argument, and any request that does not ask to push. Stop after the commit. Do not push, do not run No Mistakes, and skip gates 4-5 and Step 5.
- **Push.** `/do-commit push`, or the user asks to push or publish. Run the commit path, then the push path in the procedure: No Mistakes, gates 4-5, publish, and Step 5.

## Related skills

- Syncing, conflicts, undo, or merging after the commit: `do-git-safe-pr-workflow`, if installed.
- Work that should land as dependent PRs: `do-gh-stack`, if installed.
