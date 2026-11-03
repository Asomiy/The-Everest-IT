import React, { useState } from 'react';
import { Course } from '../data/coursesData.ts';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Layers, 
  Users, 
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { addEnrollmentToFirestore } from '../lib/firebase.ts';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onSuccessEnroll: (courseTitle: string, studentName: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onSuccessEnroll
}) => {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'enroll'>('syllabus');
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [paymentOption, setPaymentOption] = useState<'bKash' | 'Nagad' | 'Bank' | 'Campus Cash'>('bKash');
  const [batchSlot, setBatchSlot] = useState('Friday & Saturday (Evening)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enrolledReceipt, setEnrolledReceipt] = useState<{
    enrollmentId: string;
    studentName: string;
    studentPhone: string;
    courseTitle: string;
    fee: number;
    paymentOption: string;
    batchSlot: string;
  } | null>(null);

  if (!course) return null;

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim()) return;

    setIsSubmitting(true);
    const id = `EVR-ADM-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}`;

    try {
      await addEnrollmentToFirestore({
        enrollmentId: id,
        studentName: studentName.trim(),
        phone: studentPhone.trim(),
        course: course.title,
        batch: `Batch 48 (${batchSlot.split('(')[0].trim()})`,
        feePaid: course.fee,
        totalFee: course.fee,
        paymentMethod: paymentOption,
        date: formattedDate,
        status: 'Pending Verification'
      });
    } catch (err) {
      console.warn('Firestore enrollment error:', err);
    }

    setEnrolledReceipt({
      enrollmentId: id,
      studentName: studentName.trim(),
      studentPhone: studentPhone.trim(),
      courseTitle: course.title,
      fee: course.fee,
      paymentOption,
      batchSlot
    });
    setIsSubmitting(false);
    onSuccessEnroll(course.title, studentName);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
        
        {/* Backdrop click to dismiss */}
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
          className="relative bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 z-10"
        >
          {/* Modal Header */}
          <div className="relative bg-gradient-to-r from-slate-900 to-[#1D1E2C] text-white p-6 sm:p-8 overflow-hidden">
            {/* Background Illustration Scrim */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-25 pointer-events-none hidden md:block overflow-hidden">
              <img
                src={course.thumbnail}
                alt=""
                className="w-full h-full object-cover mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1D1E2C] to-transparent" />
            </div>

            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase mb-2 border border-red-500/30">
              <span>{course.category}</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
              {course.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-xl">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-slate-800 text-xs text-slate-200">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D90429]" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#D90429]" />
                <span>{course.lectures} Lectures</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#D90429]" />
                <span>{course.projects} Live Projects</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{course.seatsRemaining} Seats Remaining</span>
              </div>
            </div>
          </div>

          {/* Modal Tab Switcher */}
          <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-4">
            <button
              onClick={() => setActiveTab('syllabus')}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer relative ${
                activeTab === 'syllabus'
                  ? 'border-[#D90429] text-[#D90429]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Complete Course Syllabus
            </button>
            <button
              onClick={() => setActiveTab('enroll')}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 relative ${
                activeTab === 'enroll'
                  ? 'border-[#D90429] text-[#D90429]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Admission & Enrollment</span>
              <span className="bg-[#D90429] text-white text-[10px] px-1.5 py-0.2 rounded-full">
                {course.fee.toLocaleString()}৳
              </span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
            {activeTab === 'syllabus' ? (
              <div className="space-y-6">
                
                {/* Instructor Card */}
                <div className="p-4 rounded-2xl bg-red-50/60 border border-red-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#D90429] uppercase tracking-wider block">Course Mentor</span>
                    <div className="font-extrabold text-[#1D1E2C] text-sm sm:text-base">{course.instructor.name}</div>
                    <div className="text-xs text-slate-600">{course.instructor.role} · {course.instructor.experience}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#D90429] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {course.instructor.name.charAt(0)}
                  </div>
                </div>

                {/* Tools Covered */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Tools & Technologies Taught
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modules Accordion */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Curriculum Breakdown
                  </h4>
                  <div className="space-y-3">
                    {course.modules.map((mod, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-red-200 transition-colors"
                      >
                        <h5 className="font-bold text-xs sm:text-sm text-[#1D1E2C] mb-2 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-red-100 text-[#D90429] text-[11px] font-extrabold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <span>{mod.title}</span>
                        </h5>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-7 text-xs text-slate-600">
                          {mod.topics.map((t, tidx) => (
                            <li key={tidx} className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#D90429]" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 line-through">{course.originalFee.toLocaleString()}৳</div>
                    <div className="text-2xl font-black text-[#D90429]">{course.fee.toLocaleString()}৳ BDT</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab('enroll')}
                    className="px-6 py-3 bg-[#D90429] hover:bg-[#b80322] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md cursor-pointer"
                  >
                    Proceed to Enrollment →
                  </motion.button>
                </div>

              </div>
            ) : (
              /* Enrollment Form or Receipt */
              <div>
                {!enrolledReceipt ? (
                  <form onSubmit={handleEnrollSubmit} className="space-y-4">
                    <div className="p-4 bg-red-50/70 rounded-xl border border-red-100 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-500">Selected Course</div>
                        <div className="font-bold text-sm text-[#1D1E2C]">{course.title}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500">Total Admission Fee</div>
                        <div className="text-xl font-extrabold text-[#D90429]">{course.fee.toLocaleString()}৳</div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Student Full Name <span className="text-[#D90429]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Mahir Faisal"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Active Mobile Phone (for SMS Confirmation) <span className="text-[#D90429]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={studentPhone}
                        onChange={(e) => setStudentPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Preferred Batch Timing
                      </label>
                      <select
                        value={batchSlot}
                        onChange={(e) => setBatchSlot(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429]"
                      >
                        <option value="Friday & Saturday (Evening 5:00 PM - 8:00 PM)">Friday & Saturday (Evening 5:00 PM - 8:00 PM)</option>
                        <option value="Sunday & Tuesday (Morning 10:00 AM - 1:00 PM)">Sunday & Tuesday (Morning 10:00 AM - 1:00 PM)</option>
                        <option value="Monday & Wednesday (Evening 6:00 PM - 9:00 PM)">Monday & Wednesday (Evening 6:00 PM - 9:00 PM)</option>
                        <option value="Online Zoom Hybrid (Fri & Sat Night 8:30 PM)">Online Zoom Hybrid (Fri & Sat Night 8:30 PM)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Payment / Admission Method
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(['bKash', 'Nagad', 'Bank', 'Campus Cash'] as const).map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentOption(method)}
                            className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                              paymentOption === method
                                ? 'bg-red-50 text-[#D90429] border-[#D90429] shadow-xs'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3.5 px-6 rounded-xl bg-[#D90429] text-white font-extrabold text-sm hover:bg-[#b80322] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Confirming Admission Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Complete Admission Registration</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </div>

                    <p className="text-[11px] text-center text-slate-500">
                      ℹ️ You can also complete your registration directly at our East Shewrapara campus desk.
                    </p>
                  </form>
                ) : (
                  /* Admission Confirmation Slip */
                  <div className="p-6 bg-red-50/50 rounded-2xl border-2 border-[#D90429] text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-extrabold text-[#1D1E2C]">
                      Admission Confirmed!
                    </h3>

                    <div className="p-4 bg-white rounded-xl border border-slate-200 text-left text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Enrollment ID:</span>
                        <span className="font-mono font-bold text-[#D90429]">{enrolledReceipt.enrollmentId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Student Name:</span>
                        <span className="font-bold text-slate-800">{enrolledReceipt.studentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Course:</span>
                        <span className="font-bold text-slate-800">{enrolledReceipt.courseTitle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Course Fee:</span>
                        <span className="font-bold text-[#D90429]">{enrolledReceipt.fee.toLocaleString()}৳ BDT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Batch Schedule:</span>
                        <span className="font-semibold text-slate-700">{enrolledReceipt.batchSlot}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Payment Channel:</span>
                        <span className="font-semibold text-slate-700">{enrolledReceipt.paymentOption}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600">
                      An SMS confirmation has been dispatched to <strong>{enrolledReceipt.studentPhone}</strong>. Our admission counselor will call you within 2 hours.
                    </p>

                    <div className="pt-2 flex items-center justify-center gap-3">
                      <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-[#D90429] text-white rounded-xl font-bold text-xs hover:bg-[#b80322] cursor-pointer"
                      >
                        Close & Return to Courses
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
