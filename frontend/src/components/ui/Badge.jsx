import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

export default function Badge({ children, className }) {
  return <span className={cn("badge", className)}>{children}</span>;
}

Badge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
