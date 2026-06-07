

import { AnimatePresence, motion } from "framer-motion";

const TaskModal = ({
    showModal,
    handleCloseModal,
    editingTask,
    newTask,
    setNewTask,
    errors,
    setErrors,
    isDark,
    cardClass,
    handleAddTask,
}) => {
    return (

        <AnimatePresence>
            {showModal && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseModal}
                    />
                    <motion.div
                        className={`fixed inset-0 z-50 flex items-center justify-center p-4`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            className={`${cardClass} rounded-2xl shadow-2xl p-8 w-full max-w-md border`}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">
                                {editingTask ? 'Edit Task' : 'Add New Task'}
                            </h2>

                            <div className="space-y-4">
                                {/* Title Input */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Task Title
                                    </label>
                                    <input
                                        type="text"
                                        value={newTask.title}
                                        onChange={(e) => {
                                            setNewTask({ ...newTask, title: e.target.value });
                                            if (errors.title) setErrors({ ...errors, title: '' });
                                        }}
                                        className={`w-full px-4 py-2 rounded-lg border-2 transition-colors focus:outline-none ${errors.title
                                            ? `border-red-500 ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`
                                            : `border-slate-200 ${isDark ? 'bg-slate-800 text-white border-slate-600' : 'bg-white'}`
                                            }`}
                                        placeholder="Enter task title"
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                {/* Description Input */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={newTask.description}
                                        onChange={(e) => {
                                            setNewTask({
                                                ...newTask,
                                                description: e.target.value
                                            });
                                            if (errors.description)
                                                setErrors({ ...errors, description: '' });
                                        }}
                                        rows="4"
                                        className={`w-full px-4 py-2 rounded-lg border-2 transition-colors focus:outline-none resize-none ${errors.description
                                            ? `border-red-500 ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`
                                            : `border-slate-200 ${isDark ? 'bg-slate-800 text-white border-slate-600' : 'bg-white'}`
                                            }`}
                                        placeholder="Enter task description"
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleCloseModal}
                                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${isDark
                                        ? 'bg-slate-800 text-white hover:bg-slate-700'
                                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                        }`}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleAddTask}
                                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
                                >
                                    {editingTask ? 'Update' : 'Create'}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default TaskModal;