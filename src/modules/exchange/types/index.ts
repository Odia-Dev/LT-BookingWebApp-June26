import { BaseEntity } from "@/shared/types";

export interface ExchangeModuleState extends BaseEntity {
  id: string;
  status: string;
}
