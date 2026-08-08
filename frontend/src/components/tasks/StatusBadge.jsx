import PropTypes from "prop-types";
import Badge from "../ui/Badge";
import { STATUS_STYLES } from "../../utils/constants";

export default function StatusBadge({ status }) {
  return (
    <Badge className={STATUS_STYLES[status] || STATUS_STYLES.Pending}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </Badge>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};
