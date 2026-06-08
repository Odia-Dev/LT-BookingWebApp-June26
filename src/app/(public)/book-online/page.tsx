'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { CRMService } from '@/modules/crm/services';
import { CheckCircle2, Loader2, Sparkles, CreditCard, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/feedback/Badge';

export default function BookOnlinePage() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') === 'test-drive' ? 'TEST_DRIVE' : 'BOOKING';
  const initialVehicle = searchParams.get('vehicle') || 'hyryder';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branchCode: 'BAM',
    leadType: initialType, // BOOKING or TEST_DRIVE
    vehicle: initialVehicle,
    variant: '',
    financeIntent: false,
    exchangeIntent: false,
    paymentSuccess: false
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

  const variantsMap: Record<string, string[]> = {
    'glanza': ['E', 'S', 'G', 'V'],
    'taisor': ['E', 'S', 'S+', 'G', 'V'],
    'rumion': ['S', 'G', 'V'],
    'hyryder': ['S', 'G', 'V', 'Hybrid V'],
    'crysta': ['G', 'GX', 'VX', 'ZX'],
    'hycross': ['G', 'GX', 'VX Hybrid', 'ZX Hybrid'],
    'fortuner': ['Standard', 'Legender', 'GR-S'],
    'camry': ['2.5L Hybrid'],
    'hilux': ['Std', 'High', 'High AT'],
    'vellfire': ['VIP Lounge'],
    'land-cruiser': ['ZX Diesel']
  };

  useEffect(() => {
    const list = variantsMap[formData.vehicle] || [];
    setFormData(prev => ({ ...prev, variant: list[0] || '' }));
  }, [formData.vehicle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate Payment Gateway or booking registration
    setTimeout(() => {
      CRMService.createLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        leadType: formData.leadType as any,
        leadSource: 'DIG',
        branchCode: formData.branchCode,
        financeIntent: formData.financeIntent,
        exchangeIntent: formData.exchangeIntent
      });
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  const currentVehicleName = vehicles.find(v => v.slug === formData.vehicle)?.name || '';

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <Section className="py-12">
        <Container className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Reservation details banner */}
          <div className="lg:col-span-2 flex flex-col gap-6 text-left bg-gradient-to-br from-gray-900 via-gray-850 to-red-950 text-white p-8 rounded-3xl shadow-xl">
            <div className="flex flex-col gap-2">
              <Badge variant="info">Digital Reservation</Badge>
              <h1 className="text-3xl font-extrabold tracking-tight mt-2">
                {formData.leadType === 'BOOKING' ? 'Reserve Your Toyota' : 'Schedule Test Drive'}
              </h1>
              <p className="text-gray-300 text-xs leading-relaxed mt-2">
                {formData.leadType === 'BOOKING' 
                  ? 'Confirm your reservation token fully online. Your application triggers a HOT SLA response (5 minutes assignment) at your chosen Laxmi Toyota branch.'
                  : 'Experience the premium comfort of Toyota. Book an on-road test drive at your preferred branch today.'}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 mt-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" /> Live Selection Summary
              </h3>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Model:</span>
                  <span className="font-bold text-white">{currentVehicleName}</span>
                </div>
                {formData.leadType === 'BOOKING' && formData.variant && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Variant:</span>
                    <span className="font-bold text-white">{formData.variant}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Inquiry Branch:</span>
                  <span className="font-bold text-white">
                    {branches.find(b => b.code === formData.branchCode)?.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-xs text-gray-300 border-t border-white/10 pt-6">
              <div className="flex gap-3 items-start">
                <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <p><strong>Fully Refundable Token:</strong> Cancellation before documentation verification yields a 100% refund.</p>
              </div>
              <div className="flex gap-3 items-start">
                <CreditCard className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <p><strong>SLA Guarantee:</strong> Assures immediate branch manager assignment within 5 minutes.</p>
              </div>
            </div>
          </div>

          {/* Form container */}
          <div className="lg:col-span-3 bg-white border border-gray-150 rounded-3xl p-8 shadow-sm text-left">
            {success ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4 animate-bounce" />
                <h3 className="text-2xl font-extrabold text-gray-900">
                  {formData.leadType === 'BOOKING' ? 'Booking Registered' : 'Test Drive Scheduled'}
                </h3>
                <p className="text-sm text-gray-500 max-w-sm mt-2">
                  Congratulations! Your request is captured in our system. A branch coordinator will call you within 5 minutes under HOT lead assignment SLA rules.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all"
                >
                  Book Another Vehicle
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">
                    {formData.leadType === 'BOOKING' ? 'Vehicle Booking Checkout' : 'Schedule Test Drive'}
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">Submit your verification parameters to seed your CRM routing priority.</p>
                </div>

                {/* Form Type Tab Selector */}
                <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, leadType: 'BOOKING' })}
                    className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all ${
                      formData.leadType === 'BOOKING' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Reserve / Buy Vehicle
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, leadType: 'TEST_DRIVE' })}
                    className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all ${
                      formData.leadType === 'TEST_DRIVE' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Request Test Drive
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-gray-500">Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
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
                    <label htmlFor="branchCode" className="text-xs font-bold text-gray-500">Assigned Delivery Branch</label>
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
                    <label htmlFor="vehicle" className="text-xs font-bold text-gray-500">Vehicle Model</label>
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

                  {formData.leadType === 'BOOKING' && (
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="variant" className="text-xs font-bold text-gray-500">Vehicle Variant</label>
                      <select
                        id="variant"
                        value={formData.variant}
                        onChange={e => setFormData({ ...formData, variant: e.target.value })}
                        className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                      >
                        {(variantsMap[formData.vehicle] || []).map(v => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-bold text-gray-500">Optional Customer Intention Triggers</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.financeIntent}
                        onChange={e => setFormData({ ...formData, financeIntent: e.target.checked })}
                        className="h-4 w-4 text-[#EB0A1E] focus:ring-[#EB0A1E] border-gray-300 rounded"
                      />
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-gray-800">I need Finance Support</span>
                        <span className="text-[10px] text-gray-400">Routes to Finance Desk</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.exchangeIntent}
                        onChange={e => setFormData({ ...formData, exchangeIntent: e.target.checked })}
                        className="h-4 w-4 text-[#EB0A1E] focus:ring-[#EB0A1E] border-gray-300 rounded"
                      />
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-gray-800">I have an Exchange Vehicle</span>
                        <span className="text-[10px] text-gray-400">Routes to appraisal desk</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#EB0A1E] text-white hover:bg-[#c90818] rounded-xl font-bold text-sm shadow-md shadow-[#EB0A1E]/10 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Verifying Booking token...
                    </>
                  ) : (
                    formData.leadType === 'BOOKING' ? 'Confirm Booking Reservation' : 'Confirm Test Drive Slot'
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
