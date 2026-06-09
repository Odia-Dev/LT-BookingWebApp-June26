import React, { useState, useRef } from 'react';
import { DocumentCategory } from '../types';
import { Upload, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { storage } from '@/core/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface FinanceDocumentUploaderProps {
  onUpload: (category: DocumentCategory, fileName: string, filePath: string) => void;
  className?: string;
}

export const FinanceDocumentUploader: React.FC<FinanceDocumentUploaderProps> = ({ onUpload, className = '' }) => {
  const [category, setCategory] = useState<DocumentCategory>('Identity Proof');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: DocumentCategory[] = [
    'Identity Proof',
    'Address Proof',
    'Income Proof',
    'Bank Statements',
    'Vehicle Documents'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    try {
      const fileName = selectedFile.name;
      const fileRef = ref(storage, `finance/docs/${Date.now()}_${fileName}`);
      
      const uploadTask = uploadBytesResumable(fileRef, selectedFile);
      
      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          null,
          (err) => reject(err),
          () => resolve()
        );
      });

      const downloadURL = await getDownloadURL(fileRef);
      onUpload(category, fileName, downloadURL);
      
      setUploaded(true);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      setTimeout(() => {
        setUploaded(false);
      }, 2000);
    } catch (err) {
      console.error("Firebase Storage upload error:", err);
      alert("Failed to upload document to Firebase Storage.");
    } finally {
      setUploading(false);
    }
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
        <label htmlFor="fileUpload" className="text-xs font-bold text-gray-500">Select Document File</label>
        <input
          id="fileUpload"
          type="file"
          ref={fileInputRef}
          required
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#EB0A1E]"
        />
      </div>

      <button
        type="submit"
        disabled={uploading || uploaded}
        className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
          uploaded 
            ? 'bg-emerald-600 text-white' 
            : uploading
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-[#EB0A1E] hover:bg-[#c90818] text-white shadow-md shadow-[#EB0A1E]/10'
        }`}
      >
        {uploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Uploading to Storage...
          </>
        ) : uploaded ? (
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
