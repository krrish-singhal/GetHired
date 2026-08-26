import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  getPlacementStats,
  getYearlyChart,
  getBranchChart,
  getCompaniesChart,
  getPackageDistChart,
  getTopPerformers,
  getPlacements,
  getFilterOptions,
} from "../services/api";
import { formatPkg } from "../utils/formatPkg";
import {
  FALLBACK_STATS,
  FALLBACK_YEARLY,
  FALLBACK_BRANCH,
  FALLBACK_COMPANIES,
  FALLBACK_PKGDIST,
  FALLBACK_PLACEMENTS,
  FALLBACK_FILTERS,
  BRANCH_COLORS,
  BAR_COLORS,
} from "../data/dashboardData";
import StatCard from "../components/dashboard/StatCard";
import FilterSidebar from "../components/dashboard/FilterSidebar";
import PlacementTable from "../components/dashboard/PlacementTable";
import TopPerformers from "../components/dashboard/TopPerformers";

// ── Main Dashboard ─────────────────────────────────────────
export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [yearlyData, setYearlyData] = useState(null);
  const [branchData, setBranchData] = useState(null);
  const [companiesData, setCompaniesData] = useState(null);
  const [pkgDistData, setPkgDistData] = useState(null);
  const [performers, setPerformers] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [filterOptions, setFilterOptions] = useState(FALLBACK_FILTERS);
  const [filters, setFilters] = useState({
    years: [],
    branches: [],
    company: "",
    role: "",
    minPkg: "",
    maxPkg: "",
  });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [tableLoading, setTableLoading] = useState(true);
  const [chartsLoading, setChartsLoading] = useState(true);

  // Load charts & stats — use fallback when DB is empty
  useEffect(() => {
    Promise.allSettled([
      getPlacementStats(),
      getYearlyChart(),
      getBranchChart(),
      getCompaniesChart(),
      getPackageDistChart(),
      getTopPerformers(),
      getFilterOptions(),
    ]).then(([statsR, yearR, branchR, compR, pkgR, perfR, filtersR]) => {
      setStats(
        statsR.status === "fulfilled" && statsR.value.data?.totalPlacements > 0
          ? statsR.value.data
          : FALLBACK_STATS,
      );
      setYearlyData(
        yearR.status === "fulfilled" && yearR.value.data?.length > 0
          ? yearR.value.data
          : FALLBACK_YEARLY,
      );
      setBranchData(
        branchR.status === "fulfilled" && branchR.value.data?.length > 0
          ? branchR.value.data
          : FALLBACK_BRANCH,
      );
      setCompaniesData(
        compR.status === "fulfilled" && compR.value.data?.length > 0
          ? compR.value.data
          : FALLBACK_COMPANIES,
      );
      setPkgDistData(
        pkgR.status === "fulfilled" && pkgR.value.data?.some((d) => d.count > 0)
          ? pkgR.value.data
          : FALLBACK_PKGDIST,
      );
      setPerformers(
        perfR.status === "fulfilled" && perfR.value.data?.length > 0
          ? perfR.value.data
          : FALLBACK_PLACEMENTS.slice(0, 10).sort((a, b) => b.package - a.package),
      );
      if (
        filtersR.status === "fulfilled" &&
        filtersR.value.data?.years?.length > 0
      ) {
        setFilterOptions(filtersR.value.data);
      }
      setChartsLoading(false);
    });
  }, []);

  // Load placement table
  useEffect(() => {
    setTableLoading(true);
    const params = { page, limit: 20 };
    if (filters.years?.length === 1) params.year = filters.years[0];
    if (filters.branches?.length === 1) params.branch = filters.branches[0];
    if (filters.company) params.company = filters.company;
    if (filters.role) params.role = filters.role;
    if (filters.minPkg) params.minPkg = filters.minPkg;
    if (filters.maxPkg) params.maxPkg = filters.maxPkg;
    getPlacements(params)
      .then(({ data }) => {
        if (data.total > 0) {
          setPlacements(data.data);
          setPages(data.pages);
          setTotal(data.total);
        } else {
          // DB is empty — use fallback data
          throw new Error("empty");
        }
      })
      .catch(() => {
        // API unavailable — filter fallback data client-side
        let fb = FALLBACK_PLACEMENTS;
        if (filters.years?.length)
          fb = fb.filter((p) => filters.years.includes(p.year));
        if (filters.branches?.length)
          fb = fb.filter((p) => filters.branches.includes(p.branch));
        if (filters.company)
          fb = fb.filter((p) =>
            p.company.toLowerCase().includes(filters.company.toLowerCase()),
          );
        if (filters.role)
          fb = fb.filter((p) =>
            p.role.toLowerCase().includes(filters.role.toLowerCase()),
          );
        if (filters.minPkg)
          fb = fb.filter((p) => p.package >= Number(filters.minPkg));
        if (filters.maxPkg)
          fb = fb.filter((p) => p.package <= Number(filters.maxPkg));
        const limit = 20;
        const start = (page - 1) * limit;
        setTotal(fb.length);
        setPages(Math.max(1, Math.ceil(fb.length / limit)));
        setPlacements(fb.slice(start, start + limit));
      })
      .finally(() => setTableLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, JSON.stringify(filters)]);

  const handleFilterChange = (f) => {
    setFilters(f);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Placement Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
            Comprehensive placement analytics across all years and branches
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(chartsLoading || !stats) ? (
            Array.from({ length: 4 }, (_, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 animate-pulse"
              >
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mt-3" />
              </div>
            ))
          ) : (
            <>
              <StatCard
                label="Total Placements"
                value={stats.totalPlacements?.toLocaleString()}
                color="blue"
              />
              <StatCard
                label="Companies Visited"
                value={stats.totalCompanies}
                color="purple"
              />
              <StatCard
                label="Highest Package"
                value={formatPkg(stats.highestPackage)}
                color="green"
              />
              <StatCard
                label="Avg Package"
                value={formatPkg(stats.avgPackage)}
                color="amber"
              />
            </>
          )}
        </div>

        {/* Charts Row 1 — Year + Branch */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Year-wise Line Chart */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4">
              Year-wise Placements
            </h3>
            {chartsLoading ? (
              <div className="h-48 bg-gray-50 rounded-xl animate-pulse" />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(val, name) => [
                      val,
                      name === "count" ? "Placements" : "Avg Pkg (LPA)",
                    ]}
                  />
                  <Legend
                    formatter={(val) =>
                      val === "count" ? "Total Placements" : "Avg Package (LPA)"
                    }
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="avgPkg"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Branch-wise Bar Chart */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4">
              Branch-wise Placements
            </h3>
            {chartsLoading ? (
              <div className="h-48 bg-gray-50 rounded-xl animate-pulse" />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={branchData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="branch" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(val, name) => [
                      val,
                      name === "count" ? "Placements" : "Avg Pkg (LPA)",
                    ]}
                  />
                  <Legend
                    formatter={(val) =>
                      val === "count" ? "Total Placements" : "Avg Package (LPA)"
                    }
                  />
                  <Bar dataKey="count" name="count" radius={[4, 4, 0, 0]}>
                    {branchData.map((entry) => (
                      <Cell
                        key={entry.branch}
                        fill={BRANCH_COLORS[entry.branch] || "#3b82f6"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Charts Row 2 — Companies + Package Dist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Companies Horizontal Bar */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4">
              Top Companies by Offers
            </h3>
            {chartsLoading ? (
              <div className="h-64 bg-gray-50 rounded-xl animate-pulse" />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={companiesData}
                  layout="vertical"
                  margin={{ left: 10, right: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f3f4f6"
                    horizontal={false}
                  />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis
                    dataKey="company"
                    type="category"
                    tick={{ fontSize: 11 }}
                    width={90}
                  />
                  <Tooltip formatter={(val) => [val, "Offers"]} />
                  <Bar dataKey="count" name="Offers" radius={[0, 4, 4, 0]}>
                    {companiesData.map((_, i) => (
                      <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Package Distribution Histogram */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4">
              Package Distribution
            </h3>
            {chartsLoading ? (
              <div className="h-64 bg-gray-50 rounded-xl animate-pulse" />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={pkgDistData} margin={{ bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10 }}
                    angle={-20}
                    textAnchor="end"
                    height={45}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(val) => [val, "Students"]} />
                  <Bar dataKey="count" name="Students" radius={[4, 4, 0, 0]}>
                    {pkgDistData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={`hsl(${210 + i * 20}, 70%, ${60 - i * 3}%)`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Placement Table + Filters + Top Performers */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Placement Records
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filter sidebar */}
            <div className="lg:col-span-1">
              <FilterSidebar
                filters={filters}
                options={filterOptions}
                onChange={handleFilterChange}
              />
            </div>

            {/* Table + results */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {tableLoading
                    ? "Loading…"
                    : `Showing ${placements.length} of ${total} records`}
                </p>
                <div className="flex gap-2 items-center">
                  <span className="text-xs text-gray-400">Active filters:</span>
                  {filters.years?.map((y) => (
                    <span
                      key={y}
                      className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full"
                    >
                      {y}
                    </span>
                  ))}
                  {filters.branches?.map((b) => (
                    <span
                      key={b}
                      className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full"
                    >
                      {b}
                    </span>
                  ))}
                  {filters.company && (
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                      {filters.company}
                    </span>
                  )}
                  {(filters.minPkg || filters.maxPkg) && (
                    <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">
                      {filters.minPkg || "0"}–{filters.maxPkg || "∞"} LPA
                    </span>
                  )}
                </div>
              </div>
              <PlacementTable
                placements={placements}
                loading={tableLoading}
                page={page}
                pages={pages}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>

        {/* Top Performers */}
        {chartsLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }, (_, idx) => (
              <div
                key={idx}
                className="h-32 rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 animate-pulse"
              />
            ))}
          </div>
        ) : (
          performers.length > 0 && (
            <div>
              <TopPerformers performers={performers} />
            </div>
          )
        )}
      </div>
    </div>
  );
}

