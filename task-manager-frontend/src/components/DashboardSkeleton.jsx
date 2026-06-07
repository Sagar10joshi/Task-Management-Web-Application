// // components/DashboardSkeleton.jsx

// function DashboardSkeleton({ isDark }) {
//   return (
//     <div
//       className={`min-h-screen ${
//         isDark ? "bg-slate-950" : "bg-slate-50"
//       } animate-pulse`}
//     >
//       {/* Navbar */}
//       <div
//         className={`h-20 border-b ${
//           isDark
//             ? "bg-slate-900 border-slate-700"
//             : "bg-white border-slate-200"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
//           <div className="h-8 w-40 rounded bg-slate-300 dark:bg-slate-700" />
//           <div className="flex gap-3">
//             <div className="h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-700" />
//             <div className="h-10 w-28 rounded bg-slate-300 dark:bg-slate-700" />
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           {[...Array(4)].map((_, i) => (
//             <div
//               key={i}
//               className={`h-32 rounded-xl ${
//                 isDark ? "bg-slate-900" : "bg-white"
//               }`}
//             />
//           ))}
//         </div>

//         <div
//           className={`h-24 rounded-xl mb-8 ${
//             isDark ? "bg-slate-900" : "bg-white"
//           }`}
//         />

//         <div className="space-y-4">
//           {[...Array(5)].map((_, i) => (
//             <div
//               key={i}
//               className={`h-28 rounded-xl ${
//                 isDark ? "bg-slate-900" : "bg-white"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardSkeleton;

// components/DashboardSkeleton.jsx
function DashboardSkeleton({ isDark }) {
  const baseBg = isDark ? "bg-slate-950" : "bg-slate-50";
  const cardBg = isDark ? "bg-slate-900/60" : "bg-white";
  const border = isDark ? "border-slate-800" : "border-slate-200";

  return (
    <div className={`min-h-screen ${baseBg}`}>
      {/* animated background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-500/10 blur-3xl animate-pulse" />
      </div>

      {/* Navbar */}
      <div className={`h-20 border-b ${border} ${cardBg} backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo shimmer */}
          <div className="h-8 w-40 rounded-lg shimmer" />

          {/* user */}
          <div className="flex gap-3 items-center">
            <div className="h-10 w-10 rounded-full shimmer" />
            <div className="h-10 w-28 rounded-lg shimmer" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-32 rounded-2xl border ${border} ${cardBg} p-4`}
            >
              <div className="h-4 w-24 shimmer mb-4 rounded" />
              <div className="h-8 w-16 shimmer rounded" />
              <div className="mt-6 h-2 w-full shimmer rounded-full" />
            </div>
          ))}
        </div>

        {/* Search bar */}
        <div
          className={`h-24 rounded-2xl border ${border} ${cardBg} mb-8 p-4`}
        >
          <div className="h-4 w-32 shimmer mb-4 rounded" />
          <div className="h-10 w-full shimmer rounded-lg" />
        </div>

        {/* Task list */}
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`rounded-2xl border ${border} ${cardBg} p-5`}
            >
              <div className="flex justify-between items-start">
                {/* left */}
                <div className="flex gap-4 w-full">
                  <div className="h-6 w-6 shimmer rounded-md mt-1" />

                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-3/4 shimmer rounded" />
                    <div className="h-4 w-1/2 shimmer rounded" />

                    <div className="flex gap-3 mt-4">
                      <div className="h-6 w-20 shimmer rounded-full" />
                      <div className="h-6 w-24 shimmer rounded-full" />
                    </div>
                  </div>
                </div>

                {/* actions */}
                <div className="flex gap-2">
                  <div className="h-8 w-8 shimmer rounded-lg" />
                  <div className="h-8 w-8 shimmer rounded-lg" />
                  <div className="h-8 w-8 shimmer rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* shimmer animation style */}
      <style>
        {`
          .shimmer {
            background: linear-gradient(
              90deg,
              rgba(148,163,184,0.15) 0%,
              rgba(148,163,184,0.35) 50%,
              rgba(148,163,184,0.15) 100%
            );
            background-size: 200% 100%;
            animation: shimmerMove 1.4s infinite linear;
          }

          @keyframes shimmerMove {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}
      </style>
    </div>
  );
}

export default DashboardSkeleton;