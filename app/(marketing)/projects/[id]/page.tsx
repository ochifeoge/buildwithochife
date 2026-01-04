// app/projects/[id]/page.tsx
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/types/project";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("projects")
    .select("title, description, preview_image_url")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (!data) {
    return {
      title: "Project not found",
      description: "This project does not exist or is no longer available.",
    };
  }

  const project = data as Pick<
    Project,
    "title" | "description" | "preview_image_url"
  >;

  return {
    title: project.title,
    description: project.description,

    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      images: [
        {
          url: project.preview_image_url,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.preview_image_url],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (!data) notFound();

  const project = data as Project;
  console.log(project);

  return (
    <section className="container py-24 space-y-12">
      {/* Image */}
      <div className="relative h-105 w-full overflow-hidden rounded-xl">
        <Image
          src={project.preview_image_url}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-semibold">{project.title}</h1>

        <p className="text-muted-foreground text-lg">{project.description}</p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4">
          {project.live_url && (
            <Button asChild>
              <a href={project.live_url} target="_blank">
                View Live
              </a>
            </Button>
          )}

          {project.github_url && (
            <Button variant="outline" asChild>
              <a href={project.github_url} target="_blank">
                Source Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
