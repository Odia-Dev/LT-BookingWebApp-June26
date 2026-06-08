import React from 'react';
import type { Metadata } from 'next';
import { generateMetadata } from '@/core/seo';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/feedback/Badge';
import { LocationRepository } from '@/modules/locations';
import { MapPin, Phone, Building2 } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'Toyota Showroom Locations in South & West Odisha',
  description: 'Find Laxmi Toyota showroom locations, official branches, and partner service areas in Berhampur, Jeypore, Rayagada, Bhawanipatna, Bargarh, and Balangir.',
  canonicalUrl: '/locations',
  ogImage: '/media/toyota_hero_showcase.png',
});

export default function LocationsIndexPage() {
  const locations = LocationRepository.getAll();
  const branches = locations.filter(loc => loc.type === 'Main Branch' || loc.type === 'Branch');
  const partners = locations.filter(loc => loc.type === 'SEO Partner Area');

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://laxmitoyota.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Locations',
        'item': 'https://laxmitoyota.com/locations'
      }
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Banner */}
      <section className="bg-gradient-to-br from-[#111111] via-gray-900 to-red-950 text-white py-16">
        <Container>
          <div className="max-w-2xl text-left">
            <Badge variant="info">Showroom Network</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-3">
              Our Showrooms & Service Centers
            </h1>
            <p className="text-gray-300 mt-3 text-sm md:text-base leading-relaxed">
              Find an authorized Laxmi Toyota dealership branch or support desk near you. We offer sales, certified servicing, and paperless financing across South and West Odisha.
            </p>
          </div>
        </Container>
      </section>

      {/* Official Branches Grid */}
      <Section className="py-12 bg-white">
        <Container>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
            <Building2 className="h-6 w-6 text-[#EB0A1E]" /> Official Dealership Branches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map(loc => (
              <div key={loc.id} className="p-6 border border-gray-150 rounded-3xl bg-gray-50 flex flex-col justify-between gap-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{loc.code}</span>
                    <span className="text-xs bg-[#EB0A1E]/10 text-[#EB0A1E] px-2 py-0.5 rounded-full font-bold">
                      {loc.type}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-xl text-gray-900">{loc.name}</h3>
                  <div className="flex gap-2 text-xs text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-500">
                    <Phone className="h-4 w-4 shrink-0 text-gray-400" />
                    <span>{loc.phone}</span>
                  </div>
                </div>
                <a 
                  href={`/locations/${loc.id}`}
                  className="w-full text-center py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  View Showroom Details
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* SEO Support partner areas */}
      <Section className="py-12 bg-gray-50 border-t border-gray-150">
        <Container>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-[#EB0A1E]" /> Partner Support Areas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map(loc => (
              <div key={loc.id} className="p-5 border border-gray-150 rounded-2xl bg-white flex justify-between items-center hover:border-gray-900 transition-colors">
                <div>
                  <h3 className="font-bold text-base text-gray-900">{loc.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{loc.district} District • Served by {loc.code}</p>
                </div>
                <a 
                  href={`/locations/${loc.id}`}
                  className="text-xs font-bold text-[#EB0A1E] hover:underline shrink-0"
                >
                  Details →
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
