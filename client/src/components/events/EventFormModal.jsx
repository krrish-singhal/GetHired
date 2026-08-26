import { useState } from "react";
import { FiX } from "react-icons/fi";
import { createEvent, updateEvent } from "../../services/api";
import { TYPE_LABELS, EMPTY_FORM } from "../../data/eventConstants";

export default function EventFormModal({ initial, onClose, onSaved }) {
  const [form, setForm] = useState(
    initial
      ? {
          ...initial,
          tags: Array.isArray(initial.tags)
            ? initial.tags.join(", ")
            : initial.tags,
        }
      : EMPTY_FORM,
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErr("");
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      if (initial?._id) {
        await updateEvent(initial._id, payload);
      } else {
        await createEvent(payload);
      }
      onSaved();
    } catch (ex) {
      setErr(ex.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none focus:border-yellow-400";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-800 dark:text-white text-lg">
            {initial ? "Edit Event" : "Add New Event"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <FiX size={20} />
          </button>
        </div>

        <form
          onSubmit={submit}
          className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {err && (
            <p className="col-span-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
              {err}
            </p>
          )}

          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Title *
            </label>
            <input
              required
              className={inputCls}
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Event title"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Type *
            </label>
            <select
              required
              className={inputCls}
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
            >
              {Object.entries(TYPE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Mode
            </label>
            <select
              className={inputCls}
              value={form.mode}
              onChange={(e) => set("mode", e.target.value)}
            >
              {["Offline", "Online", "Hybrid"].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Organizer *
            </label>
            <input
              required
              className={inputCls}
              value={form.organizer}
              onChange={(e) => set("organizer", e.target.value)}
              placeholder="Organizer name"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Date *
            </label>
            <input
              required
              type="date"
              className={inputCls}
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Time
            </label>
            <input
              className={inputCls}
              value={form.time}
              onChange={(e) => set("time", e.target.value)}
              placeholder="9:00 AM"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Duration
            </label>
            <input
              className={inputCls}
              value={form.duration}
              onChange={(e) => set("duration", e.target.value)}
              placeholder="36 hours"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Deadline
            </label>
            <input
              type="date"
              className={inputCls}
              value={form.deadline}
              onChange={(e) => set("deadline", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Venue
            </label>
            <input
              className={inputCls}
              value={form.venue}
              onChange={(e) => set("venue", e.target.value)}
              placeholder="Main Auditorium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Prize
            </label>
            <input
              className={inputCls}
              value={form.prize}
              onChange={(e) => set("prize", e.target.value)}
              placeholder="₹1,00,000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Registration Link
            </label>
            <input
              className={inputCls}
              value={form.registrationLink}
              onChange={(e) => set("registrationLink", e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Image URL
            </label>
            <input
              className={inputCls}
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Tags <span className="font-normal">(comma separated)</span>
            </label>
            <input
              className={inputCls}
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
              placeholder="AI/ML, Web Dev, Open Source"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              className={inputCls + " resize-none"}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Brief description..."
            />
          </div>

          <div className="col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-semibold text-sm disabled:opacity-60"
            >
              {saving ? "Saving…" : initial ? "Save Changes" : "Add Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
