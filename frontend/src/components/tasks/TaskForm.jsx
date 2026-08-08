import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PropTypes from "prop-types";
import { Save } from "lucide-react";

import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { TASK_STATUS, TASK_PRIORITY } from "../../utils/constants";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(TASK_STATUS),
  priority: z.enum(TASK_PRIORITY),
  dueDate: z.string().optional(),
  project: z.string().min(1, "Please select a project"),
  assignedTo: z.string().optional(),
});

export default function TaskForm({ defaultValues, projects, onSubmit, submitLabel, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      dueDate: "",
      project: "",
      assignedTo: "",
      ...defaultValues,
    },
  });

  const submit = async (values) => {
    const payload = { ...values };
    if (!payload.assignedTo) delete payload.assignedTo;
    if (!payload.dueDate) delete payload.dueDate;
    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <Input
        id="title"
        label="Task title"
        placeholder="Design the new landing page"
        error={errors.title?.message}
        {...register("title")}
      />
      <Textarea
        id="description"
        label="Description"
        placeholder="Add more context for this task..."
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select id="status" label="Status" error={errors.status?.message} {...register("status")}>
          {TASK_STATUS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
        <Select id="priority" label="Priority" error={errors.priority?.message} {...register("priority")}>
          {TASK_PRIORITY.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select id="project" label="Project" error={errors.project?.message} {...register("project")}>
          <option value="" disabled>
            Select a project
          </option>
          {projects?.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </Select>
        <Input id="dueDate" label="Due date" type="date" error={errors.dueDate?.message} {...register("dueDate")} />
      </div>

      <Input
        id="assignedTo"
        label="Assigned to (User ID, optional)"
        placeholder="Paste a user ID to assign this task"
        error={errors.assignedTo?.message}
        {...register("assignedTo")}
      />

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={isSubmitting} icon={Save}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

TaskForm.propTypes = {
  defaultValues: PropTypes.object,
  projects: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
};
