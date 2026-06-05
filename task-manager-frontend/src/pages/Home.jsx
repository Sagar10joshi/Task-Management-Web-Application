'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { getMe } from "../api/auth";
import {
  FiCheckCircle,
  FiEdit3,
  FiTrash2,
  FiTrendingUp,
  FiLayout,
  FiSmartphone,
  FiMenu,
  FiX,
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from 'react-icons/fi';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getMe();

        if (data?.success) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true },
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { staggerChildren: 0.1 },
    viewport: { once: true },
  };

  const staggerItem = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const floatingAnimation = {
    animate: { y: [0, -10, 0] },
    transition: { duration: 3, repeat: Infinity },
  };

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

  const tasks = [
    { title: 'Build Login Page', status: 'Completed' },
    { title: 'Connect Backend', status: 'Pending' },
    { title: 'Deploy Project', status: 'Pending' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Navbar */}
      <motion.nav
        ref={navRef}
        className={`fixed w-full top-0 z-40 transition-all duration-300 ${isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="text-xl font-bold text-slate-900">TaskFlow</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('features')}
                className="text-slate-700 hover:text-indigo-600 transition-colors font-medium"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-slate-700 hover:text-indigo-600 transition-colors font-medium"
              >
                How It Works
              </button>
              {/* <motion.button
                onClick={() =>  navigate("/Login")}
                className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Login
              </motion.button> */}
              {!isLoggedIn && (
                <motion.button
                  onClick={() => navigate("/Login")}
                  className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  Login
                </motion.button>
              )}
              <motion.button
                onClick={() =>
                  navigate(isLoggedIn ? "/Dashboard" : "/Register")
                }
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg transition-shadow font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden pb-4 bg-white/80 backdrop-blur-md rounded-lg mt-2"
            >
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-4 py-2 text-slate-700 hover:text-indigo-600"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left px-4 py-2 text-slate-700 hover:text-indigo-600"
              >
                How It Works
              </button>
              {/* <button
                onClick={() => navigate("/Login")}
                className="block w-full text-left px-4 py-2 text-indigo-600 font-medium"
              >
                Login
              </button> */}
              {!isLoggedIn && (
                <button
                  onClick={() => navigate("/Login")}
                  className="block w-full text-left px-4 py-2 text-indigo-600 font-medium"
                >
                  Login
                </button>
              )}
              <button
                onClick={() =>
                  navigate(isLoggedIn ? "/Dashboard" : "/Register")
                }
                className="block w-full text-left px-4 py-2 text-indigo-600 font-medium"
              >
                Get Started
              </button>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-indigo-200 to-transparent rounded-full blur-3xl opacity-30"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-purple-200 to-transparent rounded-full blur-3xl opacity-30"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div {...fadeInUp}>
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Manage Tasks Smarter, Faster & Better
              </motion.h1>
              <motion.p
                className="text-xl text-slate-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Organize your work, track progress, and boost productivity with a beautiful task management experience.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.button
                  onClick={() =>
                    navigate(isLoggedIn ? "/Dashboard" : "/Register")
                  }
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started <FiArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Features
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Content - Dashboard Preview */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative">
                {/* Main Card */}
                <motion.div
                  className="bg-white rounded-2xl shadow-2xl p-6 border border-slate-100"
                  {...floatingAnimation}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Dashboard</h3>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4">
                      <p className="text-xs text-slate-600 mb-1">Total Tasks</p>
                      <p className="text-2xl font-bold text-indigo-600">5</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                      <p className="text-xs text-slate-600 mb-1">Completed</p>
                      <p className="text-2xl font-bold text-green-600">2</p>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="space-y-3">
                    {tasks.map((task, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${task.status === 'Completed'
                            ? 'bg-green-500 border-green-500'
                            : 'border-slate-300'
                            }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{task.title}</p>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${task.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                            }`}
                        >
                          {task.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating Card 1 */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 w-48 border border-slate-100"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                >
                  <p className="text-xs text-slate-600 mb-2">Completion Rate</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full w-2/5 bg-gradient-to-r from-indigo-500 to-purple-500" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">40%</span>
                  </div>
                </motion.div>

                {/* Floating Card 2 */}
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 w-48 border border-slate-100"
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  <p className="text-xs text-slate-600 mb-3">Quick Stats</p>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 mb-1">Pending</p>
                      <p className="text-lg font-bold text-slate-900">3</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 mb-1">Done</p>
                      <p className="text-lg font-bold text-green-600">2</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Everything You Need To Stay Productive
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features designed to help you manage tasks efficiently and boost your productivity
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

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
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
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.1)' }}
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

      {/* Dashboard Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Your Productivity Dashboard
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See your tasks, progress, and achievements at a glance
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Dashboard Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">T</span>
                  </div>
                  <h3 className="text-white font-bold text-xl">TaskFlow Dashboard</h3>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Total Tasks', value: '5', color: 'indigo' },
                  { label: 'Completed', value: '2', color: 'green' },
                  { label: 'Pending', value: '3', color: 'yellow' },
                  { label: 'Success Rate', value: '40%', color: 'purple' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 rounded-xl p-6`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-sm text-slate-600 mb-2">{stat.label}</p>
                    <p className={`text-3xl font-bold text-${stat.color}-600`}>
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Task List */}
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 mb-4">Recent Tasks</h4>
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
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${task.status === 'Completed'
                        ? 'bg-green-500 border-green-500'
                        : 'border-slate-300'
                        }`}
                    >
                      {task.status === 'Completed' && (
                        <FiCheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{task.title}</p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${task.status === 'Completed'
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

      {/* CTA Section */}
      <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400 to-transparent rounded-full blur-3xl opacity-20"
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400 to-transparent rounded-full blur-3xl opacity-20"
            animate={{ y: [0, -50, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-12 md:p-16 text-center border border-indigo-500/20 backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Ready to Organize Your Workflow?
            </motion.h2>
            <motion.p
              className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Start managing your tasks with TaskFlow today and experience the difference
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() =>
                  navigate(isLoggedIn ? "/Dashboard" : "/Register")
                }
                className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Account <FiArrowRight className="w-5 h-5" />
              </motion.button>

              {!isLoggedIn && (
                <motion.button
                  onClick={() => navigate("/Login")}
                  className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-10 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Left Side - Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">T</span>
              </div>

              <div>
                <h3 className="text-white text-xl font-bold">
                  TaskFlow
                </h3>
                <p className="text-slate-400 text-sm">
                  Organize. Track. Succeed.
                </p>
              </div>
            </div>

            {/* Right Side - Message */}
            <div className="text-center md:text-right">
              <p className="text-slate-300 font-medium">
                Turn your goals into completed tasks.
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Stay focused, productive, and in control.
              </p>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 my-6" />

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-slate-400">
               © {new Date().getFullYear()} TaskFlow. All rights reserved.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Home;