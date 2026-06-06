import { BaseEntity } from "@/shared/types";

export interface AdminModuleState extends BaseEntity {
  id: string;
  status: string;
}
