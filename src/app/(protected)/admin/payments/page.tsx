'use client';

import React from 'react';
import { PaymentsDashboard } from '@/modules/payments/components';

export default function AdminPaymentsPage() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm">
      <div className="border-b border-gray-100 pb-3 mb-6 text-left">
        <h1 className="text-2xl font-extrabold text-gray-900 font-mono tracking-tight">
          Admin Payments Ledger
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Dealer Control Desk overview of transaction order flows, invoice verification, and refund management.
        </p>
      </div>
      <PaymentsDashboard />
    </div>
  );
}
