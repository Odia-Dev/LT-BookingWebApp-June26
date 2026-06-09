import React, { useState } from 'react';
import { validateExchangeInput } from '../validation';
import { VehicleExchangeDetails } from '../types';
import { ArrowRight, Car, Compass, Calendar, RefreshCw, AlertCircle } from 'lucide-react';

interface VehicleExchangeFormProps {
  onSubmit: (details: VehicleExchangeDetails, photos: string[]) => void;
  initialValues?: Partial<VehicleExchangeDetails>;
  className?: string;
}

export const VehicleExchangeForm: React.FC<VehicleExchangeFormProps> = ({
  onSubmit,
  initialValues,
  className = ''
}) => {
  const [formData, setFormData] = useState<Partial<VehicleExchangeDetails>>({
    registrationNumber: initialValues?.registrationNumber || '',
    brand: initialValues?.brand || '',
    model: initialValues?.model || '',
    year: initialValues?.year || 2018,
    kilometersDriven: initialValues?.kilometersDriven || 0,
    ownershipType: initialValues?.ownershipType || 'First Owner'
  });

  const [photosList, setPhotosList] = useState<string[]>([]);
  const [photoInput, setPhotoInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddPhoto = () => {
    if (!photoInput || photoInput.trim() === '') return;
    setPhotosList([...photosList, photoInput.trim()]);
    setPhotoInput('');
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotosList(photosList.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateExchangeInput(formData)) {
      setErrorMsg('Please ensure all vehicle details are valid. Year must be between 1990 and next year, and kilometers driven cannot be negative.');
      return;
    }
    setErrorMsg('');
    onSubmit(formData as VehicleExchangeDetails, photosList.length > 0 ? photosList : ['/uploads/vehicles/default_used.jpg']);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-5 text-left bg-white p-6 border border-gray-150 rounded-2xl ${className}`}>
      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-650 rounded-xl text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="regNum" className="text-xs font-bold text-gray-500">Vehicle Registration Number</label>
          <input
            id="regNum"
            type="text"
            required
            placeholder="e.g. OD-02-AX-1234"
            value={formData.registrationNumber}
            onChange={e => setFormData({ ...formData, registrationNumber: e.target.value })}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="ownership" className="text-xs font-bold text-gray-500">Ownership Type</label>
          <select
            id="ownership"
            value={formData.ownershipType}
            onChange={e => setFormData({ ...formData, ownershipType: e.target.value as any })}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-700"
          >
            <option value="First Owner">First Owner</option>
            <option value="Second Owner">Second Owner</option>
            <option value="Third Owner">Third Owner</option>
            <option value="Other">Other (4th+ Owner / Commercial)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="brandName" className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <Car className="h-3.5 w-3.5 text-gray-400" /> Vehicle Brand
          </label>
          <input
            id="brandName"
            type="text"
            required
            placeholder="e.g. Hyundai, Honda, Maruti Suzuki"
            value={formData.brand}
            onChange={e => setFormData({ ...formData, brand: e.target.value })}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="modelName" className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <Compass className="h-3.5 w-3.5 text-gray-400" /> Vehicle Model & Trim
          </label>
          <input
            id="modelName"
            type="text"
            required
            placeholder="e.g. i20 Asta, City i-VTEC"
            value={formData.model}
            onChange={e => setFormData({ ...formData, model: e.target.value })}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="mfgYear" className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-gray-400" /> Manufacturing Year
          </label>
          <input
            id="mfgYear"
            type="number"
            required
            min={1990}
            max={new Date().getFullYear() + 1}
            value={formData.year || ''}
            onChange={e => setFormData({ ...formData, year: Number(e.target.value) })}
            placeholder="e.g. 2018"
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="kmsDriven" className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <RefreshCw className="h-3.5 w-3.5 text-gray-400" /> Kilometers Driven
          </label>
          <input
            id="kmsDriven"
            type="number"
            required
            min={0}
            value={formData.kilometersDriven || ''}
            onChange={e => setFormData({ ...formData, kilometersDriven: Number(e.target.value) })}
            placeholder="e.g. 45000"
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
          />
        </div>
      </div>

      {/* Mock Photos Upload Section */}
      <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
        <label className="text-xs font-bold text-gray-500">Add Vehicle Inspection Photos (Mock URL/File name)</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={photoInput}
            onChange={e => setPhotoInput(e.target.value)}
            placeholder="e.g. front_view.jpg, dashboard.jpg"
            className="border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#EB0A1E] flex-1"
          />
          <button
            type="button"
            onClick={handleAddPhoto}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Add
          </button>
        </div>

        {photosList.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {photosList.map((p, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-gray-100 text-gray-750 border border-gray-200 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5"
              >
                {p}
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(idx)}
                  className="text-red-500 hover:text-red-700 font-extrabold shrink-0"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
      >
        Submit Exchange Eligibility <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
};
