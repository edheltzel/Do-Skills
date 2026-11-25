---
name: do-regroup
description: Use when checking project status. Defaults to the current project; covers every active project on request. Surfaces work that is active, blocked, or stalled, grouped by project, then phase, then task, and always writes a dated markdown archive. Triggers include "regroup", "regroup all", "regroup everything", "all projects", "all open projects", "open projects", "just this project", "only this project", "check in", "status report", "status update", "just <project>".
---

# Regroup

A status check-in across the projects in scope. This skill is portable. Do not assume a harness, an agent framework, a ticket prefix, or a runtime. Read the source of truth the user named (a board, issues, notes, a repo, or a todo.txt file). If they did not name one, use the project files in the current workspace plus todo.txt (below) when it exists, and say which sources were read.

Read the previous regroup file of the same mode (and, for one project, the same project) in the `regroup/` directory when one exists. If `regroup/` has none, look in `regroup/archive/`, where `do-cleanup` moves older files. The all-projects reply and file say what changed since that file. Do not call other services to fill a gap the named source and the previous file do not already contain. If a fact is not there, say it is not in the source.

## todo.txt

Read only. Never edit `todo.txt` or `done.txt`, and never complete, archive, or reprioritize a task.

- **Files.** In all-projects mode, always start from `$HOME/todo.txt`, ignoring any exported `TODO_FILE` or `TODO_DIR`; use another file only when the user names it. Each open line tagged `@route` with `todo:<path>` points at a project's local list; read that file too, plus its sibling `done.txt`. A route is not a task: never report it as one. A done route means the project is finished or parked: list it under that heading without reading its file. A missing routed file: say so for that project. With tuxedo installed, read each list as `TODO_FILE="<list path>" DONE_FILE="<dir>/done.txt" tuxedo lsa --json`, quoted, with the exact absolute path of the list being read and its sibling `done.txt`: it returns the file and its `done.txt` parsed, and naming both stops an exported `TODO_FILE` or `DONE_FILE` from swapping in another list. Otherwise read the lines. Format and routing conventions: the `do-todo` skill, if installed.
- **Projects.** Each route is a project; its local list's tasks belong to it. In the global list, each `+project` tag is a project and a task with two tags appears under both. Untagged global tasks go under "No project". todo.txt has no phases. In one-project mode, read that project's routed list (or, inside the repo, `<repo root>/todo.txt`) plus global tasks tagged with its name.
- **Statuses.** Map each line, first match wins:
  - Starts with `x `: **done**, with its completion date.
  - Names a wait (`@waiting`, or "waiting on ..." in the text), or has a `dep:` whose `id:` task is not confirmed done in the lists read: **blocked** on that wait or task.
  - `t:` date still in the future: **backlogged** until that date.
  - No previous regroup file, or no task there with the same words (ignoring priority, dates, and tags): **not started**. Never stalled on a first run.
  - Same words, but the raw line changed (priority, `due:`, tags): **active**.
  - Otherwise (unchanged since the previous file): **stalled**.
- **Up next.** Priority `(A)`-`(Z)`, then the soonest `due:`. Call out an overdue `due:` in the task's sentence.
- **Last completed.** The newest completion dates across `todo.txt` and `done.txt`.
- **Percent.** todo.txt never states one.

In the regroup file, keep each todo.txt task's raw line so the next regroup can tell what changed.

## GitHub Projects board

Read a board when the user names one or the workspace docs (`AGENTS.md`, `README.md`) name one. Read only: never move cards, edit fields, or close issues.

- **Gather.** Fetch every item, not the 30-item default: `gh project item-list <num> --owner <owner> --format json --limit 1000`, then check `items` length equals `totalCount`; if it is short, raise `--limit` and fetch again. For recent completions, `gh issue list --state closed --json number,title,closedAt --limit 1000`. `do-gh-pm`'s Status recipe (`references/Status.md`), if installed, adds the rest of the Gather step, but override its smaller limits. Missing `project` scope: say so and skip the board; do not run `gh auth refresh`.
- **Projects and phases.** The board is the project; its Phase field gives the phases. No Phase field: say so and list tasks under the project.
- **Statuses.** Map each item, first match wins:
  - Done column or closed issue: **done**, with its close date.
  - A blocked label or field, or the item says what it waits on: **blocked**.
  - Backlog column: **backlogged**.
  - Ready or Todo column: **not started**.
  - In Progress: **active** on a first run, or when its column, fields, or issue activity changed since the previous regroup file; otherwise **stalled**.
