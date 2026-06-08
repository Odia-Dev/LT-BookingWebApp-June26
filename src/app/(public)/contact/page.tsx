'use client';

import React, { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { CRMService } from '@/modules/crm/services';
import { CheckCircle2, Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { Badge } from '@/components/feedback/Badge';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branchCode: 'BAM',
    inquiryType: 'CONTACT_LEAD', // CONTACT_LEAD or TEST_DRIVE
    message: '',
    vehicleOfInterest: ''
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
    'Toyota Glanza', 'Toyota Taisor', 'Toyota Rumion', 'Toyota Hyryder',
    'Toyota Innova Crysta', 'Toyota Innova Hycross', 'Toyota Fortuner',
    'Toyota Camry', 'Toyota Hilux', 'Toyota Vellfire', 'Toyota Land Cruiser 300'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call and call CRMService
    setTimeout(() => {
      CRMService.createLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        leadType: formData.inquiryType as any,
        leadSource: 'DIG',
        branchCode: formData.branchCode,
        financeIntent: false,
        exchangeIntent: false
      });
      setLoading(false);
      setSuccess(true);
    }, 800);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <Section className="py-12">
        <Container className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Contact Information Panel */}
          <div className="lg:col-span-2 flex flex-col gap-8 text-left bg-gradient-to-br from-gray-900 via-gray-850 to-red-950 text-white p-8 rounded-3xl shadow-xl">
            <div className="flex flex-col gap-2">
              <Badge variant="info">Get In Touch</Badge>
              <h1 className="text-3xl font-extrabold tracking-tight mt-2">
                Connect With Laxmi Toyota
              </h1>
              <p className="text-gray-300 text-sm leading-relaxed mt-2">
                Reach our nearest branch for ex-showroom price calculations, test drive scheduling, or service bookings. Our team is responsive within SLA protocols.
              </p>
            </div>

            <div className="flex flex-col gap-6 mt-4">
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10 text-red-400">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-200">Customer Hotline</h4>
                  <p className="text-sm font-semibold text-white mt-0.5">+91 94370 12345</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10 text-red-400">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-200">Email Enquiries</h4>
                  <p className="text-sm font-semibold text-white mt-0.5">contact@laxmitoyota.com</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10 text-red-400">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-200">Primary Branch</h4>
                  <p className="text-xs text-white leading-relaxed mt-0.5">
                    NH-16, Laxmi Toyota Plaza, Berhampur, Ganjam, Odisha - 760001
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-6 mt-4">
              <h5 className="font-bold text-xs uppercase tracking-wider text-gray-400">Response SLA Commitments</h5>
              <ul className="text-xs text-gray-300 space-y-1.5 mt-3">
                <li className="flex justify-between"><span>HOT Leads (Bookings/Test Drive)</span> <span className="font-bold text-red-400">5 Mins</span></li>
                <li className="flex justify-between"><span>WARM Leads (Finance/Exchange)</span> <span className="font-bold text-amber-400">30 Mins</span></li>
                <li className="flex justify-between"><span>COLD Leads (General Inquiries)</span> <span className="font-bold text-blue-400">24 Hours</span></li>
              </ul>
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-3 bg-white border border-gray-150 rounded-3xl p-8 shadow-sm text-left">
            {success ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4 animate-bounce" />
                <h3 className="text-2xl font-extrabold text-gray-900">Inquiry Captured Successfully</h3>
                <p className="text-sm text-gray-500 max-w-sm mt-2">
                  Thank you! Your lead has been logged and routed to our sales managers. Under our SLA protocol, we will contact you shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">Submit Inquiry Form</h2>
                  <p className="text-xs text-gray-400 mt-1">Please fill in details below to initiate contact with Laxmi Toyota representatives.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-gray-500">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter full name"
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
                    <label htmlFor="branchCode" className="text-xs font-bold text-gray-500">Nearest Branch</label>
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
                    <label htmlFor="inquiryType" className="text-xs font-bold text-gray-500">Inquiry Classification</label>
                    <select
                      id="inquiryType"
                      value={formData.inquiryType}
                      onChange={e => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                    >
                      <option value="CONTACT_LEAD">General Inquiry (Cold Lead)</option>
                      <option value="TEST_DRIVE">Vehicle Price / Features Request (Hot Lead)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="vehicleOfInterest" className="text-xs font-bold text-gray-500">Vehicle of Interest (Optional)</label>
                    <select
                      id="vehicleOfInterest"
                      value={formData.vehicleOfInterest}
                      onChange={e => setFormData({ ...formData, vehicleOfInterest: e.target.value })}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                    >
                      <option value="">Select Vehicle</option>
                      {vehicles.map(v => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-gray-500">Additional Details / Remarks</label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter any specifications, timeline requirements, or questions..."
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#EB0A1E] text-white hover:bg-[#c90818] rounded-xl font-bold text-sm shadow-md shadow-[#EB0A1E]/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Logging Inquiry...
                    </>
                  ) : (
                    'Submit Request'
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
