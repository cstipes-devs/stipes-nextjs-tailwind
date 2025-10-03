import { describe, it, expect, beforeEach, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const readFileMock = vi.fn();
  const readdirMock = vi.fn();
  return { readFileMock, readdirMock };
});

const compileMDXMock = vi.hoisted(() => vi.fn());

vi.mock('node:fs/promises', () => ({
  default: {
    readFile: mocks.readFileMock,
    readdir: mocks.readdirMock,
  },
  readFile: mocks.readFileMock,
  readdir: mocks.readdirMock,
}));

vi.mock('next-mdx-remote/rsc', () => ({
  compileMDX: compileMDXMock,
}));

import { getPost, getPostMetadata, getAllPostMetadata } from '../../lib/mdx';

describe('mdx data layer', () => {
  beforeEach(() => {
    mocks.readFileMock.mockReset();
    mocks.readdirMock.mockReset();
    compileMDXMock.mockReset();
  });

  it('returns null when the post file is missing', async () => {
    const notFoundError = Object.assign(new Error('not found'), { code: 'ENOENT' });
    mocks.readFileMock.mockRejectedValueOnce(notFoundError);

    const result = await getPost('missing-post');
    expect(result).toBeNull();
    expect(compileMDXMock).not.toHaveBeenCalled();
  });

  it('compiles the MDX content when the post exists', async () => {
    const source = '---\ntitle: Example\n---\nContent';
    mocks.readFileMock.mockResolvedValueOnce(source);
    compileMDXMock.mockResolvedValue({
      content: '<p>Content</p>',
      frontmatter: { title: 'Example', slug: 'example', description: 'Example post', publishedAt: '2024-01-01' },
    });

    const result = await getPost('example');
    expect(compileMDXMock).toHaveBeenCalledWith({
      source,
      options: expect.objectContaining({
        parseFrontmatter: true,
      }),
    });
    expect(result).toEqual(
      expect.objectContaining({
        slug: 'example',
        frontmatter: expect.objectContaining({ title: 'Example' }),
      })
    );
  });

  it('parses frontmatter for the metadata utility', async () => {
    mocks.readFileMock.mockResolvedValueOnce('---\ntitle: Hello\npublishedAt: 2023-01-02\n---');

    const metadata = await getPostMetadata('hello');
    expect(metadata?.slug).toBe('hello');
    expect(metadata?.frontmatter.title).toBe('Hello');
    expect(new Date(metadata?.frontmatter.publishedAt as string).toISOString()).toContain('2023-01-02');
  });

  it('aggregates and sorts metadata by published date', async () => {
    mocks.readdirMock.mockResolvedValue(['older.mdx', 'newer.mdx', 'notes.txt']);
    mocks.readFileMock.mockImplementation(async (filePath: string) => {
      if (filePath.endsWith('older.mdx')) {
        return '---\ntitle: Old\npublishedAt: 2022-05-01\n---';
      }
      if (filePath.endsWith('newer.mdx')) {
        return '---\ntitle: New\npublishedAt: 2024-01-10\n---';
      }
      throw Object.assign(new Error('not found'), { code: 'ENOENT' });
    });

    const posts = await getAllPostMetadata();
    expect(posts).toHaveLength(2);
    expect(posts[0]?.slug).toBe('newer');
    expect(posts[1]?.slug).toBe('older');
  });
});
