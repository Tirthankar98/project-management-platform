import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../../components/ui/Card";
import Spinner from "../../components/ui/Spinner";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import TaskForm from "../../components/tasks/TaskForm";
import EmptyState from "../../components/common/EmptyState";
import { useTask, useUpdateTask } from "../../hooks/useTasks";
import { useProjects } from "../../hooks/useProjects";
import { CheckSquare } from "lucide-react";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: task, isLoading } = useTask(id);
  const { data: projects } = useProjects();
  const updateTask = useUpdateTask();

  const handleSubmit = async (payload) => {
    try {
      await updateTask.mutateAsync({ id, payload });
      navigate("/tasks");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update task");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size={26} />
      </div>
    );
  }

  if (!task) {
    return <EmptyState icon={CheckSquare} title="Task not found" description="It may have been deleted." />;
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Breadcrumbs items={[{ label: "Tasks", to: "/tasks" }, { label: "Edit" }]} />

      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
          Edit Task
        </h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Update task details below.</p>
      </div>

      <Card>
        <TaskForm
          defaultValues={{
            title: task.title,
            description: task.description || "",
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
            project: task.project?._id || "",
            assignedTo: task.assignedTo?._id || "",
          }}
          projects={projects}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          onCancel={() => navigate(-1)}
        />
      </Card>
    </div>
  );
}
