# Writing docs pages

Every skill in a **promoted** bucket - `core/`, `engineering/`, `authoring/`,
`slop-guard/`, or `workflow/` - has a human-facing **docs page** at
`docs/<bucket>/<base-slug>.md`, where `<base-slug>` is the skill's directory
name **without** its `do-` prefix. The docs tree mirrors those five bucket
folders under `skills/`. `operations/`, `personal/`, and `private/` are **not**
promoted and ship no docs page.

The page is not the skill and not a copy of `SKILL.md`. Its job is to orient one
reader around one skill: what it does, when to reach for it, and where it sits
among the others. Together the pages are a distributed map of the collection.

Act whenever a promoted skill is added, renamed, moved between buckets, or has
its behaviour changed: create or re-sync its docs page. A rename moves the file
(`docs/<bucket>/<old>.md` → `docs/<bucket>/<new>.md`); a skill moving between
promoted buckets moves its docs file to the matching folder. A skill moving into
a non-promoted bucket (`operations/`, `personal/`, or `private/`) loses its
page; one moving into a promoted bucket gains one.

## Repo conventions

This repo is **not** published to a website — pages are read on GitHub. So:

- **Keep an H1** with the skill's title (GitHub renders it as the page heading).
- **Links are repo-relative.** Link a sibling docs page as
  `../<bucket>/<name>.md`. Link the skill's own source as the GitHub tree URL
  (below). A relative link that resolves on GitHub is correct.
- The **docs path is organisation only** — it mirrors the bucket, but the page
  is about the skill, not the bucket.

The `--skill=` value and the `[Source]` URL use the skill's full **directory
name**, `do-` prefix included; the docs **filename** drops that prefix (e.g. dir
`do-git-worktree` → file `git-worktree.md`, `--skill=do-git-worktree`, Source
`.../skills/workflow/do-git-worktree`).

## Page template

Fill the template below. The **fixed frame** (Quickstart, Source link,
`## What it does`, `## When to reach for it`, `## Where it fits`) appears on
every page. The **adaptable middle** — `## Prerequisites` and the free-form
substance sections — carries only what this skill earns; delete the rest.

<page-template>

# <Skill Title>

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=<dir-name>
```

```bash
npx skills update <dir-name>
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/<bucket>/<dir-name>)

## What it does

One or two plain-language paragraphs. Lead with the skill's one-sentence job,
then state the **defining constraint** — the single fact that makes this skill
behave differently from the obvious default. Write it as a plain declarative
sentence, never a labelled aside ("The key thing:"). This line is the most
valuable on the page; never omit it.

## When to reach for it

How and when you reach for the skill — two beats:

- **Invocation mode.** Whether you type it or the agent fires it. User-invoked:
  "You invoke this by typing `/<name>` — the agent won't reach for it on its
  own." Model-invoked: "Type `/<name>`, or the agent reaches for it
  automatically when a task fits."
- **Trigger boundary.** "Reach for this when …". Where it's confusable with a
  sibling, add the other half — "for <X> instead, use
  [<sibling>](../<bucket>/<sibling>.md)."

## Prerequisites

Optional — include only when the skill needs something in place: a workspace it
writes into, prior setup, or repo-specific tooling. A stateless skill that runs
anywhere has none — drop the section.

## <free-form middle>

One to three short sections, in the skill's *own vocabulary*, that make it
click — the loop it runs, the artifact it produces, the anti-pattern it kills.
No prescribed heading; the skills are too heterogeneous for one.

The single non-negotiable: **surface the skill's leading word / defining idea**
(surgical change, deep module, red-green, derived state). The reader learns what
the skill *is* and the word they'll later think with to reach for it.

## It's working if

Optional. A few checkable signals that the skill is doing its job — what you
should see when it fires. Omit when the signals are vague.

## Where it fits

Always present. Situate the skill among the others in a sentence or two — a
standalone you reach for anytime, a run-once setup, periodic maintenance, or a
step that feeds another skill. Link related skills as `../<bucket>/<name>.md`.

</page-template>
