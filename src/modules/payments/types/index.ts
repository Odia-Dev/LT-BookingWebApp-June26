import { BaseEntity } from "@/shared/types";

export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

export type PaymentType = 'Booking Deposit' | 'Full Payment' | 'Balance Payment' | 'Refund';

export interface PaymentTimelineEvent {
  action: string;
  timestamp: string;
  operator: string;
  notes?: string;
}

export interface Payment extends BaseEntity {
  id: string;
  paymentId: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
  gateway: 'Razorpay' | 'Mock';
  gatewayOrderId?: string;
  gatewayPaymentId?: string;
  gatewaySignature?: string;
  refundNotes?: string;
  timeline: PaymentTimelineEvent[];
}
