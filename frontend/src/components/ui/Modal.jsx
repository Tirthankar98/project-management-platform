import { useEffect } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, title, children, size = "md" }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${sizes[size]} card p-0 overflow-hidden animate-fadeIn`}
      >
        <div className="flex items-center justify-between border-b border-ink-100 dark:border-ink-800 px-6 py-4">
          <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 hover:text-ink-700"
          >
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto scrollbar-thin px-6 py-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};
