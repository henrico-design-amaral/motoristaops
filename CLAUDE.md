# MotoristaOps Claude Instructions

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

Also resolve applicable HenricoOPS governance before project execution, especially context, writing, visual architecture, fidelity and release gates.

## Context rule

Do not rely on chat history, Claude auto-memory or remembered project facts when repository/Drive authority can be resolved.

Current canonical decisions win over old references, old screenshots, old chats and stale brand studies.

If required authority is unavailable or conflicting, fail closed and report the exact missing/conflicting source.

## Output modality rule

Before executing, classify the deliverable. Do not silently change it.

Examples:
- image request -> do not implement code;
- analysis request -> do not edit files;
- image-first web exploration -> implementation remains blocked until visual approval;
- implementation approval -> does not imply publication approval.

## Visual rule

Before any visual generation or frontend design work, resolve `DESIGN.md` and the current project visual authority it points to.

If an approved visual artifact exists for the requested surface, treat it as a fidelity baseline. Do not replace logo, typography, palette, composition, hierarchy or signature elements during implementation unless explicitly authorized.

## Writing rule

Use the HenricoOPS `PROFESSIONAL` writing mode by default. Keep copy concise, factual, direct and project-specific. Personal mode is opt-in only.

## Dashboard decision

The MotoristaOps dashboard does not require authentication by default. Absence of login/password is not a defect unless a later canonical decision changes this requirement.

## Execution boundaries

- Never work directly on `main`.
- One branch per objective.
- One PR per scope.
- Do not mix unrelated cleanup, product work and deployment.
- Do not publish without applicable validation and explicit release authority.
- Preserve Landing, Dashboard and Social Media as distinct product surfaces.
