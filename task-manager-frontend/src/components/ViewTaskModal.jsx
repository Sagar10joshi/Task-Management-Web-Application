import { AnimatePresence, motion } from "framer-motion";

const ViewTaskModal = ({
    viewTask,
    handleCloseViewModal,
    isDark,
}) => {
    return (

        <AnimatePresence>
            {viewTask && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseViewModal}
                    />

                    {/* Modal Wrapper */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={handleCloseViewModal}
                    >
                        {/* Card */}
                        <motion.div
                            className={`
            w-full max-w-lg rounded-2xl shadow-2xl border
            ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"}
            p-6 sm:p-8
          `}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-5">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Task Title
                                    </label>
                                    <h2 className={`text-xl sm:text-2xl font-bold leading-tight ${isDark ? "text-white" : "text-slate-900"
                                        }`}>
                                        {viewTask.title}
                                    </h2>


                                </div>

                                <span
                                    className={`
                px-3 py-1 text-xs font-semibold rounded-full
                ${viewTask.status === "completed"
                                            ? isDark
                                                ? "bg-green-900/40 text-green-300"
                                                : "bg-green-100 text-green-700"
                                            : isDark
                                                ? "bg-orange-900/40 text-orange-300"
                                                : "bg-orange-100 text-orange-700"
                                        }
              `}
                                >
                                    {viewTask.status === "completed" ? "Completed" : "Pending"}
                                </span>
                            </div>

                            {/* Description */}
                            <div
                                className={`
              text-sm leading-relaxed whitespace-pre-wrap
              ${isDark ? "text-slate-300" : "text-slate-700"}
            `}
                            >
                                <label className="block text-sm font-semibold mb-2">
                                    Description
                                </label>
                                {viewTask.description || "No description provided."}
                            </div>

                            {/* Footer */}
                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={handleCloseViewModal}
                                    className={`
                px-5 py-2.5 rounded-lg font-medium transition-all
                ${isDark
                                            ? "bg-slate-800 text-white hover:bg-slate-700"
                                            : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                                        }
              `}
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>

    );
};

export default ViewTaskModal;