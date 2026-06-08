import { BaseEntity } from "@/shared/types";

export type FinanceLeadStatus =
  | 'INITIATED'
  | 'DOCUMENT_PENDING'
  | 'UNDER_REVIEW'
  | 'BANK_PROCESSING'
  | 'APPROVED'
  | 'REJECTED'
  | 'DISBURSED';

export type DocumentCategory =
  | 'Identity Proof'
  | 'Address Proof'
  | 'Income Proof'
  | 'Bank Statements'
  | 'Vehicle Documents';

export interface FinanceDocument {
  documentId: string;
  category: DocumentCategory;
  fileName: string;
  filePath: string;
  status: 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED';
  uploadedAt: string;
}

export interface FinanceTimelineEvent {
  action: string;
  timestamp: string;
  operator: string;
  notes?: string;
}

export interface FinanceLead extends BaseEntity {
  id: string;
  financeLeadId: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  monthlyIncome: number;
  employerName: string;
  employmentType: 'Salaried' | 'Self-Employed' | 'Business' | 'Other';
  loanAmountRequested: number;
  loanTenureYears: number;
  status: FinanceLeadStatus;
  documents: FinanceDocument[];
  timeline: FinanceTimelineEvent[];
  assignedManagerId?: string;
  notes?: string;
}
