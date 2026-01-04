import ContactPopover from "@/components/web/contact-popover";

export function FinalCTA() {
  return (
    <section className="container py-32 text-center">
      <h2 className="text-3xl font-semibold sm:text-4xl">
        Ready to build something meaningful?
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
        Let’s create a website that reflects your vision and drives real
        results.
      </p>

      <div className="mt-8 flex justify-center">
        <ContactPopover />
      </div>
    </section>
  );
}
