"use client";

import { useTransition } from "react";
import { MoreVertical, Trash2, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { deleteProjectAction } from "./project.actions";
import { Badge } from "@/components/ui/badge";
import { ProjectDialog } from "./ProjectDialog";
import { Project } from "@/lib/types/project";

interface ProjectsTableProps {
  projects: Project[];
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Stack</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className="transition hover:bg-muted">
              <TableCell>
                <div className="font-medium">{project.title}</div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 flex-wrap">
                  {project.tech_stack.map((tech) => (
                    <Badge key={tech} variant={"outline"} className="p-2">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {project.updated_at}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground flex items-center gap-1 capitalize">
                {project.status}
                <span
                  className={`${
                    project.status === "draft" ? "bg-gray-500" : "bg-green-500"
                  } w-2 h-2 rounded-full`}
                ></span>
              </TableCell>
              <TableCell className="text-right">
                {}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-40">
                    <div className="flex flex-col gap-1">
                      <ProjectDialog mode="edit" defaultValues={project}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          size="sm"
                        >
                          <Pencil className="h-4 w-4 mr-2" /> Edit
                        </Button>
                      </ProjectDialog>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-destructive"
                        disabled={isPending}
                        onClick={() => {
                          const confirm = window.confirm(
                            "you are about to delete this project"
                          );
                          if (!confirm) return;
                          startTransition(() =>
                            deleteProjectAction(project.id)
                          );
                        }}
                      >
                        {isPending ? (
                          <span className="animate-spin mr-2">⏳</span>
                        ) : (
                          <Trash2 className="h-4 w-4 mr-2" />
                        )}
                        Delete
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
