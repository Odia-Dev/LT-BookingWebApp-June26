import { FinanceLead, FinanceLeadStatus, FinanceDocument, DocumentCategory } from '../types';
import { trackEvent } from '@/modules/analytics/services/analytics';
import { validateFinanceStatusTransition } from '../validation';

export let MOCK_FINANCE_LEADS: FinanceLead[] = [
  {
    id: 'FIN-01062026-000001',
    financeLeadId: 'FIN-01062026-000001',
    bookingId: 'LT-BAM-DIG-JUN26-000001',
    customerId: 'CUST-001',
    customerName: 'Sudhanshu Sekhar',
    monthlyIncome: 120000,
    employerName: 'TCS Ltd.',
    employmentType: 'Salaried',
    loanAmountRequested: 800000,
    loanTenureYears: 5,
    status: 'UNDER_REVIEW',
    assignedManagerId: 'MGR-BAM-01',
    documents: [
      {
        documentId: 'doc_01',
        category: 'Identity Proof',
        fileName: 'aadhaar_card.pdf',
        filePath: '/uploads/docs/aadhaar_card.pdf',
        status: 'VERIFIED',
        uploadedAt: new Date(Date.now() - 47 * 3600 * 1000).toISOString()
      },
      {
        documentId: 'doc_02',
        category: 'Income Proof',
        fileName: 'payslip_may.pdf',
        filePath: '/uploads/docs/payslip_may.pdf',
        status: 'PENDING_VERIFICATION',
        uploadedAt: new Date(Date.now() - 46 * 3600 * 1000).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 46 * 3600 * 1000).toISOString(),
    timeline: [
      { action: 'FINANCE_APPLICATION_STARTED', timestamp: new Date(Date.now() - 48.1 * 3600 * 1000).toISOString(), operator: 'SYSTEM' },
      { action: 'FINANCE_APPLICATION_SUBMITTED', timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString(), operator: 'SYSTEM' },
      { action: 'FINANCE_DOCUMENT_UPLOADED', timestamp: new Date(Date.now() - 47 * 3600 * 1000).toISOString(), operator: 'SYSTEM', notes: 'Aadhaar uploaded.' },
      { action: 'UNDER_REVIEW', timestamp: new Date(Date.now() - 46 * 3600 * 1000).toISOString(), operator: 'MGR-BAM-01', notes: 'Assigned and review started.' }
    ]
  }
];

export class FinanceService {
  static getAllFinanceLeads(): FinanceLead[] {
    return MOCK_FINANCE_LEADS;
  }

  static getFinanceLeadById(id: string): FinanceLead | undefined {
    return MOCK_FINANCE_LEADS.find(l => l.financeLeadId === id);
  }

  static getFinanceLeadsByCustomerId(customerId: string): FinanceLead[] {
    return MOCK_FINANCE_LEADS.filter(l => l.customerId === customerId);
  }

  static getFinanceLeadByBookingId(bookingId: string): FinanceLead | undefined {
    return MOCK_FINANCE_LEADS.find(l => l.bookingId === bookingId);
  }

  // Generate ID layout: FIN-DDMMYYYY-SEQUENCE
  static generateFinanceLeadId(): string {
    const now = new Date();
    const dd = now.getDate().toString().padStart(2, '0');
    const mm = (now.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = now.getFullYear().toString();
    const ddmmyyyy = `${dd}${mm}${yyyy}`;

    const sequence = (MOCK_FINANCE_LEADS.length + 1).toString().padStart(6, '0');
    return `FIN-${ddmmyyyy}-${sequence}`;
  }

  /**
   * Initialize Finance application
   */
  static startFinanceApplication(bookingId: string, customerId: string, customerName: string): FinanceLead {
    const leadId = this.generateFinanceLeadId();
    const now = new Date().toISOString();

    const newLead: FinanceLead = {
      id: leadId,
      financeLeadId: leadId,
      bookingId,
      customerId,
      customerName,
      monthlyIncome: 0,
      employerName: 'TBD',
      employmentType: 'Salaried',
      loanAmountRequested: 0,
      loanTenureYears: 5,
      status: 'INITIATED',
      documents: [],
      createdAt: now,
      updatedAt: now,
      timeline: [
        { action: 'FINANCE_APPLICATION_STARTED', timestamp: now, operator: 'SYSTEM' }
      ]
    };

    MOCK_FINANCE_LEADS = [newLead, ...MOCK_FINANCE_LEADS];

    // Analytics: FINANCE_APPLICATION_STARTED
    trackEvent({
      eventName: 'FINANCE_APPLICATION_STARTED',
      customerId,
      source: 'DIG',
      metadata: { financeLeadId: leadId, bookingId },
      createdAt: now,
      updatedAt: now
    });

    return newLead;
  }

  /**
   * Submit completed eligibility details
   */
  static submitFinanceDetails(
    leadId: string,
    details: {
      monthlyIncome: number;
      employerName: string;
      employmentType: 'Salaried' | 'Self-Employed' | 'Business' | 'Other';
      loanAmountRequested: number;
      loanTenureYears: number;
    }
  ): FinanceLead | undefined {
    const lead = MOCK_FINANCE_LEADS.find(l => l.financeLeadId === leadId);
    if (!lead) return undefined;

    const now = new Date().toISOString();
    lead.monthlyIncome = details.monthlyIncome;
    lead.employerName = details.employerName;
    lead.employmentType = details.employmentType;
    lead.loanAmountRequested = details.loanAmountRequested;
    lead.loanTenureYears = details.loanTenureYears;
    lead.status = 'DOCUMENT_PENDING';
    lead.updatedAt = now;
    lead.timeline.push({
      action: 'FINANCE_APPLICATION_SUBMITTED',
      timestamp: now,
      operator: 'SYSTEM',
      notes: `Income details submitted. Requiring document uploads.`
    });

    // Analytics: FINANCE_APPLICATION_SUBMITTED
    trackEvent({
      eventName: 'FINANCE_APPLICATION_SUBMITTED',
      customerId: lead.customerId,
      source: 'DIG',
      metadata: { financeLeadId: leadId, loanAmountRequested: details.loanAmountRequested },
      createdAt: now,
      updatedAt: now
    });

    return lead;
  }

  /**
   * Upload Finance Document
   */
  static uploadFinanceDocument(
    leadId: string,
    category: DocumentCategory,
    fileName: string,
    filePath: string
  ): FinanceLead | undefined {
    const lead = MOCK_FINANCE_LEADS.find(l => l.financeLeadId === leadId);
    if (!lead) return undefined;

    const now = new Date().toISOString();
    const docId = `doc_${Math.random().toString(36).substring(2, 9)}`;

    const newDoc: FinanceDocument = {
      documentId: docId,
      category,
      fileName,
      filePath,
      status: 'PENDING_VERIFICATION',
      uploadedAt: now
    };

    lead.documents.push(newDoc);
    lead.status = 'UNDER_REVIEW'; // Automatically shift status to under review when docs upload
    lead.updatedAt = now;
    lead.timeline.push({
      action: 'FINANCE_DOCUMENT_UPLOADED',
      timestamp: now,
      operator: 'SYSTEM',
      notes: `Document uploaded under category ${category}: ${fileName}`
    });

    // Analytics: FINANCE_DOCUMENT_UPLOADED
    trackEvent({
      eventName: 'FINANCE_DOCUMENT_UPLOADED',
      customerId: lead.customerId,
      source: 'DIG',
      metadata: { financeLeadId: leadId, documentId: docId, category },
      createdAt: now,
      updatedAt: now
    });

    return lead;
  }

  /**
   * Update status of finance lead (Manager or Bank approval flow)
   */
  static updateFinanceStatus(leadId: string, status: FinanceLeadStatus, operatorName: string, notes?: string): FinanceLead | undefined {
    const lead = MOCK_FINANCE_LEADS.find(l => l.financeLeadId === leadId);
    if (!lead) return undefined;

    const oldStatus = lead.status;
    if (validateFinanceStatusTransition(oldStatus, status)) {
      const now = new Date().toISOString();
      lead.status = status;
      lead.updatedAt = now;
      lead.timeline.push({
        action: status,
        timestamp: now,
        operator: operatorName,
        notes
      });

      // Analytics Triggers:
      if (status === 'APPROVED' && oldStatus !== 'APPROVED') {
        trackEvent({
          eventName: 'FINANCE_APPROVED',
          customerId: lead.customerId,
          source: 'DIG',
          metadata: { financeLeadId: leadId, loanAmount: lead.loanAmountRequested },
          createdAt: now,
          updatedAt: now
        });
      } else if (status === 'REJECTED' && oldStatus !== 'REJECTED') {
        trackEvent({
          eventName: 'FINANCE_REJECTED',
          customerId: lead.customerId,
          source: 'DIG',
          metadata: { financeLeadId: leadId },
          createdAt: now,
          updatedAt: now
        });
      } else if (status === 'DISBURSED' && oldStatus !== 'DISBURSED') {
        trackEvent({
          eventName: 'FINANCE_DISBURSED',
          customerId: lead.customerId,
          source: 'DIG',
          metadata: { financeLeadId: leadId, loanAmount: lead.loanAmountRequested },
          createdAt: now,
          updatedAt: now
        });
      }
    }

    return lead;
  }

  /**
   * Assign a finance lead to a manager
   */
  static assignManager(leadId: string, managerId: string, operatorName: string): FinanceLead | undefined {
    const lead = MOCK_FINANCE_LEADS.find(l => l.financeLeadId === leadId);
    if (!lead) return undefined;

    const now = new Date().toISOString();
    lead.assignedManagerId = managerId;
    lead.updatedAt = now;
    lead.timeline.push({
      action: 'LEAD_ASSIGNED',
      timestamp: now,
      operator: operatorName,
      notes: `Finance Lead assigned to officer ${managerId}.`
    });

    return lead;
  }
}
