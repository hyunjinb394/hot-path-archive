import { PostList } from "@/components/post-list";
import { categories, posts } from "@/lib/content";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">hot potato archive</h1>
        <p className="text-dim">개발 및 인사이트 아카이빙 블로그</p>
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
