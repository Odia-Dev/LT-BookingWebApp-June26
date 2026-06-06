import { BaseEntity } from "./common";
export interface ExchangeLead extends BaseEntity {
  id: string;
  bookingId: string;
  customerId: string;
  vehicleMake: string;
  vehicleModel: string;
  kmsDriven: number;
  exchangeStatus: "PENDING" | "VALUED" | "CLOSED";
}
