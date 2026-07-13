# Handoff

Quickstart:

```bash
npx skills add edheltzel/skills --skill=handoff
```

```bash
npx skills update handoff
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/productivity/handoff)

## What it does

`handoff` compacts the current conversation into a summary a fresh agent can pick up and keep working from — where the work stands, what's decided, what's open, and what to do next. It has two exits from the same summary: write it to a repo-versioned doc (the default), or seed it straight into a background agent.

The summary is written to be *actionable by a stranger*: it names the skills the next agent should invoke, references existing artifacts (specs, plans, ADRs, issues, commits) by path rather than restating them, and redacts secrets — because the summary may itself become the next agent's prompt.

## When to reach for it

You invoke this by typing `/handoff`, optionally passing what the next session will focus on so the doc is tailored to it. Reach for it when a conversation is getting long, when you're about to switch context, or when you want a clean baton-pass to a new session. For writing a general spec, PRD, or design doc, use [tech-writing](./tech-writing.md).

## The two exits

- **Write the doc (default).** Saved to `docs/plans/handoff/` in the repo — a versioned artifact a later reader can find — with a timestamped, descriptive filename. Not the OS temp directory.
- **Seed a background agent (optional).** Taken only when you ask *and* the harness supports background agents: instead of saving, it launches `claude --bg --name "<name>" "<summary>"`, which starts in the current directory and returns immediately.

## Where it fits

A standalone you reach for at the seam between sessions. It merges Matt Pocock's `handoff` (write-a-doc) and `claude-handoff` (seed-an-agent) into one skill with two exits. Imported and adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT).
