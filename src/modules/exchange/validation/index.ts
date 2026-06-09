import { ExchangeStatus, VehicleExchangeDetails } from "../types";

/**
 * Validates registration info and basic parameters of pre-owned vehicle
 */
export const validateExchangeInput = (details: Partial<VehicleExchangeDetails>): boolean => {
  if (!details) return false;

  const { registrationNumber, brand, model, year, kilometersDriven, ownershipType } = details;

  if (!registrationNumber || registrationNumber.trim().length < 5) return false;
  if (!brand || brand.trim().length < 2) return false;
  if (!model || model.trim().length < 1) return false;

  const currentYear = new Date().getFullYear();
  if (!year || year < 1990 || year > currentYear + 1) return false;
  if (kilometersDriven === undefined || kilometersDriven < 0) return false;
  if (!ownershipType) return false;

  return true;
};

/**
 * Strict status transition rules matrix for pre-owned evaluation workflow
 */
export const validateExchangeStatusTransition = (
  currentStatus: ExchangeStatus,
  nextStatus: ExchangeStatus
): boolean => {
  if (currentStatus === nextStatus) return true;

  // Terminal states cannot be changed
  if (currentStatus === 'OFFER_ACCEPTED' || currentStatus === 'OFFER_REJECTED' || currentStatus === 'COMPLETED') {
    return false;
  }

  const allowedTransitions: Record<ExchangeStatus, ExchangeStatus[]> = {
    INITIATED: ['APPRAISAL_PENDING', 'UNDER_REVIEW', 'OFFER_REJECTED'],
    APPRAISAL_PENDING: ['UNDER_REVIEW', 'OFFER_REJECTED'],
    UNDER_REVIEW: ['VALUATION_COMPLETED', 'OFFER_REJECTED'],
    VALUATION_COMPLETED: ['OFFER_SHARED', 'OFFER_REJECTED'],
    OFFER_SHARED: ['OFFER_ACCEPTED', 'OFFER_REJECTED'],
    OFFER_ACCEPTED: ['COMPLETED'],
    OFFER_REJECTED: [],
    COMPLETED: []
  };

  return (allowedTransitions[currentStatus] || []).includes(nextStatus);
};
