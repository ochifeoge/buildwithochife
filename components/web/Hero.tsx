import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
export default function Hero() {
  return (
    <section className="hero shell" aria-labelledby="hero-heading">
      <div className="hero-topline">
        <p className="eyebrow">
          <span className="status-dot" /> Independent developer. Business-minded
          builder.
        </p>
        <span className="hero-index">DESIGN / DEVELOPMENT / DIRECTION</span>
      </div>
      <div className="hero-composition">
        <div className="hero-copy">
          <h1 id="hero-heading" data-hero-reveal>
            Good business.
            <br />
            Meet a <em>better</em>
            <br />
            website<span className="brand-dot">.</span>
          </h1>
          <div className="hero-description" data-hero-reveal>
            <p>
              I’m Ogechukwu Ochife. I build websites that help businesses win
              customers — and web applications that make work easier.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="cta">
                Start a project <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
              <Link href="#work" className="text-link">
                Explore my work <ArrowDown size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <figure className="hero-portrait" data-hero-reveal>
          <div className="portrait-image">
            <Image
              src={site.portrait}
              alt="Ogechukwu Ochife, independent full-stack web developer"
              fill
              sizes="(max-width: 600px) 82vw, (max-width: 900px) 42vw, 440px"
              className="portrait"
              preload
            />
          </div>
          <figcaption>
            <span>THE PERSON BEHIND THE BUILD</span>
            <span>
              Ogechukwu Ochife <ArrowUpRight size={15} aria-hidden="true" />
            </span>
          </figcaption>
          <span className="portrait-note" aria-hidden="true">
            Built with purpose.
          </span>
        </figure>
      </div>
      <div className="hero-proof">
        <p>
          From a first impression
          <br />
          <strong>to a working product.</strong>
        </p>
        <div>
          <span>Business websites</span>
          <small>EssentialHub</small>
        </div>
        <div>
          <span>Custom experiences</span>
          <small>Wedding & gifting website</small>
        </div>
        <div>
          <span>Product interfaces</span>
          <small>KredGift frontend</small>
        </div>
        <Link href="#work" aria-label="See selected project case studies">
          <ArrowDown size={22} />
        </Link>
      </div>
    </section>
  );
}
