export type BookingStatus = 
  | 'INITIATED'
  | 'QUALIFICATION_PENDING'
  | 'QUALIFICATION_COMPLETED'
  | 'OTP_PENDING'
  | 'OTP_VERIFIED'
  | 'PAYMENT_PENDING'
  | 'PAYMENT_RECEIVED'
  | 'BOOKING_CONFIRMED'
  | 'FINANCE_PENDING'
  | 'FINANCE_IN_PROGRESS'
  | 'EXCHANGE_IN_PROGRESS'
  | 'DELIVERY_PENDING'
  | 'DELIVERED'
  | 'CANCELLED';

export interface BookingTimelineEvent {
  action: string;
  timestamp: string;
  operator: string;
  notes?: string;
}

export interface Booking {
  bookingId: string;
  customerId: string;
  customerName: string;
  phone: string;
  email: string;
  vehicleId: string;
  vehicleName: string;
  variant: string;
  color?: string;
  branchCode: string;
  sourceCode: string;
  status: BookingStatus;
  financeIntent: boolean;
  exchangeIntent: boolean;
  createdAt: string;
  updatedAt: string;
  timeline: BookingTimelineEvent[];
}
