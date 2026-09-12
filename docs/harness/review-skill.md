# Skill Review

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-review-skill
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/harness/do-review-skill)

## What it does

`do-review-skill` audits Agent Skill PRs: structure, design, and marketplace
consistency. It is the dedicated auditor. It is not the writer
(`do-writing-great-skills`) and not the extractor (`do-distill-to-skill`).

## When to reach for it

Type `/do-review-skill`, or use it when reviewing `SKILL.md` changes.

Adapted from Beagle `review-skill` under Apache-2.0. Invocation flags are
unchanged from the source (`disable-model-invocation: true`).
