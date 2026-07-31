---
name: document-flows
description: Generate or refresh docs/CRITICAL_FLOWS.md and its PDF by analyzing the repo's routes, components, and API handlers; optionally verify each flow against a deployed URL with browser automation; and scaffold @smoke post-deployment tests. Use when asked to document critical flows, produce a flow doc or flow PDF, or add post-deploy certification tests.
---

# Document Critical Flows

Produce a durable, agent-readable map of what this site must never break, plus
the tests that certify it after a deploy.

Three outputs, always in this order:

1. `docs/CRITICAL_FLOWS.md` — the source of truth, written for coding agents
2. `docs/CRITICAL_FLOWS.pdf` — the same content, for humans to read or share
3. `tests/e2e/smoke.spec.ts` — `@smoke`-tagged tests, one per P0/P1 flow

## Core principle

**Source code is the truth. The deployed site is corroboration.**

Flows are derived by reading the repo. A deployed URL, when given, confirms
those flows actually work and supplies real selectors and timings. When the two
disagree, that disagreement is itself a finding — record it, never quietly
reconcile it.

## Step 1 — Establish the deployed URL

If the invoking command supplied a URL, use it and skip the prompt.

Otherwise ask once with `AskUserQuestion`: deployed URL to verify against, or
skip live verification. **Do not block on the answer** — if the user skips or
gives nothing, continue with the whole procedure and mark every flow
`Verified: source-only`. A source-only doc is still worth producing.

## Step 2 — Derive flows from source

Enumerate the surface area:

- Every `page.tsx` under `app/` (each is a route; route groups like `(site)` do
  not appear in URLs)
- Every `route.ts` — these are the API handlers
- `layout.tsx` files, for anything that renders on every page
- Client components (`"use client"`) that call `fetch` — these are where
  runtime flows live

For each flow, trace the full chain: **entry point → components → network calls
→ external dependencies.** Read the implementing files rather than inferring
from names.

Assign a criticality:

- **P0** — a visitor hitting the site immediately depends on it, or it reaches
  an external service that can fail independently of a deploy
- **P1** — significant user-facing surface, self-contained
- **P2** — static or peripheral

Then extract **invariants** for each flow. This is the highest-value part of
the work. An invariant is a specific behavior that other code depends on and
that a plausible refactor could silently break. Look for:

- Accessible names, `aria-label`s, and placeholder text that tests select on
- Defensive parsing or fallback chains — these exist because an upstream
  contract is loose; narrowing them breaks real responses
- Error and empty states, and the status codes an API handler returns
- Environment variables and their fallback defaults
- Data-shape contracts between a loader and its consumer

State each invariant as a concrete "do not break this" with the reason. A
reason is what stops a future agent from deciding the constraint is arbitrary.

## Step 3 — Verify against the deployment

Only when a URL was supplied. Load the `claude-in-chrome` skill first, then
drive the browser.

For each P0/P1 flow: navigate to the route, confirm the expected landmark
renders, and exercise the interaction end to end. For a chat or other
externally-backed flow, send a **real** message and wait for a real reply —
that round trip is the entire point of verifying against production.

Capture: actual accessible selectors, observed latency for anything crossing
the network, and any console errors.

Record discrepancies between source and live as an explicit `⚠️ Drift` note in
the flow's section. Common causes worth calling out: the deployment is behind
the current commit, an environment variable differs in production, or an
upstream service is degraded.

**Never perform writes against a real deployment.** Read-only navigation and
interactions that a normal visitor would perform. No destructive actions, no
form submissions that persist data, no authentication with real credentials.

## Step 4 — Write the markdown

Follow `reference/flow-doc-template.md` for structure.

The audience is a coding agent about to modify this repo. Write for that
reader: concrete file paths, specific invariants, no marketing prose. Every
flow section needs its Invariants list — a flow section without one has failed
to do its job.

**Idempotency.** If `docs/CRITICAL_FLOWS.md` already exists, read it first.
Content between `<!-- manual -->` and `<!-- /manual -->` markers is
human-authored: preserve it verbatim. Refresh everything else in place. Never
append a second copy of a section.

## Step 5 — Generate the PDF

```bash
node .claude/skills/document-flows/scripts/md-to-pdf.mjs docs/CRITICAL_FLOWS.md docs/CRITICAL_FLOWS.pdf
```

No dependencies to install; it uses the Chromium that ships with Playwright.

## Step 6 — Scaffold the smoke tests

Write one `@smoke` test per P0/P1 flow into `tests/e2e/smoke.spec.ts`.

**If `tests/e2e/pages/` exists** (created by the `playwright-tests` skill),
build the smoke tests on those page objects and import `test`/`expect` from
`tests/e2e/fixtures.ts` — never duplicate selectors inline, and never use the
mock fixtures. Keep page-object locators in sync with the invariants this doc
records; each is the other's review checklist.

Otherwise match this repo's terse e2e style: role- and placeholder-based
selectors, relative `page.goto('/')` against `baseURL`. **This repo uses no
`data-testid` anywhere — do not introduce any.**

Two hard rules:

- **Never intercept network traffic in a smoke spec.** `page.route()` belongs
  in local e2e tests, not here. A smoke test that mocks the dependency it is
  meant to certify proves nothing. The existing `tests/e2e/chat.spec.ts` mocks
  `/api/chat` deliberately — the smoke version must not.
- **Assert on shape, not exact content**, wherever a response comes from a
  live or non-deterministic source. For an LLM reply: assert a non-empty
  assistant message appeared and that it is not an error bubble. Asserting
  exact text guarantees a flaky suite.

Give live-backed assertions generous explicit timeouts; the config already
raises the global timeout when `SMOKE_BASE_URL` is set.

## Step 7 — Report

State plainly: files written, flows found and their criticality, whether live
verification ran and against what URL, any drift discovered, and the exact
command to run the smoke suite:

```bash
SMOKE_BASE_URL=https://<deployment> npm run smoke
```

If live verification was skipped, say so explicitly — the user needs to know
the doc is unverified.