- **Up next.** Ready items ordered as `do-gh-pm`'s Continue recipe orders them (status, then priority, then dependencies); without it, by the board's Priority field.
- **Percent.** Only a number a board field states. Closed/total issues per phase may go on the phase line, labelled as a count.

In the regroup file, keep each board item's number, column, and fields so the next regroup can tell what changed.

## Modes

Pick the mode from the words in the request. If the request names no mode, run one project.

- **One project** (default). Triggers: "regroup" or "status check-in" with no scope, "just this project", "only this project", "this project", "just <name>", "only <name>". "This project" is the project in the current workspace: its repo root. A name means that project. Run the one-project brief below and skip the full check-in. If the current workspace is not inside a project and no name was given, run all projects and say so.
- **All projects.** Only on explicit scope: "all projects", "all open projects", "open projects", "every project", "everything", "regroup all", "regroup everything". Run the full check-in in the sections from Statuses through The reply.

## Task refs

Every task line in the reply and the file starts with a ref, so the user can hand that task off without searching for it.

- **todo.txt.** `id:<slug>` when the line has an `id:` tag. Otherwise, for an open task, `<list>#<n>`, where `n` is the task's `n` in the `todo` array of `tuxedo lsa --json` on that list (its position among non-blank lines). A done task without an `id:`, in either file, gets no number: quote its text. `<list>` is the project tag for a repo's local list, `~` for `$HOME/todo.txt`, and the list's absolute path for any other list the user named or when two read lists share a project tag. A `#<n>` ref is valid only until that list changes: say so once in the reply when any appears.
- **GitHub board.** The issue as `#<number>`, or `<owner>/<repo>#<number>` when the board spans repos. A draft item has no number: quote its title.
- **Any other source.** Its own ID when it has one; otherwise the task name in quotes.

## Statuses

Mark every task with one of these:

- **Active.** Work is moving, or the task changed since the previous regroup file.
- **Blocked.** It cannot move until a named wait is resolved. The task line says what it is waiting on.
- **Stalled.** It is still open, it is not blocked on a named wait, and it has not changed since the previous regroup file. If there is no earlier regroup file, do not call anything stalled. Say there is no earlier check-in to compare.
- **Not started.** It exists and nobody has begun it. Say "not started" in those words.
- **Backlogged.** It is recorded and explicitly deferred. Say "backlogged" in those words.
- **Done.** The task line says what was completed.

A project is active only when at least one of its tasks is active. Do not count a project that only has blocked, stalled, not-started, backlogged, or done work.

## Shape

Group by project. Under each project, list its phases. Under each phase, list its tasks. If a project has no phases, say so and list the tasks under the project.
Per project, show the newest file in `docs/plans/handoffs/` (filename date, then mtime) as its resume point, including the one-project brief. Read only, same as the rest of this skill.

Each task shows:

- its ref (Task refs above)
- its name
- its status
- percent complete, only when the source states a number. If it does not, write "percent not stated". Never invent a percent.
- one short sentence: what it is waiting on, what it is doing, or what was completed

## Open decisions

After the project list, add a short section for decisions the previous regroup file left open that this source still does not resolve, each naming the ref of the task it unblocks. One decision at a time in the reply when someone must choose. If the previous file named none, say there is no open decision on record. Do not invent a decision.

## The file

Always write two markdown files with the same stem. The chat reply never replaces them.

Filename: `YYYY-MM-DD-regroup-status-check.md` for the agent version, and `YYYY-MM-DD-regroup-status-check.human.md` for the human version. The date is the date of this request. If the user names a date, use that date. Do not use a later "today" once the request date is known.

The human version follows the GAP plans contract: a diagram or table first, then what changed, what is blocked, and what is next, on one screen. It carries the same projects and status as the agent version and no raw task lines.

