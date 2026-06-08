'use client';

import React, { useState, useEffect } from 'react';
import { useCrm } from '@/modules/crm/hooks';
import { Lead, LeadStatus, LeadType, ScoreCategory } from '@/modules/crm/services';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  Activity, 
  User, 
  Building,
  ChevronRight,
  ClipboardList
} from 'lucide-react';
import { Badge } from '@/components/feedback/Badge';

export default function LeadQueueDashboard() {
  const { leads, assignLead, updateStatus } = useCrm();
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(leads[0]?.leadId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterBranch, setFilterBranch] = useState<string>('ALL');
  const [filterScore, setFilterScore] = useState<string>('ALL');

  // Simple countdown update helper
  const [timeNow, setTimeNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setTimeNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const selectedLead = leads.find(l => l.leadId === selectedLeadId);

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.leadId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'ALL' || lead.leadType === filterType;
    const matchesStatus = filterStatus === 'ALL' || lead.status === filterStatus;
    const matchesBranch = filterBranch === 'ALL' || lead.branchCode === filterBranch;
    const matchesScore = filterScore === 'ALL' || lead.scoreCategory === filterScore;

    return matchesSearch && matchesType && matchesStatus && matchesBranch && matchesScore;
  });

  const getSlaRemainingText = (deadlineStr: string, status: LeadStatus) => {
    if (status === 'CONVERTED' || status === 'LOST' || status === 'CLOSED') {
      return { text: 'Completed', color: 'text-gray-500 bg-gray-150', isBreached: false };
    }

    const deadline = new Date(deadlineStr).getTime();
    const diff = deadline - timeNow;

    if (diff <= 0) {
      return { text: 'SLA Breached!', color: 'text-red-600 bg-red-100 font-bold animate-pulse', isBreached: true };
    }

    const totalSecs = Math.floor(diff / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;

    if (mins < 5) {
      return { text: `Urgent: ${mins}m ${secs}s`, color: 'text-amber-600 bg-amber-50 font-bold', isBreached: false };
    }

    if (mins >= 60) {
      const hrs = Math.floor(mins / 60);
      return { text: `${hrs} hrs remaining`, color: 'text-blue-600 bg-blue-50', isBreached: false };
    }

    return { text: `${mins}m ${secs}s remaining`, color: 'text-[#EB0A1E] bg-red-50', isBreached: false };
  };

  const handleAssign = (managerName: string) => {
    if (!selectedLeadId) return;
    assignLead(selectedLeadId, managerName, 'SUPER_ADMIN');
  };

  const handleStatusUpdate = (status: LeadStatus) => {
    if (!selectedLeadId) return;
    updateStatus(selectedLeadId, status, 'SUPER_ADMIN', `Status updated manually to ${status}`);
  };

  // Stats Counters
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'NEW').length;
  const convertedLeads = leads.filter(l => l.status === 'CONVERTED').length;
  const slaBreaches = leads.filter(l => {
    if (l.status === 'CONVERTED' || l.status === 'LOST' || l.status === 'CLOSED') return false;
    return new Date(l.slaDeadline).getTime() < timeNow;
  }).length;

  const staff = ['Ranjan Senapati', 'Swati Panigrahi', 'Subrat Jena', 'Priyanka Das'];

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Overview Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 border border-gray-150 rounded-2xl bg-white flex flex-col gap-1 shadow-sm text-left">
          <span className="text-[10px] text-gray-400 font-extrabold uppercase">Total Leads</span>
          <span className="text-2xl font-extrabold text-gray-800">{totalLeads}</span>
        </div>
        <div className="p-5 border border-gray-150 rounded-2xl bg-white flex flex-col gap-1 shadow-sm text-left">
          <span className="text-[10px] text-amber-500 font-extrabold uppercase">Unassigned Leads</span>
          <span className="text-2xl font-extrabold text-amber-600">{newLeads}</span>
        </div>
        <div className="p-5 border border-[#EB0A1E]/10 rounded-2xl bg-red-50/20 flex flex-col gap-1 shadow-sm text-left">
          <span className="text-[10px] text-[#EB0A1E] font-extrabold uppercase flex items-center gap-1">
            <AlertTriangle className="h-3 w-3 shrink-0" /> SLA Breaches
          </span>
          <span className="text-2xl font-extrabold text-[#EB0A1E]">{slaBreaches}</span>
        </div>
        <div className="p-5 border border-emerald-150 rounded-2xl bg-emerald-50/10 flex flex-col gap-1 shadow-sm text-left">
          <span className="text-[10px] text-emerald-600 font-extrabold uppercase">Conversions</span>
          <span className="text-2xl font-extrabold text-emerald-600">{convertedLeads}</span>
        </div>
      </div>

      {/* 2. Filters & Search Controls */}
      <div className="bg-white p-5 border border-gray-150 rounded-2xl flex flex-col gap-4 shadow-sm text-left">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads by name, email, phone, ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#EB0A1E]"
            />
          </div>
          <div className="flex gap-2 items-center text-xs font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-xl border border-gray-150">
            <Filter className="h-4 w-4 text-gray-400 shrink-0" /> Filters Active: {filteredLeads.length}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Type</span>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="border border-gray-200 rounded-lg p-2 text-xs focus:outline-none focus:border-[#EB0A1E] bg-white"
            >
              <option value="ALL">All Types</option>
              <option value="CONTACT_LEAD">Contact Lead</option>
              <option value="TEST_DRIVE">Test Drive</option>
              <option value="BOOKING">Booking</option>
              <option value="FINANCE">Finance</option>
              <option value="EXCHANGE">Exchange</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Status</span>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-lg p-2 text-xs focus:outline-none focus:border-[#EB0A1E] bg-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="CONTACTED">Contacted</option>
              <option value="CONVERTED">Converted</option>
              <option value="LOST">Lost</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Branch</span>
            <select
              value={filterBranch}
              onChange={e => setFilterBranch(e.target.value)}
              className="border border-gray-200 rounded-lg p-2 text-xs focus:outline-none focus:border-[#EB0A1E] bg-white"
            >
              <option value="ALL">All Branches</option>
              <option value="BAM">Berhampur (BAM)</option>
              <option value="JEY">Jeypore (JEY)</option>
              <option value="BAR">Bargarh (BAR)</option>
              <option value="BAL">Balangir (BAL)</option>
              <option value="RAY">Rayagada (RAY)</option>
              <option value="BHA">Bhawanipatna (BHA)</option>
              <option value="PAR">Paralakhemundi (PAR)</option>
              <option value="ASK">Aska (ASK)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Category</span>
            <select
              value={filterScore}
              onChange={e => setFilterScore(e.target.value)}
              className="border border-gray-200 rounded-lg p-2 text-xs focus:outline-none focus:border-[#EB0A1E] bg-white"
            >
              <option value="ALL">All Priorities</option>
              <option value="HOT">HOT (High Score)</option>
              <option value="WARM">WARM (Med Score)</option>
              <option value="COLD">COLD (Low Score)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Main Split Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Lead Queue List */}
        <div className="lg:col-span-1 bg-white border border-gray-150 rounded-2xl shadow-sm flex flex-col overflow-hidden max-h-[600px]">
          <div className="p-4 border-b border-gray-150 bg-gray-50 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-700">Lead Registry ({filteredLeads.length})</span>
          </div>

          <div className="overflow-y-auto divide-y divide-gray-100 flex-1">
            {filteredLeads.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-400">No matching leads found.</div>
            ) : (
              filteredLeads.map(lead => {
                const isSelected = lead.leadId === selectedLeadId;
                const sla = getSlaRemainingText(lead.slaDeadline, lead.status);
                
                return (
                  <button
                    key={lead.leadId}
                    onClick={() => setSelectedLeadId(lead.leadId)}
                    className={`w-full p-4 flex flex-col gap-2 hover:bg-gray-50/50 transition-colors text-left border-l-4 ${
                      isSelected 
                        ? 'border-[#EB0A1E] bg-[#EB0A1E]/5' 
                        : lead.scoreCategory === 'HOT' 
                        ? 'border-red-400' 
                        : lead.scoreCategory === 'WARM' 
                        ? 'border-amber-400' 
                        : 'border-blue-400'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-xs text-gray-800 line-clamp-1">{lead.name}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0 ${
                        lead.scoreCategory === 'HOT' 
                          ? 'bg-red-50 text-red-500' 
                          : lead.scoreCategory === 'WARM' 
                          ? 'bg-amber-50 text-amber-500' 
                          : 'bg-blue-50 text-blue-500'
                      }`}>
                        {lead.scoreCategory} ({lead.score})
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-gray-500">
                      <span className="font-mono">{lead.leadId}</span>
                      <span>{lead.leadType}</span>
                    </div>

                    <div className="flex justify-between items-center mt-1 pt-1.5 border-t border-gray-100/50 text-[10px]">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Building className="h-3 w-3 shrink-0" /> Branch: {lead.branchCode}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded ${sla.color}`}>{sla.text}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Selected Lead Details Console */}
        <div className="lg:col-span-2 bg-white border border-gray-150 rounded-2xl shadow-sm flex flex-col text-left overflow-hidden min-h-[500px]">
          {selectedLead ? (
            <div className="flex flex-col flex-1 divide-y divide-gray-150">
              {/* Profile Card Header */}
              <div className="p-6 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-lg font-extrabold text-gray-900">{selectedLead.name}</span>
                    <span className="text-[10px] font-mono bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                      ID: {selectedLead.leadId}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 space-y-0.5">
                    <p>Phone: <span className="font-semibold text-gray-750">{selectedLead.phone}</span></p>
                    <p>Email: <span className="font-semibold text-gray-750">{selectedLead.email}</span></p>
                  </div>
                </div>

                <div className="flex flex-col text-right items-end gap-1.5">
                  <div className="flex gap-2">
                    <Badge variant="info">Branch: {selectedLead.branchCode}</Badge>
                    <Badge variant="info">Source: {selectedLead.leadSource}</Badge>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                    selectedLead.scoreCategory === 'HOT' 
                      ? 'bg-red-500 text-white' 
                      : selectedLead.scoreCategory === 'WARM' 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}>
                    Priority {selectedLead.scoreCategory} ({selectedLead.score} Score)
                  </span>
                </div>
              </div>

              {/* Status Update & Assignments Controls */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <UserPlus className="h-4 w-4 text-gray-400" /> Lead Owner: {selectedLead.owner || 'Unassigned'}
                  </label>
                  <div className="flex gap-2">
                    <select
                      onChange={(e) => handleAssign(e.target.value)}
                      defaultValue=""
                      className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#EB0A1E] flex-1 bg-white"
                    >
                      <option value="" disabled>Select Manager...</option>
                      {staff.map(name => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <Activity className="h-4 w-4 text-gray-400" /> Current Status: {selectedLead.status}
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={selectedLead.status}
                      onChange={(e) => handleStatusUpdate(e.target.value as LeadStatus)}
                      className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#EB0A1E] flex-1 bg-white"
                    >
                      <option value="NEW">NEW</option>
                      <option value="ASSIGNED">ASSIGNED</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="CONVERTED">CONVERTED</option>
                      <option value="LOST">LOST</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Timeline / Activity Audit Trail */}
              <div className="p-6 flex-1 flex flex-col gap-4">
                <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ClipboardList className="h-4 w-4 text-gray-400" /> Lead Timeline & Activity Log
                </h4>

                <div className="relative border-l-2 border-gray-150 pl-5 ml-2.5 space-y-5 flex-1">
                  {selectedLead.timeline.map((event, index) => {
                    return (
                      <div key={index} className="relative text-xs">
                        {/* Bullet Circle marker */}
                        <div className="absolute -left-[27px] top-0.5 w-3 h-3 rounded-full bg-white border-2 border-[#EB0A1E]" />
                        
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-800">{event.action}</span>
                            <span className="text-[10px] text-gray-400">{new Date(event.timestamp).toLocaleString()}</span>
                          </div>
                          <p className="text-[10px] text-gray-500">Operated by: <span className="font-semibold">{event.operator}</span></p>
                          {event.notes && (
                            <p className="text-[11px] text-gray-600 bg-gray-50 p-2 border border-gray-150 rounded-lg mt-1 italic leading-normal">
                              "{event.notes}"
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 flex-1 text-center text-gray-400">
              <ClipboardList className="h-12 w-12 text-gray-300 mb-3" />
              <p className="text-sm">Select a lead from the registry to view dashboard analytics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
