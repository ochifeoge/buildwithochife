"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We clarify goals, audience, and success metrics before writing a single line of code.",
  },
  {
    step: "02",
    title: "Design & Build",
    description:
      "I design and develop a clean, scalable solution tailored to your needs.",
  },
  {
    step: "03",
    title: "Launch & Support",
    description:
      "Your site goes live, optimized for speed, SEO, and future growth.",
  },
];

export function Process() {
  return (
    <section className="container py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-12 lg:grid-cols-3"
      >
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ margin: "-100px" }}
            transition={{ delay: i * 0.4, duration: 0.9, ease: "easeOut" }}
            className="space-y-3"
          >
            <span className="text-sm text-muted-foreground">{step.step}</span>
            <h3 className="text-xl font-medium">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
