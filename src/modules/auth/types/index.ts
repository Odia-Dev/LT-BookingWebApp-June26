import { BaseEntity } from "@/shared/types";

export interface AuthModuleState extends BaseEntity {
  id: string;
  status: string;
}
