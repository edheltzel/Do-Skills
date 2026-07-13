# Grill With Docs

Quickstart:

```bash
npx skills add edheltzel/skills --skill=grill-with-docs
```

```bash
npx skills update grill-with-docs
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/productivity/grill-with-docs)

## What it does

`grill-with-docs` runs a [grilling](./grilling.md) session that also captures the decisions as it goes — writing ADRs and a glossary through the [domain-modeling](../core/domain-modeling.md) skill. It is a thin composition: the grilling discipline supplies the interview, domain-modeling supplies the durable record.

The point is that the interview leaves an artifact behind. Where a plain grilling produces a shared understanding held in the conversation, this one lands that understanding in decision records and a ubiquitous-language glossary you keep.

## When to reach for it

You invoke this by typing `/grill-with-docs`. Reach for it when the grilling is worth documenting — an architectural decision, a domain whose terms you want pinned down — and you want the ADRs and glossary written as the decisions resolve, not reconstructed afterward. For a grilling that produces no docs, use [grilling](./grilling.md).

## Where it fits

Sits between [grilling](./grilling.md) (the interview) and [domain-modeling](../core/domain-modeling.md) (the record), composing the two. Imported and adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT).
