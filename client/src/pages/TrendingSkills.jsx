// client/src/pages/TrendingSkills.jsx
import { useState } from "react";
import { SKILLS } from "../data/trendingSkillsData";
import TopSkillsBanner from "../components/trendingSkills/TopSkillsBanner";
import SkillFilters from "../components/trendingSkills/SkillFilters";
import SkillCard from "../components/trendingSkills/SkillCard";
import SkillDetailModal from "../components/trendingSkills/SkillDetailModal";

export default function TrendingSkills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("demand");
  const [selected, setSelected] = useState(null);

  const filtered = SKILLS.filter(
    (s) => activeCategory === "All" || s.category === activeCategory,
  ).sort((a, b) => {
    if (sortBy === "demand") return b.demand - a.demand;
    if (sortBy === "difficulty") {
      const order = { Easy: 0, Medium: 1, Hard: 2 };
      return order[a.difficulty] - order[b.difficulty];
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Trending Skills
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
            What top companies are hiring for — and what you should learn right
            now
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Top 3 Quick Banner */}
        <TopSkillsBanner />

        {/* Filters */}
        <SkillFilters
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onClick={() => setSelected(skill)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium text-gray-500 dark:text-gray-400">
              No skills found in this category
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <SkillDetailModal selected={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
