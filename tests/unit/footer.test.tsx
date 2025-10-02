import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../../app/(site)/components/Footer';

describe('Footer', () => {
  it('shows contact form fields and dynamic copyright', () => {
    render(<Footer />);

    expect(screen.getByRole('heading', { name: "Let's start a project" })).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toHaveAttribute('name', 'name');
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('Message')).toHaveAttribute('name', 'message');

    const year = new Date().getFullYear().toString();
    expect(
      screen.getByText(`© ${year} Chris Stipes. Built with Next.js & Tailwind.`)
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'chris.stipes@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:chris.stipes@gmail.com'
    );
  });
});
