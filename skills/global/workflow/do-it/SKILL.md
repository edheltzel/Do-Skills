---
name: do-it
description: >-
  LFG runner. Let's go: take an explicit end-to-end ask from request to done
  with no menus. Use when the user invokes do-it, says LFG, or says let's go
  on autonomous end-to-end work. A feature runs do-plan, do-work, do-commit
  cpp, then do-git-pr-babysit. A bug starts at do-debug's fix path. An external
  PR review runs do-git-pr-review. `/do-it commit` stops at a local commit.
  Do NOT use for step-by-step review; use `do-plan`,
  `do-work`, `do-debug`, or `do-commit` for those.
---

# LFG

One run, no menus. The user already chose end-to-end. Fire only on an explicit LFG, "let's go", `/do-it`, or an ask to take this all the way. A vague "continue" is not a trigger.

Pass `mode:return-to-caller` to every child. Children return `status: done | blocked | needs-human` plus the artifact path. Do not print their Next blocks. Never land or merge. Do not post review replies; external PR review comments post only when the user's ask named commenting, never on a caller's permission.

## Route

1. **External PR.** A PR URL or number the user is reviewing, or an ask to review a PR. Invoke `do-git-pr-review` with `mode:return-to-caller` and the original user ask. That child owns posting: if the ask named commenting, it runs Post through `do-git-pr-comment` before it returns. Never invoke `do-git-pr-comment` again after it returns. Never edit code. If it returns `blocked` or `needs-human`, stop without posting.
2. **Bug.** A concrete report of failing or wrong behavior. Invoke `do-debug`, if installed, on the fix path (not diagnosis-only). A verified fix is the work source: skip `do-plan` and `do-work`. `rethink` or any `needs-human` stops the run.
3. **Feature.** Anything else that changes the product. Invoke `do-plan`, if installed, with the request. Missing plan input (`blocked` or `needs-human`, including no requirements to plan from) stops. Do not search `docs/plans/` for a plan you were not given. A plan path the user named is the work source; do not replan over it.
4. **Build.** On the feature route only, invoke `do-work`, if installed, with the plan path from the feature step. `do-work` owns simplify and review. Anything but `done` stops.
5. **Ship.** Invoke `do-commit`, if installed. Default is `cpp` (commit, push, PR, CI green). `/do-it commit` is a local commit and stops there. No Mistakes runs only when this repo was already initialized; otherwise `do-commit` publishes the normal way and the run continues. An unavailable gate in an initialized repo returns `blocked` and stops without publishing. A no-mistakes `ask-user` gate, or any `needs-human`, stops. Never pass `land`. After successful `cpp`, invoke `do-git-pr-babysit` with the PR URL and `mode:return-to-caller`; stop at ready, never land.

A missing child skill stops the run. Say which one.

If the user stops mid-run, the exit is `/do-handoff`. Do not invent a substitute summary.

## Stop

Stop, say why, and leave nothing newly pushed, when:

- plan input is missing, or planning returns `blocked`
- debug returns `rethink` or will not fix
- a child returns anything but `done`. Exception: a babysit `blocked` or `needs-human` after `cpp` returned `done` stops and reports; it never unpublishes, closes, or resets the PR or its branch
- no-mistakes parks on an ask-user gate

## Report

Short. What ran, each artifact path, the PR URL when one exists, and why a stop happened. On the external PR route, stop after reporting. Do not offer Post comments and do not invoke `do-git-pr-comment`; posting already happened inside `do-git-pr-review` when the ask named it, and an unauthorized review returns `needs-human` instead of a menu. On `/do-it commit`, Next is `do-commit cp` (publish the local commit). After babysit returns ready, use the block below; otherwise report the stop without offering land.

## Next

End with this block after the report. Run the next skill only when the user picks it.

Next: `do-commit land` - only when the user says go.

Other moves:

1. `do-git-pr-review-triage` - when review comments land, passing the PR URL.
2. Stop - the PR is already open.

Reply with a number, the label, or what you want instead.

Ask with the harness's blocking question tool when it has one, and drop the last line. Otherwise print the block and wait. A pick loads that skill now, in this session.
