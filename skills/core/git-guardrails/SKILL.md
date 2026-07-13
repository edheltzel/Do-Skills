---
name: git:guardrails
description: >-
  Install a Claude Code PreToolUse hook that blocks dangerous git commands (push, reset
  --hard, clean -fd, branch -D, checkout ./restore .) before they run. USE WHEN the user
  wants to prevent destructive git operations, add git safety hooks, or block git
  push/reset in Claude Code. NOT FOR the safe branch-to-merge workflow itself (use
  git-safe-pr-workflow) or setting up worktrees (use git-worktree). Confirm scope with the
  user before writing settings.
---

# Git Guardrails

Set up a PreToolUse hook that intercepts and blocks dangerous git commands before Claude executes them. When a command is blocked, Claude sees a message telling it that it does not have authority to run that command.

## What gets blocked

- `git push` (all variants including `--force`)
- `git reset --hard`
- `git clean -f` / `git clean -fd`
- `git branch -D`
- `git checkout .` / `git restore .`

## Boundary: push-blocking vs git-safe-pr-workflow

This hook blocks **all** `git push` by default. The git-safe-pr-workflow skill instead permits a push after an explicit request and then **verifies** it — it fetches the destination ref and compares object IDs to confirm the push landed. Those two positions conflict: with this hook installed as-is, that verified-push path can never run, because the push is rejected before it starts.

Resolve it deliberately, with the user, before installing:

- **Human-only pushes (default).** Keep the blanket `git push` block. Claude never pushes; a human runs every push by hand. git-safe-pr-workflow still drives commit, sync, and conflict work; only its final push step becomes a human action. Simplest and safest.
- **Narrow the block to protected branches.** Change the `git push` pattern to match only pushes to `main`/`master` (or your protected refs), leaving feature-branch pushes to git-safe-pr-workflow's verified path. Choose this when you want Claude to push feature branches under the workflow's verification.

Whichever you pick, say so to the user — don't install a blanket push block silently on a repo that relies on the verified-push path.

## Steps

### 1. Ask scope

Ask the user: install for **this project only** (`.claude/settings.json`) or **all projects** (`~/.claude/settings.json`)?

### 2. Copy the hook script

The bundled script is at [scripts/block-dangerous-git.sh](scripts/block-dangerous-git.sh). Copy it to the target location based on scope:

- **Project**: `.claude/hooks/block-dangerous-git.sh`
- **Global**: `~/.claude/hooks/block-dangerous-git.sh`

Make it executable with `chmod +x`.

### 3. Add hook to settings

Add to the appropriate settings file:

**Project** (`.claude/settings.json`):

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-dangerous-git.sh"
          }
        ]
      }
    ]
  }
}
```

**Global** (`~/.claude/settings.json`):

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/block-dangerous-git.sh"
          }
        ]
      }
    ]
  }
}
```

If the settings file already exists, merge the hook into the existing `hooks.PreToolUse` array — don't overwrite other settings.

### 4. Ask about customization

Ask whether the user wants to add or remove patterns from the blocked list. If they chose "narrow the block to protected branches" above, edit the `git push` pattern in the script now (e.g. match `git push .*(main|master)`). Edit the copied script accordingly.

### 5. Verify

Run a quick test:

```bash
echo '{"tool_input":{"command":"git push origin main"}}' | <path-to-script>
```

It should exit with code 2 and print a `BLOCKED` message to stderr.

Imported and adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT).
