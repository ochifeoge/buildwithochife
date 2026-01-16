import { createClient } from "@/lib/supabase/server";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("id, updated_at")
    .eq("status", "published");

  const projectUrls =
    projects?.map((project) => ({
      url: `https://buildwithochife.vercel.app/projects/${project.id}`,
      lastModified: project.updated_at,
    })) ?? [];

  const { data: blogs } = await supabase
    .from("blogs")
    .select("slug, updated_at");

  const blogUrls =
    blogs?.map((blog) => ({
      url: `https://buildwithochife.vercel.app/blogs/${blog.slug}`,
      lastModified: blog.updated_at,
    })) ?? [];

  return [
    {
      url: "https://buildwithochife.vercel.app",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://buildwithochife.vercel.app/projects",
      lastModified: new Date(),
    },
    {
      url: "https://buildwithochife.vercel.app/blogs",
      lastModified: new Date(),
    },
    ...projectUrls,
    ...blogUrls,
  ];
}
