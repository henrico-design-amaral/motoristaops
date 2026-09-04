# MotoristaOPS — Visual Decoupage Contract — Landing V2

Status: IMPLEMENTATION BASELINE
Date: 2026-09-04
Surface: Landing pública
Output modality: IMAGE-TO-CODE / RESPONSIVE WEB
Fidelity: ADAPTIVE

## Source artifacts

- approved/reference full-page composition supplied in the 2026-09-04 task;
- approved/reference cinematic hero supplied in the 2026-09-04 task;
- curation document “Curadoria aplicada — MotoristaOPS” supplied in the same task;
- `DESIGN.md`, `STYLE_GUIDE.md`, `VISUAL_LOCK.json`, Brand Book V12 and official assets.

## Intent

Correct the identity drift of the current public page and make the Landing read unmistakably as MotoristaOPS: premium functional, human, direct, rooted in real São Paulo, with visible method and trust before the ride.

Primary conversion: WhatsApp.

## Protected anchors

1. Official compact horizontal MotoristaOPS signature in the header; no reconstructed identity.
2. Canonical palette: Noite/Grafite, Marfim, Champagne; Âmbar only for route/signaling semantics.
3. Instrument Sans Variable for editorial/UI typography.
4. Hero built from the supplied São Paulo night/black Hyundai image.
5. Main proposition: “Seu compromisso começa antes do destino.”
6. Dark cinematic public surface, thin route-line motifs, restrained borders and no SaaS/card-wall aesthetic.
7. Narrative order: header -> hero -> microbenefits -> services -> advance booking -> process -> quality -> behavioral proof -> driver -> final CTA -> footer.
8. Ivory contrast section for behavioral proof.
9. Real portrait of Henrico Amaral in “Quem dirige”.
10. No unsupported metric or luxury claim.

## Adaptive transformations

- The reference’s condensed display type is not reproduced because current visual authority locks Instrument Sans Variable.
- Service/benefit icons are omitted rather than inventing or mixing icon families without official icon authority.
- Unsupported claims visible in the reference are removed; only current repository facts may be rendered.
- Desktop composition is reflowed, not mechanically scaled, for tablet/mobile.
- A persistent mobile WhatsApp action is allowed because the canonical Landing contract requires WhatsApp to remain accessible.

## Information architecture

1. Header fixed and discreet.
2. Hero cinematic + primary WhatsApp CTA + secondary “Como funciona”.
3. Four microbenefits: compromisso, comunicação, cuidado, discrição.
4. Six service use cases.
5. “Por que combinar antes?” with four reasons.
6. Four-step process timeline.
7. Five operational criteria.
8. Four behavioral proof blocks on ivory.
9. “Quem dirige” with portrait and current trust facts.
10. Final WhatsApp CTA.
11. Footer with canonical channels.

## Responsive contract

- Desktop: split hero, three-column service grid, editorial/timeline layouts.
- Tablet: reduce column count while preserving reading order and CTA priority.
- Mobile: single-column narrative, large readable type, 48px+ primary targets, no horizontal overflow, fixed WhatsApp action.
- Hero image crop preserves vehicle/city atmosphere while keeping copy legible.

## Motion contract

Allowed: short hero scale-in, fade-up reveals, subtle card lift, route/timeline progress and header blur-on-scroll.

Forbidden: heavy parallax, neon glow, infinite pulse, scroll hijacking, typing effect, vehicle-running animation or any motion that delays CTA.

Reduced-motion preference disables non-essential motion.

## Acceptance criteria

- MotoristaOPS official identity is primary and correctly spelled.
- WhatsApp is visible in the first fold and uses canonical `driverProfile` data.
- Headline is understood in under five seconds.
- Supplied hero image is the visual anchor.
- New “Por que combinar antes?” section exists.
- Process is represented as a four-step progressive timeline.
- No unsupported metrics or invented claims are present.
- No ad-hoc icon family is introduced.
- Desktop/tablet/mobile preserve the narrative and conversion path.
- WCAG 2.2 AA project baseline is respected, including focus, reflow and reduced motion.
- Public build remains isolated from dashboard routes/data through the canonical split build.
