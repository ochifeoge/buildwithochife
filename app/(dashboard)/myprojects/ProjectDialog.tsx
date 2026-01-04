"use client";
import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import ProjectForm from "./ProjectForm";
import type { ProjectFormValues } from "@/lib/validators/project";

interface ProjectDialogProps {
  children: ReactNode;
  mode: "create" | "edit";
  defaultValues?: Partial<ProjectFormValues> & { id: string };
}

export function ProjectDialog({
  children,
  mode,
  defaultValues,
}: ProjectDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-lvh overflow-scroll">
        <DialogTitle>
          {mode === "create" ? "Create Project" : "Edit Project"}
        </DialogTitle>
        {/* ProjectForm goes here */}
        <ProjectForm mode={mode} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  );
}
