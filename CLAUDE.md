# CLAUDE.md

Guidance for Claude Code and other coding agents working in this repo.

## Read this before changing app code

**Before modifying anything under `app/`, `lib/`, or `tests/`, read
[`docs/CRITICAL_FLOWS.md`](docs/CRITICAL_FLOWS.md).**

It documents the site's critical user flows and, for each one, the
**invariants** that other code and tests depend on — accessible labels tests
select on, defensive parsing chains that exist because an upstream contract is
loose, status-code contracts, and environment-variable defaults. These are
exactly the things a plausible-looking refactor breaks silently.

If a change alters a documented invariant:

1. Make the change deliberately, not incidentally.
2. Update the invariant in `docs/CRITICAL_FLOWS.md` in the same change.
3. Update the covering tests listed in that flow's section.
4. Regenerate the doc and PDF with `/document-flows`.

## Commands

```bash
npm run dev          # local dev server on :3000
npm run build        # production build (type-checks)
npm run lint         # ESLint
npm run test         # Vitest unit tests
npm run e2e          # Playwright e2e (auto-starts a dev server)
npm run smoke:local  # @smoke subset against localhost
SMOKE_BASE_URL=https://<deployment> npm run smoke   # certify a deployment
```

## Conventions

Style, structure, commit, and PR conventions live in
[`AGENTS.md`](AGENTS.md) — follow them. A few points that bear repeating
because they interact with the tests:

- **No `data-testid` anywhere in this repo.** Tests select by ARIA role,
  accessible name, and placeholder text. Keep it that way; it means the tests
  break when the *user-visible* contract breaks, which is the point.
- **Selectors live only in `tests/e2e/pages/`.** Specs import `test`/`expect`
  from `tests/e2e/fixtures.ts` (never `@playwright/test` directly) and use
  page-object fields; a spec that constructs its own locator fails review.
- **Network mocking lives only in the `chatApi` fixture** (`fixtures.ts`), and
  is banned in `smoke.spec.ts` — smoke certifies the real upstream.
- Prefer server components. `app/(site)/page.tsx` and the blog pages read the
  filesystem via `lib/mdx.ts` and cannot become client components.
- Smoke specs must never mock network traffic, and must never perform writes
  against a real deployment.

## Documenting flows and generating tests

`/document-flows [url]` regenerates `docs/CRITICAL_FLOWS.md`, its PDF, and the
`@smoke` specs. Passing a deployed URL additionally verifies each flow against
the live site with browser automation and records any drift it finds.

`/playwright-tests [flow|all]` regenerates the page objects, fixtures, and
specs from the flows doc, following the checklist in
`.claude/skills/playwright-tests/reference/best-practices.md`.

Content between `<!-- manual -->` and `<!-- /manual -->` in the flow doc is
preserved verbatim across regenerations.
