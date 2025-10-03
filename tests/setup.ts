import '@testing-library/jest-dom/vitest';

// Ensure React Testing Library cleans up between tests.
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
