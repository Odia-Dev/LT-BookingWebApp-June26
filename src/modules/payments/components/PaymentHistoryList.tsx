import React, { useState } from 'react';
import { Payment } from '../types';
import { CreditCard, Eye, ArrowRight, ShieldCheck, Receipt } from 'lucide-react';
import { PaymentReceipt } from './PaymentReceipt';

interface PaymentHistoryListProps {
  payments: Payment[];
  className?: string;
}

export const PaymentHistoryList: React.FC<PaymentHistoryListProps> = ({ payments, className = '' }) => {
  const [activeReceipt, setActiveReceipt] = useState<Payment | null>(null);

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
    <div className={`flex flex-col gap-6 ${className}`}>
      {activeReceipt ? (
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setActiveReceipt(null)}
            className="self-start px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-650 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            ← Back to Payment History List
          </button>
          <PaymentReceipt payment={activeReceipt} />
        </div>
      ) : (
        <div className="space-y-4">
          {payments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-55 border border-dashed border-gray-250 rounded-3xl p-6">
              <CreditCard className="h-10 w-10 text-gray-400 mb-3" />
              <h4 className="font-bold text-gray-800">No Payment Records Found</h4>
              <p className="text-xs text-gray-500 max-w-xs mt-1">Invoice and transaction history from online bookings will appear here.</p>
            </div>
          ) : (
            payments.map(p => (
              <div
                key={p.paymentId}
                className="p-5 border border-gray-200 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-sm transition-all bg-white"
              >
                <div className="flex gap-3.5 items-center text-left">
                  <div className="w-10 h-10 rounded-full bg-red-50 text-[#EB0A1E] flex items-center justify-center shrink-0">
                    <Receipt className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-gray-800 block">
                      {p.type} — {p.gateway} Checkout
                    </span>
                    <span className="font-mono text-[9px] text-gray-450 block mt-0.5">ID: {p.paymentId}</span>
                    <span className="text-[10px] text-gray-500 block mt-0.5">Booking Ref: <span className="font-mono font-bold text-gray-700">{p.bookingId}</span></span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <span className="font-black text-sm text-gray-900 block">₹{p.amount.toLocaleString('en-IN')}.00</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase border mt-1 ${getStatusColor(p.status)}`}>
                      {p.status}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveReceipt(p)}
                    className="p-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold"
                  >
                    <Eye className="h-4 w-4" /> View Receipt
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
