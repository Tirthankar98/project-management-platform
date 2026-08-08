import PropTypes from "prop-types";
import { ArrowUp, ArrowRight, ArrowDown } from "lucide-react";
import Badge from "../ui/Badge";
import { PRIORITY_STYLES } from "../../utils/constants";

const ICONS = { High: ArrowUp, Medium: ArrowRight, Low: ArrowDown };

export default function PriorityBadge({ priority }) {
  const Icon = ICONS[priority] || ArrowRight;
  return (
    <Badge className={PRIORITY_STYLES[priority] || PRIORITY_STYLES.Medium}>
      <Icon size={12} />
      {priority}
    </Badge>
  );
}

PriorityBadge.propTypes = {
  priority: PropTypes.string.isRequired,
};
