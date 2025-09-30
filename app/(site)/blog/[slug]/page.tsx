import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostMetadata, getPost } from "@/lib/mdx";

interface BlogPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getAllPostMetadata();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return {};
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  } satisfies Metadata;
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;
  const publishedDate = new Date(frontmatter.publishedAt);
  const formattedDate = Number.isNaN(publishedDate.getTime())
    ? frontmatter.publishedAt
    : publishedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

  return (
    <article className="prose dark:prose-invert prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 max-w-3xl mx-auto px-4 md:px-0 py-12">
      <p className="text-sm text-zinc-500">
        {formattedDate}
        {frontmatter.readingTime ? ` • ${frontmatter.readingTime}` : null}
      </p>
      <h1>{frontmatter.title}</h1>
      <p className="text-zinc-300">{frontmatter.description}</p>
      <div className="mt-8">{content}</div>
    </article>
  );
}
