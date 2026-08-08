import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../services/taskService";

export function useTasks(params) {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: () => getTasks(params),
    placeholderData: (prev) => prev,
  });
}

export function useTask(id) {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTask(id),
    select: (res) => res.task,
    enabled: Boolean(id),
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Task created successfully");
    },
    onError: (err) => toast.error(err?.response?.data?.message || "Failed to create task"),
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateTask(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Task updated successfully");
    },
    onError: (err) => toast.error(err?.response?.data?.message || "Failed to update task"),
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Task deleted successfully");
    },
    onError: (err) => toast.error(err?.response?.data?.message || "Failed to delete task"),
  });
}
