"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./ThemeSwitcher";

const navOptions = [
  { title: "Home", path: "/" },
  { title: "Projects", path: "/projects" },
  { title: "About", path: "/about" },
  { title: "Blog", path: "/blogs" },
];

export default function Navbar() {
  return (
    <header className="container flex items-center justify-between py-4">
      {/* Logo */}
      <h3 className="text-sm font-semibold tracking-tight">
        BuildWith
        <span className="text-accent-foreground">Ochife</span>
      </h3>

      {/* Desktop Nav */}
      <nav className="hidden items-center gap-8 md:flex">
        <ul className="flex items-center gap-6">
          {navOptions.map(({ path, title }) => (
            <li key={title}>
              <Link
                href={path}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href="/contact" className={cn(buttonVariants({ size: "sm" }))}>
            Contact
          </Link>
          <ModeToggle />
        </div>
      </nav>

      {/* Mobile Nav */}
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="inline-flex items-center justify-center rounded-md border p-2 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[280px]">
          <div className="flex flex-col px-2 gap-6 mt-8">
            <nav className="flex flex-col gap-4">
              {navOptions.map(({ path, title }) => (
                <Link
                  key={title}
                  href={path}
                  className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
                >
                  {title}
                </Link>
              ))}
            </nav>

            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "sm" }), "mt-4")}
            >
              Contact
            </Link>
            <ModeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
