import React, { useState } from 'react';
import { AnalyticsFilterState, DateRangeFilter, GeneratedReport, ReportDataRow } from '../types';
import { Calendar, Building, Car, Target, TrendingUp, BarChart3, Users, DollarSign, Award, Percent, Printer, FileDown, ShieldAlert, Sparkles } from 'lucide-react';

interface AnalyticsDashboardProps {
  userRole: 'SUPER_ADMIN' | 'BRANCH_MANAGER' | 'SALES_MANAGER' | 'FINANCE_MANAGER';
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ userRole }) => {
  // 1. Filtering State
  const [filters, setFilters] = useState<AnalyticsFilterState>({
    dateRange: 'THIS_MONTH',
    branchCode: 'ALL',
    vehicleSlug: 'ALL',
    leadSource: 'ALL',
    status: 'ALL'
  });

  // 2. Sub-Dashboard Profile selection
  // Default depending on role permissions
  const initialProfile = 
    userRole === 'FINANCE_MANAGER' ? 'FINANCE' : 
    userRole === 'SALES_MANAGER' ? 'SALES' : 'EXECUTIVE';
  const [activeProfile, setActiveProfile] = useState<'EXECUTIVE' | 'SALES' | 'FINANCE' | 'EXCHANGE' | 'BRANCH' | 'MARKETING'>(initialProfile);

  // 3. Reports State
  const [reportType, setReportType] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'BRANCH' | 'SALES' | 'FINANCE' | 'EXCHANGE'>('MONTHLY');
  const [generatedReport, setGeneratedReport] = useState<GeneratedReport | null>(null);
  const [generating, setGenerating] = useState(false);

  // 4. Role Authorization Matrix
  const allowedProfiles = {
    SUPER_ADMIN: ['EXECUTIVE', 'SALES', 'FINANCE', 'EXCHANGE', 'BRANCH', 'MARKETING'],
    BRANCH_MANAGER: ['EXECUTIVE', 'SALES', 'FINANCE', 'EXCHANGE', 'BRANCH', 'MARKETING'],
    SALES_MANAGER: ['SALES', 'EXCHANGE'],
    FINANCE_MANAGER: ['FINANCE']
  };

  const isProfileAllowed = (profile: string) => {
    return (allowedProfiles[userRole] || []).includes(profile);
  };

  // Helper to adjust mock values based on filters to simulate reactivity
  const getFactor = () => {
    let factor = 1.0;
    if (filters.dateRange === 'TODAY') factor *= 0.15;
    else if (filters.dateRange === 'THIS_WEEK') factor *= 0.45;
    else if (filters.dateRange === 'Q2_FY26') factor *= 2.8;

    if (filters.branchCode !== 'ALL') factor *= 0.45;
    if (filters.vehicleSlug !== 'ALL') factor *= 0.25;
    if (filters.leadSource !== 'ALL') factor *= 0.35;
    return factor;
  };

  const f = getFactor();

  // Simulated live KPIs
  const leadsCount = Math.round(342 * f);
  const bookingsCount = Math.round(47 * f);
  const revenueTotal = Math.round(14850000 * f);
  const conversionRate = filters.vehicleSlug === 'fortuner' ? 11.2 : filters.branchCode === 'BAM' ? 15.4 : 13.8;
  const financeRate = filters.branchCode === 'ASK' ? 79 : 84;
  const exchangeRate = filters.leadSource === 'REFERRAL' ? 76 : 71;

  // 5. Mock Report Generator
  const handleGenerateReport = () => {
    setGenerating(true);
    setTimeout(() => {
      const reportId = `REP-${Date.now().toString().substring(6)}`;
      const nowStr = new Date().toISOString();
      
      const rows: ReportDataRow[] = [
        { date: '2026-06-01', metricLabel: 'Used Vehicle Appraisals', branch: 'Brahmapur H.O.', volume: Math.round(8 * f), valueAmount: Math.round(3200000 * f), status: 'VERIFIED' },
        { date: '2026-06-03', metricLabel: 'Qualified Finance Inquiries', branch: 'Brahmapur H.O.', volume: Math.round(14 * f), valueAmount: Math.round(9800000 * f), status: 'COMPLETED' },
        { date: '2026-06-04', metricLabel: 'New Bookings Completed', branch: 'Aska Outlet', volume: Math.round(9 * f), valueAmount: Math.round(1800000 * f), status: 'DISBURSED' },
        { date: '2026-06-06', metricLabel: 'Customer Exchange Payouts', branch: 'Bhanjanagar Outlet', volume: Math.round(5 * f), valueAmount: Math.round(1500000 * f), status: 'COMPLETED' }
      ];

      setGeneratedReport({
        reportId,
        reportType,
        generatedAt: nowStr,
        operatorName: 'System Desk Appraiser',
        parameters: filters,
        summary: {
          totalVolume: rows.reduce((acc, curr) => acc + curr.volume, 0),
          totalRevenue: rows.reduce((acc, curr) => acc + (curr.valueAmount || 0), 0),
          conversionRate: Math.round(conversionRate)
        },
        rows
      });
      setGenerating(false);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      {/* 1. Global Filter Panel */}
      <div className="bg-white p-5 border border-gray-150 rounded-2xl shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 flex-wrap gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Target className="h-4 w-4 text-gray-400" /> Filter Desk Parameters
          </span>
          <span className="text-[10px] bg-red-50 text-[#EB0A1E] font-bold px-2 py-0.5 rounded border border-red-100 flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Live Data Sync
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-gray-400">Date Range</span>
            <select
              value={filters.dateRange}
              onChange={e => setFilters({ ...filters, dateRange: e.target.value as DateRangeFilter })}
              className="border border-gray-200 rounded-lg p-2.5 bg-white font-semibold text-gray-750 focus:outline-none focus:border-[#EB0A1E]"
            >
              <option value="TODAY">Today</option>
              <option value="THIS_WEEK">This Week</option>
              <option value="THIS_MONTH">This Month</option>
              <option value="Q2_FY26">Q2 Fiscal Year (FY26)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-bold text-gray-400">Branch Location</span>
            <select
              value={filters.branchCode}
              onChange={e => setFilters({ ...filters, branchCode: e.target.value })}
              className="border border-gray-200 rounded-lg p-2.5 bg-white font-semibold text-gray-750 focus:outline-none focus:border-[#EB0A1E]"
            >
              <option value="ALL">All Branches</option>
              <option value="BAM">Brahmapur H.O.</option>
              <option value="ASK">Aska Branch</option>
              <option value="BHA">Bhanjanagar Outlet</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-bold text-gray-400">Target Vehicle</span>
            <select
              value={filters.vehicleSlug}
              onChange={e => setFilters({ ...filters, vehicleSlug: e.target.value })}
              className="border border-gray-200 rounded-lg p-2.5 bg-white font-semibold text-gray-750 focus:outline-none focus:border-[#EB0A1E]"
            >
              <option value="ALL">All Models</option>
              <option value="glanza">Toyota Glanza</option>
              <option value="taisor">Toyota Taisor</option>
              <option value="hyryder">Urban Cruiser Hyryder</option>
              <option value="hycross">Innova Hycross</option>
              <option value="fortuner">Toyota Fortuner</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-bold text-gray-400">Lead Source</span>
            <select
              value={filters.leadSource}
              onChange={e => setFilters({ ...filters, leadSource: e.target.value })}
              className="border border-gray-200 rounded-lg p-2.5 bg-white font-semibold text-gray-750 focus:outline-none focus:border-[#EB0A1E]"
            >
              <option value="ALL">All Sources</option>
              <option value="DIG">Digital Portal (DIG)</option>
              <option value="WALK-IN">Walk-In Showroom</option>
              <option value="REFERRAL">Partner Referral</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-bold text-gray-400">Workflow Status</span>
            <select
              value={filters.status}
              onChange={e => setFilters({ ...filters, status: e.target.value })}
              className="border border-gray-200 rounded-lg p-2.5 bg-white font-semibold text-gray-750 focus:outline-none focus:border-[#EB0A1E]"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active Pipeline</option>
              <option value="COMPLETED">Completed/Settled</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Sub-Dashboard Profile Tabs */}
      <div className="flex border border-gray-150 rounded-2xl p-1.5 bg-white shadow-sm overflow-x-auto gap-1">
        {[
          { id: 'EXECUTIVE', label: 'Executive' },
          { id: 'SALES', label: 'Sales Desk' },
          { id: 'FINANCE', label: 'Finance Applications' },
          { id: 'EXCHANGE', label: 'Exchange Appraisals' },
          { id: 'BRANCH', label: 'Branch Comparison' },
          { id: 'MARKETING', label: 'Campaign/Marketing' }
        ].map(profile => {
          const isAllowed = isProfileAllowed(profile.id);
          const isAct = activeProfile === profile.id;

          return (
            <button
              key={profile.id}
              disabled={!isAllowed}
              onClick={() => setActiveProfile(profile.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                isAct
                  ? 'bg-gray-900 text-white shadow-md'
                  : isAllowed
                  ? 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                  : 'text-gray-300 cursor-not-allowed opacity-50'
              }`}
            >
              {profile.label}
              {!isAllowed && <ShieldAlert className="h-3 w-3 text-gray-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* 3. Metrics KPI Trend Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 border border-gray-150 rounded-2xl shadow-sm flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="h-4 w-4 text-blue-500" /> Lead volume
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">{leadsCount}</span>
          <span className="text-[10px] text-emerald-600 font-bold">+18.4% vs last period</span>
        </div>

        <div className="bg-white p-5 border border-gray-150 rounded-2xl shadow-sm flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Car className="h-4 w-4 text-[#EB0A1E]" /> Booking conversion
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">{conversionRate}%</span>
          <span className="text-[10px] text-emerald-600 font-bold">+1.2% benchmark standard</span>
        </div>

        <div className="bg-white p-5 border border-gray-150 rounded-2xl shadow-sm flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Percent className="h-4 w-4 text-emerald-500" /> Loan Approvals
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">{financeRate}%</span>
          <span className="text-[10px] text-emerald-600 font-bold">2.4 days average velocity</span>
        </div>

        <div className="bg-white p-5 border border-gray-150 rounded-2xl shadow-sm flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="h-4 w-4 text-amber-500" /> Revenue Total
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">₹{(revenueTotal).toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-emerald-600 font-bold">On track for Q2 target</span>
        </div>
      </div>

      {/* 4. Visualizations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Line Chart / Trend chart (CSS flex) */}
        <div className="lg:col-span-2 bg-white border border-gray-150 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Weekly Leads Trend</span>
          
          <div className="h-[200px] flex items-end gap-3 justify-between border-b border-l border-gray-150 pb-2 pl-2">
            {[
              { week: 'Week 1', val: Math.round(62 * f) },
              { week: 'Week 2', val: Math.round(98 * f) },
              { week: 'Week 3', val: Math.round(124 * f) },
              { week: 'Week 4', val: Math.round(158 * f) }
            ].map(w => {
              const maxVal = Math.round(180 * f) || 1;
              const pct = (w.val / maxVal) * 100;
              return (
                <div key={w.week} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[9px] font-bold text-gray-600">{w.val}</span>
                  <div 
                    className="w-full bg-[#EB0A1E]/80 rounded-t transition-all hover:bg-[#EB0A1E] flex items-center justify-center text-[8px] text-white font-bold"
                    style={{ height: `${Math.max(pct * 1.5, 10)}px` }}
                  />
                  <span className="text-[9px] text-gray-400 font-semibold">{w.week}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Source Distribution donut/bar chart */}
        <div className="lg:col-span-1 bg-white border border-gray-150 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Lead Source Share</span>
          
          <div className="space-y-4 text-xs font-semibold">
            {[
              { source: 'Digital Portal (DIG)', pct: 54, color: 'bg-[#EB0A1E]' },
              { source: 'Walk-In Showroom', pct: 32, color: 'bg-gray-800' },
              { source: 'Referral Partner', pct: 14, color: 'bg-emerald-600' }
            ].map(s => (
              <div key={s.source} className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between items-center font-bold text-gray-800">
                  <span>{s.source}</span>
                  <span>{s.pct}%</span>
                </div>
                <div className="w-full h-2 rounded bg-gray-100 overflow-hidden">
                  <div className={`h-full ${s.color} rounded`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. Report Generator Desk */}
      <div className="bg-white p-5 border border-gray-150 rounded-2xl shadow-sm flex flex-col gap-5">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <BarChart3 className="h-4 w-4 text-gray-400" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Report Generator Desk</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-end text-xs">
          <div className="flex flex-col gap-1.5">
            <span className="font-bold text-gray-500">Report Category Choice</span>
            <select
              value={reportType}
              onChange={e => setReportType(e.target.value as any)}
              className="border border-gray-200 rounded-lg p-2 text-xs focus:outline-none focus:border-[#EB0A1E] bg-white font-semibold text-gray-750"
            >
              <option value="DAILY">Daily Overview</option>
              <option value="WEEKLY">Weekly Performance</option>
              <option value="MONTHLY">Monthly Operations</option>
              <option value="BRANCH">Branch Performance</option>
              <option value="SALES">Sales Conversion</option>
              <option value="FINANCE">Finance Approvals</option>
              <option value="EXCHANGE">Used Car Exchange</option>
            </select>
          </div>

          <button
            onClick={handleGenerateReport}
            disabled={generating}
            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            {generating ? 'Generating compilation...' : 'Generate Operational Report'}
          </button>
        </div>

        {/* Generated report preview table */}
        {generatedReport && (
          <div className="border border-gray-150 rounded-2xl overflow-hidden mt-2 flex flex-col">
            <div className="p-4 bg-gray-50 border-b border-gray-150 flex justify-between items-center flex-wrap gap-4 text-xs">
              <div className="text-left">
                <span className="font-extrabold text-gray-900">{generatedReport.reportType} REPORT - {generatedReport.reportId}</span>
                <p className="text-[10px] text-gray-400 font-mono mt-0.5">Compiled at: {new Date(generatedReport.generatedAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 border border-gray-200 hover:bg-gray-100 text-gray-650 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" /> Print
                </button>
                <button
                  onClick={() => alert(`Report ${generatedReport.reportId} downloaded as CSV.`)}
                  className="px-3 py-1.5 border border-gray-200 hover:bg-gray-100 text-gray-650 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <FileDown className="h-3.5 w-3.5" /> Download CSV
                </button>
              </div>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left divide-y divide-gray-100">
                <thead>
                  <tr className="bg-gray-55/35 text-gray-400 font-bold">
                    <th className="p-4">Report Date</th>
                    <th className="p-4">Metrics Category</th>
                    <th className="p-4">Branch</th>
                    <th className="p-4 text-center">Volume Total</th>
                    <th className="p-4 text-right">Value (₹)</th>
                    <th className="p-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                  {generatedReport.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-55/40">
                      <td className="p-4 font-mono">{row.date}</td>
                      <td className="p-4 text-gray-900 font-extrabold">{row.metricLabel}</td>
                      <td className="p-4">{row.branch}</td>
                      <td className="p-4 text-center">{row.volume}</td>
                      <td className="p-4 text-right text-gray-900">{row.valueAmount ? `₹${row.valueAmount.toLocaleString('en-IN')}` : '-'}</td>
                      <td className="p-4 text-center">
                        <span className="text-[8px] font-bold uppercase bg-gray-100 border border-gray-200 px-2 py-0.5 rounded text-gray-500">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs font-bold text-gray-600">
              <span>Rows Compiled: {generatedReport.rows.length}</span>
              <span>Total Volume: {generatedReport.summary.totalVolume} units | Gross: ₹{generatedReport.summary.totalRevenue.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
