'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiLogoProductHunt } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import toast from "react-hot-toast";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
        const res = await loginUser({
            email,
            password
        });

        toast.success("Login successful!");

        // console.log("Login success:", res);

        navigate("/dashboard");

    } catch (error) {
        console.log(error);
        toast.error(error.message || "Login failed");
    } finally {
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
            transition: { duration: 0.5, delay: 0.3 + i * 0.1 }
        })
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4"
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
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                TaskFlow
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                        <p className="text-slate-600 text-sm">Sign in to your account to continue</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <motion.div
                            custom={1}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors({ ...errors, email: '' });
                                }}
                                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${errors.email
                                        ? 'border-red-500 bg-red-50 focus:border-red-600'
                                        : 'border-slate-200 bg-slate-50 focus:border-indigo-500 focus:bg-white'
                                    }`}
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </motion.div>

                        {/* Password Input */}
                        <motion.div
                            custom={2}
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
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) setErrors({ ...errors, password: '' });
                                    }}
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none pr-10 ${errors.password
                                            ? 'border-red-500 bg-red-50 focus:border-red-600'
                                            : 'border-slate-200 bg-slate-50 focus:border-indigo-500 focus:bg-white'
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
                        </motion.div>

                        {/* Remember Me & Forgot Password */}
                        <motion.div
                            custom={3}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex items-center justify-between"
                        >
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-sm text-slate-700 font-medium">
                                    Remember me
                                </span>
                            </label>
                            {/* <a
                                href="#"
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                                Forgot password?
                            </a> */}
                        </motion.div>

                        {/* Login Button */}
                        <motion.button
                            custom={4}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </motion.button>

                        {/* Register Link */}
                        <motion.p
                            custom={5}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-center text-slate-700 text-sm"
                        >
                            Don&apos;t have an account?{' '}
                            <a
                                href="/register"
                                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                                Create one
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
