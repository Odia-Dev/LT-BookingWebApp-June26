# AI_DEVELOPMENT_GUARDRAILS.md

Project: Laxmi Toyota V2

Version: 2.0.0

Status: LOCKED

Last Updated: YYYY-MM-DD

Owner: Laxmi Toyota

Related Documents:

* PROJECT_MASTER.md
* SYSTEM_ARCHITECTURE.md
* DEVELOPMENT_RULES.md
* SECURITY_RULES.md
* FEATURE_SCOPE_LOCK.md

---

# PURPOSE

This document defines mandatory rules for:

AI Coding Agents

AI Builders

Antigravity

Future Developers

Future Contributors

---

# PRIMARY RULE

Documentation Is Source Of Truth.

Never Invent Features.

Never Invent Collections.

Never Invent APIs.

Never Invent Business Logic.

Never Invent Permissions.

Everything Must Follow Documentation.

---

# REQUIRED DOCUMENT READ ORDER

Before Writing Any Code

Read:

1. PROJECT_MASTER.md

2. FEATURE_SCOPE_LOCK.md

3. SYSTEM_ARCHITECTURE.md

4. DEVELOPMENT_RULES.md

5. DATA_STRUCTURE.md

6. SECURITY_RULES.md

7. DESIGN_SYSTEM.md

---

If Documents Conflict

Follow Documentation Hierarchy

Defined In

PROJECT_MASTER.md

---

# AI DEVELOPMENT WORKFLOW

Documentation

↓

Audit

↓

Architecture

↓

Development

↓

Testing

↓

Security Validation

↓

Release

---

Never Skip Steps

---

# FEATURE CREATION RULE

Before Building Any Feature

Verify:

Feature Exists In

FEATURE_SCOPE_LOCK.md

---

If Feature Does Not Exist

Stop Development

Request Approval

---

# DATABASE RULES

Never Create New Collections

Without Updating

DATA_STRUCTURE.md

---

Never Create New Relationships

Without Documentation Update

---

Never Store Sensitive Data

In Public Collections

---

# UI DEVELOPMENT RULES

Must Follow

DESIGN_SYSTEM.md

---

Do Not Redesign Components

Without Updating

DESIGN_SYSTEM.md

---

Every Component Must Be

Responsive

Accessible

Reusable

Testable

---

# BUSINESS LOGIC RULES

Forbidden

Business Logic In UI Components

---

Required

UI

↓

Service Layer

↓

Database

---

# FIREBASE RULES

Never Trust Client Side Data

---

All Validation

Must Exist Server Side

---

All Permissions

Must Exist Server Side

---

Never Allow Direct Client Privilege Changes

---

# AUTHENTICATION RULES

Must Follow

AUTHENTICATION_RULES.md

---

No Anonymous Access For Protected Operations

---

OTP Verification Required

For Sensitive Flows

---

Email Verification Required

For Email Accounts

---

# PAYMENT RULES

Never Trust Client Payment Status

---

Only Webhook Verification

Can Mark Payment Successful

---

Always Verify

Gateway Signature

Gateway Order ID

Gateway Payment ID

---

# SECURITY RULES

Never Store

Passwords

Private Keys

Secrets

API Tokens

In Frontend Code

---

Never Expose

Admin APIs

Internal Configurations

Sensitive Environment Variables

---

Use Environment Variables

For All Secrets

---

# FILE UPLOAD RULES

Validate

File Type

File Size

Ownership

Authentication

---

Never Trust File Extension

---

Private Documents

Must Use Protected Storage Rules

---

# ERROR HANDLING RULES

Every Feature Must Have

Loading State

Empty State

Error State

Retry State

---

Never Display

Stack Traces

Database Errors

System Errors

Raw API Errors

To End Users

---

# MODULAR ARCHITECTURE RULES

Every Module Must Be Independent

---

Required Structure

ui/

services/

types/

validation/

hooks/

tests/

---

No Cross Module Dependencies

Without Shared Service Layer

---

# PERFORMANCE RULES

Must Follow

PERFORMANCE_RULES.md

---

Required

Code Splitting

Lazy Loading

Image Optimization

Caching

Tree Shaking

---

# SEO RULES

Must Follow

SEO_CONTENT_RULES.md

AI_SEARCH_OPTIMIZATION.md

LOCATION_SEO_GENERATION_RULES.md

---

Never Create Pages

Without Metadata

Schema

Canonical URL

---

# ANALYTICS RULES

Must Follow

ANALYTICS_EVENTS.md

---

Every Major User Action

Must Be Trackable

---

Never Remove Existing Analytics

Without Approval

---

# VERSION CONTROL RULES

Must Follow

VERSION_CONTROL_RULES.md

---

Every Change Must

Update Documentation

Update Changelog

Update Version

Create Git Commit

---

# TESTING RULES

Must Follow

TESTING_RULES.md

---

Before Merge

Run

Functional Tests

Security Tests

Responsive Tests

Performance Tests

---

# FORBIDDEN AI BEHAVIOR

Do Not

Invent Features

Invent Collections

Invent Roles

Invent Statuses

Invent APIs

Invent Business Rules

Invent Routes

Invent Permissions

Invent Payment Logic

---

If Missing Information

Request Clarification

Do Not Guess

---

# SECURITY REVIEW CHECKLIST

Before Release Verify

Authentication

Authorization

Firestore Rules

Storage Rules

RBAC

Payment Verification

Rate Limiting

Input Validation

File Upload Security

Environment Variables

Security Headers

---

# RELEASE RULE

No Production Deployment Allowed

Until

Security Passed

Testing Passed

Performance Passed

Documentation Updated

Version Updated

Release Checklist Approved

---

# FINAL RULE

AI Must Behave As

A Documentation-Driven Developer

Not As

A Product Designer

Not As

A Product Manager

Not As

A Business Analyst

AI Must Implement

Only What Is Approved

Inside Documentation.

END OF DOCUMENT
