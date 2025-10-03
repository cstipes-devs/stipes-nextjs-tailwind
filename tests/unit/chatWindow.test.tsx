import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatWindow } from '../../app/(site)/components/ChatWindow';

const originalFetch = global.fetch;

describe('ChatWindow', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('renders initial assistant prompt and disables send when empty', () => {
    render(<ChatWindow />);

    expect(
      screen.getByText(/i am chris stipes' resume assistant/i)
    ).toBeInTheDocument();
    const sendButton = screen.getByRole('button', { name: 'Send' });
    expect(sendButton).toBeDisabled();
  });

  it('sends a message and displays assistant reply when request succeeds', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ reply: 'Hello from the bot' }),
    } as Response);
    global.fetch = fetchMock as unknown as typeof global.fetch;

    render(<ChatWindow />);

    const [input] = screen.getAllByPlaceholderText('Type your message...');
    fireEvent.change(input, { target: { value: 'Hi there' } });
    const sendButton = screen.getByRole('button', { name: 'Send' });
    fireEvent.click(sendButton);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      expect(screen.getAllByText('Hi there').length).toBeGreaterThan(0);
      expect(screen.getByText('Hello from the bot')).toBeInTheDocument();
    });
  });

  it('adds an error message when the request fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => 'Something went wrong',
    } as Response);
    global.fetch = fetchMock as unknown as typeof global.fetch;

    render(<ChatWindow />);

    const [input] = screen.getAllByPlaceholderText('Type your message...');
    fireEvent.change(input, { target: { value: 'bad request' } });
    const sendButton = screen.getByRole('button', { name: 'Send' });
    fireEvent.click(sendButton);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  it('handles non-json responses by reading plain text', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'text/plain' }),
      text: async () => 'Plain text reply',
    } as Response);
    global.fetch = fetchMock as unknown as typeof global.fetch;

    render(<ChatWindow />);

    const [input] = screen.getAllByPlaceholderText('Type your message...');
    fireEvent.change(input, { target: { value: 'text mode' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      expect(screen.getByText('Plain text reply')).toBeInTheDocument();
    });
  });

  it('falls back to a placeholder when the response body is empty', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'text/plain' }),
      text: async () => '   ',
    } as Response);
    global.fetch = fetchMock as unknown as typeof global.fetch;

    render(<ChatWindow />);

    const [input] = screen.getAllByPlaceholderText('Type your message...');
    fireEvent.change(input, { target: { value: 'empty response' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      expect(screen.getByText('(no content)')).toBeInTheDocument();
    });
  });
});
