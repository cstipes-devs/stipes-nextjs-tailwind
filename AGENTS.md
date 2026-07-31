# Repository Guidelines

## Project Structure & Modules
- `app/`: Next.js App Router pages, route groups like `app/(site)/…`, and `layout.tsx`.
- `app/globals.css`: Tailwind layers and shared utility classes.
- `public/`: Static assets (images, icons). Served at `/{filename}`.
- `tailwind.config.ts`: Theme tokens, scan paths, and custom utilities.
- `next.config.mjs`, `tsconfig.json`: Framework and TypeScript config.

## Build, Test, and Development
- `npm install`: Install dependencies.
- `npm run dev`: Start local dev server at `http://localhost:3000`.
- `npm run build`: Production build (checks types and bundles routes).
- `npm start`: Serve the production build.
- `npm run lint`: Run ESLint via Next.js rules.

## Coding Style & Naming
- **Language**: TypeScript + React (App Router). Prefer server components unless client-only APIs are needed.
- **Indentation**: 2 spaces; keep lines focused and concise.
- **Components**: PascalCase files in `app/(site)/components/` (e.g., `ProjectCard.tsx`).
- **Routes**: File-based; group with parentheses (e.g., `app/(site)/about/page.tsx`).
- **Styling**: Tailwind utility classes; shared patterns live in `globals.css` (e.g., `.card`, `.badge`, `.link`).
- **Imports**: Absolute or relative consistently; avoid deep relative chains.

## Critical Flows
- **Read `docs/CRITICAL_FLOWS.md` before changing anything in `app/`, `lib/`, or `tests/`.** It lists each critical user flow and the invariants that code and tests depend on (accessible labels, response-shape fallbacks, status-code contracts, env defaults).
- If a change alters a documented invariant, update the flow doc and its covering tests in the same change, then regenerate with `/document-flows`.
- **Selectors**: this repo uses no `data-testid`. Tests select by ARIA role, accessible name, and placeholder text—keep it that way.

## Testing Guidelines
- **Unit**: Vitest + Testing Library; files `*.test.ts(x)` beside sources (see `tests/unit`). Run `npm run test` or `npm run test:watch`.
- **E2E**: Playwright specs in `tests/e2e`, built on page objects (`tests/e2e/pages/` — the only place selectors live) and fixtures (`tests/e2e/fixtures.ts` — specs import `test`/`expect` from here). Network mocking only via the `chatApi` fixture. Run `npm run e2e` (auto-starts dev server). First-time: `npx playwright install`. Regenerate from the flows doc with `/playwright-tests`.
- **Smoke (post-deploy)**: `@smoke`-tagged specs certify a real deployment. Run `SMOKE_BASE_URL=https://<deployment> npm run smoke`, or `npm run smoke:local` against localhost. Smoke specs never mock network traffic and never perform writes.
- **Coverage**: Target ≥80% for new modules; prioritize critical UI states.

## Commit & Pull Requests
- Use small, focused commits. If no convention is enforced, follow Conventional Commits:
  - `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`.
- PRs should include:
  - Purpose and scope, screenshots for UI changes, and any config migrations.
  - Linked issues and clear testing instructions (`npm run dev` steps or reproduction).
  - Checklist: lint passes, build succeeds, no unused exports.

## Security & Configuration
- Secrets go in `.env.local` (never commit). Use `process.env.*` via Next.js runtime.
- Keep dependencies current; run `npm audit` periodically.
- Tailwind purge is configured via `content` in `tailwind.config.ts`—include any new directories.
