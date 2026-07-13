---
name: git:safe-pr-workflow
description: >-
  Safe GitHub pull request workflow for low-experience Git users. Use when committing
  or pushing changes, pulling, syncing a feature branch with `main`, resolving conflicts,
  undoing mistakes, recovering from a bad rebase, or deciding how to merge a PR while
  keeping `main` clean. Triggers on: "commit and push", "push my changes",
  "update my branch", "rebase my branch", "resolve git conflicts",
  "recover from rebase", "undo pushed commit", "keep main clean", "squash merge".
---

# Git Safe Pr Workflow

## Overview

Guide users through a GitHub-first PR workflow that keeps `main` clean without requiring
frequent local rebases. Prefer short-lived feature branches, merge `origin/main` into the
feature branch when syncing, and land changes with `Squash and merge`.

Bias toward safety over elegance. Choose reversible operations, avoid rewriting shared
history, and teach the user in small steps while you work.

## Safe Defaults

- Treat `main` and `master` as shared, sensitive branches.
- Use a short-lived feature branch for every task.
- Assume a pushed branch or open PR may already be shared.
- Prefer `git fetch` before any sync, merge, or recovery action.
- Prefer merging `origin/main` into a feature branch over rebasing it.
- Prefer `git revert` over rewriting history when commits may already be pushed.
- Prefer `Squash and merge` to keep `main` clean.

## Inspect First

Before any Git operation that changes history, branches, or remote state, inspect:

- current branch and whether it is the default branch
- clean vs dirty working tree
- upstream tracking branch and whether local commits are pushed
- whether the branch has an open PR or appears shared
- staged and unstaged diff when undoing or syncing work

If you cannot determine whether a branch is shared, assume it is shared and choose the
safer path.

## Local Commit Boundary And Remote Push Boundary

Treat a local commit and a remote update as two separately authorized outcomes. Permission to
commit ends at the local repository unless the user also names pushing as part of the request.

### Local Commit Checks

A commit is ready only when current repository evidence establishes all of the following:

1. **The change set is understood.** Review status, staged changes, unstaged changes, and
   untracked paths. Account for every intended path and identify unrelated work before staging.
2. **The commit is coherent.** Draft a summary that accurately describes the complete result and
   follows the repository's message style. If the staged work needs more than one honest summary,
   divide it into separate commits.
3. **The index is correct.** Reinspect the staged file summary and relevant staged hunks after
   staging. The index must include the whole intended change and exclude unrelated files,
   generated debris, credentials, and changes whose required companion edits remain unstaged.
4. **The recorded commit matches the index.** After committing, inspect the new local `HEAD`, its
   subject, and its file summary. Reconcile any remaining working-tree changes; otherwise the
   task's local tree should be clean.

For a commit-only request, completion is the verified local commit. Stop without pushing, setting
an upstream, creating a remote branch, or performing any other operation that writes remote state.

### Logical Commit Splitting

Before staging everything together, scan the changed files for naturally distinct concerns. If they
clearly group into separate logical changes (a refactor in one directory and a new feature in another,
or test files for a different change than the source files), create separate commits.

- Group at the **file level only** — do not use `git add -p` or split hunks within a file.
- Two or three logical commits is the sweet spot. Do not over-slice into many tiny commits; when the
  separation is ambiguous, one commit is fine.
- Stage specific files by name (`git add file1 file2`); avoid `git add -A` / `git add .`, which sweep
  in `.env`, build artifacts, and generated files.

When matching commit-message convention and the repo uses Conventional Commits, default to `fix:` over
`feat:` when both seem to fit — adding code to remedy broken or missing behavior is `fix:`. Reserve
`feat:` for capabilities the user could not previously accomplish. The user may override.

### Push Checks

Proceed beyond the local boundary only when the user explicitly authorizes a push. A request that
expressly asks to commit and push grants both permissions, in that order.

Before pushing, identify the current branch, configured upstream, remote URL, and the full
destination ref. The destination must be intentional and must not be a protected default branch.
Creating an upstream is allowed only as part of this authorized push and only for the named
destination.

