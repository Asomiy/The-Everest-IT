import React from 'react';
import { Mail, Phone, Award, CheckCircle2 } from 'lucide-react';

export const MentorsView: React.FC = () => {
  const mentors = [
    {
      name: 'Tanvir Hossain',
      role: 'Lead Art Director & Senior Freelance Coach',
      department: 'Art & Design',
      experience: '8+ Years · 1000+ Completed Upwork Orders',
      studentsCount: 920,
      phone: '+8801776057078',
      email: 'tanvir.mentor@theeverestit.com'
    },
    {
      name: 'Ashraful Islam',
      role: 'Principal Software Engineer',
      department: 'Web Development',
      experience: '7+ Years in MERN Stack & Cloud Architecture',
      studentsCount: 1140,
      phone: '+8801776057078',
      email: 'ashraf.dev@theeverestit.com'
    },
    {
      name: 'Mahbubur Rahman',
      role: 'Growth Marketing Director',
      department: 'Marketing & SEO',
      experience: '6+ Years Managing $500K+ Ad Spends',
      studentsCount: 780,
      phone: '+8801776057078',
      email: 'mahbub.mkt@theeverestit.com'
    },
    {
      name: 'Sabrina Noor',
      role: 'Lead Product Designer',
      department: 'Art & Design (UI/UX)',
      experience: '6+ Years designing Fintech & SaaS systems',
      studentsCount: 650,
      phone: '+8801776057078',
      email: 'sabrina.ux@theeverestit.com'
    },
    {
      name: 'Engr. Kamrul Hasan',
      role: 'Senior Network Architect',
      department: 'Networking & Cyber Security',
      experience: '10+ Years in Datacenter & Cisco Infrastructure',
      studentsCount: 710,
      phone: '+8801776057078',
      email: 'kamrul.net@theeverestit.com'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <h2 className="text-lg font-extrabold text-[#1D1E2C]">Mentors & Faculty Directory</h2>
        <p className="text-xs text-slate-500">Active industry mentors conducting physical labs at East Shewrapara and online sessions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mentors.map((m) => (
          <div key={m.name} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#D90429] flex items-center justify-center font-black text-base border border-red-100 shrink-0">
                {m.name.charAt(0)}
              </div>
              <div className="truncate">
                <h3 className="font-bold text-sm text-[#1D1E2C] truncate">{m.name}</h3>
                <p className="text-xs text-[#D90429] font-medium truncate">{m.role}</p>
                <span className="text-[10px] text-slate-400 font-semibold">{m.department}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
              <div>{m.experience}</div>
              <div className="font-semibold text-slate-800">Trained: {m.studentsCount}+ Students</div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D90429]" />
                <span className="truncate max-w-[150px]">{m.email}</span>
              </div>
              <span className="text-emerald-600 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded">Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
