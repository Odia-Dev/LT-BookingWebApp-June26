'use client';

import React, { useState } from 'react';
import { Review } from '@/modules/content';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/feedback/Badge';
import { Star, Filter, MessageSquare } from 'lucide-react';

interface ReviewsClientProps {
  initialReviews: Review[];
  locationsList: string[];
  vehiclesList: string[];
}

export default function ReviewsClient({ initialReviews, locationsList, vehiclesList }: ReviewsClientProps) {
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState('all');

  const filteredReviews = initialReviews.filter(rev => {
    const matchesLocation = selectedLocation === 'all' || rev.location === selectedLocation;
    const matchesVehicle = selectedVehicle === 'all' || rev.model === selectedVehicle;
    return matchesLocation && matchesVehicle;
  });

  return (
    <Section className="bg-gray-50 min-h-screen py-12">
      <Container>
        {/* Filtering Controls */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-6 rounded-3xl border border-gray-150 shadow-sm mb-8">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Filter by Location</label>
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="w-full bg-gray-50 border border-gray-250 p-2.5 rounded-2xl text-xs sm:text-sm text-gray-700 font-medium focus:outline-none"
            >
              <option value="all">All Locations</option>
              {locationsList.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Filter by Vehicle</label>
            <select
              value={selectedVehicle}
              onChange={e => setSelectedVehicle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-250 p-2.5 rounded-2xl text-xs sm:text-sm text-gray-700 font-medium focus:outline-none"
            >
              <option value="all">All Models</option>
              {vehiclesList.map(veh => (
                <option key={veh} value={veh}>{veh}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map(rev => (
              <div key={rev.id} className="p-6 border border-gray-150 rounded-3xl bg-white shadow-sm flex flex-col justify-between gap-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-0.5 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{rev.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">"{rev.comment}"</p>
                </div>
                <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900">{rev.author}</span>
                    <span className="text-[10px] text-gray-400 font-semibold">{rev.location} Customer</span>
                  </div>
                  <span className="text-[10px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-xl font-bold border border-gray-200">
                    {rev.model}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-gray-150 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">No Reviews Found</h3>
              <p className="text-sm text-gray-500 mt-2">No reviews match your selected location and vehicle parameters.</p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
