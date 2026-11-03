import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Calendar, 
  GraduationCap, 
  Settings, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { EverestLogo } from '../EverestLogo.tsx';

export type AdminTab = 
  | 'overview' 
  | 'courses' 
  | 'enrollments' 
  | 'seminar_leads' 
  | 'mentors' 
  | 'settings';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onExitToWebsite: () => void;
  onLogout?: () => void;
  leadsCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  onExitToWebsite,
  onLogout,
  leadsCount
}) => {
  const menuItems = [
    {
      id: 'overview' as AdminTab,
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'seminar_leads' as AdminTab,
      label: 'Free Seminar Leads',
      icon: Calendar,
      badge: leadsCount > 0 ? leadsCount : null
    },
    {
      id: 'courses' as AdminTab,
      label: 'Course Management',
      icon: BookOpen,
      badge: '52'
    },
    {
      id: 'enrollments' as AdminTab,
      label: 'Student Enrollments',
      icon: Users,
      badge: null
    },
    {
      id: 'mentors' as AdminTab,
      label: 'Mentors & Staff',
      icon: GraduationCap,
      badge: null
    },
    {
      id: 'settings' as AdminTab,
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="w-64 bg-[#1D1E2C] text-white flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-slate-800 select-none z-30">
      
      {/* Top Header with Red & Black 'E' Logo & Admin Tag */}
      <div>
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <EverestLogo size="sm" variant="dark-bg" />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#D90429] bg-red-950/70 border border-red-900/60 px-2 py-0.5 rounded uppercase tracking-wider">
              Admin Portal
            </span>
            <span className="text-[10px] text-slate-400 font-mono">v2.4 Pro</span>
          </div>
        </div>

        {/* Navigation Menu Items */}
        <nav className="p-3 space-y-1.5 mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#D90429] text-white shadow-md shadow-red-900/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full tabular-nums ${
                      isActive
                        ? 'bg-white text-[#D90429]'
                        : 'bg-red-900/60 text-red-200 border border-red-800/50'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer: Return to Public Website & Admin User Card */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        {/* Switch back to Public Website button */}
        <button
          onClick={onExitToWebsite}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#D90429]" />
            <span>Public Website</span>
          </div>
          <ChevronRight className="w-3 h-3 text-slate-400" />
        </button>

        {/* Current Logged-in Admin Card (Amiya Sharma) */}
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-lg bg-[#D90429] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
              AS
            </div>
            <div className="truncate flex-1">
              <div className="text-xs font-bold text-white truncate">Amiya Sharma</div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1 truncate">
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">asomiy732@gmail.com</span>
              </div>
            </div>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              title="Log Out Admin Session"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

    </aside>
  );
};
