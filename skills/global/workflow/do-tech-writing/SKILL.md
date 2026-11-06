---
name: do-tech-writing
description: "Write clean, terse technical docs — commits, issues, PRDs, specs, and technical communication"
---

# Technical Writing

Write for humans and machines. Every sentence earns its place or gets cut.

## Core Principles

**Lead with the point.** First sentence = the takeaway. Context comes after, if needed.

**One idea per unit.** One point per sentence. One topic per paragraph. One concern per section.

**Concrete over abstract.** Name the thing. Show the example. Skip the preamble.

**Active voice, imperative mood.** "Add retry logic" not "Retry logic should be added" or "Added retry logic."

**No filler words.** Cut: "basically", "simply", "just", "in order to", "it should be noted that", "as mentioned above", "please note that", "going forward". If removing a word doesn't change the meaning, remove it.

**No hedging unless uncertainty is the point.** Say "This will break X" not "This could potentially have an impact on X."

**Prefer short words.** "use" over "utilize", "start" over "initialize", "show" over "indicate", "about" over "approximately."

## Format: Git Commits

Structure:
```
<type>: <what changed>

<why it changed — optional, only if non-obvious>
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`

Rules:
- Subject line under 72 characters
- Imperative mood: "Add X" not "Added X" or "Adds X"
- No period at end of subject
- Body explains *why*, not *what* — the diff shows what
- Reference issue numbers when relevant: `Fixes #42`

Good:
```
feat: add rate limiting to /api/upload

Prevents abuse from automated clients. Limits to 100 req/min
per API key. Returns 429 with Retry-After header.

Fixes #187
```

Bad:
```
Updated the upload endpoint to add some rate limiting functionality
so that we can prevent potential abuse issues going forward
```

## Format: GitHub Issues

### Bug Reports

```markdown
## Problem
<What's broken — one sentence>

## Steps to Reproduce
1. <Exact steps>
2. <No ambiguity>

## Expected
<What should happen>

## Actual
<What happens instead>

## Context
- Version/commit: <hash or version>
- Environment: <OS, browser, runtime>
- Logs/screenshots: <if relevant>
```

### Feature Requests

```markdown
## Problem
<What user need is unmet — not the solution, the problem>

## Proposed Solution
<How to solve it — be specific>

## Alternatives Considered
<What else you evaluated and why it lost>

## Scope
<What's in, what's explicitly out>
```

## Format: PRD (Product Requirements Document)

```markdown
# <Feature Name>

## Problem
<Who has this problem. What they can't do. Why it matters now.>

## Solution
<What we're building. 2-3 sentences max.>

## Requirements

### Must Have
- <Requirement — testable, unambiguous>
- <Each one starts with a verb>

### Nice to Have
- <Lower priority items>

### Out of Scope
- <Explicitly excluded to prevent scope creep>

## Success Criteria
- <Measurable outcome>
- <How we know this worked>

## Technical Notes
<Constraints, dependencies, migration concerns — only if relevant>

## Open Questions
- <Unresolved decisions, with owners and deadlines>
```

Rules:
- Requirements are testable. "Fast" is not a requirement. "Page loads in < 200ms at p95" is.
- Each requirement starts with a verb: "Support", "Display", "Validate", "Allow".
- Success criteria are measurable. If you can't measure it, sharpen it.
- Open questions have owners. Unowned questions don't get answered.

## Format: Technical Specs / Design Docs

```markdown
# <Title>

## Context
<Why this doc exists. What decision or system it describes. 2-3 sentences.>

## Design

### Architecture
<How it works. Diagrams welcome, walls of text not.>

### Data Model
<Schema changes, new entities, relationships.>

### API
<Endpoints, contracts, examples.>

## Tradeoffs
<What you chose and what you gave up. Be honest about costs.>

## Risks
<What could go wrong. What's the mitigation.>
```

## Format: Inline Code Comments

Only comment *why*, never *what*. The code says what.

Good:
```
// Retry 3x because the payment API returns transient 503s under load
```

Bad:
```
// Call the payment API with retries
```

Don't comment:
```
// Increment counter
count += 1
```

## Format: PR Descriptions

This section writes the pull request body. Commit messages and trailers stay with the project convention and with `do-commit` if installed. GitButler (`but`), plain git, and `do-gh-stack` if installed keep their current commit and open steps. Opt-in grit stays on `do-grit` if installed. Those skills keep commit grouping.

When an agent wrote the change or this body, the first line says an agent wrote it, names that agent when the name is known, and names the human who assigned the work when that person is known. State what the human actually did: assigned the task, wrote a spec, or shaped the design. Choosing among options the agent offered counts as an assignment. Say a named human reviewed the change only after that person says they reviewed it. Until then, say they have not reviewed it.

Example, when those are the facts:

```
> Example Agent wrote this change for @ada, who assigned the task. @ada has not reviewed this change.
```

Use this order. Omit a heading that would be empty.

```markdown
## Problem
<Who is blocked, and how it shows up. Link the issue when one exists.>

## Behavior
<What a caller can do after this change. The history already lists the commits.>

## Evidence
<Proof that fits the change. Name each check and its result, including any check that failed, is missing, or was not run.>

## Details
<Only what the diff hides: migrations, flags, tradeoffs, and work still open.>

## Plain language
<Two sentences a teammate outside the diff can repeat.>
```

Match the proof to the change:

| Change | Proof |
| --- | --- |
| UI | The same view before and after, at the viewport the change affects. A short clip when the change is motion or a multi-step flow. |
| Command or build | The command, its exit code, and the output from that run. |
| Bug | The input, the result before, the result after, and the regression check. |
| Performance | What was measured, on what machine and input, how many runs, both results, and how much they vary. |
| Interface or feature | A short example of using it. A new surface has no before state. |
| Agent behavior | The prompts that were run, the outcome recorded, and the part of the grading that is unreliable. |
| Other | The smallest check that fails if this change is wrong. |

Read every screenshot, clip, log, and pasted output before it is shared. Share demo or already-public data only. Remove tokens, keys, emails, private messages, and customer data. If a capture cannot be made safe, leave it out and describe the check in words. A security fix states the impact and the project's disclosure path, and keeps any reproduction or payload on that private path.

A failed check stays failed. Proof that does not exist stays missing. A check that was not run stays unrun.

## Anti-Patterns

**The Wall of Context.** Three paragraphs of background before the point. Invert it. Point first, context if needed.

**The Passive Report.** "It was determined that the service should be restarted." By whom? Say who did what.

**Weasel Words.** "Some users", "significant impact", "may cause issues." Quantify or be specific.

**Premature Abstraction.** Don't generalize when a concrete example communicates faster.

**The Apology Prefix.** Don't start with "Sorry for the long message" — make the message shorter instead.

**Redundant Structure.** Don't add sections just because the template has them. Empty "Risks: None" sections waste attention. Omit sections that add nothing.

## Editing Checklist

Before publishing, read it once and cut:
1. Sentences that repeat what another sentence already said
2. Adjectives and adverbs that don't change the meaning
3. Throat-clearing openers ("So basically...", "As you may know...")
4. Sections with no actionable content
5. Anything the reader already knows or can infer

## Related skills

- Tutorials, how-tos, reference, or explanation pages: `do-docs`, if installed.
- A README that drifted from the code: `do-readme-update`, if installed.
