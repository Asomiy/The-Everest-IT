import React from 'react';
import { EverestLogo } from './EverestLogo.tsx';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Shield } from 'lucide-react';

interface FooterProps {
  onOpenSeminarModal: () => void;
  onOpenStudentPortalModal: () => void;
  onOpenAdminPanel?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSeminarModal,
  onOpenStudentPortalModal,
  onOpenAdminPanel
}) => {
  const facebookUrl = "https://www.facebook.com/share/1Cporq7CYd/";
  const linkedinUrl = "https://www.linkedin.com/in/the-everest-it-056184332?utm_source=share_via&utm_content=profile&utm_medium=member_android";

  return (
    <footer id="contact" className="bg-[#1D1E2C] text-white pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand, Mission & Social Links (Col 1 - 4) */}
          <div className="lg:col-span-4 space-y-4">
            <EverestLogo size="lg" variant="dark-bg" />
            
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm pt-2">
              The Everest IT is a premier hands-on IT training institute located at East Shewrapara, Mirpur, Dhaka. Dedicated to preparing the next generation of software engineers, graphic designers, digital marketers, and cyber security specialists.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#D90429]" />
              <span>Govt. Reg. Training Institute & Certified Mentors</span>
            </div>

            {/* Official Social Media Profiles with Clean Vector Icons */}
            <div className="pt-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Official Social Profiles
              </span>
              <div className="flex items-center gap-3">
                {/* Facebook Vector Icon & Link */}
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Official Facebook Page"
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-[#D90429] border border-slate-700/80 transition-all duration-200 text-slate-200 hover:text-white cursor-pointer shadow-xs"
                  title="Visit The Everest IT Facebook Page"
                >
                  <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-xs font-bold">Facebook</span>
                </a>

                {/* LinkedIn Vector Icon & Link */}
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Official LinkedIn Profile"
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-[#D90429] border border-slate-700/80 transition-all duration-200 text-slate-200 hover:text-white cursor-pointer shadow-xs"
                  title="Visit The Everest IT LinkedIn Profile"
                >
                  <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span className="text-xs font-bold">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Head Office & Contact Details (Col 5 - 8) */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#D90429] pl-2.5">
              Head Office & Campus
            </h4>
            
            <div className="space-y-3 text-xs text-slate-300 pt-1">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D90429] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>888/1, 3rd Floor, Hazi Ashraf Ali Market</strong>,<br />
                  East Shewrapara, Dhaka-1216, Bangladesh.<br />
                  <span className="text-slate-400">(2 minutes walking distance from Shewrapara Metro Station)</span>
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D90429] shrink-0" />
                <a
                  href="tel:+8801776057078"
                  className="font-bold text-white hover:text-[#D90429] transition-colors"
                >
                  +8801776057078
                </a>
                <span className="text-slate-400">(Admission Hotline)</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D90429] shrink-0" />
                <a
                  href="mailto:info@theeverestit.com"
                  className="hover:text-white transition-colors"
                >
                  info@theeverestit.com
                </a>
              </div>

              {/* Office Hours */}
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D90429] shrink-0" />
                <span>Saturday – Thursday: 10:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation & Student Action (Col 9 - 12) */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#D90429] pl-2.5">
              Quick Links & Access
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
              <a href="#courses" className="hover:text-[#D90429] transition-colors flex items-center gap-1">
                <span>All Courses</span>
              </a>
              <button 
                onClick={onOpenSeminarModal}
                className="hover:text-[#D90429] transition-colors text-left flex items-center gap-1 cursor-pointer"
              >
                <span>Free Seminars</span>
              </button>
              <a href="#why-us" className="hover:text-[#D90429] transition-colors flex items-center gap-1">
                <span>5 Core Pillars</span>
              </a>
              <button 
                onClick={onOpenStudentPortalModal}
                className="hover:text-[#D90429] transition-colors text-left flex items-center gap-1 cursor-pointer"
              >
                <span>Student Portal</span>
              </button>
              <a href="#about-us" className="hover:text-[#D90429] transition-colors flex items-center gap-1">
                <span>Student Stories</span>
              </a>
              {onOpenAdminPanel && (
                <button 
                  onClick={onOpenAdminPanel}
                  className="hover:text-[#D90429] transition-colors text-left flex items-center gap-1 font-bold text-red-300 cursor-pointer"
                >
                  <Shield className="w-3 h-3 text-[#D90429]" />
                  <span>Admin Panel</span>
                </button>
              )}
            </div>

            <div className="pt-3">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
                <p className="font-semibold text-white">Need immediate career consultation?</p>
                <p className="text-slate-300 text-[11px] mt-0.5">Visit our East Shewrapara campus or dial +8801776057078</p>
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    onClick={onOpenSeminarModal}
                    className="px-3 py-1.5 bg-[#D90429] hover:bg-[#b80322] text-white font-bold rounded-lg text-xs cursor-pointer"
                  >
                    Register Free Seminar
                  </button>
                  <a
                    href="https://wa.me/8801776057078"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Subtle Accreditation */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-white font-semibold">The Everest IT</strong>. All rights reserved. Dhaka, Bangladesh.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Admission</span>
            <span>·</span>
            <span>Student Code of Conduct</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
