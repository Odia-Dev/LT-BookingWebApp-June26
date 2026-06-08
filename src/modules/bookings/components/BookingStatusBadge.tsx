import React from 'react';
import { BookingStatus } from '../types';

interface BookingStatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status, className = '' }) => {
  const getStyles = (status: BookingStatus) => {
    switch (status) {
      case 'BOOKING_CONFIRMED':
      case 'DELIVERED':
      case 'OTP_VERIFIED':
      case 'PAYMENT_RECEIVED':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200/60';
      case 'CANCELLED':
        return 'text-red-700 bg-red-50 border-red-200/60';
      case 'INITIATED':
      case 'QUALIFICATION_PENDING':
      case 'OTP_PENDING':
      case 'PAYMENT_PENDING':
        return 'text-amber-700 bg-amber-50 border-amber-200/60';
      case 'QUALIFICATION_COMPLETED':
      case 'FINANCE_PENDING':
      case 'FINANCE_IN_PROGRESS':
      case 'EXCHANGE_IN_PROGRESS':
      case 'DELIVERY_PENDING':
        return 'text-blue-700 bg-blue-50 border-blue-200/60';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200/60';
    }
  };

  const getLabel = (status: BookingStatus) => {
    return status.replace(/_/g, ' ');
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase rounded-full border transition-all ${getStyles(
        status
      )} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75 animate-pulse" />
      {getLabel(status)}
    </span>
  );
};
