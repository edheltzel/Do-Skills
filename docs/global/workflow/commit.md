# Commit

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-commit
```

```bash
npx skills update do-commit
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/global/workflow/do-commit)

## What it does

`do-commit` turns the current local changes into a Conventional Commit. If `but` is on PATH and `but status` succeeds, it commits with `but commit` instead of `git add` / `git commit`. Otherwise it keeps the git commands.

It never pushes unless the mode or the user asks. `/do-commit` ends after the commit. `cp` (or `push`) publishes. `cpp` also opens a PR. `land` merges, and only when you say go.

On the push path, No Mistakes runs only when this repo was already initialized (`git remote` lists `no-mistakes`, or `no-mistakes axi` shows this repo). The binary being installed is not enough. If initialized but the binary is missing or the gate cannot run, it reports a blocker without publishing. A repo that was never initialized skips the gate and uses `but push` or `git push`, without asking to initialize No Mistakes or running `no-mistakes init`. The skill's [No Mistakes procedure](https://github.com/edheltzel/Do-Skills/blob/master/skills/global/workflow/do-commit/references/procedure.md#no-mistakes) owns the command details.

## When to reach for it

Type `/do-commit`, or the agent reaches for it when you say commit, push, ship, or open a PR, and when another skill hands off to it with a mode.

Reach for it when local work should be recorded or published. For sync, conflicts, or undo, use [git-safe-pr-workflow](./git-safe-pr-workflow.md). For review comments, use [git-pr-review-triage](./git-pr-review-triage.md). Dependent PRs belong in [gh-stack](./gh-stack.md).

`/do-commit cp` is commit and push. `/do-commit cpp` also opens a PR. `/do-commit land` then runs `but land` (or `gh pr merge` when GitButler is not in use or `but land` is rejected). Land does not run because a caller asked.

## The gates

The first three gates always run, in order: understand the diff, draft a `type(scope): description` line, then verify the staged set before committing. The first line stays under 72 characters, imperative, with an optional body for why.

The push path adds two gates. Gate 4 confirms a real feature branch and follows the publication routing above. Gate 5 passes only on axi `checks-passed` or `passed` when the gate ran, or on upstream sync when No Mistakes is not in use. A parked `ask-user` gate is blocked, not a ship. `passed-with-skips` is reported, not treated as publication.

## Next

After a local commit, the next rung is `do-commit cp`. The other moves are `do-commit cpp`, or stop. After a verified push or PR, the next rung is stop. The other moves are triage when review comments land, or `do-commit land` when you say go. Land itself offers no menu.

`do-it` and `do-work` can call a mode with `mode:return-to-caller`. That skips the menu and returns a status plus the PR URL, or the commit SHA when there is no PR.

## It's working if

- A bare commit did not push.
- The push path waited for `checks-passed`, `passed`, or upstream sync.
- Nothing merged unless you said go.

## Where it fits

This is the ship stage. [work](./work.md) and `do-debug` hand off here after a verified change. [it](./it.md) calls `cpp` and skips this menu. Review comments that arrive later go to [git-pr-review-triage](./git-pr-review-triage.md), which does not push; publishing the fixes comes back here.
