# MotoristaOps Tasks

Status: ACTIVE
Updated: 2026-08-23

## Current governance task

Goal: make project context reproducible across Claude, ChatGPT, Codex and other executors without relying on chat memory.

### In scope

- project bootstrap/context files;
- explicit output modality and stage boundaries;
- durable dashboard authentication decision;
- visual authority/fidelity contract;
- provider-neutral execution flow.

### Out of scope

- redesigning the Landing Page;
- changing Dashboard product behavior;
- adding authentication;
- publishing new visual work;
- changing production domains;
- changing operational data.

### Acceptance criteria

- `CLAUDE.md` exists and loads project authority rather than relying on `AGENTS.md` being discovered implicitly;
- `PROJECT_CONTEXT.md`, `TASKS.md`, `DECISIONS.md`, `DESIGN.md` and `docs/orchestrator/LOOP_EXECUTION.md` exist and agree;
- image-only work cannot silently become code work;
- approved visual sources can be declared as implementation baselines;
- Dashboard auth is explicitly `not required by default`;
- current HenricoOPS writing/context/fidelity governance is referenced;
- governance changes enter through branch/PR, not direct `main` commits.

## Next product task

Must be selected from the latest product request after this governance task is merged and context is rehydrated. Do not infer the next product implementation from old chat history.
