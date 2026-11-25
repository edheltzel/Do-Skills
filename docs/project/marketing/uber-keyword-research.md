# Uber: Keyword Research

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=uber-keyword-research
```

```bash
npx skills update uber-keyword-research
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/marketing/uber-keyword-research)

Copied from [ubersuggest/seo-skills](https://github.com/ubersuggest/seo-skills) (Apache-2.0).

## What it does

`uber-keyword-research` runs a full keyword research pass for a topic, niche, product, or business and returns a prioritised keyword list grouped into clusters. The list is ordered by opportunity, not by volume: search volume weighted by how commercial the intent is, divided by how hard the keyword is to rank for. The skill says that ranking rule in one line before the table, then gives each of the top ten a one-clause reason naming the number that put it there.

Every figure is for a market and language it states. If you named no place, it asks once or declares the default (US / en) instead of quietly using the wrong market.

## When to reach for it

Type `/uber-keyword-research`, or the agent reaches for it automatically when a task fits: finding keywords, checking search volume or difficulty, or looking for long-tail or low-competition terms.

Reach for this when the topic is already known. For a competitor's keywords and the gaps between domains, use [uber-competitor-analysis](./uber-competitor-analysis.md). When you do not know what to write, use [uber-content-demand-finder](./uber-content-demand-finder.md). To outline one keyword, use [uber-content-brief](./uber-content-brief.md).

## Prerequisites

The Ubersuggest MCP server has to be connected and logged in. No numbers without the connection. If the tools are missing or auth says logged out, the skill stops and does not replace Ubersuggest with a web search, a page fetch, prior knowledge, or another provider's connector. See [uber-seo-foundations](./uber-seo-foundations.md).

## Seeds to a shortlist

It picks 1 to 3 broad seed terms, not sentences, because suggestions expand many queries per seed. Those seeds feed suggestion lists and a deeper match list. It then cuts to about 20 to 40 relevant candidates and pulls volume, CPC, SD, and PD only for the ones that matter. Intent is informational, commercial, transactional, or navigational, inferred from the query, or from what Google ranks when a keyword is ambiguous and important.

## Clusters and quick wins

Keywords that one page could satisfy share a cluster, named after that page. The table is keyword, volume, SD, CPC, intent, cluster. Prose after it covers quick wins (decent volume, SD under about 30, clear commercial intent), clusters worth building (page type plus 3 to 8 keywords), and what to skip: high SD without authority, or volume with no fit to the business.

## Where it fits

Run this whenever a known topic needs a ranked keyword list. A cluster from here is the starting point for [uber-content-brief](./uber-content-brief.md). If there is no specific keyword question and the real ask is what to do about SEO first, use [uber-seo-action-plan](./uber-seo-action-plan.md).
