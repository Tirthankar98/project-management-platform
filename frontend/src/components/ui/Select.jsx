import { forwardRef } from "react";
import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

const Select = forwardRef(({ label, error, className, id, children, ...rest }, ref) => (
  <div>
    {label && (
      <label htmlFor={id} className="label">
        {label}
      </label>
    )}
    <div className="relative">
      <select
        ref={ref}
        id={id}
        className={cn("input appearance-none pr-9 cursor-pointer", error && "border-signal-red", className)}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400" />
    </div>
    {error && <p className="field-error">{error}</p>}
  </div>
));

Select.displayName = "Select";

Select.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.node,
};

export default Select;
