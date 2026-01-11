"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { BlogForm, blogSchema, FetchBlog } from "@/lib/validators/blog";
import Tiptap from "../../create/TipTapEditor";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import StorageDialog from "@/components/web/StorageDialog";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Loader } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { UpdateBlog } from "./action";
import { useRouter } from "next/navigation";

export default function EditBlogForm({ blog }: { blog: FetchBlog }) {
  const {
    handleSubmit,
    register,
    control,
    getValues,
    watch,
    setValue,
    formState,
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt ?? "",
      coverImage: blog.cover_image ?? "",
      content: blog.content, // 👈 THIS is the key
      tags: blog.tags,
      status: blog.status,
      readingTime: +blog.reading_time,
      categories: blog.categories,
    },
  });
  const [categoriesInput, setCategoriesInput] = useState<string>(() =>
    (getValues("categories") || []).join(", ")
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (values: BlogForm) => {
    // we’ll wire update next
    startTransition(async () => {
      try {
        await UpdateBlog(values, blog.id);
        toast.success("blog updated successfully");
        router.push("/myblogs");
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
          toast.error(error.message || "Failed to update blog");
        } else {
          toast.error("something went wrong");
        }
      }
    });
  };

  // avoid passing the watch() API directly to children; use getValues() to read current value
  const content = getValues("content");
  const currentImage = watch("coverImage");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* title, slug, excerpt inputs */}
      <FieldGroup>
        {/* Title */}
        <Field>
          <FieldLabel>Title</FieldLabel>
          <FieldContent>
            <Input
              placeholder="How I built my SaaS with Next.js"
              {...register("title")}
            />
            <FieldError
              errors={
                formState.errors.title
                  ? [{ message: String(formState.errors.title.message) }]
                  : undefined
              }
            />
          </FieldContent>
        </Field>

        {/* Slug */}
        <Field>
          <FieldLabel>Slug</FieldLabel>
          <FieldContent>
            <Input placeholder="how-i-built-my-saas" {...register("slug")} />
            <FieldDescription>
              This becomes the URL:{" "}
              <code>/blog/{watch("slug") || "your-slug"}</code>
            </FieldDescription>
            <FieldError
              errors={
                formState.errors.slug
                  ? [{ message: String(formState.errors.slug.message) }]
                  : undefined
              }
            />
          </FieldContent>
        </Field>

        {/* Excerpt */}
        <Field>
          <FieldLabel>Excerpt</FieldLabel>
          <FieldContent>
            <Textarea
              placeholder="A short summary shown on previews and search engines"
              {...register("excerpt")}
            />
            <FieldDescription>
              Keep it under 160–200 characters for SEO.
            </FieldDescription>
            <FieldError
              errors={
                formState.errors.excerpt
                  ? [{ message: String(formState.errors.excerpt.message) }]
                  : undefined
              }
            />
          </FieldContent>
        </Field>

        {/* Cover Image */}
        <Field>
          <FieldLabel>Cover Image</FieldLabel>
          <FieldContent>
            <StorageDialog
              bucketName="blog-files"
              path="images"
              allowedTypes={["image/*"]}
              onSelect={(url: string) =>
                setValue("coverImage", url, { shouldValidate: true })
              }
            >
              <span>Select image</span>
            </StorageDialog>

            {currentImage && (
              <div className="mt-2 rounded relative not-odd:overflow-hidden">
                <Image
                  src={currentImage}
                  alt="Cover preview"
                  width={600}
                  height={300}
                  className="rounded"
                />
                <span
                  onClick={() => {
                    setValue("coverImage", "");
                  }}
                  className="absolute cursor-pointer top-2 right-2"
                >
                  X
                </span>
              </div>
            )}

            <FieldError
              errors={
                formState.errors.coverImage
                  ? [{ message: String(formState.errors.coverImage.message) }]
                  : undefined
              }
            />
          </FieldContent>
        </Field>

        {/* Content */}
        <Field>
          <FieldLabel>Content</FieldLabel>
          <FieldContent>
            <Tiptap
              {...{
                content,
                onChange: (value: string) => setValue("content", value),
              }}
            />
            <FieldError
              errors={
                formState.errors.content
                  ? [{ message: String(formState.errors.content.message) }]
                  : undefined
              }
            />
          </FieldContent>
        </Field>

        <Controller
          name="readingTime"
          control={control}
          render={() => (
            <Field>
              <FieldLabel> Reading Time</FieldLabel>
              <Input
                placeholder="5"
                {...register("readingTime")}
                type="number"
              />
              <FieldError
                errors={
                  formState.errors.readingTime
                    ? [
                        {
                          message: String(formState.errors.readingTime.message),
                        },
                      ]
                    : undefined
                }
              />
            </Field>
          )}
        />
        {/* categories */}
        <Controller
          name="categories"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Categories</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="Ecommerce, Wordpress, Business"
                  value={categoriesInput}
                  onChange={(e) => setCategoriesInput(e.target.value)}
                  onBlur={() => {
                    const parsed = categoriesInput
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean);
                    field.onChange(parsed);
                  }}
                />
                <FieldDescription>
                  Separate each category with a comma ` &quot; `
                </FieldDescription>
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />

        {/* Publish Toggle */}
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Publish</FieldLabel>
              <FieldContent className="">
                <div>
                  <FieldDescription>
                    Turn off to save as draft.
                  </FieldDescription>
                </div>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FieldContent>
            </Field>
          )}
        />

        <div>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Update Post
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
