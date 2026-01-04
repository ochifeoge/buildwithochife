import ElectricBorder from "@/components/ElectricBorder";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Code, Search, Zap } from "lucide-react";

const services = [
  {
    title: "High-Performance Websites",
    description:
      "Fast, responsive websites built with modern tools to ensure smooth user experience across all devices.",
    icon: Zap,
  },
  {
    title: "SEO & Conversion Focused",
    description:
      "I structure and optimize your site to rank better on search engines and convert visitors into clients.",
    icon: Search,
  },
  {
    title: "Clean, Scalable Code",
    description:
      "Maintainable front-end architecture that scales as your business grows — no hacks, no clutter.",
    icon: Code,
  },
];

export default function Services() {
  return (
    <section className="container py-20">
      {/* Heading */}
      <div className="max-w-2xl mb-12 mx-auto text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          How I help businesses grow online
        </h2>
        <p className="mt-4 text-muted-foreground">
          I don’t just build websites — I create digital experiences designed to
          attract, engage, and convert the right audience.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Card
            className="transition-shadow hover:shadow-md relative"
            key={index}
          >
            <GlowingEffect
              blur={0}
              borderWidth={3}
              spread={80}
              glow={true}
              disabled={false}
              // variant="blue"
              proximity={64}
              inactiveZone={0.01}
            />
            <CardHeader>
              <service.icon className="h-7 w-7 text-accent" />
              <CardTitle className="mt-4 text-lg">{service.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <CardDescription className="leading-relaxed">
                {service.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
