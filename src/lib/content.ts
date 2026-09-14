import { posts as allPosts } from "#site/content";
import { adjacentPosts, countCategories, publishedPosts } from "./posts";

export type Post = (typeof allPosts)[number];

/** 공개된 글, 최신순 */
export const posts: Post[] = publishedPosts(allPosts);

export const categories = countCategories(posts);

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  return adjacentPosts(posts, slug);
}
