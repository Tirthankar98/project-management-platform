import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createWorkspace,
  deleteWorkspace,
  getWorkspaces,
  updateWorkspace,
} from "../services/workspaceService";

export function useWorkspaces() {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
    select: (res) => res.workspaces,
  });
}

export function useCreateWorkspace() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createWorkspace,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workspaces"] });
      toast.success("Workspace created");
    },
    onError: (err) => toast.error(err?.response?.data?.message || "Failed to create workspace"),
  });
}

export function useUpdateWorkspace() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateWorkspace(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workspaces"] });
      toast.success("Workspace updated");
    },
    onError: (err) => toast.error(err?.response?.data?.message || "Failed to update workspace"),
  });
}

export function useDeleteWorkspace() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteWorkspace,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workspaces"] });
      toast.success("Workspace deleted");
    },
    onError: (err) => toast.error(err?.response?.data?.message || "Failed to delete workspace"),
  });
}
