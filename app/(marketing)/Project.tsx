"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types/project";
import { ExternalLink, Github, Calendar, Star } from "lucide-react";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="space-y-10"
    >
      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="rounded-xl"
          >
            <Card className="group overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300">
              <Link href={`/projects/${project.id}`} className="block">
                {/* Image + overlay */}
                {project.preview_image_url ? (
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={project.preview_image_url}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-90" />

                    {project.featured && (
                      <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-amber-500/95 px-3 py-1 text-xs font-semibold text-white">
                        <Star className="w-4 h-4" /> Featured
                      </div>
                    )}

                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="capitalize">
                        {project.type}
                      </Badge>
                    </div>

                    <div className="absolute bottom-3 left-4 text-xs text-white/90 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(project.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-40 w-full bg-slate-100" />
                )}

                <CardContent className="space-y-3 p-6">
                  <h3 className="text-lg font-semibold leading-tight group-hover:text-slate-900">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech_stack?.slice(0, 6).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-md bg-slate-900 text-white px-3 py-1 text-sm hover:opacity-90"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live
                        </a>
                      )}

                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm text-muted-foreground hover:bg-slate-50"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
