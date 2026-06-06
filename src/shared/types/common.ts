export interface BaseEntity {
  createdAt: string;
  updatedAt: string;
}
export type AccountStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "BLOCKED";
