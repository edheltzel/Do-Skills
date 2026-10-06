---
name: do-regroup
description: Use when checking status across active projects. Surfaces work that is active, blocked, or stalled, grouped by project, then phase, then task, and always writes a dated markdown archive.
---

# Regroup

A status check-in across the projects in scope. This skill is portable. Do not assume a harness, an agent framework, a ticket prefix, or a runtime. Read the source of truth the user named (a board, issues, notes, or a repo). If they did not name one, use the project files in the current workspace and say that is the source.

Read the previous regroup file in the same `regroup/` directory when one exists. The reply and the new file say what changed since that file. Do not call other services to fill a gap the named source and the previous file do not already contain. If a fact is not there, say it is not in the source.

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

Each task shows:

- its name
- its status
- percent complete, only when the source states a number. If it does not, write "percent not stated". Never invent a percent.
- one short sentence: what it is waiting on, what it is doing, or what was completed

## Open decisions

After the project list, add a short section for decisions the previous regroup file left open that this source still does not resolve. One decision at a time in the reply when someone must choose. If the previous file named none, say there is no open decision on record. Do not invent a decision.

## The file

Always write a markdown file. The chat reply never replaces it.

Filename: `YYYY-MM-DD-regroup-status-check.md`. The date is the date of this request. If the user names a date, use that date. Do not use a later "today" once the request date is known.

Put the file in a `regroup/` directory in the workspace the user named. If they did not name one, use the current workspace. Create `regroup/` if it is missing.

Do not overwrite or delete an older regroup file. That archive is how someone later asks what a past check-in said. If today's filename already exists, keep the earlier file and write this one with a short numeric suffix (`-2`, then `-3`).

The file contains, in this order:

1. A title, the request date, and the source that was read.
2. Counts of active projects, blocked tasks, and stalled tasks.
3. What changed since the previous regroup file, or a line that there is no earlier file.
4. Every project, then its phases, then its tasks, in the shape above.
5. Decisions still open from the previous file.

## The reply

Count active projects before writing the reply.

- Five or fewer active projects: the reply is the full synopsis, the same substance as the file.
- More than five active projects: the reply lists only the most recently worked-on projects, one or two lines each, and points at the markdown file. Still write the full file.

Lead with the counts, then what changed since the last file. In the short form, still name every blocked task and every stalled task, even when their project is not in the brief list.

Do not start or change the work. The only file this skill writes is the new regroup file.
