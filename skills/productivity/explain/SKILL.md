---
name: explain
description: "A personal explainer with four modes — concept | diff | idea | work-recap — that turns one thing into a dense, visual explainer written for you personally, then makes it stick with a check-in (predict-then-reveal for diffs, corrected exercises otherwise). USE WHEN you want to learn one thing well — understand a change, a subsystem, an external concept, or your own idea, or catch up on recent work; explain this to me, walk me through, catch me up, what did I do this week, prep me for standup. NOT FOR multi-session teaching (use teach), a decisive adopt/switch verdict (use pov), or repo/API documentation. explain is a single-shot personal explainer."
---

# Explain

*Imported/adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT).*

Teach the user one thing well: a concept, a change, an idea, or a window of their own recent work. Agent-driven development removed the learning that writing code by hand used to provide; this skill is the replacement — the human keeps learning while agents do the writing.

What to explain is the input this skill was invoked with — present in the current prompt or conversation, whether the user asked directly or a calling skill passed it.

## Who the explainer is for

The user personally — dense, technical, one voice, no audience adaptation. It preps the user; it never produces a deck or repo docs. The artifact is **display-only**: no embedded quizzes, forms, or widgets — the doing happens in the session, where answers can be checked.

`explain` is the single-shot sibling of `teach`. `teach` runs a stateful, multi-session workspace; `explain` produces one artifact in one sitting. When the user wants ongoing pedagogy over time, route to teach.

Whenever you must ask the user something, ask and then **wait** for the reply — never silently skip the question, and never answer it yourself. Ask one question at a time.

## Phase 1: Classify the input

Classify the request into exactly one of four modes before any grounding runs. Reason over the prompt; an explicit token always beats inference.

| Token | Example | Effect |
|-------|---------|--------|
| `diff:<ref-or-range>` | `diff:abc1234`, `diff:main..HEAD`, `diff:PR#42` | Forces **diff** mode on that change |
| `since:<window-or-ref>` | `since:monday`, `since:7d`, `since:v2.1.0` | Forces **recap** mode over that window |

`diff:` and `since:` together conflict — say so and ask which mode the user wants. A `<word>:<word>` that isn't one of these (including commit prefixes like `feat:` inside a topic) is request text, not a flag.

With no forcing token, classify by shape:

- **Diff** — names a resolvable change: a sha, branch, PR, "the last commit", "what you just did", "this change".
- **Recap** — asks what happened over time: "what did I do this week", "catch me up", "prep me for standup". Default window: the last 7 days in the current repo.
- **Idea** — presents a proposal or notion of the user's to be understood: "explain my idea of X", "what would Y imply". The idea is a fixed given.
- **Concept** — everything else: a topic, pattern, subsystem, or external subject to learn.

**Tiebreak — concept vs diff:** when a request is plausibly both (a repo topic that also names an identifiable recent change, e.g. "explain the retry logic we just added"), a concretely resolvable change wins: diff mode, with the concept as framing context.

**Bare invocation** (no input at all): ask one question — "What should I explain?" — offering a recap of recent work in this repo as a shortcut alongside free text. Do not produce a default artifact unprompted.

## Phase 2: Ground

Match grounding to the mode. Gather the topic-specific evidence fresh every run.

- **Diff mode:** resolve the change (the `diff:` ref, or the most recent substantial change when the request points at one implicitly) and gather its evidence — the diff itself, the files it touches, any plan or solution doc that motivated it. Gather **silently**: nothing learned here is narrated to the user until the check-in gate (Phase 3) is satisfied.
- **Recap mode:** gather what actually happened in the repo over the resolved window — `git log` (subjects, shas, dates) with stat-level views of the substantial commits, merged/open PRs where a PR interface (`gh`, a connector) is reachable, and any plan/brainstorm/solution docs added or changed in the window that carry the *why*. Group related commits; bundle mechanical churn (version bumps, typo fixes) into one housekeeping line. **Empty window** (no git activity, no doc changes): say so, offer to widen the window, write no artifact, and end the run after the user responds.
- **Concept mode:** a concept grounds in the repo only when it actually touches it. For a repo topic, read its call-sites and surrounding conventions. For an **external subject** (a language feature, a paper, an interview topic), skip repo grounding entirely — do not force repo context in. Research with whatever web tools are reachable; when none are, you may explain from model knowledge, but the artifact must carry the label **Unverified — from model knowledge, not checked against current sources** in its metadata header.
- **Idea mode:** the idea is a fixed given. Explain its implications, mechanics, and trade-offs for the user's understanding. Never scope it into a requirements dialogue, and never generate and rank alternatives — that is `ideate`'s job.

## Phase 3: Check-in gate — before anything is revealed

The check-in is the active-recall step that makes the explainer stick: the user produces first, the explanation confirms or corrects. Judge whether the material warrants one, then offer it. The user can always decline, and declining is final for the run — do not re-offer.

