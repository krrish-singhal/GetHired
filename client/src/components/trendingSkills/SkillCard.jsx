import { DIFFICULTY_COLORS, TAG_COLORS } from "../../data/trendingSkillsData";

export default function SkillCard({ skill, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-5 cursor-pointer hover:shadow-md hover:border-yellow-400 transition-all duration-200"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 dark:text-white text-base truncate">
            {skill.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {skill.category}
          </p>
        </div>
        <div className="flex items-center gap-1 ml-2">
          {skill.trend === "up" && (
            <span className="text-green-500 text-xs font-bold">▲</span>
          )}
          {skill.trend === "stable" && (
            <span className="text-gray-400 text-xs font-bold">→</span>
          )}
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${DIFFICULTY_COLORS[skill.difficulty]}`}
          >
            {skill.difficulty}
          </span>
        </div>
      </div>

      {/* Demand bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
          <span className="font-medium">Demand</span>
          <span className="font-bold text-gray-900 dark:text-white">
            {skill.demand}%
          </span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
          <div
            className="bg-yellow-400 h-2 rounded-full transition-all duration-700"
            style={{ width: `${skill.demand}%` }}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skill.tags.map((tag, i) => (
          <span
            key={tag}
            className={`text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full font-semibold ${TAG_COLORS[i % TAG_COLORS.length]}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom info */}
      <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span className="font-medium flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {skill.timeToLearn}
        </span>
        <span className="font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-lg border border-gray-100 dark:border-gray-700">
          {skill.avgPackage}
        </span>
      </div>
    </div>
  );
}
