import React, { useState } from 'react';
import { DocumentCategory } from '../types';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';

interface FinanceDocumentUploaderProps {
  onUpload: (category: DocumentCategory, fileName: string, filePath: string) => void;
  className?: string;
}

export const FinanceDocumentUploader: React.FC<FinanceDocumentUploaderProps> = ({ onUpload, className = '' }) => {
  const [category, setCategory] = useState<DocumentCategory>('Identity Proof');
  const [fileName, setFileName] = useState('');
  const [uploaded, setUploaded] = useState(false);

  const categories: DocumentCategory[] = [
    'Identity Proof',
    'Address Proof',
    'Income Proof',
    'Bank Statements',
    'Vehicle Documents'
  ];

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName || fileName.trim() === '') return;

    // Simulate document upload path
    const mockPath = `/uploads/docs/${fileName.toLowerCase().replace(/\s+/g, '_')}`;
    onUpload(category, fileName, mockPath);
    
    setUploaded(true);
    setTimeout(() => {
      setUploaded(false);
      setFileName('');
    }, 2000);
  };

  return (
    <form onSubmit={handleUploadSubmit} className={`flex flex-col gap-4 text-left p-5 border border-gray-150 rounded-2xl bg-white ${className}`}>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="docCategory" className="text-xs font-bold text-gray-500">Document Category</label>
        <select
          id="docCategory"
          value={category}
          onChange={e => setCategory(e.target.value as DocumentCategory)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-700"
        >
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="fileName" className="text-xs font-bold text-gray-500">File Name to Upload (Mock)</label>
        <input
          id="fileName"
          type="text"
          required
          value={fileName}
          onChange={e => setFileName(e.target.value)}
          placeholder="e.g. payslip_june.pdf or aadhaar.jpg"
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#EB0A1E]"
        />
      </div>

      <button
        type="submit"
        disabled={uploaded}
        className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
          uploaded 
            ? 'bg-emerald-600 text-white' 
            : 'bg-[#EB0A1E] hover:bg-[#c90818] text-white shadow-md shadow-[#EB0A1E]/10'
        }`}
      >
        {uploaded ? (
          <>
            <CheckCircle2 className="h-4 w-4" /> Document Uploaded!
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" /> Upload Document
          </>
        )}
      </button>

      <div className="flex items-start gap-1.5 p-3 rounded-xl bg-gray-50 border border-gray-150 text-[10px] text-gray-500 leading-relaxed mt-1">
        <FileText className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
        <span>
          <strong>Rules:</strong> Uploads must belong to the logged-in customer ID. Allowed formats: PDF, JPG, PNG (Max 5MB).
        </span>
      </div>
    </form>
  );
};
