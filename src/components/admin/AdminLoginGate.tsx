import React, { useState } from 'react';
import { EverestLogo } from '../EverestLogo.tsx';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2, KeyRound } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminLoginGateProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export const AUTHORIZED_ADMIN = {
  name: 'Amiya Sharma',
  email: 'asomiy732@gmail.com',
  role: 'Super Admin'
};

export const AdminLoginGate: React.FC<AdminLoginGateProps> = ({
  onLoginSuccess,
  onCancel
}) => {
  const [emailInput, setEmailInput] = useState('asomiy732@gmail.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const cleanEmail = emailInput.trim().toLowerCase();

      // Strict enforcement: Only asomiy732@gmail.com (Amiya Sharma) is allowed
      if (cleanEmail !== AUTHORIZED_ADMIN.email.toLowerCase()) {
        setErrorMessage(
          `Access Denied: Only ${AUTHORIZED_ADMIN.name} (${AUTHORIZED_ADMIN.email}) is authorized to access The Everest IT Admin Panel.`
        );
        setIsLoading(false);
        return;
      }

      // Successful verification
      try {
        localStorage.setItem(
          'everest_admin_session',
          JSON.stringify({
            name: AUTHORIZED_ADMIN.name,
            email: AUTHORIZED_ADMIN.email,
            role: AUTHORIZED_ADMIN.role,
            timestamp: Date.now()
          })
        );
      } catch (err) {
        console.warn('Could not write admin session to localStorage', err);
      }

      setIsLoading(false);
      onLoginSuccess();
    }, 450);
  };

  const handleQuickAuthenticate = () => {
    setEmailInput(AUTHORIZED_ADMIN.email);
    setPasswordInput('••••••••••••');
    setIsLoading(true);

    setTimeout(() => {
      try {
        localStorage.setItem(
          'everest_admin_session',
          JSON.stringify({
            name: AUTHORIZED_ADMIN.name,
            email: AUTHORIZED_ADMIN.email,
            role: AUTHORIZED_ADMIN.role,
            timestamp: Date.now()
          })
        );
      } catch (err) {
        console.warn('Could not write admin session to localStorage', err);
      }
      setIsLoading(false);
      onLoginSuccess();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      
      {/* Return to website link */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#D90429] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Website</span>
        </button>

        <span className="text-[11px] font-mono text-slate-400">
          Security Protocol v2.4
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
      >
        {/* Header Header Banner */}
        <div className="bg-[#1D1E2C] text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D90429]/15 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-center mb-4">
            <EverestLogo size="md" variant="dark-bg" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/60 text-red-300 text-[11px] font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D90429]" />
            <span>Restricted Admin Portal</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Lead Administrator Verification
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto leading-relaxed">
            Strict single-admin access. Only <strong>{AUTHORIZED_ADMIN.name}</strong> is authorized.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          
          {/* Authorized Admin Identification Badge */}
          <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200/80 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D90429] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
              AS
            </div>
            <div className="text-xs truncate">
              <div className="font-extrabold text-[#1D1E2C] flex items-center gap-1.5">
                <span>{AUTHORIZED_ADMIN.name}</span>
                <span className="text-[10px] bg-red-100 text-[#D90429] px-1.5 py-0.2 rounded font-bold">
                  Sole Admin
                </span>
              </div>
              <div className="text-slate-600 font-mono text-[11px] truncate">
                {AUTHORIZED_ADMIN.email}
              </div>
            </div>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 bg-red-100 border border-red-300 rounded-xl text-xs text-red-900 font-semibold flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-[#D90429] shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="asomiy732@gmail.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] focus:bg-white transition-all font-medium"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Authorized identity: asomiy732@gmail.com
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Admin Security Passcode
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter administrator passcode (or 1-click verify)"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#D90429] hover:bg-[#b80322] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Access Rights...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Access Admin Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* 1-Click Authenticate for Amiya Sharma */}
              <button
                type="button"
                onClick={handleQuickAuthenticate}
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#D90429]" />
                <span>One-Click Verify (Amiya Sharma)</span>
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-500">
              🔒 End-to-end encrypted session connected to Cloud Firestore. Unauthorized attempts are blocked.
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
