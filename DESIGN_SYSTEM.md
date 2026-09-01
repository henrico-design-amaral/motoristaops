# MotoristaOPS — Design System Resolver

Status: ACTIVE
Version: 1.0
Date: 2026-09-01
Authority: `STYLE_GUIDE.md` + `DESIGN.md` + current implementation + Henrico Visual System quality contracts

## Purpose
Define how MotoristaOPS visual expression becomes repeatable without creating a second identity system or copying global HVS examples as aesthetics.

## Source model
- **Style/brand authority:** `STYLE_GUIDE.md`, Brand Book V12 and official assets.
- **Agent resolver:** `DESIGN.md`.
- **Shared quality mechanics:** Henrico Visual System / applicable Product Visual Contracts.
- **Surface implementation:** current approved Landing, Dashboard or Social implementation when it represents accepted behavior.

## System responsibilities
Resolve or maintain, proportionally to the surface:
- design tokens and semantic color roles;
- typography scale/roles;
- spacing and rhythm;
- grid/container rules;
- responsive breakpoints and transformations;
- component primitives and states;
- interaction/motion primitives;
- icon sizing/stroke/application rules;
- image/media behavior;
- accessibility mapping;
- implementation/version mapping.

## Surface sovereignty
Do not force one component grammar across all surfaces.

### Landing
Use page-specific composition and browser-first responsive behavior. Components serve narrative/conversion rather than dashboard density.

### Dashboard
Use operational primitives optimized for scanning, data reliability, task completion and responsive information density.

### Social
Use format-specific systems controlled by the applicable Social/Carousel/Video protocol and Style Guide.

## Responsive rule
Mobile is a designed transformation, not compressed desktop. Each material component/section must define wrapping, stacking, crop/focal behavior and interaction changes before implementation acceptance.

## Component rule
A reusable component is promoted only after repeated use or a clear system responsibility. Do not create abstractions solely to make the codebase appear systematic.

## Iconography
Use only the current official/approved source defined through Style Guide and `DESIGN.md`. Missing authority blocks selection rather than allowing library mixing.

## Accessibility
All executable interfaces inherit `A11Y.md` and HenricoOPS WCAG 2.2 AA baseline.

## Change control
Material token/component/system changes follow a scoped spec/decision and must not silently alter Brand Book or protected visual anchors.
