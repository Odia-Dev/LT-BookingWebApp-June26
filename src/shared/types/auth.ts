import { AccountStatus } from "./common";
export interface CustomerAuthProfile {
  uid: string;
  customerId: string;
  provider: "MOBILE_OTP" | "EMAIL_PASSWORD";
  mobile: string;
  email: string;
  linkedProviders: string[];
  mobileVerified: boolean;
  emailVerified: boolean;
  accountStatus: AccountStatus;
  lastLoginAt: string;
  lastLoginIp: string;
}
