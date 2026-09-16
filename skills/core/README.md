# Core

Foundational tools for every project and workbench - repo structure, agent maps, and review lenses.

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
| [`do-adversarial-review`](./do-adversarial-review/) | Adversarially hunt for correctness bugs and regressions in a change set. |
| [`do-agent-context-layer`](./do-agent-context-layer/) | Structure a code repository's documentation and context layer so an AI agent grasps the project fast, using the Interpretable Context Methodology (ICM) by Jake Van Clief. |
| [`do-agent-first-repo`](./do-agent-first-repo/) | Structure a repository and its documentation so AI coding agents can work effectively. |
| [`do-agents-md`](./do-agents-md/) | Write effective AGENTS.md files that give coding agents the context they need to work in a repository. |
| [`do-architecture-md`](./do-architecture-md/) | Generate an ARCHITECTURE.md file for a codebase following matklad's principles. |
| [`do-behavioral-testing`](./do-behavioral-testing/) | Behavioral testing methodology — test what users experience, not how code is structured. |
| [`do-first-principles`](./do-first-principles/) | Physics-based reasoning framework (Musk methodology) that deconstructs a problem to irreducible fundamental truths, classifies every element as hard constraint, soft constraint, or assumption, then reconstructs the optimal solution from fundamentals alone. |
| [`do-red-team`](./do-red-team/) | Adversarial analysis deploying parallel expert agents to stress-test ideas, strategies, and plans — decomposes into atomic claims, attacks them, then steelmans and counter-argues, producing severity-ranked findings with remediation. |
| [`do-simplify`](./do-simplify/) | Simplify and refine recently modified code for clarity and consistency. |

## See Also

- [Skill catalog](../../README.md) — every bucket in this repo
- [Docs](../../docs/core/) — human-facing pages for these skills
