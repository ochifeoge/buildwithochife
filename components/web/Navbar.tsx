"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // 1. Import usePathname
import { Menu } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./ThemeSwitcher";

const navOptions = [
  { title: "Home", path: "/" },
  { title: "Projects", path: "/projects" },
  { title: "Blogs", path: "/blogs" },
  { title: "About", path: "/about" },
];

export default function Navbar() {
  const pathname = usePathname(); // 2. Initialize the hook

  return (
    <header className="container flex items-center justify-between py-4">
      {/* Logo */}
      <h3 className="text-sm font-semibold tracking-tight">
        Build<span className="text-primary">With</span>
        <span>Ochife</span>
      </h3>

      {/* Desktop Nav */}
      <nav className="hidden items-center gap-8 md:flex">
        <ul className="flex items-center gap-6">
          {navOptions.map(({ path, title }) => {
            // 3. Determine if the link is active
            const isActive = pathname === path;

            return (
              <li key={title}>
                <Link
                  href={path}
                  className={cn(
                    "text-xs transition-colors hover:text-primary",
                    isActive ? "text- font-semibold" : "text-muted-foreground"
                  )}
                >
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              pathname === "/contact" && "ring-2 ring-primary" // Optional style for button
            )}
          >
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

        <SheetContent side="right" className="w-70">
          <div className="flex flex-col px-2 gap-6 mt-8">
            <nav className="flex flex-col gap-4">
              {navOptions.map(({ path, title }) => (
                <Link
                  key={title}
                  href={path}
                  className={cn(
                    "text-sm font-medium transition hover:text-primary",
                    pathname === path ? "text-primary" : "text-muted-foreground"
                  )}
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
