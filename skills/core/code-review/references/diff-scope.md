# Diff Scope Rules

These rules apply to every lens sub-agent. They define what is "your code to review" versus pre-existing context, and how to inspect code safely across the three scope modes.

## Scope modes

The orchestrator resolves one of three modes in Stage 1 and passes it in `<scope-mode>`:

- **`local-aligned`** — the working tree IS the reviewed head (a standalone branch review, a `base:` review, or a PR whose head the local checkout carries). Normal workspace inspection (Read, Grep, git blame) on changed paths is valid.
- **`pr-remote`** — reviewing a PR whose head the local tree does NOT carry (a fork PR, a stale local branch, or a cross-repo PR). The working tree is not the reviewed head.
- **`branch-remote`** — reviewing a remote branch without checkout. Same discipline as `pr-remote`.

**In `pr-remote` / `branch-remote`, do NOT Read/Grep workspace copies of changed files** — they may not match the branch under review, and trusting them produces false positives on the wrong tree. Instead:

- Prefer `git show <remote-head-ref>:<path>` when a remote head ref is provided in context.
- Otherwise rely on the diff hunks in `<diff>` only.
- Never treat local workspace contents as evidence for findings on changed files.

## Finding classification tiers

Every finding falls into one of three tiers by its relationship to the diff:

### Primary (directly changed code)

Lines added or modified in the diff. Your main focus. Report findings here at full confidence.

### Secondary (immediately surrounding code)

Unchanged code within the same function or block as a changed line. If a change introduces a bug only visible by reading the surrounding context, report it — but note that the issue lives in the interaction between new and existing code.

### Pre-existing (unrelated to this diff)

Issues in unchanged code the diff did not touch and does not interact with. Mark these `"pre_existing": true`. They are reported separately and do not count toward the verdict.

**The rule:** if you would flag the same issue on an identical diff that did not include the surrounding file, it is pre-existing. If the diff makes the issue *newly relevant* (a new caller hits an existing buggy function), it is secondary — a finding, not pre-existing.
