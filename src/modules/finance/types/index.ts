import { BaseEntity } from "@/shared/types";

export interface FinanceModuleState extends BaseEntity {
  id: string;
  status: string;
}
