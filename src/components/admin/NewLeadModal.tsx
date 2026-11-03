import React, { useState } from 'react';
import { X, User, Phone, Mail, Calendar, Send, Sparkles } from 'lucide-react';
import { SeminarLead } from '../../data/adminMockData.ts';

interface NewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: Omit<SeminarLead, 'id' | 'ticketId' | 'registrationDate'>) => void;
}

export const NewLeadModal: React.FC<NewLeadModalProps> = ({
  isOpen,
  onClose,
  onAddLead
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [courseInterest, setCourseInterest] = useState('Graphic Design for Freelancing');
  const [preferredShift, setPreferredShift] = useState<'In-Person (Shewrapara)' | 'Online (Zoom)'>('In-Person (Shewrapara)');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    onAddLead({
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      courseInterest,
      preferredShift,
      status: 'New Lead',
      notes
    });

    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        
        <div className="bg-[#1D1E2C] text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D90429]" />
            <h3 className="font-extrabold text-sm sm:text-base">Add New Seminar Lead</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Student Full Name <span className="text-[#D90429]">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sazzad Hossain"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-[#D90429]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Contact Phone Number <span className="text-[#D90429]">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="017XXXXXXXX"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-[#D90429]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Course Interest
            </label>
            <select
              value={courseInterest}
              onChange={(e) => setCourseInterest(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-[#D90429]"
            >
              <option value="Graphic Design for Freelancing">Graphic Design for Freelancing</option>
              <option value="Full-Stack Web Development (MERN)">Full-Stack Web Development (MERN)</option>
              <option value="Digital Marketing & SEO Mastery">Digital Marketing & SEO Mastery</option>
              <option value="UI/UX Product Design & Figma">UI/UX Product Design & Figma</option>
              <option value="Network & Cyber Security Engineering">Network & Cyber Security Engineering</option>
              <option value="Python, Django & Machine Learning">Python, Django & Machine Learning</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Attendance Shift
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPreferredShift('In-Person (Shewrapara)')}
                className={`p-2 rounded-xl border text-center font-bold cursor-pointer ${
                  preferredShift === 'In-Person (Shewrapara)'
                    ? 'bg-red-50 text-[#D90429] border-[#D90429]'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                🏢 In-Person (Shewrapara)
              </button>
              <button
                type="button"
                onClick={() => setPreferredShift('Online (Zoom)')}
                className={`p-2 rounded-xl border text-center font-bold cursor-pointer ${
                  preferredShift === 'Online (Zoom)'
                    ? 'bg-red-50 text-[#D90429] border-[#D90429]'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                💻 Online (Zoom)
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Counselor Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Inquired about discount coupon & Friday session."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#D90429] text-white font-bold rounded-xl hover:bg-[#b80322] shadow-xs cursor-pointer"
            >
              Add Seminar Lead
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
