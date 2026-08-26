export default function StatCard({ label, value, sub, color = "blue" }) {
  const clr = {
    blue: "text-yellow-600",
    purple: "text-purple-600",
    green: "text-green-600",
    amber: "text-amber-600",
  };
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
      <p className="text-gray-500 dark:text-gray-400 text-sm">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${clr[color]}`}>{value}</p>
      {sub && (
        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">{sub}</p>
      )}
    </div>
  );
}
