# Glossary

Short definitions for terms used across these docs. To get set up, see [Install](./install.md).

## Skill

An instructions file, `SKILL.md`, that your coding agent reads to do one job well.

## Agent harness

The app that runs your coding agent, such as Claude Code, Codex, Pi, Cursor, or Empryo. Skills need one.

## Scope

Where a skill is installed. **Global** skills help in any repo and are installed once per machine with `-g`. **Project** skills fit one stack and are installed inside the project that uses it.

## Group

A folder of related skills inside a scope, such as `loop` under global or `frontend` under project.

## LFG

Let's go. The idea-to-PR loop: plan, build, ship, then watch the pull request. `/do-it` runs it. See [LFG](../loop/it.md).

## /do-it

The command that runs LFG end to end without menus. It stops only for decisions that are yours, and it never merges.

## Plan approval

The step where you review a plan before any code is written. You approve it, or annotate it and send it back for revision. `/do-it` skips this step. See [plan](../loop/plan.md).

## Plannotator

An optional tool where you review and annotate a plan or an HTML file. Skills open it when it is installed.

## Empryo

An optional agent harness. When a plan is approved inside Empryo, the plan goes to Empryo's plan mode.

## Pull request

A GitHub request to merge your branch into another branch. Others can review it and CI runs on it.

## PR babysit

`do-git-pr-babysit` watches your pull request through CI and review until it is ready to merge. It never merges without your go. See [PR Babysit](../workflow/git-pr-babysit.md).

## do-commit modes

`do-commit` always makes a Conventional Commit. The mode decides how far it goes. See [Commit](../workflow/commit.md).

- `commit`: commit only. This is the default.
- `cp`: commit and push.
- `cpp`: commit, push, and open a pull request.
- `land`: merge the pull request. It runs only when you say go.

## GAP

A separate tool that installs skills by name. This repo lists its skill names in `gap-utility.toml` for GAP's `gap add` command and distro selection. You do not need GAP to use these skills.
