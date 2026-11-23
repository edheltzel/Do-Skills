---
name: do-commit
description: >-
  Commit local changes as a Conventional Commit. Use when the user says
  commit, push, ship, or open a PR, or when a do-* hand-off names do-commit
  with a mode (commit, cp, cpp, land). Never pushes unless the mode or the
  user asks. NOT FOR sync, conflicts, or undo (do-git-safe-pr-workflow),
  stacked PRs (do-gh-stack), or review-comment triage (do-git-pr-review-triage).
---

# Commit

Commit all local changes in Conventional Commits form. Never push unless the mode or the user asks.

Read [references/procedure.md](references/procedure.md) and follow it. A "stop" after the commit or after `cpp` means that action is done; continue to Watch or Next. `land` ends after its verify.

## Modes

Pick the mode from the argument (`/do-commit cpp`, or a caller passing `cpp`) or the user's words. Shorthands are case-insensitive. A passed mode wins over a bare "commit" reading of the same turn.

| Mode | Shorthand | Does |
|------|-----------|------|
| Commit (default) | none, `commit` | Commit. Then Next. |
| Push | `push`, `cp` | Commit, roborev, push. Then Watch, or Next when no PR is open. |
| Commit, push, PR | `cpp` | Commit, roborev, push, open a PR. Then Watch. |
| Land | `land` | Commit, roborev, push, open a PR, land it. No Next. |

- **Commit (default).** Any request that does not ask to push and passes no push mode. Do not push, do not run roborev or No Mistakes, and skip gates 4-6 and Step 5.
- **Every other mode** runs the push path: the roborev local review when this repo uses roborev, then No Mistakes when this repo was already initialized, otherwise the normal push, then gates 4-6, publish, and Step 5. Nothing leaves the machine until roborev passes. If initialized but the binary is missing or the gate cannot run, return `blocked` without publishing. `cpp` and `land` then run Step 6. If there is nothing uncommitted, skip the commit and publish existing commits.
- **`land` only on the user's explicit go.** They typed `land` or picked it. A caller that passes `land` with `mode:return-to-caller` is not that go: return `status: needs-human` and do not merge.

## Caller

`do-it`, `do-work`, and `do-debug` may call this with a mode. `mode:return-to-caller` (used by `do-it` and `do-work`) skips Next. Return `status: done | blocked | needs-human` plus the artifact: the PR URL if this run opened or reused one, otherwise the commit SHA.

- `done` - the mode finished (push path: Gate 6 passed).
- `needs-human` - roborev findings still failing after three fix rounds, No Mistakes `ask-user`, `land` without an explicit go, or `gh pr merge` refused (protected branch, missing approval).
- `blocked` - no feature branch, an unavailable gate in an initialized repo (roborev or No Mistakes), or push/PR failed.

## Watch

After `cp` or `cpp` passes Gate 6 and a PR is open for the branch, invoke `do-git-pr-babysit`, if installed, with the PR URL. The push or PR ask already includes the watch, so do not offer it as a menu. Babysit waits for Pullfrog and CI, and routes any fix back here as `do-commit cp`, which runs roborev again before the push. Its own Next block ends the run. With `mode:return-to-caller`, skip this step: the caller starts the watch.

## Related skills

- Watching the PR through roborev, Pullfrog, and CI: `do-git-pr-babysit`, if installed.
- Review comments on the PR: `do-git-pr-review-triage`, if installed.
- Syncing, conflicts, undo, or merging after the commit: `do-git-safe-pr-workflow`, if installed.
- Work that should land as dependent PRs: `do-gh-stack`, if installed.

## Next

End with this block, except where Watch hands off. Run the next skill only when the user picks it. When a caller started this run (`mode:return-to-caller`, used by `do-it` and `do-work`), skip the block and return `status: done | blocked | needs-human` plus the artifact path.

Offer the block for the mode that just finished, and only after that mode's gates passed. A blocked or needs-human push does not get the push-path block.

**Commit:**

Next: `do-commit cp` - push this commit, passing `<commit SHA>`.

Other moves:

1. `do-commit cpp` - also open a PR.
2. Stop - the commit is already saved.

**cp with no PR** (after no-mistakes `checks-passed` or `passed`, or the push verified):

Next: Stop - the push is verified.

Other moves:

1. `do-commit cpp` - open a PR for this branch, then watch it.

**cp or cpp with a PR:** no block here. Watch runs `do-git-pr-babysit`, and its Next block ends the run.

**land:** no block.

A pick of `do-commit` with a mode continues in this skill with that mode. `land` still needs the user's go in that pick.

Reply with a number, the label, or what you want instead.

Ask with the harness's blocking question tool when it has one, and drop the last line. Otherwise print the block and wait. A pick loads that skill now, in this session.
