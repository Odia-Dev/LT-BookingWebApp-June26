# FIRESTORE_SECURITY_RULES.md

Project: Laxmi Toyota V2

Version: 2.0.0

Status: LOCKED

Last Updated: YYYY-MM-DD

Owner: Laxmi Toyota

Related Documents

* AUTHENTICATION_RULES.md
* RBAC_RULES.md
* DATA_STRUCTURE.md
* SECURITY_RULES.md

---

# PURPOSE

Define Firestore Security Standards

Protect Customer Data

Protect Financial Data

Protect Booking Data

Protect Administrative Data

Prevent Unauthorized Access

---

# SECURITY PHILOSOPHY

Default Deny

---

All Access Must Be Explicitly Granted

---

Never Trust Client Side Data

---

Never Trust Client Side Roles

---

All Authorization

Must Be Verified

Server Side

---

# GLOBAL RULE

Default

DENY

---

If Rule Not Defined

Access Is Denied

---

# AUTHENTICATION REQUIREMENT

Protected Collections

Require Authentication

---

Anonymous Access

NO ANONYMOUS ACCESS FOR PROTECTED OPERATIONS

Public Visitors May read public collections only.

---

Public Collections

May Allow Read Only

---

# PUBLIC READ COLLECTIONS

vehicles

vehicleVariants

branches

offers

reviews

faqs

knowledgeArticles

blogs

---

Allowed

Read

---

Not Allowed

Create

Update

Delete

---

# CUSTOMER OWNERSHIP RULE

Customer May Access

Own Records Only

---

Ownership Validation

Required

---

customerId

Must Match

Authenticated User

---

# COLLECTION: customers

Customer

Can Read Own Record

Can Update Limited Fields

Cannot Delete

---

Admin

Can Manage

---

# COLLECTION: customerAuthProfiles

Customer

Can Read Own Profile

Cannot Modify Verification Status

Cannot Modify Role

---

System

Controls Verification Fields

---

# COLLECTION: bookings

Customer

Can Read Own Booking

Cannot Modify Status

Cannot Modify Payment Fields

---

Sales Manager

Can Update Booking Status

---

Admin

Can Manage

---

# COLLECTION: payments

Customer

Can Read Own Payments

---

Customer

Cannot

Create

Update

Delete

---

System

Creates Payments

---

System

Updates Payment Status

After Verification

---

# COLLECTION: financeLeads

Customer

Can Read Own Finance Application

Can Upload Documents

---

Customer

Cannot Approve Finance

Cannot Change Finance Status

---

Finance Manager

Can Update Finance Status

---

# COLLECTION: exchangeLeads

Customer

Can Read Own Exchange Request

Can Upload Vehicle Information

---

Exchange Manager

Can Update Valuation Status

---

# COLLECTION: testDriveRequests

Customer

Can Create

Can Read Own Requests

---

Admin

Can Manage

---

# COLLECTION: contactLeads

Customer

Can Create

---

Customer

Cannot Read All Leads

---

Admin

Can Manage

---

# COLLECTION: leadAssignments

Sales Manager

Can Read Assigned Leads

---

Branch Manager

Can Read Branch Leads

---

Customer

No Access

---

# COLLECTION: activityLogs

Customer

No Access

---

Admin Only

Read Access

---

System Only

Write Access

---

# COLLECTION: analyticsEvents

Customer

No Access

---

Admin

Read Only

---

System

Write Only

---

# COLLECTION: admins

Admin Users Only

---

Customer

No Access

---

Role Validation Required

---

# COLLECTION: notifications

Customer

Can Read Own Notifications

---

Admin

Can Send Notifications

---

# ROLE VALIDATION

Never Trust

Role Stored In Frontend

---

Always Verify

Role From Firestore

---

Roles

SUPER_ADMIN

BRANCH_MANAGER

SALES_MANAGER

FINANCE_MANAGER

CUSTOMER

---

# FIELD LEVEL PROTECTION

Customers Cannot Modify

bookingStatus

paymentStatus

financeStatus

exchangeStatus

roles

permissions

verificationFlags

---

System Only

May Modify

---

# DOCUMENT UPLOAD SECURITY

Customer May Submit Documents Through Approved Application Workflows

Through Application Service Layer

---

Application Validates Request

↓

Cloud Function Validates Ownership

↓

Firebase Storage Upload

↓

Firestore Metadata Record Created

---

Direct Firestore Writes

Not Allowed

---

Ownership Validation

Required

---

Upload Must Match

Customer ID

---

# WRITE RESTRICTIONS

Customers Cannot

Create Admin Records

Modify Admin Records

Change Roles

Change Permissions

Modify Payment Results

Modify Audit Logs

Modify Analytics Events

---

# DELETE RESTRICTIONS

Customer

Cannot Delete

Bookings

Payments

Finance Records

Exchange Records

Activity Logs

---

Deletion Reserved

For Authorized Admin Roles

---

# PAYMENT SECURITY

Payment Status

Must Not Be Updated

From Client Side

---

Payment Success

Requires

Gateway Verification

---

Webhook Validation

Required

---

# AUDIT LOG PROTECTION

Activity Logs

Immutable

---

No Customer Access

---

No Modification Allowed

---

# RATE LIMITING REQUIREMENT

Protect Against

Brute Force

Spam

OTP Abuse

Lead Spam

---

Implemented Outside Firestore

Required

---

# SECURITY EVENTS

Log

Permission Denied

Unauthorized Access

Role Violations

Failed Authentication

Payment Manipulation Attempts

---

# EMERGENCY LOCKDOWN

Support

Read Only Mode

---

Support

Write Suspension

---

Support

Maintenance Mode

---

# TESTING REQUIREMENTS

Verify

Customer Cannot Access Other Customers

Customer Cannot Access Admin Data

Customer Cannot Modify Payment Status

Customer Cannot Modify Booking Status

Customer Cannot Escalate Privileges

---

Security Tests

Required Before Release

---

# FIRESTORE RULE REVIEW

Review Every

90 Days

---

Review After

Major Feature Release

Security Incident

Architecture Change

---

# COLLECTION: faqs

Public

Read Only

---

SUPER_ADMIN

CRUD

---

BRANCH_MANAGER

Read

---

CUSTOMER

Read Only

---

# COLLECTION: reviews

Public

Read Published Reviews

---

CUSTOMER

Create Own Review

---

SUPER_ADMIN

CRUD

Approve Reviews

---

BRANCH_MANAGER

Read

---

# FINAL RULE

If Access Is Not Explicitly Allowed

It Must Be Denied.

Customer Data

Booking Data

Payment Data

Finance Data

And Administrative Data

Must Always Be Protected.

END OF DOCUMENT
