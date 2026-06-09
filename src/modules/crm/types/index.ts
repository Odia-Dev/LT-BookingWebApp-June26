import { BaseEntity } from "@/shared/types";

export interface CustomerProfile extends BaseEntity {
  customerId: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  branchCode: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  verificationLevel: number;
}

export interface BranchPerformanceMetrics {
  branchCode: string;
  branchName: string;
  activeLeadsCount: number;
  completedBookingsCount: number;
  totalRevenue: number;
  exchangeConversionRate: number;
  financeApprovalRate: number;
}
