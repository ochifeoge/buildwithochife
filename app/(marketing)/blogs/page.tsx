import ComingSoonPage from "@/components/web/CommingSoon";
import { createClient } from "@/lib/supabase/server";

export default async function BlogsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return <p>No blogs yet</p>;
  }

  const blog = data[0];

  return (
    <>
      <ComingSoonPage />

      {/* <article className="prose prose-slate max-w-none">
        <h1>{blog.title}</h1>

        <div
          className="tiptap"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article> */}
    </>
  );
}
