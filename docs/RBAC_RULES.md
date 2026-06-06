# RBAC_RULES.md

Project: Laxmi Toyota V2

Version: 2.0.0

Status: LOCKED

Last Updated: YYYY-MM-DD

Owner: Laxmi Toyota

Related Documents

* AUTHENTICATION_RULES.md
* FIRESTORE_SECURITY_RULES.md
* DATA_STRUCTURE.md
* SECURITY_RULES.md

---

# PURPOSE

Define User Roles

Define Permissions

Define Access Controls

Define Collection Access

Define Dashboard Access

Prevent Unauthorized Access

---

# RBAC PHILOSOPHY

Least Privilege Access

---

Users Only Receive

Permissions Required

For Their Role

---

Default

Deny Access

---

# SYSTEM ROLES

SUPER_ADMIN

BRANCH_MANAGER

SALES_MANAGER

FINANCE_MANAGER

CUSTOMER

SYSTEM

---

# ROLE HIERARCHY

SUPER_ADMIN

↓

BRANCH_MANAGER

↓

SALES_MANAGER

↓

CUSTOMER

---

FINANCE_MANAGER

Separate Functional Role

---

SYSTEM

Internal Operations Only

---

# ROLE DEFINITIONS

## SUPER_ADMIN

Full System Access

---

Can Access

All Branches

All Customers

All Bookings

All Payments

All Finance Leads

All Exchange Leads

All Reports

All Analytics

All Settings

All Users

---

Can Create

Users

Roles

Branches

Offers

Blogs

Knowledge Articles

---

Can Update

All Records

---

Can Delete

Non Protected Records

---

Cannot Delete

Audit Logs

Activity Logs

Payment History

---

## BRANCH_MANAGER

Branch Restricted Access

---

Can Access

Own Branch Data Only

---

Can View

Bookings

Customers

Leads

Payments

Finance Status

Exchange Status

Reports

---

Can Assign Leads

Approve Reassignments

Manage Sales Team

---

Cannot Access

Other Branch Data

System Settings


<truncated 2932 bytes>
Branch Dashboard

---

Branch Leads

Branch Bookings

Branch Revenue

Branch Reports

---

## SALES_MANAGER

Lead Dashboard

---

Assigned Leads

Assigned Bookings

Follow Ups

---

## FINANCE_MANAGER

Finance Dashboard

---

Finance Leads

Approvals

Documents

Reports

---

# ROLE MANAGEMENT RULES

Only

SUPER_ADMIN

Can Create Users

---

Only

SUPER_ADMIN

Can Assign Roles

---

Only

SUPER_ADMIN

Can Change Roles

---

Role Changes

Must Create Activity Log

---

# PERMISSION VALIDATION

Never Trust

Frontend Roles

---

Always Validate

Server Side

---

Always Validate

Firestore Rules

---

# BRANCH ISOLATION

Branch Managers

Cannot Access

Other Branch Records

---

Sales Managers

Cannot Access

Other Manager Records

Unless Assigned

---

# AUDIT REQUIREMENTS

Log

Role Creation

Role Changes

Permission Changes

Account Suspension

Account Activation

---

# ACCOUNT STATUS

ACTIVE

INACTIVE

SUSPENDED

BLOCKED

---

Blocked Users

Cannot Login

---

# EMERGENCY ACCESS

Only

SUPER_ADMIN

Can Enable

Emergency Mode

Maintenance Mode

Feature Lockdown

---

# SECURITY REQUIREMENTS

No Shared Accounts

---

Unique User Accounts Required

---

Email Verification Required

For Admin Accounts

---

OTP Verification Required

For Customer Workflows

---

# FUTURE ROLES (V3)

EXCHANGE_MANAGER

SERVICE_MANAGER

MARKETING_MANAGER

CEO_DASHBOARD_USER

AUDITOR

---

Do Not Build In V2

---

# FINAL RULE

Every User

Must Have

The Minimum Permissions Required

To Perform Their Job.

If Access Is Not Explicitly Allowed

It Must Be Denied.

END OF DOCUMENT
