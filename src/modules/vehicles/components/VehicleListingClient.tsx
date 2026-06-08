'use client';

import React, { useState, useTransition } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/feedback/Badge';
import { Button } from '@/components/ui/Button';
import { 
  VehicleGrid, 
  VehicleCompareCard 
} from './index';
import { 
  useVehicleFilters, 
  useVehicleSearch, 
  useVehicleComparison 
} from '../hooks';
import { VehicleRepository } from '../services';
import { VehicleCategory, FuelType, TransmissionType } from '../types';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Car, 
  AlertCircle 
} from 'lucide-react';

export default function VehicleListingClient() {
  const allVehicles = VehicleRepository.getAll();
  
  // Setup search hook
  const { query, setQuery, searchResults } = useVehicleSearch(allVehicles);
  
  // Setup filters hook on search results
  const {
    filters,
    filteredVehicles,
    toggleType,
    toggleFuel,
    toggleTransmission,
    toggleSeating,
    setPriceLimit,
    clearFilters
  } = useVehicleFilters(searchResults);

  // Setup comparison hook
  const {
    comparedIds,
    comparedVehicles,
    toggleCompare,
    removeCompare,
    clearCompare
  } = useVehicleComparison(3);

  // Mobile filters drawer open state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Price range controls
  const minPrice = 500000;
  const maxPrice = 25000000;
  const currentMaxPrice = filters.priceRange?.max ?? maxPrice;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    startTransition(() => {
      setPriceLimit(undefined, value);
    });
  };

  const formatPrice = (p: number) => {
    if (p >= 10000000) {
      return `₹${(p / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(p / 100000).toFixed(2)} Lakh`;
  };

  const handleBookNow = (vehicle: any) => {
    window.location.href = `/book-online?vehicle=${vehicle.vehicleId}`;
  };

  const handleTestDrive = (vehicle: any) => {
    window.location.href = `/book-online?type=test-drive&vehicle=${vehicle.vehicleId}`;
  };

  const vehicleTypes: VehicleCategory[] = ['Hatchback', 'SUV', 'MPV', 'Sedan', 'Utility'];
  const fuelTypes: FuelType[] = ['Petrol', 'Diesel', 'Hybrid', 'CNG'];
  const transmissions: TransmissionType[] = ['Manual', 'Automatic'];
  const seatingOptions = [5, 7, 8];

  const filterCount = 
    (filters.vehicleType?.length ?? 0) +
    (filters.fuelType?.length ?? 0) +
    (filters.transmission?.length ?? 0) +
    (filters.seatingCapacity?.length ?? 0) +
    (filters.priceRange?.max ? 1 : 0);

  const FilterSidebar = () => (
    <div className="flex flex-col gap-6 bg-white p-6 rounded-2xl border border-gray-150 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#EB0A1E]" /> Filters
        </h3>
        {filterCount > 0 && (
          <button 
            onClick={clearFilters}
            className="text-xs text-gray-500 hover:text-[#EB0A1E] flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        )}
      </div>

      {/* Vehicle Type */}
      <div className="flex flex-col gap-2.5">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Body Style</h4>
        <div className="flex flex-wrap gap-2">
          {vehicleTypes.map(type => {
            const selected = filters.vehicleType?.includes(type);
            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`text-xs px-3 py-2 rounded-xl border font-semibold transition-all ${
                  selected 
                    ? 'bg-[#EB0A1E] border-[#EB0A1E] text-white shadow-sm' 
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-900'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fuel Type */}
      <div className="flex flex-col gap-2.5 border-t border-gray-100 pt-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Fuel Option</h4>
        <div className="flex flex-wrap gap-2">
          {fuelTypes.map(fuel => {
            const selected = filters.fuelType?.includes(fuel);
            return (
              <button
                key={fuel}
                onClick={() => toggleFuel(fuel)}
                className={`text-xs px-3 py-2 rounded-xl border font-semibold transition-all ${
                  selected 
                    ? 'bg-[#EB0A1E] border-[#EB0A1E] text-white shadow-sm' 
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-900'
                }`}
              >
                {fuel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Transmission */}
      <div className="flex flex-col gap-2.5 border-t border-gray-100 pt-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Transmission</h4>
        <div className="flex flex-wrap gap-2">
          {transmissions.map(trans => {
            const selected = filters.transmission?.includes(trans);
            return (
              <button
                key={trans}
                onClick={() => toggleTransmission(trans)}
                className={`text-xs px-3 py-2 rounded-xl border font-semibold transition-all ${
                  selected 
                    ? 'bg-[#EB0A1E] border-[#EB0A1E] text-white shadow-sm' 
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-900'
                }`}
              >
                {trans}
              </button>
            );
          })}
        </div>
      </div>

      {/* Seating Capacity */}
      <div className="flex flex-col gap-2.5 border-t border-gray-100 pt-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Seating Capacity</h4>
        <div className="flex flex-wrap gap-2">
          {seatingOptions.map(seat => {
            const selected = filters.seatingCapacity?.includes(seat);
            return (
              <button
                key={seat}
                onClick={() => toggleSeating(seat)}
                className={`text-xs px-4 py-2 rounded-xl border font-semibold transition-all ${
                  selected 
                    ? 'bg-[#EB0A1E] border-[#EB0A1E] text-white shadow-sm' 
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-900'
                }`}
              >
                {seat} Seater
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-3 border-t border-gray-100 pt-4">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Max Budget</h4>
          <span className="text-sm font-bold text-[#EB0A1E]">{formatPrice(currentMaxPrice)}</span>
        </div>
        <input 
          type="range"
          min={minPrice}
          max={maxPrice}
          step={50000}
          value={currentMaxPrice}
          onChange={handlePriceChange}
          className="w-full accent-[#EB0A1E] cursor-pointer h-1.5 bg-gray-100 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[10px] text-gray-400 font-bold">
          <span>{formatPrice(minPrice)}</span>
          <span>{formatPrice(maxPrice)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#111111] via-gray-900 to-red-950 text-white py-16">
        <Container>
          <div className="max-w-2xl text-left">
            <Badge variant="info">Toyota Catalog</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-3">
              Explore Our Vehicle Range
            </h1>
            <p className="text-gray-300 mt-3 text-sm md:text-base leading-relaxed">
              Find your ideal Toyota. Browse by body type, hybrid capability, passenger seating limits, and prices tailored for Brahmapur, Jeypore, and districts across Odisha.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Grid Content */}
      <Section className="bg-gray-50 min-h-screen">
        <Container>
          {/* Top Controls bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="h-5 w-5" />
              </span>
              <input
                type="text"
                placeholder="Search models, features, or body types..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:border-[#EB0A1E] focus:ring-1 focus:ring-[#EB0A1E] text-sm text-gray-800 placeholder-gray-400 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <span className="text-sm font-semibold text-gray-500">
                Showing {filteredVehicles.length} of {allVehicles.length} Vehicles
              </span>
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="md:hidden flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl shadow-sm text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4 text-[#EB0A1E]" /> Filters
                {filterCount > 0 && (
                  <span className="bg-[#EB0A1E] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                    {filterCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Desktop Filter Sidebar */}
            <aside className="hidden md:block lg:col-span-1 sticky top-6">
              <FilterSidebar />
            </aside>

            {/* Catalog Grid */}
            <main className="lg:col-span-3">
              {filteredVehicles.length > 0 ? (
                <VehicleGrid
                  vehicles={filteredVehicles}
                  onBookNow={handleBookNow}
                  onTestDrive={handleTestDrive}
                  onCompareAdd={toggleCompare}
                  comparedIds={comparedIds}
                />
              ) : (
                <div className="flex flex-col items-center justify-center bg-white border border-gray-150 rounded-3xl p-12 text-center shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-[#EB0A1E] mb-4">
                    <AlertCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">No Vehicles Match Your Filters</h3>
                  <p className="text-sm text-gray-500 max-w-sm mt-2 leading-relaxed">
                    Try adjusting your parameters or clear search query to view all available Toyota models.
                  </p>
                  <button
                    onClick={() => {
                      clearFilters();
                      setQuery('');
                    }}
                    className="mt-6 px-6 py-2.5 bg-[#EB0A1E] text-white rounded-xl text-sm font-bold hover:bg-[#c90818] transition-colors shadow-lg shadow-[#EB0A1E]/20"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </Container>
      </Section>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 transition-opacity flex justify-end md:hidden">
          <div className="w-full max-w-xs bg-white h-full overflow-y-auto p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                <h3 className="font-bold text-lg text-gray-900">Filters</h3>
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FilterSidebar />
            </div>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-8 w-full bg-[#EB0A1E] hover:bg-[#c90818] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#EB0A1E]/20 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Comparison Drawer / Tray */}
      {comparedVehicles.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-4 z-40 transition-transform duration-300">
          <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest shrink-0">
                Comparing ({comparedVehicles.length}/3)
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
                {comparedVehicles.map(vehicle => (
                  <VehicleCompareCard
                    key={vehicle.vehicleId}
                    vehicle={vehicle}
                    onRemove={removeCompare}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto shrink-0 justify-end">
              <button 
                onClick={clearCompare}
                className="px-4 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  const queryIds = comparedIds.join(',');
                  window.location.href = `/vehicles/compare?ids=${queryIds}`;
                }}
                className="px-6 py-2.5 bg-[#EB0A1E] hover:bg-[#c90818] text-white text-xs font-bold rounded-xl shadow-md transition-colors"
              >
                Compare Now
              </button>
            </div>
          </Container>
        </div>
      )}
    </Layout>
  );
}
