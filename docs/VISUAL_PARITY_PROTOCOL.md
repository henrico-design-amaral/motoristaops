# MotoristaOPS V2 — Visual Parity Protocol

Status: REQUIRED FOR LANDING IMPLEMENTATION

## Problem this protocol solves

A static visual contains pixels, but not DOM structure, CSS constraints, responsive behavior, font metrics, semantic hierarchy, interaction states or breakpoints. Prompting an AI to "make this in HTML" asks it to infer all of those missing constraints at once. Repeating the translation through image -> prompt -> Figma -> prompt -> HTML compounds drift.

The V2 landing must therefore use the approved static visual as a **golden visual oracle**, not as loose inspiration.

## Pipeline

1. **Freeze the approved reference**
   - The approved visual is versioned as a golden reference.
   - Official logos, photographs and brand assets remain separate assets.

2. **Decompose by section**
   - Header + Hero
   - value / trust strip
   - services
   - how it works
   - operational quality
   - differentiators
   - who drives
   - final CTA + footer

3. **Generate only a scaffold**
   - Screenshot-to-code tools may create a first DOM/CSS hypothesis.
   - Their output is never accepted as final without visual comparison.

4. **Browser is implementation truth**
   - Render the actual page in Chromium.
   - Disable animation and other non-deterministic rendering during capture.

5. **Visual diff loop**
   - Capture using Playwright.
   - Normalize to the reference dimensions.
   - Compare pixel-by-pixel with Pixelmatch.
   - Produce `actual`, `diff`, `overlay` and `report.json`.
   - Fix the largest mismatching region first.
   - Repeat until the section is visually converged.

6. **Section-level gates**
   - A section must pass before implementation proceeds to the next section.
   - Full-page parity is a final integration check, not the only check.

7. **Responsive pass is separate**
   - Desktop parity does not imply mobile correctness.
   - Mobile must have its own approved visual reference and golden screenshots.

## Acceptance

Initial automated tolerance: <= 8% mismatched pixels at threshold 0.10.
This is a guardrail, not a substitute for human visual review. Text antialiasing and raster effects can create harmless pixel noise. Brand identity, hierarchy, alignment and composition remain human gates.

## Tooling

Local commands under `tools/visual-parity/`:

- `npm run capture` — capture the real browser output.
- `npm run diff` — compare current capture with the approved reference.
- `npm run parity` — run capture + diff in sequence.

The visual parity gate should later be added to CI after the first implementation baseline is stable.
