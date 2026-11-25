# Operations

Operating AI agents - delegation, handoffs, prompt audits, project status check-ins, and skill drift repair.

## Installation

Every skill in this group:

```bash
npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/global/operations -g
```

One skill by exact name:

```bash
npx skills add edheltzel/Do-Skills --skill=<skill-name>
```

## Skills

| Skill | Description |
|-------|-------------|
| [`do-bitter-pill`](./do-bitter-pill/) | Audits AI instruction sets for over-prompting. |
| [`do-cleanup`](./do-cleanup/) | Tidy a project's working records against what has actually landed: close todo.txt tasks that have proof, archive finished plans, superseded handoffs and older regroup files, and list merged worktrees and branches. |
| [`do-delegation`](./do-delegation/) | Routes independent work through the harness's subagent tool: background execution, role briefs, worktree isolation, and coordinator-managed synthesis. |
| [`do-handoff`](./do-handoff/) | Write a pointer-first session handoff, or resume from a source the user names. |
| [`do-regroup`](./do-regroup/) | Use when checking project status. |
| [`do-skill-drift`](./do-skill-drift/) | Resolve skill drift that gap sync or gap status reports: tell a stale but untouched copy from a real local edit, restore the stale ones, and route real edits back to their source repo. |

## See Also

- [Global skills](../README.md)
- [Skill catalog](../../../README.md)
