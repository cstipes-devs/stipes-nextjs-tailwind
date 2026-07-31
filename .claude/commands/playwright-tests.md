---
description: Generate/refactor POM-based Playwright tests from docs/CRITICAL_FLOWS.md
argument-hint: "[flow-name | all]"
---

Invoke the `playwright-tests` skill and follow its procedure.

Scope: $ARGUMENTS

If the scope names a single flow (e.g. `chat`), regenerate only that flow's
page objects and specs; `all` or empty means the full suite. Requires
`docs/CRITICAL_FLOWS.md` — if it is missing, stop and run `/document-flows`
first.
