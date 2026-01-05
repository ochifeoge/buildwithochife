import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { BlogCard } from "./BlogCard";
const mockBlogs = [
  {
    id: "1",
    title: "How I Built a Wedding Website With Payments",
    excerpt:
      "A behind-the-scenes breakdown of building a real-world wedding website with gift payments, QR codes, and Amazon links.",
    status: "published" as const,
    createdAt: "2 days ago",
  },
  {
    id: "2",
    title: "Designing Landing Pages That Convert",
    excerpt:
      "Lessons learned from building aesthetic, high-conversion landing pages for creatives and startups.",
    status: "draft" as const,
    createdAt: "1 week ago",
  },
];

export default function MyBlogs() {
  return (
    <div className="flex  flex-col gap-6 p-6">
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
        {mockBlogs.map((blog) => (
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
