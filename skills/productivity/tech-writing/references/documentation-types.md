# Documentation Types

Use this reference for tutorials, how-to guides, reference material, explanations, and conceptual pages.

## Start with the reader's required result

Classify the page by the result that matters most when the reader opens it. Ignore the topic, the reader's seniority, and the presence of code samples; any of those can appear in all four types.

Ask which failure would make the page useless:

- The reader followed it but did not gain a capability: **tutorial**.
- The reader could not finish a specific job: **how-to**.
- The reader could not find a precise fact quickly: **reference**.
- The reader still could not reason about the subject: **explanation**.

| Required result | Type | Page shape |
|---|---|---|
| Gain a capability through a managed exercise | **Tutorial** | A curated route, few decisions, safe inputs, and observable progress |
| Reach a practical outcome in the reader's situation | **How-to** | A stated goal, prerequisites, decision points, recovery paths, and a completion check |
| Retrieve an exact contract or value | **Reference** | Stable product vocabulary, repeated fields, precise facts, and scan-friendly organization |
| Form a useful mental model | **Explanation** | Causes, mechanisms, reasons, alternatives, implications, and tradeoffs |

When more than one result matters, choose the one the title promises and the page must deliver. Treat the others as support or give them their own linked pages.

## Type contracts

### Tutorial

A tutorial teaches by controlling the exercise. Give the learner one dependable route through a representative case. Introduce choices only when the choice itself is part of the lesson. After each meaningful action, state what the learner can observe and what that observation establishes.

The finish line is a capability the learner can reuse, not merely a command that ran once.

### How-to

A how-to helps a reader accomplish a defined job in a real environment. State the outcome and prerequisites. Cover decisions, hazards, and failures that materially change completion. End with evidence that distinguishes success from a partial or silent failure.

Assume the reader came to act. Link to background that does not affect the next decision.

### Reference

Reference material is the authoritative lookup surface. Match the names and hierarchy the product exposes. Use a predictable field order so readers can compare entries. Record exact syntax, types, defaults, limits, compatibility, return values, side effects, and errors where they apply.

Optimize for finding and confirming facts. Narrative belongs only where it prevents a likely misreading of the contract.

### Explanation

Explanation gives the reader a model they can use to predict behavior or judge a design. Connect causes to effects. Make assumptions and constraints visible. Discuss why the system has its shape, which alternatives exist, and what each choice costs.

Examples should test or clarify the model. If the sequence of actions becomes the main value, that sequence belongs in a tutorial or how-to.

## Keep inline or split into another page

Keep supporting material inline when all of these are true:

- It is needed to continue the primary journey safely or correctly.
- It is short enough that the page retains its intended reading pattern.
- It depends on the local step or fact and has little value on its own.

Split the material and cross-link it when any of these are true:

- Readers will search for or reuse it independently.
- It needs a different reading mode, such as scanning a catalog inside a linear exercise.
- It introduces substantial branches, rationale, or facts that obscure the primary result.
- It has its own maintenance lifecycle or authoritative owner.

Link at the decision point where the reader needs the secondary page. Name what the link provides; avoid generic labels such as "learn more."

## Common classification errors

- **Tutorial versus how-to:** a tutorial manages practice so the reader learns; a how-to accommodates real conditions so the reader finishes work. Difficulty and audience experience do not decide the type.
- **Reference versus explanation:** reference answers "what exactly is the contract?" Explanation answers "why does it behave this way, and what follows from that?"
- A procedure can carry a brief reason for a dangerous step without becoming an explanation.
- A how-to can include the few parameter values needed for the task without duplicating a complete reference catalog.
- Commands alone do not make a tutorial. A learner needs observable results and a reusable capability.
- A long page is not automatically mixed. Split by independent reader journey, not by length.

## Completion checks

Before publishing, confirm:

- The title and opening state the primary result.
- The section order supports the reading mode for the selected type.
- Secondary content either advances that result or links to a page with its own result.
- Procedures show how to recognize success.
- Lookup facts are exact and consistently shaped.
- Explanations connect claims to mechanisms or reasons.
