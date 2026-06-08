import React, { useState } from 'react';
import { usePayments } from '../hooks';
import { Payment, PaymentStatus, PaymentType } from '../types';
import { Search, Filter, ShieldCheck, RefreshCcw, DollarSign, Calendar, ClipboardList } from 'lucide-react';
import { Badge } from '@/components/feedback/Badge';

interface PaymentsDashboardProps {
  className?: string;
}

export const PaymentsDashboard: React.FC<PaymentsDashboardProps> = ({ className = '' }) => {
  const { payments, initiateRefund } = usePayments();
  const [selectedId, setSelectedId] = useState<string | null>(payments[0]?.paymentId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterType, setFilterType] = useState<string>('ALL');

  const selectedPayment = payments.find(p => p.paymentId === selectedId);

  const filteredPayments = payments.filter(p => {
    const matchesSearch =
      p.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.paymentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bookingId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || p.status === filterStatus;
    const matchesType = filterType === 'ALL' || p.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleRefund = (id: string) => {
    const reason = prompt('Please enter the reason for initiating this transaction refund:');
    if (reason === null) return;
    initiateRefund(id, 'SUPER_ADMIN', reason || 'Refund processed by Admin.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200/50';
      case 'REFUNDED':
        return 'text-blue-700 bg-blue-50 border-blue-200/50';
      case 'FAILED':
        return 'text-red-700 bg-red-50 border-red-200/50';
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
              placeholder="Search payments by Payment ID, Booking ID, or Customer name..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#EB0A1E]"
            />
          </div>
          <div className="flex gap-2 items-center text-xs font-bold text-gray-500 bg-gray-55 px-3 py-2 rounded-xl border border-gray-150">
            <Filter className="h-4 w-4 text-gray-400 shrink-0" /> Matches: {filteredPayments.length}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-450">Payment Status</span>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-lg p-2 text-xs focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-750"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">PENDING</option>
              <option value="SUCCESS">SUCCESS</option>
              <option value="FAILED">FAILED</option>
              <option value="REFUNDED">REFUNDED</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-450">Payment Type</span>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="border border-gray-200 rounded-lg p-2 text-xs focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-755"
            >
              <option value="ALL">All Types</option>
              <option value="Booking Deposit">Booking Deposit</option>
              <option value="Full Payment">Full Payment</option>
              <option value="Balance Payment">Balance Payment</option>
              <option value="Refund">Refund</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payments list queue */}
        <div className="lg:col-span-1 bg-white border border-gray-150 rounded-2xl shadow-sm flex flex-col overflow-hidden max-h-[500px]">
          <div className="p-4 border-b border-gray-150 bg-gray-50/50">
            <span className="text-xs font-bold text-gray-700">Transactions Ledger</span>
          </div>

          <div className="overflow-y-auto divide-y divide-gray-100 flex-1 p-3 space-y-2 bg-gray-55/30">
            {filteredPayments.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-400">No payment logs found.</div>
            ) : (
              filteredPayments.map(p => {
                const isSel = p.paymentId === selectedId;
                return (
                  <button
                    key={p.paymentId}
                    onClick={() => setSelectedId(p.paymentId)}
                    className={`w-full p-4 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                      isSel ? 'border-[#EB0A1E] bg-[#EB0A1E]/5 shadow-sm' : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-1">
                      <span className="font-bold text-xs text-gray-800 line-clamp-1">{p.customerName}</span>
                      <span className={`text-[8px] px-2 py-0.5 rounded font-extrabold uppercase shrink-0 border ${getStatusColor(p.status)}`}>
                        {p.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                      <span>{p.paymentId}</span>
                      <span className="font-bold text-gray-800 font-sans">₹{p.amount.toLocaleString('en-IN')}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Selected payment detail */}
        <div className="lg:col-span-2 bg-white border border-gray-150 rounded-2xl shadow-sm flex flex-col overflow-hidden min-h-[450px]">
          {selectedPayment ? (
            <div className="flex flex-col flex-1 divide-y divide-gray-150">
              
              {/* Header */}
              <div className="p-6 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-extrabold text-gray-900">{selectedPayment.customerName}</span>
                    <span className="text-[10px] font-mono bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                      {selectedPayment.paymentId}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    <p>Booking ID Ref: <span className="font-mono font-bold text-gray-700">{selectedPayment.bookingId}</span></p>
                  </div>
                </div>
                <div className="text-right items-end flex flex-col gap-1.5">
                  <Badge variant="info">{selectedPayment.type}</Badge>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border uppercase ${getStatusColor(selectedPayment.status)}`}>
                    {selectedPayment.status}
                  </span>
                </div>
              </div>

              {/* Refund manager actions */}
              {selectedPayment.status === 'SUCCESS' && (
                <div className="p-6 flex flex-col gap-3 bg-white">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-gray-400" /> Refund Administration
                  </span>
                  <p className="text-[10px] text-gray-400">Initiate gateway transaction refund for this booking deposit. This action is audited.</p>
                  <button
                    onClick={() => handleRefund(selectedPayment.paymentId)}
                    className="self-start px-5 py-2.5 bg-red-650 hover:bg-red-750 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-red-500/10"
                  >
                    Initiate Transaction Refund
                  </button>
                </div>
              )}

              {/* Specs Details */}
              <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50/20 text-xs">
                <div>
                  <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Amount</span>
                  <span className="font-extrabold text-gray-800">₹{selectedPayment.amount.toLocaleString('en-IN')}.00</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Gateway Order</span>
                  <span className="font-mono text-gray-800">{selectedPayment.gatewayOrderId || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Gateway Payment</span>
                  <span className="font-mono text-gray-800">{selectedPayment.gatewayPaymentId || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Date Created</span>
                  <span className="font-bold text-gray-800">{new Date(selectedPayment.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Timeline audit tracks */}
              <div className="p-6 flex-1 flex flex-col gap-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <ClipboardList className="h-4 w-4 text-gray-400" /> Payment Audit Trails
                </h4>

                <div className="border-l-2 border-gray-150 pl-5 ml-2.5 space-y-4 text-xs relative">
                  {selectedPayment.timeline.map((event, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-white border-2 border-[#EB0A1E]" />
                      <div className="flex justify-between items-center font-bold text-gray-855">
                        <span>{event.action}</span>
                        <span className="text-[9px] font-normal text-gray-450">{new Date(event.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">Operated by: {event.operator}</p>
                      {event.notes && (
                        <p className="text-[10px] text-gray-600 bg-gray-55 p-2 border border-gray-150 rounded-lg mt-1 italic">
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
              <p className="text-sm">Select a transaction from the list to view specifications and audit logs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
