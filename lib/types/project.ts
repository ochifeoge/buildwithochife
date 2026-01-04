import { ProjectFormValues } from "../validators/project";

export interface Project extends ProjectFormValues {
  id: string;
  created_at: string;
  updated_at: string;
}
