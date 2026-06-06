# AUTHENTICATION_RULES.md

Project: Laxmi Toyota V2

Version: 2.0.0

Status: LOCKED

Last Updated: YYYY-MM-DD

Owner: Laxmi Toyota

Related Documents:

* SECURITY_RULES.md
* FIRESTORE_SECURITY_RULES.md
* RBAC_RULES.md
* DATA_STRUCTURE.md

---

# PURPOSE

Define Authentication Rules

Define Login Methods

Define Access Levels

Define Verification Requirements

Define Security Requirements

---

# AUTHENTICATION PROVIDER

Firebase Authentication

Mandatory

---

# AUTHENTICATION PHILOSOPHY

Public Access

For Discovery

---

# NO ANONYMOUS ACCESS FOR PROTECTED OPERATIONS

Public Visitors May Access

* Homepage
* Vehicle Listings
* Vehicle Details
* Offers Pages
* Blog
* Knowledge Center
* FAQs
* Reviews
* Gallery
* Branches
* Contact
* About Us
* Why Choose Us
* Compare Pages
* Location Pages

Authentication Required For

* Book Vehicle
* Track Booking
* My Booking
* Finance Application
* Exchange Evaluation
* Document Upload
* Payment Processing
* Customer Dashboard
* Admin Panel
* CRM
* Analytics
* Settings
* Activity Logs

---

# USER TYPES

Public Visitor

Verified Customer

Admin User

Sales Manager

Finance Manager

Branch Manager

Super Admin

---

# PUBLIC ROUTES

No Login Required

Homepage

Vehicle Listings

Vehicle Details

Offers

Blog

Knowledge Center

FAQs

Reviews

Gallery

Branches

Contact

About

Why Choose Us

Compare Pages

Location Pages

---

# VERIFIED CUSTOMER ROUTES

Login Required

Book Vehicle

Track Booking

My Booking

Finance Application

Exchange Evaluation

Document Upload

Profile Management

Payment History

Booking History

---

# ADMIN ROUTES

Authentication Required

Role Required

---

For Admin Access:

Dashboard

Bookings

Customers

Finance

Exchange

Branches

Analytics

Offers

Blogs

Settings

Activity Logs

---

# CUSTOMER LOGIN METHODS

Allowed

Mobile OTP Login

Email Login

Email Verification

---

# MOBILE OTP LOGIN

Primary Login Method

---

Flow

Enter Mobile Number

↓

Receive OTP

↓

Verify OTP

↓

Login Success

---

Requirements

OTP Expiry

5 Minutes

---

Maximum Attempts

5

---

Rate Limiting Required

---

# EMAIL LOGIN

Allowed

---

Flow

Email

↓

Password

↓

Email Verification

↓

Login Success

---

Requirements

Email Verification Required

Before Access

---

# ACCOUNT LINKING

Same Customer May Use

Mobile

And

Email

---

Must Link To

Single Customer Profile

---

Duplicate Accounts Not Allowed

---

# EMAIL VERIFICATION

Required For

Email Login

---

Status

Verified

Unverified

---

Unverified Users

Cannot Access

Protected Customer Features

---

# PASSWORD RULES

Minimum Length

8 Characters

---

Required

Uppercase

Lowercase

Number

---

Recommended

Special Character

---

Passwords Stored By

Firebase Only

---

Never Store Passwords

In Firestore

---

# SESSION MANAGEMENT

Authenticated Session Required

---

Automatic Token Refresh

Enabled

---

Logout Required

For Sensitive Devices

---

# CUSTOMER ACCOUNT STATUS

ACTIVE

INACTIVE

SUSPENDED

BLOCKED

---

Blocked Users

Cannot Login

---

# ADMIN AUTHENTICATION

Email Login Only

---

Admin OTP Optional

Future Enhancement

---

Email Verification Mandatory

---

Admin Accounts

Must Be Created By

Super Admin

---

# ROLE VALIDATION

Every Admin Login

Must Verify

Role

Branch

Permissions

Status

---

Never Trust

Frontend Role Data

---

Role Validation

Must Happen Server Side

---

# OTP SECURITY

OTP Expiry

5 Minutes

---

Maximum Attempts

5

---

Rate Limiting Required

---

OTP Must Never Be Stored

In Plain Text

---

# ACCOUNT SECURITY

Rate Limiting

Enabled

---

Brute Force Protection

Enabled

---

Login Attempt Monitoring

Enabled

---

Suspicious Activity Logging

Enabled

---

# CUSTOMER VERIFICATION LEVELS

Level 0

Public Visitor (Anonymous Discovery Only)

---

Level 1

Authenticated Customer

---

Level 2

OTP Verified Customer

---

Level 3

Booking Verified Customer

---

# BOOKING AUTHENTICATION

Required

Authenticated User

---

Required

OTP Verification

Before Booking Creation

---

Booking Cannot Be Created

Without OTP Verification

---

# FINANCE AUTHENTICATION

Login Required

---

Customer Must Own Booking

---

Authentication Required

Before Document Upload

---

# EXCHANGE AUTHENTICATION

Login Required

---

Authentication Required

Before Image Upload

---

# DOCUMENT ACCESS

Customer

Can Access Own Documents Only

---

Cannot Access

Other Customer Documents

---

# LOGIN EVENTS

Track

LOGIN_STARTED

LOGIN_SUCCESS

LOGIN_FAILED

OTP_SENT

OTP_VERIFIED

EMAIL_VERIFIED

LOGOUT

---

Events Defined In

ANALYTICS_EVENTS.md

---

# FIRESTORE REQUIREMENTS

All Protected Collections

Require Authentication

---

Examples

bookings

payments

financeLeads

exchangeLeads

customerAuthProfiles

---

# SECURITY REQUIREMENTS

Never Trust Client Authentication State

---

Always Validate

Firebase Token

Server Side

---

Never Expose

Admin Permissions

In Frontend Logic

---

# FUTURE ENHANCEMENTS (V3)

Admin Two Factor Authentication

Biometric Login

Device Trust System

Login Alerts

Risk Based Authentication

---

Do Not Build In V2

---

# FINAL RULE

Authentication Is Required

For Any Action

That Can:

Create Data

Modify Data

Access Sensitive Data

Upload Documents

View Customer Information

END OF DOCUMENT
