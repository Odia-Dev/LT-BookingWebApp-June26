import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookingsService } from '../services';
import { BookingStatus } from '../types';
import { validateCustomer, validateVehicle, validateBranch, validatePayment } from '../validation';
import { trackEvent } from '../../analytics/services/analytics';
import { CheckCircle2, Loader2, CreditCard, ShieldCheck, ArrowRight, ArrowLeft, Lock } from 'lucide-react';
import { Badge } from '@/components/feedback/Badge';
import { BookingSummary } from './BookingSummary';

interface BookingWizardProps {
  initialType?: 'BOOKING' | 'TEST_DRIVE';
  initialVehicle?: string;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  initialType = 'BOOKING',
  initialVehicle = 'hyryder'
}) => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    leadType: initialType,
    vehicle: initialVehicle,
    variant: '',
    color: '',
    name: '',
    phone: '',
    email: '',
    branchCode: 'BAM',
    purchaseTimeline: 'Immediate',
    purchaseMode: 'Bank Finance',
    decisionMaker: 'Self',
    exchangeIntent: false,
    financeIntent: false,
    preferredContactMethod: 'WhatsApp',
    city: '',
    district: '',
    otpSent: false,
    otpValue: '',
    otpAttempts: 0,
    otpVerified: false,
    paymentProcessing: false,
    paymentSuccess: false,
    generatedBookingId: ''
  });

  const [errorMsg, setErrorMsg] = useState('');

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
    { slug: 'glanza', name: 'Toyota Glanza', price: 686000 },
    { slug: 'taisor', name: 'Toyota Taisor', price: 774000 },
    { slug: 'rumion', name: 'Toyota Rumion', price: 1044000 },
    { slug: 'hyryder', name: 'Toyota Toyota Hyryder', price: 1114000 },
    { slug: 'crysta', name: 'Toyota Innova Crysta', price: 1999000 },
    { slug: 'hycross', name: 'Toyota Innova Hycross', price: 1977000 },
    { slug: 'fortuner', name: 'Toyota Fortuner', price: 3343000 },
    { slug: 'camry', name: 'Toyota Camry', price: 4617000 },
    { slug: 'hilux', name: 'Toyota Hilux', price: 3040000 },
    { slug: 'vellfire', name: 'Toyota Vellfire', price: 12200000 },
    { slug: 'land-cruiser', name: 'Toyota Land Cruiser 300', price: 21000000 }
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

  const colorsMap: Record<string, string[]> = {
    'glanza': ['Cafe White', 'Enticing Silver', 'Gaming Grey', 'Insta Blue', 'Sportin Red'],
    'taisor': ['Lucent Orange', 'Sportin Red', 'Cafe White', 'Enticing Silver', 'Gaming Grey'],
    'rumion': ['Cafe White', 'Enticing Silver', 'Spunky Blue', 'Rustic Brown', 'Iconic Grey'],
    'hyryder': ['Cafe White', 'Enticing Silver', 'Gaming Grey', 'Sportin Red', 'Midnight Black'],
    'crysta': ['Super White', 'Silver Metallic', 'Grey Metallic', 'Attitude Black', 'Bronze Mica'],
    'hycross': ['Super White', 'Platinum White Pearl', 'Silver Metallic', 'Attitude Black', 'Avant Garde Bronze'],
    'fortuner': ['Super White', 'Platinum White Pearl', 'Attitude Black', 'Grey Metallic', 'Silver Metallic'],
    'camry': ['Platinum White Pearl', 'Silver Metallic', 'Attitude Black', 'Metal Stream Metallic'],
    'hilux': ['Super White', 'Platinum White Pearl', 'Grey Metallic', 'Silver Metallic', 'Emerald Blue'],
    'vellfire': ['Platinum White Pearl', 'Black', 'Burning Black'],
    'land-cruiser': ['Super White', 'Precious White Pearl', 'Dark Red Mica', 'Black', 'Dark Blue']
  };

  useEffect(() => {
    // Analytics: BOOKING_STARTED on mount
    trackEvent({
      eventName: 'BOOKING_STARTED',
      source: 'DIG',
      metadata: { initialVehicle, initialType },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }, []);

  useEffect(() => {
    const list = variantsMap[formData.vehicle] || [];
    const colors = colorsMap[formData.vehicle] || [];
    setFormData(prev => ({
      ...prev,
      variant: list[0] || '',
      color: colors[0] || 'Default Color'
    }));
  }, [formData.vehicle]);

  const currentVehicleObj = vehicles.find(v => v.slug === formData.vehicle) || vehicles[0];
  const tokenPrice = formData.leadType === 'BOOKING' ? 25000 : 0;

  const sendOTP = () => {
    if (!validateCustomer({ name: formData.name, phone: formData.phone, email: formData.email, city: formData.city, district: formData.district })) {
      setErrorMsg('Please enter valid customer details (phone must be 10-digit mobile).');
      return;
    }
    setErrorMsg('');
    setFormData(prev => ({ ...prev, otpSent: true, otpAttempts: 0 }));
    
    // Analytics: BOOKING_QUALIFICATION_COMPLETED
    trackEvent({
      eventName: 'BOOKING_QUALIFICATION_COMPLETED',
      source: 'DIG',
      customerId: 'CUST-001',
      metadata: { phone: formData.phone },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  const verifyOTP = () => {
    if (formData.otpValue === '1234') {
      setFormData(prev => ({ ...prev, otpVerified: true }));
      setErrorMsg('');
      setStep(4);
      
      // Analytics: BOOKING_OTP_VERIFIED
      trackEvent({
        eventName: 'BOOKING_OTP_VERIFIED',
        source: 'DIG',
        customerId: 'CUST-001',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } else {
      const attempts = formData.otpAttempts + 1;
      setFormData(prev => ({ ...prev, otpAttempts: attempts }));
      if (attempts >= 5) {
        setErrorMsg('Maximum OTP verification attempts reached. Please request a new OTP.');
        setFormData(prev => ({ ...prev, otpSent: false, otpValue: '', otpAttempts: 0 }));
      } else {
        setErrorMsg(`Incorrect OTP code. Attempts: ${attempts}/5. Hint: Use 1234`);
      }
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!validateVehicle(formData.vehicle, formData.variant, formData.color)) {
        setErrorMsg('Invalid Vehicle details selected.');
        return;
      }
      setErrorMsg('');
      setStep(2);
    } else if (step === 2) {
      if (!validateBranch(formData.branchCode)) {
        setErrorMsg('Invalid Dealership Branch selected.');
        return;
      }
      sendOTP();
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const executeCheckoutPayment = async () => {
    if (!validatePayment(formData.leadType as any, tokenPrice)) {
      setErrorMsg('Invalid reservation token amount mismatch.');
      return;
    }
    setFormData(prev => ({ ...prev, paymentProcessing: true }));
    setErrorMsg('');

    setTimeout(() => {
      const booking = BookingsService.createBooking({
        customerId: 'CUST-001',
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        vehicleId: formData.vehicle,
        vehicleName: currentVehicleObj.name,
        variant: formData.variant,
        color: formData.color,
        branchCode: formData.branchCode,
        sourceCode: 'DIG',
        status: formData.leadType === 'BOOKING' ? 'BOOKING_CONFIRMED' : 'QUALIFICATION_COMPLETED',
        financeIntent: formData.financeIntent,
        exchangeIntent: formData.exchangeIntent
      });

      setFormData(prev => ({
        ...prev,
        paymentProcessing: false,
        paymentSuccess: true,
        generatedBookingId: booking.bookingId
      }));
      setStep(5);

      // Analytics: BOOKING_COMPLETED
      trackEvent({
        eventName: 'BOOKING_COMPLETED',
        source: 'DIG',
        customerId: 'CUST-001',
        metadata: {
          bookingId: booking.bookingId,
          vehicleId: formData.vehicle,
          price: tokenPrice
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
      {/* Reservation Progress Column */}
      <div className="lg:col-span-2 flex flex-col gap-6 text-left bg-gradient-to-br from-gray-900 via-gray-850 to-red-950 text-white p-8 rounded-3xl shadow-xl">
        <div className="flex flex-col gap-2">
          <Badge variant="info">Verified Checkout Flow</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight mt-2">
            Toyota Direct Checkout
          </h1>
          <p className="text-gray-300 text-xs leading-relaxed mt-2">
            Follow our secure system validations. All booking allocations generate unique tracking signatures and route directly to your dealership node.
          </p>
        </div>

        {/* Stepper Progress */}
        <div className="flex flex-col gap-4 text-xs font-semibold text-gray-300 border-t border-b border-white/10 py-6 my-2">
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 1 ? 'bg-red-500 border-red-500 text-white' : 'border-gray-500'}`}>1</div>
            <span>Vehicle & Variant Selection</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 2 ? 'bg-red-500 border-red-500 text-white' : 'border-gray-500'}`}>2</div>
            <span>Customer Info & Qualification</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 3 ? 'bg-red-500 border-red-500 text-white' : 'border-gray-500'}`}>3</div>
            <span>Secure Mobile OTP Check</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 4 ? 'bg-red-500 border-red-500 text-white' : 'border-gray-500'}`}>4</div>
            <span>Secure Payment Gateways</span>
          </div>
        </div>

        {/* Dynamic Cart Summary Widget */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 text-xs">
          <h4 className="font-bold text-red-400">Checkout Cart</h4>
          <div className="flex justify-between">
            <span className="text-gray-400">Model:</span>
            <span className="font-bold text-white">{currentVehicleObj.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Variant:</span>
            <span className="font-bold text-white">{formData.variant}</span>
          </div>
          {formData.leadType === 'BOOKING' ? (
            <div className="flex justify-between border-t border-white/10 pt-2 mt-1 font-bold">
              <span>Reservation Token:</span>
              <span className="text-red-400">₹{tokenPrice.toLocaleString('en-IN')}*</span>
            </div>
          ) : (
            <div className="flex justify-between border-t border-white/10 pt-2 mt-1 font-bold">
              <span>Booking Type:</span>
              <span className="text-blue-400">Test Drive Slot</span>
            </div>
          )}
        </div>
      </div>

      {/* Input panel Form */}
      <div className="lg:col-span-3 bg-white border border-gray-150 rounded-3xl p-8 shadow-sm text-left min-h-[480px]">
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">Select Vehicle Parameters</h2>
              <p className="text-xs text-gray-400 mt-1">First choose your model, variant and paint scheme.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="vehicle" className="text-xs font-bold text-gray-500">Model</label>
                <select
                  id="vehicle"
                  value={formData.vehicle}
                  onChange={e => setFormData({ ...formData, vehicle: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-700"
                >
                  {vehicles.map(v => (
                    <option key={v.slug} value={v.slug}>{v.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="variant" className="text-xs font-bold text-gray-500">Variant</label>
                <select
                  id="variant"
                  value={formData.variant}
                  onChange={e => setFormData({ ...formData, variant: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-700"
                >
                  {(variantsMap[formData.vehicle] || []).map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="color" className="text-xs font-bold text-gray-500">Color Variant</label>
                <select
                  id="color"
                  value={formData.color}
                  onChange={e => setFormData({ ...formData, color: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-700"
                >
                  {(colorsMap[formData.vehicle] || []).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="checkoutType" className="text-xs font-bold text-gray-500">Inquiry Target</label>
                <select
                  id="checkoutType"
                  value={formData.leadType}
                  onChange={e => setFormData({ ...formData, leadType: e.target.value as any })}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-700"
                >
                  <option value="BOOKING">Online Reservation (Pay token ₹25,000)</option>
                  <option value="TEST_DRIVE">Book Free Test Drive (No token)</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Configure Details <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">Lead Qualification & Profiling</h2>
              <p className="text-xs text-gray-400 mt-1">Please enter your parameters to customize your delivery desk assignment.</p>
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
                  placeholder="e.g. Sudhanshu Sekhar"
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs font-bold text-gray-500">Phone (10-Digit Mobile)</label>
                <input
                  id="phone"
                  type="tel"
                  required
                  pattern="^[6-9]\d{9}$"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Mobile number"
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-bold text-gray-500">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="customer@laxmitoyota.com"
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="branchCode" className="text-xs font-bold text-gray-500">Dealership Node</label>
                <select
                  id="branchCode"
                  value={formData.branchCode}
                  onChange={e => setFormData({ ...formData, branchCode: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-700"
                >
                  {branches.map(b => (
                    <option key={b.code} value={b.code}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="purchaseTimeline" className="text-xs font-bold text-gray-500">Purchase Timeline</label>
                <select
                  id="purchaseTimeline"
                  value={formData.purchaseTimeline}
                  onChange={e => setFormData({ ...formData, purchaseTimeline: e.target.value })}
                  className="border border-gray-200 rounded-xl p-2 text-xs focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-700"
                >
                  <option value="Immediate">Immediate</option>
                  <option value="0–30 Days">0–30 Days</option>
                  <option value="1–3 Months">1–3 Months</option>
                  <option value="3–6 Months">3–6 Months</option>
                  <option value="6+ Months">6+ Months</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="purchaseMode" className="text-xs font-bold text-gray-500">Purchase Mode</label>
                <select
                  id="purchaseMode"
                  value={formData.purchaseMode}
                  onChange={e => setFormData({ ...formData, purchaseMode: e.target.value })}
                  className="border border-gray-200 rounded-xl p-2 text-xs focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-700"
                >
                  <option value="Self Finance">Self Finance</option>
                  <option value="Bank Finance">Bank Finance</option>
                  <option value="Undecided">Undecided</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="decisionMaker" className="text-xs font-bold text-gray-500">Decision Maker</label>
                <select
                  id="decisionMaker"
                  value={formData.decisionMaker}
                  onChange={e => setFormData({ ...formData, decisionMaker: e.target.value })}
                  className="border border-gray-200 rounded-xl p-2 text-xs focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-700"
                >
                  <option value="Self">Self</option>
                  <option value="Family">Family</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="city" className="text-xs font-bold text-gray-500">City</label>
                <input
                  id="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Berhampur"
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="district" className="text-xs font-bold text-gray-500">District</label>
                <input
                  id="district"
                  type="text"
                  required
                  value={formData.district}
                  onChange={e => setFormData({ ...formData, district: e.target.value })}
                  placeholder="e.g. Ganjam"
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-55 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.financeIntent}
                  onChange={e => setFormData({ ...formData, financeIntent: e.target.checked })}
                  className="h-4 w-4 text-[#EB0A1E] focus:ring-[#EB0A1E] border-gray-300 rounded"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-800">Finance Assistance Required</span>
                  <span className="text-[9px] text-gray-400">Routes to Finance Manager</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-55 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.exchangeIntent}
                  onChange={e => setFormData({ ...formData, exchangeIntent: e.target.checked })}
                  className="h-4 w-4 text-[#EB0A1E] focus:ring-[#EB0A1E] border-gray-300 rounded"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-800">Exchange Old Car</span>
                  <span className="text-[9px] text-gray-400">Routes to appraisal desk</span>
                </div>
              </label>
            </div>

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-4 border border-gray-200 hover:bg-gray-50 text-gray-650 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                Send Mobile OTP Check <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">Secure OTP Authorization</h2>
              <p className="text-xs text-gray-450 mt-1">
                A secure authentication code has been sent to <span className="font-bold text-gray-800">{formData.phone}</span>.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="otp" className="text-xs font-bold text-gray-500">Enter Verification Code</label>
              <input
                id="otp"
                type="text"
                required
                maxLength={4}
                value={formData.otpValue}
                onChange={e => setFormData({ ...formData, otpValue: e.target.value })}
                placeholder="Enter 4-digit OTP (Hint: 1234)"
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E] tracking-widest text-center font-bold text-lg max-w-xs self-center"
              />
              <p className="text-[10px] text-gray-400 text-center mt-2">OTP is valid for 5 minutes. Max 5 verification attempts.</p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-4 border border-gray-200 hover:bg-gray-50 text-gray-655 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                type="button"
                onClick={verifyOTP}
                className="flex-1 py-4 bg-[#EB0A1E] hover:bg-[#c90818] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-[#EB0A1E]/10"
              >
                Verify & Proceed
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">Summary & Secure Payment</h2>
              <p className="text-xs text-gray-400 mt-1">Please review the configuration details before initiating gateway handshake.</p>
            </div>

            <BookingSummary
              vehicleName={currentVehicleObj.name}
              variant={formData.variant}
              color={formData.color}
              branchName={branches.find(b => b.code === formData.branchCode)?.name || formData.branchCode}
              customerName={formData.name}
              phone={formData.phone}
              email={formData.email}
              leadType={formData.leadType as any}
              tokenPrice={tokenPrice}
            />

            {formData.leadType === 'BOOKING' ? (
              <div className="p-5 border border-dashed border-[#EB0A1E]/30 rounded-2xl bg-red-50/20 text-center flex flex-col gap-3">
                <div className="flex justify-between text-sm font-extrabold">
                  <span>Total Reservation Token Amount:</span>
                  <span className="text-[#EB0A1E]">₹25,000.00</span>
                </div>
                <p className="text-[10px] text-gray-500">
                  Processing secure payment transaction via integrated Razorpay gateway. Token is fully refundable upon verification mismatch.
                </p>
              </div>
            ) : (
              <div className="p-5 border border-dashed border-blue-200 rounded-2xl bg-blue-50/20 text-center flex flex-col gap-2">
                <h4 className="font-bold text-xs text-blue-600">Zero Payment Free Reservation</h4>
                <p className="text-[11px] text-gray-500">No deposit required for booking a test drive. Click submit below to confirm your schedule.</p>
              </div>
            )}

            <button
              type="button"
              disabled={formData.paymentProcessing}
              onClick={executeCheckoutPayment}
              className="w-full py-4 bg-[#EB0A1E] hover:bg-[#c90818] text-white rounded-xl font-bold text-sm shadow-md shadow-[#EB0A1E]/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {formData.paymentProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Invoking Razorpay Gateway...
                </>
              ) : formData.leadType === 'BOOKING' ? (
                <>
                  <Lock className="h-4 w-4" /> Securely Pay ₹25,000 Online
                </>
              ) : (
                'Schedule Test Drive Slot'
              )}
            </button>
          </div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4 animate-bounce" />
            <h3 className="text-2xl font-extrabold text-gray-900">
              {formData.leadType === 'BOOKING' ? 'Booking Confirmed Successfully!' : 'Test Drive Slot Booked!'}
            </h3>
            <p className="text-sm text-gray-500 max-w-md mt-2">
              Thank you, <span className="font-bold">{formData.name}</span>. Your request has been logged. Under our operational SLA rules, a dealership coordinator will call you shortly.
            </p>

            <div className="bg-gray-55 border border-gray-150 rounded-2xl p-5 my-6 text-xs max-w-sm w-full">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-400 font-semibold">Booking ID:</span>
                <span className="font-mono font-extrabold text-gray-800">{formData.generatedBookingId}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-gray-100 mt-2">
                <span className="text-gray-400 font-semibold">Tracking Status:</span>
                <span className="font-bold text-emerald-600">CONFIRMED</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => router.push('/customer')}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all cursor-pointer"
              >
                Go To Customer Portal
              </button>
              <button
                onClick={() => {
                  setStep(1);
                  setFormData(prev => ({
                    ...prev,
                    paymentSuccess: false,
                    otpVerified: false,
                    otpSent: false,
                    otpValue: ''
                  }));
                }}
                className="px-6 py-3 border border-gray-200 hover:bg-gray-50 text-gray-655 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Book Another Vehicle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
