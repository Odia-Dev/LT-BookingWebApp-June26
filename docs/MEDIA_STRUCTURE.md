# MEDIA_STRUCTURE.md

Project: Laxmi Toyota V2

Version: 2.0.0

Status: LOCKED

Last Updated: YYYY-MM-DD

Owner: Laxmi Toyota

Related Documents

* DATA_STRUCTURE.md
* SEO_CONTENT_RULES.md
* PERFORMANCE_RULES.md
* FIRESTORE_SECURITY_RULES.md

---

# PURPOSE

Define Media Storage Standards

Define File Organization

Define Naming Conventions

Define Image Optimization Rules

Define Upload Security Rules

Prevent Media Chaos

---

# STORAGE PHILOSOPHY

Every File Must Have

Purpose

Owner

Category

Location

Auditability

---

No Random Uploads Allowed

---

# STORAGE PROVIDER

Firebase Storage

---

# ROOT STRUCTURE

/media

---

# VEHICLE MEDIA

/media/vehicles

---

Structure

/media/vehicles/{vehicle-slug}

---

Examples

/media/vehicles/toyota-hyryder

/media/vehicles/toyota-rumion

/media/vehicles/toyota-hycross

/media/vehicles/toyota-fortuner

---

Files

hero.webp

front.webp

rear.webp

interior.webp

dashboard.webp

gallery-01.webp

gallery-02.webp

gallery-03.webp

brochure.pdf

---

# VEHICLE COLOR MEDIA

/media/vehicles/{vehicle-slug}/colors

---

Examples

attitude-black.webp

silver-metallic.webp

white-pearl.webp

---

# BRANCH MEDIA

/media/branches

---

Examples

/media/branches/brahmapur

/media/branches/jeypore

/media/branches/rayagada

---

Files

hero.webp

showroom.webp

team.webp

service-center.webp

---

# LOCATION SEO MEDIA

/media/locations

---

Examples

/media/locations/brahmapur

/media/locations/bhanjanagar

/media/locations/jeypore

/media/locations/rayagada

---

Files

hero.webp

location-banner.webp

local-landmark.webp
<truncated 2470 bytes>
---

File Name

SEO Friendly

---

Example

toyota-hyryder-black-suv.webp

---

# ACCESS CONTROL

Public

Vehicles

Branches

Offers

Blogs

Knowledge Center

Locations

---

Private

Customer Documents

Finance Documents

Exchange Documents

Admin Files

---

# SECURITY RULES

Never Allow

Public Access

To

Finance Documents

Exchange Documents

Customer Documents

---

Authentication Required

For Protected Files

---

# UPLOAD VALIDATION

Validate

File Type

File Size

Ownership

Authentication

---

Reject

Executable Files

Scripts

Unknown Formats

---

# DUPLICATE FILE RULE

Avoid Duplicate Uploads

Where Possible

---

Reuse Existing Assets

---

# MEDIA ATTRIBUTION

Store

uploadedBy

uploadedAt

updatedAt

fileSize

mimeType

---

Required

For Audit Trail

---

# MEDIA COLLECTION

Create Collection

mediaAssets

---

Fields

id

fileName

filePath

mediaType

ownerId

uploadedBy

uploadedAt

isPublic

tags

---

# PERFORMANCE RULES

Enable

Lazy Loading

Image Compression

Responsive Images

WebP Delivery

Caching

---

# BACKUP RULES

Include

Vehicle Media

Branch Media

Customer Documents

Finance Documents

Exchange Documents

Offer Assets

---

Defined In

BACKUP_AND_DISASTER_RECOVERY.md

---

# FUTURE MEDIA FEATURES (V3)

Video Library

360 Degree Vehicle Tours

Virtual Showroom

AI Image Optimization

AI Asset Tagging

---

Do Not Build In V2

---

# FINAL RULE

Every File Must Have

A Defined Location

A Defined Owner

A Defined Purpose

And Appropriate Security Controls.

No Unstructured Media Storage Allowed.

END OF DOCUMENT
