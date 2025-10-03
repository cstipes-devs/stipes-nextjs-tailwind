import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../../app/(site)/components/Hero';

describe('Hero', () => {
  it('renders the primary hero content', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { name: 'Chris Stipes' })).toBeInTheDocument();
    expect(
      screen.getByText(/engineering leader • systems at scale • quality by design/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download resume PDF' })).toHaveAttribute(
      'href',
      '/ChristopherStipesResume_v3.pdf'
    );
  });
});
