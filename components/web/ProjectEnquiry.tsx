"use client";
import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
const services = [
  "Business websites",
  "Web applications",
  "Website redesigns",
  "Not sure yet",
];
export default function ProjectEnquiry({ service }: { service?: string }) {
  const [draft, setDraft] = useState<string>();
  function prepare(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Hi Ochife,\n\nI'm ${f.get("name")}${f.get("company") ? ` from ${f.get("company")}` : ""}.\n\nI need: ${f.get("service")}\nApproximate budget: ${f.get("budget")}\n\n${f.get("description")}\n\nReply to: ${f.get("email")}`;
    setDraft(
      `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry: ${f.get("service")}`)}&body=${encodeURIComponent(body)}`,
    );
  }
  return (
    <form
      className="enquiry-form"
      onSubmit={prepare}
      onChange={() => setDraft(undefined)}
    >
      <div className="form-grid">
        <label>
          Your name <span>*</span>
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Alex Taylor"
          />
        </label>
        <label>
          Email address <span>*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            required
            maxLength={200}
            placeholder="alex@yourbusiness.com"
          />
        </label>
        <label>
          Company <small>optional</small>
          <input
            name="company"
            autoComplete="organization"
            maxLength={150}
            placeholder="Your business name"
          />
        </label>
        <label>
          What do you need?
          <select
            name="service"
            defaultValue={
              services.includes(service ?? "") ? service : "Not sure yet"
            }
          >
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Approximate budget
        <select name="budget" defaultValue="Let's discuss">
          <option>Let&apos;s discuss</option>
          <option>£400–£1,000</option>
          <option>£1,000–£3,000</option>
          <option>£3,000–£5,000</option>
          <option>£5,000+</option>
        </select>
      </label>
      <label>
        A little about the project <span>*</span>
        <textarea
          name="description"
          required
          rows={4}
          maxLength={2500}
          placeholder="What does your business do, and what would you like the website or product to help with?"
        />
      </label>
      <p className="form-note">
        This prepares a brief in your email app. Nothing is sent or stored on
        this website.
      </p>
      <button className="cta" type="submit">
        Prepare my project brief <ArrowUpRight size={18} aria-hidden="true" />
      </button>
      <div aria-live="polite">
        {draft && (
          <div className="enquiry-ready">
            <strong>Your brief is ready.</strong>
            <p>
              Open your email app to review and send it. If no email app opens,
              email {site.email} directly.
            </p>
            <a className="text-link" href={draft}>
              Open email draft <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </form>
  );
}
