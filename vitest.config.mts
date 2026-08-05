import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Mirror the `@/*` path alias from tsconfig.json. Without it the coverage
  // provider cannot resolve `@/…` imports and fails the whole test file with
  // an opaque "Unexpected JSX expression" parse error.
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      enabled: true,
      reporter: ['text', 'html', 'lcov'],
      // NB: do not put the literal `(site)` route group in these globs —
      // vitest 4's matcher treats the parentheses as a pattern group, which
      // silently drops every component from the report.
      include: ['lib/**/*.{ts,tsx}', 'app/**/components/**/*.{ts,tsx}'],
      exclude: ['**/*.d.ts', '**/*.spec.ts', '**/*.spec.tsx', 'app/**/components/**/*.stories.tsx'],
      thresholds: {
        lines: 80,
        statements: 80,
        functions: 80,
        branches: 70,
      },
    },
  },
  // vite 8 replaced the esbuild transform with oxc (rolldown); the old
  // `esbuild: { jsx: 'automatic' }` option no longer exists.
  oxc: {
    jsx: {
      runtime: 'automatic',
      importSource: 'react',
    },
  },
});
