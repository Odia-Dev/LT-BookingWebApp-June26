import { useState, useCallback } from 'react';
import { CRMService, Lead, LeadType, LeadSource, LeadStatus } from '../services';

export const useCrm = () => {
  const [leads, setLeads] = useState<Lead[]>(() => CRMService.getAllLeads());

  const refreshLeads = useCallback(() => {
    setLeads([...CRMService.getAllLeads()]);
  }, []);

  const createLead = useCallback((data: {
    name: string;
    phone: string;
    email: string;
    leadType: LeadType;
    leadSource: LeadSource;
    branchCode: string;
    financeIntent?: boolean;
    exchangeIntent?: boolean;
  }) => {
    const newLead = CRMService.createLead(data);
    refreshLeads();
    return newLead;
  }, [refreshLeads]);

  const assignLead = useCallback((leadId: string, managerName: string, operator: string) => {
    const updated = CRMService.assignLead(leadId, managerName, operator);
    refreshLeads();
    return updated;
  }, [refreshLeads]);

  const updateStatus = useCallback((leadId: string, status: LeadStatus, operator: string, notes?: string) => {
    const updated = CRMService.updateStatus(leadId, status, operator, notes);
    refreshLeads();
    return updated;
  }, [refreshLeads]);

  return {
    leads,
    createLead,
    assignLead,
    updateStatus,
    refreshLeads
  };
};
