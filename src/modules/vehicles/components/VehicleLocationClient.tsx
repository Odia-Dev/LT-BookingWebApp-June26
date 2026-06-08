'use client';

import React, { useState } from 'react';
import { Vehicle } from '../types';
import { LocationDetails } from '../../locations';
import { 
  VehicleGallery, 
  VehicleSpecificationTable, 
  VehicleFeatureList,
  VehicleBadge 
} from './index';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/feedback/Badge';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  DollarSign, 
  Navigation 
} from 'lucide-react';

interface VehicleLocationClientProps {
  vehicle: Vehicle;
  location: LocationDetails;
}

export default function VehicleLocationClient({ vehicle, location }: VehicleLocationClientProps) {
  const [selectedColor, setSelectedColor] = useState(vehicle.colors[0]?.name || '');
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

  // Lead Generation Redirects carrying location context
  const handleCTA = (type: string) => {
    window.location.href = `/book-online?type=${type}&vehicle=${vehicle.vehicleId}&location=${location.id}&branch=${location.code}`;
  };

  // AI-Search Optimized Content Generation
  const localizedFAQs = [
    {
      q: `What is the ex-showroom price of the Toyota ${vehicle.name} in ${location.name}?`,
      a: `The starting ex-showroom price of the Toyota ${vehicle.name} in ${location.name} (serving the ${location.district} district) is ${formatPrice(vehicle.startingPrice)}*. Dynamic on-road prices are computed based on tax slabs, registration charges, and insurance configurations at our nearest ${location.nearestBranch}.`
    },
    {
      q: `Can I schedule a test drive for the ${vehicle.name} in ${location.name}?`,
      a: `Yes! You can reserve your test drive online. Our certified dealership team at the nearest ${location.nearestBranch} will coordinate doorstep delivery or schedule a slot at our branch serving ${location.name}.`
    },
    {
      q: `What finance options are available for the Toyota ${vehicle.name} in ${location.name}?`,
      a: `Laxmi Toyota provides customized finance schemes for the ${vehicle.name} in ${location.name}. We partner with leading public and private banks in Odisha to offer attractive interest rates, low down-payment programs, and quick paperless documentation.`
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Localized Banner Header */}
      <section className="bg-gradient-to-br from-[#111111] via-gray-900 to-red-950 text-white py-16">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-5 text-left">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-red-50/10 border border-[#EB0A1E]/30 px-3 py-1 text-xs font-semibold text-[#EB0A1E]">
              <MapPin className="h-3.5 w-3.5" /> Authorized Toyota Dealer for {location.name}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Toyota {vehicle.name} in {location.name}
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Explore localized on-road pricing, ex-showroom rates, vehicle features, and dealership exchange schemes for {vehicle.name} serving the {location.district} district of Odisha.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-400">
              <span>Branch: {location.nearestBranch}</span>
              <span>•</span>
              <span>Code: {location.code}</span>
            </div>
          </div>
          
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col gap-4 shadow-xl">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Showroom Pricing</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#EB0A1E]">{formatPrice(vehicle.startingPrice)}*</span>
              <span className="text-xs text-gray-400 font-medium">onwards</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              *Ex-showroom price before registration, road tax, and local insurance levies. Contact our {location.nearestBranch} for local offers.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                onClick={() => handleCTA('test-drive')}
                className="py-3 bg-[#EB0A1E] hover:bg-[#c90818] text-white rounded-xl font-bold text-xs shadow-md shadow-[#EB0A1E]/10 transition-colors"
              >
                Book Test Drive
              </button>
              <button
                onClick={() => handleCTA('price')}
                className="py-3 border border-white/30 hover:border-white text-white rounded-xl font-bold text-xs transition-colors"
              >
                Get On-Road Price
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Specs & Visuals Segment */}
      <Section className="py-12 bg-white">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <VehicleGallery images={vehicle.gallery} vehicleName={vehicle.name} />
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">Technical Specifications</h3>
            <VehicleSpecificationTable vehicle={vehicle} />
          </div>
        </Container>
      </Section>

      {/* AI Search Optimization: Localized Content Blocks */}
      <Section className="py-12 bg-gray-50 border-t border-b border-gray-200/50">
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1: Summaries */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col gap-3">
              <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#EB0A1E]" /> Vehicle Summary
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                The Toyota {vehicle.name} represents class-leading reliability in the {vehicle.vehicleType} segment. Available in dynamic {vehicle.fuelType.join('/')} layouts coupled with manual and automatic transmissions, it offers optimal fuel economy, spacious seating for {vehicle.seatingCapacity.map(s => `${s} persons`).join(' / ')}, and an ex-showroom start price of {formatPrice(vehicle.startingPrice)}*.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col gap-3">
              <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#EB0A1E]" /> Showroom Coverage
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                For residents of {location.name} and nearby areas, Laxmi Toyota ensures complete support. The nearest branch is the {location.nearestBranch} located at {location.address}. We coordinate transport, registration with local RTO offices in {location.district}, and certified service schedules directly to your doorstep.
              </p>
            </div>
          </div>

          {/* Column 2: Benefits & Availability */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col gap-3">
              <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#EB0A1E]" /> Buying & Ownership Benefits
              </h4>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> 
                  <span><strong>Odisha Road Service:</strong> Access 24/7 emergency support across Ganjam, Koraput, Rayagada, and all service districts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> 
                  <span><strong>3-Year Warranty:</strong> Enjoy official Toyota warranty support on engine components, battery segments, and chassis parts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> 
                  <span><strong>Genuine Parts:</strong> Guaranteed spare parts availability at local workshops.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col gap-3">
              <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#EB0A1E]" /> Local Availability Info
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Our main distribution nodes maintain steady inventory pipelines for the {vehicle.name}. Stock allocations for {location.name} are dispatched via the {location.nearestBranch}. Standard delivery timelines vary between immediate delivery and 4-6 weeks depending on variant selections.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Additional Lead Generation Blocks */}
      <Section className="py-12 bg-white">
        <Container className="max-w-4xl">
          <div className="bg-gray-50 border border-gray-150 rounded-3xl p-8 md:p-12 text-center flex flex-col gap-6 items-center shadow-sm">
            <h3 className="text-2xl font-extrabold text-gray-900">Get Custom Pricing & Finance Quotes</h3>
            <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
              Unlock exclusive regional benefits. Apply for zero-down payment schemes or trade-in your current vehicle for a certified exchange valuation in {location.name}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mt-4">
              <button
                onClick={() => handleCTA('exchange')}
                className="py-3 bg-white border border-gray-200 hover:border-gray-900 text-gray-700 font-bold text-xs rounded-xl transition-all shadow-sm"
              >
                Exchange Old Vehicle
              </button>
              <button
                onClick={() => handleCTA('finance')}
                className="py-3 bg-white border border-gray-200 hover:border-gray-900 text-gray-700 font-bold text-xs rounded-xl transition-all shadow-sm"
              >
                Apply for Finance
              </button>
              <button
                onClick={() => handleCTA('booking')}
                className="py-3 bg-[#EB0A1E] hover:bg-[#c90818] text-white font-bold text-xs rounded-xl transition-all shadow-sm shadow-[#EB0A1E]/10 col-span-1 sm:col-span-2 md:col-span-1"
              >
                Book Online Now
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Localized FAQ Accordion */}
      <Section className="py-12 bg-white border-t border-gray-100">
        <Container className="max-w-3xl">
          <div className="text-center mb-8">
            <Badge variant="info">Local FAQ</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              FAQs for {vehicle.name} in {location.name}
            </h2>
          </div>
          <div className="space-y-4">
            {localizedFAQs.map((faq, idx) => {
              const isOpen = !!faqOpen[idx];
              return (
                <div key={idx} className="border border-gray-150 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 bg-gray-50/50 hover:bg-gray-50 font-bold text-sm sm:text-base text-gray-900 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-[#EB0A1E] shrink-0" /> {faq.q}
                    </span>
                    {isOpen ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-5 bg-white border-t border-gray-150 text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
}
