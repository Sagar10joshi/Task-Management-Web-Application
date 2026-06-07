// import { motion, AnimatePresence } from "framer-motion";
// import { AiOutlinePlus } from "react-icons/ai";
// import TaskCard from "./TaskCard";

// export default function TaskList({
//     filteredTasks,
//     isDark,
//     cardClass,
//     searchTerm,
//     filterStatus,
//     setShowModal,
//     handleViewTask,
//     handleToggleStatus,
//     handleEditTask,
//     handleDeleteTask,
// }) {
//     if (filteredTasks.length === 0) {
//         return (
//             <motion.div
//                 className={`${cardClass} rounded-xl p-12 border shadow-sm text-center`}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//             >
//                 <div className="text-5xl mb-4">🎯</div>

//                 <h3 className="text-lg font-semibold mb-2">
//                     No tasks found
//                 </h3>

//                 <p
//                     className={`${isDark ? "text-slate-400" : "text-slate-600"
//                         } mb-6`}
//                 >
//                     {searchTerm || filterStatus !== "all"
//                         ? "Try adjusting your filters"
//                         : "Create your first task to get started"}
//                 </p>

//                 {!searchTerm && filterStatus === "all" && (
//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setShowModal(true)}
//                         className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
//                     >
//                         <AiOutlinePlus size={20} />
//                         Create Task
//                     </motion.button>
//                 )}
//             </motion.div>
//         );
//     }

//     return (
//         <motion.div
//             className="space-y-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//         >
//             <h2 className="text-lg font-bold mb-4">Tasks</h2>

//             <AnimatePresence>
//                 {filteredTasks.map((task, idx) => (
//                     <TaskCard
//                         key={task._id}
//                         task={task}
//                         idx={idx}
//                         isDark={isDark}
//                         cardClass={cardClass}
//                         onView={handleViewTask}
//                         onToggle={handleToggleStatus}
//                         onEdit={handleEditTask}
//                         onDelete={handleDeleteTask}
//                         handleDeleteTask={(id) => {
//                             const task = tasks.find(t => t._id === id);

//                             setDeleteTaskId(id);
//                             setDeleteTaskTitle(task?.title || "");
//                         }}
//                     />
//                 ))}
//             </AnimatePresence>
//         </motion.div>
//     );
// }




import { motion, AnimatePresence } from "framer-motion";
import { AiOutlinePlus } from "react-icons/ai";
import TaskCard from "./TaskCard";

export default function TaskList({
    filteredTasks,
    isDark,
    cardClass,
    searchTerm,
    filterStatus,
    setShowModal,
    handleViewTask,
    handleToggleStatus,
    handleEditTask,
    handleDeleteTask,
    setDeleteTaskId,
    setDeleteTaskTitle,
}) {
    if (filteredTasks.length === 0) {
        return (
            <motion.div
                className={`${cardClass} rounded-xl p-12 border shadow-sm text-center`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="text-5xl mb-4">🎯</div>

                <h3 className="text-lg font-semibold mb-2">
                    No tasks found
                </h3>

                <p className={`${isDark ? "text-slate-400" : "text-slate-600"} mb-6`}>
                    {searchTerm || filterStatus !== "all"
                        ? "Try adjusting your filters"
                        : "Create your first task to get started"}
                </p>

                {!searchTerm && filterStatus === "all" && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg"
                    >
                        <AiOutlinePlus size={20} />
                        Create Task
                    </motion.button>
                )}
            </motion.div>
        );
    }

    return (
        <motion.div className="space-y-4">
            <h2 className="text-lg font-bold mb-4">Tasks</h2>

            <AnimatePresence>
                {filteredTasks.map((task, idx) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        idx={idx}
                        isDark={isDark}
                        cardClass={cardClass}
                        onView={handleViewTask}
                        onToggle={handleToggleStatus}
                        onEdit={handleEditTask}
                        // onDelete={handleDeleteTask}
                        onDelete={(task) => {
                            setDeleteTaskId(task._id);
                            setDeleteTaskTitle(task.title);
                        }}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    );
}