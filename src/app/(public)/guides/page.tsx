import React from 'react';
import type { Metadata } from 'next';
import { generateMetadata } from '@/core/seo';
import { ContentRepository } from '@/modules/content';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/feedback/Badge';
import { BookOpen, HelpCircle } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'Toyota Vehicle Buying & Ownership Guides',
  description: 'Explore comprehensive buying guides for the Hyryder, Hycross, Fortuner, Rumion, and Taisor. Read insurance, finance, and service cost guides.',
  canonicalUrl: '/guides',
  ogImage: '/media/toyota_hero_showcase.png',
});

export default function GuidesPage() {
  const guides = ContentRepository.getAllGuides();
  const buyingGuides = guides.filter(g => g.category === 'buying');
  const ownershipGuides = guides.filter(g => g.category === 'ownership');

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
      }
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-gradient-to-br from-[#111111] via-gray-900 to-red-950 text-white py-16">
        <Container>
          <div className="max-w-2xl text-left">
            <Badge variant="info">Resource Center</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-3">
              Toyota Car Guides
            </h1>
            <p className="text-gray-300 mt-3 text-sm md:text-base leading-relaxed">
              Equip yourself with comprehensive vehicle evaluations, fuel economy metrics, service schedules, insurance tips, and trade-in guides.
            </p>
          </div>
        </Container>
      </section>

      {/* Buying Guides */}
      <Section className="py-12 bg-white">
        <Container>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-[#EB0A1E]" /> Buying Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buyingGuides.map(guide => (
              <div key={guide.slug} className="p-6 border border-gray-150 rounded-3xl bg-gray-50 flex flex-col justify-between gap-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-lg text-gray-900 leading-snug">{guide.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mt-1">{guide.description}</p>
                </div>
                <a 
                  href={`/guides/${guide.slug}`}
                  className="w-full text-center py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Read Guide
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Ownership Guides */}
      <Section className="py-12 bg-gray-50 border-t border-gray-150">
        <Container>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-[#EB0A1E]" /> Ownership & Finance Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownershipGuides.map(guide => (
              <div key={guide.slug} className="p-6 border border-gray-150 rounded-3xl bg-white flex flex-col justify-between gap-5 hover:shadow-md transition-shadow shadow-sm">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-lg text-gray-900 leading-snug">{guide.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mt-1">{guide.description}</p>
                </div>
                <a 
                  href={`/guides/${guide.slug}`}
                  className="w-full text-center py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Read Guide
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
