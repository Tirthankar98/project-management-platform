import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="mb-1 flex items-center gap-1.5 text-sm text-ink-400">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={13} />}
          {item.to ? (
            <Link to={item.to} className="hover:text-cobalt-600">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink-700 dark:text-ink-200 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string,
    })
  ).isRequired,
};
