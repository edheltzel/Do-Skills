# AI-Writing Tells

Patterns that mark text as AI-generated in docs, commit messages, PRs, and comments. Use this to catch and remove them when revising.

## Core Heuristic: Score Density, Not Individual Words

No single word proves AI authorship. A human can write "utilize" once. The signal is **clustering**: three or more tells in close proximity. Flag a passage when the density crosses that line, not when one flagged word appears in isolation.

Signal tiers:

- **High signal** — rare in natural developer writing. Flag every occurrence, then judge in context.
- **Medium signal** — normal alone, meaningful in clusters of 3+.
- **Low signal** — structural or stylistic habits; confirm against the surrounding text before acting.

For the word-by-word replacement tables (high- and medium-signal vocabulary, era context, what not to flag), see [vocabulary-swaps.md](vocabulary-swaps.md).

## Filler Patterns

### Filler phrases

Openers that contribute nothing after removal. The surrounding sentence stays grammatical and keeps its meaning.

| Phrase | Fix |
|--------|-----|
| "It's worth noting that" | Delete, or state the fact directly |
| "As mentioned earlier/above" | Link to the section, or delete |
| "This allows us to" | State what happens |
| "In this section, we will" | Delete; start the section |
| "Let's take a look at" | Delete |
| "As we can see" | Delete |
| "Going forward" | Delete, or specify a timeframe |

```markdown
Before:  It's worth noting that the connection pool defaults to 10.
After:   The connection pool defaults to 10.
```

### Excessive hedging

Stacked qualifiers on statements that should be definite. In technical writing, something is true or it is not.

- "might potentially," "could possibly" — pick one or neither
- "this should theoretically" — test it and state the result
- "it is generally considered" — by whom? cite or state directly

```markdown
Before:  This approach might potentially reduce latency in some cases.
After:   This approach reduces p95 latency by ~40ms in benchmarks (see #214).
```

Removing hedges changes the strength of the claim. Verify the result is accurate before keeping it. A measured uncertainty backed by evidence is not a tell.

### Generic conclusions

Empty summarizing paragraphs that restate what the reader just read.

- "In conclusion, we have seen that…"
- "Overall, this implementation provides…"
- "With these changes in place, we now have…"

Delete them. If a section needs a close, replace it with concrete next steps or references.

## Content Patterns

### Promotional language

Marketing adjectives instead of factual description of what the code does.

Trigger words: `robust`, `elegant`, `seamless`, `powerful`, `comprehensive`, `enterprise-grade`, `best-in-class`, `state-of-the-art`, `effortlessly`.

```markdown
Before:  feat: add robust and elegant caching layer for seamless data retrieval
After:   feat: add Redis cache for user profile queries
```

### Vague authority

Unattributed claims borrowing weight from unnamed sources.

Trigger phrases: `research shows`, `studies have shown`, `experts agree`, `best practices dictate`, `industry-standard`.

Replace with a specific reference (issue, ADR, link) or drop the claim.

```markdown
Before:  Research shows that structured error handling significantly improves reliability.
After:   Uses the Result pattern (Ok/Err) instead of exceptions. See ADR-0012.
```

### Rhetorical framing

Engagement hooks where developers write direct statements.

- Rhetorical question openers: "Ever wondered how to secure your API endpoints?"
- "Imagine" framing: "Imagine a world where your deployments never fail."
- Dramatic intros: "In today's fast-paced development landscape…"

```markdown
Before:  Have you ever struggled with flaky tests? This PR tackles that age-old problem…
After:   Fix flaky tests by making test ordering deterministic.
```

### Synonym cycling

Calling one thing by several names to avoid repetition. In technical writing, consistency beats variety — call a function a function every time.

Common cycling sets: function / method / procedure / routine; component / widget / element; refactor / restructure / reorganize / rearchitect.

Pick the most accurate term and use it consistently. (Needs review — decide which term is correct first.)

### Commit-message inflation

Grand narratives for small changes.

| Inflated | Plain |
|----------|-------|
| "Revolutionize the authentication flow" | "Fix auth token refresh" |
| "Comprehensive overhaul" | "Refactor" |
| "Introduce a paradigm shift" | "Change" / "Switch to" |
| "Empower users with" | "Add" |
| "Streamline the workflow" | "Simplify" |

## Formatting Tells

- **Boldface overuse** — every key term bolded, so nothing stands out. Reserve bold for UI labels, a term's first introduction, and warnings. Do not bold list labels the structure already emphasizes.
- **Emoji decoration** — rockets and sparkles in changelogs, headings, and commit messages. Remove unless the emoji is a functional status indicator.
- **Heading restatement** — the first sentence after a heading rephrases the heading ("Error handling is an important aspect of…"). Jump straight to substance. (Needs review: a restated sentence sometimes carries a real qualifier; keep that.)

## Communication Tells

Conversational artifacts that leak from a chat session into committed text.

- **Chat leaks** — "Certainly! Here's how to…", "Great question!", "As requested…". Delete the preamble.
- **Cutoff disclaimers** — "As of my last update…", "Based on current knowledge…". Replace with a versioned reference or remove.
- **Sycophantic tone** — "Excellent approach!", "This is a brilliant solution!" in reviews or docs. Replace with a neutral technical statement.
- **Apologetic errors** — "We're sorry, but…", "I apologize for any inconvenience". Error text should be informative and actionable. (Needs review: preserve all diagnostic detail — codes, paths, values — when rewording.)

## Code-Comment Tells

Tautological docstrings, narrating obvious code, "This function…" openers, and exhaustive parameter enumeration are covered by [core/code-comments](../../../core/code-comments/SKILL.md). Apply that skill for comment and docstring tells.

## What NOT to Flag (False Positives)

| Looks suspicious | Why it's fine |
|---|---|
| "ensure" in security or reliability docs | Legitimate technical term ("ensure the connection closes") |
| A single high-signal word | The tell is density; one word is not enough |
| Perfect grammar | Many humans write well |
| Formal or academic prose | Correlation is with specific words, not formality |
| Transition words alone | Only a few specific transitions are AI-overused |
| Mixed casual/formal register | Common in technical fields |
| "acts as" for an adapter/proxy pattern | Accurate description of the design |
| Measured uncertainty with evidence | Preserve uncertainty the evidence requires |

## Review Questions

1. Does any passage cluster 3+ tells in close proximity?
2. Does the text say what the code does, or how great it is?
3. Are claims attributed to a specific source, or to vague authority?
4. Would the doc lose technical content if the intro and conclusion were deleted?
5. Is one concept referred to by multiple names within a section?
6. Do commit subjects use dramatic verbs for routine changes?
7. Does the text read like authored documentation, or one side of a conversation?
