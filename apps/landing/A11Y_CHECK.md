# WS-011 — A11Y Check

Status: STATIC AA PASS / VISUAL INTERACTION QA PENDING
Updated: 2026-09-03
Target: WCAG 2.2 AA

## Contrast evidence

| Pair | Ratio | Result |
| --- | ---: | --- |
| Marfim `#F3EFE4` / Noite `#070709` | 17.52:1 | PASS |
| Pedra `#A6A39E` / Noite `#070709` | 8.01:1 | PASS |
| Champagne `#C79C5B` / Noite `#070709` | 7.99:1 | PASS |
| Body `#C7C3BA` / Noite `#070709` | 11.45:1 | PASS |
| Footer `#AAA69F` / `#060608` | 8.35:1 | PASS |
| Footer bottom `#807D77` / `#060608` | 4.93:1 | PASS |
| Light body `#55514A` / Marfim `#F3EFE4` | 6.87:1 | PASS |
| Champagne shadow `#806137` / Marfim `#F3EFE4` | 4.96:1 | PASS |
| Button text `#0B0B0C` / Champagne `#C79C5B` | 7.81:1 | PASS |

## Structural checks

- Skip link exists.
- Visible `:focus-visible` treatment exists.
- Mobile menu button exposes `aria-expanded` and `aria-controls`.
- Primary navigation has an accessible label.
- Decorative route SVGs are hidden from assistive technology.
- Informative portrait/logo images include alt text.
- Motion is disabled/reduced under `prefers-reduced-motion`.
- Semantic headings and section labels are present.

## Pending visual interaction evidence

A trustworthy browser renderer still needs to confirm focus order, menu overlay behavior, reflow/zoom and touch targets in the current runtime build. This remains part of the visual gate and is not claimed as completed.
