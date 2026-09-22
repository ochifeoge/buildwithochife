import { BlogCard } from "@/components/web/BlogCard";
import { BlogCardSkeleton } from "@/components/web/BlogCardSkelenton";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import BlogListControls from "@/components/web/BlogListControls";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  alternates: { canonical: "/blogs" },
  description:
    "Clear, practical articles on frontend development that help clients understand key concepts, make better technical decisions, and build websites that support real business goals.",
  keywords: [
    "BuildWithOchife",
    "frontend blog",
    "web development for businesses",
    "frontend concepts explained",
    "website tips for business owners",
    "UI engineering insights",
    "web development Nigeria",
  ],

  openGraph: {
    title: "Blogs | BuildWithOchife",
    description:
      "Client-friendly articles explaining frontend concepts, offering practical website tips, and showing how modern web decisions impact business growth.",
    type: "website",
    url: "/blogs",
  },

  twitter: {
    card: "summary_large_image",
    title: "Blogs | BuildWithOchife",
    description:
      "Frontend articles written for clients—explaining concepts clearly, sharing practical tips, and connecting web decisions to business results.",
  },
};

export default async function BlogsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return <p>No blogs yet</p>;
  }

  const blogs = data;

  return (
    <>
      <header className="shell page-intro journal-intro">
        <p className="eyebrow">THE JOURNAL</p>
        <h1>
          Notes on building
          <br />
          <em>better websites.</em>
        </h1>
        <p>
          Practical thoughts on the decisions that connect good software with
          better business.
        </p>
      </header>

      <section className="container mx-auto max-w-6xl py-12">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Insights and practical notes from Ochife. Browse, search and
            discover posts that interest you.
          </p>
        </div>

        <BlogListControls />

        <Suspense fallback={<BlogCardSkeleton />}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, i) => (
              <div
                key={i}
                className="blog-card"
                data-title={blog.title}
                data-excerpt={blog.excerpt ?? ""}
                data-categories={(blog.categories || []).join(",")}
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        </Suspense>

        <div
          id="blog-no-results"
          className="mt-6 text-center text-muted-foreground hidden"
        >
          No posts match your search.
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Want to contribute? Reach out to submit a guest post.
          </p>
        </div>
      </section>
    </>
  );
}
