import { useState, useCallback } from "react";
import { ExchangeService } from "../services";
import { ExchangeLead, ExchangeStatus, VehicleExchangeDetails } from "../types";

export const useExchange = (customerId?: string) => {
  const [exchangeLeads, setExchangeLeads] = useState<ExchangeLead[]>(() => {
    return customerId
      ? ExchangeService.getExchangeLeadsByCustomerId(customerId)
      : ExchangeService.getAllExchangeLeads();
  });

  const refreshExchange = useCallback(() => {
    setExchangeLeads(
      customerId
        ? [...ExchangeService.getExchangeLeadsByCustomerId(customerId)]
        : [...ExchangeService.getAllExchangeLeads()]
    );
  }, [customerId]);

  const startExchangeApplication = useCallback((bookingId: string, customerId: string, customerName: string) => {
    const lead = ExchangeService.startExchangeApplication(bookingId, customerId, customerName);
    refreshExchange();
    return lead;
  }, [refreshExchange]);

  const submitExchangeDetails = useCallback((leadId: string, details: VehicleExchangeDetails, photos: string[]) => {
    const lead = ExchangeService.submitExchangeDetails(leadId, details, photos);
    refreshExchange();
    return lead;
  }, [refreshExchange]);

  const updateValuation = useCallback((leadId: string, valuationAmount: number, offeredAmount: number, officerId: string) => {
    const lead = ExchangeService.updateValuation(leadId, valuationAmount, offeredAmount, officerId);
    refreshExchange();
    return lead;
  }, [refreshExchange]);

  const shareOffer = useCallback((leadId: string, operator: string) => {
    const lead = ExchangeService.shareOffer(leadId, operator);
    refreshExchange();
    return lead;
  }, [refreshExchange]);

  const acceptOrRejectOffer = useCallback((leadId: string, accept: boolean, notes?: string) => {
    const lead = ExchangeService.acceptOrRejectOffer(leadId, accept, notes);
    refreshExchange();
    return lead;
  }, [refreshExchange]);

  const assignOfficer = useCallback((leadId: string, officerId: string, operator: string) => {
    const lead = ExchangeService.assignOfficer(leadId, officerId, operator);
    refreshExchange();
    return lead;
  }, [refreshExchange]);

  const updateStatus = useCallback((leadId: string, status: ExchangeStatus, operator: string, notes?: string) => {
    const lead = ExchangeService.updateStatus(leadId, status, operator, notes);
    refreshExchange();
    return lead;
  }, [refreshExchange]);

  return {
    exchangeLeads,
    startExchangeApplication,
    submitExchangeDetails,
    updateValuation,
    shareOffer,
    acceptOrRejectOffer,
    assignOfficer,
    updateStatus,
    refreshExchange
  };
};
