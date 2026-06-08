import { BookingStatus } from '../types';

// Valid branch codes
export const VALID_BRANCH_CODES = ['BAM', 'JEY', 'BAR', 'BAL', 'RAY', 'BHA', 'PAR', 'ASK'];

// Vehicles, variants, and colors registry for validation (synchronized with checkout page definitions)
export const VALID_VEHICLE_VARIANTS: Record<string, string[]> = {
  'glanza': ['E', 'S', 'G', 'V'],
  'taisor': ['E', 'S', 'S+', 'G', 'V'],
  'rumion': ['S', 'G', 'V'],
  'hyryder': ['S', 'G', 'V', 'Hybrid V'],
  'crysta': ['G', 'GX', 'VX', 'ZX'],
  'hycross': ['G', 'GX', 'VX Hybrid', 'ZX Hybrid'],
  'fortuner': ['Standard', 'Legender', 'GR-S'],
  'camry': ['2.5L Hybrid'],
  'hilux': ['Std', 'High', 'High AT'],
  'vellfire': ['VIP Lounge'],
  'land-cruiser': ['ZX Diesel']
};

export const VALID_VEHICLE_COLORS: Record<string, string[]> = {
  'glanza': ['Cafe White', 'Enticing Silver', 'Gaming Grey', 'Insta Blue', 'Sportin Red'],
  'taisor': ['Lucent Orange', 'Sportin Red', 'Cafe White', 'Enticing Silver', 'Gaming Grey'],
  'rumion': ['Cafe White', 'Enticing Silver', 'Spunky Blue', 'Rustic Brown', 'Iconic Grey'],
  'hyryder': ['Cafe White', 'Enticing Silver', 'Gaming Grey', 'Sportin Red', 'Midnight Black'],
  'crysta': ['Super White', 'Silver Metallic', 'Grey Metallic', 'Attitude Black', 'Bronze Mica'],
  'hycross': ['Super White', 'Platinum White Pearl', 'Silver Metallic', 'Attitude Black', 'Avant Garde Bronze'],
  'fortuner': ['Super White', 'Platinum White Pearl', 'Attitude Black', 'Grey Metallic', 'Silver Metallic'],
  'camry': ['Platinum White Pearl', 'Silver Metallic', 'Attitude Black', 'Metal Stream Metallic'],
  'hilux': ['Super White', 'Platinum White Pearl', 'Grey Metallic', 'Silver Metallic', 'Emerald Blue'],
  'vellfire': ['Platinum White Pearl', 'Black', 'Burning Black'],
  'land-cruiser': ['Super White', 'Precious White Pearl', 'Dark Red Mica', 'Black', 'Dark Blue']
};

/**
 * Validates customer credentials and locations.
 */
export const validateCustomer = (customer: { name: string; phone: string; email: string; city?: string; district?: string }): boolean => {
  if (!customer.name || customer.name.trim().length < 2) return false;
  
  // 10-digit mobile starting with 6-9
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!customer.phone || !phoneRegex.test(customer.phone)) return false;

  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!customer.email || !emailRegex.test(customer.email)) return false;

  if (customer.city !== undefined && customer.city.trim() === '') return false;
  if (customer.district !== undefined && customer.district.trim() === '') return false;

  return true;
};

/**
 * Validates selected vehicle, variant, and color options.
 */
export const validateVehicle = (vehicleId: string, variant: string, color?: string): boolean => {
  const variants = VALID_VEHICLE_VARIANTS[vehicleId];
  if (!variants || !variants.includes(variant)) return false;

  if (color) {
    const colors = VALID_VEHICLE_COLORS[vehicleId];
    if (colors && !colors.includes(color) && color !== 'Default Color') return false;
  }

  return true;
};

/**
 * Validates selected branch code.
 */
export const validateBranch = (branchCode: string): boolean => {
  return VALID_BRANCH_CODES.includes(branchCode);
};

/**
 * Validates payment constraints depending on lead type.
 */
export const validatePayment = (leadType: 'BOOKING' | 'TEST_DRIVE', amount: number): boolean => {
  if (leadType === 'BOOKING') {
    return amount === 25000;
  }
  if (leadType === 'TEST_DRIVE') {
    return amount === 0;
  }
  return false;
};

/**
 * Validates state transitions for booking statuses.
 */
export const validateBookingStatusTransition = (current: BookingStatus, next: BookingStatus): boolean => {
  if (current === next) return true;

  // Delivered and Cancelled are final terminal states
  if (current === 'DELIVERED' || current === 'CANCELLED') return false;

  // Any state can transition to CANCELLED
  if (next === 'CANCELLED') return true;

  const transitions: Record<BookingStatus, BookingStatus[]> = {
    'INITIATED': ['QUALIFICATION_PENDING', 'QUALIFICATION_COMPLETED', 'CANCELLED'],
    'QUALIFICATION_PENDING': ['QUALIFICATION_COMPLETED', 'CANCELLED'],
    'QUALIFICATION_COMPLETED': ['OTP_PENDING', 'OTP_VERIFIED', 'CANCELLED'],
    'OTP_PENDING': ['OTP_VERIFIED', 'CANCELLED'],
    'OTP_VERIFIED': ['PAYMENT_PENDING', 'BOOKING_CONFIRMED', 'CANCELLED'],
    'PAYMENT_PENDING': ['PAYMENT_RECEIVED', 'BOOKING_CONFIRMED', 'CANCELLED'],
    'PAYMENT_RECEIVED': ['BOOKING_CONFIRMED', 'CANCELLED'],
    'BOOKING_CONFIRMED': ['FINANCE_PENDING', 'FINANCE_IN_PROGRESS', 'EXCHANGE_IN_PROGRESS', 'DELIVERY_PENDING', 'CANCELLED'],
    'FINANCE_PENDING': ['FINANCE_IN_PROGRESS', 'DELIVERY_PENDING', 'CANCELLED'],
    'FINANCE_IN_PROGRESS': ['DELIVERY_PENDING', 'CANCELLED'],
    'EXCHANGE_IN_PROGRESS': ['DELIVERY_PENDING', 'CANCELLED'],
    'DELIVERY_PENDING': ['DELIVERED', 'CANCELLED'],
    'DELIVERED': [],
    'CANCELLED': []
  };

  const allowed = transitions[current];
  return allowed ? allowed.includes(next) : false;
};

/**
 * Overall validator for booking creation input structures.
 */
export const validateBooking = (booking: {
  customerName: string;
  phone: string;
  email: string;
  vehicleId: string;
  variant: string;
  color?: string;
  branchCode: string;
  leadType: 'BOOKING' | 'TEST_DRIVE';
  amount: number;
}): boolean => {
  return (
    validateCustomer({ name: booking.customerName, phone: booking.phone, email: booking.email }) &&
    validateVehicle(booking.vehicleId, booking.variant, booking.color) &&
    validateBranch(booking.branchCode) &&
    validatePayment(booking.leadType, booking.amount)
  );
};

// Backwards compatibility/generic validation input
export const validateModuleInput = (input: any): boolean => {
  if (!input) return false;
  if (input.customerName !== undefined) {
    return validateBooking(input);
  }
  return true;
};
