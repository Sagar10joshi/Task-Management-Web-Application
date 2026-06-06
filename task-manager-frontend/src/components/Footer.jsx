'use client';

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
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

          {/* Message */}
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
  );
}