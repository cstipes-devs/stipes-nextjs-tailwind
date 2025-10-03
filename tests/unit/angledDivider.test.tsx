import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AngledDivider } from '../../app/(site)/components/AngledDivider';

describe('AngledDivider', () => {
  it('renders decorative SVG with merged classes', () => {
    const { container } = render(<AngledDivider className="mt-10" />);

    const wrapper = container.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveClass('mt-10');
    expect(wrapper.querySelector('svg')).not.toBeNull();
  });
});
