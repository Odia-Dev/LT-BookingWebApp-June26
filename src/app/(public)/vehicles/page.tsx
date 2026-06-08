import React from 'react';
import type { Metadata } from 'next';
import { generateMetadata } from '@/core/seo';
import { VehicleListingClient } from '@/modules/vehicles';

export const metadata: Metadata = generateMetadata({
  title: 'Toyota Vehicles Price List & Specifications',
  description: 'Explore the complete range of official Toyota vehicles at Laxmi Toyota. Compare prices, fuel types, seating capacity, and features for SUV, Hybrid, and MPV models in Odisha.',
  canonicalUrl: '/vehicles',
  ogImage: '/media/toyota_hero_showcase.png',
});

export default function VehiclesPage() {
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
        'name': 'Vehicles',
        'item': 'https://laxmitoyota.com/vehicles'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Which Toyota models are available at Laxmi Toyota Odisha?',
        'answer': 'Laxmi Toyota offers a comprehensive range of models including Glanza, Taisor, Rumion, Hyryder, Innova Crysta, Innova Hycross, Fortuner, Camry, Hilux, Vellfire, and Land Cruiser 300.'
      },
      {
        '@type': 'Question',
        'name': 'Does Laxmi Toyota provide hybrid vehicle options?',
        'answer': 'Yes, we offer advanced self-charging hybrid vehicles such as the Toyota Hyryder, Innova Hycross, Camry, and Vellfire.'
      },
      {
        '@type': 'Question',
        'name': 'Can I book a test drive or reserve a vehicle online?',
        'answer': 'Yes! You can complete your test drive booking or vehicle reservation fully online through our secure, qualification-based checkout system.'
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <VehicleListingClient />
    </>
  );
}
