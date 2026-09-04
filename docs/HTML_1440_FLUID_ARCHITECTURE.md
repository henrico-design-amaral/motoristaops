# MotoristaOPS V2 — HTML 1440 Fluid Architecture

Status: ACTIVE STRUCTURAL BASELINE
Date: 2026-09-04
Branch: `v2/visual-parity-pipeline`

## Why this contract exists

The prior fallback treated the approved 682 px-wide static visual as a proportional artboard and scaled typography, section heights and spacing together. That approach is invalid for the MotoristaOPS public landing because it produces an enlarged mockup instead of a real responsive web layout.

The approved visual remains the composition authority, but HTML must implement its relationships using a native web layout.

## Structural contract

1. **Page surfaces are full width.** Section backgrounds extend through the viewport.
2. **Normal interface content uses one continuous centered shell capped at 1440 px.**
3. **The Hero photography is independent from the 1440 content shell and is full-bleed.** It must cover the complete viewport from edge to edge, including behind the header.
4. **The Hero background does not cap at 1440 px.** On wider monitors, more of the same continuous panorama is revealed/covered; the interface content remains centered and capped at 1440 px.
5. **The Hero must never look like a boxed image, isolated car crop, or finite 1440 canvas.** Landscape, road, skyline and lighting must remain visually continuous at both edges.
6. **Territorial anchor is locked:** Sao Paulo, Ponte Estaiada Octavio Frias de Oliveira / Marginal Pinheiros skyline, night atmosphere, black HB20 integrated into the scene.
7. **The header floats over the same Hero photography.** The image begins at the top of the page, not below the header.
8. **A left reading scrim may be used only for legibility.** It must not create a visible image boundary or replace photographic continuity.
9. **Do not reintroduce artboard scaling.** Root font size, section heights and spacing must not be derived proportionally from the 682 px source mockup.
10. **Section heights are content driven**, using responsive padding and grid changes.
11. **Desktop content reference is 1440 px.** Mobile is a separate responsive composition.
12. **No horizontal overflow** at desktop, wide desktop or mobile.

## Brand/system constraints preserved

- Noite `#070709`
- Grafite `#151518`
- Champagne `#C79C5B`
- Champagne Sombra `#947546`
- Marfim `#F3EFE4`
- Pedra `#A6A39E`
- Ambar `#F0B44D` reserved for route/signalling elements
- **Instrument Sans Variable is the only interface/display family for this landing.** Do not introduce Bebas, Oswald, Anton, DIN Condensed or another display family to imitate the raster reference.
- Official MotoristaOPS lockup as a raster/image asset; never redraw the logo in CSS or generate replacement vector artwork.
- Official icon family: outline/monoline, 24x24 source geometry, stroke 1.75, rounded joins/terminals, consistent family. Use approved raster/icon assets; do not handcraft SVG/CSS icons.
- Real Henrico Amaral portrait in `Quem dirige`.
- No invented reviews, metrics, awards or customer claims.

## Hero territory contract

The Hero photography must express the visual territory already established for MotoristaOPS:

- Ponte Estaiada / Marginal Pinheiros as recognizable Sao Paulo anchor;
- black HB20 as the real service vehicle language;
- city-at-night documentary-premium atmosphere;
- deep blacks, low saturation and controlled warm highlights;
- road and skyline continuing through the entire panorama;
- car integrated into the environment rather than pasted into a separate box;
- left side calmer/darker for copy without eliminating the scenery;
- no generic street, limousine, supercar, neon/cyberpunk or generic luxury-dealership aesthetic.

## Reference principles applied

- Dramatic Hero contrast via a controlled reading scrim, while the photographic scene remains continuous.
- Controlled editorial density and a breathable modular grid rather than generic SaaS card density.
- Realistic/documentary service imagery and personal operator accountability.
- Continuous composition across the entire landing rather than independently scaled blocks.

## Rule for future agents

Do not solve visual parity by making the webpage the same pixel dimensions as the static reference. Preserve the **composition**, the **territory**, and the **responsive behavior** — not the source-image coordinate system.
