# PAYMENT_RULES.md

Project: Laxmi Toyota V2
Version: 2.0.0
Status: LOCKED
Last Updated: 2026-06-09
Owner: Laxmi Toyota

---

## 1. PURPOSE
Define the Laxmi Toyota secure Payment System architecture. Establish rules for Payment Creation, Verification, Webhooks, Refunds, and Attributions.

---

## 2. PAYMENT ID FORMAT
All generated transactions must adhere to a permanent, system-generated, non-editable ID layout:
`PAY-DDMMYYYY-SEQUENCE` (where SEQUENCE is a 6-digit sequence padded with zero).
Example: `PAY-09062026-000001`

---

## 3. PAYMENT TYPES
- **Booking Deposit**: The initial online reservation fee (mandated to ₹25,000 for standard bookings).
- **Full Payment**: The complete transaction value (e.g. self-finance full ex-showroom vehicle purchase).
- **Balance Payment**: Remainder payments after the booking deposit has been processed.
- **Refund**: Transaction reversals handled by dealership managers.

---

## 4. PAYMENT STATUSES
- `PENDING`: Payment initialized. Order created at gateway.
- `PROCESSING`: Customer completed gateway authentication; validation signature in progress.
- `SUCCESS`: Verified successful settlement.
- `FAILED`: Payment rejected or cancelled.
- `REFUNDED`: Reversal completed.

---

## 5. RAZORPAY INTEGRATION LAYER
- **No Client-side Trust**: Never store status updates as `SUCCESS` based solely on frontend callbacks.
- **Order Creation**: Create gateway Order IDs from server actions before checkout starts.
- **Payment Verification**: Mandatory server-side cryptographic signature checks verifying `razorpay_order_id`, `razorpay_payment_id`, and `razorpay_signature`.
- **Webhook Verification**: Webhook listeners must verify headers using HMAC hex digests and the configured webhook secret.
- **Refunds**: Only trigger gateway refund sequences via authenticated manager dashboard requests.

---

## 6. ANALYTICS EVENTS
- `PAYMENT_INITIATED`: Fired upon order creation start.
- `PAYMENT_SUCCESS`: Fired on verified server-side success.
- `PAYMENT_FAILED`: Fired on signature mismatch or rejected payment.
- `PAYMENT_REFUNDED`: Fired when a payment is rolled back.

---

## 7. SECURITY STANDARDS
- **Least Privilege**: Customers can read own payment history but have zero write/update permissions to payment tables.
- **Direct Database Exposure**: Strictly prohibited. All payment inserts/status modifications occur in the service layer or Cloud Functions.
- **Audit Logging**: Every status transition must record timeline operator details (System, Gateway, Manager).
