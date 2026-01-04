"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  LayoutDashboard,
  PenSquare,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { label: "Dashboard", href: "/account", icon: LayoutDashboard },
  { label: "Projects", href: "/myprojects", icon: FolderKanban },
  { label: "Blog", href: "/myblogs", icon: PenSquare },
  { label: "Settings", href: "/settings", icon: Settings },
];

function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
            pathname === href
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default function AccountSidebar() {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 border-r bg-background p-4 md:block">
        <h2 className="mb-6 text-lg font-semibold">My Dashboard</h2>
        <NavLinks />
      </aside>

      {/* Mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="m-2">
              ☰
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <h2 className="mb-6 text-lg font-semibold">My Dashboard</h2>
            <NavLinks />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
