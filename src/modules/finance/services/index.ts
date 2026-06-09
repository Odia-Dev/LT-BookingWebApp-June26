import { FinanceLead, FinanceLeadStatus, FinanceDocument, DocumentCategory } from '../types';
import { trackEvent } from '@/modules/analytics/services/analytics';
import { validateFinanceStatusTransition } from '../validation';
import { db } from "@/core/firebase";
import { collection, doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

// Seeded local cache synchronized with Firestore in real-time
export let MOCK_FINANCE_LEADS: FinanceLead[] = [];

// Real-time synchronization setup for Client runtime
if (typeof window !== "undefined") {
  onSnapshot(collection(db, "financeLeads"), (snapshot) => {
    const items: FinanceLead[] = [];
    snapshot.forEach((d) => {
      items.push(d.data() as FinanceLead);
    });
    MOCK_FINANCE_LEADS.splice(0, MOCK_FINANCE_LEADS.length, ...items);
  });
}

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

    // Optimistically update cache and write to Firestore
    MOCK_FINANCE_LEADS = [newLead, ...MOCK_FINANCE_LEADS];
    setDoc(doc(db, "financeLeads", leadId), newLead).catch(err => {
      console.error("Firestore error creating finance lead:", err);
    });

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

    // Write change to Firestore in background
    updateDoc(doc(db, "financeLeads", leadId), {
      monthlyIncome: lead.monthlyIncome,
      employerName: lead.employerName,
      employmentType: lead.employmentType,
      loanAmountRequested: lead.loanAmountRequested,
      loanTenureYears: lead.loanTenureYears,
      status: 'DOCUMENT_PENDING',
      updatedAt: now,
      timeline: lead.timeline
    }).catch(err => {
      console.error("Firestore error submitting finance details:", err);
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

    // Write changes to Firestore in background
    updateDoc(doc(db, "financeLeads", leadId), {
      documents: lead.documents,
      status: 'UNDER_REVIEW',
      updatedAt: now,
      timeline: lead.timeline
    }).catch(err => {
      console.error("Firestore error uploading finance doc:", err);
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

      // Write changes to Firestore in background
      updateDoc(doc(db, "financeLeads", leadId), {
        status: lead.status,
        updatedAt: now,
        timeline: lead.timeline
      }).catch(err => {
        console.error("Firestore error updating finance status:", err);
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

    // Write change to Firestore in background
    updateDoc(doc(db, "financeLeads", leadId), {
      assignedManagerId: managerId,
      updatedAt: now,
      timeline: lead.timeline
    }).catch(err => {
      console.error("Firestore error assigning finance manager:", err);
    });

    return lead;
  }
}
