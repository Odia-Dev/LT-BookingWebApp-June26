import React from 'react';
import { Booking, BookingStatus } from '../types';
import { BookingStatusBadge } from './BookingStatusBadge';
import { BookingTimeline } from './BookingTimeline';
import { Badge } from '@/components/feedback/Badge';
import { Edit2, ShieldAlert, FileText, ClipboardList } from 'lucide-react';

interface BookingDetailsPanelProps {
  booking: Booking;
  showAdminControls?: boolean;
  onStatusChange?: (status: BookingStatus) => void;
  onCancel?: () => void;
  className?: string;
}

export const BookingDetailsPanel: React.FC<BookingDetailsPanelProps> = ({
  booking,
  showAdminControls = false,
  onStatusChange,
  onCancel,
  className = ''
}) => {
  return (
    <div className={`flex flex-col flex-1 divide-y divide-gray-150 ${className}`}>
      {/* Profile Header */}
      <div className="p-6 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg font-extrabold text-gray-900">{booking.customerName}</span>
            <span className="text-[10px] font-mono bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
              {booking.bookingId}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1.5">
            <p>
              Phone: <span className="font-semibold text-gray-700">{booking.phone}</span> | Email:{' '}
              <span className="font-semibold text-gray-700">{booking.email}</span>
            </p>
          </div>
        </div>
        <div className="text-right items-end flex flex-col gap-1.5">
          <Badge variant="info">Branch: {booking.branchCode}</Badge>
          <BookingStatusBadge status={booking.status} />
        </div>
      </div>

      {/* Admin Status Modifiers */}
      {showAdminControls && onStatusChange && (
        <div className="p-6 flex flex-col gap-2 bg-white">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <Edit2 className="h-4 w-4 text-gray-400" /> Modify Transaction Status
          </label>
          <div className="flex gap-2">
            <select
              value={booking.status}
              onChange={(e) => onStatusChange(e.target.value as BookingStatus)}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#EB0A1E] flex-1 bg-white font-semibold text-gray-700"
            >
              <option value="INITIATED">INITIATED</option>
              <option value="QUALIFICATION_COMPLETED">QUALIFICATION_COMPLETED</option>
              <option value="PAYMENT_PENDING">PAYMENT_PENDING</option>
              <option value="PAYMENT_RECEIVED">PAYMENT_RECEIVED</option>
              <option value="BOOKING_CONFIRMED">BOOKING_CONFIRMED</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
        </div>
      )}

      {/* Details Specifications Grid */}
      <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50/20 text-xs">
        <div>
          <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Vehicle Model</span>
          <span className="font-bold text-gray-800">{booking.vehicleName}</span>
        </div>
        <div>
          <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Variant Selection</span>
          <span className="font-bold text-gray-800">{booking.variant}</span>
        </div>
        <div>
          <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Paint Scheme</span>
          <span className="font-bold text-gray-800">{booking.color || 'Default Color'}</span>
        </div>
        <div>
          <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Source Attribution</span>
          <span className="font-bold text-gray-800">{booking.sourceCode}</span>
        </div>
      </div>

      {/* Timeline Audit Tracks */}
      <div className="p-6 flex-1 flex flex-col gap-4">
        <BookingTimeline timeline={booking.timeline} />

        {/* Customer Self-cancellation */}
        {!showAdminControls && onCancel && booking.status !== 'CANCELLED' && booking.status !== 'DELIVERED' && (
          <button
            onClick={onCancel}
            className="mt-6 text-center py-3 border border-red-200 hover:bg-red-50 text-red-600 rounded-xl font-bold text-xs transition-all cursor-pointer"
          >
            Cancel Booking Reservation
          </button>
        )}
      </div>
    </div>
  );
};
