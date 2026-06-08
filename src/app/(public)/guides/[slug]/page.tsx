import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateMetadata as baseGenerateMetadata } from '@/core/seo';
import { ContentRepository, MOCK_GUIDES } from '@/modules/content';
import GuideDetailsClient from './GuideDetailsClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_GUIDES.map(guide => ({
    slug: guide.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const guide = ContentRepository.getGuideBySlug(resolvedParams.slug);
  if (!guide) return {};

  return baseGenerateMetadata({
    title: `${guide.title} | Laxmi Toyota Odisha`,
    description: guide.description,
    canonicalUrl: `/guides/${resolvedParams.slug}`,
    ogImage: '/media/toyota_hero_showcase.png',
  });
}

export default async function GuideDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const guide = ContentRepository.getGuideBySlug(resolvedParams.slug);

  if (!guide) {
    notFound();
  }

  // JSON-LD breadcrumb schema
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
        'name': 'Guides',
        'item': 'https://laxmitoyota.com/guides'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': guide.title,
        'item': `https://laxmitoyota.com/guides/${resolvedParams.slug}`
      }
    ]
  };

  // JSON-LD Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': guide.title,
    'description': guide.description,
    'datePublished': `${guide.publishedDate}T09:00:00+05:30`,
    'dateModified': `${guide.publishedDate}T09:00:00+05:30`,
    'image': 'https://laxmitoyota.com/media/toyota_hero_showcase.png',
    'author': {
      '@type': 'Organization',
      'name': 'Laxmi Toyota'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Laxmi Toyota',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://laxmitoyota.com/media/toyota_logo.png'
      }
    }
  };

  // FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': guide.faqList.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GuideDetailsClient guide={guide} />
    </>
  );
}
