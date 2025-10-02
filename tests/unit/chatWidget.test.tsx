import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('../../app/(site)/components/ChatWindow', () => ({
  ChatWindow: () => <div data-testid="chat-window" />,
}));

import { ChatWidget } from '../../app/(site)/components/ChatWidget';

describe('ChatWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders launcher button by default and opens the chat window when clicked', () => {
    render(<ChatWidget />);

    const openButton = screen.getByRole('button', { name: /open stipes bot/i });
    fireEvent.click(openButton);

    expect(screen.getByTestId('chat-window')).toBeInTheDocument();
    const minimizeButton = screen.getByRole('button', { name: /minimize chat/i });
    fireEvent.click(minimizeButton);

    expect(screen.getByRole('button', { name: /open stipes bot/i })).toBeInTheDocument();
  });
});
