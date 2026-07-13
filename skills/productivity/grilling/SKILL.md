---
name: grilling
description: Grill the user relentlessly about a plan or design until you reach shared understanding — one question at a time, each with a recommended answer. USE WHEN the user wants to stress-test a plan or design before building, or uses any 'grill' trigger phrase. NOT FOR a grilling that also writes ADRs and a glossary as it goes (use grill-with-docs), grilling workflow specs (use loop-me), mining raw fragments toward something to write (use writing-fragments), or a decisive verdict on adopting/switching to a named external tool (use pov).
---

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time, waiting for feedback on each question before continuing. Asking multiple questions at once is bewildering.

If a *fact* can be found by exploring the codebase, look it up rather than asking me. The *decisions*, though, are mine — put each one to me and wait for my answer.

Do not enact the plan until I confirm we have reached a shared understanding.

## Optional passes

Fire these only when the moment arms them. Each is a probe folded into the one-question-at-a-time flow, never a pre-flight gauntlet.

- **Blindspot pass** — when I flag territory I can't evaluate ("I know nothing about X", or "you decide" twice running on questions that need domain judgment). Before the first question *into that territory*, map its decision surface instead of extracting guesses: 3–7 items, each a decision I'll face or a hazard that constrains one, in my vocabulary, with the realistic options and your recommended default. Then I choose among options I can now weigh. Offer once per territory; a declined or unreachable territory takes the recommended defaults, recorded as explicit assumptions.
- **Product pressure test** — scan for rigor gaps and raise only the ones that exist, as open questions: an **evidence** gap (want asserted, but nothing already done about it), a **specificity** gap (beneficiary too abstract to design for), a **counterfactual** gap (no visible current workaround or cost of shipping nothing), an **attachment** gap (a solution shape mistaken for the value it delivers), and for durable bets a **durability** gap (value resting on a world-state that may shift). A concrete, well-framed plan may earn zero probes.
- **Integration check** — before closing, combine what I've said with what you'd default to and surface any non-obvious downstream consequence the one-at-a-time dialogue never reached ("if mute lives on the rule and we don't warn on delete, then rule-delete silently loses pause state"). One probe per genuine combination effect.

## Routing

An adopt / switch / migrate / compare verdict on a specific external technology, library, or platform is not a grilling — route it to `pov`, which grounds the verdict in this project.
