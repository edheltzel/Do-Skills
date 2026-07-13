---
name: tech-writing
description: "Draft clear tutorials, how-to guides, reference docs, explanations, commit messages, issues, PRDs, specs, PR descriptions, and comments. Use for writing, revising, or classifying those artifacts, including drafting commit-message text and revising text that reads as AI-generated; not for creating commits or pushing changes (use git:safe-pr-workflow)."
---

# Technical Writing

Write for humans and machines. Every sentence earns its place or gets cut.

Drafting long-form from raw notes? Explore with `writing-fragments`, then shape the pile with `writing-drafting` — return here for documentation type, format, and AI-tell removal.

## Core Principles

**Lead with the point.** Put the takeaway first. Add context only when it changes the reader's understanding or action.

**One idea per unit.** One point per sentence. One topic per paragraph. One concern per section.

**Concrete over abstract.** Name the thing. Show the example. Skip the preamble.

**Active voice, imperative mood.** Write "Add retry logic," not "Retry logic should be added" or "Added retry logic."

**Delete filler.** Cut "basically," "simply," "just," "in order to," "it should be noted that," "as mentioned above," "please note that," and "going forward." If a word does not change the meaning, remove it.

**Reserve hedging for real uncertainty.** Write "This breaks X" when the failure is known. State the evidence and confidence when it is not.

**Prefer short words.** Use "use" over "utilize," "start" over "initialize," "show" over "indicate," and "about" over "approximately."

## Choose the Documentation Type

For tutorials, how-to guides, reference material, explanations, and conceptual pages, load [references/documentation-types.md](references/documentation-types.md). Choose one primary type from the result the reader needs: learning a capability, completing a task, retrieving a fact, or understanding a system. Keep small supporting material inline; split material that has its own reader journey.

When the type is ambiguous — a page that could be a tutorial or a how-to, or a reference or an explanation — use [references/diataxis-compass.md](references/diataxis-compass.md). It resolves the two hard cases with one question each: study versus work, and acquisition versus application.

## Commit-Message Boundary

This skill writes commit-message text. It may draft, edit, shorten, or explain a subject and body without changing repository state.

Creating or amending a commit is an operation, even when the request says "local commit only." Pushing is also an operation. Route either request to `git:safe-pr-workflow`. If one request asks for both message wording and a commit or push, the operational workflow owns the request and may apply these writing rules.

### Commit message format

```text
<type>: <what changed>

<why it changed — optional; include only when non-obvious>
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`

Rules:
- Keep the subject under 72 characters.
- Use imperative mood: "Add X," not "Added X" or "Adds X."
- Do not end the subject with a period.
- Use the body for rationale; the diff already records the mechanics.
- Reference an issue when relevant: `Fixes #42`.

Good:

```text
feat: limit requests to the upload API

Prevent automated clients from exhausting upload capacity. Return 429
with Retry-After after 100 requests per minute for one API key.

Fixes #187
```

Bad:

```text
Updated the upload endpoint to add some rate limiting functionality
so that we can prevent potential abuse issues going forward
```

## Format: GitHub Issues

### Bug Reports

```markdown
## Problem
<What is broken — one sentence>

## Steps to Reproduce
1. <Exact step>
2. <Exact step>

## Expected
<What should happen>

## Actual
<What happens instead>

## Context
- Version/commit: <hash or version>
- Environment: <OS, browser, runtime>
- Logs/screenshots: <when relevant>
```

### Feature Requests

```markdown
## Problem
<The unmet user need, not the proposed feature>

## Proposed Solution
<The specific change>

## Alternatives Considered
<Other options and why they lost>

## Scope
<What is included and excluded>
```

## Format: Product Requirements Documents

```markdown
# <Feature Name>

## Problem
<Who has the problem, what they cannot do, and why it matters now>

## Solution
<What to build in two or three sentences>

## Requirements

### Must Have
- <Testable requirement beginning with a verb>

### Nice to Have
- <Lower-priority requirement>

### Out of Scope
- <Explicit exclusion>

## Success Criteria
- <Measurable outcome>

## Technical Notes
<Constraints, dependencies, or migration concerns when relevant>

## Open Questions
- <Decision, owner, and deadline>
```

Requirements must be testable. Replace "fast" with a threshold such as "loads in under 200 ms at p95." Start requirements with verbs such as "Support," "Display," "Validate," or "Allow." Give each open question an owner.

## Format: Technical Specs and Design Docs

```markdown
# <Title>

## Context
<Why the document exists and what decision or system it covers>

## Design

### Architecture
<How it works; prefer a useful diagram over a wall of text>

### Data Model
<Schema changes, entities, and relationships>

### API
<Endpoints, contracts, and examples>

## Tradeoffs
<What the design gains and gives up>

## Risks
<Failure modes and mitigations>
```

## Format: Inline Code Comments

Comment on the reason the code cannot express, not the operation it already shows.

Good:

```text
// Retry three times because the payment API returns transient 503s under load.
```

Bad:

```text
// Call the payment API with retries.
```

Do not write:

```text
// Increment counter.
count += 1
```

## Format: PR Descriptions

```markdown
## What
<One sentence describing the change>

## Why
<Motivation and issue link when relevant>

## How
<Approach, not a line-by-line account>

## Testing
<Observed verification>
```

## Anti-Patterns

**The wall of context.** Move the conclusion ahead of the background.

**The passive report.** Name the actor and action instead of writing "It was determined."

**Weasel words.** Quantify "some users," "significant impact," and "may cause issues," or replace them with the exact claim.

**Premature abstraction.** Prefer one concrete example when it communicates faster than a general model.

**The apology prefix.** Shorten the message instead of apologizing for its length.

**Redundant structure.** Omit empty or content-free template sections.

## Remove AI-Writing Tells

When revising text that reads as AI-generated, load [references/ai-writing-tells.md](references/ai-writing-tells.md) for the pattern catalog (filler, promotional language, vague authority, formatting and communication tells) and [references/vocabulary-swaps.md](references/vocabulary-swaps.md) for word-by-word replacements.

The core heuristic is density, not individual words: flag a passage only when three or more tells cluster in proximity, not when one flagged word appears alone. Watch the false positives — "ensure" is a legitimate term in security docs, formal prose is not itself a tell, and uncertainty backed by evidence must stay. For comment and docstring tells, use [code-comments](../../core/code-comments/SKILL.md).

## Gotchas

- A document's topic does not determine its type. The reader's immediate result does.
- A short rationale inside a procedure does not turn it into an explanation. Split only when the secondary material serves a separate journey.
- "Write a commit message" is a text task. "Commit with this message" changes repository state and belongs to `git:safe-pr-workflow`.
- A measured uncertainty is not a weasel word. Preserve uncertainty when the evidence requires it.

## Editing Checklist

Before publishing, cut:
1. Repeated claims.
2. Adjectives and adverbs that do not change meaning.
3. Throat-clearing openers.
4. Sections with no useful content.
5. Facts the intended reader can already infer.

Then check ordering: each concept should be grounded — introduced or assumed known — before a later section leans on it.
