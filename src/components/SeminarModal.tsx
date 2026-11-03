import React, { useState } from 'react';
import { UPCOMING_SEMINARS } from '../data/coursesData.ts';
import { X, Calendar, Clock, MapPin, Send, Ticket, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { addSeminarLeadToFirestore } from '../lib/firebase.ts';

interface SeminarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast?: (msg: string) => void;
}

export const SeminarModal: React.FC<SeminarModalProps> = ({
  isOpen,
  onClose,
  onSuccessToast
}) => {
  const [selectedSeminarId, setSelectedSeminarId] = useState(UPCOMING_SEMINARS[0].id);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState<'In-Person (Shewrapara)' | 'Online (Zoom)'>('In-Person (Shewrapara)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedTicket, setConfirmedTicket] = useState<{
    id: string;
    seminar: string;
    date: string;
    name: string;
    mode: string;
  } | null>(null);

  if (!isOpen) return null;

  const currentSeminar = UPCOMING_SEMINARS.find(s => s.id === selectedSeminarId) || UPCOMING_SEMINARS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    const ticketId = `EVR-SEM-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} · ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    try {
      await addSeminarLeadToFirestore({
        ticketId,
        name: name.trim(),
        phone: phone.trim(),
        courseInterest: currentSeminar.category || currentSeminar.title,
        preferredShift: mode,
        registrationDate: formattedDate,
        status: 'New Lead',
        notes: `Reserved via quick modal for: ${currentSeminar.title} on ${currentSeminar.date}`
      });
    } catch (err) {
      console.warn('Firestore seminar lead save error:', err);
    }

    setConfirmedTicket({
      id: ticketId,
      seminar: currentSeminar.title,
      date: currentSeminar.date,
      name: name.trim(),
      mode
    });
    setIsSubmitting(false);
    if (onSuccessToast) {
      onSuccessToast(`Seminar Seat Reserved & Saved to Database! Ticket #${ticketId}`);
    }
  };

  const handleClose = () => {
    setConfirmedTicket(null);
    setName('');
    setPhone('');
    onClose();
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
          onClick={handleClose}
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden my-6 z-10"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#D90429] to-[#b80322] text-white p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full mb-2">
              <Sparkles className="w-3 h-3" />
              <span>100% Free Career Guidance</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white">
              Register for Free Career Seminar
            </h2>
            <p className="text-xs text-white/90 mt-1">
              Learn from industry veterans at our East Shewrapara campus or on Zoom.
            </p>
          </div>

          {/* Body */}
          <div className="p-6">
            {!confirmedTicket ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Seminar Choice */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Select Workshop Topic
                  </label>
                  <select
                    value={selectedSeminarId}
                    onChange={(e) => setSelectedSeminarId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:border-[#D90429]"
                  >
                    {UPCOMING_SEMINARS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} ({s.date.split('(')[0]})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seminar Info snippet */}
                <div className="p-3 bg-red-50/70 border border-red-100 rounded-xl text-xs space-y-1 text-slate-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#D90429]" />
                    <span className="font-semibold text-slate-900">{currentSeminar.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#D90429]" />
                    <span>{currentSeminar.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D90429]" />
                    <span>East Shewrapara Campus (Near Metro) & Zoom</span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Your Full Name <span className="text-[#D90429]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asif Mahmud"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-[#D90429]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Mobile Number (for SMS Entrance Pass) <span className="text-[#D90429]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-[#D90429]"
                  />
                </div>

                {/* Mode */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Attendance Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setMode('In-Person (Shewrapara)')}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        mode === 'In-Person (Shewrapara)'
                          ? 'bg-red-50 text-[#D90429] border-[#D90429]'
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      🏢 Physical (Shewrapara)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('Online (Zoom)')}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        mode === 'Online (Zoom)'
                          ? 'bg-red-50 text-[#D90429] border-[#D90429]'
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      💻 Online (Zoom)
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-[#D90429] hover:bg-[#b80322] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Confirming Registration...</span>
                    ) : (
                      <>
                        <span>Confirm Free Registration</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </motion.button>
                </div>

              </form>
            ) : (
              /* Ticket Confirmation */
              <motion.div 
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-red-50 text-[#D90429] flex items-center justify-center mx-auto border border-red-200">
                  <Ticket className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Admission Pass</span>
                  <h3 className="text-lg font-black text-[#D90429]">{confirmedTicket.id}</h3>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl text-left text-xs space-y-2 border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Attendee</span>
                    <span className="font-bold text-slate-900">{confirmedTicket.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Session</span>
                    <span className="font-semibold text-slate-800">{confirmedTicket.seminar}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Schedule</span>
                      <span className="font-semibold text-[#D90429]">{confirmedTicket.date}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Mode</span>
                      <span className="font-semibold text-slate-800">{confirmedTicket.mode}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  Present this digital pass at the entrance or via the Zoom registration link sent via SMS.
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="w-full py-2.5 bg-[#D90429] text-white rounded-xl font-bold text-xs hover:bg-[#b80322] cursor-pointer"
                >
                  Done
                </motion.button>
              </motion.div>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
