import React, { useState } from 'react';
import { SeminarLead } from '../../data/adminMockData.ts';
import { 
  Phone, 
  CheckCircle, 
  Trash2, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ExternalLink, 
  Clock, 
  Calendar,
  Sparkles,
  UserCheck,
  Check,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SeminarLeadsTableProps {
  leads: SeminarLead[];
  onUpdateLeadStatus: (leadId: string, status: SeminarLead['status']) => void;
  onDeleteLead: (leadId: string) => void;
  onOpenNewLeadModal: () => void;
  searchQuery: string;
}

export const SeminarLeadsTable: React.FC<SeminarLeadsTableProps> = ({
  leads,
  onUpdateLeadStatus,
  onDeleteLead,
  onOpenNewLeadModal,
  searchQuery
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [callLeadModal, setCallLeadModal] = useState<SeminarLead | null>(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);

  // Filter leads based on query & status
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus;
    const matchesQuery = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.courseInterest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.ticketId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const getStatusBadge = (status: SeminarLead['status']) => {
    switch (status) {
      case 'New Lead':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Contacted':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Verified':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Converted':
        return 'bg-red-50 text-[#D90429] border-red-200 font-bold';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const exportCSV = () => {
    const headers = ['Ticket ID,Student Name,Phone,Email,Course Interest,Preferred Shift,Registration Date,Status'];
    const rows = filteredLeads.map(l => 
      `"${l.ticketId}","${l.name}","${l.phone}","${l.email}","${l.courseInterest}","${l.preferredShift}","${l.registrationDate}","${l.status}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `everest_seminar_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
      
      {/* Table Action Controls Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-[#1D1E2C] flex items-center gap-2 flex-wrap">
            <span>Free Seminar Registrations & Leads</span>
            <span className="text-xs font-bold text-[#D90429] bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
              {filteredLeads.length} Total
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Cloud Firestore Active</span>
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time synchronization with Cloud Firestore. Direct attendee inquiries from the website lead form.
          </p>
        </div>

        {/* Filter Tabs & Export CSV */}
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          {/* Status Segmented Buttons */}
          <div className="flex items-center p-1 bg-slate-100/80 rounded-xl text-xs overflow-x-auto">
            {['All', 'New Lead', 'Contacted', 'Verified', 'Converted'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedStatus === st
                    ? 'bg-white text-[#D90429] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer ml-auto md:ml-0"
          >
            <Download className="w-3.5 h-3.5 text-[#D90429]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Table Responsive Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <th className="py-3.5 px-4 sm:px-6">Student Name</th>
              <th className="py-3.5 px-4">Phone Number</th>
              <th className="py-3.5 px-4">Course Interest</th>
              <th className="py-3.5 px-4">Preferred Shift</th>
              <th className="py-3.5 px-4">Registration Date</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 text-right sm:pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLeads.map((lead) => (
              <tr 
                key={lead.id}
                className="hover:bg-slate-50/70 transition-colors group"
              >
                {/* 1. Student Name */}
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-[#D90429] flex items-center justify-center font-bold text-xs shrink-0 border border-red-100">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-extrabold text-[#1D1E2C] text-xs sm:text-sm">
                        {lead.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {lead.ticketId}
                      </div>
                    </div>
                  </div>
                </td>

                {/* 2. Phone Number */}
                <td className="py-3.5 px-4 font-mono font-semibold text-slate-800 tabular-nums">
                  <a
                    href={`tel:${lead.phone}`}
                    className="hover:text-[#D90429] hover:underline flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-[#D90429]" />
                    <span>{lead.phone}</span>
                  </a>
                </td>

                {/* 3. Selected Course Interest */}
                <td className="py-3.5 px-4">
                  <span className="font-semibold text-slate-800">
                    {lead.courseInterest}
                  </span>
                </td>

                {/* 4. Preferred Shift */}
                <td className="py-3.5 px-4 text-slate-600">
                  <span className="inline-flex items-center gap-1">
                    {lead.preferredShift.includes('In-Person') ? '🏢' : '💻'}
                    <span>{lead.preferredShift}</span>
                  </span>
                </td>

                {/* 5. Registration Date */}
                <td className="py-3.5 px-4 text-slate-500 tabular-nums whitespace-nowrap">
                  {lead.registrationDate}
                </td>

                {/* 6. Status Badge */}
                <td className="py-3.5 px-4 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </td>

                {/* 7. Action Buttons (Call / Verify / Delete) */}
                <td className="py-3.5 px-4 text-right sm:pr-6 whitespace-nowrap">
                  <div className="inline-flex items-center gap-1.5 justify-end">
                    
                    {/* Call Action Button */}
                    <button
                      onClick={() => setCallLeadModal(lead)}
                      title={`Call ${lead.name} (${lead.phone})`}
                      className="p-1.5 rounded-lg bg-red-50 text-[#D90429] hover:bg-[#D90429] hover:text-white transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>

                    {/* Verify Action Button */}
                    <button
                      onClick={() => {
                        const nextStatus = 
                          lead.status === 'New Lead' ? 'Contacted' :
                          lead.status === 'Contacted' ? 'Verified' :
                          lead.status === 'Verified' ? 'Converted' : 'Verified';
                        onUpdateLeadStatus(lead.id, nextStatus);
                      }}
                      title={`Advance status (Current: ${lead.status})`}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        lead.status === 'Verified' || lead.status === 'Converted'
                          ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Action Button */}
                    <button
                      onClick={() => setDeleteConfirmationId(lead.id)}
                      title="Delete lead record"
                      className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredLeads.length === 0 && (
          <div className="p-12 text-center">
            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <div className="text-sm font-bold text-[#1D1E2C]">No seminar leads found</div>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your filter status or search keyword.
            </p>
          </div>
        )}
      </div>

      {/* Call Dialog Modal */}
      {callLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 text-[#D90429] flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#1D1E2C]">Initiate Counselor Call</h3>
                <p className="text-xs text-slate-500">{callLeadModal.name}</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs text-slate-700 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="font-bold font-mono text-[#D90429]">{callLeadModal.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Course:</span>
                <span className="font-semibold">{callLeadModal.courseInterest}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Shift:</span>
                <span>{callLeadModal.preferredShift}</span>
              </div>
              {callLeadModal.notes && (
                <div className="pt-2 border-t border-slate-200 text-slate-600">
                  <strong>Notes:</strong> {callLeadModal.notes}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${callLeadModal.phone}`}
                onClick={() => {
                  onUpdateLeadStatus(callLeadModal.id, 'Contacted');
                  setCallLeadModal(null);
                }}
                className="flex-1 py-2.5 text-center bg-[#D90429] text-white font-bold text-xs rounded-xl hover:bg-[#b80322]"
              >
                Call Hotline / SIM ({callLeadModal.phone})
              </a>
              <button
                onClick={() => setCallLeadModal(null)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmationId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl text-center">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#1D1E2C]">Delete Lead Record?</h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              This action will remove the registration from the active seminar queue.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onDeleteLead(deleteConfirmationId);
                  setDeleteConfirmationId(null);
                }}
                className="flex-1 py-2 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteConfirmationId(null)}
                className="flex-1 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
