import PropTypes from "prop-types";
import { AlertTriangle } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function ConfirmDialog({ open, onClose, onConfirm, title, description, loading }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-signal-red/10 text-signal-red">
          <AlertTriangle size={18} />
        </div>
        <p className="text-sm text-ink-600 dark:text-ink-300 pt-1.5">{description}</p>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  loading: PropTypes.bool,
};
