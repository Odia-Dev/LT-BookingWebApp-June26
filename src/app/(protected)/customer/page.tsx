'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/modules/auth';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/feedback/Badge';
import { Button } from '@/components/ui/Button';
import { useBookings } from '@/modules/bookings/hooks';
import { BookingCard, BookingDetailsPanel } from '@/modules/bookings/components';
import { usePayments } from '@/modules/payments/hooks';
import { PaymentHistoryList } from '@/modules/payments/components';
import { 
  Car, 
  CreditCard, 
  FileText, 
  RefreshCw, 
  User, 
  LogOut, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail,
  Loader2,
  Calendar,
  Building,
  CheckCircle2,
  Clock,
  ChevronRight,
  ClipboardList
} from 'lucide-react';

export default function CustomerDashboardPage() {
  const { user, logout, loading } = useAuth();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'payments' | 'finance' | 'exchange'>('profile');

  useEffect(() => {
    if (tabParam && ['profile', 'bookings', 'payments', 'finance', 'exchange'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [tabParam]);

  // Decoupled bookings lookup
  const { bookings, cancelBooking } = useBookings('CUST-001');
  const { payments } = usePayments('CUST-001');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  useEffect(() => {
    if (bookings.length > 0 && !selectedBookingId) {
      setSelectedBookingId(bookings[0].bookingId);
    }
  }, [bookings, selectedBookingId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#EB0A1E]" />
      </div>
    );
  }

  // Fallback user details for mock illustration
  const currentUser = user || {
    displayName: 'Sudhanshu Sekhar',
    email: 'customer@laxmitoyota.com',
    phoneNumber: '9437011223',
    role: 'CUSTOMER',
    verificationLevel: 2,
    status: 'ACTIVE'
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: Car },
    { id: 'payments', label: 'My Payments', icon: CreditCard },
    { id: 'finance', label: 'My Finance', icon: FileText },
    { id: 'exchange', label: 'My Exchange', icon: RefreshCw }
  ] as const;

  const selectedBooking = bookings.find(b => b.bookingId === selectedBookingId);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'BOOKING_CONFIRMED':
      case 'CONFIRMED':
      case 'DELIVERED':
        return <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">Confirmed</span>;
      case 'CANCELLED':
        return <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-bold">Cancelled</span>;
      default:
        return <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold">{status}</span>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-br from-[#111111] via-gray-900 to-red-950 text-white py-12">
        <Container className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="text-left flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-4 w-4" /> Level {currentUser.verificationLevel} Customer Profile
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mt-1">
              Welcome back, {currentUser.displayName}
            </h1>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl text-xs font-bold transition-all"
          >
            <LogOut className="h-4 w-4" /> Log Out
          </button>
        </Container>
      </section>

      {/* 2. Content Layout */}
      <Section className="py-12">
        <Container className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-[#EB0A1E] text-white shadow-sm shadow-[#EB0A1E]/10' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5 shrink-0" /> {tab.label}
                </button>
              );
            })}
          </aside>

          {/* Details Content Box */}
          <main className="lg:col-span-3 bg-white p-8 border border-gray-150 rounded-3xl shadow-sm text-left min-h-[400px]">
            {activeTab === 'profile' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">Profile Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-[#EB0A1E]/10 flex items-center justify-center text-[#EB0A1E]">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">Full Name</span>
                      <p className="text-sm font-bold text-gray-800">{currentUser.displayName}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-[#EB0A1E]/10 flex items-center justify-center text-[#EB0A1E]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">Email Address</span>
                      <p className="text-sm font-bold text-gray-800">{currentUser.email}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-[#EB0A1E]/10 flex items-center justify-center text-[#EB0A1E]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">Mobile Number</span>
                      <p className="text-sm font-bold text-gray-800">{currentUser.phoneNumber}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-[#EB0A1E]/10 flex items-center justify-center text-[#EB0A1E]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">State Region</span>
                      <p className="text-sm font-bold text-gray-800">Odisha, India</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">My Bookings</h3>
                
                {bookings.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-55 border border-dashed border-gray-250 rounded-2xl p-6">
                    <Car className="h-10 w-10 text-gray-400 mb-3" />
                    <h4 className="font-bold text-gray-800">No Active Bookings</h4>
                    <p className="text-xs text-gray-500 max-w-xs mt-1">You haven't reserved any vehicles yet. Explore the showroom page and begin qualification.</p>
                    <a href="/vehicles" className="mt-4">
                      <Button variant="primary" className="h-9 px-6 text-xs font-semibold">Explore Showroom</Button>
                    </a>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    
                    {/* Booking list using BookingCard */}
                    <div className="md:col-span-1 flex flex-col gap-3">
                      {bookings.map(b => (
                        <BookingCard
                          key={b.bookingId}
                          booking={b}
                          isSelected={b.bookingId === selectedBookingId}
                          onClick={() => setSelectedBookingId(b.bookingId)}
                        />
                      ))}
                    </div>

                    {/* Selected Booking details panel using BookingDetailsPanel */}
                    <div className="md:col-span-2 border border-gray-150 rounded-2xl overflow-hidden bg-white shadow-sm">
                      {selectedBooking ? (
                        <BookingDetailsPanel
                          booking={selectedBooking}
                          showAdminControls={false}
                          onCancel={() => cancelBooking(selectedBooking.bookingId, 'CUSTOMER', 'Customer requested cancellation from portal')}
                        />
                      ) : (
                        <div className="text-center text-xs text-gray-400 py-12">Select a booking to view details.</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">My Payments</h3>
                <PaymentHistoryList payments={payments} />
              </div>
            )}

            {activeTab === 'finance' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">My Finance Applications</h3>
                
                {bookings.filter(b => b.financeIntent).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 border border-dashed border-gray-250 rounded-2xl p-6">
                    <FileText className="h-10 w-10 text-gray-400 mb-3" />
                    <h4 className="font-bold text-gray-800">No Finance Applications</h4>
                    <p className="text-xs text-gray-500 max-w-xs mt-1">You have no active finance proposals. You can submit loan applications during booking qualification.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.filter(b => b.financeIntent).map(b => (
                      <div key={b.bookingId} className="p-5 border border-gray-200 rounded-2xl flex justify-between items-center">
                        <div>
                          <span className="font-bold text-xs text-gray-800">{b.vehicleName} Finance Review</span>
                          <p className="text-[10px] text-gray-400">Status: Assigned to Finance Manager</p>
                        </div>
                        <span className="text-xs bg-amber-50 text-amber-500 font-bold px-2 py-0.5 rounded">In Progress</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'exchange' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">My Exchange Leads</h3>
                
                {bookings.filter(b => b.exchangeIntent).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 border border-dashed border-gray-250 rounded-2xl p-6">
                    <RefreshCw className="h-10 w-10 text-gray-400 mb-3" />
                    <h4 className="font-bold text-gray-800">No Exchange Valuations</h4>
                    <p className="text-xs text-gray-500 max-w-xs mt-1">Your old vehicle exchange appraisals and evaluation statuses will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.filter(b => b.exchangeIntent).map(b => (
                      <div key={b.bookingId} className="p-5 border border-gray-200 rounded-2xl flex justify-between items-center">
                        <div>
                          <span className="font-bold text-xs text-gray-800">{b.vehicleName} Appraisal Review</span>
                          <p className="text-[10px] text-gray-400">Status: Assigned to Exchange Coordinator</p>
                        </div>
                        <span className="text-xs bg-blue-50 text-blue-500 font-bold px-2 py-0.5 rounded">Inspection Pending</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </Container>
      </Section>
    </div>
  );
}
