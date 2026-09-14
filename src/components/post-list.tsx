"use client";

import Link from "next/link";
import { useState } from "react";
import { formatDate } from "@/lib/format";

type Item = {
  slug: string;
  title: string;
  date: string;
  type: "post" | "til";
  category: string;
  summary: string;
};

export function PostList({ posts, categories }: { posts: Item[]; categories: { name: string; count: number }[] }) {
  const [selected, setSelected] = useState<string>();
  const visible = selected ? posts.filter((p) => p.category === selected) : posts;

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1 text-sm transition-colors ${
      active ? "border-ink bg-ink text-space" : "border-edge text-dim hover:text-ink"
    }`;

  return (
    <div className="space-y-6">
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <button type="button" className={chip(!selected)} onClick={() => setSelected(undefined)}>
            전체 {posts.length}
          </button>
          {categories.map((c) => (
            <button key={c.name} type="button" className={chip(selected === c.name)} onClick={() => setSelected(c.name)}>
              {c.name} {c.count}
            </button>
          ))}
        </div>
      )}

      <ul className="divide-y divide-edge">
        {visible.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}/`} className="group block space-y-1.5 py-6">
              <p className="font-mono text-xs text-faint">
                {formatDate(post.date)} · {post.category}
                {post.type === "til" && " · TIL"}
              </p>
              <p className="text-lg font-semibold group-hover:underline">{post.title}</p>
              <p className="text-sm text-dim">{post.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
