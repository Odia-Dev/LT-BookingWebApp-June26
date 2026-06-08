export type LeadType = 'CONTACT_LEAD' | 'TEST_DRIVE' | 'BOOKING' | 'FINANCE' | 'EXCHANGE';
export type LeadSource = 'DIG' | 'WA' | 'ADS' | 'WLK' | 'REF' | 'SOC' | 'TEL' | 'EML' | 'ORG' | 'AI';
export type LeadStatus = 'NEW' | 'ASSIGNED' | 'CONTACTED' | 'CONVERTED' | 'LOST' | 'CLOSED';
export type ScoreCategory = 'HOT' | 'WARM' | 'COLD';

export interface LeadTimelineEvent {
  action: string;
  timestamp: string;
  operator: string;
  notes?: string;
}

export interface Lead {
  leadId: string;
  name: string;
  phone: string;
  email: string;
  leadType: LeadType;
  leadSource: LeadSource;
  status: LeadStatus;
  score: number;
  scoreCategory: ScoreCategory;
  branchCode: string;
  owner: string | null;
  createdAt: string;
  slaDeadline: string;
  timeline: LeadTimelineEvent[];
}

export interface LeadAssignment {
  assignmentId: string;
  leadId: string;
  branchCode: string;
  assignedTo: string | null;
  slaMinutes: number;
  assignedAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'BREACHED';
}

// Pre-seeded database leads representing various lifecycle stages
export let MOCK_LEADS: Lead[] = [
  {
    leadId: 'LD-202606-001',
    name: 'Sudhanshu Sekhar',
    phone: '9437011223',
    email: 'sudhanshu@gmail.com',
    leadType: 'TEST_DRIVE',
    leadSource: 'ORG',
    status: 'NEW',
    score: 85,
    scoreCategory: 'HOT',
    branchCode: 'BAM',
    owner: null,
    createdAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(), // Created 3 minutes ago
    slaDeadline: new Date(Date.now() + 2 * 60 * 1000).toISOString(), // 5 min SLA -> 2 min remaining
    timeline: [
      { action: 'LEAD_CREATED', timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(), operator: 'SYSTEM', notes: 'Created from Web Inquiry Form.' }
    ]
  },
  {
    leadId: 'LD-202606-002',
    name: 'Priyalata Mishra',
    phone: '9861054321',
    email: 'priya.mishra@yahoo.com',
    leadType: 'FINANCE',
    leadSource: 'WA',
    status: 'ASSIGNED',
    score: 65,
    scoreCategory: 'WARM',
    branchCode: 'JEY',
    owner: 'Ranjan Senapati',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 mins ago
    slaDeadline: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 30 min SLA -> 5 min remaining
    timeline: [
      { action: 'LEAD_CREATED', timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(), operator: 'SYSTEM' },
      { action: 'LEAD_ASSIGNED', timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(), operator: 'BAM_DESK', notes: 'Assigned to Sales Manager.' }
    ]
  },
  {
    leadId: 'LD-202606-003',
    name: 'Jyotiranjan Mohanty',
    phone: '9438099001',
    email: 'jyoti.mohanty@outlook.com',
    leadType: 'EXCHANGE',
    leadSource: 'ADS',
    status: 'CONTACTED',
    score: 35,
    scoreCategory: 'COLD',
    branchCode: 'RAY',
    owner: 'Swati Panigrahi',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(), // 4 hours ago
    slaDeadline: new Date(Date.now() + 20 * 3600 * 1000).toISOString(), // 24 hour SLA
    timeline: [
      { action: 'LEAD_CREATED', timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(), operator: 'SYSTEM' },
      { action: 'LEAD_ASSIGNED', timestamp: new Date(Date.now() - 3.8 * 3600 * 1000).toISOString(), operator: 'SYSTEM' },
      { action: 'LEAD_CONTACTED', timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), operator: 'Swati Panigrahi', notes: 'Called customer, shared details.' }
    ]
  },
  {
    leadId: 'LD-202606-004',
    name: 'Debashis Pradhan',
    phone: '9937088990',
    email: 'debashis.pradhan@gmail.com',
    leadType: 'BOOKING',
    leadSource: 'DIG',
    status: 'NEW',
    score: 95,
    scoreCategory: 'HOT',
    branchCode: 'BHA',
    owner: null,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 mins ago -> SLA Breached! (5 min SLA limit)
    slaDeadline: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    timeline: [
      { action: 'LEAD_CREATED', timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), operator: 'SYSTEM' }
    ]
  }
];

