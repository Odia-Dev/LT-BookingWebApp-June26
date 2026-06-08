import React from 'react';
import type { Metadata } from 'next';
import { generateMetadata } from '@/core/seo';
import { ContentRepository } from '@/modules/content';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/feedback/Badge';
import ReviewsClient from './ReviewsClient';

export const metadata: Metadata = generateMetadata({
  title: 'Customer Reviews & Feedback | Laxmi Toyota Odisha',
  description: 'Read verified testimonials, purchase feedback, and service center ratings from Toyota buyers in Brahmapur, Jeypore, Rayagada, and Bargarh.',
  canonicalUrl: '/reviews',
  ogImage: '/media/toyota_hero_showcase.png',
});

export default function ReviewsPage() {
  const reviews = ContentRepository.getAllReviews();

  // Extract unique locations and models
  const locationsList = Array.from(new Set(reviews.map(r => r.location)));
  const vehiclesList = Array.from(new Set(reviews.map(r => r.model)));

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
        'name': 'Reviews',
        'item': 'https://laxmitoyota.com/reviews'
      }
    ]
  };

  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    'name': 'Laxmi Toyota Odisha',
    'image': 'https://laxmitoyota.com/media/toyota_hero_showcase.png',
    'telephone': '+91 94370 12345',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'NH-16 Bypass Road, Brahmapur',
      'addressLocality': 'Brahmapur',
      'addressRegion': 'OD',
      'postalCode': '760001',
      'addressCountry': 'IN'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': reviews.length.toString(),
      'bestRating': '5',
      'worstRating': '1'
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />

      <section className="bg-gradient-to-br from-[#111111] via-gray-900 to-red-950 text-white py-16">
        <Container>
          <div className="max-w-2xl text-left">
            <Badge variant="info">Feedback & Ratings</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-3">
              Customer Reviews
            </h1>
            <p className="text-gray-300 mt-3 text-sm md:text-base leading-relaxed">
              Read verified testimonials from vehicle buyers across Odisha. Filter reviews by dealership showroom or specific vehicle models.
            </p>
          </div>
        </Container>
      </section>

      <ReviewsClient 
        initialReviews={reviews}
        locationsList={locationsList}
        vehiclesList={vehiclesList}
      />
    </div>
  );
}
