# MotoristaOPS Claude Instructions

Claude/Claude Code must treat this repository as an existing governed project, not a greenfield design exercise.

## Mandatory bootstrap

Read, in order:

1. `PROJECT_CONTROL.md`
2. `PROJECT_CONTEXT.md`
3. `AGENTS.md`
4. `HANDOFF.md`
5. `TASKS.md`
6. `DECISIONS.md`
7. `DESIGN.md`
8. `docs/orchestrator/LOOP_EXECUTION.md`
9. `package.json`

Also resolve applicable HenricoOPS governance before project execution, especially:
- `registry/canonical-identity.json`;
- provider parity;
- visual decoupage;
- visual architecture/fidelity;
- writing;
- A11Y;
- release gates.

## Canonical identity

When the human operator/author is named, use exactly **Henrico Amaral** or **Henrico** when first-name-only context is appropriate.

Do not use `Enrico`, `Henrique` or spelling variants because of historical text, usernames, repository paths, provider memory or stale files.

## Context rule

Do not rely on chat history, Claude auto-memory or remembered project facts when repository/Drive authority can be resolved.

Current canonical decisions win over old references, old screenshots, old chats and stale brand studies.

If required authority is unavailable or conflicting, fail closed and report the exact missing/conflicting source.

## Output modality rule

Before executing, classify the deliverable. Do not silently change it.

Examples:
- image request -> do not implement code;
- analysis request -> do not edit files;
- image-first web exploration -> implementation remains blocked until visual approval **and visual decoupage**;
- implementation approval -> does not imply publication approval.

## Visual rule

Before any visual generation or frontend design work, resolve `DESIGN.md` and the current project visual authority it points to.

Brand Book V12 and official assets remain authoritative when resolved by the project/HenricoOPS source mapping.

If an approved visual artifact exists for the requested surface, treat it as a fidelity baseline. Do not replace logo, typography, palette, composition, hierarchy, iconography or signature elements during implementation unless explicitly authorized.

### Mandatory mockup-to-interface flow

For V2/V3 work, never treat a static mockup as a pixel recipe for immediate production code.

Follow:

`approved direction -> mockup anatomy -> UX intent -> information architecture -> UX writing/content -> SEO/semantics -> brand/assets/iconography -> composition contract -> responsive contract -> section-by-section browser build -> visual QA`

The implementation agent must not be the first place where missing design decisions are invented.

### Section-by-section implementation

Default order for a page:

`header -> hero -> section 1 -> section 2 -> ... -> footer -> secondary pages`

Each material slice must follow:

`section contract -> implement -> render in browser -> compare -> correct -> accept -> next section`

Do not build the whole page and postpone visual convergence until the end unless explicitly required.

### Asset and iconography lock

If an official logo, wordmark, signature or icon exists, use the actual registered asset. Never redraw, approximate, substitute with emoji, mix icon families, or ask a generative model to recreate official brand assets.

If iconography authority cannot be resolved for the requested concept, stop with `BLOCKED — iconography authority unresolved` instead of improvising.

## Writing rule

Use the HenricoOPS `PROFESSIONAL` writing mode by default. Keep copy concise, factual, direct and project-specific. Personal mode is opt-in only.

For public pages, resolve real UX copy before final layout where practical. Do not use generic premium/chauffeur filler or placeholder copy to make a layout work.

## Dashboard decision

The MotoristaOPS dashboard does not require authentication by default. Absence of login/password is not a defect unless a later canonical decision changes this requirement.

## Execution boundaries

- Never work directly on `main`.
- One branch per objective.
- One PR per scope.
- Do not mix unrelated cleanup, product work and deployment.
- Do not publish without applicable validation and explicit release authority.
- Preserve Landing, Dashboard and Social Media as distinct product surfaces.
- Prefer the smallest correct solution after sufficient root-cause understanding.
