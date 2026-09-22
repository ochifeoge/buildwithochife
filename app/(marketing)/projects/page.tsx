import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Projects } from "../Project";
import { orderProjects } from "@/lib/case-studies";
import type { Project } from "@/lib/types/project";
import { FinalCTA } from "../FinalCTA";
export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Business websites, custom experiences and product interfaces. Explore the thinking and work behind each project.",
  alternates: { canonical: "/projects" },
};
export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  return (
    <>
      <section className="shell section-space">
        <div className="page-intro">
          <p className="eyebrow">SELECTED WORK / CASE STUDIES</p>
          <h1>
            The thinking.
            <br />
            The making. <em>The work.</em>
          </h1>
          <p>
            A closer look at the websites and product interfaces I’ve built,
            with the context behind the decisions.
          </p>
        </div>
        <Projects projects={orderProjects((data ?? []) as Project[])} />
      </section>
      <FinalCTA />
    </>
  );
}
