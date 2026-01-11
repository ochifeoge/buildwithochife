"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FetchBlog } from "@/lib/validators/blog";
import { dateFormatter } from "@/lib/utils";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { DeleteBlog } from "./[id]/edit/action";
import { toast } from "sonner";

export function BlogCard({
  id,
  slug,
  title,
  excerpt,
  status,
  created_at,
  updated_at,
  cover_image,
}: FetchBlog) {
  async function deleteBlog() {
    const confirm = window.confirm(
      "Deleting this is irreversible, are you sure you want to proceed? "
    );
    if (!confirm) return;
    try {
      await DeleteBlog(id);
      toast.success("Deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("something went wrong");
    }
  }
  return (
    <div className="flex flex-col relative justify-between rounded-xl border p-4 transition hover:shadow-sm">
      <Trash2
        className="absolute top-5 right-5 text-destructive z-10 cursor-pointer"
        onClick={() => {
          deleteBlog();
        }}
      />
      <div className="space-y-3.5">
        <div className="relative h-45 rounded-lg">
          <Image
            fill
            alt={title}
            src={cover_image}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex items-center justify-between">
          <h3 className="font-medium line-clamp-2">{title}</h3>
          <Badge
            className={`${status === true ? "bg-green-500 text-white" : ""}`}
            variant={status === true ? "default" : "secondary"}
          >
            {status === true ? "Published" : "draft"}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Created {dateFormatter(created_at)}
          </p>
          {created_at !== updated_at && (
            <p className="text-xs text-muted-foreground">
              Updated at: {dateFormatter(updated_at)}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href={`/myblogs/${id}/edit`}>Edit</Link>
        </Button>

        <Button asChild size="sm">
          <Link href={`/blogs/${slug}`} target="_blank">
            View
          </Link>
        </Button>
      </div>
    </div>
  );
}
