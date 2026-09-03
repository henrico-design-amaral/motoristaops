# MotoristaOPS V2 — Landing Implementation Baseline v0.1

Status: ACTIVE / REVERSIBLE

## Decision
The V2 landing bootstrap uses static semantic HTML + CSS and zero framework by default. JavaScript is added only for a proven interaction need.

## Why
- landing is content + conversion, not an application shell;
- minimizes cache/build/dependency debt during convergence;
- preserves easy portability to Hostinger/static hosting;
- makes visual QA independent from framework abstractions;
- prevents automatic inheritance of Astro from V1.

## Non-binding boundary
This is a bootstrap baseline, not a permanent ban on frameworks. A framework may be introduced only through a spec that proves a concrete requirement that static delivery cannot satisfy cleanly.

## Structure target
`apps/landing/`
- `index.html` — semantic page shell after baseline approval.
- `styles/` or a single `styles.css` while small.
- `assets/` — only approved, optimized public assets.
- optional minimal `scripts/` only when interaction needs it.

Explorations remain under `prototype-*` and never become production by rename alone.

## HTML rules
- one H1;
- semantic header/nav/main/section/footer;
- anchor navigation works without JS;
- no inaccessible clickable divs;
- images have alt treatment according to informational/decorative role;
- contact links come from confirmed data registry, never hardcoded from V1 guesses.

## CSS rules
- project tokens from DESIGN.md;
- mobile reflow at 320 CSS px minimum;
- no framework utility dependency in bootstrap;
- no fixed pixel layout that depends on a single screenshot;
- `prefers-reduced-motion` if motion is introduced;
- focus-visible states for interactive controls.

## Data rules
Public volatile data remains outside markup until confirmed by `landing-data-registry-v0.1.md`.

## Current local prototype
`apps/landing/prototype-v0.1/` is an evidence-only prototype using real local assets. It is NOT release code and may contain intentionally disabled/pending external links.

## QA
Current structural QA: PASS.
Rendered visual QA: PENDING because the current sandbox blocks Chromium navigation to file:// and localhost. Do not report visual PASS until a render-capable surface validates desktop/mobile.

## Promotion gate
Prototype -> production requires:
1. approved Hero baseline;
2. approved section composition;
3. confirmed public contact data;
4. asset privacy/optimization pass;
5. desktop/mobile visual QA;
6. accessibility checks;
7. explicit release authorization.
