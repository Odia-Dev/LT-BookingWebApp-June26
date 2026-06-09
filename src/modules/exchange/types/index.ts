import { BaseEntity } from "@/shared/types";

export type ExchangeStatus =
  | 'INITIATED'
  | 'APPRAISAL_PENDING'
  | 'UNDER_REVIEW'
  | 'VALUATION_COMPLETED'
  | 'OFFER_SHARED'
  | 'OFFER_ACCEPTED'
  | 'OFFER_REJECTED'
  | 'COMPLETED';

export interface VehicleExchangeDetails {
  registrationNumber: string;
  brand: string;
  model: string;
  year: number;
  kilometersDriven: number;
  ownershipType: 'First Owner' | 'Second Owner' | 'Third Owner' | 'Other';
}

export interface ExchangeTimelineEvent {
  action: string;
  timestamp: string;
  operator: string;
  notes?: string;
}

export interface ExchangeLead extends BaseEntity {
  id: string;
  exchangeLeadId: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  vehicleDetails: VehicleExchangeDetails;
  photos: string[];
  status: ExchangeStatus;
  assignedOfficerId?: string;
  valuationAmount?: number;
  offeredAmount?: number;
  timeline: ExchangeTimelineEvent[];
  notes?: string;
}
