import React, { useState } from 'react';
import { UPCOMING_SEMINARS, Seminar } from '../data/coursesData.ts';
import { Calendar, Clock, MapPin, User, CheckCircle2, Ticket, Sparkles, Send, Phone, Mail, Award, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { addSeminarLeadToFirestore } from '../lib/firebase.ts';

interface SeminarSectionProps {
  onSuccessToast?: (msg: string) => void;
}

export const SeminarSection: React.FC<SeminarSectionProps> = ({ onSuccessToast }) => {
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar>(UPCOMING_SEMINARS[0]);
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [courseInterest, setCourseInterest] = useState('Graphic Design for Freelancing');
  const [attendanceMode, setAttendanceMode] = useState<'In-Person (Shewrapara)' | 'Online (Zoom)'>('In-Person (Shewrapara)');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketData, setTicketData] = useState<{
    ticketId: string;
    name: string;
    phone: string;
    seminarTitle: string;
    date: string;
    time: string;
    mode: string;
  } | null>(null);

  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    const cleanPhone = phone.trim().replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setFormError('Please provide a valid 11-digit mobile phone number (e.g. 01776057078).');
      return;
    }

    setIsSubmitting(true);
    const generatedTicketId = `EVR-SEM-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} · ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    try {
      // Direct persistence into Firebase Firestore
      await addSeminarLeadToFirestore({
        ticketId: generatedTicketId,
        name: fullName.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        courseInterest: courseInterest,
        preferredShift: attendanceMode,
        registrationDate: formattedDate,
        status: 'New Lead',
        notes: `Registered for: ${selectedSeminar.title} (${selectedSeminar.date})`
      });
    } catch (err) {
      console.warn('Firestore submission fallback:', err);
    }

    setTicketData({
      ticketId: generatedTicketId,
      name: fullName.trim(),
      phone: cleanPhone,
      seminarTitle: selectedSeminar.title,
      date: selectedSeminar.date,
      time: selectedSeminar.time,
      mode: attendanceMode
    });
    setIsSubmitting(false);
    if (onSuccessToast) {
      onSuccessToast(`Registration Confirmed & Synced to Database! Ticket #${generatedTicketId}`);
    }
  };

  const handleReset = () => {
    setTicketData(null);
    setFullName('');
    setPhone('');
    setEmail('');
  };

  return (
    <section id="seminars" className="py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100/60 text-[#D90429] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Complimentary Career Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D1E2C] tracking-tight">
            Attend Free Career Counseling & Skill Seminars
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Unsure which IT skill aligns with your ambition? Join our weekly free offline or online workshop, meet lead mentors, review live portfolios, and get direct answers.
          </p>
        </motion.div>

        {/* Section Split Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          
          {/* Left Column (Clean White Container with Seminar Details & Photo) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            
            <div>
              {/* Seminar Selector Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none border-b border-slate-100">
                {UPCOMING_SEMINARS.map((sem, idx) => (
                  <button
                    key={sem.id}
                    onClick={() => setSelectedSeminar(sem)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
                      selectedSeminar.id === sem.id
                        ? 'bg-red-50 text-[#D90429] border border-red-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>Session {idx + 1}: {sem.category}</span>
                  </button>
                ))}
              </div>

              {/* Seminar Photo Banner */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-slate-100 border border-slate-200/70 shadow-xs">
                <img
                  src="/src/assets/images/seminar_career_session_1793682946650.jpg"
                  alt="Career Counseling Seminar at The Everest IT"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
                  <span className="bg-[#D90429] px-2.5 py-1 rounded-md font-bold text-[11px]">
                    Free Entry · Pre-Registration Required
                  </span>
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/20">
                    {selectedSeminar.seatsLeft} Seats Remaining
                  </span>
                </div>
              </div>

              {/* Seminar Title & Speaker */}
              <h3 className="text-xl sm:text-2xl font-bold text-[#1D1E2C] leading-snug">
                {selectedSeminar.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#D90429] mt-1.5 flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#D90429]" />
                <span>Instructor: {selectedSeminar.speaker} ({selectedSeminar.speakerTitle})</span>
              </p>

              {/* Schedule Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D90429] shrink-0" />
                  <span className="font-semibold text-slate-900">{selectedSeminar.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D90429] shrink-0" />
                  <span className="font-semibold text-slate-900">{selectedSeminar.time}</span>
                </div>
                <div className="sm:col-span-2 flex items-start gap-2 pt-1 border-t border-slate-200/60">
                  <MapPin className="w-4 h-4 text-[#D90429] shrink-0 mt-0.5" />
                  <span>
                    <strong>Venue:</strong> {selectedSeminar.location} (888/1, 3rd Floor, Hazi Ashraf Ali Market, East Shewrapara, Mirpur)
                  </span>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="mt-5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  What You Will Learn In This Session:
                </h4>
                {selectedSeminar.keyTakeaways.map((point, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#D90429] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro Trust Note */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500">
              <Award className="w-4 h-4 text-[#D90429]" />
              <span>Free Certificate of Participation & Instant Admission Discount of up to 30% for all attendees.</span>
            </div>

          </div>

          {/* Right Column (Striking Light Red Background on the Form Side) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#FFF5F5] via-[#FEE2E2]/60 to-[#FDEED9]/50 p-6 sm:p-10 border-t lg:border-t-0 lg:border-l border-red-200/70 flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {!ticketData ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Form Title */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D90429] uppercase tracking-wider bg-red-100 px-2 py-0.5 rounded-md mb-2">
                      <Sparkles className="w-3 h-3" />
                      <span>Instant Booking</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#1D1E2C]">
                      Book Your Free Seat
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Fill the quick form below. You will receive an instant digital ticket & SMS reminder.
                    </p>
                  </div>

                  {/* Form Error */}
                  {formError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-red-100 border border-red-300 rounded-xl text-xs text-red-800 font-semibold"
                    >
                      {formError}
                    </motion.div>
                  )}

                  {/* Lead Form Inputs */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#1D1E2C] mb-1">
                        Full Name <span className="text-[#D90429]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Tanvir Rahman"
                          className="w-full pl-10 pr-3 py-2.5 bg-white border border-red-200/80 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-[#1D1E2C] mb-1">
                        Phone Number (Active for SMS) <span className="text-[#D90429]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="017XXXXXXXX"
                          className="w-full pl-10 pr-3 py-2.5 bg-white border border-red-200/80 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Email (Optional) */}
                    <div>
                      <label className="block text-xs font-bold text-[#1D1E2C] mb-1">
                        Email Address (Optional)
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yourname@gmail.com"
                          className="w-full pl-10 pr-3 py-2.5 bg-white border border-red-200/80 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Course Interest Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-[#1D1E2C] mb-1">
                        Primary Course Interest <span className="text-[#D90429]">*</span>
                      </label>
                      <select
                        value={courseInterest}
                        onChange={(e) => setCourseInterest(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-red-200/80 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] shadow-xs"
                      >
                        <option value="Graphic Design for Freelancing">Graphic Design for Freelancing (10,000৳)</option>
                        <option value="Full-Stack Web Development (MERN)">Full-Stack Web Development - MERN (15,000৳)</option>
                        <option value="Digital Marketing & SEO Mastery">Digital Marketing & SEO Mastery (10,000৳)</option>
                        <option value="UI/UX Product Design & Figma">UI/UX Product Design & Figma (12,000৳)</option>
                        <option value="Network & Cyber Security Engineering">Network & Cyber Security Engineering (16,000৳)</option>
                        <option value="Python, Django & Machine Learning">Python, Django & Machine Learning (14,000৳)</option>
                        <option value="Motion Graphics & Video Editing">Motion Graphics & Video Editing (12,000৳)</option>
                      </select>
                    </div>

                    {/* Attendance Mode */}
                    <div>
                      <label className="block text-xs font-bold text-[#1D1E2C] mb-1.5">
                        How will you attend?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setAttendanceMode('In-Person (Shewrapara)')}
                          className={`p-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                            attendanceMode === 'In-Person (Shewrapara)'
                              ? 'bg-white text-[#D90429] border-[#D90429] shadow-xs'
                              : 'bg-white/60 text-slate-600 border-red-100 hover:bg-white'
                          }`}
                        >
                          🏢 In-Person (Shewrapara)
                        </button>
                        <button
                          type="button"
                          onClick={() => setAttendanceMode('Online (Zoom)')}
                          className={`p-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                            attendanceMode === 'Online (Zoom)'
                              ? 'bg-white text-[#D90429] border-[#D90429] shadow-xs'
                              : 'bg-white/60 text-slate-600 border-red-100 hover:bg-white'
                          }`}
                        >
                          💻 Live on Zoom
                        </button>
                      </div>
                    </div>

                    {/* Bold Solid Red "Register Free Seminar" submit button */}
                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02, backgroundColor: '#b80322' }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#D90429] text-white font-extrabold text-sm sm:text-base shadow-md shadow-red-600/30 cursor-pointer disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Generating Free Ticket...</span>
                          </>
                        ) : (
                          <>
                            <span>Register Free Seminar</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </div>

                    <p className="text-[11px] text-center text-slate-500 pt-1">
                      🔒 Zero spam. We only send seminar entrance pass & venue details.
                    </p>
                  </form>
                </motion.div>
              ) : (
                /* Seminar Ticket Confirmation Pass with Stamp Entrance Animation */
                <motion.div 
                  key="ticket"
                  initial={{ opacity: 0, scale: 0.85, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="bg-white rounded-2xl p-6 border-2 border-dashed border-[#D90429] shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-[#D90429] flex items-center justify-center font-bold">
                        <Ticket className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Admission Ticket</div>
                        <div className="text-xs font-extrabold text-[#D90429]">{ticketData.ticketId}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      CONFIRMED
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Attendee Name</span>
                      <span className="font-bold text-slate-900 text-sm">{ticketData.name}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Registered Mobile</span>
                      <span className="font-semibold text-slate-800">{ticketData.phone}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Seminar Title</span>
                      <span className="font-semibold text-slate-800">{ticketData.seminarTitle}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Date & Time</span>
                        <span className="font-semibold text-[#D90429]">{ticketData.date}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Attendance</span>
                        <span className="font-semibold text-slate-800">{ticketData.mode}</span>
                      </div>
                    </div>
                  </div>

                  {/* Venue reminder */}
                  <div className="mt-4 p-2.5 bg-red-50 rounded-lg text-[11px] text-slate-700">
                    📍 <strong>Venue:</strong> 888/1, 3rd Floor, Hazi Ashraf Ali Market, East Shewrapara (Near Metro Station).
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.print()}
                      className="flex-1 py-2 text-xs font-bold text-white bg-[#D90429] rounded-lg hover:bg-[#b80322] text-center cursor-pointer"
                    >
                      Print / Save Pass
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleReset}
                      className="py-2 px-3 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer"
                    >
                      New Registration
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
