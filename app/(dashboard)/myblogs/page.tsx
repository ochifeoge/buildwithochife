import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { BlogCard } from "./BlogCard";
import { createClient } from "@/lib/supabase/server";
import { FetchBlog } from "@/lib/validators/blog";

export default async function MyBlogs() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("blogs").select();

  if (error) throw new Error();
  console.log(data);
  return (
    <div className="flex overflow-y-auto  flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Blogs</h1>
          <p className="text-muted-foreground text-sm">
            Manage and showcase your work
          </p>
        </div>
      </div>

      {/* Blog grid */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((blog: FetchBlog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>

      <div className="fixed bottom-3 right-4">
        <Link className={buttonVariants()} href={"/myblogs/create"}>
          Create New Blog
        </Link>
      </div>
    </div>
  );
}
