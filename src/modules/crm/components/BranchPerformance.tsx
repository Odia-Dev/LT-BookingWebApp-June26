import React from 'react';
import { Building2, TrendingUp, BarChart2, DollarSign } from 'lucide-react';

interface BranchPerformanceProps {
  className?: string;
}

export const BranchPerformance: React.FC<BranchPerformanceProps> = ({ className = '' }) => {
  const branchData = [
    { name: 'Brahmapur H.O.', code: 'BAM', leads: 184, bookings: 27, revenue: '₹88,20,000', conversion: '14.6%' },
    { name: 'Aska Branch', code: 'ASK', leads: 92, bookings: 12, revenue: '₹37,80,000', conversion: '13.0%' },
    { name: 'Bhanjanagar Outlet', code: 'BHA', leads: 66, bookings: 8, revenue: '₹22,50,000', conversion: '12.1%' }
  ];

  const modelShares = [
    { model: 'Toyota Fortuner', volume: 8, sales: '₹3.44 Cr', percentage: 48 },
    { model: 'Toyota Innova Hycross', volume: 14, sales: '₹2.94 Cr', percentage: 29 },
    { model: 'Toyota Urban Cruiser Hyryder', volume: 18, sales: '₹1.88 Cr', percentage: 17 },
    { model: 'Toyota Glanza / Taisor', volume: 27, sales: '₹1.54 Cr', percentage: 6 }
  ];

  return (
    <div className={`flex flex-col gap-6 text-left ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Branch metrics distribution table */}
        <div className="bg-white p-5 border border-gray-150 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Building2 className="h-4 w-4 text-gray-400" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Branch Performance Logs</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left divide-y divide-gray-100">
              <thead>
                <tr className="text-gray-400 font-bold">
                  <th className="pb-3">Branch Location</th>
                  <th className="pb-3 text-center">Leads</th>
                  <th className="pb-3 text-center">Bookings</th>
                  <th className="pb-3 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                {branchData.map(b => (
                  <tr key={b.code}>
                    <td className="py-3.5 flex flex-col">
                      <span className="font-extrabold text-gray-900">{b.name}</span>
                      <span className="text-[9px] text-gray-400 font-mono mt-0.5">Code: {b.code} | Conv: {b.conversion}</span>
                    </td>
                    <td className="py-3.5 text-center">{b.leads}</td>
                    <td className="py-3.5 text-center">{b.bookings}</td>
                    <td className="py-3.5 text-right text-gray-900 font-bold">{b.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Model distribution chart cards */}
        <div className="bg-white p-5 border border-gray-150 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <BarChart2 className="h-4 w-4 text-gray-400" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Booking Volume Share</span>
          </div>

          <div className="space-y-4">
            {modelShares.map(m => (
              <div key={m.model} className="flex flex-col gap-1.5 text-xs">
                <div className="flex justify-between items-center font-bold text-gray-800">
                  <span>{m.model} ({m.volume})</span>
                  <span className="text-gray-900">{m.sales}</span>
                </div>
                
                {/* Visual bar tracker */}
                <div className="w-full h-2 rounded bg-gray-100 overflow-hidden">
                  <div 
                    className="h-full bg-[#EB0A1E] rounded transition-all"
                    style={{ width: `${m.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
