'use client';

import React, { useState } from 'react';
import { Vehicle, VehicleVariant, VehicleFeature } from '../types';

// VehicleBadge Component
export interface VehicleBadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'info';
}

export const VehicleBadge: React.FC<VehicleBadgeProps> = ({ label, variant = 'primary' }) => {
  const styles = {
    primary: 'bg-[#EB0A1E]/10 text-[#EB0A1E] border-[#EB0A1E]/20',
    secondary: 'bg-[#111111]/5 text-[#111111] border-[#111111]/10',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]}`}>
      {label}
    </span>
  );
};

// VehiclePriceBlock Component
export interface VehiclePriceBlockProps {
  price: number;
  label?: string;
}

export const VehiclePriceBlock: React.FC<VehiclePriceBlockProps> = ({ price, label = 'Starting ex-showroom' }) => {
  const formatPrice = (p: number) => {
    if (p >= 10000000) {
      return `₹${(p / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(p / 100000).toFixed(2)} Lakh`;
  };

  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
      <span className="text-2xl font-bold text-[#111111]">{formatPrice(price)}*</span>
    </div>
  );
};

// VehicleCard Component
export interface VehicleCardProps {
  vehicle: Vehicle;
  onBookNow?: (vehicle: Vehicle) => void;
  onTestDrive?: (vehicle: Vehicle) => void;
  onCompareAdd?: (vehicle: Vehicle) => void;
  isCompared?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onBookNow,
  onTestDrive,
  onCompareAdd,
  isCompared = false
}) => {
  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative aspect-video w-full bg-gray-50 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={vehicle.heroImage}
          alt={vehicle.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <VehicleBadge label={vehicle.vehicleType} variant="secondary" />
          {vehicle.fuelType.includes('Hybrid') && <VehicleBadge label="Hybrid" variant="success" />}
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-[#111111]">{vehicle.name}</h3>
            <span className="text-xs font-mono text-gray-400">{vehicle.modelCode}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {vehicle.fuelType.map(f => (
              <span key={f} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{f}</span>
            ))}
            {vehicle.transmission.map(t => (
              <span key={t} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{t}</span>
            ))}
          </div>

          <ul className="text-sm text-gray-600 space-y-1 mb-6">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EB0A1E]" />
              {vehicle.seatingCapacity.map(s => `${s} Seats`).join('/')} Capacity
            </li>
            {vehicle.features.slice(0, 2).map(feat => (
              <li key={feat.id} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                {feat.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-end mb-4">
            <VehiclePriceBlock price={vehicle.startingPrice} />
            {onCompareAdd && (
              <button
                onClick={() => onCompareAdd(vehicle)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                  isCompared
                    ? 'bg-gray-100 border-gray-200 text-gray-500'
                    : 'border-gray-300 hover:border-gray-900 text-gray-700'
                }`}
              >
                {isCompared ? '✓ Compared' : '+ Compare'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {onTestDrive && (
              <button
                onClick={() => onTestDrive(vehicle)}
                className="w-full text-center py-2.5 rounded-xl border border-[#EB0A1E] text-[#EB0A1E] text-sm font-semibold hover:bg-[#EB0A1E]/5 transition-colors focus:ring-2 focus:ring-[#EB0A1E]/30"
              >
                Test Drive
              </button>
            )}
            {onBookNow && (
              <button
                onClick={() => onBookNow(vehicle)}
                className="w-full text-center py-2.5 rounded-xl bg-[#EB0A1E] text-white text-sm font-semibold hover:bg-[#c90818] transition-colors focus:ring-2 focus:ring-[#EB0A1E]/50"
              >
                Reserve Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// VehicleGrid Component
export interface VehicleGridProps {
  vehicles: Vehicle[];
  onBookNow?: (vehicle: Vehicle) => void;
  onTestDrive?: (vehicle: Vehicle) => void;
  onCompareAdd?: (vehicle: Vehicle) => void;
  comparedIds?: string[];
}

export const VehicleGrid: React.FC<VehicleGridProps> = ({
  vehicles,
  onBookNow,
  onTestDrive,
  onCompareAdd,
  comparedIds = []
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {vehicles.map(vehicle => (
        <VehicleCard
          key={vehicle.vehicleId}
          vehicle={vehicle}
          onBookNow={onBookNow}
          onTestDrive={onTestDrive}
          onCompareAdd={onCompareAdd}
          isCompared={comparedIds.includes(vehicle.vehicleId)}
        />
      ))}
    </div>
  );
};

// VehicleGallery Component
export interface VehicleGalleryProps {
  images: string[];
  vehicleName: string;
}

export const VehicleGallery: React.FC<VehicleGalleryProps> = ({ images, vehicleName }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-video w-full rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[activeIdx]}
          alt={`${vehicleName} view`}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`relative w-24 aspect-video rounded-lg border-2 overflow-hidden flex-shrink-0 bg-gray-50 ${
              activeIdx === idx ? 'border-[#EB0A1E]' : 'border-transparent hover:border-gray-300'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain p-1" />
          </button>
        ))}
      </div>
    </div>
  );
};

// VehicleFeatureList Component
export interface VehicleFeatureListProps {
  features: VehicleFeature[];
}

export const VehicleFeatureList: React.FC<VehicleFeatureListProps> = ({ features }) => {
  const categories = Array.from(new Set(features.map(f => f.category)));

  return (
    <div className="space-y-6">
      {categories.map(cat => (
        <div key={cat}>
          <h4 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2">{cat}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features
              .filter(f => f.category === cat)
              .map(feat => (
                <div key={feat.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#EB0A1E]/10 flex items-center justify-center text-[#EB0A1E] font-bold">
                    ✓
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 text-sm">{feat.name}</h5>
                    <p className="text-xs text-gray-500 mt-0.5">{feat.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// VehicleSpecificationTable Component
export interface VehicleSpecificationTableProps {
  vehicle: Vehicle;
}

export const VehicleSpecificationTable: React.FC<VehicleSpecificationTableProps> = ({ vehicle }) => {
  const specs = [
    { label: 'Model Code', value: vehicle.modelCode },
    { label: 'Segment', value: vehicle.vehicleType },
    { label: 'Seating Options', value: vehicle.seatingCapacity.map(s => `${s} Seats`).join(', ') },
    { label: 'Fuel Options', value: vehicle.fuelType.join(', ') },
    { label: 'Transmission', value: vehicle.transmission.join(', ') },
    { label: 'Starting Ex-Showroom Price', value: `₹${(vehicle.startingPrice / 100000).toFixed(2)} Lakh*` }
  ];

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
        <h4 className="font-bold text-gray-900">Technical Specifications</h4>
      </div>
      <table className="w-full text-left text-sm text-gray-700">
        <tbody>
          {specs.map((s, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              <td className="px-6 py-3.5 font-medium text-gray-500 w-1/3">{s.label}</td>
              <td className="px-6 py-3.5 text-gray-900 font-semibold">{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// VehicleCTASection Component
export interface VehicleCTASectionProps {
  vehicle: Vehicle;
  onBookNow: (vehicle: Vehicle) => void;
  onTestDrive: (vehicle: Vehicle) => void;
}

export const VehicleCTASection: React.FC<VehicleCTASectionProps> = ({ vehicle, onBookNow, onTestDrive }) => {
  return (
    <div className="bg-gradient-to-br from-[#111111] to-gray-800 rounded-3xl p-8 lg:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight">Ready to Drive the {vehicle.name}?</h3>
        <p className="text-gray-400 mt-2 max-w-xl">
          Reserve your vehicle online with a 100% refundable token, or schedule a test drive at your nearest Laxmi Toyota branch in Odisha.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <button
          onClick={() => onTestDrive(vehicle)}
          className="px-6 py-3 rounded-xl border border-white/30 text-white font-bold hover:bg-white/10 transition-colors w-full sm:w-auto text-center"
        >
          Book a Test Drive
        </button>
        <button
          onClick={() => onBookNow(vehicle)}
          className="px-6 py-3 rounded-xl bg-[#EB0A1E] text-white font-bold hover:bg-[#c90818] transition-colors w-full sm:w-auto text-center shadow-lg shadow-[#EB0A1E]/30"
        >
          Book Online Now
        </button>
      </div>
    </div>
  );
};

// VehicleCompareCard Component
export interface VehicleCompareCardProps {
  vehicle: Vehicle;
  onRemove: (id: string) => void;
}

export const VehicleCompareCard: React.FC<VehicleCompareCardProps> = ({ vehicle, onRemove }) => {
  return (
    <div className="relative p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={vehicle.heroImage} alt={vehicle.name} className="w-16 h-12 object-contain" />
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-gray-900 truncate">{vehicle.name}</h4>
        <p className="text-xs text-gray-500 mt-0.5">Starting ₹{(vehicle.startingPrice / 100000).toFixed(2)} L</p>
      </div>
      <button
        onClick={() => onRemove(vehicle.vehicleId)}
        className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 hover:text-gray-900 flex items-center justify-center text-xs"
        aria-label="Remove comparison"
      >
        ✕
      </button>
    </div>
  );
};

export { default as VehicleListingClient } from './VehicleListingClient';
export { default as VehicleDetailPageClient } from './VehicleDetailPageClient';
export { default as VehicleLocationClient } from './VehicleLocationClient';



