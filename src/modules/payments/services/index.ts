import { Payment, PaymentStatus, PaymentType } from '../types';
import { trackEvent } from '@/modules/analytics/services/analytics';
import { validatePaymentStatusTransition } from '../validation';
import { db } from "@/core/firebase";
import { collection, doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

// Seeded local cache synchronized with Firestore in real-time
export let MOCK_PAYMENTS: Payment[] = [];

// Real-time synchronization setup for Client runtime
if (typeof window !== "undefined") {
  onSnapshot(collection(db, "payments"), (snapshot) => {
    const items: Payment[] = [];
    snapshot.forEach((d) => {
      items.push(d.data() as Payment);
    });
    MOCK_PAYMENTS.splice(0, MOCK_PAYMENTS.length, ...items);
  });
}

export class PaymentsService {
  static getAllPayments(): Payment[] {
    return MOCK_PAYMENTS;
  }

  static getPaymentById(id: string): Payment | undefined {
    return MOCK_PAYMENTS.find(p => p.paymentId === id);
  }

  static getPaymentsByCustomerId(customerId: string): Payment[] {
    return MOCK_PAYMENTS.filter(p => p.customerId === customerId);
  }

  static getPaymentsByBookingId(bookingId: string): Payment[] {
    return MOCK_PAYMENTS.filter(p => p.bookingId === bookingId);
  }

  // Generate Payment ID following format: PAY-DDMMYYYY-SEQUENCE
  static generatePaymentId(): string {
    const now = new Date();
    const dd = now.getDate().toString().padStart(2, '0');
    const mm = (now.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = now.getFullYear().toString();
    const ddmmyyyy = `${dd}${mm}${yyyy}`;

    const sequence = (MOCK_PAYMENTS.length + 1).toString().padStart(6, '0');
    return `PAY-${ddmmyyyy}-${sequence}`;
  }

  /**
   * Razorpay Order Creation Service
   */
  static createRazorpayOrder(bookingId: string, customerId: string, customerName: string, amount: number, type: PaymentType): Payment {
    const paymentId = this.generatePaymentId();
    const orderId = `order_${Math.random().toString(36).substring(2, 11)}`;
    const now = new Date().toISOString();

    const newPayment: Payment = {
      id: paymentId,
      paymentId,
      bookingId,
      customerId,
      customerName,
      amount,
      type,
      status: 'PENDING',
      gateway: 'Razorpay',
      gatewayOrderId: orderId,
      createdAt: now,
      updatedAt: now,
      timeline: [
        { action: 'PAYMENT_INITIATED', timestamp: now, operator: 'SYSTEM', notes: `Razorpay Order ${orderId} created.` }
      ]
    };

    // Optimistically update cache and write to Firestore
    MOCK_PAYMENTS = [newPayment, ...MOCK_PAYMENTS];
    setDoc(doc(db, "payments", paymentId), newPayment).catch(err => {
      console.error("Firestore error creating payment:", err);
    });

    // Analytics: PAYMENT_INITIATED
    trackEvent({
      eventName: 'PAYMENT_INITIATED',
      customerId,
      source: 'DIG',
      metadata: { paymentId, bookingId, amount, gatewayOrderId: orderId },
      createdAt: now,
      updatedAt: now
    });

    return newPayment;
  }

  /**
   * Razorpay Server-side Payment Signature Verification Service
   */
  static verifyPaymentSignature(
    paymentId: string,
    gatewayOrderId: string,
    gatewayPaymentId: string,
    gatewaySignature: string
  ): Payment | undefined {
    const payment = MOCK_PAYMENTS.find(p => p.paymentId === paymentId);
    if (!payment) return undefined;

    const now = new Date().toISOString();
    
    // Simulate server side signature matching verify (secret-based HMAC validation)
    const isValid = gatewaySignature.startsWith('sig_') && gatewayOrderId === payment.gatewayOrderId;

    if (isValid) {
      if (validatePaymentStatusTransition(payment.status, 'SUCCESS')) {
        payment.status = 'SUCCESS';
        payment.gatewayPaymentId = gatewayPaymentId;
        payment.gatewaySignature = gatewaySignature;
        payment.updatedAt = now;
        payment.timeline.push({
          action: 'PAYMENT_SUCCESS',
          timestamp: now,
          operator: 'RAZORPAY_GATEWAY',
          notes: `Signature verified. Payment successful.`
        });

        // Write status to Firestore in background
        updateDoc(doc(db, "payments", paymentId), {
          status: 'SUCCESS',
          gatewayPaymentId,
          gatewaySignature,
          updatedAt: now,
          timeline: payment.timeline
        }).catch(err => {
          console.error("Firestore error updating payment success:", err);
        });

        // Analytics: PAYMENT_SUCCESS
        trackEvent({
          eventName: 'PAYMENT_SUCCESS',
          customerId: payment.customerId,
          source: 'DIG',
          metadata: { paymentId, bookingId: payment.bookingId, amount: payment.amount },
          createdAt: now,
          updatedAt: now
        });
      }
    } else {
      if (validatePaymentStatusTransition(payment.status, 'FAILED')) {
        payment.status = 'FAILED';
        payment.updatedAt = now;
        payment.timeline.push({
          action: 'PAYMENT_FAILED',
          timestamp: now,
          operator: 'RAZORPAY_GATEWAY',
          notes: `Signature mismatch verification error.`
        });

        // Write status to Firestore in background
        updateDoc(doc(db, "payments", paymentId), {
          status: 'FAILED',
          updatedAt: now,
          timeline: payment.timeline
        }).catch(err => {
          console.error("Firestore error updating payment fail:", err);
        });

        // Analytics: PAYMENT_FAILED
        trackEvent({
          eventName: 'PAYMENT_FAILED',
          customerId: payment.customerId,
          source: 'DIG',
          metadata: { paymentId, bookingId: payment.bookingId },
          createdAt: now,
          updatedAt: now
        });
      }
    }

    return payment;
  }

  /**
   * Webhook Signature Verification Service
   */
  static verifyWebhookSignature(payload: any, signature: string, secret: string): boolean {
    if (!signature || !secret) return false;
    // Mocking HMAC verification check
    return signature === 'valid_webhook_signature';
  }

  /**
   * Refund Service Structure
   */
  static initiateRefund(paymentId: string, operatorName: string, notes?: string): Payment | undefined {
    const payment = MOCK_PAYMENTS.find(p => p.paymentId === paymentId);
    if (!payment) return undefined;

    if (validatePaymentStatusTransition(payment.status, 'REFUNDED')) {
      const now = new Date().toISOString();
      payment.status = 'REFUNDED';
      payment.refundNotes = notes || 'Refund requested by manager.';
      payment.updatedAt = now;
      payment.timeline.push({
        action: 'PAYMENT_REFUNDED',
        timestamp: now,
        operator: operatorName,
        notes: payment.refundNotes
      });

      // Write change to Firestore in background
      updateDoc(doc(db, "payments", paymentId), {
        status: 'REFUNDED',
        refundNotes: payment.refundNotes,
        updatedAt: now,
        timeline: payment.timeline
      }).catch(err => {
        console.error("Firestore error updating payment refund:", err);
      });

      // Analytics: PAYMENT_REFUNDED
      trackEvent({
        eventName: 'PAYMENT_REFUNDED',
        customerId: payment.customerId,
        source: 'DIG',
        metadata: { paymentId, bookingId: payment.bookingId, amount: payment.amount },
        createdAt: now,
        updatedAt: now
      });
    }

    return payment;
  }
}
