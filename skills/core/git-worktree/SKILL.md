---
name: git:worktree
description: "Create, remove, and list git worktrees in a standardized location — detects existing isolation first, prefers the harness's native worktree tool, and attaches to a new branch or an existing branch/PR/commit"
alwaysAllow: ["Bash"]
---

# Git Worktree Management

Detection, native-tool preference, and the two isolation modes are imported/adapted from Every's
Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT).

Ensure work happens in an isolated worktree without disturbing the user's main checkout. Worktrees
live in `~/.git-worktrees/<repo>/<branch>`, keeping them out of the user's project directories.

Most coding harnesses now create a worktree by default at session start, so the common case is that
**isolation already exists** — detect that first and do not create a redundant one. Order of
operations: **detect existing isolation → prefer a native worktree tool → fall back to plain git.**
Never create a worktree the harness cannot see.

**Two modes, set by the need:**

- **New work (default).** No specific ref named — create a fresh branch from a base (trunk).
- **Isolate an existing ref.** A ref is named to work on in isolation — a PR head, an existing
  branch, or a commit. Attach the worktree to that ref instead of creating a new branch. One hard git
  rule governs this mode: **a branch can be checked out in only one worktree at a time.** If the named
  ref is already checked out somewhere (most commonly because it is the current branch in the primary
  checkout), do **not** create a second worktree for it — report that it is already checked out at
  `<path>` and let the caller act (work there in place; or, only if a clean separate tree is
  essential, create a *detached* worktree at the same commit). Never put one branch in two worktrees.

## Determining Context

Before any operation, determine the repository name:

```bash
repo=$(basename "$(git rev-parse --show-toplevel)")
```

The worktree base directory is always `~/.git-worktrees/$repo/`.

## Step 0: Detect existing isolation

Before creating anything, check whether the current directory is already a linked worktree. Compare
the **resolved absolute** git dir against the **resolved absolute** common git dir — resolve each to
an absolute path first and compare those, not the raw `git rev-parse` output. Git mixes absolute and
relative forms depending on the current directory (from a subdirectory of a normal checkout,
`--git-dir` comes back absolute while `--git-common-dir` may be relative), so a raw string compare
yields a false "already isolated":

```bash
git rev-parse --absolute-git-dir                     # absolute git dir for this worktree
(cd "$(git rev-parse --git-common-dir)" && pwd -P)   # absolute shared (common) git dir
```

If the two absolute paths are **equal**, this is a normal checkout — continue to Step 1.

If they **differ**, you are in a linked worktree *or* a submodule. Distinguish them:

```bash
git rev-parse --show-superproject-working-tree
```

- **Non-empty** output → you are in a submodule; treat it as a normal checkout and continue to Step 1.
- **Empty** output → you are **already in an isolated worktree**. Report the worktree path
  (`git rev-parse --show-toplevel`) and current branch. Do not create another worktree — a
  worktree-from-worktree lands in the wrong tree and is invisible to the harness that made the current
  one. Then **work in place**: in new-work mode, continue here; in isolate-an-existing-ref mode, check
  that ref out here (unless it is already the current branch) rather than nesting a worktree.

## Step 1: Prefer the harness's native worktree tool

If the harness provides a native worktree primitive — an `EnterWorktree` / `WorktreeCreate` tool, a
`/worktree` command, or a `--worktree` flag — use it and stop. Native tools place, track, and clean
up the worktree so the harness can manage it. A behind-the-back `git worktree add` creates phantom
state the harness cannot see, navigate to, or clean up.

## Step 2: Git fallback

Only when there is no native tool **and** Step 0 found no existing isolation. Create the worktree
under the standardized location, and pick a meaningful branch name from the work description (e.g.
`feat/login`, `fix/email-validation`) — avoid opaque auto-generated names.

```bash
repo=$(basename "$(git rev-parse --show-toplevel)")
branch="<branch-name>"
mkdir -p "$HOME/.git-worktrees/$repo"
dir="$HOME/.git-worktrees/$repo/$branch"
```

