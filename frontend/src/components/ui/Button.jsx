import PropTypes from "prop-types";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

const VARIANTS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  danger: "btn-danger",
};

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  type = "button",
  className,
  icon: Icon,
  onClick,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(VARIANTS[variant], className)}
      {...rest}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : Icon ? <Icon size={16} /> : null}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(["primary", "secondary", "ghost", "danger"]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  icon: PropTypes.elementType,
  onClick: PropTypes.func,
};
