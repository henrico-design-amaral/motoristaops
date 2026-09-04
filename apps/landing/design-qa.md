# MotoristaOPS V2 — Design QA

source visual truth: `Landing page premium de motorista particular(2).png`
viewport: `682 x 2048 CSS px`
source pixels: `682 x 2048`
implementation pixels: `682 x 2048`
deviceScaleFactor: `1`
state: desktop default

## Findings

- [P2] Exact production display-font rendering is not yet provable in this chat. The CSS prefers `Bebas Neue` with condensed fallbacks; the fallback renderer cannot verify the remote production webfont load.
- [P3] Small icons use a real icon library but are not yet the exact MotoristaOPS outline set.
- [P3] Minor photographic crop/tonality drift may remain around the Hero scene edge after removing rasterized source text contamination.

## Required fidelity surfaces

- Fonts and typography: hierarchy and wrapping match the intended condensed editorial direction; exact production family still requires browser verification.
- Spacing and layout rhythm: full desktop composition is calibrated to the same `682 x 2048` frame as the source.
- Colors and visual tokens: dark Noite/Graphite surfaces, Champagne accents and Ivory contrast follow the source.
- Image fidelity: source-image assets are used only for true image content; the screenshot is not used as the whole page.
- Copy/content: page-specific headings, services, steps, quality principles, driver block, CTA and footer are live HTML.

## Responsive QA

At `390 px` width:

- `scrollW = 390`
- no horizontal overflow
- responsive stacking works
- menu interaction probe: `opened=true`, `closed=true`

## Comparison history

1. Previous isolated-Hero baseline was revoked after user correction.
2. Full-page reference was rebuilt from zero as live HTML/CSS.
3. Desktop section heights were calibrated to match the `2048 px` source frame.
4. Header lockup and Hero scene geometry were recalibrated.
5. Rasterized UI/source text was removed from image assets.
6. Route/map decoration was isolated from text-free regions of the approved source.
7. Mobile structure and menu interaction were verified in the fallback renderer.

final result: blocked

Blocker: official Product Design cloud-browser verification is unavailable in this chat. The fallback local Chromium/CDP visual comparison is complete but cannot be promoted to the Product Design `passed` state here.
