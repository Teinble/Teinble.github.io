---
name: implement-review-loop
description: Implement a requested change, verify it, independently review it, and fix confirmed findings until the result converges. Includes screenshot-based review for frontend UI changes.
---

# Implement Review Loop

Carry the requested change from implementation through verification and independent review.

## Loop

1. Inspect the affected flow and implement the smallest complete change consistent with the existing architecture.
2. Run the relevant formatter, static checks, tests, and production build in proportion to risk.
3. Ask an independent agent to review correctness, clarity, maintainability, and scope.
4. Validate each finding. Fix confirmed issues and reject false positives with evidence.
5. Re-run focused checks and review the updated result.
6. Repeat until no actionable findings remain.

## Frontend UI Changes

Capture and inspect the affected component at representative desktop and mobile widths. Check both light and dark themes when supported. Verify hierarchy, readability, overflow, focus states, and obvious console errors before declaring the UI complete.

Preserve unrelated user changes. Do not commit, push, deploy, or expand external scope unless the user requested it.

If the same unresolved issue survives three cycles, or an external blocker prevents further verification, stop and report the evidence and remaining risk.
