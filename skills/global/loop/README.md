# Loop

The idea-to-PR loop - brainstorm, plan, plan review, work, debug, and the do-it (LFG) runner. Ships through do-commit in Workflow.

## Installation

Every skill in this group:

```bash
npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/global/loop -g
```

One skill by exact name:

```bash
npx skills add edheltzel/Do-Skills --skill=<skill-name>
```

## Skills

| Skill | Description |
|-------|-------------|
| [`do-brainstorm`](./do-brainstorm/) | Requirements dialogue for what to build, not how. |
| [`do-debug`](./do-debug/) | Reproduce a failure, confirm the root cause, then fix, diagnose, or rethink. |
| [`do-doc-review`](./do-doc-review/) | One review pass over a requirements or plan doc: gaps, contradictions, unverifiable steps, and scope creep, fixed in place. |
| [`do-it`](./do-it/) | LFG runner. |
| [`do-plan`](./do-plan/) | Implementation plan as ordered units, each with a verification check. |
| [`do-work`](./do-work/) | Execute a named plan, or the accepted list from a PR feedback file, unit by unit in the current checkout. |

## See Also

- [Global skills](../README.md)
- [Skill catalog](../../../README.md)
- [Docs](../../../docs/global/loop/) - human-facing pages for these skills
