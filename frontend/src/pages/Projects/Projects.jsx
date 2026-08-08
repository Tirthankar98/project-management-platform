import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, FolderKanban, Trash2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import { useProjects, useDeleteProject } from "../../hooks/useProjects";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Breadcrumbs from "../../components/layout/Breadcrumbs";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const deleteProject = useDeleteProject();
  const [toDelete, setToDelete] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteProject.mutateAsync(toDelete._id);
      setToDelete(null);
    } catch {
      toast.error("Could not delete project");
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Projects" }]} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
            Projects
          </h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            All projects across your workspaces.
          </p>
        </div>
        <Link to="/projects/new">
          <Button icon={Plus}>New Project</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner size={26} />
        </div>
      ) : projects?.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project._id} className="group flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cobalt-50 text-cobalt-600 dark:bg-cobalt-900/40 dark:text-cobalt-300">
                    <FolderKanban size={18} />
                  </div>
                  <button
                    onClick={() => setToDelete(project)}
                    className="rounded-lg p-1.5 text-ink-300 opacity-0 transition hover:bg-signal-red/10 hover:text-signal-red group-hover:opacity-100"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <h3 className="mt-3 truncate font-display text-base font-semibold text-ink-900 dark:text-white">
                  {project.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-ink-500 dark:text-ink-400">
                  {project.description || "No description provided."}
                </p>
                <p className="mt-3 text-xs text-ink-400">
                  Workspace: {project.workspace?.name || "—"}
                </p>
              </div>
              <Link
                to={`/projects/${project._id}`}
                className="mt-4 flex items-center gap-1 text-sm font-medium text-cobalt-600 hover:underline"
              >
                View details <ArrowRight size={14} />
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="Create your first project to start organizing tasks."
          action={
            <Link to="/projects/new">
              <Button icon={Plus}>New Project</Button>
            </Link>
          }
        />
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
        title="Delete project"
        description={`Are you sure you want to delete "${toDelete?.name}"? This cannot be undone.`}
        loading={deleteProject.isPending}
      />
    </div>
  );
}
