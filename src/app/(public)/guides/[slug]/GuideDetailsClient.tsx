'use client';

import React, { useState } from 'react';
import { Guide } from '@/modules/content';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/feedback/Badge';
import { ShieldCheck, HelpCircle, ChevronDown, ChevronUp, BookOpen, Clock } from 'lucide-react';

interface GuideDetailsClientProps {
  guide: Guide;
}

export default function GuideDetailsClient({ guide }: GuideDetailsClientProps) {
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  const toggleFaq = (idx: number) => {
    setFaqOpen(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCTA = (type: string) => {
    window.location.href = `/book-online?type=${type}&ref=guide-${guide.slug}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#111111] via-gray-900 to-red-950 text-white py-16">
        <Container>
          <div className="max-w-3xl text-left flex flex-col gap-4">
            <Badge variant="info">{guide.category === 'buying' ? 'Buying Guide' : 'Ownership Guide'}</Badge>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {guide.title}
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {guide.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold mt-2">
              <Clock className="h-4 w-4" /> Published: {guide.publishedDate}
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Section className="py-12 bg-white">
        <Container className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Article column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* AI Summary Block */}
            <div className="p-6 bg-gray-50 border border-gray-150 rounded-3xl">
              <h4 className="font-bold text-gray-900 text-base mb-2">Guide Summary</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                {guide.summaryBlock}
              </p>
            </div>

            {/* Core Content */}
            <article className="prose max-w-none text-xs sm:text-sm text-gray-600 leading-relaxed space-y-4">
              <p>{guide.content}</p>
            </article>

            {/* Benefits */}
            {guide.benefits && guide.benefits.length > 0 && (
              <div className="flex flex-col gap-4 mt-4">
                <h3 className="text-lg font-bold text-gray-950">Key Benefits & Advantages</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {guide.benefits.map((b, i) => (
                    <div key={i} className="flex gap-3 items-start p-4 bg-gray-50 rounded-2xl border border-gray-150 shadow-sm">
                      <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
                      <span className="text-xs text-gray-600 font-semibold leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comparison Table */}
            {guide.comparisonTable && (
              <div className="flex flex-col gap-4 mt-6">
                <h3 className="text-lg font-bold text-gray-950">Specification Matrix</h3>
                <div className="border border-gray-150 rounded-3xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs sm:text-sm text-gray-700">
                    <thead className="bg-gray-50 font-bold border-b border-gray-150">
                      <tr>
                        {guide.comparisonTable.headers.map((h, i) => (
                          <th key={i} className="px-4 py-3.5 text-gray-900">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {guide.comparisonTable.rows.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                          {row.map((val, cellIdx) => (
                            <td key={cellIdx} className="px-4 py-3.5 border-b border-gray-100 font-medium">{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar checkout CTAs */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-6">
            <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl border border-gray-800 flex flex-col gap-3 shadow-md">
              <h4 className="font-bold text-lg">Toyota Qualification Checkout</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Confirm your Toyota reservation online. Fast secure OTP verification and refundable tokens apply.
              </p>
              <button
                onClick={() => handleCTA('booking')}
                className="mt-2 w-full py-2.5 bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs rounded-xl transition-all shadow-sm"
              >
                Book Online Now
              </button>
            </div>

            <div className="p-6 bg-white border border-gray-150 rounded-3xl flex flex-col gap-3 shadow-sm">
              <h4 className="font-bold text-lg text-gray-900">Request Test Drive</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Schedule a door-step or showroom vehicle test drive near your location in Odisha.
              </p>
              <button
                onClick={() => handleCTA('test-drive')}
                className="mt-2 w-full py-2.5 bg-[#EB0A1E] text-white hover:bg-[#c90818] font-bold text-xs rounded-xl transition-all shadow-sm shadow-[#EB0A1E]/10"
              >
                Schedule Test Drive
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => handleCTA('finance')}
                className="py-2.5 bg-white border border-gray-200 hover:border-gray-900 text-gray-700 font-bold text-[10px] rounded-xl transition-all shadow-sm"
              >
                Apply Finance
              </button>
              <button
                onClick={() => handleCTA('exchange')}
                className="py-2.5 bg-white border border-gray-200 hover:border-gray-900 text-gray-700 font-bold text-[10px] rounded-xl transition-all shadow-sm"
              >
                Exchange Value
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Accordion FAQs */}
      {guide.faqList && guide.faqList.length > 0 && (
        <Section className="py-12 bg-gray-50 border-t border-gray-250/50">
          <Container className="max-w-3xl">
            <div className="text-center mb-8">
              <Badge variant="info">Q&A Section</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {guide.faqList.map((faq, idx) => {
                const isOpen = !!faqOpen[idx];
                return (
                  <div key={idx} className="border border-gray-150 rounded-2xl overflow-hidden shadow-sm bg-white">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-5 bg-gray-50/50 hover:bg-gray-50 font-bold text-left text-sm sm:text-base text-gray-900 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-[#EB0A1E] shrink-0" /> {faq.question}
                      </span>
                      {isOpen ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="p-5 bg-white border-t border-gray-150 text-xs sm:text-sm text-gray-650 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}
