import { ExchangeLead, ExchangeStatus, VehicleExchangeDetails } from "../types";
import { trackEvent } from "@/modules/analytics/services/analytics";
import { validateExchangeStatusTransition } from "../validation";

export let MOCK_EXCHANGE_LEADS: ExchangeLead[] = [
  {
    id: "EXC-01062026-000001",
    exchangeLeadId: "EXC-01062026-000001",
    bookingId: "LT-BAM-DIG-JUN26-000001",
    customerId: "CUST-001",
    customerName: "Sudhanshu Sekhar",
    vehicleDetails: {
      registrationNumber: "OD-02-AX-1234",
      brand: "Hyundai",
      model: "i20 Asta",
      year: 2018,
      kilometersDriven: 45000,
      ownershipType: "First Owner"
    },
    photos: ["/uploads/vehicles/i20_front.jpg", "/uploads/vehicles/i20_back.jpg"],
    status: "VALUATION_COMPLETED",
    assignedOfficerId: "VAL-OFF-07",
    valuationAmount: 420000,
    offeredAmount: 400000,
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    timeline: [
      { action: "EXCHANGE_STARTED", timestamp: new Date(Date.now() - 72.1 * 3600 * 1000).toISOString(), operator: "SYSTEM" },
      { action: "EXCHANGE_SUBMITTED", timestamp: new Date(Date.now() - 72 * 3600 * 1000).toISOString(), operator: "SYSTEM", notes: "Used i20 submitted for assessment." },
      { action: "LEAD_ASSIGNED", timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString(), operator: "MGR-BAM-01", notes: "Assigned to appraiser officer VAL-OFF-07." },
      { action: "VALUATION_COMPLETED", timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), operator: "VAL-OFF-07", notes: "Appraisal completed. Base valuation set at ₹4.2 Lakhs." }
    ]
  }
];

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

    MOCK_EXCHANGE_LEADS = [newLead, ...MOCK_EXCHANGE_LEADS];

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
