import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EditBlogForm from "./EditBlogForm";

interface PageProps {
  params: { id: string };
}

export default async function EditBlogPage({ params }: PageProps) {
  const { id } = await params;
  console.log(id);
  const supabase = await createClient();

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !blog) {
    notFound();
  }

  return <EditBlogForm blog={blog} />;
}
