import { BaseEntity } from "./common";
export interface Customer extends BaseEntity {
  id: string;
  customerCode: string;
  name: string;
  phone: string;
  email: string;
}
