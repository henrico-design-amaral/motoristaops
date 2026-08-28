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

## Completed governance continuity task

Goal: make project context reproducible across Claude, ChatGPT, Codex and other executors without relying on chat memory.

### Completed

- project bootstrap/context files exist;
- output modality and stage boundaries are explicit;
- dashboard authentication decision is durable;
- visual authority/fidelity contract is durable;
- provider-neutral execution flow exists;
- durable operational pricing rules are recorded.

## Current task — Instagram Publishing OS v1 foundation

Goal: create the controlled operating foundation for MotoristaOPS Instagram before adding external scheduling or unattended publication automation.

Canonical contract: `docs/social/INSTAGRAM_PUBLISHING_OS_V1.md`.

### In scope

- persist the Publishing OS governance;
- create the operational content-control structure in Drive;
- create the first content-control spreadsheet;
- load the first 30-day publication calendar;
- define publication states and stable content IDs;
- map official Story, Reel, Carousel and fixed-post formats;
- use the Feedbackador as a mandatory gate;
- keep Phase 1 human approval mandatory;
- manually validate state transitions before connecting a scheduler.

### Out of scope

- direct Meta/Instagram API publication;
- production n8n workflow;
- Buffer or other scheduler integration;
- unattended publishing;
- changing Brand Book V12;
- redesigning approved official publication templates;
- changing Landing Page or Dashboard product behavior.

### Acceptance criteria

- `docs/social/INSTAGRAM_PUBLISHING_OS_V1.md` is merged;
- `D-009` is durable in `DECISIONS.md`;
- operational Drive folders for Instagram exist;
- the control spreadsheet exists and contains the agreed schema;
- the first 30-day calendar is loaded;
- at least one content item completes `PLANNED -> ... -> READY_FOR_REVIEW` using the Feedbackador;
- human approval is recorded before any scheduling;
- no external scheduler is required to pass Phase 1 foundation.

## Next task gate

After the foundation passes acceptance criteria, evaluate Phase 2 scheduling automation.

Do not select or implement a scheduler integration before the control plane and approval flow are validated.