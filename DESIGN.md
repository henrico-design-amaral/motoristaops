# MotoristaOPS — DESIGN

Status: ACTIVE EXECUTION RESOLVER  
Version: Brand Book V2 / 2026-09-18  
Authority: MotoristaOPS + HenricoOPS

## Purpose

This file is the executable visual resolver for MotoristaOPS. It does not create a second brand authority. It translates the operator-approved Brand Book V2 decisions into constraints that an executor can load before producing any visual artifact.

## Authority order

1. Current explicit operator-approved decision.
2. MotoristaOPS Brand Book V2, approved decisions effective 2026-09-18.
3. This `DESIGN.md` execution map.
4. `design/tokens.json` and `VISUAL_LOCK.json`.
5. Canonical iconography contract in `source/ICONOGRAPHY.md`.
6. Approved Pattern Masters / Golden Artifacts / Golden Screens.
7. Approved task-specific references.
8. External references and provider-native defaults.

Brand Book V12 is historical/legacy support only where Brand Book V2 is silent and no conflict exists. It may not silently override a newer V2 decision.

## Identity and point of view

- Canonical public name: **MotoristaOPS**.
- Service/passenger/context are the center of the communication.
- Henrico is the discreet operator behind the experience, not the default visual protagonist.
- The visual system should communicate quiet service, planning, care, discretion and real operation.
- Evidence before promise. Real context before generic aspiration.
- External references may teach mechanism; they do not replace MotoristaOPS identity.

## Typography

- **Instrument Sans** is the dominant family for body, interface, labels, functional text and the majority of branded communication.
- **Bebas Neue** is editorial/display only when the composition calls for it.
- Bebas Neue is forbidden for functional UI/body copy.
- Do not introduce substitute display/body families by provider preference.

## Color

Semantic palette:
- Noite `#070709` — primary dark canvas.
- Grafite `#151518` — dark surface / ink role.
- Champagne `#C79C5B` — principal brand accent.
- Champagne Sombra `#947546` — supporting accent / darker semantic role.
- Marfim `#F3EFE4` — primary light surface.
- Pedra `#A6A39E` — secondary/muted role.
- Âmbar de Percurso `#F0B44D` — route, location, pin and path semantics only.

Rules:
- Color is semantic, not decorative quota.
- Champagne must not become a dominant flood color.
- Âmbar is not a generic highlight color.
- Off-palette colors require explicit authority.

## Grid, spacing and density

- Base spacing follows the approved 4/8 px rhythm.
- Editorial/social baseline uses a 6-column grid; approved social baseline includes 72 px outer margin and 24 px gutter where the format supports it.
- Web/responsive execution uses the approved desktop/mobile grid contracts; do not invent a new grid per page.
- Composition must preserve breathing room and one clearly dominant area.
- Avoid cramped, wall-of-cards or dashboard-like density in public brand communication.

## Logo and signature presence

Three approved presence levels:
- **L1 — Silent:** discreet signature/support.
- **L2 — Support:** visible but subordinate to the message/service.
- **L3 — Protagonist:** logo/crest is intentionally the main subject.

The task must select one level. Logo scale/position may not drift arbitrarily between artifacts.

Official identity assets are protected. If an exact asset is unavailable to the renderer, do not redraw, approximate, rebuild or ask a generative model to synthesize it.

## Iconography

The canonical functional icon family is **Lucide Icons**, governed by `source/ICONOGRAPHY.md`.

Key invariants:
- native 24x24;
- outline/monoline;
- stroke 1.75;
- rounded caps/joins;
- fill none;
- currentColor;
- 24 px actions/metadata, 32 px services/process, 40–46 px principles/differentiators;
- Champagne on dark surfaces, Grafite on light surfaces, Âmbar only for route/location/path.

Do not mix icon packs. External brand marks remain their official marks and are not Lucide pictograms.

## Photography

- Real people, real vehicle and real service context are preferred evidence.
- Treatment principle: **correct, do not transform**.
- Do not slim, beautify, smooth or materially alter Henrico's real appearance.
- Preserve tattoos and real physical characteristics when Henrico is present.
- Avoid stock imagery replacing available real proof.
- Henrico should normally appear as part of the environment/operation rather than as the center of attention.

## Graphic language and composition

Default narrative grammar:
`situation -> idea -> service -> signature`

- One dominant area per composition.
- Hierarchy through type, contrast, spacing, framing and real imagery.
- Route/path language is restrained and semantic, not decorative telemetry.
- Avoid generic SaaS card walls, limousine/luxury clichés, cyberpunk/neon and decorative visual noise.
- A new format transforms an approved visual family; it does not restart from a blank canvas.

## Motion

Motion observes; it does not perform.
- restrained;
- short;
- supports hierarchy/continuity;
- never competes with the service/message;
- reduced-motion behavior is required when applicable.

## Branded generative media rule

MotoristaOPS is **fail-closed** for locked brand layers.

Classify output layers:
- `OFFICIAL_ASSET_REQUIRED`: logo, wordmark, crest, signature, external brand marks and protected approved imagery.
- `DETERMINISTIC_REQUIRED`: visible branded text, typography, QR codes, exact colors, grid, spacing, composition anchors, CTA/legal/commercial information.
- `GENERATIVE_ALLOWED`: only photography/illustration/atmosphere explicitly allowed by this project lock.

A free-form image/video model may generate the allowed media layer. It may not generate the MotoristaOPS identity layer.

If a renderer cannot consume the exact official asset, the workflow must split:
`generate allowed media -> deterministic brand composition -> brand QA`.

If deterministic composition is unavailable, return a blocked/partial result rather than an invented branded image.

## Prohibited drift

Blocked unless explicitly re-authorized:
- blank-canvas reinterpretation of MotoristaOPS;
- invented logo, wordmark, crest, vector or signature;
- approximate brand colors;
- mixed icon families;
- generic luxury/limousine imagery;
- cyberpunk/neon treatment;
- excessive logo repetition;
- excessive Champagne;
- unauthorized filters or gradients;
- Bebas Neue used as functional/body type;
- stock replacing real proof;
- driver-as-hero default composition;
- provider/editor template defaults overriding this file;
- generative rendering of official brand identity.

## Channel rule

Each channel is executed natively, but the brand grammar remains constant.

A feed post, Story, LinkedIn document, print piece, wallpaper, landing page, dashboard or video may transform layout for its format, but may not change:
- identity assets;
- typography families/roles;
- semantic palette;
- icon family;
- core graphic language;
- protected composition hierarchy;
- approved service/passenger point of view.

## Required preflight

Before visual production:
1. Resolve `VISUAL_LOCK.json`.
2. Resolve this `DESIGN.md`.
3. Resolve `design/tokens.json`.
4. Resolve official assets needed for the task.
5. Resolve applicable Pattern Master/baseline when one exists.
6. Confirm renderer capability for locked layers.
7. Only then produce.

If the lock is not READY, production is blocked until reconciliation.

## Acceptance

A MotoristaOPS visual artifact passes only when:
- exact brand identity is preserved;
- no locked decision was invented by the renderer;
- type and color roles match this contract;
- iconography is canonical;
- composition reflects service/passenger-first logic;
- format transformation is authorized;
- applicable visual QA passes.
