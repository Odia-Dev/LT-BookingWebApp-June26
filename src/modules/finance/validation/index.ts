import { FinanceLeadStatus, DocumentCategory } from '../types';

/**
 * Validates finance application fields.
 */
export const validateFinanceInput = (input: {
  monthlyIncome: number;
  employerName: string;
  loanAmountRequested: number;
  loanTenureYears: number;
}): boolean => {
  if (input.monthlyIncome <= 0) return false;
  if (!input.employerName || input.employerName.trim() === '') return false;
  if (input.loanAmountRequested <= 0) return false;
  if (input.loanTenureYears <= 0 || input.loanTenureYears > 7) return false; // Max tenure is usually 7 years
  return true;
};

/**
 * Governs state transitions for finance application status.
 */
export const validateFinanceStatusTransition = (current: FinanceLeadStatus, next: FinanceLeadStatus): boolean => {
  if (current === next) return true;

  // Terminal states cannot transition further
  if (current === 'APPROVED' || current === 'REJECTED' || current === 'DISBURSED') {
    // Approved can go to Disbursed
    if (current === 'APPROVED' && next === 'DISBURSED') return true;
    return false;
  }

  const transitions: Record<FinanceLeadStatus, FinanceLeadStatus[]> = {
    'INITIATED': ['DOCUMENT_PENDING', 'UNDER_REVIEW', 'REJECTED'],
    'DOCUMENT_PENDING': ['UNDER_REVIEW', 'REJECTED'],
    'UNDER_REVIEW': ['BANK_PROCESSING', 'APPROVED', 'REJECTED'],
    'BANK_PROCESSING': ['APPROVED', 'REJECTED'],
    'APPROVED': ['DISBURSED'],
    'REJECTED': [],
    'DISBURSED': []
  };

  const allowed = transitions[current];
  return allowed ? allowed.includes(next) : false;
};

export const validateModuleInput = (input: any): boolean => {
  if (!input) return false;
  if (input.monthlyIncome !== undefined) {
    return validateFinanceInput(input);
  }
  return true;
};
