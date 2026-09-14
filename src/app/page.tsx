import { PostList } from "@/components/post-list";
import { categories, posts } from "@/lib/content";

export default function Home() {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-extrabold tracking-tight">hot path archive</h1>

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
