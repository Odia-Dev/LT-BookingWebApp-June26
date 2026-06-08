import { useState, useCallback } from 'react';
import { PaymentsService } from '../services';
import { Payment, PaymentStatus, PaymentType } from '../types';

export const usePayments = (customerId?: string) => {
  const [payments, setPayments] = useState<Payment[]>(() => {
    return customerId
      ? PaymentsService.getPaymentsByCustomerId(customerId)
      : PaymentsService.getAllPayments();
  });

  const refreshPayments = useCallback(() => {
    setPayments(
      customerId
        ? [...PaymentsService.getPaymentsByCustomerId(customerId)]
        : [...PaymentsService.getAllPayments()]
    );
  }, [customerId]);

  const createRazorpayOrder = useCallback((bookingId: string, customerId: string, customerName: string, amount: number, type: PaymentType) => {
    const order = PaymentsService.createRazorpayOrder(bookingId, customerId, customerName, amount, type);
    refreshPayments();
    return order;
  }, [refreshPayments]);

  const verifyPaymentSignature = useCallback((paymentId: string, gatewayOrderId: string, gatewayPaymentId: string, gatewaySignature: string) => {
    const verified = PaymentsService.verifyPaymentSignature(paymentId, gatewayOrderId, gatewayPaymentId, gatewaySignature);
    refreshPayments();
    return verified;
  }, [refreshPayments]);

  const initiateRefund = useCallback((paymentId: string, operatorName: string, notes?: string) => {
    const refunded = PaymentsService.initiateRefund(paymentId, operatorName, notes);
    refreshPayments();
    return refunded;
  }, [refreshPayments]);

  return {
    payments,
    createRazorpayOrder,
    verifyPaymentSignature,
    initiateRefund,
    refreshPayments
  };
};
