import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  ChevronDown, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  ExternalLink,
  Menu,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { AdminTab } from './AdminSidebar.tsx';

interface AdminTopBarProps {
  currentTab: AdminTab;
  onOpenNewLeadModal: () => void;
  onToggleMobileMenu: () => void;
  onExitToWebsite: () => void;
  onLogout?: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  currentTab,
  onOpenNewLeadModal,
  onToggleMobileMenu,
  onExitToWebsite,
  onLogout,
  searchQuery,
  setSearchQuery
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New Seminar Registration',
      description: 'Tanvir Hossain booked a seat for Graphic Design seminar.',
      time: '12 mins ago',
      unread: true
    },
    {
      id: 2,
      title: 'Tuition Payment Confirmed',
      description: 'Sadia Afrin paid 12,000৳ via bKash for UI/UX Batch 48.',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      title: 'Batch 48 Hardware Lab Reserved',
      description: 'Kamrul Hasan scheduled CCNA switch lab for Friday.',
      time: '3 hours ago',
      unread: false
    }
  ];

  const getBreadcrumbTitle = () => {
    switch (currentTab) {
      case 'overview': return 'Dashboard Overview';
      case 'seminar_leads': return 'Free Seminar Leads & Counseling';
      case 'courses': return 'Course Catalog & Batch Management';
      case 'enrollments': return 'Student Enrollments & Payments';
      case 'mentors': return 'Mentors & Faculty Directory';
      case 'settings': return 'Campus & System Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      
      {/* Left: Mobile hamburger & Contextual Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-slate-600 hover:text-[#D90429] rounded-lg hover:bg-slate-100"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="hidden sm:inline font-semibold text-slate-400">Everest IT Admin</span>
          <span className="hidden sm:inline text-slate-300">/</span>
          <h1 className="font-extrabold text-[#1D1E2C] text-sm sm:text-base tracking-tight truncate">
            {getBreadcrumbTitle()}
          </h1>
        </div>
      </div>

      {/* Center & Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Global Search Bar */}
        <div className="relative hidden md:block w-56 lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads, phones, or courses..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] transition-all"
          />
        </div>

        {/* Action Button: + Add Seminar Lead */}
        <button
          onClick={onOpenNewLeadModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#D90429] rounded-xl hover:bg-[#b80322] transition-colors shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Lead</span>
        </button>

        {/* Red Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 text-slate-600 hover:text-[#D90429] hover:bg-red-50/60 rounded-xl transition-colors relative cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D90429] ring-2 ring-white animate-pulse" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 space-y-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-[#1D1E2C]">Admin Alerts</span>
                <span className="text-[10px] text-[#D90429] font-bold">2 Unread</span>
              </div>
              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl text-xs transition-colors ${
                      n.unread ? 'bg-red-50/60 border border-red-100' : 'bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-[#1D1E2C] text-[11px]">{n.title}</div>
                    <div className="text-[10px] text-slate-600 mt-0.5">{n.description}</div>
                    <div className="text-[9px] text-slate-400 mt-1">{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Dropdown (Amiya Sharma - Sole Admin) */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 pl-1.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-[#D90429] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              AS
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-[#1D1E2C] leading-none">Amiya Sharma</div>
              <div className="text-[10px] text-red-600 font-semibold mt-0.5">Super Admin</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-0.5" />
          </button>

          {/* Profile Menu Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1 z-50 animate-in fade-in zoom-in-95 duration-150 text-xs">
              <div className="p-2.5 border-b border-slate-100 bg-red-50/50 rounded-xl mb-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-extrabold text-[#1D1E2C] text-xs">Amiya Sharma</span>
                  <span className="text-[10px] bg-red-100 text-[#D90429] px-1.5 py-0.2 rounded font-bold">Only Admin</span>
                </div>
                <p className="text-[11px] font-mono text-slate-600 truncate">asomiy732@gmail.com</p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold mt-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>Authorized Lead Administrator</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onExitToWebsite();
                }}
                className="w-full flex items-center gap-2 p-2 rounded-lg text-slate-700 hover:bg-slate-50 text-left cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#D90429]" />
                <span>Visit Live Website</span>
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  if (onLogout) {
                    onLogout();
                  } else {
                    onExitToWebsite();
                  }
                }}
                className="w-full flex items-center gap-2 p-2 rounded-lg text-red-600 hover:bg-red-50 text-left cursor-pointer font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out Admin Session</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
