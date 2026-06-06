'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Create Account',
    description: 'Sign up in seconds with your email address',
  },
  {
    number: '02',
    title: 'Add Your Tasks',
    description: 'Create tasks and organize them by priority',
  },
  {
    number: '03',
    title: 'Track Progress',
    description: 'Monitor completion rates and stay productive',
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

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Get Started In Minutes
          </h2>

          <p className="text-xl text-slate-600">
            Three simple steps to transform your task management
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative z-10"
              variants={staggerItem}
            >
              <motion.div
                className="bg-white rounded-xl p-8 border border-slate-100 text-center"
                whileHover={{
                  y: -5,
                  boxShadow: '0 20px 40px rgba(99, 102, 241, 0.1)',
                }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {step.number}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-slate-600">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}