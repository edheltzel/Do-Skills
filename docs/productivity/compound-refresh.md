# Compound Refresh

Quickstart:

```bash
npx skills add edheltzel/skills --skill=compound-refresh
```

```bash
npx skills update compound-refresh
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/productivity/compound-refresh)

Imported/adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT).

## What it does

`compound-refresh` is the librarian for `docs/solutions/` — the folder where
`compound` accumulates learnings from solved problems. It re-reads each learning
against the *current* codebase and assigns one of five verdicts: **Keep**,
**Update**, **Consolidate**, **Replace**, or **Delete** (or marks a doc stale
when the right call is genuinely ambiguous). It audits the library against
reality and against itself, never the reverse: when a doc and the code disagree,
the doc is what changes — this skill fixes documentation accuracy, not code.

Its signature move is looking at the whole set at once. Beyond checking each doc
in isolation, it runs a document-set analysis across the library — detecting
overlap, spotting when a newer doc supersedes an older one, picking the one
canonical doc per topic, applying a retrieval-value test before letting two docs
stay separate, and flagging outright contradictions between docs. Redundant docs
are the real danger: two docs saying the same thing today will say different
things tomorrow.

## When to reach for it

Type `/compound-refresh`, or the agent reaches for it automatically when a task
fits.

Reach for it when the code has moved under `docs/solutions/` and you want the
library trustworthy again — a stale-doc sweep, a suspicion that learnings have
drifted, overlapping docs that have crept in, or a targeted audit of one module's
learnings. To *capture* a freshly solved problem rather than audit old ones, use
`compound` instead. For general refactoring,
debugging, or code review, this isn't the tool unless `docs/solutions/` is the
explicit target.

## Prerequisites

A populated `docs/solutions/` — the library that
[compound](../productivity/compound.md) writes into. With nothing to audit, the
skill reports an empty library and points you at `compound` to start building one.

## Five verdicts, one document set

The unit of the skill is the **verdict**. Every candidate doc gets exactly one:
Keep leaves it untouched, Update fixes drifted references while the solution
still holds, Consolidate merges overlapping docs into a canonical one, Replace
writes a trustworthy successor and deletes the misleading original, Delete
removes what's obsolete (git history is the archive — there is no `_archived/`).
The sharpest line is Update vs Replace: moved paths and broken links are an
Update; a solution that now *conflicts* with the code is a Replace, because the
learning is actively misleading. When you catch yourself rewriting the solution
section, that was never an Update.

The other half is the library view. A single orchestrator investigates learnings
first (the primary evidence), then the pattern docs derived from them, then steps
back to judge the set as a whole — because a stale learning can make a pattern
look more valid than it is, and two correct-but-overlapping docs will eventually
drift into contradiction.

## Boundaries it keeps

Two things this skill deliberately does **not** do. It never edits the domain
vocabulary: terms it surfaces during an audit are handed to
[domain-modeling](../core/domain-modeling.md) by name, which owns the project's
glossary and its decisions in `docs/adr/`. And it never edits your `AGENTS.md` or
`CLAUDE.md` — if the knowledge store isn't discoverable, the report *suggests*
mentioning `docs/solutions/`, but the edit is always yours to make.

## It's working if

- Every processed doc appears in the report with a verdict and its evidence, and
  Keep outcomes are listed without any file churn.
- Overlapping or contradictory docs get named as pairs, not just individually.
- Ambiguous calls are marked stale rather than guessed at.
- The library gets smaller and sharper over time, not just larger.

## Where it fits

Periodic maintenance, not a one-shot. [compound](../productivity/compound.md)
runs after each solved problem and grows the library; `compound-refresh` is the
counterweight you run occasionally to keep it lean and accurate as the codebase
moves. It hands vocabulary to [domain-modeling](../core/domain-modeling.md), and
commits its changes through the repo's normal git flow —
[git:worktree](../core/git-worktree.md) and [task-to-pr](../core/task-to-pr.md).
