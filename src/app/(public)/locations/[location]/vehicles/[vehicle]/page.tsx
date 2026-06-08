import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
  VehicleRepository, 
  VehicleSEOService, 
  VehicleLocationClient,
  MOCK_VEHICLES 
} from '@/modules/vehicles';
import { LocationRepository, OFFICIAL_LOCATIONS } from '@/modules/locations';

interface PageProps {
  params: Promise<{
    location: string;
    vehicle: string;
  }>;
}

export async function generateStaticParams() {
  const params: { location: string; vehicle: string }[] = [];
  
  OFFICIAL_LOCATIONS.forEach(loc => {
    MOCK_VEHICLES.forEach(veh => {
      // Support standard slug (e.g. toyota-hyryder)
      params.push({
        location: loc.id,
        vehicle: veh.slug
      });
      // Support short slug (e.g. hyryder)
      params.push({
        location: loc.id,
        vehicle: veh.slug.replace(/^toyota-/, '')
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const location = LocationRepository.getById(resolvedParams.location);
  const vehicle = VehicleRepository.getBySlug(resolvedParams.vehicle);

  if (!location || !vehicle) return {};

  const rootUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://laxmitoyota.com';
  const title = `Toyota ${vehicle.name} Price in ${location.name} | Laxmi Toyota Dealer`;
  const description = `Get the best deals on the new Toyota ${vehicle.name} in ${location.name}, Odisha. Calculate on-road price, apply for finance or exchange, and book a test drive today.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${rootUrl}/locations/${resolvedParams.location}/vehicles/${resolvedParams.vehicle}`,
    },
    openGraph: {
      title,
      description,
      url: `${rootUrl}/locations/${resolvedParams.location}/vehicles/${resolvedParams.vehicle}`,
      images: [
        {
          url: vehicle.seo.openGraph.image,
          width: 1200,
          height: 630,
          alt: `${vehicle.name} in ${location.name}`,
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [vehicle.seo.twitterCards.image],
    }
  };
}

export default async function VehicleLocationPage({ params }: PageProps) {
  const resolvedParams = await params;
  const location = LocationRepository.getById(resolvedParams.location);
  const vehicle = VehicleRepository.getBySlug(resolvedParams.vehicle);

  if (!location || !vehicle) {
    notFound();
  }

  // 1. Breadcrumb Schema
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
        'item': `https://laxmitoyota.com/locations`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': location.name,
        'item': `https://laxmitoyota.com/locations/${resolvedParams.location}`
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'name': vehicle.name,
        'item': `https://laxmitoyota.com/locations/${resolvedParams.location}/vehicles/${resolvedParams.vehicle}`
      }
    ]
  };

  // 2. AutoDealer (Local Business) Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    'name': `Laxmi Toyota ${location.name}`,
    'description': `Authorized Toyota Dealership services for the Toyota ${vehicle.name} in ${location.name} and neighboring regions.`,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': location.address,
      'addressLocality': location.name,
      'addressRegion': 'OD',
      'addressCountry': 'IN'
    },
    'telephone': location.phone,
    'priceRange': `INR ${vehicle.startingPrice} - ${Math.round(vehicle.startingPrice * 1.3)}`,
    ...(location.latitude && location.longitude ? {
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': location.latitude,
        'longitude': location.longitude
      }
    } : {})
  };

  // 3. FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': `What is the ex-showroom price of the Toyota ${vehicle.name} in ${location.name}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `The starting ex-showroom price of the Toyota ${vehicle.name} in ${location.name} is ₹${(vehicle.startingPrice / 100000).toFixed(2)} Lakh. For detailed on-road prices, please contact the nearest Laxmi Toyota branch.`
        }
      },
      {
        '@type': 'Question',
        'name': `Can I book a test drive for the ${vehicle.name} in ${location.name}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Yes, you can schedule a test drive online. Laxmi Toyota coordinates test drives across all service locations in South and West Odisha.`
        }
      }
    ]
  };

  // 4. Car Schema
  const carSchema = VehicleSEOService.getVehicleSchema(vehicle);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carSchema) }}
      />
      <VehicleLocationClient vehicle={vehicle} location={location} />
    </>
  );
}
