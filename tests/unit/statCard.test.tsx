import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from '../../app/(site)/components/StatCard';

describe('StatCard', () => {
  it('shows label and value', () => {
    render(<StatCard label="Deploys" value="250+" />);

    expect(screen.getByText('250+')).toBeInTheDocument();
    expect(screen.getByText('Deploys')).toBeInTheDocument();
  });

  it('renders hint text when supplied', () => {
    render(<StatCard label="MTTR" value="< 15m" hint="24 month rolling average" />);

    expect(screen.getByText('24 month rolling average')).toBeInTheDocument();
  });
});
