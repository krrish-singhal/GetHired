import { useState } from "react";
import { deleteEvent } from "../../services/api";

export default function DeleteConfirm({ event, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);

  const handle = async () => {
    setDeleting(true);
    try {
      await deleteEvent(event._id);
      onDeleted(event._id);
    } catch {
      setDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-2">
          Delete Event?
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Are you sure you want to delete{" "}
          <strong className="text-gray-700 dark:text-gray-200">
            "{event.title}"
          </strong>
          ? This cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handle}
            disabled={deleting}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-sm disabled:opacity-60"
          >
            {deleting ? "Deleting…" : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
