import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from '../../app/(site)/components/Navbar';

describe('Navbar', () => {
  it('renders key navigation links with accessible labels', () => {
    render(<Navbar />);

    expect(screen.getByLabelText('Chris Stipes home')).toHaveAttribute('href', '#top');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Blog / Case Studies' })).toHaveAttribute('href', '#blog');
    expect(screen.getByLabelText('Download resume PDF')).toHaveAttribute('href', '/resume.pdf');
    expect(screen.getByLabelText('Contact Chris Stipes via email')).toHaveAttribute('href', 'mailto:chris.stipes@gmail.com');
  });
});
