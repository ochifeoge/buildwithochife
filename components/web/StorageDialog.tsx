"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "../dropzone";
import { useSupabaseUpload } from "@/hooks/use-supabase-upload";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState, useMemo } from "react";
export default function StorageDialog({
  children,
  bucketName = "blog-files",
  allowedTypes = ["image/*"],
  path = "images",
  onSelect,
}: {
  children: React.ReactNode;
  bucketName: string;
  allowedTypes: string[];
  path: string;
  onSelect?: (url: string) => void;
}) {
  const props = useSupabaseUpload({
    bucketName: bucketName,
    path: path,
    allowedMimeTypes: allowedTypes,
    maxFiles: 5,
    maxFileSize: 1000 * 1000 * 10, // 10MB,
  });

  type StorageImage = {
    name: string;
    url: string;
  };

  // memoize client so it doesn't change on every render
  const supabase = useMemo(() => createClient(), []);
  const [images, setImages] = useState<StorageImage[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  // fetch images when dialog is opened or when bucket/path change
  useEffect(() => {
    if (!open) return; // only fetch when dialog is open

    let mounted = true;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.storage
          .from(bucketName)
          .list(path, {
            limit: 100,
            sortBy: { column: "created_at", order: "desc" },
          });

        if (error) {
          console.error("Error listing storage files:", error);
          setImages([]);
          return;
        }

        if (!data) {
          setImages([]);
          return;
        }

        const files = data
          .filter((file) => file.name !== ".emptyFolderPlaceholder")
          .map((file) => {
            const { data: pub } = supabase.storage
              .from(bucketName)
              .getPublicUrl(`${path}/${file.name}`);

            return {
              name: file.name,
              url: pub.publicUrl,
            };
          });

        if (mounted) setImages(files);
      } catch (err) {
        console.error("Failed to fetch images:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchImages();

    return () => {
      mounted = false;
    };
  }, [open, bucketName, path, supabase]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-7xl  h-[90dvh]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-[40vh] overflow-y-auto">
          {loading && (
            <p className="col-span-full text-sm text-muted-foreground">
              Loading images…
            </p>
          )}

          {!loading && images.length === 0 && (
            <p className="col-span-full text-sm text-muted-foreground">
              No images uploaded yet
            </p>
          )}

          {images.map((image) => (
            <button
              key={image.name}
              className="group relative aspect-square rounded-md border overflow-hidden hover:ring-2 hover:ring-primary transition"
              onClick={() => {
                onSelect?.(image.url);
                setOpen(false);
              }}
            >
              <Image
                src={image.url}
                alt={image.name}
                fill
                className="object-cover"
              />

              {/* Hover overlay (future select state) */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs">
                Select
              </div>
            </button>
          ))}
        </div>

        <Dropzone {...props}>
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
