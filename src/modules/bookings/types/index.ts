import { BaseEntity } from "@/shared/types";

export interface BookingsModuleState extends BaseEntity {
  id: string;
  status: string;
}
