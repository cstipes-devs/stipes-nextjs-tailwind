import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutPage from '../../app/(site)/about/page';
import { RESUME_PATH } from '../../lib/site';

describe('AboutPage', () => {
  it('embeds the resume PDF from RESUME_PATH', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument();
    expect(screen.getByLabelText('Résumé PDF')).toHaveAttribute(
      'data',
      `${RESUME_PATH}#view=FitH`
    );
    expect(screen.getByRole('link', { name: 'Open resume PDF in new tab' })).toHaveAttribute(
      'href',
      RESUME_PATH
    );
    // Fallback for browsers that can't render PDFs inline.
    expect(screen.getByRole('link', { name: 'Download the résumé' })).toHaveAttribute(
      'href',
      RESUME_PATH
    );
  });
});
