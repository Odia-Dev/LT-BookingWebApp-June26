import React from 'react';
import { Booking } from '../types';
import { BookingStatusBadge } from './BookingStatusBadge';
import { Calendar, Building, Car } from 'lucide-react';

interface BookingCardProps {
  booking: Booking;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  isSelected = false,
  onClick,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl border text-left flex flex-col gap-2.5 transition-all ${
        isSelected
          ? 'border-[#EB0A1E] bg-[#EB0A1E]/5 shadow-sm shadow-[#EB0A1E]/5'
          : 'border-gray-200 hover:bg-gray-50 bg-white'
      } ${className}`}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4 text-gray-400 shrink-0" />
          <span className="font-extrabold text-xs text-gray-900 line-clamp-1">
            {booking.vehicleName}
          </span>
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>

      <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
        <span>{booking.bookingId}</span>
        <span className="font-bold text-gray-700 font-sans">{booking.variant}</span>
      </div>

      <div className="flex justify-between items-center mt-1 pt-2 border-t border-gray-100 text-[10px] text-gray-400">
        <span className="flex items-center gap-1 font-semibold">
          <Building className="h-3.5 w-3.5 text-gray-400 shrink-0" /> Branch: {booking.branchCode}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5 text-gray-400 shrink-0" /> {new Date(booking.createdAt).toLocaleDateString()}
        </span>
      </div>
    </button>
  );
};
