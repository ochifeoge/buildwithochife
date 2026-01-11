"use client";

import { useTransition, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import StorageDialog from "@/components/web/StorageDialog";
import Tiptap from "./TipTapEditor";
import { CreateBlog } from "./action";
import { toast } from "sonner";
import Image from "next/image";
import { Loader } from "lucide-react";
import { BlogForm, blogSchema } from "@/lib/validators/blog";

export default function BlogEditorLayout() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<BlogForm>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      coverImage: "",
      content: "",
      tags: [],
      status: true,
      categories: [],
      readingTime: 5,
    },
  });

  const { register, handleSubmit, setValue, watch, formState } = form;

  // categories input state: show as comma-separated string and parse on blur
  const [categoriesInput, setCategoriesInput] = useState<string>(() =>
    (form.getValues("categories") || []).join(", ")
  );

  // keep categoriesInput in sync if form value changes elsewhere
  useEffect(() => {
    const subscription = watch((values, { name }) => {
      if (name === "categories") {
        setCategoriesInput(values.categories?.join(", ") ?? "");
      }
    });
    return () => subscription.unsubscribe && subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: BlogForm) => {
    startTransition(async () => {
      try {
        await CreateBlog(data);
        toast.success("Blog published successfully");
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message || "Failed to create blog");
        } else {
          toast.error("something went wrong");
        }
      }
    });
  };

  const coverValue = watch("coverImage");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-4xl mx-auto"
    >
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

            {coverValue && (
              <div className="mt-2 rounded overflow-hidden">
                <Image
                  src={coverValue}
                  alt="Cover preview"
                  width={600}
                  height={300}
                  className="rounded"
                />
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
              content=""
              onChange={(html) =>
                setValue("content", html, { shouldValidate: true })
              }
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
            Publish post
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
