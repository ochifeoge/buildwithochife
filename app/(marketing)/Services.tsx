import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
const services = [
  {
    name: "Business websites",
    copy: "Give customers a clear reason to choose you. A focused website or landing page built around your offer, your audience and the next step you want them to take.",
    detail: "BUSINESS SITES / LANDING PAGES / BOOKINGS",
  },
  {
    name: "Web applications",
    copy: "Turn a workflow or product idea into software people can use. From customer portals to SaaS products and internal dashboards, with the frontend and backend working together.",
    detail: "SAAS / DASHBOARDS / CUSTOMER PORTALS",
  },
  {
    name: "Website redesigns",
    copy: "Your business has moved forward. Your website should too. Improve the structure, messaging and mobile experience so visitors can find what matters and act on it.",
    detail: "UX / PERFORMANCE / CONVERSION PATHS",
  },
];
export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="shell section-space">
        <div className="section-heading">
          <p className="eyebrow">02 / HOW I CAN HELP</p>
          <h2>
            Built for the way
            <br />
            your business <em>works.</em>
          </h2>
          <p>
            A clear purpose for every page.
            <br />A practical reason for every feature.
          </p>
        </div>
        <div className="service-list">
          {services.map((s, i) => (
            <article key={s.name} className="service-row" data-reveal>
              <span className="row-index">0{i + 1}</span>
              <h3>{s.name}</h3>
              <div>
                <p>{s.copy}</p>
                <small>{s.detail}</small>
              </div>
              <Link
                href={`/contact?service=${encodeURIComponent(s.name)}`}
                aria-label={`Discuss ${s.name.toLowerCase()}`}
                className="service-arrow"
              >
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
        <div className="service-footnote">
          <span>Not sure what you need? Start with the problem.</span>
          <Link href="/contact" className="text-link">
            Let’s talk it through <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
