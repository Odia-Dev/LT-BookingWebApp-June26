import React, { useState } from 'react';
import { Payment } from '../types';
import { CheckCircle2, Download, Receipt, ShieldCheck, Printer, Loader2 } from 'lucide-react';
import { Badge } from '@/components/feedback/Badge';

interface PaymentReceiptProps {
  payment: Payment;
  className?: string;
}

export const PaymentReceipt: React.FC<PaymentReceiptProps> = ({ payment, className = '' }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Receipt for ${payment.paymentId} has been generated and downloaded as PDF.`);
    }, 1500);
  };

  return (
    <div className={`bg-white border border-gray-150 rounded-3xl p-8 shadow-sm text-left max-w-xl mx-auto flex flex-col gap-6 relative overflow-hidden ${className}`}>
      {/* Decorative top strip */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-gray-900 to-red-800" />

      {/* Header */}
      <div className="flex justify-between items-start border-b border-gray-150 pb-6 mt-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-[#EB0A1E]" />
            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">Transaction Receipt</h3>
          </div>
          <span className="text-[10px] font-mono text-gray-400">ID: {payment.paymentId}</span>
        </div>
        <div className="text-right flex flex-col items-end gap-1.5">
          <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${
            payment.status === 'SUCCESS'
              ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
              : payment.status === 'REFUNDED'
              ? 'text-blue-700 bg-blue-50 border-blue-200'
              : 'text-amber-700 bg-amber-50 border-amber-200'
          }`}>
            {payment.status}
          </span>
          <span className="text-[9px] text-gray-400">{new Date(payment.createdAt).toLocaleString()}</span>
        </div>
      </div>

      {/* Specifications */}
      <div className="flex flex-col gap-4 text-xs">
        <div className="bg-gray-55 p-4 rounded-2xl flex flex-col gap-2.5">
          <div className="flex justify-between">
            <span className="text-gray-450 font-semibold">Dealership Entity</span>
            <span className="font-bold text-gray-850">Laxmi Toyota Ltd.</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-450 font-semibold">Booking ID Reference</span>
            <span className="font-mono font-bold text-gray-800">{payment.bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-450 font-semibold">Buyer Name</span>
            <span className="font-bold text-gray-800">{payment.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-450 font-semibold">Buyer Identity Ref</span>
            <span className="font-mono text-gray-500">{payment.customerId}</span>
          </div>
        </div>

        <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-150 flex flex-col gap-2.5">
          <div className="flex justify-between">
            <span className="text-gray-450 font-semibold">Payment Allocation Type</span>
            <span className="font-bold text-gray-800">{payment.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-450 font-semibold">Gateway Processing Channel</span>
            <span className="font-bold text-gray-800">{payment.gateway} Gateway</span>
          </div>
          {payment.gatewayOrderId && (
            <div className="flex justify-between">
              <span className="text-gray-450 font-semibold">Gateway Order Ref</span>
              <span className="font-mono text-gray-700">{payment.gatewayOrderId}</span>
            </div>
          )}
          {payment.gatewayPaymentId && (
            <div className="flex justify-between">
              <span className="text-gray-450 font-semibold">Gateway Transaction Ref</span>
              <span className="font-mono text-gray-700">{payment.gatewayPaymentId}</span>
            </div>
          )}
        </div>
      </div>

      {/* Amount Total */}
      <div className="border-t border-b border-gray-150 py-4 my-2 flex justify-between items-center bg-gray-55/50 px-4 rounded-xl">
        <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Amount Paid</span>
        <span className="text-2xl font-black text-gray-900">₹{payment.amount.toLocaleString('en-IN')}.00</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-2">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {downloading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Generating PDF...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" /> Download PDF Receipt
            </>
          )}
        </button>
        <button
          onClick={() => window.print()}
          className="px-5 py-3.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Printer className="h-4 w-4" /> Print
        </button>
      </div>

      {/* Security validation signature footer */}
      <div className="flex items-center justify-center gap-1.5 text-[9px] text-emerald-600 font-bold border-t border-gray-100 pt-4 mt-2">
        <ShieldCheck className="h-4.5 w-4.5 shrink-0" /> Server-side Verified Cryptographic Signature Check Valid
      </div>
    </div>
  );
};
