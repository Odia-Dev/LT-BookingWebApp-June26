# PROJECT STRUCTURE REPORT

**Date:** 2026-06-06  
**Project:** Laxmi Toyota V2  

---

## Recommended Folder Structure

```text
/
├── docs/                      # Locked project documentation files
├── public/                    # Static assets (optimized WebP images, sitemap.xml)
├── src/
│   ├── app/                   # Next.js App Router (pages and layouts)
│   ├── components/            # Reusable UI elements (Buttons, Inputs, Cards)
│   ├── core/                  # Global configuration, client initialization
│   │   ├── firebase.ts        # Firebase app configuration
│   │   └── razorpay.ts        # Razorpay client integration settings
│   ├── hooks/                 # Reusable React hooks (e.g. useAuth)
│   ├── modules/               # Feature-based modular directories
│   │   ├── auth/              # Customer login, OTP verify services
│   │   ├── bookings/          # Qualification flow and tracking ui
│   │   ├── payments/          # Razorpay webhook and redirect handlers
│   │   ├── finance/           # Application forms and uploads
│   │   ├── exchange/          # Vehicle evaluation forms and uploads
│   │   ├── crm/               # SLA assignment and branch routing logic
│   │   └── admin/             # Executive stats and dashboards
│   └── shared/                # Global utils, context, constants, and types
│       ├── types/             # Shared TypeScript schemas
│       └── utils/             # Helper formatters and validation rules
```

---

## Recommended Module Structure

Every feature module inside `src/modules/[module-name]/` must adhere to:

```text
modules/[module-name]/
├── components/                # Module-specific components
├── hooks/                     # Custom hooks for the module
├── services/                  # Firestore API / Cloud Function calling scripts
├── types/                     # Module-specific interfaces
└── validation/                # Zod schemas for input validation
```

---

## Firebase Structure

* **Firestore Database:** 21 collections matching [DATA_STRUCTURE.md](file:///e:/Toyota/Laxmitoyota%20website/booking-website-final/Version%202/docs/DATA_STRUCTURE.md) schemas.
* **Storage Paths:** Document directories partitioned strictly by authentication states as defined in [MEDIA_STRUCTURE.md](file:///e:/Toyota/Laxmitoyota%20website/booking-website-final/Version%202/docs/MEDIA_STRUCTURE.md).
* **Cloud Functions:** Server-side gateway triggers for booking creation, payment verification, and file upload validation.

---

## Environment Structure

Create `.env.local` containing:

```env
# Firebase Client SDK Keys
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Razorpay Keys
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Sentry config
SENTRY_AUTH_TOKEN=
```

---

## Route Structure

```text
/                              # Homepage (Discovery)
├── /vehicles                  # Listings (Discovery)
│   └── /[slug]                # Details (Discovery)
├── /branches                  # Branches (Discovery)
├── /location                  # Location Pages (Discovery)
├── /book-online               # Booking qualification flow (Auth Required)
├── /my-booking                # Portal / Status Tracking (Auth Required)
├── /finance                   # Finance Applications (Auth Required)
├── /exchange                  # Exchange request submission (Auth Required)
└── /admin                     # Dashboard (Super Admin / Branch Manager Auth)
```

---
*End of Report.*
