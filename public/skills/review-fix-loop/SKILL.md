---
name: review-fix-loop
description: Review an existing diff with independent agents, validate findings, fix confirmed issues, and review again until no actionable findings remain.
---

# Review Fix Loop

Improve existing work through evidence-based review. A review comment is a hypothesis, not a fact.

## Loop

1. Establish the current diff and run the smallest relevant baseline checks.
2. Ask one or more independent agents to review the work. Parallelize only when their scopes are genuinely independent.
3. Validate every finding against the code, callers, intended behavior, and available tests.
4. Fix confirmed findings only. Explain rejected findings with concrete evidence.
5. Run focused checks, then ask an independent agent to review the updated diff.
6. Repeat until no actionable findings remain.

Preserve unrelated user changes. Do not commit, push, deploy, or perform other external mutations unless the user requested them.

If the same unresolved issue survives three cycles, or progress requires unavailable authority or external state, stop and report the blocker with evidence rather than looping indefinitely.