After the push command completes, obtain new evidence directly for that exact destination ref.
For example, query `git ls-remote --exit-code <remote> refs/heads/<branch>`, or fetch only that ref
and inspect the fetched object ID. Record the remote name and URL, full ref, local `HEAD` object
ID, and newly returned remote object ID. Success requires the query to resolve that exact ref and
the two object IDs to be identical. A command exit status, cached remote-tracking branch, missing
ref, failed query, or mismatched object ID cannot establish success; report the result as
`BLOCKED` or `FAIL` and explain any remaining tree or ahead/behind state.

These checks prove both content and destination. They prevent a technically successful Git command
from being mistaken for delivery of the intended commit to the intended branch.

## Standard Workflow

Use this as the default GitHub workflow for low-experience users:

1. Branch from `main`. When branching off the default branch, local `main` may be stale or carry
   unpushed commits — read `references/branch-creation.md` and follow its decision flow (fresh
   fetch, unpushed-commit detection, carry-forward ask, stash collision handling) rather than
   branching blind.
2. Commit locally on the feature branch in small logical steps.
3. Open a PR early.
4. When the branch falls behind `main`, merge `origin/main` into the feature branch.
5. Resolve conflicts carefully and verify the final code, not just the merge markers.
6. Push the updated branch.
7. Merge with `Squash and merge`.
8. Delete the feature branch after merge.

Do not teach users to routinely rebase pushed PR branches just to get the latest `main`.
That workflow is where many novices re-introduce old code or lose work.

## Opening PRs

When helping a user open a PR, treat the PR title as the likely final squash-merge commit. For
composing the title and body themselves — what to cut, how to size by decision cost, how to lead
with a before/after, and how to classify related-work references — read
`references/pr-description-writing.md`.

- Write the title so it reads well on `main` after `Squash and merge`.
- Use a concise Conventional Commit style title when the repo uses that convention.
- Describe the final outcome, not the implementation journey or review process.
- Avoid titles like `WIP`, `fix stuff`, `address comments`, or `update branch`.

Good default patterns:

- `feat: add <skill-name> skill`
- `feat(<skill-name>): add <capability>`
- `fix(<skill-name>): correct <problem>`
- `docs: document <policy or workflow>`

Before writing the body, check for a repository PR template and fill it instead of inventing
a structure. Look in `.github/pull_request_template.md`, `pull_request_template.md` at the
repo root or under `docs/`, and any files under `.github/PULL_REQUEST_TEMPLATE/` (multiple
templates — ask which one applies).

For the PR body (when no template exists):

- briefly state what changed
- briefly state why it changed
- mention testing or validation if relevant

Before creating: the final title and body contain no unreplaced placeholders (`<...>`,
`TODO`, `TBD`), and template sections with no content are removed, not left as stubs.

If applying a `breaking-change` label (or `!` in the title), reserve it for **user-facing**
breaks that force users to change configuration, CLI invocations, or API integrations —
not internal refactors that leave external consumers untouched.

If the repo uses GitHub squash merges, prefer the PR title as the default squash commit message.

### Creating the PR safely

- **Fork PR — find the right existing PR.** `gh pr list --head <branch>` filters by branch **name
  only**, not `<owner>:<branch>`, so in a base repo with multiple forks another contributor's PR can
  share the branch name. Never blindly take index 0: select the entry whose `headRepositoryOwner` and
  `headRefName` match the head you are pushing. Do **not** pass `<owner>:<branch>` to `--head` — it is
  silently unsupported and returns `[]`, which reads as "no PR" and opens a duplicate. The PR lives on
  the base repo, so target it with `gh`'s default-repo resolution or an explicit `-R <base-owner>/<repo>`.
- **Pass the body via `--body-file`, never stdin.** Write the composed body to a temp file and pass
  `--body-file <path>`. Never use `--body-file -`, a stdin pipe, a heredoc-to-stdin, or
  `--body "$(cat ...)"` — wrappers and stdin handling can silently produce an empty PR body while `gh`
  still exits 0 and returns a URL.
- **One command per shell tool call.** When gathering context (`git status`, `git branch --show-current`,
  `gh pr list`, …), run each as its own single-program invocation. Do not join them with `;`, `&&`,
  `||`, pipes, `$(...)`, or redirects like `2>/dev/null`: that syntax parses only under POSIX shells and
  aborts under Windows PowerShell. Read each command's exit status directly — a non-zero exit is often a
  normal state to interpret (no PR yet, no `origin/HEAD`, detached HEAD), not a failure to suppress.

## Sync Decision Tree

