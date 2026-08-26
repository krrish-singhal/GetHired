import { TOP_SKILLS_BANNER } from "../../data/trendingSkillsData";

export default function TopSkillsBanner() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {TOP_SKILLS_BANNER.map((b) => (
        <div key={b.skill} className={`rounded-2xl border p-4 ${b.color}`}>
          <p className="text-2xl mb-1">{b.rank}</p>
          <p className="font-bold text-gray-900 dark:text-white">{b.skill}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {b.note}
          </p>
        </div>
      ))}
    </div>
  );
}
