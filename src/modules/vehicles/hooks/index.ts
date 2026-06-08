'use client';

import { useState, useMemo, useEffect } from 'react';
import { Vehicle } from '../types';
import { VehicleRepository, VehicleFilterService, VehicleSearchService, FilterCriteria } from '../services';

// hook: useVehicle
export function useVehicle(identifier: { id?: string; slug?: string }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      let found: Vehicle | undefined;
      if (identifier.id) {
        found = VehicleRepository.getById(identifier.id);
      } else if (identifier.slug) {
        found = VehicleRepository.getBySlug(identifier.slug);
      }

      if (found) {
        setVehicle(found);
      } else {
        setError('Vehicle not found');
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred fetching vehicle data');
    } finally {
      setLoading(false);
    }
  }, [identifier.id, identifier.slug]);

  return { vehicle, loading, error };
}

// hook: useVehicleFilters
export function useVehicleFilters(initialVehicles: Vehicle[] = VehicleRepository.getAll()) {
  const [filters, setFilters] = useState<FilterCriteria>({
    vehicleType: [],
    fuelType: [],
    transmission: [],
    seatingCapacity: [],
    priceRange: { min: undefined, max: undefined }
  });

  const filteredVehicles = useMemo(() => {
    return VehicleFilterService.filter(filters, initialVehicles);
  }, [filters, initialVehicles]);

  const toggleType = (type: any) => {
    setFilters(prev => {
      const current = prev.vehicleType || [];
      const updated = current.includes(type)
        ? current.filter(t => t !== type)
        : [...current, type];
      return { ...prev, vehicleType: updated };
    });
  };

  const toggleFuel = (fuel: any) => {
    setFilters(prev => {
      const current = prev.fuelType || [];
      const updated = current.includes(fuel)
        ? current.filter(f => f !== fuel)
        : [...current, fuel];
      return { ...prev, fuelType: updated };
    });
  };

  const toggleTransmission = (trans: any) => {
    setFilters(prev => {
      const current = prev.transmission || [];
      const updated = current.includes(trans)
        ? current.filter(t => t !== trans)
        : [...current, trans];
      return { ...prev, transmission: updated };
    });
  };

  const toggleSeating = (capacity: number) => {
    setFilters(prev => {
      const current = prev.seatingCapacity || [];
      const updated = current.includes(capacity)
        ? current.filter(c => c !== capacity)
        : [...current, capacity];
      return { ...prev, seatingCapacity: updated };
    });
  };

  const setPriceLimit = (min?: number, max?: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { min, max }
    }));
  };

  const clearFilters = () => {
    setFilters({
      vehicleType: [],
      fuelType: [],
      transmission: [],
      seatingCapacity: [],
      priceRange: { min: undefined, max: undefined }
    });
  };

  return {
    filters,
    filteredVehicles,
    toggleType,
    toggleFuel,
    toggleTransmission,
    toggleSeating,
    setPriceLimit,
    clearFilters
  };
}

// hook: useVehicleSearch
export function useVehicleSearch(initialVehicles: Vehicle[] = VehicleRepository.getAll()) {
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const searchResults = useMemo(() => {
    return VehicleSearchService.search(debouncedQuery, initialVehicles);
  }, [debouncedQuery, initialVehicles]);

  return {
    query,
    setQuery,
    searchResults
  };
}

// hook: useVehicleComparison
export function useVehicleComparison(maxCompareCount: number = 3) {
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<any>(null);

  const comparedVehicles = useMemo(() => {
    return comparedIds
      .map(id => VehicleRepository.getById(id))
      .filter((v): v is Vehicle => !!v);
  }, [comparedIds]);

  const toggleCompare = (vehicle: Vehicle) => {
    setComparedIds(prev => {
      if (prev.includes(vehicle.vehicleId)) {
        return prev.filter(id => id !== vehicle.vehicleId);
      }
      if (prev.length >= maxCompareCount) {
        // Soft limit alert or silent ignore
        return prev;
      }
      return [...prev, vehicle.vehicleId];
    });
  };

  const removeCompare = (id: string) => {
    setComparedIds(prev => prev.filter(item => item !== id));
  };

  const clearCompare = () => {
    setComparedIds([]);
  };

  return {
    comparedIds,
    comparedVehicles,
    toggleCompare,
    removeCompare,
    clearCompare
  };
}
