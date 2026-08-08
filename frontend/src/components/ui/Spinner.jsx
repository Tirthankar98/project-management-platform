import PropTypes from "prop-types";
import { Loader2 } from "lucide-react";

export default function Spinner({ size = 22, className = "" }) {
  return <Loader2 size={size} className={`animate-spin text-cobalt-500 ${className}`} />;
}

Spinner.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};
