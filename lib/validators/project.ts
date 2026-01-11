import { z } from "zod";

export const typeEnum = [
  "webdevelopment",
  "Frontend ",
  "wordpress",
  "mobile",
  "backend",
  "other",
];
export const projectSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),

  live_url: z.string().url().optional().or(z.literal("")),
  github_url: z.string(),

  preview_image_url: z.string().optional(),

  tech_stack: z.array(z.string().min(1)).min(1, "Add at least one technology"),

  status: z.enum(["draft", "published"]),
  featured: z.boolean().default(false),

  type: z.enum(typeEnum),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