Best-effort refresh the base branch without disturbing the current checkout:
`git fetch origin <from-branch>`. This is **non-fatal** — if it errors (no `origin` remote, a
differently-named remote, or a local-only branch), continue and use the local ref.

Then create the worktree — the command depends on the mode:

- **New work:** create a new branch from the base.

  ```bash
  git worktree add -b "$branch" "$dir" "origin/<from-branch>"   # use local <from-branch> if origin/<from-branch> is absent
  ```

  If the branch already exists, attach to it instead: `git worktree add "$dir" "$branch"`.

- **Isolate an existing ref:** attach to the ref instead of branching.
  - Existing branch or tag: `git worktree add "$dir" <target-ref>`.
  - A **PR** — check it out **on a local branch** (never a detached `FETCH_HEAD`, which orphans the
    fix loop's commits instead of updating the PR):
    ```bash
    git fetch origin pull/<n>/head:pr-<n>
    git worktree add "$HOME/.git-worktrees/$repo/pr-<n>" pr-<n>
    ```
    To get push-tracking back to the PR (fork-safe), create the worktree detached first
    (`git worktree add --detach "$dir"`), then `cd` in and run `gh pr checkout <n>`.
  - If git reports the ref is already checked out elsewhere, follow the already-checked-out rule under
    **Two modes** — do not force a second worktree.

Switch into it: `cd "$dir"`.

After creation, **always prominently display the worktree path** so the user can open a new session
pointing to it:

> Worktree created at: `~/.git-worktrees/<repo>/<branch>`

**Blocking gate on failure.** If `git worktree add` fails with a sandbox or permission error, the
requested isolation could not be created. This needs a **blocking** user decision before touching the
current checkout — do not silently continue there (the user chose isolation specifically to avoid it).
Report the failure and ask the user whether to work in the current checkout or stop and resolve the
permission issue. Only work in the current checkout on explicit confirmation, and do not retry
alternative paths automatically.

**In-repo fallback (only when a harness forces it).** If the harness cannot place a worktree outside
the repo and provides no native tool, fall back to an in-repo `.worktrees/<branch>` at the repo root
— but first guard against committing it: check `git check-ignore -q .worktrees/` (**with the trailing
slash**, so a directory-only `.worktrees/` rule is honored before the directory exists), and if it is
not ignored, add a `.worktrees/` line to `.gitignore`. Run from the repo root
(`cd "$(git rev-parse --show-toplevel)"`) so the paths land at the root, not a subdirectory. Prefer
`~/.git-worktrees/` whenever the environment allows it.

## Other worktree operations

Use `git` directly — no wrapper is needed:

### Remove

```bash
repo=$(basename "$(git rev-parse --show-toplevel)")
git worktree remove "$HOME/.git-worktrees/$repo/<branch>"
```

If the worktree has uncommitted changes, warn the user before using `--force`. `cd` out of a worktree
before removing it.

### List

```bash
git worktree list
```

Note which worktree is the main working tree vs. linked worktrees.

### Prune

Clean up stale worktree references (e.g., after manually deleting a worktree directory):

```bash
git worktree prune
```

## Guidelines

- Default to **create (new work)** if the user's intent is ambiguous.
- One branch, one worktree — never check the same branch out in two worktrees.
- Never use `--force` without explicit user confirmation.
- Create a worktree only when you are **not** already isolated (Step 0) and you need a separate
  workspace — reviewing a PR while keeping the current checkout free, or running features in parallel.
  Do not create one for single-task work that can happen on a branch in the current checkout.
- After creating a worktree, remind the user they can open a new session with that path as the working
  directory.

## Troubleshooting

- **"Worktree already exists"**: the path is in use. Switch to it or `git worktree remove` it before
  recreating.
- **"Cannot remove worktree: it is the current worktree"**: `cd` out first, then `git worktree remove`.
