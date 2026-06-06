'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiLogoProductHunt } from 'react-icons/bi';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth"; 
import toast from "react-hot-toast";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getPasswordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return { score: 0, label: '', color: '' };

    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    const strengths = [
      { score: 0, label: '', color: '' },
      { score: 1, label: 'Weak', color: 'bg-red-500' },
      { score: 2, label: 'Fair', color: 'bg-yellow-500' },
      { score: 3, label: 'Good', color: 'bg-blue-500' },
      { score: 4, label: 'Strong', color: 'bg-green-500' },
      { score: 5, label: 'Very Strong', color: 'bg-green-600' }
    ];

    return strengths[Math.min(score, 5)];
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await registerUser({
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      });

      toast.success("User registration successful!");

      // console.log("User registered:", res);

      // alert("Account created successfully!");

      navigate("/login");

    } catch (error) {
      console.log(error);

      // alert(error.message || "Registration failed");
      toast.error(error.message || "Registration failed");
    } 
    finally {
      setLoading(false);
    }
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.3 + i * 0.08 }
    })
  };

  const strengthScore = getPasswordStrength();

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-md">
        <motion.div
          className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo & Heading */}
          <motion.div
            className="text-center mb-8"
            custom={0}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              {/* <BiLogoProductHunt className="text-purple-600 text-3xl" /> */}
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                TaskFlow
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-600 text-sm">Join us and manage your tasks efficiently</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <motion.div
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${errors.fullName
                    ? 'border-red-500 bg-red-50 focus:border-red-600'
                    : 'border-slate-200 bg-slate-50 focus:border-purple-500 focus:bg-white'
                  }`}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </motion.div>

            {/* Email Input */}
            <motion.div
              custom={2}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${errors.email
                    ? 'border-red-500 bg-red-50 focus:border-red-600'
                    : 'border-slate-200 bg-slate-50 focus:border-purple-500 focus:bg-white'
                  }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </motion.div>

            {/* Password Input */}
            <motion.div
              custom={3}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none pr-10 ${errors.password
                      ? 'border-red-500 bg-red-50 focus:border-red-600'
                      : 'border-slate-200 bg-slate-50 focus:border-purple-500 focus:bg-white'
                    }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-700">
                      Password Strength
                    </span>
                    <span
                      className={`text-xs font-bold ${strengthScore.score === 1
                          ? 'text-red-500'
                          : strengthScore.score === 2
                            ? 'text-yellow-500'
                            : strengthScore.score === 3
                              ? 'text-blue-500'
                              : strengthScore.score >= 4
                                ? 'text-green-500'
                                : ''
                        }`}
                    >
                      {strengthScore.label}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${strengthScore.color}`}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(strengthScore.score / 5) * 100}%`
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Confirm Password Input */}
            <motion.div
              custom={4}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none pr-10 ${errors.confirmPassword
                      ? 'border-red-500 bg-red-50 focus:border-red-600'
                      : formData.confirmPassword &&
                        formData.password === formData.confirmPassword
                        ? 'border-green-500 bg-green-50 focus:border-green-600'
                        : 'border-slate-200 bg-slate-50 focus:border-purple-500 focus:bg-white'
                    }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
              {formData.confirmPassword &&
                formData.password === formData.confirmPassword && (
                  <div className="flex items-center gap-1 mt-1 text-green-600">
                    <BsCheckCircleFill size={14} />
                    <span className="text-xs font-medium">Passwords match</span>
                  </div>
                )}
            </motion.div>

            {/* Register Button */}
            <motion.button
              custom={5}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </motion.button>

            {/* Login Link */}
            <motion.p
              custom={6}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-center text-slate-700 text-sm"
            >
              Already have an account?{' '}
              <a
                href="/Login"
                className="font-semibold text-purple-600 hover:text-purple-700 transition-colors"
              >
                Sign in
              </a>
            </motion.p>
          </form>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          className="text-center text-white text-xs mt-6 opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 1 }}
        >
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </motion.p>
      </div>
    </motion.div>
  );
}
