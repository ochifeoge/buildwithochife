import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Projects } from "./Project";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types/project";

function homepageProjects(projects: Project[]) {
  return [...projects]
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    })
    .slice(0, 3);
}

export default async function ProjectSection() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published");
  const projects = homepageProjects((data ?? []) as Project[]);
  return (
    <section className="shell section-space work-section" id="work">
      <div className="section-heading">
        <p className="eyebrow">01 / SELECTED WORK</p>
        <h2>
          Less talk.
          <br />
          <em>More proof.</em>
        </h2>
        <div>
          <p>
            Different businesses. Different challenges.
            <br />
            Thoughtful work, built to be used.
          </p>
          <Link href="/projects" className="text-link">
            All projects <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <Projects projects={projects} />
    </section>
  );
}
