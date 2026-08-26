import { formatPkg } from "../../utils/formatPkg";

export default function TopPerformers({ performers }) {
  const getRankStyle = (i) => {
    if (i === 0) return { bg: "#FEF9C3", color: "#A16207", decoration: "#FDE68A" };
    if (i === 1) return { bg: "#F1F5F9", color: "#475569", decoration: "#CBD5E1" };
    if (i === 2) return { bg: "#FFF7ED", color: "#C2410C", decoration: "#FED7AA" };
    return { bg: "#F8FAFC", color: "#94A3B8", decoration: "#E2E8F0" };
  };

  return (
    <div className="w-full p-5">
      <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <span>🏆</span> Top Performers
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {performers.map((p, i) => {
          const rank = getRankStyle(i);
          const initials = p.studentName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <div
              key={p._id || i}
              className="relative flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/50 overflow-hidden shadow-sm"
            >
              <div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-30"
                style={{ background: rank.decoration }}
              />
              <div
                className="absolute -bottom-3 -right-8 w-20 h-20 rounded-full opacity-20"
                style={{ background: rank.decoration }}
              />
              <div
                className="absolute top-1/2 -right-2 w-8 h-8 rounded-full opacity-20"
                style={{ background: rank.decoration }}
              />

              <div className="relative z-10 w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-sm font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                {initials}
              </div>

              <div className="relative z-10 flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span
                    className="text-xs font-bold px-1.5 py-0.5 rounded-full shrink-0"
                    style={{ background: rank.bg, color: rank.color }}
                  >
                    #{i + 1}
                  </span>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                    {p.studentName}
                  </p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {p.branch} · {p.company}
                </p>
                <p className="text-sm font-bold text-green-600 dark:text-green-400 mt-0.5">
                  {formatPkg(p.package)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
