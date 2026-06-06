import { BaseEntity } from "./common";
export type BookingStatus =
  | "INITIATED"
  | "QUALIFICATION_PENDING"
  | "QUALIFICATION_COMPLETED"
  | "OTP_PENDING"
  | "OTP_VERIFIED"
  | "PAYMENT_PENDING"
  | "BOOKING_CONFIRMED"
  | "FINANCE_PENDING"
  | "FINANCE_IN_PROGRESS"
  | "EXCHANGE_IN_PROGRESS"
  | "DELIVERY_PENDING"
  | "DELIVERED"
  | "CANCELLED";

export interface Booking extends BaseEntity {
  id: string;
  bookingId: string;
  customerId: string;
  vehicleId: string;
  variantId: string;
  branchId: string;
  bookingStatus: BookingStatus;
  paymentStatus: string;
  bookingAmount: number;
}
