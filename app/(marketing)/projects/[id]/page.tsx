// app/projects/[id]/page.tsx
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Project } from "@/lib/types/project";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ContactPopover from "@/components/web/contact-popover";
import { Star, ExternalLink, Github, Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";

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

  const previewImage = project.preview_image_url ?? "/previewImage.jpg";

  return {
    title: project.title,
    description: project.description,

    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      images: [
        {
          url: previewImage,
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
      images: [previewImage],
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

  const previewImage = project.preview_image_url ?? "/previewImage.jpg";

  return (
    <section className="container py-20">
      <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
        {/* Main column: image + content */}
        <main className="lg:col-span-2 space-y-8">
          <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
            <div className="relative h-130 w-full rounded-2xl overflow-hidden">
              <Image
                src={previewImage}
                alt={project.title}
                fill
                className="object-cover"
              />
              {project.featured && (
                <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-amber-500/95 px-3 py-1 text-xs font-semibold text-white">
                  <Star className="w-4 h-4" /> Featured
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col  gap-4">
              <Link
                href="/projects"
                className="text-sm text-muted-foreground hover:underline"
              >
                ← Back to projects
              </Link>
              <h1 className="text-4xl font-extrabold leading-tight">
                {project.title}
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(project.created_at).toLocaleDateString()}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs">
                  {project.type}
                </span>
              </div>
            </div>

            {/* description broken into paragraphs for readability with stronger color */}
            <div className="max-w-none text-lg  leading-relaxed">
              {project.description.split(/\n\s*\n/).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </main>

        {/* Right column: sticky actions & meta */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card className="p-5">
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow={true}
                disabled={false}
                // variant="blue"
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Project</h3>
                  <p className="text-xs text-muted-foreground">Quick actions</p>
                </div>
                {project.featured && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/90 px-2 py-1 text-xs font-semibold text-white">
                    <Star className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <ContactPopover />

                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({})}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live site</span>
                  </a>
                )}

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    <Github className="w-4 h-4" />
                    <span>Source</span>
                  </a>
                )}

                <Link
                  href="/contact"
                  className={buttonVariants({ variant: "ghost" })}
                >
                  Hire me
                </Link>
              </div>

              <div className="mt-4 border-t pt-4">
                <h4 className="text-sm font-medium">Tech stack</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tech_stack.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 border-t pt-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Created</span>
                  <span>
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span>Updated</span>
                  <span>
                    {new Date(project.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </aside>
      </div>
    </section>
  );
}
