import { Link } from "react-router-dom";
import {
  FolderKanban,
  CheckSquare,
  CheckCircle2,
  Clock,
  Loader,
  AlertTriangle,
  Plus,
  ArrowRight,
} from "lucide-react";

import { useDashboard } from "../../hooks/useDashboard";
import { useTasks } from "../../hooks/useTasks";
import StatCard from "../../components/dashboard/StatCard";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import StatusBadge from "../../components/tasks/StatusBadge";
import PriorityBadge from "../../components/tasks/PriorityBadge";
import EmptyState from "../../components/common/EmptyState";

export default function Dashboard() {
  const { data: stats, isLoading } = useDashboard();
  const { data: recentTasksRes, isLoading: tasksLoading } = useTasks({
    page: 1,
    limit: 6,
  });

  const cards = stats
    ? [
        { label: "Total Projects", value: stats.totalProjects, icon: FolderKanban, accent: "cobalt" },
        { label: "Total Tasks", value: stats.totalTasks, icon: CheckSquare, accent: "ink" },
        { label: "Completed", value: stats.completedTasks, icon: CheckCircle2, accent: "green" },
        { label: "In Progress", value: stats.inProgressTasks, icon: Loader, accent: "cobalt" },
        { label: "Pending", value: stats.pendingTasks, icon: Clock, accent: "amber" },
        { label: "Overdue", value: stats.overdueTasks, icon: AlertTriangle, accent: "red" },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            Here&apos;s what&apos;s happening across your workspace.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/projects/new">
            <Button variant="secondary" icon={Plus}>
              New Project
            </Button>
          </Link>
          <Link to="/tasks/new">
            <Button icon={Plus}>New Task</Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner size={26} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <StatCard key={c.label} {...c} />
          ))}
        </div>
      )}

      <Card className="p-0">
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4 dark:border-ink-800">
          <h2 className="font-display text-base font-semibold text-ink-900 dark:text-white">
            Recent Tasks
          </h2>
          <Link
            to="/tasks"
            className="flex items-center gap-1 text-sm font-medium text-cobalt-600 hover:underline"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {tasksLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size={22} />
          </div>
        ) : recentTasksRes?.tasks?.length ? (
          <div className="divide-y divide-ink-100 dark:divide-ink-800">
            {recentTasksRes.tasks.map((task) => (
              <Link
                key={task._id}
                to={`/tasks/${task._id}/edit`}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 transition hover:bg-ink-50 dark:hover:bg-ink-800/60"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink-800 dark:text-ink-100">
                    {task.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-ink-400">
                    {task.project?.name || "No project"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <PriorityBadge priority={task.priority} />
                  <StatusBadge status={task.status} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-6">
            <EmptyState
              icon={CheckSquare}
              title="No tasks yet"
              description="Create your first task to see it appear here."
              action={
                <Link to="/tasks/new">
                  <Button icon={Plus}>New Task</Button>
                </Link>
              }
            />
          </div>
        )}
      </Card>
    </div>
  );
}
