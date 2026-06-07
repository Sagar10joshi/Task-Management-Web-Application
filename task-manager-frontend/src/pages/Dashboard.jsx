'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdCheck } from "react-icons/md";
import { AiOutlineLogout, AiOutlinePlus, AiOutlineDelete, AiOutlineEdit, AiOutlineSearch } from 'react-icons/ai';
import { BsCheckCircle, BsCircle, BsMoon, BsSun } from 'react-icons/bs';
import { BiLogoProductHunt } from 'react-icons/bi';
import { MdCheckCircle } from 'react-icons/md';
import { getTasks, createTask, updateTask, deleteTask, toggleTaskStatus } from "../api/task";
import { getMe, logoutUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import TaskModal from "../components/TaskModal";
import ViewTaskModal from "../components/ViewTaskModal";
import DashboardSkeleton from "../components/DashboardSkeleton";
import TaskList from "../components/TaskList";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewTask, setViewTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [deleteTaskTitle, setDeleteTaskTitle] = useState("");

  const [isDark, setIsDark] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchTasks();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getMe();
      } catch (err) {
        navigate("/");
      }
    };

    checkAuth();
  }, []);

  const handleViewTask = (task) => {
    setViewTask(task);
  };

  const handleCloseViewModal = () => {
    setViewTask(null);
  };

  // Filter and search tasks
  // const filteredTasks = useMemo(() => {
  //   return tasks.filter(task => {
  //     const matchesSearch = task.title
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase());
  //     const matchesFilter =
  //       filterStatus === 'all' || task.status === filterStatus;
  //     return matchesSearch && matchesFilter;
  //   });
  // }, [tasks, searchTerm, filterStatus]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        const matchesSearch = task.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const matchesFilter =
          filterStatus === 'all' || task.status === filterStatus;

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        // pending first, completed last
        if (a.status === b.status) return 0;
        if (a.status === 'pending') return -1;
        return 1;
      });
  }, [tasks, searchTerm, filterStatus]);

  // Statistics
  const statistics = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const completionRate =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, completed, pending, completionRate };
  }, [tasks]);


  const fetchUser = async () => {
    try {
      const data = await getMe();
      setUser(data.user);
    } catch (error) {
      navigate("/login");
    }
  };


  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      setTasks(data.tasks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const validateTask = () => {
    const newErrors = {};
    if (!newTask.title.trim()) {
      newErrors.title = 'Task title is required';
    }
    if (!newTask.description.trim()) {
      newErrors.description = 'Task description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTask = async () => {
    if (!validateTask()) return;

    try {
      if (editingTask) {
        const data = await updateTask(
          editingTask._id,
          {
            title: newTask.title,
            description: newTask.description
          }
        );

        setTasks(tasks.map(task =>
          task._id === editingTask._id
            ? data.task
            : task
        ));
      } else {
        const data = await createTask({
          title: newTask.title,
          description: newTask.description
        });

        setTasks([data.task, ...tasks]);
      }

      setShowModal(false);
      setEditingTask(null);

      setNewTask({
        title: "",
        description: ""
      });

    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({ title: task.title, description: task.description });
    setShowModal(true);
    setErrors({});
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);

      setTasks(
        tasks.filter(task => task._id !== id)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const confirmDeleteTask = async () => {
    try {
      await deleteTask(deleteTaskId);

      setTasks(
        tasks.filter(
          task => task._id !== deleteTaskId
        )
      );

      setDeleteTaskId(null);
      setDeleteTaskTitle("");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const data =
        await toggleTaskStatus(id);

      setTasks(tasks.map(task =>
        task._id === id
          ? data.task
          : task
      ));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTask({ title: '', description: '' });
    setEditingTask(null);
    setErrors({});
  };

  const bgClass = isDark ? 'bg-slate-950' : 'bg-slate-50';
  const textClass = isDark ? 'text-white' : 'text-slate-900';
  const cardClass = isDark
    ? 'bg-slate-900 border-slate-700'
    : 'bg-white border-slate-200';
  const inputClass = isDark
    ? 'bg-slate-800 border-slate-700 text-white'
    : 'bg-white border-slate-200 text-slate-900';


  if (loading) {
    return <DashboardSkeleton isDark={isDark} />;
    // return <p>Loading..</p>
  }

  return (
    <motion.div
      className={`min-h-screen transition-colors duration-300 ${bgClass} ${textClass}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Navbar */}
      <motion.nav
        className={`border-b ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'} sticky top-0 z-40 shadow-sm`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <BiLogoProductHunt className="text-indigo-600 text-3xl" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </motion.div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg transition-colors ${isDark
                  ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                title={isDark ? 'Light mode' : 'Dark mode'}
              >
                {isDark ? <BsSun size={20} /> : <BsMoon size={20} />}
              </motion.button>

              {/* User Section */}
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">

                {/* User Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>

                {/* User Info */}
                <div className="hidden sm:block pr-3 border-r border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {user?.email}
                  </p>
                </div>

                {/* Logout */}
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  title="Logout"
                >
                  <AiOutlineLogout size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </motion.button>

              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {[
            {
              title: 'Total Tasks',
              value: statistics.total,
              icon: '📊',
              color: 'from-blue-500 to-blue-600'
            },
            {
              title: 'Completed',
              value: statistics.completed,
              icon: '✅',
              color: 'from-green-500 to-green-600'
            },
            {
              title: 'Pending',
              value: statistics.pending,
              icon: '⏳',
              color: 'from-yellow-500 to-yellow-600'
            },
            {
              title: 'Completion Rate',
              value: `${statistics.completionRate}%`,
              icon: '📈',
              color: 'from-purple-500 to-purple-600'
            }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className={`${cardClass} rounded-xl p-6 border shadow-sm`}
              whileHover={{ translateY: -5, boxShadow: '0 20px 25px rgba(0,0,0,0.1)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-1`}>
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
              <div
                className={`mt-4 h-1 rounded-full bg-gradient-to-r ${stat.color}`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Search & Filter Section */}
        <motion.div
          className={`${cardClass} rounded-xl p-6 border shadow-sm mb-8`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-2">Search</label>
              <div className="relative">
                <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tasks..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border-2 transition-colors focus:outline-none ${isDark
                    ? 'border-slate-600 bg-slate-800 text-white focus:border-indigo-500'
                    : 'border-slate-200 bg-white focus:border-indigo-500'
                    }`}
                />
              </div>
            </div>

            {/* Filter Dropdown */}
            <div>
              <label className="block text-sm font-semibold mb-2">Filter</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border-2 transition-colors focus:outline-none ${isDark
                  ? 'border-slate-600 bg-slate-800 text-white focus:border-indigo-500'
                  : 'border-slate-200 bg-white focus:border-indigo-500'
                  }`}
              >
                <option value="all">All Tasks</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Add Task Button */}
        <motion.div
          className="mb-8 flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingTask(null);
              setNewTask({ title: '', description: '' });
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
          >
            <AiOutlinePlus size={20} />
            Add Task
          </motion.button>
        </motion.div>

        {/* Task List Section */}
        <TaskList
          filteredTasks={filteredTasks}
          isDark={isDark}
          cardClass={cardClass}
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          setShowModal={setShowModal}
          handleViewTask={handleViewTask}
          handleToggleStatus={handleToggleStatus}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}

          setDeleteTaskId={setDeleteTaskId}
          setDeleteTaskTitle={setDeleteTaskTitle}
        />
      </div>

      {/* Modal */}
      <TaskModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        editingTask={editingTask}
        newTask={newTask}
        setNewTask={setNewTask}
        errors={errors}
        setErrors={setErrors}
        isDark={isDark}
        cardClass={cardClass}
        handleAddTask={handleAddTask}
      />

      <ViewTaskModal
        viewTask={viewTask}
        handleCloseViewModal={handleCloseViewModal}
        isDark={isDark}
      />
      <DeleteConfirmModal
        isOpen={!!deleteTaskId}
        taskTitle={deleteTaskTitle}
        isDark={isDark}
        onCancel={() => {
          setDeleteTaskId(null);
          setDeleteTaskTitle("");
        }}
        onConfirm={confirmDeleteTask}
      />
    </motion.div>
  );
}