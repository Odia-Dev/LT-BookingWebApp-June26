import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
  VehicleRepository, 
  VehicleSEOService, 
  VehicleDetailPageClient,
  MOCK_VEHICLES 
} from '@/modules/vehicles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  MOCK_VEHICLES.forEach(v => {
    // Generate both prefix and non-prefix versions for maximum routing support
    params.push({ slug: v.slug });
    params.push({ slug: v.slug.replace(/^toyota-/, '') });
  });
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const vehicle = VehicleRepository.getBySlug(resolvedParams.slug);
  if (!vehicle) return {};

  const seo = VehicleSEOService.getMetadata(vehicle);
  const rootUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://laxmitoyota.com';

  return {
    title: `${vehicle.name} Price, Specifications & Features | Laxmi Toyota`,
    description: seo.metaDescription,
    alternates: {
      canonical: `${rootUrl}/vehicles/${resolvedParams.slug}`,
    },
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      url: `${rootUrl}/vehicles/${resolvedParams.slug}`,
      images: [
        {
          url: seo.openGraph.image,
          width: 1200,
          height: 630,
          alt: vehicle.name,
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.twitterCards.title,
      description: seo.twitterCards.description,
      images: [seo.twitterCards.image],
    }
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const vehicle = VehicleRepository.getBySlug(resolvedParams.slug);
  if (!vehicle) {
    notFound();
  }

  // Generate schemas
  const breadcrumbSchema = VehicleSEOService.getBreadcrumbs(vehicle);
  const faqSchema = VehicleSEOService.getFAQSchema(vehicle);
  const vehicleSchema = VehicleSEOService.getVehicleSchema(vehicle);

  // Fetch related vehicles (exclude current model, limit to 3)
  const relatedVehicles = MOCK_VEHICLES
    .filter(v => v.vehicleId !== vehicle.vehicleId && v.status === 'ACTIVE')
    .slice(0, 3);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }}
      />
      <VehicleDetailPageClient vehicle={vehicle} relatedVehicles={relatedVehicles} />
    </>
  );
}
