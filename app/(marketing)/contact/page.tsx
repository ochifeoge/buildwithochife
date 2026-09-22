import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import ProjectEnquiry from "@/components/web/ProjectEnquiry";
export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Talk to Ochife about a business website, redesign or web application. Start with a short project brief, email or WhatsApp.",
  alternates: { canonical: "/contact" },
};
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  return (
    <section className="shell contact-page section-space">
      <div className="contact-copy">
        <p className="eyebrow">LET’S WORK TOGETHER</p>
        <h1>
          Good things start
          <br />
          with a <em>conversation.</em>
        </h1>
        <p>
          You don’t need a perfect brief. Tell me about your business, what you
          need and where you want to go.
        </p>
        <div className="contact-direct">
          <a href={`mailto:${site.email}`} className="text-link">
            {site.email}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Prefer WhatsApp? Say hello{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="contact-next">
          <p className="eyebrow">WHAT HAPPENS NEXT?</p>
          <p>
            I’ll review your enquiry and we’ll discuss fit, scope and next
            steps. You’ll know the plan and cost before committing to a build.
          </p>
        </div>
      </div>
      <ProjectEnquiry service={service} />
    </section>
  );
}
