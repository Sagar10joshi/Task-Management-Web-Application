import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";

export default function DeleteConfirmModal({
  isOpen,
  taskTitle,
  onConfirm,
  onCancel,
  isDark,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className={`
                w-full max-w-md rounded-2xl shadow-2xl border p-6
                ${
                  isDark
                    ? "bg-slate-900 border-slate-700"
                    : "bg-white border-slate-200"
                }
              `}
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                  <AiOutlineDelete
                    className="text-red-600"
                    size={28}
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold text-center mb-2">
                Delete Task?
              </h2>

              <p
                className={`text-center text-sm ${
                  isDark
                    ? "text-slate-400"
                    : "text-slate-600"
                }`}
              >
                Every completed goal starts with focus.
                Before removing
                <span className="font-semibold">
                  {" "}“{taskTitle}”
                </span>,
                make sure it's no longer part of your journey.
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={onCancel}
                  className={`
                    flex-1 py-2.5 rounded-lg font-medium
                    ${
                      isDark
                        ? "bg-slate-800 text-white hover:bg-slate-700"
                        : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                    }
                  `}
                >
                  Keep Task
                </button>

                <button
                  onClick={onConfirm}
                  className="flex-1 py-2.5 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}