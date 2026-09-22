import Link from "next/link";
import { site } from "@/lib/site";
export function Footer() {
  return (
    <footer className="site-footer shell">
      <Link href="/" className="wordmark">
        ochife<span className="brand-dot">.</span>
      </Link>
      <p>Independent by choice. Personal by design.</p>
      <nav aria-label="Footer navigation">
        <Link href="/blogs">Journal</Link>
        <a href={`mailto:${site.email}`}>Email</a>
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
          WhatsApp ↗
        </a>
      </nav>
      <small>© {new Date().getFullYear()} BuildWithOchife</small>
    </footer>
  );
}
