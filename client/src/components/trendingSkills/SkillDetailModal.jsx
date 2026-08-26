export default function SkillDetailModal({ selected, onClose }) {
  if (!selected) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-lg w-full p-6 border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto"
        onClick={onClose}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selected.name}
            </h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
              {selected.category}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {selected.description}
        </p>

        <div className="space-y-6">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">
              🏢 Hiring Companies
            </p>
            <div className="flex flex-wrap gap-2">
              {selected.companies.map((c) => (
                <span
                  key={c}
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-xl text-xs font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/40 rounded-xl p-4">
              <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 uppercase tracking-wide">
                Avg Package
              </p>
              <p className="font-bold text-gray-900 dark:text-white text-lg mt-1">
                {selected.avgPackage}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Time to Learn
              </p>
              <p className="font-bold text-gray-900 dark:text-white text-lg mt-1">
                {selected.timeToLearn}
              </p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">
              📚 Learning Resources
            </p>
            <div className="space-y-3">
              {selected.resources.map((r) => (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-yellow-400 hover:shadow-sm text-gray-700 dark:text-gray-300 hover:text-yellow-700 dark:hover:text-yellow-400 px-4 py-3 rounded-xl text-sm font-semibold transition-all group"
                >
                  <span>{r.name}</span>
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
