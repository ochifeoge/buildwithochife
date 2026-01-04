import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Projects } from "../Project";
import type { Project } from "@/lib/types/project";
import { Suspense } from "react";
import { ProjectsSkeleton } from "../ProjectsSkeleton";

import { Metadata } from "next";
import Animation from "@/components/web/SectionAnimationText";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated selection of real-world projects showcasing my work in web development, UI engineering, and product-focused solutions.",

  openGraph: {
    title: "Projects",
    description:
      "Explore a selection of real-world projects showcasing my work in web development, UI engineering, and modern web technologies.",
    type: "website",
    url: "/projects",
  },

  twitter: {
    card: "summary_large_image",
    title: "Projects",
    description:
      "Explore a selection of real-world projects showcasing my work in web development and UI engineering.",
  },
};
export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  const projects = (data ?? []) as Project[];

  return (
    <main className="space-y-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-105 w-full overflow-hidden">
        <Image
          src="/projectBanner.jpg" // replace with your own static image
          alt="Projects background"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[rgba(0,0,0,0.65)] to-[rgba(0,0,0,0.6)]" />

        {/* Text */}
        <Animation />
      </section>

      {/* Projects Grid */}
      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects projects={projects} />
      </Suspense>
    </main>
  );
}
