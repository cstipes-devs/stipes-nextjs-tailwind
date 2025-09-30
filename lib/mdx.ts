import path from "node:path";
import fs from "node:fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  badge?: string;
  readingTime?: string;
  slug: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

async function getPostSource(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function getPost(slug: string) {
  const source = await getPostSource(slug);
  if (!source) {
    return null;
  }

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return {
    slug,
    frontmatter,
    content,
  };
}

export async function getPostMetadata(slug: string) {
  const source = await getPostSource(slug);
  if (!source) {
    return null;
  }

  const { data } = matter(source);
  return {
    slug,
    frontmatter: data as PostFrontmatter,
  };
}

export async function getAllPostMetadata() {
  const entries = await fs.readdir(POSTS_DIR);
  const slugs = entries
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => filename.replace(/\.mdx$/, ""));

  const posts = await Promise.all(slugs.map((slug) => getPostMetadata(slug)));

  return posts
    .filter((post): post is NonNullable<typeof post> => Boolean(post))
    .sort((a, b) => {
      return new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime();
    });
}
