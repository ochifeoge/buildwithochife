"use client";
import { motion } from "framer-motion";

export default function Animation() {
  return (
    <div className="relative z-10 flex h-full items-center">
      <div className="container space-y-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-sm uppercase tracking-widest text-white/70"
        >
          Projects
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="max-w-2xl text-4xl font-semibold text-white sm:text-5xl"
        >
          Selected work & case studies
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="max-w-xl text-base text-white/80"
        >
          A collection of real-world projects I’ve designed and built for
          clients, startups, and personal initiatives.
        </motion.p>
      </div>
    </div>
  );
}
