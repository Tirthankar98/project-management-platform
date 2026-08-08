import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, CheckSquare } from "lucide-react";
import toast from "react-hot-toast";

import { useProject, useUpdateProject, useDeleteProject } from "../../hooks/useProjects";
import { useTasks } from "../../hooks/useTasks";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Spinner from "../../components/ui/Spinner";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import StatusBadge from "../../components/tasks/StatusBadge";
import PriorityBadge from "../../components/tasks/PriorityBadge";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: project, isLoading } = useProject(id);
  const { data: tasksRes, isLoading: tasksLoading } = useTasks({ project: id, limit: 50 });
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });

  const startEdit = () => {
    setForm({ name: project.name, description: project.description || "" });
    setEditing(true);
  };

  const saveEdit = async () => {
    try {
      await updateProject.mutateAsync({ id, payload: form });
      setEditing(false);
    } catch {
      toast.error("Could not update project");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProject.mutateAsync(id);
      navigate("/projects");
    } catch {
      toast.error("Could not delete project");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size={26} />
      </div>
    );
  }

  if (!project) {
    return (
      <EmptyState icon={CheckSquare} title="Project not found" description="It may have been deleted." />
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[{ label: "Projects", to: "/projects" }, { label: project.name }]}
      />

      <Card>
        {editing ? (
          <div className="space-y-4">
            <Input
              label="Project name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            <Textarea
              label="Description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button onClick={saveEdit} loading={updateProject.isPending}>
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
                {project.name}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-ink-500 dark:text-ink-400">
                {project.description || "No description provided."}
              </p>
              <p className="mt-3 text-xs text-ink-400">
                Workspace: {project.workspace?.name || "—"} · Owner: {project.owner?.name || "—"}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="secondary" icon={Pencil} onClick={startEdit}>
                Edit
              </Button>
              <Button variant="danger" icon={Trash2} onClick={() => setConfirmDelete(true)}>
                Delete
              </Button>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-0">
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4 dark:border-ink-800">
          <h2 className="font-display text-base font-semibold text-ink-900 dark:text-white">
            Tasks in this project
          </h2>
          <Link to="/tasks/new">
            <Button variant="secondary" icon={Plus}>
              New Task
            </Button>
          </Link>
        </div>

        {tasksLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size={22} />
          </div>
        ) : tasksRes?.tasks?.length ? (
          <div className="divide-y divide-ink-100 dark:divide-ink-800">
            {tasksRes.tasks.map((task) => (
              <Link
                key={task._id}
                to={`/tasks/${task._id}/edit`}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 transition hover:bg-ink-50 dark:hover:bg-ink-800/60"
              >
                <p className="truncate text-sm font-medium text-ink-800 dark:text-ink-100">
                  {task.title}
                </p>
                <div className="flex shrink-0 items-center gap-2">
                  <PriorityBadge priority={task.priority} />
                  <StatusBadge status={task.status} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-6">
            <EmptyState icon={CheckSquare} title="No tasks yet" description="Add the first task for this project." />
          </div>
        )}
      </Card>

      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
        title="Delete project"
        description={`Are you sure you want to delete "${project.name}"? This cannot be undone.`}
        loading={deleteProject.isPending}
      />
    </div>
  );
}
