# Best-practices checklist for generated Playwright code

Every generated or refactored file must satisfy all of these. The grep rules
are mechanical — run them; the judgment rules are reviewed by reading.

## Grep rules (must all return empty)

```bash
grep -rn "waitForTimeout" tests/            # no arbitrary sleeps
grep -rn "data-testid" tests/e2e/ app/      # repo convention: none in app markup
                                            # or e2e code (unit-test mock stubs exempt)
grep -rn "networkidle" tests/               # discouraged; use web-first assertions
grep -ln "page.route" tests/e2e/*.spec.ts   # route logic lives only in fixtures.ts
grep -n "chatApi" tests/e2e/smoke.spec.ts   # smoke never mocks
grep -rn "getByRole\|getByPlaceholder\|getByLabel\|getByText\|locator(" tests/e2e/*.spec.ts
# ^ specs must not construct locators; they use page-object fields.
#   (Assertions on page-object fields are fine; building selectors is not.)
```

## Locators

- Role + accessible name > label > placeholder > text. CSS/XPath only when the
  DOM offers no semantic hook — comment why, flag as an a11y gap.
- `exact: true` whenever the name is a prefix/substring of another state of
  the same element.
- Locators are `readonly` fields on a page object, created once in the
  constructor. Specs never call `page.getBy*` directly.
- Prefer scoping (`this.panel.getByRole(…)`) over global page queries when a
  widget can coexist with similar elements.

## Assertions

- Web-first only: `await expect(locator).toBeVisible()/toHaveText()/…` — they
  auto-retry. Never `expect(await locator.isVisible())`.
- Assert on user-visible outcomes, not implementation details.
- For live non-deterministic backends (LLMs): assert shape — a reply bubble
  exists, is non-empty, is not the error state — never exact content.
- No assertions inside page objects; specs own the expectations.

## Test structure

- Each test is independent and parallel-safe: fresh navigation via the page
  object's `goto()`, no shared mutable state, no ordering dependencies.
- One behavior per test; loop over a const array to stamp out contract
  families (one `test()` per case, so failures name the exact shape).
- `test.describe` per user-facing area; `test.step` only when a single test
  has genuinely distinct phases.
- Timeouts: rely on config defaults; explicit `{ timeout }` only on
  assertions that legitimately wait on slow external services, with a comment.

## Fixtures

- All specs import `test`/`expect` from `tests/e2e/fixtures.ts`, never from
  `@playwright/test` directly.
- Network mocks are lazy: importing the fixture module installs nothing; a
  route exists only after a mock method is called; fixtures clean up with
  `unroute` on teardown.
- Mock at the app boundary the test cares about (`**/api/chat`), not at the
  page's whole network layer.

## Tiers

- **Local e2e**: mocking allowed through fixtures only.
- **Error-contract specs**: exist precisely because an upstream contract is
  loose; cover every documented shape and failure mode.
- **Smoke** (`@smoke`): zero mocking, zero writes, shape-based assertions,
  same page objects.
