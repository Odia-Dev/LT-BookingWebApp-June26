import { BaseEntity } from "@/shared/types";

export interface PaymentsModuleState extends BaseEntity {
  id: string;
  status: string;
}
