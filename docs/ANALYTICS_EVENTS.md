# ANALYTICS_EVENTS.md

Project: Laxmi Toyota V2

Version: 2.0.0

Status: LOCKED

Last Updated: YYYY-MM-DD

Owner: Laxmi Toyota

Related Documents:

* ORGANIC_GROWTH_DASHBOARD.md
* AI_SEARCH_OPTIMIZATION.md
* LOCATION_SEO_GENERATION_RULES.md
* PROJECT_MASTER.md

---

# PURPOSE

Define all analytics tracking events.

All major user actions must be measurable.

No feature should launch without analytics tracking.

---

# ANALYTICS STACK

Google Analytics 4

Meta Pixel

Microsoft Clarity

Google Search Console

Sentry

Internal Analytics Events

---

# EVENT NAMING RULE

Format

CATEGORY_ACTION

Examples

VEHICLE_VIEWED

BOOKING_STARTED

BOOKING_COMPLETED

PAYMENT_SUCCESS

---

Use UPPERCASE

Use Underscores

No Spaces

---

# COMMON EVENT PROPERTIES

eventName

timestamp

customerId

sessionId

vehicleId

branchId

pageUrl

source

medium

campaign

deviceType

location

---

# WEBSITE EVENTS

HOMEPAGE_VIEWED

ABOUT_PAGE_VIEWED

CONTACT_PAGE_VIEWED

OFFERS_PAGE_VIEWED

FAQ_PAGE_VIEWED

GALLERY_PAGE_VIEWED

BRANCH_PAGE_VIEWED

BLOG_PAGE_VIEWED

KNOWLEDGE_ARTICLE_VIEWED

---

# VEHICLE EVENTS

VEHICLE_LIST_VIEWED

VEHICLE_VIEWED

VEHICLE_VARIANT_VIEWED

VEHICLE_COLOR_VIEWED

VEHICLE_BROCHURE_DOWNLOADED

VEHICLE_COMPARE_VIEWED

EMI_CALCULATOR_USED

EMI_ESTIMATE_GENERATED

---

# LEAD GENERATION EVENTS

CONTACT_FORM_STARTED

CONTACT_FORM_SUBMITTED

GET_BEST_OFFER_STARTED

GET_BEST_OFFER_SUBMITTED

TEST_DRIVE_STARTED

TEST_DRIVE_SUBMITTED

---

# COMMUNICATION EVENTS

CALL_BUTTON_CLICKED

WHATSAPP_BUTTON_CLICKED

EMAIL_BUTTON_CLICKED

DIRECTIONS_BUTTON_CLICKED

---

# AUTHENTI
<truncated 1810 bytes>
SETTINGS_UPDATED

---

# CRM EVENTS

LEAD_ASSIGNED

LEAD_REASSIGNED

LEAD_STATUS_CHANGED

BOOKING_STATUS_CHANGED

FINANCE_STATUS_CHANGED

EXCHANGE_STATUS_CHANGED

---

# ERROR EVENTS

APPLICATION_ERROR

API_ERROR

PAYMENT_ERROR

AUTHENTICATION_ERROR

FILE_UPLOAD_ERROR

---

# PERFORMANCE EVENTS

PAGE_LOAD_TIME

CORE_WEB_VITALS_CAPTURED

LCP_RECORDED

INP_RECORDED

CLS_RECORDED

---

# REVENUE ATTRIBUTION EVENTS

BOOKING_REVENUE_GENERATED

FINANCE_REVENUE_GENERATED

EXCHANGE_REVENUE_GENERATED

---

# REQUIRED ATTRIBUTION FIELDS

Every Lead Event Must Store

leadSource

landingPage

vehicleId

branchId

campaign

city

district

deviceType

---

# AI REFERRAL TRACKING

Track Referrers

chatgpt.com

openai.com

gemini.google.com

perplexity.ai

claude.ai

google.com

Other AI Referrers

---

# LOCATION ATTRIBUTION

Track

Berhampur

Bhanjanagar

Jeypore

Rayagada

Bhawanipatna

Balangir

Bargarh

Nabarangpur

Paralakhemundi

Aska

Nuapada

Phulbani

Malkangiri

---

# CONVERSION FUNNEL

Homepage

↓

Vehicle Page

↓

Lead Form

↓

Booking

↓

Payment

↓

Finance

↓

Delivery

Track Every Step

---

# DASHBOARD REQUIREMENTS

Must Support

Daily Reports

Weekly Reports

Monthly Reports

Quarterly Reports

Yearly Reports

---

# SUCCESS METRICS

Leads

Bookings

Payments

Finance Applications

Exchange Requests

Revenue

Organic Traffic

AI Traffic

WhatsApp Clicks

Call Clicks

Branch Performance

Vehicle Performance

---

FAQ_VIEWED

FAQ_EXPANDED

REVIEW_VIEWED

REVIEW_SUBMITTED

REVIEW_APPROVED


# FINAL RULE

If A User Action Is Important To Business

It Must Be Trackable

And Visible In Dashboard Reporting.

END OF DOCUMENT
