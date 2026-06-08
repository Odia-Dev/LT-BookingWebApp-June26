'use client';

import React, { useState } from 'react';
import { Vehicle, VehicleVariant } from '../types';
import { 
  VehicleGallery, 
  VehicleSpecificationTable, 
  VehicleFeatureList,
  VehicleBadge,
  VehicleCard
} from './index';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/feedback/Badge';
import { 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Clock, 
  RotateCcw,
  Sparkles,
  HelpCircle,
  FileText,
  Bookmark
} from 'lucide-react';

interface VehicleDetailPageClientProps {
  vehicle: Vehicle;
  relatedVehicles: Vehicle[];
}

export default function VehicleDetailPageClient({ vehicle, relatedVehicles }: VehicleDetailPageClientProps) {
  const [selectedColor, setSelectedColor] = useState(vehicle.colors[0]?.name || '');
  const [activeTab, setActiveTab] = useState<'variants' | 'specs' | 'features'>('variants');
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  const formatPrice = (p: number) => {
    if (p >= 10000000) {
      return `₹${(p / 10000000).toFixed(2)} Crore`;
    }
    return `₹${(p / 100000).toFixed(2)} Lakh`;
  };

  const toggleFaq = (idx: number) => {
    setFaqOpen(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleBookNow = () => {
    window.location.href = `/book-online?vehicle=${vehicle.vehicleId}`;
  };

  const handleTestDrive = () => {
    window.location.href = `/book-online?type=test-drive&vehicle=${vehicle.vehicleId}`;
  };

  const handleFinance = () => {
    window.location.href = `/finance?vehicle=${vehicle.vehicleId}`;
  };

  const handleExchange = () => {
    window.location.href = `/exchange?vehicle=${vehicle.vehicleId}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Hero & Core Overview Section */}
      <section className="bg-white border-b border-gray-200 py-12">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Gallery Column */}
          <div className="flex flex-col gap-6">
            <VehicleGallery images={vehicle.gallery} vehicleName={vehicle.name} />
            
            {/* Color Options Selection */}
            {vehicle.colors && vehicle.colors.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-150">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Exterior Color: <span className="text-gray-900 font-bold normal-case">{selectedColor}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {vehicle.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-9 h-9 rounded-full border-2 transition-all relative ${
                        selectedColor === color.name 
                          ? 'border-[#EB0A1E] scale-110 shadow-md' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      <span className="sr-only">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing & Overview Column */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-6">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <VehicleBadge label={vehicle.vehicleType} variant="secondary" />
                {vehicle.fuelType.includes('Hybrid') && (
                  <VehicleBadge label="Strong Hybrid Available" variant="success" />
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {vehicle.name}
              </h1>
              <p className="text-sm font-mono text-gray-400">Model Code: {vehicle.modelCode}</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-150">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Starting Ex-Showroom</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-[#EB0A1E]">{formatPrice(vehicle.startingPrice)}*</span>
                <span className="text-xs text-gray-500 font-medium">onwards</span>
              </div>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                *Ex-showroom price before registration, road tax, insurance, and local showroom charges. Applicable at Berhampur, Jeypore, and other Odisha branches.
              </p>
            </div>

            {/* Quick Specs Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-b border-gray-100 py-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Fuel Type</span>
                <span className="text-sm font-bold text-gray-800">{vehicle.fuelType.join(' / ')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Transmission</span>
                <span className="text-sm font-bold text-gray-800">{vehicle.transmission.join(' / ')}</span>
              </div>
              <div className="flex flex-col col-span-2 sm:col-span-1">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Seating Capacity</span>
                <span className="text-sm font-bold text-gray-800">{vehicle.seatingCapacity.map(s => `${s} Seater`).join('/')}</span>
              </div>
            </div>

            {/* Core checkout actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBookNow}
                className="w-full text-center py-4 bg-[#EB0A1E] hover:bg-[#c90818] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#EB0A1E]/20 transition-all"
              >
                Reserve Online (Refundable)
              </button>
              <button
                onClick={handleTestDrive}
                className="w-full text-center py-4 border border-[#EB0A1E] text-[#EB0A1E] hover:bg-[#EB0A1E]/5 rounded-xl font-bold text-sm transition-all"
              >
                Request Test Drive
              </button>
            </div>

            {/* Brochure helper link */}
            {vehicle.brochure && (
              <a 
                href={vehicle.brochure} 
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
              >
                <FileText className="h-4 w-4" /> Download Official Brochure PDF
              </a>
            )}
          </div>
        </Container>
      </section>

      {/* 2. Interactive Navigation Tabs (Variants / Specs / Features) */}
      <Section className="py-12 bg-white">
        <Container>
          <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('variants')}
              className={`py-4 px-6 font-bold text-sm transition-all shrink-0 border-b-2 ${
                activeTab === 'variants' 
                  ? 'border-[#EB0A1E] text-[#EB0A1E]' 
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Variants & Pricing
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`py-4 px-6 font-bold text-sm transition-all shrink-0 border-b-2 ${
                activeTab === 'specs' 
                  ? 'border-[#EB0A1E] text-[#EB0A1E]' 
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`py-4 px-6 font-bold text-sm transition-all shrink-0 border-b-2 ${
                activeTab === 'features' 
                  ? 'border-[#EB0A1E] text-[#EB0A1E]' 
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Key Features
            </button>
          </div>

          <div>
            {activeTab === 'variants' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Available Variants</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicle.variants.map((v: VehicleVariant) => (
                    <div key={v.id} className="p-6 border border-gray-150 rounded-2xl bg-gray-50 flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-lg text-gray-900">{v.variantName}</h4>
                          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-semibold">
                            {v.fuelType} • {v.transmission}
                          </span>
                        </div>
                        <ul className="text-xs text-gray-500 space-y-1 mt-3">
                          {v.features.map(f => (
                            <li key={f} className="flex items-center gap-1.5">
                              <span className="w-1 h-1 bg-[#EB0A1E] rounded-full" /> {f}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex justify-between items-end border-t border-gray-200/50 pt-4 mt-2">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 uppercase font-bold">Ex-Showroom</span>
                          <span className="text-lg font-extrabold text-gray-800">{formatPrice(v.exShowroomPrice)}</span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[10px] text-gray-400 uppercase font-bold">Est. On-Road Price</span>
                          <span className="text-sm font-bold text-[#EB0A1E]">{formatPrice(v.onRoadPrice)}*</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <VehicleSpecificationTable vehicle={vehicle} />
            )}

            {activeTab === 'features' && (
              <VehicleFeatureList features={vehicle.features} />
            )}
          </div>
        </Container>
      </Section>

      {/* 3. Dealership Ownership Benefits & Dynamic CTAs */}
      <Section className="py-12 bg-gray-50 border-t border-b border-gray-200/50">
        <Container className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ownership Benefits */}
          <div className="lg:col-span-2 p-8 bg-white border border-gray-150 rounded-3xl flex flex-col gap-6">
            <h3 className="text-xl font-bold text-gray-900">Laxmi Toyota Ownership Privileges</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <ShieldCheck className="h-6 w-6 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-gray-800">3 Years Extended Warranty</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Complimentary coverage extension for peaceful driving parameters.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="h-6 w-6 text-blue-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-gray-800">24/7 Roadside Assistance</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Emergency breakdown services accessible anywhere in Odisha.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <RotateCcw className="h-6 w-6 text-purple-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-gray-800">High Resale Value Guarantee</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Toyota vehicles maintain optimal resale returns across dealership nodes.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Sparkles className="h-6 w-6 text-amber-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-gray-800">Certified Toyota Service</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Access advanced workshops at Brahmapur, Jeypore, and Rayagada.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Finance & Exchange CTAs Column */}
          <div className="flex flex-col gap-4">
            <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl border border-gray-800 flex flex-col gap-3 shadow-md">
              <h4 className="font-bold text-lg">Toyota Finance Assistance</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Compute attractive interest deals and apply for vehicle finance qualification online in Ganjam or Koraput district.
              </p>
              <button
                onClick={handleFinance}
                className="mt-2 w-full py-2.5 bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs rounded-xl transition-all"
              >
                Apply for Finance
              </button>
            </div>

            <div className="p-6 bg-white border border-gray-150 rounded-3xl flex flex-col gap-3">
              <h4 className="font-bold text-lg text-gray-900">Exchange Evaluation</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Upload old vehicle information for instant estimation and unlock attractive trade-in bonuses.
              </p>
              <button
                onClick={handleExchange}
                className="mt-2 w-full py-2.5 bg-[#EB0A1E] text-white hover:bg-[#c90818] font-bold text-xs rounded-xl transition-all shadow-sm shadow-[#EB0A1E]/10"
              >
                Value Your Vehicle
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. AI-Search Optimized FAQ Accordion Section */}
      <Section className="py-12 bg-white">
        <Container className="max-w-3xl">
          <div className="text-center mb-8">
            <Badge variant="info">FAQ Section</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
              FAQ on Toyota {vehicle.name}
            </h2>
          </div>
          <div className="space-y-4">
            {vehicle.seo.faqSchema.map((faq, idx) => {
              const isOpen = !!faqOpen[idx];
              return (
                <div key={idx} className="border border-gray-150 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 bg-gray-50/50 hover:bg-gray-50 font-bold text-sm sm:text-base text-gray-900 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-[#EB0A1E] shrink-0" /> {faq.question}
                    </span>
                    {isOpen ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-5 bg-white border-t border-gray-150 text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 5. Related Vehicles Section */}
      {relatedVehicles.length > 0 && (
        <Section className="py-12 bg-gray-50 border-t border-gray-200/50">
          <Container>
            <div className="mb-8">
              <Badge variant="info">Discover More</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                Related Toyota Models
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedVehicles.map(v => (
                <VehicleCard
                  key={v.vehicleId}
                  vehicle={v}
                  onBookNow={() => window.location.href = `/book-online?vehicle=${v.vehicleId}`}
                  onTestDrive={() => window.location.href = `/book-online?type=test-drive&vehicle=${v.vehicleId}`}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}
