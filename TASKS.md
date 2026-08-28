# MotoristaOps Tasks

Status: ACTIVE
Updated: 2026-08-28

## Completed durable pricing task

Goal: formalize a reproducible pricing system that accounts for passenger distance, schedule reservation and operational mobilization from a fixed MotoristaOPS base.

### Completed

- official operational base defined as Rua Mario Latorre, 245 — Parque Pinheiros — Taboão da Serra/SP;
- passenger rate preserved at R$ 4,50/km;
- scheduled minimum preserved at R$ 70,00;
- booking reservation preserved at R$ 15,00;
- 10 km road-distance mobilization allowance defined per applicable extremity;
- excess mobilization defined at R$ 3,00/km;
- waiting/tolerance and simple-stop rules preserved;
- recurring-service discount capped at 8% after full technical calculation;
- long empty-return protection added;
- canonical pricing policy and proposal table created under `docs/operations/`;
- durable decision recorded as `D-008`.

## Current governance task

Goal: make project context reproducible across Claude, ChatGPT, Codex and other executors without relying on chat memory.

### In scope

- project bootstrap/context files;
- explicit output modality and stage boundaries;
- durable dashboard authentication decision;
- visual authority/fidelity contract;
- provider-neutral execution flow;
- durable operational pricing rules.

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
- governance changes enter through branch/PR, not direct `main` commits;
- private-ride proposals use the canonical pricing policy rather than ad-hoc chat calculations.

## Next product task

Must be selected from the latest product request after the governance task is merged and context is rehydrated. Do not infer the next product implementation from old chat history.
