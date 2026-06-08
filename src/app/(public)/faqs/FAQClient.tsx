'use client';

import React, { useState } from 'react';
import { FAQ } from '@/modules/content';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/feedback/Badge';
import { Search, HelpCircle, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';

interface FAQClientProps {
  initialFAQs: FAQ[];
}

export default function FAQClient({ initialFAQs }: FAQClientProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | FAQ['category']>('all');
  const [faqOpen, setFaqOpen] = useState<Record<string, boolean>>({});

  const toggleFaq = (id: string) => {
    setFaqOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFAQs = initialFAQs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(query.toLowerCase()) || 
      faq.answer.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: { id: 'all' | FAQ['category']; label: string }[] = [
    { id: 'all', label: 'All FAQs' },
    { id: 'vehicle', label: 'Vehicles' },
    { id: 'finance', label: 'Finance' },
    { id: 'exchange', label: 'Exchange' },
    { id: 'booking', label: 'Booking' },
    { id: 'location', label: 'Locations' }
  ];

  return (
    <Section className="bg-gray-50 min-h-screen py-12">
      <Container>
        {/* Search & Filter Toggles */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-white p-6 rounded-3xl border border-gray-150 shadow-sm">
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Search FAQs by keywords..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-250 rounded-2xl focus:outline-none focus:border-[#EB0A1E] focus:ring-1 focus:ring-[#EB0A1E] text-sm text-gray-800 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs px-3.5 py-2 rounded-xl font-bold border transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#EB0A1E] border-[#EB0A1E] text-white shadow-sm'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map(faq => {
              const isOpen = !!faqOpen[faq.id];
              return (
                <div key={faq.id} className="border border-gray-150 rounded-2xl overflow-hidden shadow-sm bg-white">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 bg-gray-50/20 hover:bg-gray-50 font-bold text-left text-sm sm:text-base text-gray-900 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-[#EB0A1E] shrink-0" /> {faq.question}
                    </span>
                    {isOpen ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-5 bg-white border-t border-gray-150 text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-gray-150 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">No FAQs found</h3>
              <p className="text-sm text-gray-500 mt-2">Adjust your search query or clear the filter parameters.</p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
