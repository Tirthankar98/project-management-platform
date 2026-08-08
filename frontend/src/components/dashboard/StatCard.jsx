import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

export default function StatCard({ label, value, icon: Icon, accent = "cobalt" }) {
  const accents = {
    cobalt: "bg-cobalt-50 text-cobalt-600 dark:bg-cobalt-900/40 dark:text-cobalt-300",
    green: "bg-signal-green/10 text-signal-green",
    amber: "bg-amber-400/15 text-amber-500",
    red: "bg-signal-red/10 text-signal-red",
    ink: "bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300",
  };

  const rail = {
    cobalt: "bg-cobalt-500",
    green: "bg-signal-green",
    amber: "bg-amber-400",
    red: "bg-signal-red",
    ink: "bg-ink-400",
  };

  return (
    <div className="card relative overflow-hidden p-5">
      <span className={cn("absolute left-0 top-0 h-full w-1", rail[accent])} />
      <div className="flex items-start justify-between pl-2">
        <div>
          <p className="text-xs font-medium text-ink-500 dark:text-ink-400">{label}</p>
          <p className="mt-2 font-display text-3xl font-semibold text-ink-900 dark:text-white">
            {value}
          </p>
        </div>
        {Icon && (
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", accents[accent])}>
            <Icon size={19} />
          </div>
        )}
      </div>
    </div>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType,
  accent: PropTypes.oneOf(["cobalt", "green", "amber", "red", "ink"]),
};
