import Link from "next/link";
import { getAllPostMetadata } from "@/lib/mdx";

export const metadata = {
  title: "Blog",
  description: "Notes and case studies from building reliable systems and AI-powered tools.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPostMetadata();

  return (
    <main className="max-w-3xl mx-auto px-4 md:px-0 py-12">
      <h1 className="text-3xl font-semibold">Writing & Case Studies</h1>
      <p className="mt-2 text-zinc-400">
        Systems at scale, quality by design, and experiments with OpenAI's APIs.
      </p>

      <ul className="mt-10 space-y-8">
        {posts.map((post) => {
          const published = new Date(post.frontmatter.publishedAt);
          const publishedDate = Number.isNaN(published.getTime())
            ? post.frontmatter.publishedAt
            : published.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

          return (
            <li key={post.slug} className="border-b border-zinc-800 pb-8 last:border-none">
              <p className="text-xs uppercase tracking-wide text-accent-400">
                {post.frontmatter.badge ?? "Case Study"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                <Link href={`/blog/${post.slug}`} className="hover:text-accent-300">
                  {post.frontmatter.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-zinc-400">{post.frontmatter.description}</p>
              <p className="mt-4 text-xs text-zinc-500">
                {publishedDate}
                {post.frontmatter.readingTime ? ` • ${post.frontmatter.readingTime}` : null}
              </p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
