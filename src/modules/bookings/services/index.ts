import { Booking, BookingStatus, BookingTimelineEvent } from '../types';
import { trackEvent } from '../../analytics/services/analytics';

// Seeded booking records representing distinct lifecycle stages
export let MOCK_BOOKINGS: Booking[] = [
  {
    bookingId: 'LT-BAM-DIG-JUN26-000001',
    customerId: 'CUST-001',
    customerName: 'Sudhanshu Sekhar',
    phone: '9437011223',
    email: 'customer@laxmitoyota.com',
    vehicleId: 'hyryder',
    vehicleName: 'Toyota Hyryder',
    variant: 'Hybrid V',
    color: 'Cafe White',
    branchCode: 'BAM',
    sourceCode: 'DIG',
    status: 'BOOKING_CONFIRMED',
    financeIntent: true,
    exchangeIntent: false,
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 47 * 3600 * 1000).toISOString(),
    timeline: [
      { action: 'BOOKING_STARTED', timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString(), operator: 'SYSTEM', notes: 'Checkout started.' },
      { action: 'BOOKING_CREATED', timestamp: new Date(Date.now() - 47.9 * 3600 * 1000).toISOString(), operator: 'SYSTEM', notes: 'Lead qualification complete.' },
      { action: 'BOOKING_CONFIRMED', timestamp: new Date(Date.now() - 47 * 3600 * 1000).toISOString(), operator: 'RAZORPAY_GATEWAY', notes: 'Payment token received. Booking confirmed.' }
    ]
  },
  {
    bookingId: 'LT-JEY-WA-JUN26-000002',
    customerId: 'CUST-001',
    customerName: 'Sudhanshu Sekhar',
    phone: '9437011223',
    email: 'customer@laxmitoyota.com',
    vehicleId: 'fortuner',
    vehicleName: 'Toyota Fortuner',
    variant: 'Legender',
    color: 'Attitude Black',
    branchCode: 'JEY',
    sourceCode: 'WA',
    status: 'DELIVERED',
    financeIntent: false,
    exchangeIntent: true,
    createdAt: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    timeline: [
      { action: 'BOOKING_STARTED', timestamp: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(), operator: 'SYSTEM' },
      { action: 'BOOKING_CREATED', timestamp: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(), operator: 'SYSTEM' },
      { action: 'BOOKING_CONFIRMED', timestamp: new Date(Date.now() - 9.8 * 24 * 3600 * 1000).toISOString(), operator: 'RAZORPAY_GATEWAY' },
      { action: 'DELIVERED', timestamp: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(), operator: 'Ranjan Senapati', notes: 'Keys handed over to customer.' }
    ]
  },
  {
    bookingId: 'LT-RAY-ADS-JUN26-000003',
    customerId: 'CUST-002',
    customerName: 'Priyalata Mishra',
    phone: '9861054321',
    email: 'priya.mishra@yahoo.com',
    vehicleId: 'glanza',
    vehicleName: 'Toyota Glanza',
    variant: 'V',
    color: 'Sportin Red',
    branchCode: 'RAY',
    sourceCode: 'ADS',
    status: 'INITIATED',
    financeIntent: true,
    exchangeIntent: true,
    createdAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(), // 1 hour ago
    updatedAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    timeline: [
      { action: 'BOOKING_STARTED', timestamp: new Date(Date.now() - 1 * 3600 * 1000).toISOString(), operator: 'SYSTEM', notes: 'Booking checkout initialized.' }
    ]
  }
];

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

    MOCK_BOOKINGS = [newBooking, ...MOCK_BOOKINGS];

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

    // If booking was directly confirmed on creation (e.g. mock successful payment flow)
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