- **Need the latest `main` on a feature branch?** Use `fetch`, then merge `origin/main` into the
  feature branch.
- **Need a clean `main` history?** Rely on `Squash and merge`, not local rebasing of the feature
  branch.
- **Need to clean up unpublished local commits?** Rebase is acceptable only if the branch is
  clearly private, unpublished, and not under review.
- **Need to undo pushed work?** Use `revert`.
- **Need to discard local-only work?** Use the least destructive local undo that matches the goal.

If a user asks to rebase a pushed branch, explain why that is risky and propose merging
`origin/main` instead.

## Conflict Resolution Rules

- Resolve conflicts to the desired final code state, not by blindly taking both sides.
- Assume old bugs can be reintroduced during conflict resolution.
- After resolving conflicts, inspect the affected files and summarize what changed.
- Run targeted verification after conflicts: tests, build, or focused checks in the touched area.
- If the resolution is non-obvious, explain it briefly to the user while making the change.

For detailed conflict-handling steps and examples, read `references/conflict-resolution.md`.

## Recovery Rules

- If a merge is in progress and the user wants to stop, abort the merge rather than improvising.
- If a rebase is in progress and has gone wrong, stop and recover with `reflog` or rebase abort.
- If the wrong commit was pushed, prefer `revert`.
- If work was committed to the wrong branch, preserve it and move it rather than deleting it.
- When recovering history, explain what reference point you are returning to and why.

For recovery playbooks, read `references/recovery.md`.

## Refuse or Warn Hard

- Do not commit directly to `main` unless the user explicitly asks and the repo policy allows it.
- Do not force-push `main` or other protected branches.
- Do not rebase a pushed/shared branch by default.
- Do not use `git reset --hard`, `git clean -fd`, branch deletion, or tag deletion unless the user
  clearly wants destructive cleanup.
- Do not bypass branch protections, required checks, or required review flows.
- Do not commit or push with `--no-verify`. When a hook fails, fix the cause or stop and
  report it; bypassing the hook hides the failure it exists to catch.

If the user explicitly wants a risky operation, explain the safer alternative first. Only proceed
when the request is clear and the branch is not a protected/shared branch.

## Teaching Behavior

Teach in short, repeatable notes while working:

- State what you are about to do and why it is the safer path.
- When rejecting rebase, explain that rebase rewrites commit history and is easy to misuse once
  a branch is pushed.
- When merging `origin/main`, explain that this preserves the branch's existing commits and is
  easier to recover from.
- After recovery, explain what went wrong, how you recovered, and what safer habit to use next time.
- Avoid long Git lectures. Teach the next decision, not the whole tool.

## GitHub Settings To Recommend

When asked how to support this workflow at the repo level, recommend:

- protect `main`
- require pull requests before merge
- require status checks
- require at least one review
- enable `Squash and merge`
- disable `Rebase and merge`
- optionally disable regular merge commits if the team wants squash-only history
- set the default squash commit message to `Pull request title`
- auto-delete head branches after merge

For repo policy details, read `references/repo-settings.md`.

## Quick Checklist

Before syncing a feature branch:

- [ ] confirm you are on the feature branch, not `main`
- [ ] fetch remote changes
- [ ] check for uncommitted work
- [ ] merge `origin/main`, do not rebase by default
- [ ] inspect and verify conflict resolutions

Before committing:

- [ ] describe the complete diff in one sentence
- [ ] choose a coherent commit line that matches repo convention
- [ ] verify the staged summary and diff contain only the intended change
- [ ] verify the local commit OID, message, and file summary
- [ ] for a commit-only request, stop without mutating a remote

Before pushing:

- [ ] confirm push authorization, current branch, upstream, remote URL, and exact destination ref
- [ ] confirm the destination is not a protected default branch
- [ ] freshly query or fetch the exact destination ref after push
- [ ] record the remote/ref plus local and remote OIDs, and require them to match
- [ ] treat a failed query, missing ref, or OID mismatch as `BLOCKED`/`FAIL`

Before undoing:

- [ ] determine whether the commits are pushed
- [ ] choose `revert` for pushed work
- [ ] use local-only undo only for unpublished work

## Gotchas

- Local commit permission does not cross the network boundary. Remote changes require a separate,
  explicit request.
- Remote-tracking branches are cached observations. Push completion is established only by a new
  exact-ref lookup whose object ID equals local `HEAD`.
