import { forwardRef } from "react";
import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

const Input = forwardRef(({ label, error, className, id, ...rest }, ref) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="label">
          {label}
        </label>
      )}
      <input ref={ref} id={id} className={cn("input", error && "border-signal-red focus:ring-red-100", className)} {...rest} />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Input;
