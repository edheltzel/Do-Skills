# Bro

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-bro
```

```bash
npx skills update do-bro
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/slop-guard/do-bro)

## What it does

`do-bro` restates the assistant's last response in plain human language. It
cuts jargon, inflated phrasing, and unnecessary detail without changing the
underlying answer.

The defining constraint is that it only rewrites the immediately preceding
response. It does not add analysis, change the decision, or start a new task.

## When to reach for it

You invoke this by typing `/do-bro` — the agent won't reach for it on its own.

Reach for it when an answer is technically correct but too dense, abstract, or
jargon-heavy to use. For setting a direct writing style before producing
technical prose, use [tech-writing](../authoring/tech-writing.md) instead.

## Say it like a person

The skill preserves the point while removing the language that hides it. The
result should sound like one person explaining the answer to another: direct,
concise, and coherent.

## It's working if

- The rewritten answer keeps the original meaning.
- Jargon and inflated phrasing are gone.
- No new claims, caveats, or recommendations appear.

## Where it fits

A user-invoked corrective pass in the Slop Guard bucket. It runs after a
response needs repair; authoring skills such as
[tech-writing](../authoring/tech-writing.md) shape content before or during
creation.
