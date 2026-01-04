import Link from "next/link";
import { Suspense } from "react";
import { Projects } from "./Project";
import { GetAllProject } from "../(dashboard)/myprojects/project.actions";
import { ProjectsSkeleton } from "./ProjectsSkeleton";

export default async function ProjectSection() {
  const projects = await GetAllProject();
  return (
    <section className="container lg:py-16 py-8">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-8">
        <h2 className="text-3xl font-semibold sm:text-4xl">Selected work</h2>
        <Link
          href="/projects"
          className="text-sm text-muted-foreground hover:text-foreground transition"
        >
          View all →
        </Link>
      </div>

      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects projects={projects} />
      </Suspense>
    </section>
  );
}
