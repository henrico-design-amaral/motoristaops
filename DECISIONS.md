# MotoristaOps Decisions

Status: ACTIVE
Updated: 2026-08-23

## D-001 — Dashboard authentication

Decision: authentication is **not required by default** for the MotoristaOps dashboard.

Rationale: the current product owner explicitly accepts direct access without login/password. Absence of authentication is not a defect by itself.

Constraint: if the data/content profile materially changes later, privacy/security must be reassessed. A later explicit canonical decision may supersede this one.

## D-002 — Project context is durable, not conversational

Decision: project continuity must be reconstructable from repository/HenricoOPS/required Drive authorities without depending on a previous chat.

Provider auto-memory or chat history may assist discovery but cannot override current canonical sources.

## D-003 — Output modality is binding

Decision: the requested deliverable class is part of scope.

Examples:
- image request does not authorize code;
- analysis does not authorize edits;
- image-first exploration remains pre-implementation until approval;
- implementation approval does not authorize deployment/publication.

Any change of modality requires explicit user instruction or a current task contract that already authorizes the transition.

## D-004 — Stage boundaries are binding

Decision: `EXPLORE`, `APPROVE`, `IMPLEMENT`, `VERIFY`, `RELEASE` and `CLOSEOUT` are distinct operational stages.

An executor may not advance beyond the current allowed stage merely because it can technically continue.

## D-005 — Approved visual artifact can become implementation authority

Decision: when the user approves an image/concept as the basis for implementation, it becomes an explicit fidelity baseline for that surface.

The task must declare `STRICT`, `ADAPTIVE` or `DIRECTIONAL` fidelity and protected anchors. The executor cannot redesign protected anchors during implementation without approval.

## D-006 — HVS is quality floor, not MotoristaOps aesthetics

Decision: Henrico Visual System may enforce accessibility, responsiveness, consistency, performance, semantic quality and evidence, but it may not replace MotoristaOps project-specific logo, typography, palette, composition, imagery or signature visual decisions.

## D-007 — Professional writing is default

Decision: MotoristaOps inherits the HenricoOPS `PROFESSIONAL` writing standard by default. `PERSONAL` is opt-in only.

Copy should be concise, factual, direct and specific. Avoid filler, generic premium/chauffeur copy, unsupported claims and excessive text.
