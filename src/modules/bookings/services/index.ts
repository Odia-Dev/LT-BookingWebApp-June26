import { Booking, BookingStatus, BookingTimelineEvent } from '../types';
import { trackEvent } from '../../analytics/services/analytics';
import { db } from "@/core/firebase";
import { collection, doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

// Seeded local cache synchronized with Firestore in real-time
export let MOCK_BOOKINGS: Booking[] = [];

// Real-time synchronization setup for Client runtime
if (typeof window !== "undefined") {
  onSnapshot(collection(db, "bookings"), (snapshot) => {
    const items: Booking[] = [];
    snapshot.forEach((d) => {
      items.push(d.data() as Booking);
    });
    MOCK_BOOKINGS.splice(0, MOCK_BOOKINGS.length, ...items);
  });
}

export class BookingsService {
  static getAllBookings(): Booking[] {
    return MOCK_BOOKINGS;
  }

  static getBookingById(id: string): Booking | undefined {
    return MOCK_BOOKINGS.find(b => b.bookingId === id);
  }

  static getBookingsByCustomerId(customerId: string): Booking[] {
    return MOCK_BOOKINGS.filter(b => b.customerId === customerId);
  }

  // Generate Booking ID following: LT-{BRANCH}-{SOURCE}-{MMMYY}-{SEQUENCE}
  static generateBookingId(branch: string, source: string): string {
    const now = new Date();
    const mmm = now.toLocaleString('default', { month: 'short' }).toUpperCase();
    const yy = now.getFullYear().toString().slice(-2);
    const mmmyy = `${mmm}${yy}`;
    
    const count = MOCK_BOOKINGS.filter(b => b.branchCode === branch && b.sourceCode === source).length + 1;
    const sequence = count.toString().padStart(6, '0');

    return `LT-${branch}-${source}-${mmmyy}-${sequence}`;
  }

  // Create a new Booking
  static createBooking(data: {
    customerId: string;
    customerName: string;
    phone: string;
    email: string;
    vehicleId: string;
    vehicleName: string;
    variant: string;
    color?: string;
    branchCode: string;
    sourceCode: string;
    status?: BookingStatus;
    financeIntent: boolean;
    exchangeIntent: boolean;
  }): Booking {
    const bookingId = this.generateBookingId(data.branchCode, data.sourceCode);
    const now = new Date().toISOString();

    const newBooking: Booking = {
      bookingId,
      customerId: data.customerId,
      customerName: data.customerName,
      phone: data.phone,
      email: data.email,
      vehicleId: data.vehicleId,
      vehicleName: data.vehicleName,
      variant: data.variant,
      color: data.color || 'Default Color',
      branchCode: data.branchCode,
      sourceCode: data.sourceCode,
      status: data.status || 'INITIATED',
      financeIntent: data.financeIntent,
      exchangeIntent: data.exchangeIntent,
      createdAt: now,
      updatedAt: now,
      timeline: [
        { action: 'BOOKING_STARTED', timestamp: now, operator: 'SYSTEM', notes: 'Checkout started.' },
        { action: 'BOOKING_CREATED', timestamp: now, operator: 'SYSTEM', notes: 'Lead qualification complete.' }
      ]
    };

    // Optimistically update cache and write to Firestore
    MOCK_BOOKINGS = [newBooking, ...MOCK_BOOKINGS];
    setDoc(doc(db, "bookings", bookingId), newBooking).catch(err => {
      console.error("Firestore error creating booking:", err);
    });

    // Analytics: BOOKING_CREATED
    trackEvent({
      eventName: 'BOOKING_CREATED',
      customerId: data.customerId,
      source: data.sourceCode,
      metadata: {
        bookingId: newBooking.bookingId,
        vehicleId: data.vehicleId,
        branchId: data.branchCode
      },
      createdAt: now,
      updatedAt: now
    });

    // If booking was directly confirmed on creation (e.g. successful payment flow)
    if (newBooking.status === 'BOOKING_CONFIRMED') {
      trackEvent({
        eventName: 'BOOKING_CONFIRMED',
        customerId: data.customerId,
        source: data.sourceCode,
        metadata: {
          bookingId: newBooking.bookingId,
          vehicleId: data.vehicleId,
          branchId: data.branchCode
        },
        createdAt: now,
        updatedAt: now
      });
    }

    return newBooking;
  }

  // Update status of an existing booking
  static updateBookingStatus(id: string, status: BookingStatus, operator: string, notes?: string): Booking | undefined {
    const booking = MOCK_BOOKINGS.find(b => b.bookingId === id);
    if (!booking) return undefined;

    const oldStatus = booking.status;
    booking.status = status;
    booking.updatedAt = new Date().toISOString();
    booking.timeline.push({
      action: status,
      timestamp: booking.updatedAt,
      operator,
      notes
    });

    // Write change to Firestore in background
    updateDoc(doc(db, "bookings", id), {
      status: booking.status,
      updatedAt: booking.updatedAt,
      timeline: booking.timeline
    }).catch(err => {
      console.error("Firestore error updating booking status:", err);
    });

    // Analytics Trigger for status updates:
    const statusChangeTime = booking.updatedAt;
    if (status === 'BOOKING_CONFIRMED' && oldStatus !== 'BOOKING_CONFIRMED') {
      trackEvent({
        eventName: 'BOOKING_CONFIRMED',
        customerId: booking.customerId,
        source: booking.sourceCode,
        metadata: { bookingId: id, vehicleId: booking.vehicleId, branchId: booking.branchCode },
        createdAt: statusChangeTime,
        updatedAt: statusChangeTime
      });
    } else if (status === 'DELIVERED' && oldStatus !== 'DELIVERED') {
      trackEvent({
        eventName: 'BOOKING_DELIVERED',
        customerId: booking.customerId,
        source: booking.sourceCode,
        metadata: { bookingId: id, vehicleId: booking.vehicleId, branchId: booking.branchCode },
        createdAt: statusChangeTime,
        updatedAt: statusChangeTime
      });
    } else if (status === 'CANCELLED' && oldStatus !== 'CANCELLED') {
      trackEvent({
        eventName: 'BOOKING_CANCELLED',
        customerId: booking.customerId,
        source: booking.sourceCode,
        metadata: { bookingId: id, vehicleId: booking.vehicleId, branchId: booking.branchCode },
        createdAt: statusChangeTime,
        updatedAt: statusChangeTime
      });
    }

    return booking;
  }

  // Cancel Booking
  static cancelBooking(id: string, operator: string, notes?: string): Booking | undefined {
    return this.updateBookingStatus(id, 'CANCELLED', operator, notes || 'Booking cancelled by customer.');
  }
}
