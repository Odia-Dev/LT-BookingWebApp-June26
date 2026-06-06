# DEVELOPMENT_RULES.md

Project: Laxmi Toyota V2

Version: 2.0.0

Status: LOCKED

Last Updated: YYYY-MM-DD

Owner: Laxmi Toyota

Related Documents:

* PROJECT_MASTER.md
* SYSTEM_ARCHITECTURE.md
* DESIGN_SYSTEM.md
* FEATURE_SCOPE_LOCK.md

---

# PURPOSE

This document defines mandatory development standards.

All development must follow these rules.

No exceptions.

If code conflicts with documentation:

Documentation Wins.

---

# DEVELOPMENT PHILOSOPHY

Documentation Driven Development

Security First

Performance First

Mobile First

SEO First

Maintainability First

Scalability First

User Experience First

---

# DATA ACCESS RULES

All Protected Data Operations

Must Follow

Client

↓

Application Service Layer

↓

Validation Layer

↓

Business Logic Layer

↓

Cloud Function

↓

Firestore

---

Direct Client Side Firestore Writes

Not Allowed

For

Bookings

Payments

Finance Leads

Exchange Leads

Lead Assignments

Admin Records

Activity Logs

Analytics Events

Customer Authentication Profiles

Incidents

Media Assets Metadata

---

Frontend Components

Must Never

Directly Create

Update

Delete

Protected Records

---

All Protected Writes

Must Pass Through

Validation

Authorization

Ownership Verification

Business Rule Validation

Audit Logging

Before Persistence

---

Public Read Operations

May Read

Approved Public Content

Only

---

Examples

Vehicles

Branches

Offers

FAQs

Reviews

Knowledge Articles

Location Pages

Public SEO Pages

---

Protected Operations

Require

Authentication

Authorization

Business Rule Validation

Before Execution

---

Firestore Is A Persistence Layer

Not A Business Logic Layer

---

Business Logic

Must Never Be Implemented

Inside Frontend Components

Or Firestore Security Rules

---

# DEVELOPMENT PROCESS

Every New Feature Must Follow:

Requirement

↓

Documentation Review

↓

Architecture Review

↓

Development

↓

Testing

↓

Security Validation

↓

Documentation Update

↓

Git Commit

↓

Release

---

# DOCUMENTATION RULE

No Feature May Be Developed Without Documentation.

Required Documents Must Exist First.

Example:

New Finance Feature

↓

Update Documentation

↓

Build Feature

Not The Reverse.

---

# SOURCE OF TRUTH

Priority Order

1. PROJECT_MASTER.md

2. FEATURE_SCOPE_LOCK.md

3. SYSTEM_ARCHITECTURE.md

4. DATA_STRUCTURE.md

5. SECURITY_RULES.md

6. DESIGN_SYSTEM.md

7. All Other Documents

---

# ARCHITECTURE RULES

Must Follow:

Feature-Based Architecture

Modular Architecture

Error Isolation Architecture

---

Forbidden:

Monolithic Components

Shared Business Logic

Circular Dependencies

Direct Database Access From UI

---

Required:

UI Layer

Service Layer

Validation Layer

Types Layer

Error Handling Layer

For Every Module

---

# FOLDER STRUCTURE RULE

Use Official Structure Only

src/

core/

shared/

modules/

app/

---

No Random Folder Creation Allowed

Without Architecture Approval

---

# CODING STANDARDS

Language

TypeScript Only

---

Use:

Strict Types

Interfaces

Reusable Components

Small Functions

Meaningful Names

---

Avoid:

any

Magic Numbers

Hardcoded Data

Duplicate Logic

Unused Code

---

# COMPONENT RULES

Components Must Be

Reusable

Responsive

Accessible

Testable

---

Maximum Responsibility

One Purpose Per Component

---

# BUSINESS LOGIC RULE

Forbidden

Business Logic Inside UI Components

---

Required

UI

↓

Service Layer

↓

Database

---

# DATABASE RULES

No Direct Firestore Access In UI

---

Required

Component

↓

Service

↓

Firestore

---

All Queries Must Be Indexed

---

# SECURITY RULES

Never Trust Frontend Validation

All Validation Must Exist Server Side

---

Never Store:

Passwords

API Secrets

Private Keys

Tokens

In Client Code

---

All Sensitive Operations Must Be Verified

Server Side

---

# AUTHENTICATION RULES

Must Follow

AUTHENTICATION_RULES.md

---

No Anonymous Access For Protected Operations

---

OTP Verification Mandatory

For Booking Flows

---

# ERROR HANDLING RULES

Every Module Must Have

Loading State

Empty State

Error State

Retry State

---

No Raw Errors Visible To Users

---

Use Error Boundaries

For Major Features

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

Bundle Optimization

---

# MOBILE FIRST RULES

Design Mobile First

Then Tablet

Then Desktop

---

All Features Must Work On

Android

iPhone

Tablet

Desktop

---

# SEO RULES

Must Follow

SEO_CONTENT_RULES.md

AI_SEARCH_OPTIMIZATION.md

LOCATION_SEO_GENERATION_RULES.md

---

Use Semantic HTML

Correct Heading Structure

Structured Data

Metadata

---

# ACCESSIBILITY RULES

WCAG AA Minimum

---

Keyboard Navigation Required

---

Visible Focus States Required

---

Accessible Forms Required

---

# ANALYTICS RULES

Every Major User Action Must Be Tracked

Examples

Vehicle Viewed

Brochure Downloaded

Booking Started

Booking Completed

Finance Submitted

Exchange Submitted

Payment Completed

---

Events Defined In

ANALYTICS_EVENTS.md

---

# TESTING RULES

Every Feature Must Be Tested

Before Merge

Before Release

---

Must Pass

Functional Tests

Security Tests

Responsive Tests

Performance Tests

---

# GIT WORKFLOW

Branches

main

develop

feature/[name]

---

Never Develop Directly On Main

---

# COMMIT FORMAT

Required

FEAT: Description

FIX: Description

DOCS: Description

SEO: Description

SECURITY: Description

STYLE: Description

TEST: Description

---

Examples

FEAT: Added booking qualification flow

FIX: Corrected payment retry issue

DOCS: Updated booking rules

SECURITY: Added Firestore validation

---

# VERSIONING RULES

Semantic Versioning

MAJOR.MINOR.PATCH

---

Major

Architecture Changes

---

Minor

New Features

---

Patch

Bug Fixes

---

# CHANGE MANAGEMENT

Every Change Must

Update Documentation

Update Changelog

Update Version

Create Git Commit

Create Release Note

---

No Silent Changes Allowed

---

# AI DEVELOPMENT RULES

Before Writing Code

AI Must Read

PROJECT_MASTER.md

SYSTEM_ARCHITECTURE.md

FEATURE_SCOPE_LOCK.md

DESIGN_SYSTEM.md

---

AI Must Never

Invent Features

Invent Database Collections

Invent Routes

Invent Business Logic

Outside Documentation

---

# RELEASE RULES

Before Deployment

Security Audit Passed

Testing Passed

Performance Passed

SEO Passed

Documentation Updated

Version Updated

Release Checklist Approved

---

# FINAL RULE

Working Code Is Not Enough.

Code Must Be:

Secure

Maintainable

Documented

Tested

Performant

Scalable

And Aligned With Documentation.

END OF DOCUMENT
