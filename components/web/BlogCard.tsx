import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  blog: {
    title: string;
    slug: string;
    excerpt: string;
    cover_image?: string | null;
    reading_time?: number | null;
    created_at: string;
  };
};

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group block">
      <Card
        className={cn(
          "overflow-hidden transition-all",
          "hover:-translate-y-1 hover:shadow-xl"
        )}
      >
        {/* Cover Image */}
        {blog.cover_image && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <CardHeader className="space-y-2">
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug">
            {blog.title}
          </h3>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {blog.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{new Date(blog.created_at).toLocaleDateString()}</span>

            {blog.reading_time && (
              <Badge variant="secondary">{blog.reading_time} min read</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
