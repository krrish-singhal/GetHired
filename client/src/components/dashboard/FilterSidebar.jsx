import CollapsibleSection from "./CollapsibleSection";

export default function FilterSidebar({ filters, options, onChange }) {
  const toggle = (key, val) => {
    const cur = filters[key] || [];
    const next = cur.includes(val)
      ? cur.filter((v) => v !== val)
      : [...cur, val];
    onChange({ ...filters, [key]: next });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 sticky top-20">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-gray-800 dark:text-white">Filters</h3>
        <button
          onClick={() =>
            onChange({
              years: [],
              branches: [],
              companies: [],
              minPkg: "",
              maxPkg: "",
              search: "",
            })
          }
          className="text-xs text-yellow-600 hover:underline"
        >
          Clear All
        </button>
      </div>

      <CollapsibleSection title="Year">
        {options.years.map((y) => (
          <label
            key={y}
            className="flex items-center gap-2 mb-1.5 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={(filters.years || []).includes(y)}
              onChange={() => toggle("years", y)}
              className="rounded accent-blue-600"
            />
            <span className="text-sm text-gray-600">{y}</span>
          </label>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="Branch">
        {options.branches.map((b) => (
          <label
            key={b}
            className="flex items-center gap-2 mb-1.5 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={(filters.branches || []).includes(b)}
              onChange={() => toggle("branches", b)}
              className="rounded accent-blue-600"
            />
            <span className="text-sm text-gray-600">{b}</span>
          </label>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="Package Range">
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPkg || ""}
            onChange={(e) => onChange({ ...filters, maxPkg: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <span className="text-gray-400 dark:text-gray-500 text-sm">—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPkg || ""}
            onChange={(e) => onChange({ ...filters, maxPkg: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">in LPA</p>
      </CollapsibleSection>

      <CollapsibleSection title="Search Company">
        <input
          type="text"
          placeholder="e.g. Google, TCS…"
          value={filters.company || ""}
          onChange={(e) => onChange({ ...filters, company: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
      </CollapsibleSection>

      <CollapsibleSection title="Search Role">
        <input
          type="text"
          placeholder="e.g. Software Engineer…"
          value={filters.role || ""}
          onChange={(e) => onChange({ ...filters, role: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
      </CollapsibleSection>
    </div>
  );
}
