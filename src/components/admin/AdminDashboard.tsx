import React, { useState, useEffect } from 'react';
import { AdminSidebar, AdminTab } from './AdminSidebar.tsx';
import { AdminTopBar } from './AdminTopBar.tsx';
import { AdminKpiCards } from './AdminKpiCards.tsx';
import { SeminarLeadsTable } from './SeminarLeadsTable.tsx';
import { CourseManagementView } from './CourseManagementView.tsx';
import { StudentEnrollmentsView } from './StudentEnrollmentsView.tsx';
import { MentorsView } from './MentorsView.tsx';
import { AdminSettingsView } from './AdminSettingsView.tsx';
import { NewLeadModal } from './NewLeadModal.tsx';
import { INITIAL_SEMINAR_LEADS, SeminarLead } from '../../data/adminMockData.ts';
import { ArrowLeft, Plus, Download, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  subscribeToSeminarLeads, 
  updateSeminarLeadInFirestore, 
  deleteSeminarLeadFromFirestore,
  addSeminarLeadToFirestore 
} from '../../lib/firebase.ts';

interface AdminDashboardProps {
  onExitToWebsite: () => void;
  onShowToast: (msg: string) => void;
  onLogout?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onExitToWebsite,
  onShowToast,
  onLogout
}) => {
  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');
  const [leads, setLeads] = useState<SeminarLead[]>(INITIAL_SEMINAR_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Real-time synchronization with Cloud Firestore
  useEffect(() => {
    const unsubscribe = subscribeToSeminarLeads((firestoreLeads) => {
      if (firestoreLeads && firestoreLeads.length > 0) {
        const existingTicketIds = new Set(firestoreLeads.map(l => l.ticketId));
        const filteredInitial = INITIAL_SEMINAR_LEADS.filter(l => !existingTicketIds.has(l.ticketId));
        
        const mappedFirestoreLeads: SeminarLead[] = firestoreLeads.map(l => ({
          id: l.id || l.ticketId,
          ticketId: l.ticketId,
          name: l.name,
          phone: l.phone,
          email: l.email || '',
          courseInterest: l.courseInterest,
          preferredShift: l.preferredShift,
          registrationDate: l.registrationDate,
          status: l.status,
          notes: l.notes || ''
        }));
        
        setLeads([...mappedFirestoreLeads, ...filteredInitial]);
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleUpdateStatus = async (leadId: string, status: SeminarLead['status']) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status } : l));
    onShowToast(`Lead status updated to "${status}"`);
    try {
      await updateSeminarLeadInFirestore(leadId, { status });
    } catch (err) {
      console.warn('Could not update lead in Firestore:', err);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    setLeads(prev => prev.filter(l => l.id !== leadId));
    onShowToast('Lead registration removed.');
    try {
      await deleteSeminarLeadFromFirestore(leadId);
    } catch (err) {
      console.warn('Could not delete lead from Firestore:', err);
    }
  };

  const handleAddLead = async (newLeadData: Omit<SeminarLead, 'id' | 'ticketId' | 'registrationDate'>) => {
    const newTicketId = `EVR-SEM-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} · ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    try {
      const res = await addSeminarLeadToFirestore({
        ticketId: newTicketId,
        name: newLeadData.name,
        phone: newLeadData.phone,
        email: newLeadData.email || undefined,
        courseInterest: newLeadData.courseInterest,
        preferredShift: newLeadData.preferredShift,
        registrationDate: formattedDate,
        status: newLeadData.status,
        notes: newLeadData.notes || ''
      });
      const generatedId = res.success && res.id ? res.id : `lead-${Date.now()}`;
      
      const newLead: SeminarLead = {
        ...newLeadData,
        id: generatedId,
        ticketId: newTicketId,
        registrationDate: formattedDate
      };
      setLeads(prev => [newLead, ...prev]);
    } catch (err) {
      console.warn('Error saving lead to Firestore:', err);
      const newLead: SeminarLead = {
        ...newLeadData,
        id: `lead-${Date.now()}`,
        ticketId: newTicketId,
        registrationDate: formattedDate
      };
      setLeads(prev => [newLead, ...prev]);
    }

    onShowToast(`New Lead added & synced: ${newLeadData.name} (${newTicketId})`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1D1E2C] flex font-sans">
      
      {/* Desktop Left Sidebar */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          onExitToWebsite={onExitToWebsite}
          onLogout={onLogout}
          leadsCount={leads.length}
        />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-64 h-full bg-[#1D1E2C] z-10 animate-in slide-in-from-left duration-200">
            <AdminSidebar
              currentTab={currentTab}
              onSelectTab={(tab) => {
                setCurrentTab(tab);
                setMobileSidebarOpen(false);
              }}
              onExitToWebsite={onExitToWebsite}
              onLogout={onLogout}
              leadsCount={leads.length}
            />
          </div>
        </div>
      )}

      {/* Main Right Workspace Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Admin Top Bar */}
        <AdminTopBar
          currentTab={currentTab}
          onOpenNewLeadModal={() => setIsNewLeadModalOpen(true)}
          onToggleMobileMenu={() => setMobileSidebarOpen(true)}
          onExitToWebsite={onExitToWebsite}
          onLogout={onLogout}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Overview or Seminar Leads Tab */}
          {(currentTab === 'overview' || currentTab === 'seminar_leads') && (
            <div className="space-y-6">
              {/* 4 KPI Stat Cards */}
              <AdminKpiCards />

              {/* Lead Management Data Table */}
              <SeminarLeadsTable
                leads={leads}
                onUpdateLeadStatus={handleUpdateStatus}
                onDeleteLead={handleDeleteLead}
                onOpenNewLeadModal={() => setIsNewLeadModalOpen(true)}
                searchQuery={searchQuery}
              />
            </div>
          )}

          {/* Courses Tab */}
          {currentTab === 'courses' && (
            <CourseManagementView />
          )}

          {/* Student Enrollments Tab */}
          {currentTab === 'enrollments' && (
            <StudentEnrollmentsView />
          )}

          {/* Mentors & Staff Tab */}
          {currentTab === 'mentors' && (
            <MentorsView />
          )}

          {/* Settings Tab */}
          {currentTab === 'settings' && (
            <AdminSettingsView />
          )}

        </main>
      </div>

      {/* Add New Lead Modal */}
      <NewLeadModal
        isOpen={isNewLeadModalOpen}
        onClose={() => setIsNewLeadModalOpen(false)}
        onAddLead={handleAddLead}
      />

    </div>
  );
};
