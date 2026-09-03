# Spec — Landing V2 Full Page

Status: IMPLEMENTED — RELEASE BLOCKED BY DATA/FIDELITY GATES
Date: 2026-09-03
Surface: Landing

## Context
The V2 must materialize MotoristaOPS as a real private-driver service without inheriting V1 code or UI. The approved direction is dark, controlled and service-led. The brand mark must come from the official asset, not a reconstructed logo.

## Objective
Deliver one complete, responsive public landing page that makes the service understandable and creates a clear path to WhatsApp contact.

## Scope
- sticky header with exact official wordmark crop and WhatsApp CTA label;
- selected B2 night/urban hero direction (candidate until final vehicle-fidelity gate);
- concise service proposition;
- service occasions;
- how it works;
- five MotoristaOPS operational pillars;
- real vehicle proof using provided photos;
- driver section using the provided portrait;
- social-proof fallback: section omitted while verified reviews are unavailable;
- final CTA and footer;
- desktop/mobile responsive behavior;
- WCAG 2.2 AA-oriented implementation.

## Non-goals
- authentication;
- dashboard implementation;
- language/theme toggles;
- invented reviews, ratings, client counts or availability promises;
- V1 code migration;
- redesign of the official logo.

## Content truth rules
- Brand: MotoristaOPS.
- Category: MOTORISTA PARTICULAR.
- Signature: por Henrico Amaral.
- Slogan: Levando pessoas, cuidando de histórias.
- WhatsApp CTA labels are rendered, but href remains unset while the V2 public-data registry keeps the canonical number BLOCKED.
- Instagram and Google/Maps links remain omitted until their V2 registry states are confirmed.
- Public geography is not asserted while the current service-region field remains CANDIDATE.
- No volatile Uber rating is displayed in V2.

## Acceptance
- no overlap or horizontal scroll at 1440, 1024, 768, 430, 390, 375 and 320 px;
- primary CTA visible in hero and persistent in header;
- navigation works with keyboard and mobile menu;
- wordmark and footer lockup derive from the official master asset;
- no fabricated social proof; blocked review/Google data omitted;
- meaningful alt text and visible focus;
- reduced-motion respected;
- Lighthouse-style baseline: semantic headings, no obvious accessibility blockers, optimized raster assets.

## Release blockers
- canonical WhatsApp number confirmation;
- Instagram link verification;
- Google Business/Maps ownership verification;
- final Hero vehicle-fidelity review before production baseline.

## Wireframe convergence
- Header -> Hero -> Microbenefits -> Services -> How it works -> Experience/Differentiators -> Real proof -> Who drives -> Social proof fallback -> Final CTA -> Footer.
- Social proof is omitted because the current registry marks reviews BLOCKED.
- The implementation uses the approved `perfil-normal` portrait candidate for Who drives.
- Vehicle proof uses real HB20 photographs with plate privacy treatment.
- Header uses an exact crop from the official master wordmark asset; no wordmark is redrawn.
