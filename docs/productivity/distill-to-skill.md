# Distill to Skill

Quickstart:

```bash
npx skills add edheltzel/skills --skill=distill-to-skill
```

```bash
npx skills update distill-to-skill
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/productivity/distill-to-skill)

## What it does

`distill-to-skill` turns any source of knowledge — a blog post, a repo, a paper,
a video transcript — into a well-structured agent skill. It owns the thinking
half of skill-making: extract, filter, restructure, and encode; the mechanical
half (frontmatter, packaging, validation) belongs to the `skill-creator` skill.
The defining constraint is that a skill is not a summary — it's a decision-making
tool for an agent mid-task, so every line has to change how the agent would
write code or make a call, not merely explain the source.

## When to reach for it

Type `/distill-to-skill`, or the agent reaches for it automatically when you
share a URL, article, repo, or body of knowledge and ask to turn it into a
reusable skill ("make a skill from this", "distill this into a skill").

Reach for it when you have raw material and want the transferable core pulled out
and shaped, not paraphrased. For the packaging step that follows — directory
layout, YAML, init scripts — hand off to `skill-creator`.

## The distillation loop

- **Absorb, then separate essence from packaging.** Read the source in full; the
  best insights hide in asides. Keep universal principles, concrete patterns,
  decision rules, anti-patterns, and copy-paste utilities. Cut the author's
  journey, motivation, history, and "further reading".
- **The litmus test.** If the original source vanished, would the skill still be
  useful on its own? If yes, you extracted the core.
- **Decide the shape.** One core idea → a single `SKILL.md`. A broad topic used
  together → `SKILL.md` plus `references/`. Two ideas that trigger in different
  contexts → split into separate cross-referencing skills.
- **Invert and compress.** Articles argue bottom-up (problem → solution); skills
  read top-down (rule → example → anti-pattern). A 5,000-word article distills to
  ~150–250 lines — a 10:1 to 20:1 ratio. If your skill nears the source's length,
  you're summarizing, not distilling.
- **Write the description last and hardest.** The YAML `description` is the only
  thing that decides whether the skill ever triggers. Lead with what it enables,
  name concrete scenarios and file types, and list the trigger phrases a user
  would actually say.

## It's working if

- An agent could act on the skill without ever reading the original source.
- Every section is actionable — rules, patterns, code — not background.
- The skill is a fraction of the source's length, in the target ecosystem's
  language, with a description full of concrete triggers.

## Where it fits

A reach-for-it-anytime standalone that feeds `skill-creator`: distill decides
*what* the skill should say and how it's shaped, then skill-creator handles the
scaffolding and packaging. It's the productivity-bucket counterpart to the
authoring skills — where they format one file, this one decides what knowledge is
worth encoding at all.
