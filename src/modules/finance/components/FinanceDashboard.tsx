import React, { useState } from 'react';
import { useFinance } from '../hooks';
import { FinanceLead, FinanceLeadStatus } from '../types';
import { Search, Filter, ShieldCheck, User, ClipboardList, Briefcase, FileText } from 'lucide-react';
import { Badge } from '@/components/feedback/Badge';

interface FinanceDashboardProps {
  className?: string;
}

export const FinanceDashboard: React.FC<FinanceDashboardProps> = ({ className = '' }) => {
  const { financeLeads, updateFinanceStatus, assignManager } = useFinance();
  const [selectedId, setSelectedId] = useState<string | null>(financeLeads[0]?.financeLeadId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const selectedLead = financeLeads.find(l => l.financeLeadId === selectedId);

  const filteredLeads = financeLeads.filter(l => {
    const matchesSearch =
      l.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.financeLeadId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.bookingId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || l.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (leadId: string, nextStatus: FinanceLeadStatus) => {
    updateFinanceStatus(leadId, nextStatus, 'FINANCE_MANAGER', `Status manually transitioned to ${nextStatus}.`);
  };

  const handleAssign = (leadId: string) => {
    const officerId = prompt('Enter Finance Officer Code to assign:');
    if (officerId === null) return;
    assignManager(leadId, officerId || 'MGR-BAM-01', 'SUPER_ADMIN');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
      case 'DISBURSED':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200/50';
      case 'REJECTED':
        return 'text-red-700 bg-red-50 border-red-200/50';
      case 'UNDER_REVIEW':
      case 'BANK_PROCESSING':
        return 'text-blue-700 bg-blue-50 border-blue-200/50';
      default:
        return 'text-amber-700 bg-amber-50 border-amber-200/50';
    }
  };

  return (
    <div className={`flex flex-col gap-6 text-left ${className}`}>
      {/* Search and Filters */}
      <div className="bg-white p-5 border border-gray-150 rounded-2xl flex flex-col gap-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads by Lead ID, Booking ID, or Customer name..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#EB0A1E]"
            />
          </div>
          <div className="flex gap-2 items-center text-xs font-bold text-gray-500 bg-gray-55 px-3 py-2 rounded-xl border border-gray-150">
            <Filter className="h-4 w-4 text-gray-400 shrink-0" /> Matches: {filteredLeads.length}
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-xs">
          <span className="text-[10px] uppercase font-bold text-gray-450">Application Status</span>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-lg p-2 text-xs focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-750"
          >
            <option value="ALL">All Statuses</option>
            <option value="INITIATED">INITIATED</option>
            <option value="DOCUMENT_PENDING">DOCUMENT_PENDING</option>
            <option value="UNDER_REVIEW">UNDER_REVIEW</option>
            <option value="BANK_PROCESSING">BANK_PROCESSING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
            <option value="DISBURSED">DISBURSED</option>
          </select>
        </div>
      </div>

      {/* Grid panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads queue list */}
        <div className="lg:col-span-1 bg-white border border-gray-150 rounded-2xl shadow-sm flex flex-col overflow-hidden max-h-[500px]">
          <div className="p-4 border-b border-gray-150 bg-gray-55/50">
            <span className="text-xs font-bold text-gray-705">Finance Proposal Pipeline</span>
          </div>

          <div className="overflow-y-auto divide-y divide-gray-100 flex-1 p-3 space-y-2 bg-gray-55/35">
            {filteredLeads.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-400">No proposals found.</div>
            ) : (
              filteredLeads.map(l => {
                const isSel = l.financeLeadId === selectedId;
                return (
                  <button
                    key={l.financeLeadId}
                    onClick={() => setSelectedId(l.financeLeadId)}
                    className={`w-full p-4 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                      isSel ? 'border-[#EB0A1E] bg-[#EB0A1E]/5 shadow-sm' : 'border-gray-200 bg-white hover:bg-gray-55'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-1">
                      <span className="font-bold text-xs text-gray-800 line-clamp-1">{l.customerName}</span>
                      <span className={`text-[8px] px-2 py-0.5 rounded font-extrabold uppercase shrink-0 border ${getStatusColor(l.status)}`}>
                        {l.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                      <span>{l.financeLeadId}</span>
                      <span className="font-bold text-gray-800 font-sans">₹{(l.loanAmountRequested || 0).toLocaleString('en-IN')}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Selected lead detail */}
        <div className="lg:col-span-2 bg-white border border-gray-150 rounded-2xl shadow-sm flex flex-col overflow-hidden min-h-[450px]">
          {selectedLead ? (
            <div className="flex flex-col flex-1 divide-y divide-gray-150">
              {/* Header Profile */}
              <div className="p-6 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-extrabold text-gray-900">{selectedLead.customerName}</span>
                    <span className="text-[10px] font-mono bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                      {selectedLead.financeLeadId}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    <p>Booking ID Ref: <span className="font-mono font-bold text-gray-750">{selectedLead.bookingId}</span></p>
                  </div>
                </div>
                <div className="text-right items-end flex flex-col gap-1.5">
                  <Badge variant="info">Officer: {selectedLead.assignedManagerId || 'Unassigned'}</Badge>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border uppercase ${getStatusColor(selectedLead.status)}`}>
                    {selectedLead.status}
                  </span>
                </div>
              </div>

              {/* Status Update Control */}
              <div className="p-6 flex flex-col sm:flex-row gap-4 justify-between sm:items-center bg-white">
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-gray-400" /> Modify Proposal Status
                  </span>
                  <p className="text-[10px] text-gray-400">Shift application status through bank review stages.</p>
                </div>
                <div className="flex gap-2 min-w-[200px]">
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead.financeLeadId, e.target.value as FinanceLeadStatus)}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#EB0A1E] flex-1 bg-white font-semibold text-gray-750"
                  >
                    <option value="INITIATED">INITIATED</option>
                    <option value="DOCUMENT_PENDING">DOCUMENT_PENDING</option>
                    <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                    <option value="BANK_PROCESSING">BANK_PROCESSING</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="DISBURSED">DISBURSED</option>
                  </select>
                  <button
                    onClick={() => handleAssign(selectedLead.financeLeadId)}
                    className="px-3 py-2 border border-gray-250 hover:bg-gray-50 text-gray-650 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <User className="h-3.5 w-3.5" /> Assign
                  </button>
                </div>
              </div>

              {/* Specifications grid */}
              <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50/20 text-xs">
                <div>
                  <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Monthly Net Salary</span>
                  <span className="font-extrabold text-gray-800">₹{selectedLead.monthlyIncome.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Employer</span>
                  <span className="font-bold text-gray-800">{selectedLead.employerName}</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Employment Type</span>
                  <span className="font-bold text-gray-800">{selectedLead.employmentType}</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Loan Tenure choice</span>
                  <span className="font-bold text-gray-800">{selectedLead.loanTenureYears} Years</span>
                </div>
              </div>

              {/* Documents List */}
              <div className="p-6 flex flex-col gap-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-gray-400" /> Documents Registry ({selectedLead.documents.length})
                </h4>
                {selectedLead.documents.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No files uploaded yet.</p>
                ) : (
                  <div className="space-y-2 text-xs">
                    {selectedLead.documents.map(d => (
                      <div key={d.documentId} className="flex justify-between items-center p-3 border border-gray-150 rounded-xl bg-gray-55/30">
                        <div className="flex flex-col text-left">
                          <span className="font-bold text-gray-850">{d.category}</span>
                          <span className="text-[9px] text-gray-450 font-mono mt-0.5">{d.fileName}</span>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded font-bold uppercase text-blue-600 bg-blue-50 border border-blue-200/50">
                          {d.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Timeline Audits */}
              <div className="p-6 flex-1 flex flex-col gap-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <ClipboardList className="h-4 w-4 text-gray-400" /> Timeline Logs
                </h4>

                <div className="border-l-2 border-gray-150 pl-5 ml-2.5 space-y-4 text-xs relative">
                  {selectedLead.timeline.map((event, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-white border-2 border-[#EB0A1E]" />
                      <div className="flex justify-between items-center font-bold text-gray-855">
                        <span>{event.action}</span>
                        <span className="text-[9px] font-normal text-gray-450">{new Date(event.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">Operated by: {event.operator}</p>
                      {event.notes && (
                        <p className="text-[10px] text-gray-605 bg-gray-50 p-2 border border-gray-150 rounded-lg mt-1 italic">
                          "{event.notes}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 flex-1 text-center text-gray-450">
              <ClipboardList className="h-12 w-12 text-gray-300 mb-3" />
              <p className="text-sm">Select an active proposal from the list to view specifications and audit logs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
