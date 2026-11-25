# Uber: SEO Action Plan

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=uber-seo-action-plan
```

```bash
npx skills update uber-seo-action-plan
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/marketing/uber-seo-action-plan)

Copied from [ubersuggest/seo-skills](https://github.com/ubersuggest/seo-skills) (Apache-2.0).

## What it does

`uber-seo-action-plan` looks at a website and decides what its owner should do next about SEO, in plain language, without making them choose. It never ends with a menu: it picks the single problem that most explains the missing traffic, says why in a sentence a non-marketer understands, and offers to run that first step now.

Three next steps at most, ranked, with one marked to do first. Figures come from Ubersuggest and are reported as meaning, not as a metric dump. An invented diagnosis is refused.

## When to reach for it

Type `/uber-seo-action-plan`, or the agent reaches for it automatically when a task fits.

Reach for this when the user does not know where to start, asks what is wrong with their site, whether their SEO is any good, why they get no traffic, what to do first, or hands over a domain with no specific question. It is the entry point for anyone who does not know SEO terminology. For a keyword list, use [uber-keyword-research](./uber-keyword-research.md). For who outranks the site, use [uber-competitor-analysis](./uber-competitor-analysis.md). For a technical crawl, use [uber-site-audit](./uber-site-audit.md).

## Prerequisites

The Ubersuggest MCP server must be connected. If no `ubersuggest` tool is available, the skill stops and asks for that connection. It does not diagnose from a web search, a page fetch, or another SEO provider.

## The binding constraint

Exactly one reason the site is not getting traffic. If the domain is already a Ubersuggest project, read `seo_opportunities` (Quick wins, Competitor gaps, SEO issues) and choose one item instead of relaying the list. Otherwise stop once the constraint is obvious.

| What you see | Outcome | Do first |
| --- | --- | --- |
| Keywords at positions 4-20 | Write | [uber-content-brief](./uber-content-brief.md) |
| Almost no keywords or pages, or brand-only rankings | Research | [uber-content-demand-finder](./uber-content-demand-finder.md), then [uber-keyword-research](./uber-keyword-research.md) |
| Competitors rank and this site does not | Research | [uber-competitor-analysis](./uber-competitor-analysis.md) |
| Traffic, but the site is slow or broken | Fix | [uber-site-audit](./uber-site-audit.md) |
| A sound site writing topics nobody searches | Research | [uber-content-demand-finder](./uber-content-demand-finder.md) |

When two look true, pick the cheaper fix. The page says where the site stands, names the constraint, states the first action, then two later steps. Words match the app: Analyze, Track, Research, Write, Fix, Keep the loop.

## Where it fits

This is the decide-first step among the Ubersuggest SEO skills. The siblings above do the chosen job. If there is no project yet, [uber-project-setup](./uber-project-setup.md) is what makes the app keep refilling that list. Refusing numbers without a live connection is the same rule as [uber-seo-foundations](./uber-seo-foundations.md).
