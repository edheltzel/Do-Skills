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

- `git fetch origin`, then the default branch's log (`origin/master` or `origin/main`).
- Merged and closed PRs: `gh pr list --state merged --limit 100 --json number,title,headRefName,mergedAt,url`. Skip when `gh` is unavailable and say so.
- `git worktree list` and local branches with `git branch --merged origin/<default>`.
- The files each record names, checked on the default branch with `git cat-file -e origin/<default>:<path>`.

## 2. todo.txt

Follow `do-todo`. Every command names both files, quoted and absolute: `TODO_FILE="<root>/todo.txt" DONE_FILE="<root>/done.txt" tuxedo --json ...`. Re-list before each mutation, because task numbers shift.

Close an open task only on hard evidence:

- its `pr:` URL is merged;
- a merged PR or a commit on the default branch names the task, its `id:`, or the exact change it describes;
- its `report:` file, or the deliverable path it names, exists on the default branch.

Append the evidence (`app N pr:<url>` or `app N report:<path>`) when the line lacks it, then `do N`. After all closes, `archive`. A route line (`@route`) is never closed here unless its repo has no open task and the user confirms.

Anything that looks done but lacks that proof stays open and goes on the **Needs you** list with what is missing. Never delete a task line, never change priority, never rewrite a task's wording.

## 3. Plans

Plans are `docs/plans/*.md` with their `.human.md` pair. The `research/` and `handoffs/` folders are not plans.

- **Finished.** Every line in its `## todo.txt` section is done (or matches a done task in `done.txt`), or the PR it names is merged and no follow-up task cites it. Move the plan and its `.human.md` pair to `docs/plans/archive/` with `git mv`.
- **Open.** Leave it in place. You may tick a step that has the same hard evidence as step 2. Never rewrite its goal, steps, or decisions.

## 4. Handoffs

Handoffs are `docs/plans/handoffs/*.md` (or the directory the project `AGENTS.md` names).

- **Superseded.** A newer handoff covers the same topic (same slug, or it names this one), or every task in its `## todo.txt` section is done. Move it to `docs/plans/handoffs/archive/` with `git mv`.
- **Still live.** Leave the body alone. Append one dated line under a `## Status` heading at the end only when a linked PR merged or a listed task closed since it was written.

## 5. Regroup files

Regroup files are `regroup/*.md` with their `.human.md` pair. Group them by mode and scope from the filename: `YYYY-MM-DD-regroup-all*.md` for all projects, `YYYY-MM-DD-regroup-<project-slug>*.md` for one project. In each group, keep the newest file (latest date, then highest `-N` suffix) and its pair in `regroup/`. Move every older one to `regroup/archive/` with `git mv`. `do-regroup` reads the archive when `regroup/` has no earlier file, so history stays reachable.

## 6. Worktrees and branches

List linked worktrees whose branch is merged into the default branch or whose PR is merged, and local branches merged into it. For each, say whether it has uncommitted changes (`git -C <path> status --porcelain`). Remove them only on the user's yes: `git worktree remove <path>`, then `git branch -d <branch>`. Never force-remove one with uncommitted changes; it may hold another agent's work.

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
