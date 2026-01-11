"use server";
import { createClient } from "@/lib/supabase/server";
import { BlogForm } from "@/lib/validators/blog";
import { revalidatePath } from "next/cache";

export async function GetAllImage() {
  const supabase = await createClient();

  const { data } = await supabase.storage.from("blog-files").list("images");

  console.log("listing: ", data);
}

export async function CreateBlog(payload: BlogForm) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("user not found");

  console.log(user);
  const authorId = user.id;
  const { error } = await supabase.from("blogs").insert({
    title: payload.title,
    slug: payload.slug,
    excerpt: payload.excerpt,
    cover_image: payload.coverImage,
    content: payload.content,
    tags: payload.tags,
    categories: payload.categories,
    reading_time: payload.readingTime,
    author_id: authorId,
  });

  revalidatePath("/blogs");
  revalidatePath("/myblogs");

  if (error) throw error;
}
