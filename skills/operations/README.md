# Operations

Operating AI agents and driving machines - delegation, evaluation, prompt audits, memory recall, and browser or computer automation.

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
| [`do-bitter-pill`](./do-bitter-pill/) | Audits AI instruction sets for over-prompting. |
| [`do-browser`](./do-browser/) | Browser automation through the installed chrome-devtools-axi CLI. |
| [`do-context-search`](./do-context-search/) | Find prior project work through the current Recall MCP tools. |
| [`do-delegation`](./do-delegation/) | Routes independent work through current Agent dispatch, background execution, role briefs, worktree isolation, and coordinator-managed synthesis. |
| [`do-interceptor`](./do-interceptor/) | Real Chrome/Brave/Helium + macOS Computer Use from inside the browser - zero CDP fingerprint, real sessions; mandatory for visual deploy verification. |

## See Also

- [Skill catalog](../../README.md) — every bucket in this repo
