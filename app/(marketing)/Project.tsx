import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types/project";
import { caseStudy, projectImage } from "@/lib/case-studies";
export function Projects({ projects }: { projects: Project[] }) {
  if (!projects.length)
    return (
      <div className="work-empty">
        <p>Project details are temporarily unavailable.</p>
        <Link className="text-link" href="/contact">
          Ask me about relevant work{" "}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    );
  return (
    <div className="work-grid">
      {projects.map((project, i) => {
        const story = caseStudy(project);
        const preview = projectImage(project);
        return (
          <article
            className={`work-item ${i === 0 ? "work-featured" : ""}`}
            key={project.id}
            data-reveal
          >
            <Link
              href={`/projects/${project.id}`}
              className={`work-image ${story.tone}`}
              aria-label={`View ${story.name} case study`}
            >
              <div className="browser-frame">
                <div className="browser-bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <small>{story.name}</small>
                </div>
                <div className="project-screen">
                  {preview ? (
                    <Image
                      src={preview}
                      alt={`${story.name} website screenshot`}
                      fill
                      sizes={
                        i === 0
                          ? "(max-width: 700px) 90vw, 1100px"
                          : "(max-width: 700px) 90vw, 600px"
                      }
                      className="project-screenshot"
                    />
                  ) : (
                    <div className="project-placeholder">{story.name}</div>
                  )}
                </div>
              </div>
              <span className="image-link-icon">
                <ArrowUpRight size={23} aria-hidden="true" />
              </span>
            </Link>
            <div className="work-caption">
              <div>
                <p className="eyebrow">{story.category}</p>
                <h3>
                  <Link href={`/projects/${project.id}`}>
                    {story.name}
                    <ArrowUpRight size={24} aria-hidden="true" />
                  </Link>
                </h3>
              </div>
              <div>
                <p>{story.summary}</p>
                <Link href={`/projects/${project.id}`} className="text-link">
                  View case study <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
