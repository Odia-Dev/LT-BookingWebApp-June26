import React from 'react';
import { TrendingUp, Users, Car, FileText, CreditCard, ShieldCheck, DollarSign } from 'lucide-react';

interface AnalyticsOverviewProps {
  className?: string;
}

export const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ className = '' }) => {
  const metrics = [
    { label: 'Daily Leads', value: '14', change: '+27% from yesterday', icon: Users, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { label: 'Weekly Leads', value: '89', change: '+12% from last week', icon: TrendingUp, color: 'text-purple-600 bg-purple-50 border-purple-100' },
    { label: 'Monthly Leads', value: '342', change: '+18% from last month', icon: Users, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { label: 'Active Bookings', value: '47', change: '12 pending allocation', icon: Car, color: 'text-[#EB0A1E] bg-red-50 border-red-100' },
    { label: 'Finance Approval Rate', value: '84%', change: '21 loans disbursed', icon: FileText, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { label: 'Exchange Conversions', value: '71%', change: '9 appraisals accepted', icon: ShieldCheck, color: 'text-amber-600 bg-amber-50 border-amber-100' }
  ];

  return (
    <div className={`flex flex-col gap-6 text-left ${className}`}>
      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.map(m => {
          const Icon = m.icon;
          return (
            <div key={m.label} className={`p-5 border rounded-2xl bg-white shadow-sm flex items-start justify-between gap-3 ${m.color.split(' ')[2]}`}>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{m.label}</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">{m.value}</span>
                <span className="text-[10px] text-gray-400 font-semibold">{m.change}</span>
              </div>
              <div className={`p-3 rounded-xl shrink-0 ${m.color.split(' ')[0]} ${m.color.split(' ')[1]}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue overview segment */}
      <div className="border border-gray-150 rounded-3xl p-6 bg-white shadow-sm flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3 flex-wrap gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gross Booking Sales</span>
            <h4 className="text-2xl font-extrabold text-gray-900 flex items-center gap-1">
              ₹1,48,50,000 <span className="text-xs text-emerald-600 font-normal">(+22% vs target)</span>
            </h4>
          </div>
          <span className="text-[10px] px-2.5 py-1 bg-emerald-50 text-emerald-700 font-extrabold rounded-full border border-emerald-200">
            Q2 Fiscal Performance
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex flex-col gap-1">
            <span className="text-gray-400 font-bold uppercase text-[9px]">Booking Deposits</span>
            <span className="font-extrabold text-gray-800">₹9,40,000</span>
          </div>
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex flex-col gap-1">
            <span className="text-gray-400 font-bold uppercase text-[9px]">Finance Disbursed Value</span>
            <span className="font-extrabold text-gray-800">₹84,00,000</span>
          </div>
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex flex-col gap-1">
            <span className="text-gray-400 font-bold uppercase text-[9px]">Trade-In Exchange Adjusted</span>
            <span className="font-extrabold text-gray-800">₹55,10,000</span>
          </div>
        </div>
      </div>
    </div>
  );
};
