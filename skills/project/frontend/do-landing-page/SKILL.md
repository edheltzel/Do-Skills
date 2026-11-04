---
name: do-landing-page
description: >-
  Build a landing page: one offer, one audience, one action, then the page
  that wins it. Use when creating or rewriting a landing page, marketing page,
  campaign page, or its hero, headline, or CTA. NOT FOR an existing page that
  needs polish (do-redesign), a reusable component (do-design-system), or a
  whole-site redesign (ensoul, if installed).
---

# Landing Page

A landing page wins one intent. A homepage serves several.

**One offer, one audience, one action.**

Settle the page before drawing it. Part A decides what it says. Part B decides how it looks.

## A. The page

Ask for what is missing, in one batch, then build. When the user cannot answer, state one assumption and continue.

- The one action: trial, demo, buy, waitlist, download. Name the offer and what counts as a conversion.
- Who it is for, the problem, the top three objections, the traffic source, and what visitors already know.
- Proof on hand: logos, numbers, testimonials, screenshots, a guarantee. A missing fact stays a marked placeholder (`{{price}}`, `{{testimonial}}`). Never invent a price, stat, testimonial, or logo.
- Voice, and whether mobile comes first.

**Above the fold:** headline (outcome plus audience), subheadline, one primary CTA, one proof signal, one hero visual. No second CTA here.

**The argument:** problem to solution, three to five benefits, three steps, proof beside the claim it supports.

**The close:** six to twelve FAQ questions, one risk reversal (trial, no card, cancel anytime, guarantee), and a final CTA identical to the first.

Pick one layout and say why: classic hero plus sections, long-form story, minimal page for high-intent traffic, or a comparison page for "X vs Y" search.

**Copy.** Benefit before feature, and a number instead of a verb: "Cut weekly reporting from 4 hours to 15 minutes." A CTA is a verb plus what they get. Headline shapes: "{Outcome} without {pain}", "The {category} for {audience}", "Ship {result} in {time}".

Write real sentences in the product's voice. Names and brands fit the audience and the industry. In a fictional demo, numbers carry an odd digit and dates vary. Sentence case. A confirmation names what happened ("Invoice sent to Dana"). An error names the failure and the next step.

**Index it** when the offer is evergreen: title, meta description, internal links, FAQ in plain question and answer. **Noindex** an ad-only or time-bound page.

Build in order, one section per pass: hero, benefits, how it works, proof, FAQ, final CTA.

Before code, return: the section outline, the hero copy, the benefits, the three steps, the FAQ, the index decision, and the layout with its reason.

## B. The look

Read `DESIGN.md` at the project root when it exists. Its type, spacing, radius, color, motion, and icon decisions replace the fallback entirely.

With no `DESIGN.md`, load [references/visual-system.md](references/visual-system.md) and use only its values. Capture the project's own brand with `do-design-system` instead of extending the fallback.

## States and ship

Every interactive element ships hover, active (`scale(0.98)`), and a visible focus ring. Loading is a skeleton shaped like the layout. Empty is a getting-started view. Errors are inline.

Footer carries privacy and terms. Ship a branded 404, a skip-to-content link, a favicon, alt text, and `og:image`. Validate email and required fields before submit. Check at 390px: no horizontal overflow, the primary action visible in the first screen.

## Hand off

- Tokens and components: `do-design-system`.
- An existing page that looks generic: `do-redesign`.
- A whole site from scratch: `ensoul`, if installed.
- CSS mechanics: `do-modern-css`.
