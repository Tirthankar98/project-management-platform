import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Plus, Search, CheckSquare, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

import { useTasks, useDeleteTask } from "../../hooks/useTasks";
import { useDebounce } from "../../hooks/useDebounce";
import { TASK_STATUS, TASK_PRIORITY } from "../../utils/constants";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import Spinner from "../../components/ui/Spinner";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import StatusBadge from "../../components/tasks/StatusBadge";
import PriorityBadge from "../../components/tasks/PriorityBadge";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";

export default function Tasks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [priority, setPriority] = useState(searchParams.get("priority") || "");
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState(null);

  const debouncedSearch = useDebounce(search, 400);
  const deleteTask = useDeleteTask();

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status, priority]);

  useEffect(() => {
    const params = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (status) params.status = status;
    if (priority) params.priority = priority;
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, status, priority]);

  const { data, isLoading, isFetching } = useTasks({
    search: debouncedSearch || undefined,
    status: status || undefined,
    priority: priority || undefined,
    page,
    limit: 10,
  });

  const handleDelete = async () => {
    try {
      await deleteTask.mutateAsync(toDelete._id);
      setToDelete(null);
    } catch {
      toast.error("Could not delete task");
    }
  };

  const tasks = data?.tasks || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Tasks" }]} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
            Tasks
          </h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            {data ? `${data.totalTasks} total tasks` : "Manage and track your work."}
          </p>
        </div>
        <Link to="/tasks/new">
          <Button icon={Plus}>New Task</Button>
        </Link>
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks by title or description..."
              className="input pl-9"
            />
          </div>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-48">
            <option value="">All statuses</option>
            {TASK_STATUS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
          <Select value={priority} onChange={(e) => setPriority(e.target.value)} className="sm:w-48">
            <option value="">All priorities</option>
            {TASK_PRIORITY.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </Select>
        </div>
      </Card>

      <Card className="p-0">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner size={26} />
          </div>
        ) : tasks.length ? (
          <>
            <div className="hidden grid-cols-12 gap-3 border-b border-ink-100 px-5 py-3 text-xs font-medium uppercase tracking-wide text-ink-400 dark:border-ink-800 md:grid">
              <span className="col-span-4">Task</span>
              <span className="col-span-2">Project</span>
              <span className="col-span-2">Assigned To</span>
              <span className="col-span-1">Priority</span>
              <span className="col-span-2">Status</span>
              <span className="col-span-1 text-right">Actions</span>
            </div>
            <div className={`divide-y divide-ink-100 dark:divide-ink-800 ${isFetching ? "opacity-60" : ""}`}>
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="grid grid-cols-1 items-center gap-3 px-5 py-4 transition hover:bg-ink-50 dark:hover:bg-ink-800/60 md:grid-cols-12"
                >
                  <Link to={`/tasks/${task._id}/edit`} className="col-span-4 min-w-0">
                    <p className="truncate text-sm font-medium text-ink-800 dark:text-ink-100">
                      {task.title}
                    </p>
                    {task.dueDate && (
                      <p className="mt-0.5 text-xs text-ink-400">
                        Due {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </Link>
                  <span className="col-span-2 truncate text-sm text-ink-500 dark:text-ink-400">
                    {task.project?.name || "—"}
                  </span>
                  <span className="col-span-2 truncate text-sm text-ink-500 dark:text-ink-400">
                    {task.assignedTo?.name || "Unassigned"}
                  </span>
                  <div className="col-span-1">
                    <PriorityBadge priority={task.priority} />
                  </div>
                  <div className="col-span-2">
                    <StatusBadge status={task.status} />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => setToDelete(task)}
                      className="rounded-lg p-1.5 text-ink-300 hover:bg-signal-red/10 hover:text-signal-red"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-ink-100 px-5 py-3.5 dark:border-ink-800">
              <p className="text-xs text-ink-400">
                Page {data.currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="px-3 py-1.5"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  icon={ChevronLeft}
                >
                  Prev
                </Button>
                <Button
                  variant="secondary"
                  className="px-3 py-1.5"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-6">
            <EmptyState
              icon={CheckSquare}
              title="No tasks found"
              description="Try adjusting your filters, or create a new task."
              action={
                <Link to="/tasks/new">
                  <Button icon={Plus}>New Task</Button>
                </Link>
              }
            />
          </div>
        )}
      </Card>

      <ConfirmDialog
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
        title="Delete task"
        description={`Are you sure you want to delete "${toDelete?.title}"? This cannot be undone.`}
        loading={deleteTask.isPending}
      />
    </div>
  );
}
