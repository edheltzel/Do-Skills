---
name: skill-builder
description: >-
  The mechanics of creating agent skills — structure, frontmatter, validation gates,
  reference layout, and trigger testing. Use when scaffolding a new skill, fixing skill
  frontmatter, choosing single-file vs references layout, or validating a skill before
  committing. Companion to distill-to-skill, which handles extracting the knowledge;
  this skill handles building the artifact. NOT FOR deciding what knowledge belongs
  in a skill (use distill-to-skill).
---

# Skill Builder

Create, validate, and refine Agent Skills.

## Quick Start

1. Gather the capability, triggers, and required domain knowledge.
2. Choose a simple single-file skill or a multi-file skill with references.
3. Write `SKILL.md` with concise, trigger-focused instructions.
4. Add reference files only for detail that would otherwise bloat `SKILL.md`.
5. Validate YAML frontmatter, file layout, and naming.
6. Test the skill with the natural language users are likely to say.

## Workflow

- Start with requirements and scope control.
- Design the structure before writing content.
- Keep descriptions in third person and include trigger keywords.
- Use progressive disclosure for long examples, templates, and validation details.

## Gates

Follow in order. **Pass** means a check you can satisfy with concrete artifacts (written bullets, paths, line counts, parsed YAML)—not an internal sense of “done.”

1. **Requirements** — **Pass:** Capability, triggers, and any required domain knowledge (or explicit “none”) are written down or confirmed from the user.
2. **Structure** — **Pass:** Single-file vs `SKILL.md` + `references/` is chosen; heavy detail lives in references, not inlined in `SKILL.md`.
3. **Draft** — **Pass:** Frontmatter is valid YAML with `name` and `description`; `SKILL.md` is ≤ 500 lines; every relative link from `SKILL.md` resolves to a path that exists under this skill directory; each `allowed-tools` entry (if present) is justified.
4. **Trigger check** — **Pass:** At least one natural-language user phrase plausibly matching the `description` is identified for a quick invocation test.

## Validation

- Keep `SKILL.md` under 500 lines.
- Prefer one-level reference links.
- Avoid time-sensitive guidance.
- Confirm frontmatter is valid YAML.
- Check that any `allowed-tools` entries are necessary and correct.

## Advanced Reference

For the full workflow, templates, examples, and validation checklist, see [references/skill-builder-guide.md](references/skill-builder-guide.md).
