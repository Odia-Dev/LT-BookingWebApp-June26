'use client';

import React, { useState } from 'react';
import { useAuth } from '@/modules/auth';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/feedback/Badge';
import { 
  ShieldAlert, 
  Users, 
  Briefcase, 
  FileCheck, 
  Map, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  ClipboardList,
  Loader2,
  CreditCard,
  BarChart3
} from 'lucide-react';
import LeadQueueDashboard from './leads/LeadQueueDashboard';
import BookingsManagementDashboard from './bookings/BookingsManagementDashboard';
import { PaymentsDashboard } from '@/modules/payments/components';
import { FinanceDashboard } from '@/modules/finance';
import { ExchangeDashboard } from '@/modules/exchange';
import { AnalyticsOverview, BranchPerformance, CustomerDirectory } from '@/modules/crm';
import { AnalyticsDashboard } from '@/modules/analytics';

export default function AdminDashboardPage() {
  const { user, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'payments' | 'customers' | 'finance' | 'exchange' | 'audit' | 'analytics'>('overview');
  const [bookingSubTab, setBookingSubTab] = useState<'leads' | 'bookings'>('leads');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#EB0A1E]" />
      </div>
    );
  }

  // Fallback user details for mock illustration
  const currentUser = user || {
    displayName: 'Branch Manager',
    email: 'branch@laxmitoyota.com',
    phoneNumber: '9437012345',
    role: 'BRANCH_MANAGER',
    verificationLevel: 3,
    status: 'ACTIVE'
  };

  const tabs: { id: 'overview' | 'bookings' | 'payments' | 'customers' | 'finance' | 'exchange' | 'audit' | 'analytics'; label: string; icon: any; roles: string[] }[] = [
    { id: 'overview', label: 'Admin Overview', icon: ClipboardList, roles: ['SUPER_ADMIN', 'BRANCH_MANAGER', 'SALES_MANAGER', 'FINANCE_MANAGER'] },
    { id: 'bookings', label: 'Manage Bookings', icon: Briefcase, roles: ['SUPER_ADMIN', 'BRANCH_MANAGER', 'SALES_MANAGER'] },
    { id: 'payments', label: 'Manage Payments', icon: CreditCard, roles: ['SUPER_ADMIN', 'BRANCH_MANAGER'] },
    { id: 'customers', label: 'Customer Management', icon: Users, roles: ['SUPER_ADMIN', 'BRANCH_MANAGER'] },
    { id: 'finance', label: 'Finance Applications', icon: FileCheck, roles: ['SUPER_ADMIN', 'BRANCH_MANAGER', 'FINANCE_MANAGER'] },
    { id: 'exchange', label: 'Exchange Appraisals', icon: ShieldCheck, roles: ['SUPER_ADMIN', 'BRANCH_MANAGER', 'SALES_MANAGER'] },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3, roles: ['SUPER_ADMIN', 'BRANCH_MANAGER', 'SALES_MANAGER', 'FINANCE_MANAGER'] },
    { id: 'audit', label: 'System Audit Logs', icon: ShieldAlert, roles: ['SUPER_ADMIN'] }
  ];


  // Filter tabs based on role
  const visibleTabs = tabs.filter(tab => tab.roles.includes(currentUser.role));

  const stats = [
    { label: 'Pending Bookings', value: '14', color: 'text-amber-600 bg-amber-50' },
    { label: 'Active Leads', value: '47', color: 'text-blue-600 bg-blue-50' },
    { label: 'Finance Leads', value: '23', color: 'text-purple-600 bg-purple-50' },
    { label: 'Exchange Appraisals', value: '9', color: 'text-emerald-600 bg-emerald-50' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-850 to-red-950 text-white py-12">
        <Container className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="text-left flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-xs font-semibold text-red-400">
              <ShieldCheck className="h-4 w-4" /> Role: {currentUser.role}
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mt-1">
              Laxmi Toyota Control Desk
            </h1>
            <p className="text-xs text-gray-400">Logged in as: {currentUser.displayName} ({currentUser.email})</p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl text-xs font-bold transition-all"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </Container>
      </section>

      {/* 2. Content Layout */}
      <Section className="py-12">
        <Container className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col gap-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">Role Navigation</h3>
            {visibleTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-gray-900 text-white shadow-md' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5 shrink-0" /> {tab.label}
                </button>
              );
            })}
          </aside>

          {/* Details Content Box */}
          <main className="lg:col-span-3 bg-white p-8 border border-gray-150 rounded-3xl shadow-sm text-left min-h-[450px]">
            {activeTab === 'overview' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">Operational Desk Overview</h3>
                <AnalyticsOverview />
                
                {['SUPER_ADMIN', 'BRANCH_MANAGER'].includes(currentUser.role) && (
                  <div className="mt-4 flex flex-col gap-4">
                    <h3 className="text-lg font-extrabold text-gray-900 border-b border-gray-100 pb-2">Branch Operational Share</h3>
                    <BranchPerformance />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 flex-wrap gap-4 text-left">
                  <h3 className="text-xl font-extrabold text-gray-900 font-mono tracking-tight">Lead & Booking Control</h3>
                  
                  {/* Sub tab toggler */}
                  <div className="flex gap-1.5 p-1 bg-gray-100 rounded-xl">
                    <button
                      onClick={() => setBookingSubTab('leads')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        bookingSubTab === 'leads'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      CRM Lead Queue
                    </button>
                    <button
                      onClick={() => setBookingSubTab('bookings')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        bookingSubTab === 'bookings'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      Bookings Registry
                    </button>
                  </div>
                </div>

                {bookingSubTab === 'leads' ? (
                  <LeadQueueDashboard />
                ) : (
                  <BookingsManagementDashboard />
                )}
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">Payments Administration</h3>
                <PaymentsDashboard />
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">Customer Directory</h3>
                <CustomerDirectory />
              </div>
            )}

            {activeTab === 'finance' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">Finance Reviews</h3>
                <FinanceDashboard />
              </div>
            )}

            {activeTab === 'exchange' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">Exchange Valuation Desk</h3>
                <ExchangeDashboard />
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">Analytics & Operations Reports</h3>
                <AnalyticsDashboard userRole={currentUser.role as any} />
              </div>
            )}

            {activeTab === 'audit' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">Security Audits Logs</h3>
                <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 border border-dashed border-gray-250 rounded-2xl p-6">
                  <ShieldAlert className="h-10 w-10 text-gray-400 mb-3" />
                  <h4 className="font-bold text-gray-800">System Activity Logs Stub</h4>
                  <p className="text-xs text-gray-500 max-w-xs mt-1">Super Admin audit log database. Captures all role updates, account suspensions, and session failures.</p>
                </div>
              </div>
            )}
          </main>
        </Container>
      </Section>
    </div>
  );
}
