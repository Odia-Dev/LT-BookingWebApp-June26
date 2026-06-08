import React from 'react';
import type { Metadata } from 'next';
import { generateMetadata } from '@/core/seo';
import { ContentRepository } from '@/modules/content';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/feedback/Badge';
import FAQClient from './FAQClient';

export const metadata: Metadata = generateMetadata({
  title: 'Frequently Asked Questions (FAQs)',
  description: 'Find answers regarding vehicle bookings, strong hybrid technology, exchange valuations, and finance qualifications at Laxmi Toyota Odisha.',
  canonicalUrl: '/faqs',
  ogImage: '/media/toyota_hero_showcase.png',
});

export default function FAQsPage() {
  const faqs = ContentRepository.getAllFAQs();

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
        'name': 'FAQs',
        'item': 'https://laxmitoyota.com/faqs'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-gradient-to-br from-[#111111] via-gray-900 to-red-950 text-white py-16">
        <Container>
          <div className="max-w-2xl text-left">
            <Badge variant="info">Knowledge Center</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-3">
              Help & Support Center
            </h1>
            <p className="text-gray-300 mt-3 text-sm md:text-base leading-relaxed">
              Explore frequently asked questions about Toyota cars, strong hybrid systems, online reservations, financing programs, and exchange trade-ins.
            </p>
          </div>
        </Container>
      </section>

      <FAQClient initialFAQs={faqs} />
    </div>
  );
}
