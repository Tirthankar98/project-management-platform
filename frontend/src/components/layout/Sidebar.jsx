import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { LayoutGrid, FolderKanban, CheckSquare, Users, X, Waves } from "lucide-react";
import { cn } from "../../utils/cn";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/workspaces", label: "Workspaces", icon: Users },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-ink-900/40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-ink-100 bg-white transition-transform dark:border-ink-800 dark:bg-ink-900 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cobalt-500 text-white">
              <Waves size={17} />
            </div>
            <span className="font-display text-lg font-semibold text-ink-900 dark:text-white">Flow</span>
          </div>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-700 lg:hidden">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-cobalt-50 text-cobalt-600 dark:bg-cobalt-900/40 dark:text-cobalt-300"
                    : "text-ink-500 hover:bg-ink-50 hover:text-ink-800 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-ink-100"
                )
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-ink-100 dark:border-ink-800 px-5 py-4">
          <p className="text-xs text-ink-400">Flow v1.0 — Project Management</p>
        </div>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};
