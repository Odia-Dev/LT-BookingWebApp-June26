'use client';

import React, { useState } from 'react';
import { useAuth } from '@/modules/auth';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/feedback/Badge';
import { Button } from '@/components/ui/Button';
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
  Loader2
} from 'lucide-react';

export default function CustomerDashboardPage() {
  const { user, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'payments' | 'finance' | 'exchange'>('profile');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#EB0A1E]" />
      </div>
    );
  }

  // Fallback user details for mock illustration
  const currentUser = user || {
    displayName: 'Verified Customer',
    email: 'customer@laxmitoyota.com',
    phoneNumber: '9437012345',
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
                <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 border border-dashed border-gray-250 rounded-2xl p-6">
                  <Car className="h-10 w-10 text-gray-400 mb-3" />
                  <h4 className="font-bold text-gray-800">No Active Bookings</h4>
                  <p className="text-xs text-gray-500 max-w-xs mt-1">You haven\'t reserved any vehicles yet. Explore the showroom page and begin qualification.</p>
                  <a href="/vehicles" className="mt-4">
                    <Button variant="primary" className="h-9 px-6 text-xs font-semibold">Explore Showroom</Button>
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">My Payments</h3>
                <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 border border-dashed border-gray-250 rounded-2xl p-6">
                  <CreditCard className="h-10 w-10 text-gray-400 mb-3" />
                  <h4 className="font-bold text-gray-800">No Payment Records</h4>
                  <p className="text-xs text-gray-500 max-w-xs mt-1">Invoice and transaction history from online bookings will appear here.</p>
                </div>
              </div>
            )}

            {activeTab === 'finance' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">My Finance Applications</h3>
                <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 border border-dashed border-gray-250 rounded-2xl p-6">
                  <FileText className="h-10 w-10 text-gray-400 mb-3" />
                  <h4 className="font-bold text-gray-800">No Finance Applications</h4>
                  <p className="text-xs text-gray-500 max-w-xs mt-1">You have no active finance proposals. You can submit loan applications during booking qualification.</p>
                </div>
              </div>
            )}

            {activeTab === 'exchange' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">My Exchange Leads</h3>
                <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 border border-dashed border-gray-250 rounded-2xl p-6">
                  <RefreshCw className="h-10 w-10 text-gray-400 mb-3" />
                  <h4 className="font-bold text-gray-800">No Exchange Valuations</h4>
                  <p className="text-xs text-gray-500 max-w-xs mt-1">Your old vehicle exchange appraisals and evaluation statuses will appear here.</p>
                </div>
              </div>
            )}
          </main>
        </Container>
      </Section>
    </div>
  );
}
