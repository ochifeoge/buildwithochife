import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="shell">
        <p className="eyebrow">YOUR NEXT CHAPTER, ONLINE</p>
        <div className="final-cta-row">
          <h2>
            Let’s give your business
            <br />a better <em>first impression.</em>
          </h2>
          <Link
            href="/contact"
            className="round-cta"
            aria-label="Start a project"
          >
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div className="final-cta-bottom">
          <p>
            A new website, a fresh start, or a product worth building.
            <br />
            Tell me what you have in mind.
          </p>
          <Link href="/contact" className="text-link">
            Start a project <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>
    </section>
  );
}
