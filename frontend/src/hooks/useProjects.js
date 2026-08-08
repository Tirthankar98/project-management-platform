import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../services/projectService";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    select: (res) => res.projects,
  });
}

export function useProject(id) {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProject(id),
    select: (res) => res.project,
    enabled: Boolean(id),
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Project created");
    },
    onError: (err) => toast.error(err?.response?.data?.message || "Failed to create project"),
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateProject(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated");
    },
    onError: (err) => toast.error(err?.response?.data?.message || "Failed to update project"),
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Project deleted");
    },
    onError: (err) => toast.error(err?.response?.data?.message || "Failed to delete project"),
  });
}
