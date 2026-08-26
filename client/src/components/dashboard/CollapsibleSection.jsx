import { useState } from "react";

export default function CollapsibleSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 mb-2"
      >
        {title}
        <span className="text-gray-400 text-xs">{open ? "▲" : "▼"}</span>
      </button>
      {open && children}
    </div>
  );
}
