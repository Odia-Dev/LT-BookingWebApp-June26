import React, { useState } from 'react';
import { validateFinanceInput } from '../validation';
import { ArrowRight, DollarSign, Briefcase, Calendar } from 'lucide-react';

interface FinanceApplicationFormProps {
  onSubmit: (details: {
    monthlyIncome: number;
    employerName: string;
    employmentType: 'Salaried' | 'Self-Employed' | 'Business' | 'Other';
    loanAmountRequested: number;
    loanTenureYears: number;
  }) => void;
  initialValues?: {
    monthlyIncome: number;
    employerName: string;
    employmentType: 'Salaried' | 'Self-Employed' | 'Business' | 'Other';
    loanAmountRequested: number;
    loanTenureYears: number;
  };
  className?: string;
}

export const FinanceApplicationForm: React.FC<FinanceApplicationFormProps> = ({
  onSubmit,
  initialValues,
  className = ''
}) => {
  const [formData, setFormData] = useState({
    monthlyIncome: initialValues?.monthlyIncome || 0,
    employerName: initialValues?.employerName || '',
    employmentType: initialValues?.employmentType || 'Salaried',
    loanAmountRequested: initialValues?.loanAmountRequested || 0,
    loanTenureYears: initialValues?.loanTenureYears || 5
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFinanceInput(formData)) {
      setErrorMsg('Please enter valid finance eligibility details. Monthly income/amount must be positive, tenure max 7 years.');
      return;
    }
    setErrorMsg('');
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-5 text-left bg-white p-6 border border-gray-150 rounded-2xl ${className}`}>
      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-650 rounded-xl text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="monthlyIncome" className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <DollarSign className="h-3.5 w-3.5 text-gray-400" /> Monthly Net Salary (₹)
          </label>
          <input
            id="monthlyIncome"
            type="number"
            required
            min={1}
            value={formData.monthlyIncome || ''}
            onChange={e => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
            placeholder="e.g. 75000"
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="employmentType" className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5 text-gray-400" /> Employment Type
          </label>
          <select
            id="employmentType"
            value={formData.employmentType}
            onChange={e => setFormData({ ...formData, employmentType: e.target.value as any })}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-700"
          >
            <option value="Salaried">Salaried Employee</option>
            <option value="Self-Employed">Self-Employed Professional</option>
            <option value="Business">Proprietorship / Business owner</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="employerName" className="text-xs font-bold text-gray-500">Employer / Business Name</label>
        <input
          id="employerName"
          type="text"
          required
          value={formData.employerName}
          onChange={e => setFormData({ ...formData, employerName: e.target.value })}
          placeholder="e.g. TCS Ltd. or Self Practice"
          className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="loanAmount" className="text-xs font-bold text-gray-500">Loan Amount Requested (₹)</label>
          <input
            id="loanAmount"
            type="number"
            required
            min={1}
            value={formData.loanAmountRequested || ''}
            onChange={e => setFormData({ ...formData, loanAmountRequested: Number(e.target.value) })}
            placeholder="e.g. 500000"
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="loanTenure" className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-gray-400" /> Tenure Choice (Years)
          </label>
          <select
            id="loanTenure"
            value={formData.loanTenureYears}
            onChange={e => setFormData({ ...formData, loanTenureYears: Number(e.target.value) })}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-700"
          >
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="4">4 Years</option>
            <option value="5">5 Years</option>
            <option value="6">6 Years</option>
            <option value="7">7 Years</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
      >
        Assess Loan Eligibility <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
};
