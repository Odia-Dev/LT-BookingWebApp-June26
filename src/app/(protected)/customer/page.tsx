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
import { useFinance, FinanceApplicationForm, FinanceDocumentUploader } from '@/modules/finance';
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
  const { financeLeads, startFinanceApplication, submitFinanceDetails, uploadFinanceDocument } = useFinance('CUST-001');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [selectedBookingIdForFinance, setSelectedBookingIdForFinance] = useState<string>('');

  useEffect(() => {
    if (bookings.length > 0 && !selectedBookingId) {
      setSelectedBookingId(bookings[0].bookingId);
    }
    if (bookings.length > 0 && !selectedBookingIdForFinance) {
      setSelectedBookingIdForFinance(bookings[0].bookingId);
    }
  }, [bookings, selectedBookingId, selectedBookingIdForFinance]);

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
                
                {financeLeads.length === 0 ? (
                  <div className="flex flex-col gap-6">
                    {bookings.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 border border-dashed border-gray-250 rounded-2xl p-6">
                        <FileText className="h-10 w-10 text-gray-400 mb-3" />
                        <h4 className="font-bold text-gray-800">No Bookings Found</h4>
                        <p className="text-xs text-gray-500 max-w-xs mt-1">You must book a vehicle before applying for finance. Visit the showroom to make a booking.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <div className="p-5 border border-gray-150 rounded-2xl bg-gray-50 flex flex-col gap-3 text-left">
                          <h4 className="font-bold text-sm text-gray-850">Apply for Finance Eligibility</h4>
                          <p className="text-xs text-gray-500">Select an active booking reference to begin your finance eligibility assessment.</p>
                          <div className="flex flex-col gap-1 max-w-xs mt-2">
                            <span className="text-[10px] uppercase font-bold text-gray-450">Active Booking Reference</span>
                            <select
                              value={selectedBookingIdForFinance}
                              onChange={(e) => setSelectedBookingIdForFinance(e.target.value)}
                              className="border border-gray-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-750"
                            >
                              {bookings.map(b => (
                                <option key={b.bookingId} value={b.bookingId}>
                                  {b.vehicleName} ({b.bookingId})
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <FinanceApplicationForm
                          onSubmit={(details) => {
                            if (!selectedBookingIdForFinance) return;
                            const lead = startFinanceApplication(
                              selectedBookingIdForFinance,
                              'CUST-001',
                              currentUser.displayName
                            );
                            submitFinanceDetails(lead.financeLeadId, details);
                          }}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {financeLeads.map(lead => {
                      const associatedBooking = bookings.find(b => b.bookingId === lead.bookingId);
                      const isTerminal = ['APPROVED', 'REJECTED', 'DISBURSED'].includes(lead.status);

                      return (
                        <div key={lead.financeLeadId} className="border border-gray-150 rounded-3xl p-6 flex flex-col gap-6 bg-white shadow-sm">
                          {/* Header */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-extrabold text-base text-gray-900">
                                  {associatedBooking?.vehicleName || 'Vehicle Finance Application'}
                                </span>
                                <span className="text-[10px] font-mono bg-gray-100 text-gray-650 px-2 py-0.5 rounded">
                                  {lead.financeLeadId}
                                </span>
                              </div>
                              <p className="text-[10px] text-gray-455 mt-1">
                                Booking Reference: <span className="font-mono font-bold text-gray-700">{lead.bookingId}</span>
                              </p>
                            </div>
                            <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border uppercase ${
                              ['APPROVED', 'DISBURSED'].includes(lead.status)
                                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                                : lead.status === 'REJECTED'
                                ? 'text-red-700 bg-red-50 border-red-200'
                                : 'text-amber-700 bg-amber-50 border-amber-200'
                            }`}>
                              {lead.status}
                            </span>
                          </div>

                          {/* Summary Details */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                            <div>
                              <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Loan Amount</span>
                              <span className="font-extrabold text-gray-800">₹{(lead.loanAmountRequested || 0).toLocaleString('en-IN')}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Tenure</span>
                              <span className="font-bold text-gray-800">{lead.loanTenureYears} Years</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Employer Name</span>
                              <span className="font-bold text-gray-850">{lead.employerName}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Net Monthly Income</span>
                              <span className="font-bold text-gray-850">₹{lead.monthlyIncome.toLocaleString('en-IN')}</span>
                            </div>
                          </div>

                          {/* Visual Progress Steps */}
                          <div className="flex flex-col gap-2">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Application Milestones</span>
                            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-[10px]">
                              {[
                                { status: 'INITIATED', label: '1. Initiated' },
                                { status: 'DOCUMENT_PENDING', label: '2. Upload Docs' },
                                { status: 'UNDER_REVIEW', label: '3. Under Review' },
                                { status: 'BANK_PROCESSING', label: '4. Bank Processing' },
                                { status: 'APPROVED', label: '5. Approved' },
                                { status: 'DISBURSED', label: '6. Disbursed' }
                              ].map((step) => {
                                const statuses = ['INITIATED', 'DOCUMENT_PENDING', 'UNDER_REVIEW', 'BANK_PROCESSING', 'APPROVED', 'DISBURSED'];
                                const currentIdx = statuses.indexOf(lead.status);
                                const stepIdx = statuses.indexOf(step.status);
                                const isCompleted = stepIdx <= currentIdx;
                                const isCurrent = step.status === lead.status;

                                return (
                                  <div
                                    key={step.status}
                                    className={`p-2.5 rounded-xl border font-bold transition-all ${
                                      isCurrent
                                        ? 'bg-[#EB0A1E] text-white border-[#EB0A1E]'
                                        : isCompleted
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : 'bg-gray-50 text-gray-400 border-gray-150'
                                    }`}
                                  >
                                    {step.label}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Document Section */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-2">
                            {/* Upload area */}
                            {!isTerminal && (
                              <div className="flex flex-col gap-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Submit Verification Docs</span>
                                <FinanceDocumentUploader
                                  onUpload={(category, fileName, path) =>
                                    uploadFinanceDocument(lead.financeLeadId, category, fileName, path)
                                  }
                                />
                              </div>
                            )}

                            {/* Uploaded registry */}
                            <div className="flex flex-col gap-2 flex-1">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Uploaded Documents ({lead.documents.length})</span>
                              {lead.documents.length === 0 ? (
                                <p className="text-xs text-gray-400 italic p-4 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                                  No verification documents uploaded yet. Please submit proofs above.
                                </p>
                              ) : (
                                <div className="space-y-2">
                                  {lead.documents.map(d => (
                                    <div key={d.documentId} className="flex justify-between items-center p-3 border border-gray-150 rounded-xl bg-gray-50">
                                      <div className="flex flex-col text-left">
                                        <span className="font-bold text-xs text-gray-800">{d.category}</span>
                                        <span className="text-[9px] font-mono text-gray-450 mt-0.5">{d.fileName}</span>
                                      </div>
                                      <span className={`text-[9px] px-2 py-0.5 rounded font-extrabold uppercase border ${
                                        d.status === 'VERIFIED'
                                          ? 'text-emerald-700 bg-emerald-50 border-emerald-250/50'
                                          : 'text-blue-700 bg-blue-50 border-blue-250/50'
                                      }`}>
                                        {d.status}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Audit logs */}
                          <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Audit Log History</span>
                            <div className="border-l-2 border-gray-150 pl-4 ml-1.5 space-y-3 text-[11px]">
                              {lead.timeline.map((item, idx) => (
                                <div key={idx} className="relative">
                                  <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-white border border-[#EB0A1E]" />
                                  <div className="flex justify-between items-center font-bold text-gray-700">
                                    <span>{item.action}</span>
                                    <span className="font-normal text-gray-455">{new Date(item.timestamp).toLocaleString()}</span>
                                  </div>
                                  <p className="text-[10px] text-gray-455 mt-0.5">Operator: {item.operator}</p>
                                  {item.notes && <p className="text-[10px] text-gray-550 italic bg-gray-50/50 p-1.5 rounded mt-0.5">"{item.notes}"</p>}
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) }

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
