# MotoristaOPS V2 — Header + Hero fallback parity report

Date: 2026-09-04
Scope: Header + Hero + trust strip
Status: CORRECTED BASELINE IN PROGRESS

## Correction

The previous Golden Master (1694x928 isolated hero) is **invalidated**.

The authoritative visual reference is now the full landing image supplied by the user on 2026-09-04 (`Landing page premium de motorista particular(2).png`). The pipeline must preserve the architecture of that complete page, not reinterpret the isolated hero as the page structure.

## Corrected first slice

The first corrected gate is the top slice of the supplied full-page reference:

- Header with official MotoristaOPS lockup.
- Hero with editorial copy on the left.
- Large vehicle/city scene on the right.
- Route graphic along the bottom of the hero.
- Four-column operational-principles strip immediately below.

## Fallback execution

A clean local proof was rebuilt from the corrected reference using:

`correct Golden Master -> semantic HTML/CSS -> deterministic render -> screenshot -> diff -> correction`

Four calibration loops were executed for:

- header/logo scale;
- nav and CTA spacing;
- condensed headline rhythm and line breaks;
- hero scene scale/position;
- paragraph and CTA vertical rhythm;
- trust-strip alignment.

The scene/photo and brand lockup are treated as image assets; headline, body copy, buttons, navigation and benefit content remain real HTML.

## Gate

The old parity PASS is revoked. Do not use the previous isolated-hero proof as a baseline.

The new top-section proof is the only active visual candidate and still requires human visual approval before the next section is promoted.

Mobile remains a separate gate.
