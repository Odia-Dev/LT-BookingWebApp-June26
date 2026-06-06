import { BaseEntity } from "./common";
export interface PaymentTransaction extends BaseEntity {
  id: string;
  paymentId: string;
  bookingId: string;
  customerId: string;
  amount: number;
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED";
}
