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
import { useEffect, useState } from "react";
export default function StorageDialog({
  children,
  bucketName = "blog-files",
  allowedTypes = ["image/*"],
  path = "images",
}: {
  children: React.ReactNode;
  bucketName: string;
  allowedTypes: string[];
  path: string;
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

  const supabase = createClient();
  const [images, setImages] = useState<StorageImage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("start");
    const fetchImages = async () => {
      setLoading(true);

      const { data, error } = await supabase.storage
        .from(bucketName)
        .list(path, {
          limit: 100,
          sortBy: { column: "created_at", order: "desc" },
        });

      if (error) {
        console.log(error);
      }
      if (!error && data) {
        const files = data
          .filter((file) => file.name !== ".emptyFolderPlaceholder")
          .map((file) => {
            const { data } = supabase.storage
              .from(bucketName)
              .getPublicUrl(`${path}/${file.name}`);

            return {
              name: file.name,
              url: data.publicUrl,
            };
          });

        setImages(files);
      }

      setLoading(false);
    };

    fetchImages();
    console.log(images);
  }, [bucketName, path, supabase]);

  return (
    <Dialog>
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
