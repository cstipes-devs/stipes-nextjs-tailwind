import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../../app/(site)/components/Hero';

describe('Hero', () => {
  it('renders the primary heading', () => {
    render(<Hero />);
    expect(
      screen.getByRole('heading', { name: /systems at scale/i })
    ).toBeTruthy();
  });
});
