# MotoristaOPS V2 — Correct Full-Page Baseline

Date: 2026-09-04
Status: ACTIVE VISUAL BASELINE / FALLBACK IMPLEMENTATION

## Source of truth

The only active visual authority is the full-page image supplied by the user on 2026-09-04:

`Landing page premium de motorista particular(2).png`

All previous isolated-Hero visual baselines are invalid and must not be used.

## Rebuilt structure

The fallback implementation reproduces the complete page architecture visible in that source:

1. Header
2. Hero with vehicle/city scene
3. Four-principle strip
4. Services / `O que ofereço`
5. `O que funciona` process block
6. Operational quality block
7. Light differentiators block
8. `Quem dirige`
9. Final CTA
10. Footer

## Technical proof

Desktop QA viewport: `682 x 2048` CSS px.

Measured final page geometry:

- scroll width: `682`
- scroll height: `2048`
- header bottom: `64`
- hero bottom: `431`
- principles bottom: `550`
- services bottom: `943.2`
- process bottom: `1185.2`
- quality bottom: `1407.2`
- differentiators bottom: `1644.2`
- driver bottom: `1824.2`
- CTA bottom: `1944.2`
- footer bottom: `2048.2`

Mobile structural QA was also executed at `390 px` width:

- no horizontal overflow
- responsive stacking works
- menu open/close interaction probe passed

## Visual QA status

Fallback local visual comparison is complete. The implementation uses live HTML for copy, navigation, cards, CTAs and content. Image assets are limited to visual content from the supplied source such as the official lockup, vehicle/city scene, portrait and route/map decoration.

The Product Design cloud-browser QA remains unavailable in this chat, therefore the official Product Design result is still `blocked`, not `passed`.

## Drive synchronization

The corrected self-contained HTML implementation has been synchronized to the existing MotoristaOPS V2 Drive folder:

`MotoristaOPS_V2 / landing-page-local / index.html`

## Rule

Do not restore or inherit the previous isolated-Hero implementation. Any next iteration must compare against the full-page source above.
