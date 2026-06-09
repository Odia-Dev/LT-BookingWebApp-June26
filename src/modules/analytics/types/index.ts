export type DateRangeFilter = 'TODAY' | 'THIS_WEEK' | 'THIS_MONTH' | 'Q2_FY26';

export interface AnalyticsFilterState {
  dateRange: DateRangeFilter;
  branchCode: string; // 'ALL' | 'BAM' | 'ASK' | 'BHA'
  vehicleSlug: string; // 'ALL' | 'glanza' | 'taisor' | 'hyryder' | 'hycross' | 'fortuner'
  leadSource: string; // 'ALL' | 'DIG' | 'WALK-IN' | 'REFERRAL'
  status: string; // 'ALL' | 'ACTIVE' | 'COMPLETED'
}

export interface KpiCardMetric {
  label: string;
  value: string | number;
  trendPercentage: number;
  isPositiveTrend: boolean;
  timelineLabel: string;
}

export interface ReportDataRow {
  date: string;
  metricLabel: string;
  branch: string;
  volume: number;
  valueAmount?: number;
  status: string;
}

export interface GeneratedReport {
  reportId: string;
  reportType: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'BRANCH' | 'SALES' | 'FINANCE' | 'EXCHANGE';
  generatedAt: string;
  operatorName: string;
  parameters: Partial<AnalyticsFilterState>;
  summary: {
    totalVolume: number;
    totalRevenue: number;
    conversionRate: number;
  };
  rows: ReportDataRow[];
}
