import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Plus, Users, Trash2 } from "lucide-react";

import {
  useWorkspaces,
  useCreateWorkspace,
  useDeleteWorkspace,
} from "../../hooks/useWorkspaces";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Modal from "../../components/ui/Modal";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Breadcrumbs from "../../components/layout/Breadcrumbs";

const schema = z.object({
  name: z.string().min(2, "Workspace name is required"),
  description: z.string().optional(),
});

export default function Workspaces() {
  const { data: workspaces, isLoading } = useWorkspaces();
  const createWorkspace = useCreateWorkspace();
  const deleteWorkspace = useDeleteWorkspace();
  const [modalOpen, setModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      await createWorkspace.mutateAsync(values);
      reset();
      setModalOpen(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create workspace");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteWorkspace.mutateAsync(toDelete._id);
      setToDelete(null);
    } catch {
      toast.error("Could not delete workspace");
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Workspaces" }]} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
            Workspaces
          </h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            Workspaces group your projects together.
          </p>
        </div>
        <Button icon={Plus} onClick={() => setModalOpen(true)}>
          New Workspace
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner size={26} />
        </div>
      ) : workspaces?.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workspaces.map((ws) => (
            <Card key={ws._id} className="group">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cobalt-50 text-cobalt-600 dark:bg-cobalt-900/40 dark:text-cobalt-300">
                  <Users size={18} />
                </div>
                <button
                  onClick={() => setToDelete(ws)}
                  className="rounded-lg p-1.5 text-ink-300 opacity-0 transition hover:bg-signal-red/10 hover:text-signal-red group-hover:opacity-100"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <h3 className="mt-3 truncate font-display text-base font-semibold text-ink-900 dark:text-white">
                {ws.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-ink-500 dark:text-ink-400">
                {ws.description || "No description provided."}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="No workspaces yet"
          description="Create a workspace to start organizing projects."
          action={
            <Button icon={Plus} onClick={() => setModalOpen(true)}>
              New Workspace
            </Button>
          }
        />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Workspace" size="sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            id="ws-name"
            label="Workspace name"
            placeholder="Marketing Team"
            error={errors.name?.message}
            {...register("name")}
          />
          <Textarea
            id="ws-description"
            label="Description"
            placeholder="What is this workspace for?"
            error={errors.description?.message}
            {...register("description")}
          />
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Create Workspace
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
        title="Delete workspace"
        description={`Are you sure you want to delete "${toDelete?.name}"? This cannot be undone.`}
        loading={deleteWorkspace.isPending}
      />
    </div>
  );
}
