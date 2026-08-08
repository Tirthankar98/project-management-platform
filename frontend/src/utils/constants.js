export const TASK_STATUS = ["Pending", "In Progress", "Completed"];
export const TASK_PRIORITY = ["Low", "Medium", "High"];

export const STATUS_STYLES = {
  Pending: "bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300",
  "In Progress": "bg-cobalt-50 text-cobalt-600 dark:bg-cobalt-900/40 dark:text-cobalt-300",
  Completed: "bg-signal-green/10 text-signal-green",
};

export const PRIORITY_STYLES = {
  Low: "bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-300",
  Medium: "bg-amber-400/15 text-amber-500",
  High: "bg-signal-red/10 text-signal-red",
};

export const TOKEN_KEY = "flow_token";
export const USER_KEY = "flow_user";
