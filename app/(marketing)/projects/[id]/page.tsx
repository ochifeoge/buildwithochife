import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Project } from "@/lib/types/project";
import { caseStudy, externalUrl, projectImage } from "@/lib/case-studies";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FinalCTA } from "../../FinalCTA";
type Props = { params: Promise<{ id: string }> };
const getProject = cache(async (id: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .single();
  return data as Project | null;
});
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return { title: "Project not found" };
  const story = caseStudy(project);
  const preview = projectImage(project);
  return {
    title: story.name,
    description: story.summary,
    alternates: { canonical: `/projects/${id}` },
    openGraph: {
      title: story.name,
      description: story.summary,
      images: preview ? [{ url: preview, alt: story.name }] : undefined,
    },
  };
}
export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();
  const story = caseStudy(project);
  const preview = projectImage(project);
  const live = externalUrl(project.live_url),
    github = externalUrl(project.github_url);
  return (
    <>
      <article className="shell case-page">
        <Link href="/projects" className="text-link">
          <ArrowLeft size={17} aria-hidden="true" /> All projects
        </Link>
        <header className="page-intro">
          <p className="eyebrow">{story.category}</p>
          <h1>{story.headline}</h1>
          <div className="case-intro">
            <p>{story.summary}</p>
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="cta"
              >
                {story.name === "KredGift"
                  ? "View archived deployment"
                  : "Explore the website"}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            )}
          </div>
        </header>
        {preview && (
          <div className={`case-image ${story.tone}`}>
            <Image
              src={preview}
              alt={`${story.name} website screenshot`}
              width={1440}
              height={960}
              sizes="(max-width: 700px) 90vw, 1200px"
              preload
            />
          </div>
        )}
        {story.challenge && (
          <div className="case-decisions">
            {[
              { title: "The challenge", text: story.challenge },
              { title: "The approach", text: story.decision },
              { title: "What I delivered", text: story.delivery },
            ].map((s, i) => (
              <section key={s.title}>
                <p className="eyebrow">0{i + 1}</p>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </section>
            ))}
          </div>
        )}
        <div className="case-detail">
          <aside>
            <p className="eyebrow">BEHIND THE BUILD</p>
            <h2>{story.name}</h2>
            <p>{project.tech_stack.join(" · ")}</p>
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                View source <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </aside>
          <section aria-label="Full project account">
            {project.description.split(/\n\s*\n/).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        </div>
      </article>
      <FinalCTA />
    </>
  );
}
