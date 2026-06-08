import { PaymentStatus, PaymentType } from '../types';

/**
 * Validates payments input parameters.
 */
export const validatePaymentInput = (input: {
  bookingId: string;
  customerId: string;
  amount: number;
  type: PaymentType;
}): boolean => {
  if (!input.bookingId || input.bookingId.trim() === '') return false;
  if (!input.customerId || input.customerId.trim() === '') return false;
  if (input.amount <= 0) return false;
  
  const validTypes: PaymentType[] = ['Booking Deposit', 'Full Payment', 'Balance Payment', 'Refund'];
  if (!validTypes.includes(input.type)) return false;

  return true;
};

/**
 * Governs state transitions for transaction lifecycle status.
 */
export const validatePaymentStatusTransition = (current: PaymentStatus, next: PaymentStatus): boolean => {
  if (current === next) return true;

  // Terminal states cannot transition further
  if (current === 'SUCCESS' || current === 'FAILED' || current === 'REFUNDED') return false;

  const transitions: Record<PaymentStatus, PaymentStatus[]> = {
    'PENDING': ['PROCESSING', 'SUCCESS', 'FAILED'],
    'PROCESSING': ['SUCCESS', 'FAILED'],
    'SUCCESS': ['REFUNDED'],
    'FAILED': [],
    'REFUNDED': []
  };

  const allowed = transitions[current];
  return allowed ? allowed.includes(next) : false;
};

// Generic validation input wrapper
export const validateModuleInput = (input: any): boolean => {
  if (!input) return false;
  if (input.bookingId !== undefined && input.amount !== undefined) {
    return validatePaymentInput(input);
  }
  return true;
};
