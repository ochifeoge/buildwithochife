"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function GetAllProject() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("projects").select();

  if (error) throw new Error();
  return data;
}
export async function CreateProjectAction(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const image = formData.get("image") as File;
  if (!image) throw new Error("Image required");

  const ext = image.name.split(".").pop();
  const path = `projects/${user.id}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("project-previews")
    .upload(path, image);

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("project-previews").getPublicUrl(path);

  const tech_stack = JSON.parse(formData.get("tech_stack") as string);

  const { error } = await supabase.from("projects").insert({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    type: formData.get("type"),
    featured: formData.get("featured") === "true",
    tech_stack,
    live_url: formData.get("live_url"),
    github_url: formData.get("github_url"),
    preview_image_url: publicUrl,
    preview_image_path: path,
    user_id: user.id,
  });

  if (error) throw error;

  revalidatePath("/projects");
  revalidatePath("/myprojects");
  revalidatePath("/account");
}

export async function UpdateProjectAction(
  projectId: string,
  formData: FormData
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Fetch current project
  const { data: project } = await supabase
    .from("projects")
    .select("preview_image_path")
    .eq("id", projectId)
    .single();

  if (!project) throw new Error("Project not found");

  const image = formData.get("image") as File | null;

  const updatePayload: {
    title: string;
    description: string;
    status: string;
    type: string;
    live_url: string;
    github_url: string;
    featured: boolean;
    tech_stack: string[];
    updated_at: string;
    preview_image_url?: string;
    preview_image_path?: string;
  } = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    status: formData.get("status") as string,
    type: formData.get("type") as string,
    live_url: (formData.get("live_url") as string) || "",
    github_url: (formData.get("github_url") as string) || "",
    featured: formData.get("featured") === "true",
    tech_stack: JSON.parse(formData.get("tech_stack") as string),
    updated_at: new Date().toISOString(),
  };

  if (image && image.size > 0) {
    const ext = image.name.split(".").pop();
    const newPath = `projects/${user.id}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("project-previews")
      .upload(newPath, image);

    if (uploadError) throw uploadError;

    // Delete old image
    if (project.preview_image_path) {
      await supabase.storage
        .from("project-previews")
        .remove([project.preview_image_path]);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("project-previews").getPublicUrl(newPath);

    updatePayload.preview_image_url = publicUrl;
    updatePayload.preview_image_path = newPath;
  }

  const { error } = await supabase
    .from("projects")
    .update(updatePayload)
    .eq("id", projectId);

  if (error) throw error;

  revalidatePath("/projects");
  revalidatePath("/myprojects");
}

export async function deleteProjectAction(projectId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  await supabase.from("projects").delete().eq("id", projectId);

  revalidatePath("/projects");
  revalidatePath("/myprojects");
  revalidatePath("/account");
}
