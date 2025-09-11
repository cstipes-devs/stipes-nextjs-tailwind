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

## Testing Guidelines
- **Unit**: Vitest + Testing Library; files `*.test.ts(x)` beside sources (see `tests/unit`). Run `npm run test` or `npm run test:watch`.
- **E2E**: Playwright specs in `tests/e2e`. Run `npm run e2e` (auto-starts dev server). First-time: `npx playwright install`.
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
