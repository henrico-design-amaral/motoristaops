# MotoristaOPS Design Authority

Status: ACTIVE CONTRACT
Updated: 2026-08-29

## Purpose

This file does not invent a new MotoristaOPS identity. It defines how an executor must resolve and preserve current visual authority before generating or implementing visual work.

## Authority order

For a visual task, use this order:

1. explicit current project decisions and approved artifacts for the requested surface;
2. Brand Book V12 and official brand assets when resolved through the current project/HenricoOPS source mapping;
3. current MotoristaOPS implementation when it represents an already approved/shipped surface;
4. current MotoristaOPS project references/brand context resolved through HenricoOPS and the project Drive mapping;
5. current project control/non-goals;
6. historical explorations and superseded studies only as provenance or anti-reference.

Old studies must not become canonical merely because they contain detailed typography, palette or logo instructions.

## Mandatory preflight

Before generating an image, page, component, campaign or frontend code, resolve:

- surface: Landing, Dashboard or Social;
- canonical human identity when used: `Henrico Amaral`;
- current Brand Book/logo authority;
- current typography authority;
- current palette authority;
- official imagery/iconography authority if applicable;
- approved reference pack or source artifact;
- output modality;
- current stage;
- fidelity mode when an approved artifact exists.

If a required visual authority is conflicting or cannot be resolved, **do not invent replacements**. Mark the visual task `BLOCKED — visual authority unresolved` and identify the conflict.

## Surface rules

### Landing

Public/commercial. Minimal, memorable, high-impact and specific to the real MotoristaOPS service. Do not use dashboard density or generic software-product aesthetics as a shortcut.

### Dashboard

Operational. Prioritize scanability, hierarchy, reliable information and task completion. It shares brand anchors with the ecosystem but may use a distinct operational composition/density.

### Social

Extends the public brand and approved campaign language. It must not become an independent identity.

## Approved visual -> decoupage -> implementation

When a visual artifact is explicitly approved as the basis for implementation, it becomes a fidelity baseline, **not a complete production specification**.

Before code, resolve a Visual Decoupage Contract through HenricoOPS with:

- source artifact;
- approval record/date;
- `STRICT`, `ADAPTIVE` or `DIRECTIONAL` mode;
- protected anchors;
- user/business intent;
- information architecture;
- section order and purpose;
- UX writing/content hierarchy;
- SEO/semantic intent for public pages;
- brand/asset map;
- iconography map;
- composition rules;
- responsive transformation rules;
- section-by-section build order;
- acceptance criteria;
- unresolved blockers.

A direct `approved mockup -> production HTML/CSS` transition is blocked for V2/V3 work.

## Section-by-section implementation

For substantial web visual work, default sequence:

1. shell/header;
2. hero;
3. section 1;
4. section 2;
5. remaining sections in narrative order;
6. footer;
7. secondary pages.

Each material slice:

`contract -> implement -> browser render -> compare -> correct -> accept -> next slice`

Do not postpone the first visual comparison until the whole page is finished.

## Official asset lock

When an official asset exists, use it directly. Do not redraw, reinterpret, approximate or regenerate with AI:

- crest/logo;
- wordmark;
- `por Henrico Amaral` signature when applicable;
- official icons;
- protected photographic/graphic assets where specified.

If the required asset is not available to the executor, fail closed and request/resolve the canonical asset source instead of manufacturing a substitute.

## Iconography lock

Iconography is a brand/system decision, not decoration selected ad hoc by the implementer.

Rules:

1. If an official MotoristaOPS icon exists for the concept, use that exact asset/source.
2. If a registered approved library is designated for a surface, use only that library under its documented stroke/fill/size rules.
3. Do not mix Lucide/Heroicons/Phosphor/custom/emoji or other families in the same visual system without a recorded decision.
4. Never ask a generative image model to recreate an official icon.
5. Missing icon authority is `BLOCKED — iconography authority unresolved`.

## HVS relationship

Henrico Visual System is used for quality assurance, not for choosing MotoristaOPS aesthetics.

HVS may validate accessibility, responsiveness, semantic structure, performance, consistency and token discipline. Generic HVS grids, type scales, hero layouts or components are examples only and cannot override current project authority.

Hallmark, UI Craft, Taste, Impeccable and similar external intelligence are subordinate critique/quality engines. They cannot redefine logo, typography, palette, iconography, composition or brand signature.

## Anti-generic rule

Do not solve an unspecified visual axis with a provider's favorite/default aesthetic. Resolve the project context first. Distinctiveness must come from MotoristaOPS content, approved identity, service reality and current references.

## Writing

Visual copy inherits HenricoOPS `PROFESSIONAL` mode unless explicitly overridden. Use concise, direct, factual text; no filler or generic luxury promises.

For landing pages, real UX copy and content hierarchy should be resolved during decoupage before final composition, rather than using placeholder text to define layout.
