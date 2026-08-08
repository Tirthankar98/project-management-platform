import PropTypes from "prop-types";

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 dark:border-ink-700 px-6 py-16 text-center">
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cobalt-50 dark:bg-cobalt-900/30 text-cobalt-500">
          <Icon size={22} />
        </div>
      )}
      <h3 className="font-display text-base font-semibold text-ink-800 dark:text-ink-100">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-ink-500 dark:text-ink-400">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

EmptyState.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  action: PropTypes.node,
};
