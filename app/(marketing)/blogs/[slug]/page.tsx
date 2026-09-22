import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { dateFormatter } from "@/lib/utils";
import { FetchBlog } from "@/lib/validators/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", true)
    .single();

  if (!blog || error) {
    return {
      title: "Blog",
      description: "",
    };
  }

  const description = blog.excerpt ?? "";

  return {
    title: blog.title,
    description,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: {
      title: blog.title,
      description,
      images: blog.cover_image ? [{ url: blog.cover_image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.cover_image],
    },
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", true)
    .single();

  if (error) throw error;
  if (!blog) notFound();

  const b = blog as FetchBlog;

  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", b.author_id)
    .single();

  // A missing author profile should not hide an otherwise published article.

  return (
    <article className="container mx-auto  max-w-4xl py-16">
      {/* top meta */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {b.title}
            </h1>
            <p className="text-muted-foreground mt-2">{b.excerpt}</p>
            <div className="flex items-center gap-3 mt-3">
              <time className="text-sm text-muted-foreground">
                {dateFormatter(b.created_at)}
              </time>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {b.reading_time} min read
              </span>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
            <div className="flex gap-2">
              {b.tags?.slice(0, 5).map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
            <Link href="/" className={buttonVariants({ variant: "ghost" })}>
              Back
            </Link>
          </div>
        </div>

        <Separator />

        {b.cover_image && (
          <div className="w-full h-80 lg:h-150 rounded-lg overflow-hidden relative  shadow-md">
            <Image
              src={b.cover_image}
              alt={b.title}
              fill
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="prose max-w-full">
          {/* content is expected to be safe/html from the editor; render as HTML */}
          <div id="blog" dangerouslySetInnerHTML={{ __html: b.content }} />
        </div>

        <Separator />

        <footer className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex gap-2 flex-wrap">
              {b.categories?.map((c) => (
                <span
                  key={c}
                  className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-800"
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              Tags: {b.tags?.join(", ")}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className={``}>{user?.display_name ?? "Ogechukwu Ochife"}</p>
            <Link href="/blogs" className={buttonVariants()}>
              Back to blog list
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
