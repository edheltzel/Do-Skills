---
name: do-cleanup
description: >-
  Tidy a project's working records against what has actually landed: close
  todo.txt tasks that have proof, archive finished plans, superseded handoffs
  and older regroup files, and list merged worktrees and branches. Use when
  the user says cleanup, clean up, tidy up, sync todos, or archive old plans.
  Dry run first; moves files into archive/ folders and never deletes. NOT FOR
  a status check (`do-regroup`, if installed) or writing a handoff
  (`do-handoff`, if installed).
---

# Cleanup

Bring `todo.txt`, plans, handoffs, and regroup files in line with what is merged, and move finished records out of the way. Every change needs evidence. Nothing is deleted: finished files move to an `archive/` folder beside them, so git history and search still find them.

## Scope

- **This project (default).** The repo root of the current workspace: the main checkout, never a linked worktree.
- **All projects.** Only when the user says "all", "all projects", or "everything". Walk the `@route` lines in `$HOME/todo.txt` (`do-todo`) and run each step per routed repo, plus the global list itself for step 2.

## 1. Gather evidence

Read only, before any change:

- The default branch's log from the existing remote-tracking ref (`origin/master` or `origin/main`). Do not fetch during a dry run; if the ref looks stale, say so. Run `git fetch origin` only at the start of apply, then re-check every row.
- Merged and closed PRs: `gh pr list --state merged --limit 100 --json number,title,headRefName,mergedAt,url`. Skip when `gh` is unavailable and say so.
- `git worktree list` and local branches with `git branch --merged origin/<default>`.
- The files each record names, checked on the default branch with `git cat-file -e origin/<default>:<path>`.

## 2. todo.txt

Follow `do-todo`. Every command names both files, quoted and absolute: `TODO_FILE="<root>/todo.txt" DONE_FILE="<root>/done.txt" tuxedo --json ...`. Re-list before each mutation, because task numbers shift.

Close an open task only when the evidence shows the outcome the task asks for, not just a mention of it:

- its `pr:` URL is merged, the merge reached the default branch (not only a stacked base branch), and that PR's diff makes the change the task describes;
- a merged PR or default-branch commit whose diff makes that change (a commit that only names the task, or plans it, does not count);
- its `report:` file exists on the default branch and records the task as done.

A path that already existed before the task was created is not evidence: the file must carry the requested change.

Append the evidence (`app N pr:<url>` or `app N report:<path>`) when the line lacks it, then `do N`. After all closes, `archive`. A route line (`@route`) is never closed here unless its repo has no open task and the user confirms.

Anything that looks done but lacks that proof stays open and goes on the **Needs you** list with what is missing. Never delete a task line, never change priority, never rewrite a task's wording.

## 3. Plans

Plans live in the plans directory the project `AGENTS.md` names, else `docs/plans/`, with their `.human.md` pair. The `research/` and `handoffs/` folders are not plans.

- **Finished.** Every implementation unit's `Done when` and `Verify` is met on the default branch (a merged PR that delivers the units, or the checks passing there), and no line in its `## todo.txt` section is still open. An empty or all-done todo section alone is not enough. Move the plan and its `.human.md` pair to `archive/` inside that plans directory with `git mv`.
- **Open.** Leave it in place. You may tick a step that has the same hard evidence as step 2. Never rewrite its goal, steps, or decisions.

## 4. Handoffs

Handoffs live in the handoff directory the project `AGENTS.md` names, else `docs/plans/handoffs/`.

- **Superseded.** A newer handoff explicitly replaces this one (it says it supersedes or continues it and carries its open work forward), or every task in its `## todo.txt` section is done with step 2's evidence and its `Next step` and `Open questions` hold nothing unresolved. A newer handoff that only links this one as a dependency does not supersede it. Move it to `archive/` inside that handoff directory with `git mv`.
- **Still live.** Leave the body alone. Append one dated line under a `## Status` heading at the end only when a linked PR merged or a listed task closed since it was written.

## 5. Regroup files

Regroup files are `regroup/*.md` with their `.human.md` pair. Group them by scope. `do-regroup` names every file `YYYY-MM-DD-regroup-status-check[-N].md`; older files may use `regroup-all` or `regroup-<project-slug>`. Read the scope from the file's `Scope:` header line. For files without one, use the filename only when it names the scope (`regroup-all`, `regroup-<project-slug>`); leave any other file in place. In each group, keep the newest file (latest date, then highest `-N` suffix) and its pair in `regroup/`. Move every older one to `regroup/archive/` with `git mv`. `do-regroup` reads the archive when `regroup/` has no earlier file, so history stays reachable.

## Moving a file

Before any move, find live references to the file: `grep` the repo for its path and file name (READMEs, other docs, `note:` and `report:` tags in `todo.txt` and `done.txt`). Update each to the archive path in the same apply, and rewrite the moved file's own relative links (anchors kept) so they still resolve from `archive/`, or list the move as blocked when a reference cannot be updated. Never move onto an existing archive file: if the destination exists, list the row as blocked.

## 6. Worktrees and branches

List a linked worktree or local branch only when its tip is an ancestor of the default branch (`git merge-base --is-ancestor <branch> origin/<default>`), or equals the head commit of a PR whose merge reached the default branch (squash merges leave the tip outside that history). A branch with commits after that point is not merged; leave it off the list. For a squash-merged branch, removing it needs `git branch -D`: say so in the row, and check the branch can be deleted before offering to remove its worktree. For each, say whether it has uncommitted changes (`git -C <path> status --porcelain`). Remove them only on the user's yes: `git worktree remove <path>`, then `git branch -d <branch>`. Never force-remove one with uncommitted changes; it may hold another agent's work.

## Dry run, then apply

Default is a dry run: make no change, print one table, then the Needs you list.

| Area | Item | Action | Evidence |
|---|---|---|---|
| todo.txt | `doskills#4` Re-pin do-skills | close, archive | `report:` path on master |
| plans | `2026-11-19-drop-gitbutler.md` | move to `docs/plans/archive/` | all todo lines done |
| regroup | `2026-11-22-regroup-doskills.md` | move to `regroup/archive/` | newer `2026-11-23` file |
| worktrees | `.worktrees/x` (`feat/x`) | remove on yes | PR #70 merged, clean |

Apply on the user's yes, or straight away when they said `apply`. Moves use `git mv` so they stage as renames; a file git does not track moves with `mv` into the same archive folder. Never use `rm`; when a file must leave the repo, use `trash`.

After applying, re-run the dry run and show it: every row should be gone or marked done. This skill never commits. Hand the result to `do-commit`, if installed, with one line: `chore(cleanup): archive finished records and close landed tasks`.

## Related skills

- Status and what to work on next: `do-regroup`, if installed.
- Writing or resuming a handoff: `do-handoff`, if installed.
- Task list commands and format: `do-todo`, if installed.
