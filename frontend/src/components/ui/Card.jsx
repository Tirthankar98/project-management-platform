import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

export default function Card({ children, className, ...rest }) {
  return (
    <div className={cn("card p-5", className)} {...rest}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
