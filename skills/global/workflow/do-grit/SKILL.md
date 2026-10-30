---
name: do-grit
description: >-
  Opt-in use of the grit CLI (GitButler's Rust Git client) for read-oriented,
  JSON-safe inspection (status, log, diff) when grit is installed and the user or
  repo asks for it. Covers the install note, generating the vendor skill, and the
  JSON/exit-code contract. NOT the default git tool: make changes with `git` or
  `but` via do-commit. NOT FOR GitButler workspace commits, lanes or stacks (`but`
  via do-commit / do-gh-stack), conflicts or undo (do-git-safe-pr-workflow),
  worktrees (do-git-worktree).
---

# Grit (opt-in)

Grit is a Git client and library written in Rust by GitButler (pre-1.0). It uses the same `.git`, pack format and remotes as git, so grit and git can be mixed on one branch. Docs: https://grit-scm.com/docs/skill/

**grit ≠ but.** Grit is a git client/rewrite, not a GitButler client. It works alongside `but` and does not replace it. Its only documented GitButler interop is the commit `change-id` header.

## Gate
1. Use grit only if `command -v grit` succeeds AND the user or the repo contract asked for it. Otherwise use do-commit's normal `git` / `but` path.
2. GitButler first: if `command -v but` succeeds and `but status` exits 0, `but` owns commit, push, lanes and stacks. Never `grit commit` there; it refuses on `gitbutler/workspace` (exit 1, `kind: gitbutler_workspace`).
3. Do not install grit yourself. If the user asks, the documented install is `curl -fsSL https://grit-scm.com/install | sh` (macOS/Linux, installs to `~/.local/bin`, needs glibc 2.34+). The user runs it.

## Vendor skill
Generate it per machine from the installed binary; never hand-edit it and never commit it to DoSkills:
`mkdir -p .agents/skills/grit && grit skill > .agents/skills/grit/SKILL.md`
It is version-stamped. Regenerate after every `grit update`. Read it for recipes.

## Rules
- Prefer read-only verbs (status, log, diff, show) and pass `--json` whenever an agent reads the output. Branch on the error `kind`, not the message text.
- Changes go through `git` or `but` (do-commit). Do not use `grit commit` as the default change path.
- If the user explicitly asks for a grit commit outside a GitButler workspace: `grit commit` auto-stages everything, including untracked files. Use `--staged` or `--hunks <ids>` instead, Conventional Commit message per do-commit.
- Change ids: grit writes a `change-id` header by default; `grit.changeIds=false` keeps commits byte-identical to git. Do not change this setting in shared repos without the captain's call.
- Stay non-interactive: run `grit auth` beforehand; for SSH set `GIT_SSH_COMMAND='ssh -o BatchMode=yes'`.
- Exit codes: 0 ok, 1 fail, 2 usage, 128 remote unreadable or ff-only refused, 129 bad pattern, 130 interrupted clone.
