"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import {
  projectSchema,
  ProjectFormValues,
  typeEnum,
} from "@/lib/validators/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { useState, useTransition, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateProjectAction, UpdateProjectAction } from "./project.actions";
import { Loader } from "lucide-react";
import Image from "next/image";

interface ProjectFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<ProjectFormValues>;
}

export default function ProjectForm({ mode, defaultValues }: ProjectFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(
    defaultValues?.preview_image_url ?? null
  );

  // keep a local text input for tech stack so the user can type freely
  const [techInput, setTechInput] = useState<string>(() =>
    defaultValues?.tech_stack ? defaultValues.tech_stack.join(", ") : ""
  );

  useEffect(() => {
    setTechInput(
      defaultValues?.tech_stack ? defaultValues.tech_stack.join(", ") : ""
    );
  }, [defaultValues?.tech_stack]);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(
      projectSchema
    ) as unknown as Resolver<ProjectFormValues>,
    defaultValues: {
      title: "",
      description: "",
      featured: false,
      github_url: "",
      live_url: "",
      preview_image_url: "",
      status: "draft",
      type: "webdevelopment",
      tech_stack: [],
      ...defaultValues,
    },
  });

  const [isPending, startTransition] = useTransition();
  function onSubmit(values: ProjectFormValues) {
    if (mode === "create" && !imageFile) {
      alert("Please upload a preview image");
      return;
    }

    const formData = new FormData();

    // append text fields
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("status", values.status);
    formData.append("type", values.type);
    formData.append("featured", String(values.featured));

    if (values.live_url) formData.append("live_url", values.live_url);
    if (values.github_url) formData.append("github_url", values.github_url);

    // arrays must be stringified
    formData.append("tech_stack", JSON.stringify(values.tech_stack));

    // file
    if (imageFile) {
      formData.append("image", imageFile);
    }

    startTransition(() => {
      if (mode === "create") {
        CreateProjectAction(formData);
      } else {
        UpdateProjectAction(defaultValues!.id as string, formData);
      }
    });
  }

  // on submit, parse the techInput into an array and set the form value before running validation/submit
  return (
    <form
      className="space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();
        const parsed = techInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        form.setValue("tech_stack", parsed, {
          shouldValidate: true,
          shouldDirty: true,
        });
        await form.handleSubmit(onSubmit)();
      }}
    >
      <FieldGroup>
        {/* Title */}
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Project title</FieldLabel>
              <Input {...field} placeholder="Exon Mobile Website" />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        {/* Description */}
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                {...field}
                placeholder="What problem does this project solve?"
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        {/* Live URL */}
        <Controller
          name="live_url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Live URL</FieldLabel>
              <Input {...field} placeholder="https://example.com" />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        {/* GitHub URL */}
        <Controller
          name="github_url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>GitHub URL</FieldLabel>
              <Input
                {...field}
                placeholder="https://github.com/username/repo"
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        {/* Tech stack */}
        <Controller
          name="tech_stack"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Tech stack</FieldLabel>
              <Input
                placeholder="Next.js, Supabase, Tailwind"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onBlur={() => {
                  const parsed = techInput
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean);
                  field.onChange(parsed);
                }}
              />
              <FieldDescription>
                Seperate each tech stack with a comma ","
              </FieldDescription>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        {/* Type */}
        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Type</FieldLabel>
              <Select
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Project type" />
                </SelectTrigger>
                <SelectContent>
                  {typeEnum.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        {/* Image */}
        <Field>
          <FieldLabel>Preview image</FieldLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              setImageFile(file);
              setImagePreview(URL.createObjectURL(file));
            }}
          />

          {imagePreview && (
            <div className="relative h-40 w-full">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="mt-2 object-cover rounded-md border transition-all"
              />
            </div>
          )}
        </Field>

        {/* status */}
        <Controller
          name="status"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Status</FieldLabel>
              <Select
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Project status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"draft"}>Draft</SelectItem>

                  <SelectItem value={"published"}>Publish</SelectItem>
                </SelectContent>
              </Select>

              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        {/* Featured */}
        <Controller
          name="featured"
          control={form.control}
          render={({ field }) => (
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel>Featured project</FieldLabel>

                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            </Field>
          )}
        />
      </FieldGroup>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={isPending}>
        {mode === "create" ? "Create project" : "Update project"}
        {isPending && <Loader className="animate-spin mr-2 " />}
      </Button>
    </form>
  );
}
