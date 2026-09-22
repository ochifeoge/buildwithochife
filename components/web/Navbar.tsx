"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { label: "Selected work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/about" },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="site-header shell">
      <Link className="wordmark" href="/" aria-label="Build with Ochife home">
        ochife<span className="brand-dot">.</span>
        <span className="wordmark-caption">INDEPENDENT DEVELOPER</span>
      </Link>
      <nav aria-label="Main navigation" className="desktop-nav">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            aria-current={pathname === l.href ? "page" : undefined}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link className="header-cta" href="/contact">
          Start a project <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="menu-toggle" aria-label="Open navigation">
              <Menu size={23} />
            </button>
          </SheetTrigger>
          <SheetContent
            className="portfolio-menu"
            aria-describedby="menu-description"
          >
            <SheetTitle>Explore</SheetTitle>
            <SheetDescription id="menu-description">
              Websites. Products. A better next step.
            </SheetDescription>
            <nav aria-label="Mobile navigation">
              {[
                ...links,
                { label: "Journal", href: "/blogs" },
                { label: "Start a project", href: "/contact" },
              ].map((l) => (
                <Link
                  href={l.href}
                  key={l.label}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                  <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
