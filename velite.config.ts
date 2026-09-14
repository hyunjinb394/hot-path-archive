import { defineCollection, defineConfig, s } from "velite";

/**
 * 글
 * - type: post(일반 글) | til(짧은 기록)
 * - category: 글 분류 하나 (예: 서평, 회고)
 * - tags: 글에서 다룬 주제
 */
const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/index.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      date: s.isodate(),
      type: s.enum(["post", "til"]).default("post"),
      category: s.string().min(1),
      tags: s.array(s.string().min(1)).default([]),
      summary: s.string().max(300),
      draft: s.boolean().default(false),
      path: s.path(),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      // content/posts/<slug>/index.mdx → <slug>
      slug: data.path.replace(/^posts\//, "").replace(/\/index$/, ""),
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
});
