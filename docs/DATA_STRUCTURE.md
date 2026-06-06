# DATA_STRUCTURE.md

Project: Laxmi Toyota V2

Version: 2.0.0

Status: LOCKED

Last Updated: YYYY-MM-DD

Owner: Laxmi Toyota

Related Documents:

* PROJECT_MASTER.md
* SYSTEM_ARCHITECTURE.md
* BOOKING_RULES.md
* LEAD_ROUTING_RULES.md
* RBAC_RULES.md

---

# PURPOSE

Defines the official Firestore database structure.

All collections must be defined here.

No collection may be created without updating this document.

If database and documentation conflict:

Documentation Wins.

---

# DATABASE

Provider

Firebase Firestore

---

# COLLECTION OVERVIEW

vehicles

vehicleVariants

branches

customers

customerAuthProfiles

bookings

payments

financeLeads

exchangeLeads

leadAssignments

testDriveRequests

contactLeads

offers

blogs

knowledgeArticles

reviews

admins

activityLogs

analyticsEvents

notifications

systemSettings

---

# COLLECTION: vehicleVariants

Purpose

Vehicle Variant Data

Fields

id

vehicleId

variantName

fuelType

transmission

exShowroomPrice

onRoadPrice

features

status

createdAt

updatedAt

---

# COLLECTION: branches

Purpose

Branch Information

Fields

id

branchName

slug

city

district

state

address

phone

email

googleMapUrl

workingHours

serviceCoverage

status

createdAt

updatedAt

---

# COLLECTION: customers

Purpose

Customer Master Record

Fields

id

customerCode

name

phone

email

city

district

state

preferredBranchId

leadSource

status

createdAt

updatedAt

---


# COLLECTION: customerAuthProfiles

Purpose

Authentication And Identity Management

Stores Login Methods

Verificat
<truncated 12365 bytes>
tics Event Storage

Fields

id

eventName

customerId

source

medium

campaign

metadata

createdAt

---

# COLLECTION: notifications

Purpose

System Notifications

Fields

id

type

recipientId

message

status

createdAt

readAt

---

# COLLECTION: systemSettings

Purpose

Application Configuration

Fields

id

settingKey

settingValue

updatedBy

updatedAt

---

# COLLECTION: incidents

Purpose

Security Incidents

System Incidents

Operational Incidents

Fields

incidentId

title

description

severity

status

category

reportedBy

assignedTo

createdAt

updatedAt

resolvedAt

relatedBookingId

relatedCustomerId

notes

---

Severity

LOW

MEDIUM

HIGH

CRITICAL

---

Status

OPEN

IN_PROGRESS

RESOLVED

CLOSED

---

# COLLECTION: mediaAssets

Purpose

Central Media Registry

Fields

mediaId

fileName

filePath

mediaType

entityType

entityId

uploadedBy

uploadedAt

updatedAt

isPublic

tags

fileSize

mimeType

status

---

# COLLECTION: faqs

Purpose

Manage Website FAQs

Vehicle FAQs

Location FAQs

Finance FAQs

Exchange FAQs

Booking FAQs

Fields

faqId

category

entityType

entityId

question

answer

displayOrder

isPublished

createdBy

updatedBy

createdAt

updatedAt

---

Entity Types

VEHICLE

LOCATION

FINANCE

EXCHANGE

BOOKING

GENERAL

---

Example

faqId

FAQ-202606-000001

---
# COLLECTION: reviews

Purpose

Customer Testimonials

Vehicle Reviews

Branch Reviews

Website Reviews

Fields

reviewId

customerId

customerName

rating

title

reviewText

vehicleId

branchCode

deliveryId

isVerified

isPublished

createdAt

updatedAt

approvedBy

---

Rating

1

2

3

4

5

---

Example

reviewId

REV-202606-000001

---




# RELATIONSHIPS

Customer

↓

Booking

↓

Payments

↓

Finance Lead

---

Customer

↓

Booking

↓

Exchange Lead

---

Customer

↓

Lead Assignment

↓

Sales Manager

---

Customer

↓

Booking

↓

Assigned Manager

↓

Activity Logs

---

# SOFT DELETE POLICY

No Hard Deletes

Required

status = ACTIVE

status = INACTIVE

status = ARCHIVED

---

# AUDIT POLICY

Every Create

Every Update

Every Delete

Must Create Activity Log

---

# INDEXING REQUIREMENTS

Create Indexes For

bookingId

customerId

vehicleId

branchId

slug

status

createdAt

---

# FILE STORAGE REFERENCES

All Uploaded Files

Must Store URLs Only

Inside Firestore

Actual Files

Stored In Firebase Storage

---

# SECURITY RULE

Sensitive Data

Must Never Be Stored In Public Collections

Examples

Finance Documents

Exchange Documents

Authentication Data

Private Notes

---

# FUTURE COLLECTIONS (V3+)

customerSessions

insuranceLeads

serviceBookings

workshopJobs

partsInventory

aiConversations

predictiveAnalytics

forecastModels

---

Do Not Build In V2

---

# FINAL RULE

No New Collection

No New Relationship

No Schema Change

Without Updating

DATA_STRUCTURE.md

END OF DOCUMENT

# COMPOSITE INDEX REQUIREMENTS

Purpose

Support Fast Queries

Support Dashboard Reporting

Support CRM Operations

Support Analytics

Prevent Full Collection Scans

---

# COLLECTION: bookings

branchCode + bookingStatus

customerId + createdAt

bookingStatus + createdAt

vehicleId + createdAt

sourceCode + createdAt

---

# COLLECTION: payments

bookingId + paymentStatus

customerId + paymentStatus

branchCode + createdAt

---

# COLLECTION: financeLeads

customerId + financeStatus

branchCode + financeStatus

createdAt + financeStatus

---

# COLLECTION: exchangeLeads

customerId + exchangeStatus

branchCode + exchangeStatus

createdAt + exchangeStatus

---

# COLLECTION: testDriveRequests

branchCode + status

vehicleId + createdAt

customerId + createdAt

---

# COLLECTION: contactLeads

sourceCode + createdAt

location + createdAt

leadStatus + createdAt

---

# COLLECTION: leadAssignments

assignedTo + leadStatus

branchCode + leadStatus

assignedAt + leadStatus

---

# COLLECTION: reviews

branchCode + rating

vehicleId + rating

isPublished + createdAt

---

# COLLECTION: analyticsEvents

eventType + createdAt

sourceCode + createdAt

vehicleId + createdAt

location + createdAt

---

# INDEX GOVERNANCE

All New Collections

Must Define

Single Field Indexes

Composite Indexes

Before Production Release

---

# No Production Deployment

Without Required Indexes