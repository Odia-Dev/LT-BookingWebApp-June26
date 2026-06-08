# RELEASE REPORT (v2.0.5)

**Date:** 2026-06-06  
**Version:** v2.0.5-homepage-enhanced  
**Repository:** https://github.com/Odia-Dev/LT-BookingWebApp-June26  

---

## 1. Files Changed

* **Application Core:**
  * `src/app/page.tsx` — Homepage implementation including Hero, Trust signals, Vehicles, Mobile Sticky CTA, and FAQ list.
  * `src/components/ui/Button.tsx` — Button styling and color contrast adjustment.
* **Media Assets:**
  * `public/media/toyota_glanza.png` — Real showroom image for Glanza & Rumion.
  * `public/media/toyota_hyryder.png` — Real showroom image for Hyryder, Taisor, & Camry.
  * `public/media/toyota_fortuner.png` — Real showroom image for Fortuner, Hilux, & Land Cruiser.
  * `public/media/toyota_vellfire.png` — Real showroom image for Vellfire, Innova Crysta, & Innova Hycross.
  * `public/media/toyota_hero_showcase.png` — High-quality showcase image for the hero banner.
* **Reports and Documentation:**
  * `docs/CHANGELOG.md` — Changelog updated with version 2.0.5 entry and version bumped.
  * `HOMEPAGE_ENHANCEMENT_REPORT.md` (and copy in `docs/`) — Details of homepage enhancements.
  * `UI_CONTRAST_FIX_REPORT.md` (and copy in `docs/`) — Report of contrast changes.

---

## 2. Components Updated

* **Hero Section:** Enhanced headline ("Drive Home Your New Toyota Today"), subheadline, CTAs ("Book Test Drive", "View Vehicles"), and a premium hero showcase image.
* **Trust Signals Section:** Structured grid directly below the hero detailing dealer credentials: 10+ Cities Across Odisha, Finance/Exchange assistance, Genuine Service, and Certified Sales Team.
* **Vehicle Showcase Grid:** Updated 12 official models with real, high-quality images and specific mock details.
* **Mobile Sticky CTA:** Added responsive overlay (`fixed bottom-0 left-0 right-0 md:hidden`) containing reservation status and a primary "Book Now" CTA, protected by bottom-margin spacing in the footer.
* **Button UI:** Fixed button color contrast to ensure WCAG AA compliance.

---

## 3. Performance Impact

* **Bundle Size:** Build compiled at **7.18 kB** (First Load JS: **110 kB**).
* **LCP Optimization:** Hero showcase image loads with Next.js image optimization and `priority={true}` to minimize LCP delay.
* **Lazy Loading:** All vehicle catalog cards utilize `loading="lazy"` to defer image fetches outside the viewport.

---

## 4. SEO Impact

* Added unique metadata hooks, descriptive keywords, structured localized headings, and index-friendly semantic structure.

---

## 5. AI Search Impact

* Formatted common questions in a clean FAQ list pattern and maintained distinct, machine-readable trust signals.

---

## 6. Release Credentials

* **Git Commit Hash:** `7e1fe4c594c097943e04701699e64a792357a05d`
* **Git Tag:** `v2.0.5-homepage-enhanced`
* **Repository Push Status:** SUCCESS (Main branch and tag pushed to remote)

---

## 7. Status

* **Release Status:** SUCCESS
* **Ready For Phase 3A:** YES
