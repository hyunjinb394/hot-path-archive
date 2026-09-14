import { PostList } from "@/components/post-list";
import { categories, posts } from "@/lib/content";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">hot path archive</h1>
        <p className="text-dim">그때 가장 많이 시간을 쓴 관심사를 파고든 기록</p>
      </section>

      <PostList
        posts={posts.map(({ slug, title, date, type, category, summary }) => ({
          slug,
          title,
          date,
          type,
          category,
          summary,
        }))}
        categories={categories}
      />
    </div>
  );
}
