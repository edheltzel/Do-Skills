# Workflow

Workspace design and change delivery - interviews, commits, issues, PRs, specs, and draft review.

## Installation

For any coding agent that supports [Agent Skills](https://agentskills.io):

```bash
npx skills add edheltzel/Do-Skills
```

Install one skill by exact name (`icm-grill` is unprefixed; the rest use `do-`):

```bash
npx skills add edheltzel/Do-Skills --skill=<skill-name>
```

## Skills

| Skill | Description |
|-------|-------------|
| [`do-commit`](./do-commit/) | Commit all local changes following Conventional Commits format |
| [`do-commit-push`](./do-commit-push/) | commit and push all local changes to remote repo. |
| [`do-gh-pm`](./do-gh-pm/) | GitHub Projects management via gh CLI — creating projects, managing items/fields, plus opinionated PM recipes — board bootstrap, Epic→Feature→Task issue hierarchy with sub-issue linking, label policy, running a plan against the board, picking next work, and status reporting. |
| [`do-gh-stack`](./do-gh-stack/) | Manages stacked PRs and splits multi-part work into reviewable branches. |
| [`do-git-pr-review-triage`](./do-git-pr-review-triage/) | Pull PR review comments and triage them — separate substantive feedback from bikeshedding, stale comments, misreads, AI slop, and other noise. |
| [`do-git-safe-pr-workflow`](./do-git-safe-pr-workflow/) | Safe GitHub pull request workflow for low-experience Git users. |
| [`do-git-worktree`](./do-git-worktree/) | Create, remove, and list git worktrees in a standardized location |
| [`do-improve-doc`](./do-improve-doc/) | Analyze and improve existing documentation using Diataxis principles |
| [`do-tech-writing`](./do-tech-writing/) | Write clean, terse technical docs — commits, issues, PRDs, specs, and technical communication |
| [`do-tutorial-docs`](./do-tutorial-docs/) | Tutorial patterns for documentation - learning-oriented guides that teach through guided doing. |
| [`do-update-readme`](./do-update-readme/) | Use when adding, removing, or renaming a skill in this repository to keep nested bucket READMEs and the root catalog current. |
| [`icm-grill`](./icm-grill/) | Grill a workspace into one of six ICM fleet trees. |

## See Also

- [Skill catalog](../../README.md) — every bucket in this repo
- [Docs](../../docs/workflow/) — human-facing pages for these skills
