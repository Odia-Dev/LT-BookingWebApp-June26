import { BaseEntity } from "@/shared/types";

export interface CrmModuleState extends BaseEntity {
  id: string;
  status: string;
}
