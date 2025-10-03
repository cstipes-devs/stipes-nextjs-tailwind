import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WipIcon } from '../../app/(site)/components/WipIcon';

describe('WipIcon', () => {
  it('applies merged classes and title', () => {
    render(<WipIcon className="extra" />);

    const chip = screen.getByTitle('Work in progress');
    expect(chip).toHaveClass('extra');
    expect(chip).toHaveTextContent('WIP');
  });
});
