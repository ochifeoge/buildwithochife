import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContactPopover from "./contact-popover";

export default function ComingSoonPage() {
  return (
    <section className="container flex min-h-[70vh] flex-col items-center justify-center text-center space-y-6">
      {/* Badge / subtle label */}
      <span className="rounded-full border px-4 py-1 text-xs text-muted-foreground">
        Under construction
      </span>

      {/* Main heading */}
      <h1 className="text-3xl font-semibold sm:text-4xl">
        This page is coming soon
      </h1>

      {/* Supporting text */}
      <p className="max-w-md text-muted-foreground">
        I’m currently working on this section to make sure it delivers real
        value. In the meantime, feel free to explore my projects or get in
        touch.
      </p>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4">
        <ContactPopover />
        <Button variant={"secondary"} asChild>
          <Link href="/projects">View projects</Link>
        </Button>
      </div>
    </section>
  );
}
