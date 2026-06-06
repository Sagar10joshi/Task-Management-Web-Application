'use client';

import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiEdit3,
  FiTrash2,
  FiTrendingUp,
  FiLayout,
  FiSmartphone,
} from 'react-icons/fi';

const features = [
  {
    icon: <FiCheckCircle className="w-6 h-6" />,
    title: 'Create Tasks',
    description: 'Easily add new tasks with descriptions and due dates',
  },
  {
    icon: <FiEdit3 className="w-6 h-6" />,
    title: 'Edit Tasks',
    description: 'Update task details and manage your workflow seamlessly',
  },
  {
    icon: <FiTrash2 className="w-6 h-6" />,
    title: 'Delete Tasks',
    description: 'Remove completed or unnecessary tasks with one click',
  },
  {
    icon: <FiTrendingUp className="w-6 h-6" />,
    title: 'Task Tracking',
    description: 'Monitor progress with real-time statistics and analytics',
  },
  {
    icon: <FiLayout className="w-6 h-6" />,
    title: 'Smart Organization',
    description: 'Organize tasks efficiently with filters and categories',
  },
  {
    icon: <FiSmartphone className="w-6 h-6" />,
    title: 'Responsive Design',
    description: 'Access your tasks on any device, anytime, anywhere',
  },
];

// Animation Variants
const fadeInUp = {
  initial: {
    opacity: 0,
    y: 40,
  },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const staggerItem = {
  initial: {
    opacity: 0,
    y: 30,
  },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Everything You Need To Stay Productive
          </h2>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Powerful features designed to help you manage tasks efficiently and
            boost your productivity
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 border border-slate-100 hover:border-indigo-200 transition-all duration-300"
              variants={staggerItem}
              whileHover={{
                y: -5,
                boxShadow: '0 20px 40px rgba(99, 102, 241, 0.1)',
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}