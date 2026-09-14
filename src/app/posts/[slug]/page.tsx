import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx-content";
import { getAdjacentPosts, getPost, posts } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function PostPage(props: PageProps<"/posts/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const { previous, next } = getAdjacentPosts(slug);

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <p className="font-mono text-xs text-faint">
          {post.category}
          {post.type === "til" && " · TIL"} · {formatDate(post.date)}
        </p>
        <h1 className="text-3xl leading-tight font-extrabold tracking-tight">{post.title}</h1>
        <p className="text-dim">{post.summary}</p>
        {post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 text-xs">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-edge px-3 py-1 text-dim">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-a:text-ink prose-img:rounded-xl">
        <MDXContent code={post.body} />
      </div>

      {(previous || next) && (
        <nav className="grid gap-3 border-t border-edge pt-8 sm:grid-cols-2">
          {previous ? (
            <Link href={`/posts/${previous.slug}/`} className="rounded-xl border border-edge p-4 hover:bg-panel">
              <p className="font-mono text-xs text-faint">← 이전 글</p>
              <p className="mt-1 font-semibold">{previous.title}</p>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/posts/${next.slug}/`} className="rounded-xl border border-edge p-4 text-right hover:bg-panel">
              <p className="font-mono text-xs text-faint">다음 글 →</p>
              <p className="mt-1 font-semibold">{next.title}</p>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
