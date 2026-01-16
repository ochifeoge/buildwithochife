import { BlogCard } from "@/components/web/BlogCard";
import { BlogCardSkeleton } from "@/components/web/BlogCardSkelenton";
import Animation from "@/components/web/SectionAnimationText";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { Suspense } from "react";
import BlogListControls from "@/components/web/BlogListControls";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
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
    url: "/blog",
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
      <section className="relative h-[60vh] min-h-105 w-full overflow-hidden">
        <Image
          src="/projectBanner.jpg" // replace with your own static image
          alt="Projects background"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[rgba(0,0,0,0.65)] to-[rgba(0,0,0,0.6)]" />

        {/* Text */}
        <Animation
          heading={"Blogs"}
          subheading={"Learn something new today"}
          text={"Collection of blog posts curated to help solve problems"}
        />
      </section>

      <section className="container mx-auto max-w-6xl py-12">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Latest insights, tutorials and stories from the team. Browse, search
            and discover posts that interest you.
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