Put the file in a `regroup/` directory in the workspace the user named. If they did not name one, use the current workspace. Create `regroup/` if it is missing.

Do not overwrite or delete an older regroup file. That archive is how someone later asks what a past check-in said. Only `do-cleanup` may move an older file, and only into `regroup/archive/`. If today's filename already exists in `regroup/` or `regroup/archive/`, keep the earlier file and write this one with the next free numeric suffix across both folders (`-2`, then `-3`), for the agent and human versions alike.

The file contains, in this order:

1. A title, the request date, a `Scope:` line (`all projects` or the project name), and the source that was read.
2. Counts of active projects, blocked tasks, and stalled tasks.
3. What changed since the previous regroup file, or a line that there is no earlier file.
4. Every project, then its phases, then its tasks, in the shape above.
5. Decisions still open from the previous file.

## The reply

Count active projects before writing the reply.

- Five or fewer active projects: the reply is the full synopsis, the same substance as the file.
- More than five active projects: the reply lists only the most recently worked-on projects, one or two lines each, and points at the markdown file. Still write the full file.

Lead with the counts, then what changed since the last file. In the short form, still name every blocked task and every stalled task, with its ref, even when their project is not in the brief list.

End the reply with the hand-off list (One-project brief, below) for every project with open work: one bold project line, then its items, numbered straight through the whole reply so each number is unique. A task that belongs to several projects gets one verb and one number, under its first project; the other projects point to that number.

Do not start or change the work. The only files this skill writes are the new regroup file and its human version.

## One-project brief

Keep it short and scannable. No phase tree, no counts, no percents. The reply is one header line and one hand-off list:

```
**doskills**: last done `id:regroup-modes` Split regroup modes (2026-11-24)

1. **Do** `id:regroup-ids` (A) Link regroup items to task IDs
2. **Do** `doskills#9` (B) Pages cutover. Overdue: due 2026-11-20
3. **Answer** `doskills#10` Pick the regroup layout. Which layout: A, B or C?
4. **Open** `doskills#12` Tidy do-make-logo references. Stalled
5. **Wait** `doskills#11` do-gh-pm Continue reads regroup. Blocked on `id:regroup-ids`
6. **Later** `id:font-audit` do-make-font licence check. Backlogged until 2026-12-01

Say a number to start it.
```

- **Header.** The project name, then the most recently done task or tasks with ref and date. If the source does not say what finished last, write "last done not in source". Add the resume-point handoff file from Shape when one exists.
- **Hand-off list.** Each open task once, as `<n>. **<Verb>** <ref> (<priority>) <name>`, then a short sentence only when it adds something: overdue, active, stalled, or what it waits on. Each open task gets exactly one verb: the first of these rules that fits it.
  1. **Later.** Backlogged, with the date or reason.
  2. **Answer.** Blocked on a question or decision the user can settle. Write the question after the task name.
  3. **Wait.** Every other blocked task: on another task (`dep:`), on someone other than the user, or on an unstated reason. Name what it waits on, with that task's ref when it has one, or write "reason not in source".
  4. **Do.** Ready, and among the one to three tasks the source explicitly marks as next (a priority, a "next" label, a plan step, an in-progress flag), ranked by priority, then soonest `due:`. Display order alone is not a priority. If the source gives no cue, put "Up next not specified" above the list and use no Do lines.
  5. **Open.** Every other ready task.

  List them in the order Do, Answer, Open, Wait, Later.
- **Close.** End with "Say a number to start it." When the user picks one, that is a new request: this skill still does not start the work. If nothing is open, write "Nothing remaining" and drop the closing line.

If the source does not say what finished last or what comes next, say that instead of guessing.

Still write both files, with the same no-overwrite rule. Filename: `YYYY-MM-DD-regroup-<project-slug>.md` and `YYYY-MM-DD-regroup-<project-slug>.human.md` in the same `regroup/` directory. The agent version holds a title, the request date, the source that was read, the header line, the same hand-off list, and each todo.txt task's raw line. The human version holds the header line and the same hand-off list, short, with a table first.
