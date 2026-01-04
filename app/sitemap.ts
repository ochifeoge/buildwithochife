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

  return [
    {
      url: "https://buildwithochife.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://buildwithochife.vercel.app/projects",
      lastModified: new Date(),
    },
    {
      url: "https://buildwithochife.vercel.app/blog",
      lastModified: new Date(),
    },
    ...projectUrls,
  ];
}
