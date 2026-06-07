// components/DashboardSkeleton.jsx

function DashboardSkeleton({ isDark }) {
  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-slate-950" : "bg-slate-50"
      } animate-pulse`}
    >
      {/* Navbar */}
      <div
        className={`h-20 border-b ${
          isDark
            ? "bg-slate-900 border-slate-700"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="h-8 w-40 rounded bg-slate-300 dark:bg-slate-700" />
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-700" />
            <div className="h-10 w-28 rounded bg-slate-300 dark:bg-slate-700" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-32 rounded-xl ${
                isDark ? "bg-slate-900" : "bg-white"
              }`}
            />
          ))}
        </div>

        <div
          className={`h-24 rounded-xl mb-8 ${
            isDark ? "bg-slate-900" : "bg-white"
          }`}
        />

        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-28 rounded-xl ${
                isDark ? "bg-slate-900" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardSkeleton;