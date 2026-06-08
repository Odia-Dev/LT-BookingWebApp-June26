import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateMetadata as baseGenerateMetadata } from '@/core/seo';
import { LocationRepository, OFFICIAL_LOCATIONS } from '@/modules/locations';
import { MOCK_VEHICLES } from '@/modules/vehicles';
import LocationDetailsClient from '@/modules/locations/components/LocationDetailsClient';

interface PageProps {
  params: Promise<{ location: string }>;
}

export async function generateStaticParams() {
  return OFFICIAL_LOCATIONS.map(loc => ({
    location: loc.id
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const location = LocationRepository.getById(resolvedParams.location);
  if (!location) return {};

  const title = `Laxmi Toyota Showroom in ${location.name} | Phone, Address & Offers`;
  const description = `Visit Laxmi Toyota showroom serving ${location.name}, Odisha. Explore our complete Toyota lineup, apply for paperless vehicle finance, or request doorstep exchange evaluations.`;

  return baseGenerateMetadata({
    title,
    description,
    canonicalUrl: `/locations/${resolvedParams.location}`,
    ogImage: '/media/toyota_hero_showcase.png',
  });
}

export default async function LocationDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const location = LocationRepository.getById(resolvedParams.location);

  if (!location) {
    notFound();
  }

  // Map 11 vehicles to short layout blocks
  const availableVehicles = MOCK_VEHICLES.map(v => ({
    name: v.name,
    type: v.vehicleType,
    price: v.startingPrice,
    heroImage: v.heroImage,
    slug: v.slug.replace(/^toyota-/, '')
  }));

  // JSON-LD Schemas
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
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': location.name,
        'item': `https://laxmitoyota.com/locations/${resolvedParams.location}`
      }
    ]
  };

  const autoDealerSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    'name': `Laxmi Toyota ${location.name}`,
    'description': `Authorized Laxmi Toyota Dealership center serving ${location.name} in South and West Odisha regions.`,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': location.address,
      'addressLocality': location.name,
      'addressRegion': 'OD',
      'addressCountry': 'IN'
    },
    'telephone': location.phone,
    'priceRange': 'INR 600000 - 25000000',
    ...(location.latitude && location.longitude ? {
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': location.latitude,
        'longitude': location.longitude
      }
    } : {})
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': `Where is Laxmi Toyota showroom in ${location.name}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Laxmi Toyota showroom/support services are based out of ${location.address}. You can call ${location.phone} to speak with our sales representatives.`
        }
      },
      {
        '@type': 'Question',
        'name': `Can I book a vehicle online in ${location.name}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Yes. You can explore the Toyota catalog, apply for finance quotes, evaluate exchange cars, and complete your reservation token online.`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(autoDealerSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LocationDetailsClient location={location} availableVehicles={availableVehicles} />
    </>
  );
}
