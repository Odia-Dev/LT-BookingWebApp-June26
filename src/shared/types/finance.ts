import { BaseEntity } from "./common";
export interface FinanceLead extends BaseEntity {
  id: string;
  bookingId: string;
  customerId: string;
  monthlyIncome: number;
  financeStatus: "PENDING" | "APPROVED" | "REJECTED";
}
