# LEAD_ROUTING_RULES.md

Project: Laxmi Toyota V2

Version: 2.0.0

Status: LOCKED

Last Updated: YYYY-MM-DD

Owner: Laxmi Toyota

Related Documents

* BOOKING_RULES.md
* DATA_STRUCTURE.md
* RBAC_RULES.md
* ANALYTICS_EVENTS.md

---

# PURPOSE

Define Lead Ownership

Define Assignment Rules

Define Escalation Rules

Define SLA Rules

Define Reassignment Rules

Define CRM Accountability

---

# LEAD PHILOSOPHY

Every Lead Must Have

An Owner

A Status

A Follow Up Date

An Audit Trail

---

No Lead May Remain Unassigned

---

# SUPPORTED LEAD TYPES

CONTACT_LEAD

TEST_DRIVE

BOOKING

FINANCE

EXCHANGE

---

# LEAD SOURCES

DIG

Website Direct

---

WA

WhatsApp

---

ADS

Paid Advertisement

---

WLK

Walk In

---

REF

Referral

---

SOC

Social Media

---

TEL

Telephone Enquiry

---

EML

Email Enquiry

---

ORG

Organic Search

---

AI

AI Referral

---

# BRANCH ROUTING

Lead Must Be Assigned To

A Branch

---

Branch Determination

Customer Selected Branch

↓

If Available

Assign To Selected Branch

---

If No Branch Selected

↓

Assign Based On Customer Location

---

Branch Codes

BAM

JEY

BAR

BAL

RAY

BHA

PAR

ASK

---

# LEAD SCORING

Range

0 - 100

---

HOT

75 - 100

---

WARM

40 - 74

---

COLD

0 - 39

---

Scoring Factors

Purchase Timeline

Finance Intent

Exchange Intent

Vehicle Interest

Booking Progress

---

# SLA RULES

HOT Lead

Assign Within 5 Minutes

---

WARM Lead

Assign Within 30 Minutes

---

COLD Lead

Assign Within 24 Hours

---

SLA Breach

Must Trigger Aler
<truncated 1796 bytes>
Until Delivery

---

# FINANCE LEAD ROUTING

Finance Application Created

↓

Assign To Finance Manager

↓

Track Until Approved Or Closed

---

# EXCHANGE LEAD ROUTING

Exchange Request Created

↓

Assign To Exchange Coordinator

↓

Track Until Valuation Complete

---

# BRANCH MANAGER RESPONSIBILITIES

Monitor Assigned Leads

Monitor SLA Compliance

Monitor Conversion Rates

Approve Reassignments

---

# SALES MANAGER RESPONSIBILITIES

Contact Leads

Update Status

Maintain Follow Ups

Update CRM

---

# FINANCE MANAGER RESPONSIBILITIES

Process Finance Leads

Update Finance Status

Upload Decisions

---

# ANALYTICS REQUIREMENTS

Track

Lead Source

Lead Type

Branch

Assigned Manager

Conversion Rate

Response Time

SLA Compliance

Revenue Generated

---

# REQUIRED EVENTS

LEAD_ASSIGNED

LEAD_REASSIGNED

LEAD_CONTACTED

LEAD_CONVERTED

LEAD_LOST

LEAD_CLOSED

---

# DASHBOARD REQUIREMENTS

Show

Unassigned Leads

SLA Breaches

Top Performing Managers

Top Converting Sources

Top Converting Branches

Lead Aging

---

# LEAD AGING RULES

0-1 Days

Fresh

---

2-7 Days

Active

---

8-30 Days

Aging

---

31+ Days

Critical

---

# SECURITY RULES

Users Can Only View

Assigned Leads

Or

Authorized Branch Leads

---

All Changes Must Be Logged

---

# AUDIT REQUIREMENTS

Every Change Must Create

Activity Log

Examples

Lead Assigned

Lead Reassigned

Lead Status Changed

Lead Converted

Lead Closed

---

# FINAL RULE

Every Lead Must Have

Owner

Status

Follow Up

Audit Trail

SLA

And Accountability.

No Lead May Be Lost Due To Process Failure.

END OF DOCUMENT
