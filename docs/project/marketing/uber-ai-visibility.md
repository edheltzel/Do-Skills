# Uber: AI Visibility

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=uber-ai-visibility
```

```bash
npx skills update uber-ai-visibility
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/marketing/uber-ai-visibility)

Copied from [ubersuggest/seo-skills](https://github.com/ubersuggest/seo-skills) (Apache-2.0).

## What it does

`uber-ai-visibility` reports how visible a brand is inside AI answers (ChatGPT, Perplexity, Google AI Overviews, Claude) using Ubersuggest AI Search Visibility data. Every figure comes from that account's configured project. A guess about how often a model names the brand is not a measurement, and this skill will not replace a missing connection with a web search, a page fetch, or prior knowledge.

An empty overview is not an invisible brand. "No data" and "not mentioned" are different findings and must not be conflated.

## When to reach for it

Type `/uber-ai-visibility`, or the agent reaches for it automatically when a task fits.

Reach for it when the question is AI search visibility: whether ChatGPT or other AI tools mention the brand, share of voice in AI answers, AEO or GEO, sentiment in LLM responses, or which competitors get recommended instead. For organic competitors, keyword gaps, and traffic estimates, use [uber-competitor-analysis](./uber-competitor-analysis.md).

## Prerequisites

The Ubersuggest MCP server must be connected. `auth_status` runs first. If the account is logged out, ask for the connection and stop. If there is no project, run [uber-project-setup](./uber-project-setup.md) so the project and its AI topics and prompts exist. If the project exists but no brand is configured (`has_brand` false, or `brand_config` finds none), call `configure_brand`. The first report takes about a day to populate.

## Read the config, then the overview

Match the project with `list_projects` on the name or domain in the request. Read `brand_config` before the metrics: topics, prompts, competitors, brand aliases. If the tracked prompts do not reflect how customers ask, report that.

`brand_visibility_overview` supplies visibility %, average rank among mentions, share of voice, and sentiment, broken down per provider. Use `start_date` and `end_date` for a window; compare two windows for a trend instead of guessing direction. Set `provider` when the user cares about one engine.

## Prompt gaps

`brand_prompts` is the actionable detail. Split the prompts into what is working (brand appears and ranks well), the gap (competitors appear and the brand does not, highest-value first), and reputation (negative or mixed sentiment, which needs a different fix). Name the weak engines. Strong in Perplexity and absent in ChatGPT is a real pattern.

Deliver a headline for the window, a per-provider table, the missing prompts with who appeared instead, which competitor dominates which topic, and any unfavourable mention quoted specifically. Suggest content that answers those prompts with extractable structure, explicit entity naming, and off-site presence in the reviews, roundups, and directories answer engines synthesise from. If [uber-seo-foundations](./uber-seo-foundations.md) is installed, its `references/methodology.md` AEO/GEO section covers that; if not, do not go looking for it.

## Where it fits

Run this whenever you need a fresh AI-answer readout on a project that already tracks a brand. [uber-project-setup](./uber-project-setup.md) is the one-time setup that makes the readout possible. [uber-seo-foundations](./uber-seo-foundations.md) holds the connection rule this skill stops on, and the source-selection method behind the recommendations.
