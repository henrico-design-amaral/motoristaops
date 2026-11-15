# Design QA — MotoristaOPS V2 literal

**Source visual truth path**

`v2/assets/motoristaops-v2-reference.png`

**Implementation screenshot path**

`v2/qa/literal-reference-1086x1448.png`

**Combined comparison evidence**

`v2/qa/comparison-literal-1086x1448.png` (source at left, browser render at right)

**Viewport and normalization**

- CSS viewport: 1086 × 1448 px.
- Source pixels: 1086 × 1448 RGB PNG.
- Implementation capture: 1086 × 1448 px, browser capture encoded by the in-app browser as baseline JPEG despite the `.png` evidence filename.
- Device scale factor: 1.
- State: initial Portuguese page, no focus, no typed fields.
- Source SHA-256: `BC85DEA5D68EF5959A28A9ECCDD6494919E7AD69D3E41C5D14E594DF2FDD19A1`.

**Full-view comparison**

The implementation renders the approved source PNG itself as the only visible layer. The artboard, crop, typography, copy, palette, imagery, iconography, card geometry, spacing, and section order therefore inherit the source pixels without reinterpretation. Transparent semantic hotspots and form inputs add interaction without changing the initial visible state.

The side-by-side evidence shows the same 3:4 composition. The right-hand evidence is softer because the browser capture API re-encoded the screenshot as JPEG; this is a capture artifact, not an implementation asset. The deployed page requests the original PNG whose exact dimensions and SHA-256 are enforced by CI.

**Focused-region comparison**

No separate crop was required after the full artboard was verified at native 1:1 pixels: every visible region comes from the same unmodified source raster. Particular attention was given to the hero, the vehicle row, the FAQ/form area, and the footer; no independently rendered visible layer overlaps those areas in the initial state.

**Required fidelity surfaces**

- Fonts and typography: exact source pixels; no HTML type is visible in the initial state.
- Spacing and layout rhythm: exact source pixels at the 1086 × 1448 reference viewport; proportional scaling at other widths.
- Colors and visual tokens: exact source pixels; the page background is `#151518` only outside the artboard.
- Image quality and asset fidelity: CI locks the original 2,690,284-byte PNG by SHA-256 and 1086 × 1448 dimensions before upload. Hostinger rewrites lossless PNG metadata, so the public gate compares decoded pixels and requires PSNR `average:inf` (zero pixel difference).
- Copy and content: exact source pixels; accessible labels mirror the visible controls.
- Interactions: internal section anchors update the hash; the local form fields accept input; the form prepares a WhatsApp message; no console errors were found.

**Comparison history**

1. Pass 1 — blocked.
   - [P1] A 15 px browser scrollbar reduced the rendered artboard to 1071 px wide.
   - [P1] Native date/time controls became visible over the reference form.
   - Fixes: hid the browser scrollbar while preserving scrolling behavior; changed date/time overlays to transparent text inputs.
   - Evidence: first browser capture in the QA session.
2. Pass 2 — passed.
   - Post-fix render measured 1086 × 1448.
   - The reference form returned to its exact source appearance.
   - No actionable P0/P1/P2 mismatch remained. The only visible difference in the stored comparison is browser-capture JPEG softness, classified as evidence encoding rather than product drift.

**Implementation checklist**

- [x] Literal source asset copied into the versioned V2 surface.
- [x] Visible reconstruction removed.
- [x] Native 1086 × 1448 browser render captured.
- [x] Navigation and local form input tested.
- [x] Browser console checked: no errors.
- [x] CI checks source dimensions and SHA-256.
- [x] Public CDN image verified by decoded pixel identity.

final result: passed
