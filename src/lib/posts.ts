type Dated = { slug: string; date: string; draft: boolean };

/** 공개된 글만, 최신순 */
export function publishedPosts<T extends Dated>(posts: T[]): T[] {
  return posts.filter((p) => !p.draft).sort((a, b) => b.date.localeCompare(a.date));
}

/** 최신순 목록 기준으로 바로 이전(더 오래된) 글과 다음(더 최신) 글 */
export function adjacentPosts<T extends { slug: string }>(sortedNewestFirst: T[], slug: string) {
  const index = sortedNewestFirst.findIndex((p) => p.slug === slug);
  if (index < 0) return {};
  return {
    previous: sortedNewestFirst[index + 1],
    next: index > 0 ? sortedNewestFirst[index - 1] : undefined,
  };
}

export function countCategories(posts: { category: string }[]) {
  const counts = new Map<string, number>();
  for (const p of posts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ko"));
}
