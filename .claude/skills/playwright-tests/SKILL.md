---
name: playwright-tests
description: Generate or refactor the Playwright e2e suite from docs/CRITICAL_FLOWS.md using page objects, typed fixtures, and best-practice locators; covers API error handling with mock fixtures where the flow doc says an upstream contract is loose. Use when asked to generate Playwright tests, add page objects or test fixtures, refactor e2e specs, or cover API error handling in the browser.
---

# Playwright tests from the critical flows doc

Turn `docs/CRITICAL_FLOWS.md` into a best-practice Playwright suite: page
object models under `tests/e2e/pages/`, one typed fixture module at
`tests/e2e/fixtures.ts`, and specs whose assertions trace back to documented
invariants.

## Core principle

**The flows doc is the test specification.** Every invariant in it maps to at
least one assertion — in a browser test generated here, or explicitly
delegated to a named unit test. Anything you cannot map is a gap; report it,
don't hide it.

## Step 1 — Require the flows doc

If `docs/CRITICAL_FLOWS.md` does not exist, stop and tell the user to run
`/document-flows` first. Do not invent flows from scratch here; that is the
other skill's job.

Parse the argument: a flow name (e.g. `chat`) limits regeneration to that
flow's page objects and specs; `all` or no argument means the full suite.

## Step 2 — Build the coverage map

Read every flow's Invariants and Covering tests sections. Produce a table:

| Invariant | Covered by |
|---|---|
| [invariant] | `[spec file] › [test name]` or `unit: [file] › [test]` or **GAP** |

Carry this map through to the final report.

## Step 3 — Derive locators from source

Read every file in each flow's implementation chain. Locator rules:

- **By role + accessible name first**, then label, then placeholder. Never
  `data-testid` — this repo has none and must stay that way (the tests should
  break when the user-visible contract breaks).
- Use `exact: true` when a name is a prefix of another state of the same
  element (e.g. a `Send` button whose label becomes `Sending…` in flight).
- A CSS-class locator is a last resort, allowed only when the DOM exposes no
  semantic hook (e.g. an error state conveyed only by color). Comment it with
  the reason and flag it in the report as an accessibility gap worth fixing.
- **Selectors live only in page objects.** A spec that types a selector string
  has failed review.

## Step 4 — Verify locators against a live accessibility tree

Before writing specs, confirm each page-object locator resolves uniquely on
the running app:

1. If Playwright MCP tools (`mcp__playwright__*`) are configured, prefer them:
   navigate, take an accessibility snapshot, check role + name per locator.
2. Otherwise load the `claude-in-chrome` skill and drive Chrome against
   `http://localhost:3000` (start `npm run dev` if nothing is listening).
3. If no browser tooling is available, fall back to source-only and say so in
   the report — the generated tests' first run then doubles as verification.

Record mismatches between source-derived and observed roles/names as drift
notes; do not silently adapt the locator without noting why.

## Step 5 — Generate page objects and fixtures

**Page objects** (`tests/e2e/pages/*.ts`), one class per page plus component
objects for widgets that appear on multiple pages:

- `readonly` `Locator` fields initialized in the constructor
- Small intent-level methods (`open()`, `send(text)`), returning locators or
  navigating — **no assertions inside page objects**
- A `goto()` method per page object using the route path, relative to baseURL
- Files under `tests/e2e/pages/` are ignored by the runner (they don't match
  `*.spec.ts`), so no config change is needed

**Fixtures** (`tests/e2e/fixtures.ts`): a single `test.extend<…>` that every
spec imports instead of `@playwright/test`; re-export `expect`.

- One fixture per page object
- A network-mock fixture per loose upstream contract (per the flow doc), with
  intent-named methods (`replyWith(shape, text)`, `failUpstream(status)`,
  `abort()`, …) wrapping `page.route`
- Mock fixtures must be **lazy**: no route is installed until a method is
  called, so specs that never touch the fixture (smoke) intercept nothing

## Step 6 — Generate the specs

Refactor in place: rewrite existing specs onto the fixtures, never duplicate
them. Preserve existing test names where the covered behavior is unchanged.

Tiers, and what is allowed in each:

- **Local e2e** (`home/blog/chat.spec.ts` …): mocking allowed, via the mock
  fixture only.
- **Error-contract specs** (`chat-errors.spec.ts` …): the mocked negative
  space of a loose contract — every documented response shape, upstream error
  status, network abort, and input guard. One `test()` per case (loop over a
  const array for shape families) so failures are granular.
- **Smoke** (`smoke.spec.ts`): never mocks, never writes. Uses the same page
  objects; asserts on shape, not exact content, for anything backed by a live
  non-deterministic service.

Every generated file must pass the checklist in
`reference/best-practices.md`. Run its grep checks before running the suite.

## Step 7 — Run everything

```bash
npm run test          # unit suite must be untouched
npx playwright test   # full e2e including new specs
npm run smoke:local   # smoke tier still green and mock-free
```

All green before reporting. A generated suite that has never run is not a
deliverable.

## Step 8 — Report

- The coverage map (invariant → test), including any GAP rows
- Files written/rewritten
- How locators were verified (MCP / claude-in-chrome / source-only)
- Drift or accessibility gaps found
- Commands to run each tier

## Composition with document-flows

When `/document-flows` later regenerates the flows doc, it scaffolds smoke
tests on these page objects (its Step 6 checks for `tests/e2e/pages/`). Keep
page-object locators in sync with the doc's invariants — each is the other's
review checklist.
