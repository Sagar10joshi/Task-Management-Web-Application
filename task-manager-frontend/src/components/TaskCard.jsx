
import { motion } from "framer-motion";
import { MdCheck } from "react-icons/md";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

export default function TaskCard({
  task,
  idx,
  isDark,
  cardClass,
  onView,
  onToggle,
  onEdit,
  onDelete,
}) {
  return (
    <motion.div
      className={`
        rounded-xl p-4 sm:p-6 border shadow-sm transition-all
        ${task.status === "completed"
          ? isDark
            ? "bg-green-950/20 border-green-800"
            : "bg-green-50 border-green-200"
          : cardClass
        }
      `}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: idx * 0.05 }}
      whileHover={{ y: -2 }}
    >
      {/* MAIN WRAPPER */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

        {/* LEFT SIDE */}
        <div className="flex gap-3 sm:gap-4 w-full">

          {/* Toggle */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(task._id);
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            className="flex-shrink-0 mt-1"
          >
            <div
              className={`
                w-5 h-5 sm:w-6 sm:h-6 rounded-md border-2 flex items-center justify-center transition-all
                ${task.status === "completed"
                  ? "bg-green-500 border-green-500"
                  : isDark
                    ? "border-slate-500 bg-slate-800"
                    : "border-slate-400 bg-white"
                }
              `}
            >
              {task.status === "completed" && (
                <MdCheck className="text-white" size={14} />
              )}
            </div>
          </motion.button>

          {/* TEXT CONTENT */}
          <div className="flex-1 min-w-0">

            {/* TITLE */}
            <h3
              className={`
                text-base sm:text-lg font-semibold transition-all flex items-start sm:items-center gap-2 cursor-pointer break-words
                ${task.status === "completed"
                  ? isDark
                    ? "line-through text-slate-400"
                    : "line-through text-slate-500"
                  : isDark
                    ? "text-white"
                    : "text-slate-900"
                }
              `}
            >
              <span className="
                text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md
                bg-slate-200 text-slate-700
                dark:bg-slate-800 dark:text-slate-300
                shrink-0
              ">
                #{idx + 1}
              </span>

              <span className="break-words">{task.title}</span>
            </h3>

            <p
              className={`mt-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"
                }`}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {task.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-4">

              <span
                className={`
                  inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-bold
                  ${task.status === "completed"
                    ? isDark
                      ? "bg-green-900/40 text-green-300"
                      : "bg-green-100 text-green-800"
                    : isDark
                      ? "bg-orange-900/40 text-orange-300"
                      : "bg-orange-100 text-orange-800"
                  }
                `}
              >
                {task.status === "completed" ? "✓ Completed" : "⏳ Pending"}
              </span>

              <span
                className={`text-[10px] sm:text-xs font-medium ${isDark ? "text-slate-400" : "text-slate-500"
                  }`}
              >
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="
          flex sm:flex-row flex-row justify-end sm:justify-start
          gap-2 sm:gap-2 w-full sm:w-auto
        ">

          {/* VIEW */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onView(task);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              p-2 rounded-lg transition-colors
              ${isDark
                ? "hover:bg-slate-800 text-indigo-400"
                : "hover:bg-slate-100 text-indigo-600"
              }
            `}
            title="View"
          >
            <AiOutlineEye size={18} />
          </motion.button>

          {/* EDIT */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              p-2 rounded-lg transition-colors
              ${isDark
                ? "hover:bg-slate-800 text-sky-400"
                : "hover:bg-slate-100 text-sky-600"
              }
            `}
          >
            <AiOutlineEdit size={18} />
          </motion.button>

          {/* DELETE */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              p-2 rounded-lg transition-colors
              ${isDark
                ? "hover:bg-slate-800 text-rose-400"
                : "hover:bg-slate-100 text-rose-600"
              }
            `}
          >
            <AiOutlineDelete size={18} />
          </motion.button>

        </div>
      </div>
    </motion.div>
  );
}