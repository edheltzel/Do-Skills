---
name: do-commit
description: Commit all local changes following Conventional Commits format
disable-model-invocation: true
---

# Commit

Commit all local changes following Conventional Commits format.

## Gates

Complete **in order**. Do not run the next action until the **Pass** condition is satisfied (use command output as evidence, not memory).

1. **Diff understood** — **Pass when:** Outputs from `git status`, `git diff`, and `git diff --cached` are consistent with your one-sentence description of what changed (or you recorded that there is nothing to commit).
2. **Commit line chosen** — **Pass when:** You have a draft first line `type(scope): description` (or `type: description` if omitting scope) that matches the change set you intend to commit.
3. **Staging matches intent** — **Pass when:** After `git add`, `git diff --cached --stat` (and spot-check `git diff --cached` if needed) shows only the paths you meant to include; adjust staging before committing if not.

## Step 1: Gather Context

Run these commands in parallel to understand the changes:

```bash
# See all untracked and modified files
git status

# See staged and unstaged changes
git diff
git diff --cached

# See recent commit messages for style reference
git log --oneline -10
```

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

## Step 4: Stage and Commit

Satisfy **Gates** 1–3 before committing.

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
