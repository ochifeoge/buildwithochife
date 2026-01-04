"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const audiences = [
  {
    title: "Business Owners",
    description:
      "You need a professional website that builds trust and converts visitors into customers.",
  },
  {
    title: "Startups & Founders",
    description:
      "You want to ship fast, validate ideas, and scale on a solid technical foundation.",
  },
  {
    title: "Healthcare & Nursing Brands",
    description:
      "You need clarity, credibility, and compliance-focused digital platforms.",
  },
];

export function WhoIWorkWith() {
  return (
    <section className="container py-24">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ margin: "-100px" }}
        className="space-y-12"
      >
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Who I work with
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item, i) => (
            <Card
              key={i}
              className="hover:-translate-y-3 transition-all duration-300"
            >
              <CardContent className="p-6 space-y-2">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
