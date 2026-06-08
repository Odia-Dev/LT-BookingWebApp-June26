'use client';

import React, { useState } from 'react';
import { LocationDetails } from '../index';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/feedback/Badge';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Compass, 
  ShieldCheck, 
  Star, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Car, 
  PiggyBank, 
  RefreshCw 
} from 'lucide-react';

interface LocationDetailsClientProps {
  location: LocationDetails;
  availableVehicles: { name: string; type: string; price: number; heroImage: string; slug: string }[];
}

export default function LocationDetailsClient({ location, availableVehicles }: LocationDetailsClientProps) {
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  const toggleFaq = (idx: number) => {
    setFaqOpen(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCTA = (type: string) => {
    window.location.href = `/book-online?type=${type}&location=${location.id}&branch=${location.code}`;
  };

  const formatPrice = (p: number) => {
    if (p >= 10000000) {
      return `₹${(p / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(p / 100000).toFixed(2)} Lakh`;
  };

  const localReviews = [
    {
      author: 'Alekha C. Dash',
      rating: 5,
      comment: `Extremely satisfied with the delivery of my Innova Hycross at Laxmi Toyota. The team serving ${location.name} handled registration and documentation seamlessly.`,
      date: '2 weeks ago'
    },
    {
      author: 'Mamata Panigrahi',
      rating: 5,
      comment: `Highly recommend Laxmi Toyota. Applied for vehicle finance online, and the executive assigned from the ${location.nearestBranch} resolved everything in a day.`,
      date: '1 month ago'
    }
  ];

  const localFAQs = [
    {
      q: `Where is the nearest Laxmi Toyota showroom located for ${location.name}?`,
      a: location.type === 'Main Branch' || location.type === 'Branch'
        ? `Our showroom is located directly at ${location.address}. You can visit us during business hours or call ${location.phone} to schedule a consultation.`
        : `Residents of ${location.name} are served by our nearest official ${location.nearestBranch} located at ${location.address}. We coordinate transport and doorstep delivery directly to your home.`
    },
    {
      q: `Can I book a vehicle test drive online in ${location.name}?`,
      a: `Yes! Simply launch our digital booking portal, choose your preferred Toyota model, and request a doorstep test drive or showroom slot. Our consultants serving ${location.name} will coordinate the details.`
    },
    {
      q: `Do you offer exchange evaluations and bonuses in ${location.name}?`,
      a: `Yes. Laxmi Toyota offers transparent trade-in evaluations. You can submit vehicle details and photos online, and our assessors from the nearest branch will provide an official valuation and applicable exchange bonus.`
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-br from-[#111111] via-gray-900 to-red-950 text-white py-16">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-5 text-left">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-red-50/10 border border-[#EB0A1E]/30 px-3 py-1 text-xs font-semibold text-[#EB0A1E]">
              <MapPin className="h-3.5 w-3.5" /> Laxmi Toyota Regional Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Laxmi Toyota {location.name}
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Authorized Toyota dealership services and support serving {location.name}, {location.district} District, and surrounding South & West Odisha territories.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <button
                onClick={() => handleCTA('test-drive')}
                className="px-6 py-3 bg-[#EB0A1E] hover:bg-[#c90818] text-white rounded-xl font-bold text-xs shadow-lg shadow-[#EB0A1E]/20 transition-all"
              >
                Book Test Drive
              </button>
              <button
                onClick={() => handleCTA('price')}
                className="px-6 py-3 border border-white/30 hover:border-white text-white rounded-xl font-bold text-xs transition-all"
              >
                Get On-Road Price
              </button>
            </div>
          </div>

          {/* Quick info block */}
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl flex flex-col gap-6 shadow-xl text-left">
            <h3 className="font-bold text-lg border-b border-white/10 pb-3">Branch Details</h3>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-[#EB0A1E] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase">Address</h4>
                  <p className="text-sm text-gray-200 mt-0.5">{location.address}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-[#EB0A1E] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase">Phone</h4>
                  <p className="text-sm text-gray-200 mt-0.5">{location.phone}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-[#EB0A1E] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase">Hours</h4>
                  <p className="text-sm text-gray-200 mt-0.5">Monday - Saturday: 09:30 AM - 06:30 PM (Sunday Closed)</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Branch & Map Layout */}
      <Section className="py-12 bg-white border-b border-gray-200/50">
        <Container className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="text-2xl font-extrabold text-gray-900">Branch Location Map</h2>
            <div className="aspect-video w-full rounded-3xl bg-gray-100 border border-gray-150 flex items-center justify-center p-6 overflow-hidden relative group shadow-sm">
              <div className="absolute inset-0 bg-cover bg-center filter blur-[1px] opacity-25" style={{ backgroundImage: "url('/media/toyota_hero_showcase.png')" }} />
              <div className="z-10 flex flex-col items-center text-center gap-4 max-w-sm">
                <div className="w-14 h-14 rounded-full bg-[#EB0A1E]/10 flex items-center justify-center text-[#EB0A1E]">
                  <Compass className="h-7 w-7 animate-spin-slow" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Interactive Map Location</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Laxmi Toyota {location.name} branch coordinates: {location.latitude ?? 19.3}, {location.longitude ?? 84.7}. Click below to navigate via Google Maps.
                </p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${location.latitude ?? 19.3},${location.longitude ?? 84.7}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Navigate on Google Maps
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-150 flex flex-col gap-3">
              <h3 className="font-bold text-lg text-gray-900">Lead Assignment</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Leads generated in the {location.name} region are routed directly to the {location.nearestBranch} CRM desk for instant SLA follow-ups.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <span className="text-xs font-bold text-gray-700">1-Hour Response Guarantee</span>
              </div>
            </div>

            <a 
              href={`tel:${location.phone.replace(/\s+/g, '')}`}
              className="w-full text-center py-4 bg-gray-900 hover:bg-gray-850 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4" /> Call {location.name} Branch
            </a>
          </div>
        </Container>
      </Section>

      {/* 3. Available Vehicles catalog */}
      <Section className="py-12 bg-white">
        <Container>
          <div className="mb-8">
            <Badge variant="info">Local Showroom Lineup</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Available Toyota Models in {location.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl leading-relaxed">
              Discover official Toyota models ready for booking. Compare ex-showroom prices and select your preferred trim.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableVehicles.map(v => (
              <div key={v.name} className="flex flex-col border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all bg-white group">
                <div className="h-44 bg-gray-50 flex items-center justify-center p-4 border-b border-gray-100 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.heroImage} alt={v.name} className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105 duration-300" />
                </div>
                <div className="p-5 flex flex-col flex-1 gap-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-gray-900">{v.name}</h3>
                    <Badge variant="success">{v.type}</Badge>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Ex-Showroom Price</span>
                    <span className="text-base font-extrabold text-[#EB0A1E]">{formatPrice(v.price)}*</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <a href={`/locations/${location.id}/vehicles/${v.slug}`}>
                      <Button variant="secondary" className="w-full h-9 text-xs font-semibold">
                        Explore Local
                      </Button>
                    </a>
                    <button
                      onClick={() => handleCTA('booking')}
                      className="w-full py-2 bg-[#EB0A1E] hover:bg-[#c90818] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Finance & Exchange Segment */}
      <Section className="py-12 bg-gray-50 border-t border-b border-gray-200/50">
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white border border-gray-150 rounded-3xl flex flex-col gap-4 shadow-sm">
            <div className="p-3 bg-[#EB0A1E]/10 rounded-2xl w-fit text-[#EB0A1E]">
              <PiggyBank className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Finance & EMI Quotes</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Compute attractive interest offers with our partner banking firms in {location.name}. Low down-payment options and flexible EMI tenures are customized per applicant.
            </p>
            <button
              onClick={() => handleCTA('finance')}
              className="mt-2 w-fit px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              Apply For Finance
            </button>
          </div>

          <div className="p-8 bg-white border border-gray-150 rounded-3xl flex flex-col gap-4 shadow-sm">
            <div className="p-3 bg-[#EB0A1E]/10 rounded-2xl w-fit text-[#EB0A1E]">
              <RefreshCw className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Dealership Exchange Scheme</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Trade in your existing vehicle at Laxmi Toyota {location.name} branch. We offer transparent on-the-spot inspections, quick valuations, and attractive corporate exchange benefits.
            </p>
            <button
              onClick={() => handleCTA('exchange')}
              className="mt-2 w-fit px-6 py-2.5 bg-[#EB0A1E] hover:bg-[#c90818] text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-[#EB0A1E]/15"
            >
              Exchange Vehicle
            </button>
          </div>
        </Container>
      </Section>

      {/* 5. Regional Coverage Area */}
      <Section className="py-12 bg-white">
        <Container>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-lg">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight">Service Coverage Area</h3>
              <p className="text-gray-300 text-xs sm:text-sm mt-3 leading-relaxed">
                Laxmi Toyota provides comprehensive sales, service, and spare parts coverage across the {location.district} district. Customers in neighboring areas are fully served by our dedicated customer desks and mobile service support vehicles.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-2">
              <h4 className="font-bold text-sm text-[#EB0A1E]">Key Supported Regions</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Berhampur, Aska, Bhanjanagar, Paralakhemundi, Rayagada, Jeypore, Malkangiri, Nabarangpur, Bhawanipatna, Bargarh, Balangir, Nuapada, Phulbani.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Customer Reviews */}
      <Section className="py-12 bg-white border-t border-gray-100">
        <Container>
          <div className="text-center mb-8">
            <Badge variant="info">Local Reviews</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Customer Experiences in {location.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localReviews.map((rev, idx) => (
              <div key={idx} className="p-6 border border-gray-150 rounded-3xl bg-white shadow-sm flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 italic">"{rev.comment}"</p>
                </div>
                <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-2">
                  <span className="text-xs font-bold text-gray-800">{rev.author}</span>
                  <span className="text-[10px] text-gray-400">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. FAQs */}
      <Section className="py-12 bg-white border-t border-gray-100">
        <Container className="max-w-3xl">
          <div className="text-center mb-8">
            <Badge variant="info">FAQ</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {localFAQs.map((faq, idx) => {
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
