# MotoristaOPS V2 — Landing

Status: FULL-PAGE IMPLEMENTED / RELEASE GATED

Static V2 implementation built from the clean line. No V1 framework or dependencies were inherited.

## Current visual state

- Direction B / Night route is the selected full-page implementation direction.
- The Header uses an exact crop derived from the official MotoristaOPS master asset; the wordmark is not redrawn.
- The Hero image is still a **B2 candidate**, not the final production baseline, until vehicle-fidelity review is closed.
- Real HB20 photography is used in the proof section with plate privacy treatment.
- `perfil-normal` is used in the `Quem dirige` section.
- Verified review data is unavailable, so Social Proof is intentionally omitted.
- WhatsApp CTA labels are visible, but production `href` remains unset while the canonical number is BLOCKED in the public-data registry.

## Run locally

```bash
cd apps/landing
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Files

- `index.html` — page structure/content.
- `styles.css` — design system and responsive layout.
- `script.js` — mobile navigation and footer year only.
- `assets/` — optimized official brand assets, Hero B2 candidate and privacy-treated real photography.

## Release blockers

See `../../specs/landing-full-page-v0.1.md` and `../../specs/landing-data-registry-v0.1.md`.
