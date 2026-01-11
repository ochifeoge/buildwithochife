import Image from "next/image";
import ContactPopover from "./contact-popover";
import RotatingText from "./RotatingText";

export default function Hero() {
  return (
    <section className="container min-h-[60vh] md:min-h-[85vh] grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
      {/* bg-[url('/heroImg.jpg')] */}
      {/* LEFT */}
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          I build modern websites that help businesses grow online
        </h1>

        {/* Rotating audience line */}
        <div className="text-sm sm:text-base">
          <span className="mr-2 text-muted-foreground">For</span>
          <RotatingText
            texts={[
              "businesses",
              "startups & SaaS teams",

              "founders & agencies",
            ]}
            mainClassName="inline-flex items-center rounded-md bg-accent px-3 py-1 text-accent-foreground"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.03}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 28, stiffness: 380 }}
            rotationInterval={5400}
          />
        </div>

        <p className="text-muted-foreground max-w-lg">
          I design and develop fast, SEO-optimized websites for individuals,
          startups, and healthcare brands — built to convert visitors into
          paying clients.
        </p>

        <div className="flex items-center gap-4">
          <ContactPopover />
          <span className="text-xs text-muted-foreground">
            Available for freelance & contracts
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative  h-70 md:h-130 w-full block">
        <div className="absolute inset-0 rounded-2xl bg-accent" />
        <Image
          src="/heroImg.jpg"
          alt="Modern website development workspace"
          fill
          className="relative rounded-2xl object-cover shadow-lg"
          priority
        />
      </div>
    </section>
  );
}
