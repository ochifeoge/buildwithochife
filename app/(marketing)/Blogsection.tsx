import { createClient } from "@/lib/supabase/server";
import { BlogCard } from "@/components/web/BlogCard";
import Link from "next/link";
import type { FetchBlog } from "@/lib/validators/blog";
export default async function BlogSection() {
  // fetch latest 3 published blogs for the home preview
  const supabase = await createClient();
  const { data: blogData, error: blogError } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", true)
    .order("created_at", { ascending: false })
    .limit(3);

  const blogs: FetchBlog[] =
    blogError || !blogData ? [] : (blogData as FetchBlog[]);

  return (
    <section className="container mx-auto max-w-6xl py-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Latest insights</h3>
          <p className="text-muted-foreground mt-1">
            Short reads and tutorials — handpicked for builders.
          </p>
        </div>
        <Link
          href="/blogs"
          className="text-sm text-muted-foreground hover:underline"
        >
          Read all posts →
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.length > 0 ? (
          blogs.map((b: FetchBlog, idx: number) => (
            <BlogCard key={b.id ?? idx} blog={b} />
          ))
        ) : (
          <div className="col-span-full rounded-md border border-dashed border-slate-200 p-6 text-center text-muted-foreground">
            No recent posts — check the blog page for more.
          </div>
        )}
      </div>
    </section>
  );
}
