# MotoristaOPS V2 — HTML 1440 Fluid Architecture

Status: ACTIVE STRUCTURAL BASELINE
Date: 2026-09-04
Branch: `v2/visual-parity-pipeline`

## Why this contract exists

The prior fallback treated the approved 682 px-wide static visual as a proportional artboard and scaled typography, section heights and spacing together. That approach is invalid for the MotoristaOPS public landing because it produces an enlarged mockup instead of a real responsive web layout.

The approved visual remains the composition authority, but HTML must implement its relationships using a native web layout.

## Structural contract

1. **Page surfaces are full width.** Section backgrounds extend through the viewport.
2. **Normal content uses one continuous centered shell capped at 1440 px.**
3. **The Hero media is independent from the content shell.** Its visual canvas may breathe across the viewport but never scales beyond its real 1440 px canvas.
4. **At viewports wider than 1440 px**, both the content shell and Hero canvas remain centered at 1440 px while the surrounding viewport resolves to Noite `#070709`.
5. **Hero edges dissolve organically into the page background** through bilateral masking plus a left-side reading scrim. Do not show a hard image rectangle.
6. **Do not reintroduce artboard scaling.** Root font size, section heights and spacing must not be derived proportionally from the 682 px source mockup.
7. **Section heights are content driven**, using responsive padding and grid changes.
8. **Desktop reference viewport is 1440 px.** Wide desktop must preserve the 1440 cap; mobile is a separate responsive composition.
9. **No horizontal overflow** at 1440, 1920 or 390 px.

## Brand/system constraints preserved

- Noite `#070709`
- Grafite `#151518`
- Champagne `#C79C5B`
- Champagne Sombra `#947546`
- Marfim `#F3EFE4`
- Pedra `#A6A39E`
- Âmbar `#F0B44D` reserved for route/signalling elements
- Instrument Sans for operational/UI/body typography
- Official MotoristaOPS lockup as an asset; never redraw the logo in CSS
- Real Henrico Amaral portrait in `Quem dirige`
- No invented reviews, metrics, awards or customer claims

## Reference principles applied

- Dramatic Hero contrast via a deep reading scrim, with the vehicle/city image bleeding to the right.
- Controlled editorial density and a breathable modular grid rather than generic SaaS card density.
- Realistic/documentary service imagery and personal operator accountability.
- Continuous composition across the entire landing rather than independently scaled blocks.

## QA evidence

Local fallback checks on the current architecture:

- 1440 viewport: shell = 1440 px; Hero canvas = 1440 px; no horizontal overflow.
- 1920 viewport: shell = 1440 px; Hero canvas = 1440 px; no horizontal overflow.
- 390 viewport: shell = 390 px; no horizontal overflow; mobile navigation activation works.

The local artifact contains `design-qa.md`, browser-rendered screenshots and geometry evidence. Mobile remains a resilience gate until a dedicated mobile Golden Master is approved.

## Rule for future agents

Do not solve visual parity by making the webpage the same pixel dimensions as the static reference. Preserve the **composition**, not the source-image coordinate system.
