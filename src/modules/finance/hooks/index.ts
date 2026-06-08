import { useState, useCallback } from 'react';
import { FinanceService } from '../services';
import { FinanceLead, FinanceLeadStatus, DocumentCategory } from '../types';

export const useFinance = (customerId?: string) => {
  const [financeLeads, setFinanceLeads] = useState<FinanceLead[]>(() => {
    return customerId
      ? FinanceService.getFinanceLeadsByCustomerId(customerId)
      : FinanceService.getAllFinanceLeads();
  });

  const refreshFinance = useCallback(() => {
    setFinanceLeads(
      customerId
        ? [...FinanceService.getFinanceLeadsByCustomerId(customerId)]
        : [...FinanceService.getAllFinanceLeads()]
    );
  }, [customerId]);

  const startFinanceApplication = useCallback((bookingId: string, customerId: string, customerName: string) => {
    const lead = FinanceService.startFinanceApplication(bookingId, customerId, customerName);
    refreshFinance();
    return lead;
  }, [refreshFinance]);

  const submitFinanceDetails = useCallback((
    leadId: string,
    details: {
      monthlyIncome: number;
      employerName: string;
      employmentType: 'Salaried' | 'Self-Employed' | 'Business' | 'Other';
      loanAmountRequested: number;
      loanTenureYears: number;
    }
  ) => {
    const lead = FinanceService.submitFinanceDetails(leadId, details);
    refreshFinance();
    return lead;
  }, [refreshFinance]);

  const uploadFinanceDocument = useCallback((
    leadId: string,
    category: DocumentCategory,
    fileName: string,
    filePath: string
  ) => {
    const lead = FinanceService.uploadFinanceDocument(leadId, category, fileName, filePath);
    refreshFinance();
    return lead;
  }, [refreshFinance]);

  const updateFinanceStatus = useCallback((leadId: string, status: FinanceLeadStatus, operatorName: string, notes?: string) => {
    const lead = FinanceService.updateFinanceStatus(leadId, status, operatorName, notes);
    refreshFinance();
    return lead;
  }, [refreshFinance]);

  const assignManager = useCallback((leadId: string, managerId: string, operatorName: string) => {
    const lead = FinanceService.assignManager(leadId, managerId, operatorName);
    refreshFinance();
    return lead;
  }, [refreshFinance]);

  return {
    financeLeads,
    startFinanceApplication,
    submitFinanceDetails,
    uploadFinanceDocument,
    updateFinanceStatus,
    assignManager,
    refreshFinance
  };
};
