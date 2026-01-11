import z from "zod";

export const blogSchema = z.object({
  title: z.string().min(5),
  slug: z
    .string()
    .min(3)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase, hyphen-separated, no spaces"
    ),
  excerpt: z.string().max(200),
  coverImage: z.string().url(),
  content: z.string().min(20),
  tags: z.array(z.string()).optional(),
  status: z.boolean(),
  readingTime: z.int(),
  categories: z.array(z.string().min(1)).min(1, "Add at least one category"),
});

export type BlogForm = z.infer<typeof blogSchema>;

export interface FetchBlog {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  tags: string[];
  status: boolean;
  categories: string[];
  author_id: string;
  reading_time: number;
}
