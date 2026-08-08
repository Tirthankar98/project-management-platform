import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { FolderPlus } from "lucide-react";

import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { useCreateProject } from "../../hooks/useProjects";
import { useWorkspaces } from "../../hooks/useWorkspaces";

const schema = z.object({
  name: z.string().min(2, "Project name is required"),
  description: z.string().optional(),
  workspace: z.string().min(1, "Please select a workspace"),
});

export default function CreateProject() {
  const navigate = useNavigate();
  const createProject = useCreateProject();
  const { data: workspaces, isLoading: workspacesLoading } = useWorkspaces();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      const res = await createProject.mutateAsync(values);
      navigate(`/projects/${res.project._id}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create project");
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Breadcrumbs items={[{ label: "Projects", to: "/projects" }, { label: "New" }]} />

      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
          New Project
        </h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
          Group related tasks together under a project.
        </p>
      </div>

      <Card>
        {!workspacesLoading && workspaces?.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-ink-500 dark:text-ink-400">
              You need a workspace before creating a project.
            </p>
            <Link to="/workspaces" className="mt-3 inline-block">
              <Button variant="secondary">Create a workspace</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="name"
              label="Project name"
              placeholder="Website Redesign"
              error={errors.name?.message}
              {...register("name")}
            />
            <Textarea
              id="description"
              label="Description"
              placeholder="What is this project about?"
              error={errors.description?.message}
              {...register("description")}
            />
            <Select
              id="workspace"
              label="Workspace"
              error={errors.workspace?.message}
              defaultValue=""
              {...register("workspace")}
            >
              <option value="" disabled>
                {workspacesLoading ? "Loading workspaces..." : "Select a workspace"}
              </option>
              {workspaces?.map((ws) => (
                <option key={ws._id} value={ws._id}>
                  {ws.name}
                </option>
              ))}
            </Select>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" loading={isSubmitting} icon={FolderPlus}>
                Create Project
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