**Warrant test.** Offer a check-in when retention is the point: a hard or unfamiliar concept, a gnarly or consequential diff, a dense recap with decisions worth recalling later. Skip it (produce the explainer and move on) when comprehension is the point and retention is incidental: a routine pre-meeting recap, a small mechanical diff, a topic the user only needs to skim. When skipping, don't announce a justification — just proceed.

**Diff mode — hard ordering rule.** No interpretive content — explanation, annotation, diagram, or surfaced opportunity — may reach the user before their prediction turn ends. In diff mode:

1. Show only the raw change reference: the diff or its stat summary, with zero commentary. Word the offer itself without describing the change's content or purpose — a summary pre-leaks the reveal.
2. Ask for the prediction: what does this change do, and why was it made? Free text is the primary answer path; any options offered must be genuinely competing readings, not one right answer plus padding.
3. **End the turn.** Never place any explanation in the same message as the prediction prompt.
4. After the prediction lands, compose the reveal (Phase 4) and name the gaps explicitly: what the prediction got right, what it missed, what it got wrong and why reality differs. The gap-naming is the teaching.

## Phase 4: Compose the explainer

Compose a **single self-contained HTML5 file** and write it where Phase 6 sends it. Hard invariants:

- **No external requests of any kind.** CSS lives in a `<style>` block; SVG is inline; images are base64 data URIs. Use a system font stack (no webfonts) so the file reads identically offline and inside CSP-restricted viewers.
- **A visible metadata header carries everything** — title, date, mode (concept / diff / idea / recap), the subject (topic, ref, or window), and the `Unverified` label when Phase 2 fell back to model knowledge. No hidden JSON, `data-*`, or `<meta>` duplication.
- **Display-only.** No forms, click handlers, embedded quizzes, or scripts — the check-in lives in the session.
- A visible footer names the composition: `Composed <date> by explain`.

**Show-n-tell — match the form to the material.** Every explainer leads with something to look at, chosen by what the material actually is. One visual per load-bearing concept, never decoration:

| Material | Show |
|----------|------|
| Architecture, relationships, boundaries | Inline SVG diagram (boxes, labeled arrows; halo/contrast so labels stay legible) |
| Code behavior, a diff's mechanics | Annotated snippet: the real lines, with margin notes explaining the *why* per hunk |
| A process, lifecycle, or state change | Numbered flow or state strip |
| A window of work (recap) | Timeline: date-ordered entries, each with what changed and why it mattered |
| A comparison or trade-off | Two-column contrast, prose verdict underneath |

Diagrams complement prose; they never replace it. A reader who skips every visual still gets the full explanation in text.

**Reading ergonomics.** Hold prose to ~70ch (`max-width` on text blocks; full-width only for diagrams and code). Lead each section with the point, then the mechanism, then the caveat. Dense is good; long is not — one sitting's read. Use real code from the grounding evidence where it exists; invent minimal examples only for external topics, always syntax-highlighted with inline `<style>` classes.

**Before presenting, audit:** no external URLs anywhere in the file; metadata header complete and visible; every visual has a prose equivalent; the file opens correctly standalone.

## Phase 5: Exercises (when the check-in was accepted)

For concepts, ideas, and dense recaps: pose two to four exercises in chat, one at a time, after the artifact is presented. Design them to expose understanding, not recall of the artifact's phrasing:

- **Apply** — a small scenario the concept decides ("given X, what happens / what would you choose?").
- **Explain-back** — the user restates the core mechanism in their own words.
- **Boundary** — a case where the concept doesn't apply, or where the naive reading fails.
- **Recap recall** (recap mode) — why a notable change in the window was made, or what its consequence was.

Check each answer as it arrives: confirm what's right, correct what's wrong, and name the specific gap the answer exposed. One correction per exercise — don't lecture past the gap. Stop after the planned exercises; don't spiral into quiz mode. Exercises live in chat, never inside the artifact.

## Phase 6: Output and close

Write the explainer to a local file. Default to `docs/explainers/<slug>.html` (a plain directory, created if needed — not archival machinery, no session registry); otherwise use the path the user names. Then display an inline summary plus the file path, and where the platform exposes a browser-opening primitive (`open` on macOS, `xdg-open` on Linux, `start` on Windows) offer to open it.

**Improvement observations.** When composing surfaced things that could be better, mention them as follow-ons rather than acting on them:

- **New-capability ideas** — `ideate` can generate and rank directions from them.
- **Code-clarity findings** — `simplify` can clean up the files they concern.

## Boundaries

- **Not a verdict.** "Should we adopt X?" is `pov`. explain teaches what X is and how it works.
- **Not repo memory.** Documenting a solved problem for future work is `compound`. explain teaches the human, not the repo.
- **Not multi-session teaching.** A stateful course that spans sessions is `teach`. explain is single-shot.
- **Not ideation or scoping.** An idea input is explained as given — implications and trade-offs — never expanded into ranked options (that is `ideate`) or a requirements dialogue.
- **The check-in is never headless.** It exists to exercise the human; automating the answers deletes the product.
