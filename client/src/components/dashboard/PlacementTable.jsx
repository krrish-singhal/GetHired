import { BRANCH_COLORS } from "../../data/dashboardData";
import { formatPkg } from "../../utils/formatPkg";

export default function PlacementTable({
  placements,
  loading,
  page,
  pages,
  onPageChange,
}) {
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Branch</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Package</th>
              <th className="px-4 py-3 text-left">Year</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {loading ? (
              Array(6)
                .fill(0)
                .map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {Array(6)
                      .fill(0)
                      .map((__, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-4 bg-gray-100 rounded w-3/4" />
                        </td>
                      ))}
                  </tr>
                ))
            ) : placements.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-gray-400"
                >
                  No records found
                </td>
              </tr>
            ) : (
              placements.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                    {p.studentName}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        background: `${BRANCH_COLORS[p.branch]}20`,
                        color: BRANCH_COLORS[p.branch],
                      }}
                    >
                      {p.branch}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {p.company}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {p.role}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-semibold ${
                        p.package >= 20
                          ? "text-green-600"
                          : p.package >= 10
                            ? "text-yellow-600"
                            : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {formatPkg(p.package)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {p.year}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex justify-center gap-1 mt-4">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            ‹
          </button>
          {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`px-3 py-1.5 rounded-lg text-sm border ${
                  page === p
                    ? "bg-yellow-400 text-gray-900 border-yellow-400"
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                {p}
              </button>
            );
          })}
          {pages > 7 && <span className="px-2 py-1.5 text-gray-400">...</span>}
          {pages > 7 && (
            <button
              onClick={() => onPageChange(pages)}
              className={`px-3 py-1.5 rounded-lg text-sm border ${
                page === pages
                  ? "bg-yellow-400 text-gray-900 border-yellow-400"
                  : "hover:bg-gray-50"
              }`}
            >
              {pages}
            </button>
          )}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === pages}
            className="px-3 py-1.5 rounded-lg text-sm border disabled:opacity-40 hover:bg-gray-50"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
