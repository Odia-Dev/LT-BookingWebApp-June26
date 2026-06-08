'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function MyBookingsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to customer portal with bookings active tab parameter
    router.replace('/customer?tab=bookings');
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-500">
      <Loader2 className="h-8 w-8 animate-spin text-[#EB0A1E] mb-2" />
      <span className="text-xs font-bold">Redirecting to Customer Portal...</span>
    </div>
  );
}
