# Loop comparison: Do-Skills vs Compound Engineering vs PStack

Sources: Compound Engineering v3.38.3 (2026-11-23, `EveryInc/compound-engineering-plugin`), PStack `03a97e4` (`edheltzel/PStack-for-OMP`, same skills as 0.16.0), Do-Skills `feat/loop-group`. Earlier CE notes: `2026-10-14-compound-engineering-workflow.md` (3.30.5).

## How each runs one-shot

| | Do-Skills `do-it` | CE `lfg` | PStack |
|---|---|---|---|
| Runner | One LFG chain, no menus | One chain, routes by request shape (`lfg/references/intake.md`) | None; `/poteto-mode` picks one of 22 playbooks |
| Vague idea | Stops `needs-human` | Brainstorm if a human is present, else plan with stated assumptions | Playbook todo; design skills on demand |
| Build review | simplify, then adversarial review loop | simplify (skip under 10 lines), one reviewer under 30 lines, `ce-code-review mode:agent`, fixes committed | Subagent writes, parent reviews diff |
| Browser test | None | `ce-test-browser mode:pipeline` | Verify on the real surface (feature playbook) |
| Learnings | `do-docs` can write one learning; not wired into the loop | `ce-compound` only when a wrong belief was corrected; `ce-plan` reads `<root>/solutions/` | `/reflect`, `/correct`, opt-in with approval |
| Ends at | PR ready after babysit | PR open, CI decided, `<promise>DONE</promise>` | PR merge-ready; Autopilot-full merges after a clean swarm verdict |
| Merge | Only `do-commit land`, never from `do-it` | Only with a user grant, on a managed stack | Only on explicit merge, or Autopilot-full |
| Deploy | None | None (drops land intent that waits on a deploy) | None |

## What to adopt

1. Intake routing in `do-it`: a vague idea runs `do-brainstorm` when you are present, otherwise `do-plan` writes its assumptions into the plan instead of stopping.
2. A learnings step: after `do-work`, run `do-docs` learning mode only when a wrong belief was corrected; `do-plan` reads those learnings first.
3. A browser check before ship when the diff touches UI (`do-behavioral-testing` or a new pipeline mode).
4. Lighter review for tiny diffs: one adversarial round under about 30 lines.
5. A merge grant: `/do-it land` lets the run merge after babysit reports ready. Deploy stays per project; none of the three has a general deploy step.

## What not to adopt

- PStack's 22-playbook router: more surface, less one-shot.
- CE's `ce-pov` and Compound Packs: extra skills without a gap in our loop.

## todo.txt

- Add intake routing and assumption-mode planning to do-it and do-plan +doskills
- Wire a learnings step (do-docs) into do-it and make do-plan read learnings +doskills
- Add a UI browser check and a small-diff review lane to do-work +doskills
- Add a `/do-it land` merge grant +doskills
