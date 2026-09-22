import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
export default function About({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section id="about" className="about-section shell section-space">
      <div className="about-image" data-reveal>
        <Image
          src={site.portrait}
          alt="Ogechukwu Ochife"
          fill
          sizes="(max-width: 700px) 90vw, 420px"
          className="portrait"
        />
        <span className="about-image-label">
          A REAL PERSON. YOUR DIRECT CONTACT.
        </span>
      </div>
      <div className="about-copy">
        <p className="eyebrow">04 / THE PERSON BEHIND THE WORK</p>
        <Heading>
          A developer who
          <br />
          sees the <em>bigger picture.</em>
        </Heading>
        <p className="about-lead">Hi, I’m Ogechukwu. You can call me Ochife.</p>
        <p>
          I’m an independent full-stack web developer based in Nigeria, working
          with businesses and founders remotely. I connect the technical details
          with the question that matters: what does this need to do for your
          business?
        </p>
        <p>
          My work spans business websites, payment-enabled experiences and
          application interfaces. I bring product thinking to the build — from
          how a customer finds the right information to how your team manages
          things behind the scenes.
        </p>
        <Link className="text-link" href="/contact">
          Tell me what you’re working on{" "}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
        <div className="quiet-stack">
          <span>TOOLS, NOT THE SELLING POINT</span>
          <p>React · Next.js · TypeScript · Supabase · WordPress</p>
        </div>
      </div>
    </section>
  );
}
