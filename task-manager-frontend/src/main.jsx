import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css"; 


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)




// <AnimatePresence>
//               {filteredTasks.map((task, idx) => (
//                 <motion.div
//                   key={task._id}
//                   className={`${cardClass} rounded-xl p-6 border shadow-sm`}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ delay: idx * 0.05 }}
//                   whileHover={{ translateX: 5 }}
//                 >
//                   <div className="flex items-start justify-between gap-4">
//                     <div className="flex-1 flex gap-4">
//                       <motion.button
//                         whileHover={{ scale: 1.2 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => handleToggleStatus(task._id)}
//                         className="flex-shrink-0 mt-1 text-2xl focus:outline-none"
//                       >
//                         {task.status === 'completed' ? (
//                           <MdCheckCircle className="text-green-500" />
//                         ) : (
//                           <BsCircle
//                             className={`${isDark
//                               ? 'text-slate-600'
//                               : 'text-slate-300'
//                               }`}
//                           />
//                         )}
//                       </motion.button>

//                       <div className="flex-1">
//                         <h3
//                           className={`text-lg font-semibold ${task.status === 'completed'
//                             ? 'line-through ' + (isDark ? 'text-slate-500' : 'text-slate-400')
//                             : ''
//                             }`}
//                         >
//                           {task.title}
//                         </h3>
//                         <p
//                           className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'
//                             }`}
//                         >
//                           {task.description}
//                         </p>
//                         <div className="flex items-center gap-3 mt-3 flex-wrap">
//                           <span
//                             className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${task.status === 'completed'
//                               ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
//                               : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
//                               }`}
//                           >
//                             {task.status === 'completed' ? '✓ Completed' : '○ Pending'}
//                           </span>
//                           <span
//                             className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'
//                               }`}
//                           >
//                             {new Date(task.createdAt).toLocaleDateString()}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex gap-2 flex-shrink-0">
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => handleEditTask(task)}
//                         className={`p-2 rounded-lg transition-colors ${isDark
//                           ? 'hover:bg-slate-800 text-blue-400'
//                           : 'hover:bg-slate-100 text-blue-500'
//                           }`}
//                         title="Edit task"
//                       >
//                         <AiOutlineEdit size={18} />
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => handleDeleteTask(task._id)}
//                         className={`p-2 rounded-lg transition-colors ${isDark
//                           ? 'hover:bg-slate-800 text-red-400'
//                           : 'hover:bg-slate-100 text-red-500'
//                           }`}
//                         title="Delete task"
//                       >
//                         <AiOutlineDelete size={18} />
//                       </motion.button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>