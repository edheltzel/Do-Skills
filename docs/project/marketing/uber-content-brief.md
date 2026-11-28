# Uber: Content Brief

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=uber-content-brief
```

```bash
npx skills update uber-content-brief
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/marketing/uber-content-brief)

Copied from [ubersuggest/seo-skills](https://github.com/ubersuggest/seo-skills) (Apache-2.0).

## What it does

`uber-content-brief` builds a brief a writer can work from for one target keyword, based on the pages that already rank for it. The brief comes from the search results, not from a rule of thumb: format, length, headings and subtopics all follow what Google ranks today.

It writes a brief, not the article. Generating the article through Ubersuggest's Content Studio costs 100 monthly credits, so the skill shows the title and outline and waits for a clear yes first.

## Example

```
/uber-content-brief Create a brief for best standing desk for a small apartment
```

## When to reach for it

Type `/uber-content-brief`, or the agent reaches for it automatically when a task fits: what to write about a keyword, how to outline an article, how long a post should be, or how to beat the pages that rank now.

Reach for this when you already have the keyword. To find keywords first, use [uber-keyword-research](./uber-keyword-research.md). When you do not know what to write about at all, use [uber-content-demand-finder](./uber-content-demand-finder.md).

## Prerequisites

The Ubersuggest MCP server has to be connected and logged in. Without it the skill stops instead of filling the gap with a web search or another SEO provider. See [uber-seo-foundations](./uber-seo-foundations.md).

## Read the SERP, then the winners

The search results page sets the intent: listicles mean commercial, tutorials mean informational, product pages mean transactional. Then, for the top 3 to 5 pages, it pulls every keyword each one ranks for. Together those lists show the subtopics the new page has to cover. If the keyword is too hard for the site to win, it says so and offers a longer-tail variant instead.

## The brief

- The target keyword with volume, difficulty, CPC, intent, and the clicks it is worth at a realistic position.
- One sentence on the angle: what this page does that the ranking pages do not.
- Format and length, taken from the range that ranks.
- An outline of headings written as the questions people search, each with what it must answer.
- Secondary keywords mapped to sections, the entities every ranking page mentions, the SERP features to target, and internal links when the domain is known.

## Where it fits

A step between research and writing. Clusters from [uber-keyword-research](./uber-keyword-research.md) or gaps from [uber-competitor-analysis](./uber-competitor-analysis.md) feed it, and the outline goes to a writer. For which claims the page may make about your product, use [gtm](./gtm.md).
