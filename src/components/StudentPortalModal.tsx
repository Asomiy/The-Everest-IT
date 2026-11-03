import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Video, 
  Download, 
  Award, 
  Clock, 
  Sparkles,
  LogOut
} from 'lucide-react';
import { EverestLogo } from './EverestLogo.tsx';
import { motion, AnimatePresence } from 'motion/react';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  isOpen,
  onClose
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim() || !password.trim()) {
      setErrorMsg('Please enter Student ID and Password.');
      return;
    }
    setErrorMsg('');
    setIsLoggedIn(true);
  };

  const handleDemoLogin = () => {
    setStudentId('EVR-2026-B44-089');
    setPassword('••••••••');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStudentId('');
    setPassword('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
        
        {/* Backdrop click dismiss */}
        <motion.div 
          className="fixed inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 z-10"
        >
          {/* Top Header */}
          <div className="bg-[#1D1E2C] text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
            <EverestLogo size="sm" variant="dark-bg" />
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {!isLoggedIn ? (
                /* Login View */
                <motion.div 
                  key="login"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-md mx-auto"
                >
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#D90429] flex items-center justify-center mx-auto mb-3 border border-red-100">
                      <User className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#1D1E2C]">Student LMS Portal</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Access live class links, lecture recordings, quizzes, and assignment submissions.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="mb-4 p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-[#D90429] font-semibold text-center">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Student ID / Registered Phone
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          placeholder="e.g. EVR-2026-B44-089 or 017..."
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-[#D90429]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        LMS Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-[#D90429]"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3 bg-[#D90429] hover:bg-[#b80322] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      Log In to Student Portal
                    </motion.button>
                  </form>

                  {/* Quick Demo Preview Button */}
                  <div className="mt-5 pt-4 border-t border-slate-100 text-center">
                    <p className="text-[11px] text-slate-400 mb-2">Want to inspect the student dashboard?</p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={handleDemoLogin}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100/70 border border-red-200 text-[#D90429] font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Preview Active Student Dashboard</span>
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                /* Logged-in Dashboard View */
                <motion.div 
                  key="dashboard"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  
                  {/* Student Profile Card */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#D90429] text-white flex items-center justify-center font-black text-lg">
                        FC
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-[#1D1E2C] text-sm sm:text-base">Md. Fahim Chowdhury</h4>
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            ACTIVE
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">
                          ID: <span className="font-mono text-slate-700 font-semibold">EVR-B44-089</span> · Batch 44 (Full-Stack MERN)
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#D90429] font-semibold cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>

                  {/* Quick Academic KPI Strip */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                      <div className="text-xs text-slate-400 uppercase font-bold text-[10px]">Attendance</div>
                      <div className="text-xl font-extrabold text-[#D90429]">94%</div>
                      <div className="text-[10px] text-emerald-600 font-semibold">Good Standing</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                      <div className="text-xs text-slate-400 uppercase font-bold text-[10px]">Projects</div>
                      <div className="text-xl font-extrabold text-slate-800">5 / 6</div>
                      <div className="text-[10px] text-slate-500">Passed Review</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                      <div className="text-xs text-slate-400 uppercase font-bold text-[10px]">Course Progress</div>
                      <div className="text-xl font-extrabold text-[#D90429]">78%</div>
                      <div className="text-[10px] text-slate-500">Week 10 of 14</div>
                    </div>
                  </div>

                  {/* Next Upcoming Live Class Alert */}
                  <div className="p-4 bg-red-50 rounded-xl border border-red-200 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#D90429]">Next Live Session</div>
                      <div className="font-bold text-xs sm:text-sm text-[#1D1E2C]">Class 21: RESTful API Auth & JWT Tokens</div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <Clock className="w-3 h-3 text-[#D90429]" />
                        <span>Tomorrow, 6:00 PM (Lab 02, Shewrapara & Zoom)</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open('https://zoom.us', '_blank')}
                      className="px-3.5 py-2 bg-[#D90429] text-white text-xs font-bold rounded-lg hover:bg-[#b80322] shrink-0 cursor-pointer"
                    >
                      Join Zoom Room
                    </motion.button>
                  </div>

                  {/* Recent Recordings & Resources */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                      Recent Lecture Materials
                    </h5>
                    <div className="space-y-2">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <Video className="w-4 h-4 text-[#D90429]" />
                          <div>
                            <span className="font-semibold text-slate-800 block">Class 20 Recording: Express Middleware Pipeline</span>
                            <span className="text-[10px] text-slate-400">Duration: 1h 48m · High Definition</span>
                          </div>
                        </div>
                        <button className="text-xs font-bold text-[#D90429] hover:underline cursor-pointer">
                          Watch Video
                        </button>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <Download className="w-4 h-4 text-[#D90429]" />
                          <div>
                            <span className="font-semibold text-slate-800 block">Starter Repository & Boilerplate Zip</span>
                            <span className="text-[10px] text-slate-400">Git repo · 4.2 MB</span>
                          </div>
                        </div>
                        <button className="text-xs font-bold text-[#D90429] hover:underline cursor-pointer">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Verification Status */}
                  <div className="p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Award className="w-4 h-4 text-[#D90429]" />
                      <span>Certificate Status: <strong>Eligible after Capstone 6 Evaluation</strong></span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">EST: DEC 2026</span>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
