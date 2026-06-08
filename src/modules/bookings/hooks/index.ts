import { useState, useCallback } from 'react';
import { BookingsService } from '../services';
import { Booking, BookingStatus } from '../types';

export const useBookings = (customerId?: string) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    return customerId 
      ? BookingsService.getBookingsByCustomerId(customerId) 
      : BookingsService.getAllBookings();
  });

  const refreshBookings = useCallback(() => {
    setBookings(
      customerId 
        ? [...BookingsService.getBookingsByCustomerId(customerId)]
        : [...BookingsService.getAllBookings()]
    );
  }, [customerId]);

  const createBooking = useCallback((data: {
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
  }) => {
    const newBooking = BookingsService.createBooking(data);
    refreshBookings();
    return newBooking;
  }, [refreshBookings]);

  const updateBookingStatus = useCallback((id: string, status: BookingStatus, operator: string, notes?: string) => {
    const updated = BookingsService.updateBookingStatus(id, status, operator, notes);
    refreshBookings();
    return updated;
  }, [refreshBookings]);

  const cancelBooking = useCallback((id: string, operator: string, notes?: string) => {
    const cancelled = BookingsService.cancelBooking(id, operator, notes);
    refreshBookings();
    return cancelled;
  }, [refreshBookings]);

  return {
    bookings,
    createBooking,
    updateBookingStatus,
    cancelBooking,
    refreshBookings
  };
};
