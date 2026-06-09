import React, { useState } from 'react';
import { MOCK_BOOKINGS } from '@/modules/bookings/services';
import { MOCK_FINANCE_LEADS } from '@/modules/finance/services';
import { MOCK_EXCHANGE_LEADS } from '@/modules/exchange/services';
import { Search, User, Mail, Phone, MapPin, ClipboardList, Car, FileText, CreditCard, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/feedback/Badge';

interface CustomerDirectoryProps {
  className?: string;
}

export const CustomerDirectory: React.FC<CustomerDirectoryProps> = ({ className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>('CUST-001');
  const [activeSubTab, setActiveSubTab] = useState<'timeline' | 'bookings' | 'finance' | 'exchange'>('timeline');

  // Derive unique customer list from all modules
  const customersMap = new Map<string, { customerId: string; displayName: string; email: string; phoneNumber: string }>();

  // Add default mock customer
  customersMap.set('CUST-001', {
    customerId: 'CUST-001',
    displayName: 'Sudhanshu Sekhar',
    email: 'customer@laxmitoyota.com',
    phoneNumber: '9437011223'
  });

  // Pull other customer IDs/names if they exist in bookings
  MOCK_BOOKINGS.forEach(b => {
    if (b.customerId && !customersMap.has(b.customerId)) {
      customersMap.set(b.customerId, {
        customerId: b.customerId,
        displayName: b.customerName || 'Anonymous Customer',
        email: `${b.customerId.toLowerCase()}@laxmitoyota.com`,
        phoneNumber: '9437099999'
      });
    }
  });

  const customersList = Array.from(customersMap.values()).filter(c => 
    c.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCustomer = selectedCustomerId ? customersMap.get(selectedCustomerId) : null;

  // Filter histories for the selected customer
  const customerBookings = MOCK_BOOKINGS.filter(b => b.customerId === selectedCustomerId);
  const customerFinance = MOCK_FINANCE_LEADS.filter(f => f.customerId === selectedCustomerId);
  const customerExchange = MOCK_EXCHANGE_LEADS.filter(e => e.customerId === selectedCustomerId);

  // Compile unified timeline events
  const timelineEvents: { module: string; action: string; timestamp: string; operator: string; notes?: string }[] = [];

  customerBookings.forEach(b => {
    b.timeline?.forEach(t => {
      timelineEvents.push({ module: 'Booking', action: t.action, timestamp: t.timestamp, operator: t.operator, notes: t.notes });
    });
  });

  customerFinance.forEach(f => {
    f.timeline?.forEach(t => {
      timelineEvents.push({ module: 'Finance', action: t.action, timestamp: t.timestamp, operator: t.operator, notes: t.notes });
    });
  });

  customerExchange.forEach(e => {
    e.timeline?.forEach(t => {
      timelineEvents.push({ module: 'Exchange', action: t.action, timestamp: t.timestamp, operator: t.operator, notes: t.notes });
    });
  });

  // Sort timeline events chronologically (newest first)
  timelineEvents.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className={`flex flex-col gap-6 text-left ${className}`}>
      {/* Search Bar */}
      <div className="bg-white p-4 border border-gray-150 rounded-2xl shadow-sm relative">
        <Search className="absolute left-7 top-7 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search Customer Directory by name, email, or Customer ID..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#EB0A1E]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Accounts Queue */}
        <div className="lg:col-span-1 bg-white border border-gray-150 rounded-2xl shadow-sm flex flex-col overflow-hidden max-h-[500px]">
          <div className="p-4 border-b border-gray-150 bg-gray-55/50">
            <span className="text-xs font-bold text-gray-705">Customer Records Directory</span>
          </div>

          <div className="overflow-y-auto divide-y divide-gray-100 flex-1 p-3 space-y-2 bg-gray-55/35">
            {customersList.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-400">No customers found.</div>
            ) : (
              customersList.map(c => {
                const isSel = c.customerId === selectedCustomerId;
                return (
                  <button
                    key={c.customerId}
                    onClick={() => {
                      setSelectedCustomerId(c.customerId);
                      setActiveSubTab('timeline');
                    }}
                    className={`w-full p-4 rounded-xl border text-left flex flex-col gap-1.5 transition-all ${
                      isSel ? 'border-[#EB0A1E] bg-[#EB0A1E]/5 shadow-sm' : 'border-gray-200 bg-white hover:bg-gray-55'
                    }`}
                  >
                    <span className="font-bold text-xs text-gray-800 line-clamp-1">{c.displayName}</span>
                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                      <span>{c.customerId}</span>
                      <span>{c.phoneNumber}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Profiles Details & History Panel */}
        <div className="lg:col-span-2 bg-white border border-gray-150 rounded-2xl shadow-sm flex flex-col overflow-hidden min-h-[450px]">
          {selectedCustomer ? (
            <div className="flex flex-col flex-1 divide-y divide-gray-150">
              {/* Header profile info */}
              <div className="p-6 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-full bg-[#EB0A1E]/10 text-[#EB0A1E] flex items-center justify-center font-black text-sm shrink-0">
                    {selectedCustomer.displayName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-gray-900">{selectedCustomer.displayName}</h3>
                    <span className="text-[10px] font-mono bg-gray-200 text-gray-700 px-2 py-0.5 rounded mt-1 inline-block">
                      {selectedCustomer.customerId}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-xs text-gray-500">
                  <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-gray-400" /> {selectedCustomer.email}</p>
                  <p className="flex items-center gap-1.5 mt-0.5"><Phone className="h-3.5 w-3.5 text-gray-400" /> {selectedCustomer.phoneNumber}</p>
                </div>
              </div>

              {/* Sub tabs navigation */}
              <div className="flex bg-white px-6 py-2 border-b border-gray-100 flex-wrap gap-2">
                {[
                  { id: 'timeline', label: 'Unified Timeline', icon: ClipboardList },
                  { id: 'bookings', label: `Bookings (${customerBookings.length})`, icon: Car },
                  { id: 'finance', label: `Finance (${customerFinance.length})`, icon: FileText },
                  { id: 'exchange', label: `Exchange (${customerExchange.length})`, icon: ShieldCheck }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isAct = activeSubTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSubTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isAct 
                          ? 'bg-gray-900 text-white shadow-sm'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" /> {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Panels */}
              <div className="p-6 flex-1 overflow-y-auto max-h-[350px]">
                {activeSubTab === 'timeline' && (
                  <div className="space-y-4 text-xs border-l-2 border-gray-150 pl-5 ml-2.5 relative">
                    {timelineEvents.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No activity timeline logged yet.</p>
                    ) : (
                      timelineEvents.map((e, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-white border border-[#EB0A1E]" />
                          <div className="flex justify-between items-center font-bold text-gray-855">
                            <span className="flex items-center gap-1.5">
                              <span className="text-[8px] px-1.5 py-0.5 rounded font-black bg-gray-100 text-gray-500 uppercase">{e.module}</span>
                              {e.action}
                            </span>
                            <span className="text-[9px] font-normal text-gray-450">{new Date(e.timestamp).toLocaleString()}</span>
                          </div>
                          <p className="text-[10px] text-gray-500 mt-0.5">Operated by: {e.operator}</p>
                          {e.notes && (
                            <p className="text-[10px] text-gray-605 bg-gray-50 p-2 border border-gray-150 rounded-lg mt-1 italic">
                              "{e.notes}"
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeSubTab === 'bookings' && (
                  <div className="space-y-3">
                    {customerBookings.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No booking history available.</p>
                    ) : (
                      customerBookings.map(b => (
                        <div key={b.bookingId} className="p-4 border border-gray-150 rounded-xl bg-gray-50 flex justify-between items-center flex-wrap gap-3 text-xs">
                          <div>
                            <span className="font-extrabold text-gray-850">{b.vehicleName}</span>
                            <p className="text-[10px] text-gray-400 font-mono mt-0.5">{b.bookingId} | Branch: {b.branchCode}</p>
                          </div>
                          <span className="text-[9px] px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold uppercase">
                            {b.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeSubTab === 'finance' && (
                  <div className="space-y-3">
                    {customerFinance.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No finance application logs available.</p>
                    ) : (
                      customerFinance.map(f => (
                        <div key={f.financeLeadId} className="p-4 border border-gray-150 rounded-xl bg-gray-50 flex justify-between items-center flex-wrap gap-3 text-xs">
                          <div>
                            <span className="font-extrabold text-gray-850">₹{(f.loanAmountRequested || 0).toLocaleString('en-IN')} Requested</span>
                            <p className="text-[10px] text-gray-400 mt-0.5">{f.employerName} ({f.employmentType}) | Tenure: {f.loanTenureYears} Years</p>
                          </div>
                          <span className="text-[9px] px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded font-bold uppercase">
                            {f.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeSubTab === 'exchange' && (
                  <div className="space-y-3">
                    {customerExchange.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No pre-owned exchange logs available.</p>
                    ) : (
                      customerExchange.map(e => (
                        <div key={e.exchangeLeadId} className="p-4 border border-gray-150 rounded-xl bg-gray-50 flex justify-between items-center flex-wrap gap-3 text-xs">
                          <div>
                            <span className="font-extrabold text-gray-855">{e.vehicleDetails.brand} {e.vehicleDetails.model} ({e.vehicleDetails.year})</span>
                            <p className="text-[10px] text-gray-400 mt-0.5">Registration: {e.vehicleDetails.registrationNumber} | Mileage: {e.vehicleDetails.kilometersDriven.toLocaleString('en-IN')} Kms</p>
                          </div>
                          <span className="text-[9px] px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded font-bold uppercase font-mono">
                            {e.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 flex-1 text-center text-gray-450">
              <User className="h-12 w-12 text-gray-300 mb-3" />
              <p className="text-sm">Select a customer record to pull profiling specifications and transaction logs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
