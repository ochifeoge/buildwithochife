import { Suspense } from "react";

import { ProjectsTableSkeleton } from "./project-skeleton";
import ProjectsTable from "./ProjectTable";
import { getUserProjects } from "@/lib/supabase/projects-server";
import { Button } from "@/components/ui/button";
import { ProjectDialog } from "./ProjectDialog";

export default async function ProjectsPage() {
  const projects = await getUserProjects();
  return (
    <div className="flex  flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-muted-foreground text-sm">
            Manage and showcase your work
          </p>
        </div>
      </div>

      <div className="fixed bottom-3 right-4">
        <ProjectDialog mode="create">
          <Button>Create New Project</Button>
        </ProjectDialog>
      </div>

      {/* Table */}
      <Suspense fallback={<ProjectsTableSkeleton />}>
        <ProjectsTable projects={projects} />
      </Suspense>
    </div>
  );
}
