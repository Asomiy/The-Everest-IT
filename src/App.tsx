/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { CoursesSection } from './components/CoursesSection.tsx';
import { PillarsSection } from './components/PillarsSection.tsx';
import { SeminarSection } from './components/SeminarSection.tsx';
import { CampusShowcase } from './components/CampusShowcase.tsx';
import { Footer } from './components/Footer.tsx';
import { CourseDetailModal } from './components/CourseDetailModal.tsx';
import { SeminarModal } from './components/SeminarModal.tsx';
import { StudentPortalModal } from './components/StudentPortalModal.tsx';
import { AdminDashboard } from './components/admin/AdminDashboard.tsx';
import { AdminLoginGate } from './components/admin/AdminLoginGate.tsx';
import { Course } from './data/coursesData.ts';
import { Phone, CheckCircle, X, Shield, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [viewMode, setViewMode] = useState<'website' | 'admin'>('website');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('everest_admin_session');
      if (!saved) return false;
      const parsed = JSON.parse(saved);
      return parsed?.email?.toLowerCase() === 'asomiy732@gmail.com';
    } catch {
      return false;
    }
  });
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isSeminarModalOpen, setIsSeminarModalOpen] = useState(false);
  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleExploreCourses = () => {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookFreeSeminar = () => {
    const el = document.getElementById('seminars');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsSeminarModalOpen(true);
    }
  };

  // Section observer to update active nav link on the public website
  useEffect(() => {
    if (viewMode !== 'website') return;

    const sections = ['home', 'courses', 'why-us', 'seminars', 'about-us', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  return (
    <div className="min-h-screen bg-white text-[#1D1E2C] flex flex-col font-sans selection:bg-[#D90429] selection:text-white">
      
      {/* Toast Notification Container with AnimatePresence */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="bg-[#1D1E2C] text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs max-w-sm">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold">{toastMessage}</span>
              <button
                onClick={() => setToastMessage(null)}
                className="ml-auto text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating View Switcher Pill (Always Available) */}
      <div className="fixed top-20 right-4 z-40 hidden sm:block">
        <div className="bg-[#1D1E2C]/90 backdrop-blur-md text-white p-1 rounded-full shadow-lg border border-slate-700 flex items-center gap-1 text-[11px] font-bold">
          <button
            onClick={() => setViewMode('website')}
            className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
              viewMode === 'website'
                ? 'bg-[#D90429] text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>Website</span>
          </button>
          <button
            onClick={() => setViewMode('admin')}
            className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
              viewMode === 'admin'
                ? 'bg-[#D90429] text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Shield className="w-3 h-3" />
            <span>Admin Panel</span>
          </button>
        </div>
      </div>

      {viewMode === 'admin' ? (
        /* ==================== ADMIN DASHBOARD / AUTH GATE ==================== */
        !isAdminAuthenticated ? (
          <AdminLoginGate
            onLoginSuccess={() => {
              setIsAdminAuthenticated(true);
              showToast('Admin Session Verified: Welcome, Amiya Sharma');
            }}
            onCancel={() => setViewMode('website')}
          />
        ) : (
          <AdminDashboard
            onExitToWebsite={() => setViewMode('website')}
            onShowToast={showToast}
            onLogout={() => {
              try {
                localStorage.removeItem('everest_admin_session');
              } catch {}
              setIsAdminAuthenticated(false);
              setViewMode('website');
              showToast('Logged out of Admin Session.');
            }}
          />
        )
      ) : (
        /* ==================== PUBLIC WEBSITE VIEW ==================== */
        <>
          {/* 1. Header Top Bar: Crimson Red background, Hotline, Email, Seminar alert, and Admin toggle */}
          <TopBar
            onOpenSeminarModal={() => setIsSeminarModalOpen(true)}
            onOpenAdminPanel={() => setViewMode('admin')}
          />

          {/* 2. Main Navbar: Clean white sticky background, Everest logo, links, right action buttons */}
          <Navbar
            onOpenSeminarModal={() => setIsSeminarModalOpen(true)}
            onOpenStudentPortalModal={() => setIsStudentPortalOpen(true)}
            activeSection={activeSection}
          />

          <main className="flex-1">
            {/* 3. Hero Section: Clean white/light gray gradient, H1, impact counter cards (50+, 4200+, 90%) */}
            <HeroSection
              onExploreCourses={handleExploreCourses}
              onBookFreeSeminar={handleBookFreeSeminar}
            />

            {/* 4. Course Categories & Cards Grid: Soft off-white, filter tabs with active Crimson Red, course cards with red price tags */}
            <CoursesSection onSelectCourse={(course) => setSelectedCourse(course)} />

            {/* 5. Why We Are Different (5 Pillars): 5 minimalist white cards with clean red vector icons */}
            <PillarsSection />

            {/* 6. Free Seminars & Lead Form: Section split with light red container on form side, solid red register button */}
            <SeminarSection onSuccessToast={showToast} />

            {/* 7. Student Project Showcase & Testimonials */}
            <CampusShowcase />
          </main>

          {/* 8. Footer: Deep Charcoal Black, Head Office Address in East Shewrapara, phone, Everest logo, Admin link */}
          <Footer
            onOpenSeminarModal={() => setIsSeminarModalOpen(true)}
            onOpenStudentPortalModal={() => setIsStudentPortalOpen(true)}
            onOpenAdminPanel={() => setViewMode('admin')}
          />

          {/* Floating Action Button for Quick Contact / Hotline */}
          <aside aria-label="Quick Contact Hotline" className="fixed bottom-6 left-6 z-30 flex flex-col gap-2">
            <motion.a
              href="tel:+8801776057078"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2.5 bg-white text-[#1D1E2C] border-2 border-[#D90429] px-3.5 py-2.5 rounded-full shadow-lg hover:bg-red-50 transition-colors"
              title="Direct Call Hotline: +8801776057078"
            >
              <div className="w-6 h-6 rounded-full bg-[#D90429] text-white flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-extrabold text-[#D90429] hidden sm:inline">
                +8801776057078
              </span>
            </motion.a>
          </aside>

          {/* Course Detail & Enrollment Modal */}
          <CourseDetailModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
            onSuccessEnroll={(courseTitle, studentName) => {
              showToast(`Admission inquiry for "${courseTitle}" confirmed for ${studentName}!`);
            }}
          />

          {/* Seminar Registration Modal */}
          <SeminarModal
            isOpen={isSeminarModalOpen}
            onClose={() => setIsSeminarModalOpen(false)}
            onSuccessToast={showToast}
          />

          {/* Student LMS Portal Modal */}
          <StudentPortalModal
            isOpen={isStudentPortalOpen}
            onClose={() => setIsStudentPortalOpen(false)}
          />
        </>
      )}

    </div>
  );
}
