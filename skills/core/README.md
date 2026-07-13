# Core

Always-on standards, process, and operational skills. Stack-agnostic — they apply to any project.

| Skill | Description |
| --- | --- |
| [`adversarial-review`](./adversarial-review/) | Adversarially hunt for correctness bugs and regressions in a change set. |
| [`agent-first-repo`](./agent-first-repo/) | Structure a repository and its documentation so AI coding agents can work effectively. |
| [`agents-md`](./agents-md/) | Write effective AGENTS.md files that give coding agents the context they need to work in a repository. |
| [`architecture-md`](./architecture-md/) | Generate an ARCHITECTURE.md file for a codebase following matklad's principles. |
| [`behavioral-testing`](./behavioral-testing/) | Behavior-first testing for user-observable contracts, test quality review, and safe executable E2E plans. |
| [`browser-verify`](./browser-verify/) | Independently verify browser-rendered work in a real browser. |
| [`code-comments`](./code-comments/) | Write high-signal code comments for humans and coding agents. |
| [`codebase-design`](./codebase-design/) | Shared vocabulary for designing deep modules — a lot of behaviour behind a small interface, placed at a clean seam, testable through that interface. |
| [`debug`](./debug/) | Find and fix the root cause when something breaks: a failing test, a broken build, a bug report, or behavior that doesn't match expectations. |
| [`design-doc`](./design-doc/) | Write a short design document for unclear or important architecture decisions before implementation. |
| [`design-patterns-gof`](./design-patterns-gof/) | The 23 Gang of Four object-oriented design patterns (Gamma, Helm, Johnson, Vlissides, 1994) distilled as a practical field guide, not a catalog. |
| [`domain-modeling`](./domain-modeling/) | Actively build and sharpen a project's domain model — a ubiquitous-language glossary in CONTEXT.md and architectural decision records in docs/adr/. |
| [`git:guardrails`](./git-guardrails/) | Install a Claude Code PreToolUse hook that blocks dangerous git commands (push, reset --hard, clean -fd, branch -D, checkout ./restore .) before they run. |
| [`git:pr-review-triage`](./git-pr-review-triage/) | Pull PR review comments and triage them — separate substantive feedback from bikeshedding, stale comments, misreads, AI slop, and other noise. |
| [`git:safe-pr-workflow`](./git-safe-pr-workflow/) | Safe GitHub pull request workflow for low-experience Git users. |
| [`git:worktree`](./git-worktree/) | Create, remove, and list git worktrees in a standardized location |
| [`implement`](./implement/) | Finish one code task: understand it, make the smallest change, test it, review it, and report or open the requested PR. |
| [`improve-codebase-architecture`](./improve-codebase-architecture/) | Scan a codebase for deepening opportunities — refactors that turn shallow modules into deep ones — and grill through whichever one the user picks. |
| [`karpathy-guidelines`](./karpathy-guidelines/) | Behavioral guidelines to reduce common LLM coding mistakes. |
| [`plan`](./plan/) | Break a spec or brief into agent-ready tickets (GitHub Issues, Linear, Jira) that each deliver a working outcome. |
| [`pr-to-ready`](./pr-to-ready/) | Make an open pull request ready to merge by checking live feedback, fixing required items, running checks, and reporting the result. |
| [`prototype`](./prototype/) | Build a throwaway prototype to answer a design question — a logic/state model driven by hand, or several UI variations to pick from. |
| [`review-spec-conformance`](./review-spec-conformance/) | Review a diff for faithful implementation of its originating issue or spec — completeness, omissions, scope creep, and contradictions — reported as its own axis, never merged with coding-standards findings. |
| [`review-structure`](./review-structure/) | Repo-wide structural-maintainability review — code-judo restructurings, 1k-line file guard, anti-spaghetti branching, canonical-layer enforcement, anti-magic abstractions, explicit type/boundary contracts. |
| [`review-verification-protocol`](./review-verification-protocol/) | False-positive discipline for code review — anti-confabulation echo gate, per-issue-type verification checklists, severity calibration, and valid-pattern tables that keep reviews honest. |
| [`roughdraft`](./roughdraft/) | Install and drive the published `roughdraft` CLI — a local-first markdown editor/viewer for reviewing markdown with an AI agent (comments + CriticMarkup suggestions). |
| [`simplify`](./simplify/) | Simplify and refine recently modified code for clarity and consistency. |
| [`spec`](./spec/) | Synthesize the current conversation into an implementation spec and publish it to GitHub as a ready-for-agent issue. |
| [`task-to-pr`](./task-to-pr/) | Turn one ticket from GitHub, Linear, Jira, or pasted context into a tested and reviewed GitHub pull request in a dedicated branch and worktree. |
| [`tdd`](./tdd/) | Test-first variant of implement: confirm the seams, write a failing test, then make it pass. |
| [`triage`](./triage/) | Move GitHub issues through a triage state machine — categorise, verify the claim, grill into shape, and write agent-ready briefs. |
| [`wayfinder`](./wayfinder/) | Plan work too big for one agent session as a shared map of investigation tickets on GitHub, resolved one per session until the way to the destination is clear. |
