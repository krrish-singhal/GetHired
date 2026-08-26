import { CATEGORIES } from "../../data/trendingSkillsData";

export default function SkillFilters({
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeCategory === c
                  ? "bg-yellow-400 text-gray-900 border border-transparent"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-medium border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-shadow"
          >
            <option value="demand">By Demand</option>
            <option value="difficulty">By Difficulty</option>
            <option value="name">By Name</option>
          </select>
        </div>
      </div>
    </div>
  );
}
