import React, { useState } from 'react';
import { useExchange } from '../hooks';
import { ExchangeLead, ExchangeStatus } from '../types';
import { Search, Filter, ShieldCheck, User, ClipboardList, Briefcase, FileText, TrendingUp, AlertCircle, Share2, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/feedback/Badge';

interface ExchangeDashboardProps {
  className?: string;
}

export const ExchangeDashboard: React.FC<ExchangeDashboardProps> = ({ className = '' }) => {
  const { exchangeLeads, updateStatus, assignOfficer, updateValuation, shareOffer } = useExchange();
  const [selectedId, setSelectedId] = useState<string | null>(exchangeLeads[0]?.exchangeLeadId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Input states for updating appraisal numbers
  const [valuationVal, setValuationVal] = useState<number>(0);
  const [offerVal, setOfferVal] = useState<number>(0);

  const selectedLead = exchangeLeads.find(l => l.exchangeLeadId === selectedId);

  // Sync state values when selected lead changes
  React.useEffect(() => {
    if (selectedLead) {
      setValuationVal(selectedLead.valuationAmount || 0);
      setOfferVal(selectedLead.offeredAmount || 0);
    }
  }, [selectedId, selectedLead]);

  const filteredLeads = exchangeLeads.filter(l => {
    const matchesSearch =
      l.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.exchangeLeadId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.vehicleDetails.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.vehicleDetails.model.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || l.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (leadId: string, nextStatus: ExchangeStatus) => {
    updateStatus(leadId, nextStatus, 'EXCHANGE_OFFICER', `Status manually transitioned to ${nextStatus}.`);
  };

  const handleAssign = (leadId: string) => {
    const officerId = prompt('Enter Evaluator/Appraiser Code to assign:');
    if (officerId === null) return;
    assignOfficer(leadId, officerId || 'VAL-OFF-09', 'SALES_MANAGER');
  };

  const handleUpdateValuation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;
    if (valuationVal <= 0 || offerVal <= 0) {
      alert('Valuation and Offered Trade-in amounts must be positive numbers.');
      return;
    }
    updateValuation(selectedLead.exchangeLeadId, valuationVal, offerVal, selectedLead.assignedOfficerId || 'VAL-OFF-07');
    alert('Appraisal evaluation updated successfully.');
  };

  const handleShareQuote = () => {
    if (!selectedLead) return;
    if (!selectedLead.offeredAmount || selectedLead.offeredAmount <= 0) {
      alert('Please perform appraisal evaluation and save valuation figures before sharing quote.');
      return;
    }
    shareOffer(selectedLead.exchangeLeadId, 'SALES_MANAGER');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
      case 'OFFER_ACCEPTED':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200/50';
      case 'OFFER_REJECTED':
        return 'text-red-700 bg-red-50 border-red-200/50';
      case 'OFFER_SHARED':
      case 'VALUATION_COMPLETED':
        return 'text-blue-700 bg-blue-50 border-blue-200/50';
      case 'UNDER_REVIEW':
        return 'text-purple-700 bg-purple-50 border-purple-200/50';
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
              placeholder="Search by Lead ID, Booking ID, Brand/Model or Customer name..."
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
          <span className="text-[10px] uppercase font-bold text-gray-450">Appraisal Stage Filter</span>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-lg p-2 text-xs focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-750"
          >
            <option value="ALL">All Stages</option>
            <option value="INITIATED">INITIATED</option>
            <option value="APPRAISAL_PENDING">APPRAISAL_PENDING</option>
            <option value="UNDER_REVIEW">UNDER_REVIEW</option>
            <option value="VALUATION_COMPLETED">VALUATION_COMPLETED</option>
            <option value="OFFER_SHARED">OFFER_SHARED</option>
            <option value="OFFER_ACCEPTED">OFFER_ACCEPTED</option>
            <option value="OFFER_REJECTED">OFFER_REJECTED</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline list */}
        <div className="lg:col-span-1 bg-white border border-gray-150 rounded-2xl shadow-sm flex flex-col overflow-hidden max-h-[500px]">
          <div className="p-4 border-b border-gray-150 bg-gray-55/50">
            <span className="text-xs font-bold text-gray-705">Pre-Owned Exchange Pipeline</span>
          </div>

          <div className="overflow-y-auto divide-y divide-gray-100 flex-1 p-3 space-y-2 bg-gray-55/35">
            {filteredLeads.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-400">No exchange requests found.</div>
            ) : (
              filteredLeads.map(l => {
                const isSel = l.exchangeLeadId === selectedId;
                return (
                  <button
                    key={l.exchangeLeadId}
                    onClick={() => setSelectedId(l.exchangeLeadId)}
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

                    <div className="text-[10px] text-gray-500 font-semibold">
                      {l.vehicleDetails.brand} {l.vehicleDetails.model} ({l.vehicleDetails.year})
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                      <span>{l.exchangeLeadId}</span>
                      {l.offeredAmount ? (
                        <span className="font-bold text-emerald-600 font-sans">₹{l.offeredAmount.toLocaleString('en-IN')}</span>
                      ) : (
                        <span className="italic">Appraisal Pending</span>
                      )}
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
              {/* Header profile */}
              <div className="p-6 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-extrabold text-gray-900">{selectedLead.customerName}</span>
                    <span className="text-[10px] font-mono bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                      {selectedLead.exchangeLeadId}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    <p>Booking ID Ref: <span className="font-mono font-bold text-gray-750">{selectedLead.bookingId}</span></p>
                  </div>
                </div>
                <div className="text-right items-end flex flex-col gap-1.5">
                  <Badge variant="info">Officer: {selectedLead.assignedOfficerId || 'Unassigned'}</Badge>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border uppercase ${getStatusColor(selectedLead.status)}`}>
                    {selectedLead.status}
                  </span>
                </div>
              </div>

              {/* Status transition controls */}
              <div className="p-6 flex flex-col sm:flex-row gap-4 justify-between sm:items-center bg-white">
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-gray-400" /> Pipeline Stage Transition
                  </span>
                  <p className="text-[10px] text-gray-400">Shift used car evaluation milestones or assign an appraiser.</p>
                </div>
                <div className="flex gap-2 min-w-[200px]">
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead.exchangeLeadId, e.target.value as ExchangeStatus)}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#EB0A1E] flex-1 bg-white font-semibold text-gray-750"
                  >
                    <option value="INITIATED">INITIATED</option>
                    <option value="APPRAISAL_PENDING">APPRAISAL_PENDING</option>
                    <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                    <option value="VALUATION_COMPLETED">VALUATION_COMPLETED</option>
                    <option value="OFFER_SHARED">OFFER_SHARED</option>
                    <option value="OFFER_ACCEPTED">OFFER_ACCEPTED</option>
                    <option value="OFFER_REJECTED">OFFER_REJECTED</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                  <button
                    onClick={() => handleAssign(selectedLead.exchangeLeadId)}
                    className="px-3 py-2 border border-gray-250 hover:bg-gray-50 text-gray-650 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <User className="h-3.5 w-3.5" /> Assign
                  </button>
                </div>
              </div>

              {/* Specifications grid */}
              <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50/20 text-xs">
                <div>
                  <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Car Brand/Model</span>
                  <span className="font-extrabold text-gray-800">{selectedLead.vehicleDetails.brand} {selectedLead.vehicleDetails.model}</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Registration</span>
                  <span className="font-bold text-gray-800">{selectedLead.vehicleDetails.registrationNumber}</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Mfg Year & Mileage</span>
                  <span className="font-bold text-gray-800">{selectedLead.vehicleDetails.year} | {selectedLead.vehicleDetails.kilometersDriven.toLocaleString('en-IN')} Kms</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Ownership</span>
                  <span className="font-bold text-gray-800">{selectedLead.vehicleDetails.ownershipType}</span>
                </div>
              </div>

              {/* Appraisal Valuation Pricing Form */}
              <div className="p-6 bg-white flex flex-col gap-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-gray-400" /> Appraisal pricing panel
                </h4>
                
                <form onSubmit={handleUpdateValuation} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                  <div className="flex flex-col gap-1.5 text-xs">
                    <span className="font-bold text-gray-500">Base Valuation (₹)</span>
                    <input
                      type="number"
                      value={valuationVal || ''}
                      onChange={e => setValuationVal(Number(e.target.value))}
                      placeholder="e.g. 450000"
                      className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#EB0A1E]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 text-xs">
                    <span className="font-bold text-gray-500">Offered Trade-in Value (₹)</span>
                    <input
                      type="number"
                      value={offerVal || ''}
                      onChange={e => setOfferVal(Number(e.target.value))}
                      placeholder="e.g. 420000"
                      className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#EB0A1E]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex-1"
                    >
                      Save Appraisal
                    </button>
                    {selectedLead.status === 'VALUATION_COMPLETED' && (
                      <button
                        type="button"
                        onClick={handleShareQuote}
                        className="p-2.5 border border-[#EB0A1E] text-[#EB0A1E] hover:bg-[#EB0A1E]/5 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                        title="Share trade-in quote with customer"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Vehicle Inspection Images */}
              <div className="p-6 bg-white flex flex-col gap-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-gray-400" /> Evaluation Documents & Photos ({selectedLead.photos.length})
                </h4>
                {selectedLead.photos.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No inspection photos provided.</p>
                ) : (
                  <div className="flex flex-wrap gap-2 text-xs">
                    {selectedLead.photos.map((photo, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 border border-gray-150 rounded-xl bg-gray-55/40">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="font-mono text-[9px] text-gray-500">{photo}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Timeline Audits */}
              <div className="p-6 flex-1 flex flex-col gap-4 bg-white">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <ClipboardList className="h-4 w-4 text-gray-400" /> Activity Log history
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
            <div className="flex flex-col items-center justify-center p-12 flex-1 text-center text-gray-455">
              <ClipboardList className="h-12 w-12 text-gray-300 mb-3" />
              <p className="text-sm">Select an active evaluation request from the list to view specifications and audit timeline logs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
