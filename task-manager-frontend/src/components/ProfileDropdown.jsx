import { motion, AnimatePresence } from "framer-motion";

export default function ProfileDropdown({
  show,
  user,
  statistics,
  isDark,
}) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className={`
            absolute top-full right-0 mt-3 w-80 rounded-2xl border shadow-xl z-50
            ${
              isDark
                ? "bg-slate-900 border-slate-700"
                : "bg-white border-slate-200"
            }
          `}
        >
          <div className="p-5">
            <h3 className="text-lg font-bold">
              {greeting},{" "}
              {user?.name?.split(" ")[0]} 👋
            </h3>

            <p
              className={`mt-2 text-sm ${
                isDark
                  ? "text-slate-400"
                  : "text-slate-600"
              }`}
            >
              You currently have{" "}
              <span className="font-semibold text-orange-500">
                {statistics.pending}
              </span>{" "}
              pending task
              {statistics.pending !== 1 ? "s" : ""} and a{" "}
              <span className="font-semibold text-green-500">
                {statistics.completionRate}%
              </span>{" "}
              completion rate.
            </p>

            <div
              className={`mt-4 pt-4 border-t ${
                isDark
                  ? "border-slate-700"
                  : "border-slate-200"
              }`}
            >
              <div className="grid grid-cols-2 gap-3 text-center">
                <div
                  className={`rounded-lg p-3 ${
                    isDark
                      ? "bg-slate-800"
                      : "bg-slate-50"
                  }`}
                >
                  <p className="text-xl font-bold">
                    {statistics.completed}
                  </p>
                  <p className="text-xs text-green-500">
                    Completed
                  </p>
                </div>

                <div
                  className={`rounded-lg p-3 ${
                    isDark
                      ? "bg-slate-800"
                      : "bg-slate-50"
                  }`}
                >
                  <p className="text-xl font-bold">
                    {statistics.pending}
                  </p>
                  <p className="text-xs text-orange-500">
                    Pending
                  </p>
                </div>
              </div>

              <p
                className={`mt-4 text-xs ${
                  isDark
                    ? "text-slate-500"
                    : "text-slate-500"
                }`}
              >
                🚀 Keep going! Every completed task moves
                you closer to your goals.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}