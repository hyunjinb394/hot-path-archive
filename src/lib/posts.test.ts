import { describe, expect, it } from "vitest";
import { adjacentPosts, countCategories, publishedPosts } from "./posts";

const post = (slug: string, date: string, over: { category?: string; draft?: boolean } = {}) => ({
  slug,
  date,
  category: over.category ?? "회고",
  draft: over.draft ?? false,
});

describe("publishedPosts", () => {
  it("drops drafts and sorts newest first", () => {
    const result = publishedPosts([
      post("old", "2025-01-01T00:00:00.000Z"),
      post("draft", "2026-01-01T00:00:00.000Z", { draft: true }),
      post("new", "2025-06-01T00:00:00.000Z"),
    ]);

    expect(result.map((p) => p.slug)).toEqual(["new", "old"]);
  });
});

describe("adjacentPosts", () => {
  const posts = publishedPosts([
    post("a", "2025-01-01T00:00:00.000Z"),
    post("b", "2025-02-01T00:00:00.000Z"),
    post("c", "2025-03-01T00:00:00.000Z"),
  ]);

  it("gives the older post as previous and the newer post as next", () => {
    const { previous, next } = adjacentPosts(posts, "b");
    expect(previous?.slug).toBe("a");
    expect(next?.slug).toBe("c");
  });

  it("has no previous for the oldest and no next for the newest", () => {
    expect(adjacentPosts(posts, "a").previous).toBeUndefined();
    expect(adjacentPosts(posts, "c").next).toBeUndefined();
  });
});

describe("countCategories", () => {
  it("counts posts per category, most used first", () => {
    const posts = [
      post("a", "2025-01-01T00:00:00.000Z", { category: "서평" }),
      post("b", "2025-02-01T00:00:00.000Z", { category: "회고" }),
      post("c", "2025-03-01T00:00:00.000Z", { category: "회고" }),
    ];

    expect(countCategories(posts)).toEqual([
      { name: "회고", count: 2 },
      { name: "서평", count: 1 },
    ]);
  });
});
