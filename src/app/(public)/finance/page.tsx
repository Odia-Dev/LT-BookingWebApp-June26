'use client';

import React, { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { CRMService } from '@/modules/crm/services';
import { CheckCircle2, Loader2, Landmark, FileText, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/feedback/Badge';

export default function FinancePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branchCode: 'BAM',
    vehicle: 'hyryder',
    employmentType: 'SALARIED', // SALARIED or SELF_EMPLOYED
    monthlyIncome: '',
    loanAmount: '',
    loanTenure: '5', // Years
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const branches = [
    { code: 'BAM', name: 'Berhampur (BAM)' },
    { code: 'JEY', name: 'Jeypore (JEY)' },
    { code: 'BAR', name: 'Bargarh (BAR)' },
    { code: 'BAL', name: 'Balangir (BAL)' },
    { code: 'RAY', name: 'Rayagada (RAY)' },
    { code: 'BHA', name: 'Bhawanipatna (BHA)' },
    { code: 'PAR', name: 'Paralakhemundi (PAR)' },
    { code: 'ASK', name: 'Aska (ASK)' }
  ];

  const vehicles = [
    { slug: 'glanza', name: 'Toyota Glanza' },
    { slug: 'taisor', name: 'Toyota Taisor' },
    { slug: 'rumion', name: 'Toyota Rumion' },
    { slug: 'hyryder', name: 'Toyota Hyryder' },
    { slug: 'crysta', name: 'Toyota Innova Crysta' },
    { slug: 'hycross', name: 'Toyota Innova Hycross' },
    { slug: 'fortuner', name: 'Toyota Fortuner' },
    { slug: 'camry', name: 'Toyota Camry' },
    { slug: 'hilux', name: 'Toyota Hilux' },
    { slug: 'vellfire', name: 'Toyota Vellfire' },
    { slug: 'land-cruiser', name: 'Toyota Land Cruiser 300' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate approval and logging CRM Lead
    setTimeout(() => {
      CRMService.createLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        leadType: 'FINANCE',
        leadSource: 'DIG',
        branchCode: formData.branchCode,
        financeIntent: true,
        exchangeIntent: false
      });
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <Section className="py-12">
        <Container className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Info Column */}
          <div className="lg:col-span-2 flex flex-col gap-6 text-left bg-gradient-to-br from-gray-900 via-gray-850 to-red-950 text-white p-8 rounded-3xl shadow-xl">
            <div className="flex flex-col gap-2">
              <Badge variant="info">Toyota Finance Desk</Badge>
              <h1 className="text-3xl font-extrabold tracking-tight mt-2">
                Fast Loan Eligibility Check
              </h1>
              <p className="text-gray-300 text-xs leading-relaxed mt-2">
                Apply online to get linked with official Toyota financial partners. Under our service SLA, your application will be assigned to a Finance Manager within 30 minutes.
              </p>
            </div>

            <div className="flex flex-col gap-4 text-xs mt-2 text-gray-300">
              <div className="flex gap-3 items-start">
                <Landmark className="h-5 w-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Tie-ups with Top Banks</h4>
                  <p className="text-gray-400 mt-0.5">Partnered with SBI, HDFC, ICICI, and Toyota Financial Services (TFS) for lowest interest rates.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <FileText className="h-5 w-5 text-blue-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Paperless Digital Process</h4>
                  <p className="text-gray-400 mt-0.5">Upload minimal documents and verify instantly to generate digital loan quotes.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-2">
              <h5 className="font-bold text-xs uppercase text-red-400">SLA Tracking Parameters</h5>
              <p className="text-[11px] text-gray-300 mt-1">Finance applications are classified as WARM leads. Maximum assignment response deadline is 30 minutes.</p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-3 bg-white border border-gray-150 rounded-3xl p-8 shadow-sm text-left">
            {success ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle className="h-16 w-16 text-emerald-500 mb-4 animate-bounce" />
                <h3 className="text-2xl font-extrabold text-gray-900">Finance Lead Logged</h3>
                <p className="text-sm text-gray-500 max-w-sm mt-2">
                  Your loan inquiry has been generated and routed. A Finance Manager will verify your profile and contact you within 30 minutes.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all"
                >
                  New Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">Apply for Finance Approval</h2>
                  <p className="text-xs text-gray-450 mt-1">Enter your employment and income specifics to calculate credit scores.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-gray-500">Applicant Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Applicant full name"
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-bold text-gray-500">Mobile Number</label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      pattern="^[6-9]\d{9}$"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-gray-500">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="branchCode" className="text-xs font-bold text-gray-500">Preferred Dealership Branch</label>
                    <select
                      id="branchCode"
                      value={formData.branchCode}
                      onChange={e => setFormData({ ...formData, branchCode: e.target.value })}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                    >
                      {branches.map(b => (
                        <option key={b.code} value={b.code}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="vehicle" className="text-xs font-bold text-gray-500">Model of Interest</label>
                    <select
                      id="vehicle"
                      value={formData.vehicle}
                      onChange={e => setFormData({ ...formData, vehicle: e.target.value })}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                    >
                      {vehicles.map(v => (
                        <option key={v.slug} value={v.slug}>{v.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="employmentType" className="text-xs font-bold text-gray-500">Employment Type</label>
                    <select
                      id="employmentType"
                      value={formData.employmentType}
                      onChange={e => setFormData({ ...formData, employmentType: e.target.value })}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                    >
                      <option value="SALARIED">Salaried Employee</option>
                      <option value="SELF_EMPLOYED">Self-Employed Professional</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="monthlyIncome" className="text-xs font-bold text-gray-500">Monthly Net Income (₹)</label>
                    <input
                      id="monthlyIncome"
                      type="number"
                      required
                      value={formData.monthlyIncome}
                      onChange={e => setFormData({ ...formData, monthlyIncome: e.target.value })}
                      placeholder="e.g. 75000"
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="loanAmount" className="text-xs font-bold text-gray-500">Expected Loan Amount (₹)</label>
                    <input
                      id="loanAmount"
                      type="number"
                      required
                      value={formData.loanAmount}
                      onChange={e => setFormData({ ...formData, loanAmount: e.target.value })}
                      placeholder="e.g. 800000"
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#EB0A1E] text-white hover:bg-[#c90818] rounded-xl font-bold text-sm shadow-md shadow-[#EB0A1E]/10 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Verifying Credit Profile...
                    </>
                  ) : (
                    'Submit Finance Lead'
                  )}
                </button>
              </form>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
