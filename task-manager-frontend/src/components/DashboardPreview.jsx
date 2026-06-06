'use client';

import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

const tasks = [
  { title: 'Build Login Page', status: 'Completed' },
  { title: 'Connect Backend', status: 'Pending' },
  { title: 'Deploy Project', status: 'Pending' },
];

const stats = [
  { label: 'Total Tasks', value: '5', color: 'indigo' },
  { label: 'Completed', value: '2', color: 'green' },
  { label: 'Pending', value: '3', color: 'yellow' },
  { label: 'Success Rate', value: '40%', color: 'purple' },
];

const colorMap = {
  indigo: {
    bg: 'from-indigo-50 to-indigo-100',
    text: 'text-indigo-600',
  },
  green: {
    bg: 'from-green-50 to-green-100',
    text: 'text-green-600',
  },
  yellow: {
    bg: 'from-yellow-50 to-yellow-100',
    text: 'text-yellow-600',
  },
  purple: {
    bg: 'from-purple-50 to-purple-100',
    text: 'text-purple-600',
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function DashboardPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Your Productivity Dashboard
          </h2>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See your tasks, progress, and achievements at a glance
          </p>
        </motion.div>

        {/* Dashboard Card */}
        <motion.div
          className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-6">
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>

                <h3 className="text-white font-bold text-xl">
                  TaskFlow Dashboard
                </h3>
              </div>

              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>

            </div>
          </div>

          {/* Content */}
          <div className="p-8">

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  className={`bg-gradient-to-br ${colorMap[stat.color].bg} rounded-xl p-6`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm text-slate-600 mb-2">
                    {stat.label}
                  </p>

                  <p
                    className={`text-3xl font-bold ${colorMap[stat.color].text}`}
                  >
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 mb-4">
                Recent Tasks
              </h4>

              {tasks.map((task, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-indigo-200 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      task.status === 'Completed'
                        ? 'bg-green-500 border-green-500'
                        : 'border-slate-300'
                    }`}
                  >
                    {task.status === 'Completed' && (
                      <FiCheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-slate-900">
                      {task.title}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      task.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {task.status}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}