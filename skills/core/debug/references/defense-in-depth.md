# Defense-in-Depth

When a bug is caused by invalid state reaching a vulnerable code path, fixing just one layer leaves the door open: a different code path, a refactor, or a test mock can re-introduce the same bug. Defense-in-depth makes the bug structurally harder to recreate by validating at multiple layers.

## When to reach for it (trigger gate)

Not every bug warrants this — it is a response to an observed failure mode, not generic hygiene. Use it when any of these hold:

- The root-cause pattern exists in 3+ other files (grep the fix signature).
- The bug would have been catastrophic in production.
- The vulnerable operation is dangerous regardless of caller (destructive side effects, security-sensitive, irreversible).

Skip it when the root cause is a one-off logic error with no realistic recurrence path — a single narrow fix plus its regression test is enough.

## The four layers

Pick the layers that apply; not every bug needs all four.

| Layer | Purpose | Apply when | Example |
|-------|---------|------------|---------|
| 1. Entry validation | Reject obviously invalid input at the API boundary | A caller passed bad data that should have been rejected | Throw if `workingDirectory` is empty or does not exist, before any downstream code touches it |
| 2. Invariant / business-logic check | Enforce that data makes sense for this operation | The operation has preconditions entry validation cannot express | Assert `user.state === 'verified'` before issuing a password reset |
| 3. Environment guard | Refuse dangerous operations in contexts where they make no sense | The operation is catastrophic if run in the wrong environment | In tests (`NODE_ENV === 'test'`), refuse `git init` outside the OS temp dir |
| 4. Diagnostic breadcrumb | Capture forensic context before the risky operation | Other layers might still be bypassed; future failures need evidence | Log `{ directory, cwd, env, stack }` immediately before `git init` |

## Applying the pattern

1. Trace the data flow from the bad value's origin through every function that passed it along.
2. Map the checkpoints: at which of those points could validation have rejected the bad value earlier?
3. Add guards at the appropriate layers. Each guard is as narrow as possible — validating exactly what this layer is responsible for, not duplicating another layer's checks.
4. Test each guard independently: construct a case that bypasses layer 1 and verify layer 2 still catches it.

## Common mistakes

- **Duplicating the same check at every layer.** Each layer catches a distinct class of failure. If layer 2 just repeats layer 1, the second one is noise.
- **Adding guards speculatively without a bug to justify them.** Defense-in-depth answers an observed failure mode, not a hypothetical one.
- **Leaving layer 4 out.** When layers 1-3 get bypassed — they will, eventually — the breadcrumb is what makes the next bug debuggable.

Imported and adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT).
