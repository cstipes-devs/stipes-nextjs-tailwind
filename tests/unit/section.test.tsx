import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section } from '../../app/(site)/components/Section';

describe('Section', () => {
  it('renders title and children', () => {
    render(
      <Section title="Case Studies">
        <p>Content</p>
      </Section>
    );

    expect(screen.getByRole('heading', { name: 'Case Studies' })).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('shows the eyebrow label when provided', () => {
    render(
      <Section title="Work" eyebrow="Featured">
        <div />
      </Section>
    );

    expect(screen.getByText('Featured')).toBeInTheDocument();
  });
});
