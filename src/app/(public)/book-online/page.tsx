'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { BookingWizard } from '@/modules/bookings/components';
import { Loader2 } from 'lucide-react';

function BookOnlineContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') === 'test-drive' ? 'TEST_DRIVE' : 'BOOKING';
  const initialVehicle = searchParams.get('vehicle') || 'hyryder';

  return (
    <div className="bg-gray-55 min-h-screen py-6">
      <Section className="py-12">
        <Container>
          <BookingWizard initialType={initialType} initialVehicle={initialVehicle} />
        </Container>
      </Section>
    </div>
  );
}

export default function BookOnlinePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-55">
        <Loader2 className="h-8 w-8 animate-spin text-[#EB0A1E]" />
      </div>
    }>
      <BookOnlineContent />
    </Suspense>
  );
}
