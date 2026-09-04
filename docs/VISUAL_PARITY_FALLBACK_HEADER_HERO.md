# MotoristaOPS V2 — Header + Hero fallback parity report

Date: 2026-09-04
Scope: Header + Hero only
Golden Master: 1694x928

## Result

**STRUCTURAL CONVERGENCE: PASS**  
**BROWSER VERIFICATION: BLOCKED BY ENVIRONMENT POLICY**  
**PRODUCTION BASELINE: NOT YET PROMOTED**

The fallback loop was executed as HTML/CSS -> deterministic render -> screenshot -> pixel diff -> correction.
Five refinement loops corrected layout drift in header spacing, headline/paragraph rhythm, CTA wrapping, benefit-row vertical alignment, profile-card geometry and raster scaling.

Final full-frame ImageMagick AE mismatch at 10% fuzz: **12.843%**.

This raw number intentionally includes differences that should not be "fixed" by cheating: the production-facing proof uses the real provided portrait instead of copying the generated face from the Golden Master, and lower scene pixels containing source UI were deliberately omitted rather than rasterized into HTML.

## What is now proven

- The approved static visual can be decomposed into a real HTML/CSS composition without using the full screenshot as the page.
- Header, Hero copy, CTAs, benefit strip and profile card can be aligned against a fixed 1694x928 oracle.
- Raster scene assets must keep native geometry; stretching them was a primary source of drift.
- Visual QA must distinguish interface geometry from intentional photographic/raster substitutions.
- The environment's Chromium build blocks `file://`, loopback HTTP, mapped local hosts and `data:` URLs. A browser PASS cannot be claimed here.

## Gate

Do not proceed to the next landing section until the desktop Header + Hero is human-approved as the first visual baseline. Mobile remains a separate gate because no mobile Golden Master has been approved.
