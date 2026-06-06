# BOOKING_RULES.md

Project: Laxmi Toyota V2

Version: 2.0.0

Status: LOCKED

Last Updated: YYYY-MM-DD

Owner: Laxmi Toyota

Related Documents

* DATA_STRUCTURE.md
* AUTHENTICATION_RULES.md
* LEAD_ROUTING_RULES.md
* RBAC_RULES.md
* SECURITY_RULES.md

---

# PURPOSE

Define Booking Process

Define Qualification Process

Define OTP Requirements

Define Payment Requirements

Define Booking Statuses

Define Ownership Rules

Define Audit Requirements

---

# BOOKING PHILOSOPHY

No Anonymous Booking

No Unverified Booking

No Direct Booking Creation

Qualification Required

OTP Verification Required

Authentication Required

---

# BOOKING FLOW

Customer

↓

Vehicle Selection

↓

Qualification Form

↓

Authentication

↓

OTP Verification

↓

Booking Creation

↓

Payment

↓

Booking Confirmation

↓

Finance / Exchange

↓

Delivery

---

# BOOKING ELIGIBILITY

Customer Must

Be Authenticated

Be OTP Verified

Accept Terms

Select Vehicle

Select Variant

Select Branch

---

# VEHICLE SELECTION

Required

Vehicle

Variant

Color (Optional)

Preferred Branch

---

# BOOKING QUALIFICATION FORM

Required Fields

Purchase Timeline

Purchase Mode

Decision Maker

Exchange Requirement

Preferred Contact Method

City

District

---

# PURCHASE TIMELINE VALUES

Immediate

0–30 Days

1–3 Months

3–6 Months

6+ Months

---

# PURCHASE MODE VALUES

Self Finance

Bank Finance

Undecided

---

# DECISION MAKER VALUES

Self

Family

Business

Other

---

# LEAD SCORING

Automatic

---

Scoring Factors

Purchase Timeline

Purchase Mode

Decision Maker

Exchange Requirement

---

Score Range

0–100

---

Lead Categories

HOT

WARM

COLD

---

HOT

75–100

---

WARM

40–74

---

COLD

0–39

---

# AUTHENTICATION REQUIREMENTS

Required

Before Booking Creation

---

Allowed Methods

Mobile OTP Login

Email Login

Verified Customer Account

---

# OTP VERIFICATION

Mandatory

Before Booking Creation

---

OTP Expiry

5 Minutes

---

Maximum Attempts

5

---

Booking Cannot Be Created

If OTP Verification Fails

---

# BOOKING ID GENERATION

Must Follow

DATA_STRUCTURE.md

---

Format

LT-{BRANCH}-{SOURCE}-{MMMYY}-{SEQUENCE}

---

Example

LT-BAM-DIG-JUN26-000001

---

Booking ID

System Generated

Permanent

Non Editable

---

# PAYMENT REQUIREMENTS

Booking Creation

Requires Payment

---

Payment Gateway

Razorpay

---

Payment Verification

Mandatory

---

Never Trust Client Side Payment Status

---

Booking Confirmation

Only After Successful Payment Verification

---

# BOOKING STATUS VALUES

INITIATED

QUALIFICATION_PENDING

QUALIFICATION_COMPLETED

OTP_PENDING

OTP_VERIFIED

PAYMENT_PENDING

BOOKING_CONFIRMED

FINANCE_PENDING

FINANCE_IN_PROGRESS

EXCHANGE_IN_PROGRESS

DELIVERY_PENDING

DELIVERED

CANCELLED

---

# STATUS TRANSITIONS

INITIATED

↓

QUALIFICATION_COMPLETED

↓

OTP_VERIFIED

↓

PAYMENT_PENDING

↓

BOOKING_CONFIRMED

↓

FINANCE_PENDING

↓

DELIVERY_PENDING

↓

DELIVERED

---

Invalid Status Jumps

Not Allowed

---

# CANCELLATION RULES

Customer May Request Cancellation

---

Cancellation Requires Review

By Sales Manager

---

Refund Rules

Defined Separately

---

Cancellation Must Create

Activity Log

---

# BOOKING OWNERSHIP

Booking Belongs To

Authenticated Customer

---

Booking Linked To

Customer ID

---

Customer May View

Own Bookings Only

---

Customer Cannot View

Other Customer Bookings

---

# BRANCH ASSIGNMENT

Every Booking

Must Have Branch

---

Branch Derived From

Customer Selection

Or

Lead Routing Rules

---

# LEAD SOURCE ATTRIBUTION

Every Booking Must Store

sourceCode

branchCode

campaignId

campaignName

---

Examples

DIG

ADS

WA

ORG

AI

---

# MANAGER ASSIGNMENT

Every Booking Must Have

Assigned Manager

---

Assignment Rules

Defined In

LEAD_ROUTING_RULES.md

---

# FINANCE ELIGIBILITY

After Booking Confirmation

Customer May

Apply For Finance

---

Finance Cannot Start

Without Valid Booking

---

# EXCHANGE ELIGIBILITY

After Booking Confirmation

Customer May

Submit Exchange Request

---

Exchange Cannot Start

Without Valid Booking

---

# CUSTOMER PORTAL RULES

Customer May View

Booking Status

Payment Status

Finance Status

Exchange Status

Assigned Manager

---

Customer Cannot

Edit Booking Records

---

# ADMIN RULES

Sales Manager

Can Update Booking Status

---

Finance Manager

Can Update Finance Status

---

Branch Manager

Can View Branch Bookings

---

Super Admin

Can Access All Bookings

---

# AUDIT REQUIREMENTS

Every Action Must Create

Activity Log

---

Examples

Booking Created

OTP Verified

Payment Received

Status Updated

Finance Started

Exchange Started

Booking Cancelled

Vehicle Delivered

---

# ANALYTICS EVENTS

BOOKING_STARTED

BOOKING_QUALIFICATION_STARTED

BOOKING_QUALIFICATION_COMPLETED

BOOKING_OTP_VERIFIED

BOOKING_CREATED

BOOKING_COMPLETED

BOOKING_CANCELLED

---

# SECURITY REQUIREMENTS

Authentication Required

OTP Required

Payment Verification Required

Ownership Validation Required

---

Never Trust

Client Side Data

---

# ERROR HANDLING

Booking Failure

↓

Show User Friendly Error

↓

Log Error

↓

Create Incident Record If Required

---

Never Display

Raw System Errors

To Customers

---

# REPORTING REQUIREMENTS

Track

Bookings By Vehicle

Bookings By Branch

Bookings By Source

Bookings By Campaign

Bookings By Location

Booking Revenue

Booking Conversion Rate

---

# FINAL RULE

A Booking Is Not Confirmed

Until

Authentication

OTP Verification

Payment Verification

And Booking Validation

Are Successfully Completed.

END OF DOCUMENT
