import React from 'react';

interface BookingSummaryProps {
  vehicleName: string;
  variant: string;
  color?: string;
  branchName: string;
  customerName: string;
  phone: string;
  email: string;
  leadType: 'BOOKING' | 'TEST_DRIVE';
  tokenPrice?: number;
  className?: string;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  vehicleName,
  variant,
  color,
  branchName,
  customerName,
  phone,
  email,
  leadType,
  tokenPrice = 25000,
  className = ''
}) => {
  return (
    <div className={`bg-gray-55 border border-gray-150 rounded-2xl p-5 text-xs flex flex-col gap-3 ${className}`}>
      <div className="flex justify-between border-b border-gray-150 pb-2">
        <span className="font-bold text-gray-800 uppercase tracking-wider">Selection Spec</span>
        <span className="font-bold text-gray-800 uppercase tracking-wider">Detail</span>
      </div>
      <div className="flex justify-between items-center py-1">
        <span className="text-gray-500">Model Name</span>
        <span className="font-bold text-gray-800">{vehicleName}</span>
      </div>
      <div className="flex justify-between items-center py-1">
        <span className="text-gray-500">Variant</span>
        <span className="font-semibold text-gray-700">{variant}</span>
      </div>
      <div className="flex justify-between items-center py-1">
        <span className="text-gray-500">Paint Scheme</span>
        <span className="font-semibold text-gray-700">{color || 'Default Paint'}</span>
      </div>
      <div className="flex justify-between items-center py-1">
        <span className="text-gray-500">dealership Location</span>
        <span className="font-semibold text-gray-700">{branchName}</span>
      </div>
      <div className="flex justify-between items-center py-1 border-t border-gray-100 pt-2 mt-1">
        <span className="text-gray-500">Buyer Profile</span>
        <span className="font-bold text-gray-800 text-right">
          {customerName}
          <span className="block text-[10px] font-normal text-gray-400 mt-0.5">{phone} | {email}</span>
        </span>
      </div>

      <div className="flex justify-between items-center border-t border-gray-150 pt-3 mt-1 font-bold">
        <span>Reservation Mode</span>
        {leadType === 'BOOKING' ? (
          <span className="text-[#EB0A1E] text-sm">Online Reservation (₹{tokenPrice.toLocaleString('en-IN')})</span>
        ) : (
          <span className="text-blue-600 text-sm">Free Test Drive Slot</span>
        )}
      </div>
    </div>
  );
};