export class CRMService {
  static getAllLeads(): Lead[] {
    return MOCK_LEADS;
  }

  static getLeadById(id: string): Lead | undefined {
    return MOCK_LEADS.find(l => l.leadId === id);
  }

  // Calculate Lead Score & category based on parameters
  static calculateLeadScore(type: LeadType, financeIntent: boolean, exchangeIntent: boolean): { score: number; category: ScoreCategory } {
    let score = 30; // base score

    if (type === 'BOOKING') score += 50;
    else if (type === 'TEST_DRIVE') score += 30;
    else if (type === 'FINANCE') score += 20;
    else if (type === 'EXCHANGE') score += 15;

    if (financeIntent) score += 10;
    if (exchangeIntent) score += 10;

    score = Math.min(score, 100);
    
    let category: ScoreCategory = 'COLD';
    if (score >= 75) category = 'HOT';
    else if (score >= 40) category = 'WARM';

    return { score, category };
  }

  // Create & route a new Lead
  static createLead(data: {
    name: string;
    phone: string;
    email: string;
    leadType: LeadType;
    leadSource: LeadSource;
    branchCode: string;
    financeIntent?: boolean;
    exchangeIntent?: boolean;
  }): Lead {
    const { score, category } = this.calculateLeadScore(data.leadType, !!data.financeIntent, !!data.exchangeIntent);
    
    // SLA minutes based on scoring
    let slaMins = 24 * 60; // 24 hours for COLD
    if (category === 'HOT') slaMins = 5;
    else if (category === 'WARM') slaMins = 30;

    const now = new Date();
    const deadline = new Date(now.getTime() + slaMins * 60 * 1000);

    const newLead: Lead = {
      leadId: `LD-202606-00${MOCK_LEADS.length + 1}`,
      name: data.name,
      phone: data.phone,
      email: data.email,
      leadType: data.leadType,
      leadSource: data.leadSource,
      status: 'NEW',
      score,
      scoreCategory: category,
      branchCode: data.branchCode,
      owner: null,
      createdAt: now.toISOString(),
      slaDeadline: deadline.toISOString(),
      timeline: [
        { action: 'LEAD_CREATED', timestamp: now.toISOString(), operator: 'SYSTEM', notes: 'Captured from online form.' }
      ]
    };

    MOCK_LEADS = [newLead, ...MOCK_LEADS];
    return newLead;
  }

  // Assign lead to a Sales Manager
  static assignLead(id: string, managerName: string, operator: string): Lead | undefined {
    const lead = MOCK_LEADS.find(l => l.leadId === id);
    if (!lead) return undefined;

    lead.status = 'ASSIGNED';
    lead.owner = managerName;
    lead.timeline.push({
      action: 'LEAD_ASSIGNED',
      timestamp: new Date().toISOString(),
      operator,
      notes: `Assigned to ${managerName}.`
    });

    return lead;
  }

  // Update lead status (e.g. contacted, converted, lost)
  static updateStatus(id: string, status: LeadStatus, operator: string, notes?: string): Lead | undefined {
    const lead = MOCK_LEADS.find(l => l.leadId === id);
    if (!lead) return undefined;

    lead.status = status;
    
    let action = 'LEAD_STATUS_CHANGED';
    if (status === 'CONTACTED') action = 'LEAD_CONTACTED';
    else if (status === 'CONVERTED') action = 'LEAD_CONVERTED';
    else if (status === 'LOST') action = 'LEAD_LOST';
    else if (status === 'CLOSED') action = 'LEAD_CLOSED';

    lead.timeline.push({
      action,
      timestamp: new Date().toISOString(),
      operator,
      notes
    });

    return lead;
  }
}
export { default as LeadQueueDashboard } from '../../../app/(protected)/admin/leads/LeadQueueDashboard';
