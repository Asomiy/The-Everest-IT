import React from 'react';
import { Phone, Mail, ArrowRight, Shield } from 'lucide-react';

interface TopBarProps {
  onOpenSeminarModal: () => void;
  onOpenAdminPanel?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  onOpenSeminarModal,
  onOpenAdminPanel 
}) => {
  const facebookUrl = "https://www.facebook.com/share/1Cporq7CYd/";
  const linkedinUrl = "https://www.linkedin.com/in/the-everest-it-056184332?utm_source=share_via&utm_content=profile&utm_medium=member_android";

  return (
    <div className="bg-[#D90429] text-white text-xs font-medium border-b border-red-700/40 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-y-2 gap-x-6">
        
        {/* Contact Info: Hotline, Email & Social Media Links */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
          <a
            href="tel:+8801776057078"
            className="inline-flex items-center gap-1.5 hover:text-white/80 transition-colors whitespace-nowrap"
            title="Call Everest IT Admission Hotline"
          >
            <Phone className="w-3.5 h-3.5 text-white/90" />
            <span className="font-semibold tracking-wide">+8801776057078</span>
          </a>
          
          <span className="hidden sm:inline text-white/40">|</span>

          <a
            href="mailto:info@theeverestit.com"
            className="hidden md:inline-flex items-center gap-1.5 hover:text-white/80 transition-colors whitespace-nowrap"
            title="Send Email to The Everest IT"
          >
            <Mail className="w-3.5 h-3.5 text-white/90" />
            <span>info@theeverestit.com</span>
          </a>

          <span className="hidden md:inline text-white/40">|</span>

          {/* Official Social Media Profiles in Top Bar */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/80 hidden sm:inline uppercase font-bold tracking-wider">Follow:</span>
            
            {/* Facebook Link */}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Official Facebook Page"
              title="Visit The Everest IT on Facebook"
              className="p-1 rounded-md bg-white/10 hover:bg-white text-white hover:text-[#D90429] transition-all duration-150 inline-flex items-center justify-center shadow-2xs"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* LinkedIn Link */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Official LinkedIn Profile"
              title="Visit The Everest IT on LinkedIn"
              className="p-1 rounded-md bg-white/10 hover:bg-white text-white hover:text-[#D90429] transition-all duration-150 inline-flex items-center justify-center shadow-2xs"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Announcement Message & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <div className="hidden lg:flex items-center gap-1.5 text-white">
            <span>📢</span>
            <span className="font-medium truncate max-w-xs">
              Free Career Counseling Seminar Registration Open!
            </span>
          </div>

          <button
            onClick={onOpenSeminarModal}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-[#D90429] font-bold text-[11px] hover:bg-slate-100 transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            <span>Register Free</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Quick Admin Panel Switcher */}
          {onOpenAdminPanel && (
            <button
              onClick={onOpenAdminPanel}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/40 hover:bg-black/60 text-white font-semibold text-[11px] border border-white/20 transition-colors cursor-pointer"
              title="Open Admin Dashboard & Lead Management"
            >
              <Shield className="w-3 h-3 text-red-300" />
              <span className="hidden xs:inline">Admin Panel</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
