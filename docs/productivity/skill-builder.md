# Skill Builder

Quickstart:

```bash
npx skills add edheltzel/skills --skill=skill-builder
```

```bash
npx skills update skill-builder
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/productivity/skill-builder)

## What it does

`skill-builder` covers the mechanics of creating agent skills: choosing single-file vs
references layout, writing valid frontmatter, keeping `SKILL.md` under budget, verifying
that every relative link resolves, and testing that the description actually triggers on
the phrases users will say. A full guide with templates and a validation checklist lives
in its references.

## When to reach for it

Scaffolding a new skill, fixing broken frontmatter, deciding whether detail belongs in
`SKILL.md` or a reference file, or validating a skill before committing it.

## Gate-driven authoring

Four gates run in order — requirements, structure, draft, trigger check — and each
passes only on concrete artifacts (written bullets, parsed YAML, resolved paths), not a
sense of "done." The draft gate enforces the invariants that most often break skills in
practice: valid YAML, ≤500 lines, and no dangling relative links.

## It's working if

- The frontmatter parses and the description names concrete trigger phrases.
- Heavy detail lives in `references/`, not inlined in `SKILL.md`.
- A natural-language phrase a user would actually say invokes the skill.

## Where it fits

The mechanics companion to [distill-to-skill](./distill-to-skill.md): distill-to-skill
decides *what* knowledge becomes a skill and how to compress it; skill-builder builds
and validates the artifact. For the *why* behind the structure and validation choices —
information hierarchy, the two loads, and the failure modes its Validation step screens
for — see [writing-great-skills](./writing-great-skills.md). In this repository, run
`update-readme` afterward to keep the repo index current. Imported and adapted from the beagle skills marketplace
(existential-birds/beagle).
