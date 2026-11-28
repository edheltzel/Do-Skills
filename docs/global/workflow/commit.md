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

`do-commit` turns the current local changes into a Conventional Commit. It commits with `git add` / `git commit`.

It never pushes unless the mode or the user asks. `/do-commit` ends after the commit. `cp` (or `push`) publishes. `cpp` also opens a PR. `land` merges, and only when you say go.

On the push path, roborev reviews every commit locally before anything leaves the machine, when this repo uses it (its post-commit hook calls roborev, or `roborev repo list` shows the checkout). Real findings get fixed in new commits; false ones are commented and closed; three failing rounds stop for you. The skill's [Roborev procedure](https://github.com/edheltzel/Do-Skills/blob/master/skills/global/workflow/do-commit/references/procedure.md#roborev) owns the command details.

After roborev, No Mistakes runs only when this repo was already initialized (`git remote` lists `no-mistakes`, or `no-mistakes axi` shows this repo). The binary being installed is not enough. If initialized but the binary is missing or the gate cannot run, it reports a blocker without publishing. A repo that was never initialized skips the gate and uses `git push`, without asking to initialize No Mistakes or running `no-mistakes init`. The skill's [No Mistakes procedure](https://github.com/edheltzel/Do-Skills/blob/master/skills/global/workflow/do-commit/references/procedure.md#no-mistakes) owns the command details.

## Example

```
/do-commit commit the password reset form validation fix on the login page
```

## When to reach for it

Type `/do-commit`, or the agent reaches for it when you say commit, push, ship, or open a PR, and when another skill hands off to it with a mode.

Reach for it when local work should be recorded or published. For sync, conflicts, or undo, use [git-safe-pr-workflow](./git-safe-pr-workflow.md). For review comments, use [git-pr-review-triage](./git-pr-review-triage.md). Dependent PRs belong in [gh-stack](./gh-stack.md).

`/do-commit cp` is commit and push. `/do-commit cpp` also opens a PR. `/do-commit land` then runs `gh pr merge`. Land does not run because a caller asked.

## The gates

The first three gates always run, in order: understand the diff, draft a `type(scope): description` line, then verify the staged set before committing. The first line stays under 72 characters, imperative, with an optional body for why.

The push path adds three gates. Gate 4 passes when roborev passed for every commit about to be published, or roborev is not in use. Gate 5 confirms a real feature branch and follows the publication routing above. Gate 6 passes only on axi `checks-passed` or `passed` when the gate ran, or on upstream sync when No Mistakes is not in use. A parked `ask-user` gate is blocked, not a ship. `passed-with-skips` is reported, not treated as publication.

## Next

After a local commit, the next rung is `do-commit cp`. The other moves are `do-commit cpp`, or stop. After a verified push with a PR open, or after `cpp`, there is no menu: it starts [git-pr-babysit](./git-pr-babysit.md) on the PR, and babysit's menu ends the run. A push with no PR offers stop, or `do-commit cpp`. Land itself offers no menu.

`do-it` and `do-work` can call a mode with `mode:return-to-caller`. That skips the menu and returns a status plus the PR URL, or the commit SHA when there is no PR.

## It's working if

- A bare commit did not push.
- Roborev passed on every published commit before the push, when the repo uses it.
- The push path waited for `checks-passed`, `passed`, or upstream sync.
- A push with a PR went straight into the babysit watch.
- Nothing merged unless you said go.

## Where it fits

This is the ship stage. [work](../loop/work.md) and `do-debug` hand off here after a verified change. [it](../loop/it.md) calls `cpp` and skips this menu. After a push with a PR, it starts [git-pr-babysit](./git-pr-babysit.md), which waits for Pullfrog and CI. Fixes babysit finds come back here as `cp`, so roborev reviews them before they push. Review comments that arrive later go to [git-pr-review-triage](./git-pr-review-triage.md), which does not push; publishing the fixes comes back here.
