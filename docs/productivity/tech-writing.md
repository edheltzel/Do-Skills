# Technical Writing

Quickstart:

```bash
npx skills add edheltzel/skills --skill=tech-writing
```

```bash
npx skills update tech-writing
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/productivity/tech-writing)

## What it does

`tech-writing` produces terse documentation and engineering communication. It covers tutorials, how-to guides, reference material, explanations, commit-message text, issues, PRDs, specs, PR descriptions, and comments.

The skill puts the conclusion first, keeps one idea in each unit, favors concrete claims, and removes words or sections that do not change the result. Templates are starting shapes, not quotas; unused sections disappear.

It also revises text that reads as AI-generated. The [AI-writing tells reference](../../skills/productivity/tech-writing/references/ai-writing-tells.md) catalogs the patterns — filler, promotional language, vague authority, and formatting and communication tells — and the [vocabulary-swap reference](../../skills/productivity/tech-writing/references/vocabulary-swaps.md) supplies word-by-word replacements. The governing heuristic is density: flag a passage when several tells cluster, not on a single word, and leave legitimate technical terms alone.

## When to reach for it

Type `/tech-writing`, or let the agent select it when drafting or revising one of its supported artifacts.

Use it for commit-message **text**: drafting a subject and body, editing existing wording, shortening it, or explaining why it works. A request to create or amend a local commit changes repository state and belongs to [git:safe-pr-workflow](../core/git-safe-pr-workflow.md). The same operational workflow owns every push request. If a request combines message drafting with a commit or push, use the operational workflow for the full request and apply the writing rules there.

For the narrower question of what belongs in a code comment, use [code-comments](../core/code-comments.md). For the specific files governed by [agents-md](../core/agents-md.md) and [architecture-md](../core/architecture-md.md), use those skills; `tech-writing` supplies their shared writing posture.

## Classify documentation by its required result

Choose the page type from the result the reader must get, not from its topic, code density, or intended experience level:

- **Tutorial:** gain a capability through a managed exercise.
- **How-to:** finish a defined job in a real situation.
- **Reference:** retrieve an exact contract or value quickly.
- **Explanation:** form a mental model that supports reasoning and decisions.

A useful tie-breaker is the page's unacceptable failure. If a reader can finish the steps but learns nothing reusable, the tutorial failed. If the reader learns but cannot complete the stated job, the how-to failed. If an exact fact remains hard to locate, the reference failed. If the reader still cannot predict or explain behavior, the explanation failed.

The [documentation-type reference](../../skills/productivity/tech-writing/references/documentation-types.md) defines each type's structure and completion checks. When the type is ambiguous, the [Diataxis compass](../../skills/productivity/tech-writing/references/diataxis-compass.md) resolves it with two questions: study versus work, and acquisition versus application. Load these when writing or restructuring one of these page types; commit messages, issues, PRDs, specs, and PR descriptions use the formats in the [skill](../../skills/productivity/tech-writing/SKILL.md).

## Keep supporting material inline or split it

Keep secondary content inline when the reader needs it to continue safely, it preserves the page's reading pattern, and it has little independent value. A brief reason beside a dangerous command belongs with the command. A few parameter values needed for one task can remain in that task.

Create and link a separate page when the material has its own audience or search demand, requires a different reading mode, obscures the primary result, or has an independent owner and maintenance cycle. Put the link where the reader must make the related decision, and label it by the result it provides.

## Rules that do the work

- **Lead with the point.** Put the takeaway in the first sentence; add context only when it changes action or understanding.
- **Keep one idea per unit.** One point per sentence, one topic per paragraph, one concern per section.
- **Use active voice and imperative mood.** Write "Add retry logic," not "Retry logic should be added."
- **Cut filler.** Delete words such as "basically," "simply," "just," and "in order to" when they add no meaning.
- **State uncertainty precisely.** Remove vague hedging, but keep uncertainty that the evidence requires.
- **Make requirements testable.** Replace "fast" with a measurable threshold. Give open questions owners.

## It is working if

- The first sentence states the useful conclusion.
- The document type matches the reader's required result.
- Supporting material stays inline only when it advances the primary journey.
- Commit subjects use imperative mood, stay under 72 characters, and reserve the body for rationale.
- Empty template sections, repeated claims, throat-clearing, and unquantified weasel words are gone.

## Where it fits

This skill owns writing posture, document-type selection, and general engineering-writing formats. Artifact-specific skills still own their narrower contracts. The split prevents a shared style guide from replacing specialized rules while keeping the voice consistent across the repository.
