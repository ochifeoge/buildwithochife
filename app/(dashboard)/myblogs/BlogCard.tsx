import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  status: "draft" | "published";
  createdAt: string;
}

export function BlogCard({
  id,
  title,
  excerpt,
  status,
  createdAt,
}: BlogCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl border p-4 transition hover:shadow-sm">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium line-clamp-2">{title}</h3>
          <Badge variant={status === "published" ? "default" : "secondary"}>
            {status}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>

        <p className="text-xs text-muted-foreground">Created {createdAt}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href={`/myblogs/${id}/edit`}>Edit</Link>
        </Button>

        <Button asChild size="sm">
          <Link href={`/blogs/${id}`} target="_blank">
            View
          </Link>
        </Button>
      </div>
    </div>
  );
}
