"use server";

import { createClient } from "@/lib/supabase/server";
import { BlogForm } from "@/lib/validators/blog";
import { revalidatePath } from "next/cache";

export async function UpdateBlog(payload: BlogForm, id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("user not found");

  const { error } = await supabase
    .from("blogs")
    .update({
      title: payload.title,
      slug: payload.slug,
      excerpt: payload.excerpt,
      cover_image: payload.coverImage,
      content: payload.content,
      tags: payload.tags,
      categories: payload.categories,
      reading_time: payload.readingTime,
      status: payload.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  revalidatePath("/blogs");
  revalidatePath("/myblogs");
}

export async function DeleteBlog(blogId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.from("blogs").delete().eq("id", blogId);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  revalidatePath("/blogs");
  revalidatePath("/myblogs");
  revalidatePath("/account");
}
