import { forwardRef } from "react";
import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

const Textarea = forwardRef(({ label, error, className, id, rows = 4, ...rest }, ref) => (
  <div>
    {label && (
      <label htmlFor={id} className="label">
        {label}
      </label>
    )}
    <textarea
      ref={ref}
      id={id}
      rows={rows}
      className={cn("input resize-none", error && "border-signal-red focus:ring-red-100", className)}
      {...rest}
    />
    {error && <p className="field-error">{error}</p>}
  </div>
));

Textarea.displayName = "Textarea";

Textarea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  rows: PropTypes.number,
};

export default Textarea;
