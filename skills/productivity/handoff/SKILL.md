---
name: handoff
description: Compact the current conversation into a handoff a fresh agent can pick up — written as a repo-versioned doc, or optionally seeded straight into a background agent. USE WHEN the user types its name to hand work off to a new session. Pass what the next session will focus on to tailor the handoff. NOT FOR writing a general spec, PRD, or design doc (use tech-writing).
---

Summarise the current conversation so a fresh agent can continue the work. You invoke this by typing its name; if the user passed arguments, treat them as a description of what the next session will focus on and tailor the handoff accordingly.

The handoff has two exits — write it to a file (the default), or seed it into a background agent.

## Compose the handoff

Whichever exit you take, the summary is the same. Write it to capture where the work stands, what is decided, what is open, and what to do next.

- Include a **suggested skills** section that names the skills the next agent should invoke.
- Do not duplicate content already captured in other artifacts — specs, plans, ADRs, issues, commits, diffs. Reference them by path or URL instead.
- Redact any sensitive information — API keys, passwords, personally identifiable information. The summary may become the next agent's prompt.

## Exit A — write the handoff doc (default)

Save the handoff to `docs/plans/handoff/` in the repo, not the OS temporary directory — it is a versioned artifact the next session (or a later reader) should be able to find. Use a timestamped, descriptive filename, e.g. `YYYY-MM-DD-HHMMSS-<slug>.md`. Create the directory if it does not exist. Report the final path.

## Exit B — seed a background agent (optional)

Take this exit only if the user asks for it *and* the harness supports background agents. Instead of saving the summary, launch a background agent seeded with it as the prompt:

```bash
claude --bg --name "<descriptive name>" "<handoff summary>"
```

It starts in the current working directory and returns immediately; the user manages it with `claude agents`. Always pass `--name` with a descriptive name (e.g. `--name "Fix login bug"`) — it sets the display name in the job list, session picker, and terminal title.
