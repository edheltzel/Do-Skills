---
name: do-commit-push
description: commit and push all local changes to remote repo
disable-model-invocation: true
---

# Commit and Push

Commit all local changes following Conventional Commits format and push to remote.

## GitButler

GitButler is in use when `command -v but` succeeds **and** `but status` exits 0. Do not run `but setup`. If either check fails, use the git commands in this skill.

When GitButler is in use:
- Inspect with `but diff`. `git log --oneline` is fine (read-only).
- Commit with `but commit -b <feature-branch> -m "<msg>"` (omit IDs to take all uncommitted changes). Take `<feature-branch>` from `but status`, never `gitbutler/workspace`.
- Push with `but push <feature-branch>`. Never `git add`, `git commit`, `git push`, or `git stash`.


## Gates

Complete **in order**. Do not run the next action until the **Pass** condition is satisfied (use command output as evidence, not memory).

1. **Diff understood** — **Pass when:** `git status`/`git diff`/`git diff --cached`, **or** `but diff` if GitButler is in use, match your one-sentence description of what changed (or you recorded that there is nothing to commit).
2. **Commit line chosen** — **Pass when:** You have a draft first line `type(scope): description` (or `type: description` if omitting scope) that matches the change set you intend to ship.
3. **Contents match intent** — **Pass when:** After `git add`, `git diff --cached --stat` shows only the paths you meant; **or** if GitButler, the IDs you will pass to `but commit` (or all uncommitted, if omitting IDs) match that set.
4. **Push target confirmed** — **Pass when:** Current feature branch and remote are the ones you intend (`git branch -vv` / `git remote -v`, **or** `but status` if GitButler); then push.
5. **Remote caught up** — **Pass when:** `git status -sb` shows the branch up to date with upstream, **or** `but status` shows the branch pushed, with no unexpected leftover commits for this task.

## Step 1: Gather Context

Run these commands in parallel to understand the changes:

```bash
git status
git diff
git diff --cached
git log --oneline -10
```

If GitButler is in use, use `but diff` instead of the `git status`/`git diff`/`git diff --cached` trio. Keep `git log --oneline -10`.

## Step 2: Analyze Changes

Review the changes and determine:
- **Type**: What kind of change is this?
  - `feat` - New feature or capability
  - `fix` - Bug fix
  - `docs` - Documentation only
  - `refactor` - Code restructure without behavior change
  - `test` - Adding or updating tests
  - `chore` - Maintenance, dependency updates
  - `perf` - Performance improvement
  - `ci` - CI/CD changes

- **Scope**: Which component is affected?
  - Examine the changed files and determine the appropriate scope
  - Use consistent scope names within the project (check `git log` for patterns)
  - *(omit scope for cross-cutting changes)*

- **Breaking**: Does this break backward compatibility? If yes, add **!** after scope.

## Step 3: Write Commit Message

Format:
```
type(scope): description

[optional body explaining why, not what]

[optional footer with issue references]
```

Rules:
- Use imperative mood: "add feature" not "added feature"
- Keep first line under 72 characters
- Focus on *why* in the body, the diff shows *what*
- Reference issues: `Closes #123` or `Fixes #456`

## Step 4: Stage, Commit, and Push


Satisfy **Gates** 1–3 before committing; satisfy **Gate** 4 before pushing; satisfy **Gate** 5 after push.

If GitButler is in use:

```bash
but commit -b <feature-branch> -m "$(cat <<'EOF'
type(scope): description

Optional body explaining the motivation.

Closes #123
EOF
)"
but push <feature-branch>
```

Otherwise:

```bash
# Stage all changes (or selectively stage)
git add -A

# Gate 3: confirm staged set before committing
git diff --cached --stat

# Commit with message (use HEREDOC for multi-line)
git commit -m "$(cat <<'EOF'
type(scope): description

Optional body explaining the motivation.

Closes #123
EOF
)"

# Push to remote
git push
```

## Examples

```bash
# Simple feature
git commit -m "feat(api): add pagination support to list endpoints"

# Bug fix with body
git commit -m "$(cat <<'EOF'
fix(auth): handle token expiration during long requests

The previous implementation did not account for tokens expiring
during the processing of long-running requests.

Fixes #42
EOF
)"

# Breaking change
git commit -m "$(cat <<'EOF'
feat!(api): change response format for user endpoints

BREAKING CHANGE: The `status` field is now an object with `state` and
`message` properties instead of a plain string.
EOF
)"
```

Optionally append a co-author or footer trailer per project convention (e.g. a `Co-Authored-By:` line or a tool-attribution footer). Omit it when the project has no such convention.

## Step 5: Verify

After pushing, satisfy **Gate 5**: `git status` and `git status -sb`, **or** `but status` if GitButler is in use. Confirm a clean tree and upstream sync (or an expected ahead/behind you can explain).
