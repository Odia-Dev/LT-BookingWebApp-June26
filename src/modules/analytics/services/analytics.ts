import { BaseEntity } from "@/shared/types";

export interface AnalyticsEventPayload extends BaseEntity {
  eventName: string;
  customerId?: string;
  source: string;
  medium?: string;
  campaign?: string;
  metadata?: Record<string, any>;
}

export const trackEvent = async (event: AnalyticsEventPayload) => {
  console.log("Analytics Event Tracked:", event.eventName, event);
};
