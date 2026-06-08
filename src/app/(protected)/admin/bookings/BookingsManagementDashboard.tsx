'use client';

import React, { useState } from 'react';
import { useBookings } from '@/modules/bookings/hooks';
import { BookingStatus } from '@/modules/bookings/types';
import { BookingCard, BookingDetailsPanel } from '@/modules/bookings/components';
import { Search, Filter, ClipboardList } from 'lucide-react';

export default function BookingsManagementDashboard() {
  const { bookings, updateBookingStatus } = useBookings();
  const [selectedId, setSelectedId] = useState<string | null>(bookings[0]?.bookingId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBranch, setFilterBranch] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const selectedBooking = bookings.find(b => b.bookingId === selectedId);

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bookingId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBranch = filterBranch === 'ALL' || b.branchCode === filterBranch;
    const matchesStatus = filterStatus === 'ALL' || b.status === filterStatus;

    return matchesSearch && matchesBranch && matchesStatus;
  });

  const handleStatusChange = (status: BookingStatus) => {
    if (!selectedId) return;
    updateBookingStatus(selectedId, status, 'SUPER_ADMIN', `Status updated manually to ${status}`);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'BOOKING_CONFIRMED':
      case 'DELIVERED':
        return 'text-emerald-600 bg-emerald-50';
      case 'CANCELLED':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-amber-600 bg-amber-50';
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      {/* Search and filter controls */}
      <div className="bg-white p-5 border border-gray-150 rounded-2xl flex flex-col gap-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings by ID, customer name, phone, email..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#EB0A1E]"
            />
          </div>
          <div className="flex gap-2 items-center text-xs font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-xl border border-gray-150">
            <Filter className="h-4 w-4 text-gray-400 shrink-0" /> Matches: {filteredBookings.length}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Branch</span>
            <select
              value={filterBranch}
              onChange={e => setFilterBranch(e.target.value)}
              className="border border-gray-200 rounded-lg p-2 text-xs focus:outline-none focus:border-[#EB0A1E] bg-white"
            >
              <option value="ALL">All Branches</option>
              <option value="BAM">Berhampur (BAM)</option>
              <option value="JEY">Jeypore (JEY)</option>
              <option value="BAR">Bargarh (BAR)</option>
              <option value="BAL">Balangir (BAL)</option>
              <option value="RAY">Rayagada (RAY)</option>
              <option value="BHA">Bhawanipatna (BHA)</option>
              <option value="PAR">Paralakhemundi (PAR)</option>
              <option value="ASK">Aska (ASK)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Booking Status</span>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-lg p-2 text-xs focus:outline-none focus:border-[#EB0A1E] bg-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="INITIATED">INITIATED</option>
              <option value="BOOKING_CONFIRMED">CONFIRMED</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bookings Queue */}
        <div className="lg:col-span-1 bg-white border border-gray-150 rounded-2xl shadow-sm flex flex-col overflow-hidden max-h-[500px]">
          <div className="p-4 border-b border-gray-150 bg-gray-50">
            <span className="text-xs font-bold text-gray-700">Transactional Bookings</span>
          </div>

          <div className="overflow-y-auto divide-y divide-gray-100 flex-1 p-3 space-y-2 bg-gray-50/20">
            {filteredBookings.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-400">No bookings found.</div>
            ) : (
              filteredBookings.map(b => (
                <BookingCard
                  key={b.bookingId}
                  booking={b}
                  isSelected={b.bookingId === selectedId}
                  onClick={() => setSelectedId(b.bookingId)}
                />
              ))
            )}
          </div>
        </div>

        {/* Selected Booking Detail */}
        <div className="lg:col-span-2 bg-white border border-gray-150 rounded-2xl shadow-sm flex flex-col overflow-hidden min-h-[450px]">
          {selectedBooking ? (
            <BookingDetailsPanel
              booking={selectedBooking}
              showAdminControls={true}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-12 flex-1 text-center text-gray-450">
              <ClipboardList className="h-12 w-12 text-gray-300 mb-3" />
              <p className="text-sm">Select a booking transaction from the list to view audit trails.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
