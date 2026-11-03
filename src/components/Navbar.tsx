import React, { useState } from 'react';
import { EverestLogo } from './EverestLogo.tsx';
import { Menu, X, User, Calendar, BookOpen, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenSeminarModal: () => void;
  onOpenStudentPortalModal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSeminarModal,
  onOpenStudentPortalModal,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Courses', href: '#courses' },
    { label: 'Free Seminars', href: '#seminars' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'About Us', href: '#about-us' },
    { label: 'Contact Us', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Logo Section */}
          <div className="flex items-center shrink-0">
            <EverestLogo 
              size="md" 
              onClick={() => handleNavClick('#home')}
            />
          </div>

          {/* Nav Links: Home | Courses | Free Seminars | Why Us | About Us | Contact Us */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`text-sm font-semibold transition-colors duration-150 relative py-1 whitespace-nowrap shrink-0 ${
                    isActive 
                      ? 'text-[#D90429]' 
                      : 'text-slate-700 hover:text-[#D90429]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D90429] rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action Buttons: Outline Red ("Join Free Seminar") & Solid Crimson Red ("Student Portal") */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Outline Red button ("Join Free Seminar") */}
            <button
              onClick={onOpenSeminarModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#D90429] border-1.5 border-[#D90429] rounded-lg hover:bg-red-50/70 transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 shadow-xs active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Join Free Seminar</span>
            </button>

            {/* Solid Crimson Red primary button ("Student Portal") */}
            <button
              onClick={onOpenStudentPortalModal}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-bold text-white bg-[#D90429] rounded-lg hover:bg-[#b80322] transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 shadow-xs shadow-red-500/20 active:scale-[0.98]"
            >
              <User className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSeminarModal}
              className="md:hidden text-xs font-bold text-[#D90429] border border-[#D90429] px-2.5 py-1.5 rounded-md hover:bg-red-50"
            >
              Seminar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#D90429] hover:bg-slate-100 transition-colors focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2 text-sm font-semibold text-slate-800 hover:text-[#D90429] hover:bg-red-50/50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSeminarModal();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#D90429] border-1.5 border-[#D90429] rounded-lg hover:bg-red-50 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Join Free Seminar</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStudentPortalModal();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#D90429] rounded-lg hover:bg-[#b80322] transition-colors shadow-xs"
            >
              <User className="w-4 h-4" />
              <span>Student Portal Login</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
