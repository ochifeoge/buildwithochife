// app/account/projects/ProjectCard.tsx
import { getUserProjects } from "@/lib/supabase/projects-server";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export async function ProjectCard() {
  const projects = await getUserProjects();

  return (
    <div className="flex flex-col gap-4">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <h3 className="text-lg font-bold">{project.title}</h3>
            <p className="text-sm">{project.type}</p>
          </CardHeader>
          <CardContent>
            <p>{project.description}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Tech: {project.tech_stack.join(", ")}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>Edit</Button>
            <Button variant="destructive">Delete</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
