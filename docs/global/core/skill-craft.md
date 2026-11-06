# Skill Craft

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-skill-craft
```

```bash
npx skills update do-skill-craft
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/global/core/do-skill-craft)

## What it does

Authors Agent Skills: write the file, distill a source into one, review a skill change, or evaluate a skill against fixed cases. Predictability is the bar: the same process every run, not the same output. A distilled skill is a decision tool, not a summary, and must still be usable if the source disappeared.

## When to reach for it

- **Invocation mode.** Type `/do-skill-craft`, or the agent reaches for it automatically when a task fits. Review and eval run only on explicit request. Review: `/do-skill-craft review [output-path] [--base <branch>]`. Eval: ask to evaluate a skill against fixed cases.
- **Trigger boundary.** Reach for this when you are writing or editing a skill, turning a URL, article, repo, transcript, or paper into a skill, auditing a skill PR, or evaluating a skill against fixed cases. For the repo agent map, use [agent-docs](./agent-docs.md). For commit, issue, and spec prose, use [tech-writing](../workflow/tech-writing.md). For correctness bugs in a code diff, use [adversarial-review](./adversarial-review.md).

## Predictability

That word is the bar for every mode.

- **write** (default). Choose invocation, front-load the description, place steps and reference on the information hierarchy, split only when the cut earns it, link neighbour skills by name, prune no-ops, and steer with leading words. Failure modes: premature completion, duplication, sediment, sprawl, no-op, negation.
- **distill**. Absorb the source, keep decision rules, cut motivation, invert to rule then example then anti-pattern, and compress. A 5,000-word article lands near 150-250 lines. If the skill is as long as the source, it is a summary.
- **review**. Explicit only. Structural and marketplace checks are high confidence; design checks are medium. Every finding is verified before it is reported. The verdict ignores minor and informational items.
- **eval**. Explicit only. Lock fixed cases and criteria, run each case in a fresh context, and have a separate judge grade the artifact without the author's preferred verdict. After a skill edit, rerun every case. A miss is a skill defect or a bad case, labeled for that generation. When runs disagree, the result stays a count. The record check confirms the saved prompts, judge reply, quote, and reruns agree. The saved replies are the proof those prompts went to separate contexts.

## It's working if

- The description states what the skill enables and the phrases that should trigger it.
- A distilled skill is a fraction of the source, and an agent can act on it without the original.
- A review names file and line, states confidence, and does not start unless review mode was requested.
- An eval names each case's count, the judge's quote, and whether a miss is a skill defect or a bad case. It does not start unless eval was requested. A passing record check still has the runner and judge transcripts beside it.

## Where it fits

A standalone harness skill for whenever the artifact is an Agent Skill (`SKILL.md`), not repo instructions or general prose. Eval is an optional mode on this skill. Write-mode principles are MIT (Matt Pocock). Review-mode checks are Apache-2.0 (Beagle).
