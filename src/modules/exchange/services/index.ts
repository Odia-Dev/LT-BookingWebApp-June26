import { ExchangeLead, ExchangeStatus, VehicleExchangeDetails } from "../types";
import { trackEvent } from "@/modules/analytics/services/analytics";
import { validateExchangeStatusTransition } from "../validation";
import { db } from "@/core/firebase";
import { collection, doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

// Seeded local cache synchronized with Firestore in real-time
export let MOCK_EXCHANGE_LEADS: ExchangeLead[] = [];

// Real-time synchronization setup for Client runtime
if (typeof window !== "undefined") {
  onSnapshot(collection(db, "exchangeLeads"), (snapshot) => {
    const items: ExchangeLead[] = [];
    snapshot.forEach((d) => {
      items.push(d.data() as ExchangeLead);
    });
    MOCK_EXCHANGE_LEADS.splice(0, MOCK_EXCHANGE_LEADS.length, ...items);
  });
}

export class ExchangeService {
  static getAllExchangeLeads(): ExchangeLead[] {
    return MOCK_EXCHANGE_LEADS;
  }

  static getExchangeLeadById(id: string): ExchangeLead | undefined {
    return MOCK_EXCHANGE_LEADS.find(l => l.exchangeLeadId === id);
  }

  static getExchangeLeadsByCustomerId(customerId: string): ExchangeLead[] {
    return MOCK_EXCHANGE_LEADS.filter(l => l.customerId === customerId);
  }

  static generateExchangeLeadId(): string {
    const now = new Date();
    const dd = now.getDate().toString().padStart(2, '0');
    const mm = (now.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = now.getFullYear().toString();
    const ddmmyyyy = `${dd}${mm}${yyyy}`;

    const sequence = (MOCK_EXCHANGE_LEADS.length + 1).toString().padStart(6, '0');
    return `EXC-${ddmmyyyy}-${sequence}`;
  }

  static startExchangeApplication(bookingId: string, customerId: string, customerName: string): ExchangeLead {
    const leadId = this.generateExchangeLeadId();
    const now = new Date().toISOString();

    const newLead: ExchangeLead = {
      id: leadId,
      exchangeLeadId: leadId,
      bookingId,
      customerId,
      customerName,
      vehicleDetails: {
        registrationNumber: "TBD",
        brand: "TBD",
        model: "TBD",
        year: 2020,
        kilometersDriven: 0,
        ownershipType: "First Owner"
      },
      photos: [],
      status: "INITIATED",
      createdAt: now,
      updatedAt: now,
      timeline: [
        { action: "EXCHANGE_STARTED", timestamp: now, operator: "SYSTEM" }
      ]
    };

    // Optimistically update cache and write to Firestore
    MOCK_EXCHANGE_LEADS = [newLead, ...MOCK_EXCHANGE_LEADS];
    setDoc(doc(db, "exchangeLeads", leadId), newLead).catch(err => {
      console.error("Firestore error starting exchange application:", err);
    });

    // Trigger Analytics Event
    trackEvent({
      eventName: "EXCHANGE_STARTED",
      customerId,
      source: "DIG",
      metadata: { exchangeLeadId: leadId, bookingId },
      createdAt: now,
      updatedAt: now
    });

    return newLead;
  }

  static submitExchangeDetails(
    leadId: string,
    details: VehicleExchangeDetails,
    photos: string[]
  ): ExchangeLead | undefined {
    const lead = MOCK_EXCHANGE_LEADS.find(l => l.exchangeLeadId === leadId);
    if (!lead) return undefined;

    const now = new Date().toISOString();
    lead.vehicleDetails = details;
    lead.photos = photos;
    lead.status = "APPRAISAL_PENDING";
    lead.updatedAt = now;
    lead.timeline.push({
      action: "EXCHANGE_SUBMITTED",
      timestamp: now,
      operator: "SYSTEM",
      notes: `Vehicle specification submitted: ${details.brand} ${details.model} (${details.year}).`
    });

    // Write change to Firestore in background
    updateDoc(doc(db, "exchangeLeads", leadId), {
      vehicleDetails: lead.vehicleDetails,
      photos: lead.photos,
      status: "APPRAISAL_PENDING",
      updatedAt: now,
      timeline: lead.timeline
    }).catch(err => {
      console.error("Firestore error submitting exchange details:", err);
    });

    // Trigger Analytics Event
    trackEvent({
      eventName: "EXCHANGE_SUBMITTED",
      customerId: lead.customerId,
      source: "DIG",
      metadata: { exchangeLeadId: leadId, brand: details.brand, model: details.model },
      createdAt: now,
      updatedAt: now
    });

    return lead;
  }

  static updateValuation(
    leadId: string,
    valuationAmount: number,
    offeredAmount: number,
    officerId: string
  ): ExchangeLead | undefined {
    const lead = MOCK_EXCHANGE_LEADS.find(l => l.exchangeLeadId === leadId);
    if (!lead) return undefined;

    const now = new Date().toISOString();
    lead.valuationAmount = valuationAmount;
    lead.offeredAmount = offeredAmount;
    lead.status = "VALUATION_COMPLETED";
    lead.assignedOfficerId = officerId;
    lead.updatedAt = now;
    lead.timeline.push({
      action: "EXCHANGE_VALUATION_COMPLETED",
      timestamp: now,
      operator: officerId,
      notes: `Appraisal evaluation set at ₹${valuationAmount.toLocaleString('en-IN')}. Trade-in offer: ₹${offeredAmount.toLocaleString('en-IN')}.`
    });

    // Write changes to Firestore in background
    updateDoc(doc(db, "exchangeLeads", leadId), {
      valuationAmount: lead.valuationAmount,
      offeredAmount: lead.offeredAmount,
      status: "VALUATION_COMPLETED",
      assignedOfficerId: officerId,
      updatedAt: now,
      timeline: lead.timeline
    }).catch(err => {
      console.error("Firestore error updating valuation details:", err);
    });

    // Trigger Analytics Event
    trackEvent({
      eventName: "EXCHANGE_VALUATION_COMPLETED",
      customerId: lead.customerId,
      source: "DIG",
      metadata: { exchangeLeadId: leadId, valuationAmount, offeredAmount },
      createdAt: now,
      updatedAt: now
    });

    return lead;
  }

  static shareOffer(leadId: string, operator: string): ExchangeLead | undefined {
    const lead = MOCK_EXCHANGE_LEADS.find(l => l.exchangeLeadId === leadId);
    if (!lead) return undefined;

    if (!validateExchangeStatusTransition(lead.status, "OFFER_SHARED")) {
      return lead;
    }

    const now = new Date().toISOString();
    lead.status = "OFFER_SHARED";
    lead.updatedAt = now;
    lead.timeline.push({
      action: "OFFER_SHARED",
      timestamp: now,
      operator,
      notes: `Trade-in quote of ₹${(lead.offeredAmount || 0).toLocaleString('en-IN')} officially shared with customer.`
    });

    // Write change to Firestore in background
    updateDoc(doc(db, "exchangeLeads", leadId), {
      status: "OFFER_SHARED",
      updatedAt: now,
      timeline: lead.timeline
    }).catch(err => {
      console.error("Firestore error sharing exchange offer:", err);
    });

    return lead;
  }

  static acceptOrRejectOffer(leadId: string, accept: boolean, notes?: string): ExchangeLead | undefined {
    const lead = MOCK_EXCHANGE_LEADS.find(l => l.exchangeLeadId === leadId);
    if (!lead) return undefined;

    const targetStatus = accept ? "OFFER_ACCEPTED" : "OFFER_REJECTED";
    if (!validateExchangeStatusTransition(lead.status, targetStatus)) {
      return lead;
    }

    const now = new Date().toISOString();
    lead.status = targetStatus;
    lead.updatedAt = now;
    lead.timeline.push({
      action: targetStatus,
      timestamp: now,
      operator: "CUSTOMER",
      notes: notes || `Customer ${accept ? "accepted" : "rejected"} the trade-in offer.`
    });

    // Write change to Firestore in background
    updateDoc(doc(db, "exchangeLeads", leadId), {
      status: targetStatus,
      updatedAt: now,
      timeline: lead.timeline
    }).catch(err => {
      console.error("Firestore error accepting/rejecting offer:", err);
    });

    // Trigger Analytics Events
    trackEvent({
      eventName: accept ? "EXCHANGE_OFFER_ACCEPTED" : "EXCHANGE_OFFER_REJECTED",
      customerId: lead.customerId,
      source: "DIG",
      metadata: { exchangeLeadId: leadId, offeredAmount: lead.offeredAmount },
      createdAt: now,
      updatedAt: now
    });

    return lead;
  }

  static assignOfficer(leadId: string, officerId: string, operatorName: string): ExchangeLead | undefined {
    const lead = MOCK_EXCHANGE_LEADS.find(l => l.exchangeLeadId === leadId);
    if (!lead) return undefined;

    const now = new Date().toISOString();
    lead.assignedOfficerId = officerId;
    lead.updatedAt = now;
    lead.timeline.push({
      action: "LEAD_ASSIGNED",
      timestamp: now,
      operator: operatorName,
      notes: `Exchange lead assigned to appraisal evaluator ${officerId}.`
    });

    // Write change to Firestore in background
    updateDoc(doc(db, "exchangeLeads", leadId), {
      assignedOfficerId: officerId,
      updatedAt: now,
      timeline: lead.timeline
    }).catch(err => {
      console.error("Firestore error assigning exchange officer:", err);
    });

    return lead;
  }

  static updateStatus(leadId: string, status: ExchangeStatus, operatorName: string, notes?: string): ExchangeLead | undefined {
    const lead = MOCK_EXCHANGE_LEADS.find(l => l.exchangeLeadId === leadId);
    if (!lead) return undefined;

    const oldStatus = lead.status;
    if (!validateExchangeStatusTransition(oldStatus, status)) {
      return lead;
    }

    const now = new Date().toISOString();
    lead.status = status;
    lead.updatedAt = now;
    lead.timeline.push({
      action: status,
      timestamp: now,
      operator: operatorName,
      notes
    });

    // Write change to Firestore in background
    updateDoc(doc(db, "exchangeLeads", leadId), {
      status,
      updatedAt: now,
      timeline: lead.timeline
    }).catch(err => {
      console.error("Firestore error updating exchange status:", err);
    });

    if (status === "COMPLETED") {
      trackEvent({
        eventName: "EXCHANGE_COMPLETED",
        customerId: lead.customerId,
        source: "DIG",
        metadata: { exchangeLeadId: leadId },
        createdAt: now,
        updatedAt: now
      });
    }

    return lead;
  }
}
