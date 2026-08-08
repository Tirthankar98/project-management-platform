import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../../components/ui/Card";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import TaskForm from "../../components/tasks/TaskForm";
import { useCreateTask } from "../../hooks/useTasks";
import { useProjects } from "../../hooks/useProjects";

export default function CreateTask() {
  const navigate = useNavigate();
  const createTask = useCreateTask();
  const { data: projects } = useProjects();

  const handleSubmit = async (payload) => {
    try {
      await createTask.mutateAsync(payload);
      navigate("/tasks");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Breadcrumbs items={[{ label: "Tasks", to: "/tasks" }, { label: "New" }]} />

      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
          New Task
        </h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
          Add a task and assign it to a project.
        </p>
      </div>

      <Card>
        <TaskForm
          projects={projects}
          onSubmit={handleSubmit}
          submitLabel="Create Task"
          onCancel={() => navigate(-1)}
        />
      </Card>
    </div>
  );
}
