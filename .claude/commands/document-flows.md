---
description: Generate docs/CRITICAL_FLOWS.md + PDF and @smoke post-deploy tests
argument-hint: "[deployed-url]"
---

Invoke the `document-flows` skill and follow its procedure.

Deployed URL: $ARGUMENTS

If a URL is given above, use it for live verification (Step 3) and skip the
Step 1 prompt. If the line is empty, ask the user once whether to verify
against a deployment — and proceed with a source-only document if they decline.
