# Git Guardrails

Quickstart:

```bash
npx skills add edheltzel/skills --skill=git-guardrails
```

```bash
npx skills update git-guardrails
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/git-guardrails)

## What it does

`git-guardrails` installs a Claude Code **PreToolUse hook** that blocks dangerous git commands
— `git push`, `reset --hard`, `clean -fd`, `branch -D`, `checkout .` / `restore .` — before
they run. When a command matches, the hook exits non-zero and Claude sees a message saying it
has no authority to run it. The defining fact is that this is enforcement at the harness level,
not a guideline: the block happens whether or not the model "decides" to respect it.

## When to reach for it

Type `/git-guardrails`, or the agent reaches for it when you want to prevent destructive git
operations, add git safety hooks, or block `git push`/`reset` in Claude Code. It confirms
scope (this project vs. all projects) before writing any settings.

Reach for it to install a hard stop. For the *workflow* that keeps `main` clean through safe,
reversible operations, use [git-safe-pr-workflow](../core/git-safe-pr-workflow.md); for
setting up worktrees, use [git-worktree](../core/git-worktree.md).

## The push-block boundary

The one decision the skill forces you to make up front: its default blocks **all** `git push`,
which directly conflicts with [git-safe-pr-workflow](../core/git-safe-pr-workflow.md)'s
verified-push path (that skill permits an explicit push and then fetches the destination ref to
confirm it landed). With the blanket block installed, that verified push can never run. So the
skill makes you choose — keep **human-only pushes** (Claude never pushes; a human runs every
push by hand), or **narrow the block to protected branches** (`main`/`master`) and let
git-safe-pr-workflow's verified path push feature branches. It won't install a silent blanket
block on a repo that relies on verified pushes.

## Where it fits

A run-once setup skill that sits *beneath* the git workflow skills as a safety floor:
[git-safe-pr-workflow](../core/git-safe-pr-workflow.md) drives the branch-to-merge lifecycle,
[git-worktree](../core/git-worktree.md) sets up where branches live, and git-guardrails is the
harness-level backstop that refuses the destructive commands regardless. Imported and adapted
from Matt Pocock's skills (github.com/mattpocock/skills, MIT).
