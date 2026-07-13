# Resolution templates

Choose the template matching the `problem_type` track (see [schema.md](schema.md)). Preserve the section order; omit a section only when it is genuinely empty. Apply the YAML safety rules from the schema when filling array fields.

## Bug track

```markdown
---
title: [Clear problem title]
date: [YYYY-MM-DD]
category: [docs/solutions subdirectory]
module: [Module or area]
problem_type: [schema enum]
component: [kind of thing involved]
symptoms:
  - [Observable symptom 1]
root_cause: [schema enum]
resolution_type: [schema enum]
severity: [schema enum]
tags: [keyword-one, keyword-two]
---

# [Clear problem title]

## Problem
[1-2 sentence description of the issue and user-visible impact]

## Symptoms
- [Observable symptom or error]

## What Didn't Work
- [Attempted fix and why it failed]

## Solution
[The fix that worked, including code snippets when useful]

## Why This Works
[Root cause explanation and why the fix addresses it]

## Prevention
- [Concrete practice, test, or guardrail — include code where applicable
  (configs, test assertions, lint rules)]

## Related Issues
- [Related docs or issues, if any]
```

## Knowledge track

```markdown
---
title: [Clear, descriptive title]
date: [YYYY-MM-DD]
category: [docs/solutions subdirectory]
module: [Module or area]
problem_type: [schema enum]
component: [kind of thing involved]
severity: [schema enum]
applies_when:
  - [Condition where this applies]
tags: [keyword-one, keyword-two]
---

# [Clear, descriptive title]

## Context
[What situation, gap, or friction prompted this guidance]

## Guidance
[The practice, pattern, or recommendation with code examples when useful]

## Why This Matters
[Rationale and impact of following or not following this guidance]

## When to Apply
- [Conditions or situations where this applies]

## Examples
[Concrete before/after or usage examples showing the practice in action]

## Related
- [Related docs or issues, if any]
```
