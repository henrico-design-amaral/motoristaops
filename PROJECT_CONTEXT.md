# MotoristaOps Project Context

Status: ACTIVE
Version: 1.0
Date: 2026-08-23

## Project identity

- Repository: `henrico-design-amaral/motoristaops`
- Production branch: `main`
- Public landing: `https://www.motoristaops.com.br/`
- Operational dashboard: `https://dashboard.motoristaops.com.br/`
- Orchestrator/governance authority: HenricoOPS

## Durable authority map

- Product scope and architecture: `PROJECT_CONTROL.md`
- Executor rules: `AGENTS.md` and `CLAUDE.md`
- Current continuity: `HANDOFF.md`
- Active work: `TASKS.md`
- Durable decisions: `DECISIONS.md`
- Visual authority contract: `DESIGN.md`
- Execution/stage protocol: `docs/orchestrator/LOOP_EXECUTION.md`
- Technical scripts/checks: `package.json` and `.github/workflows/`

## Source precedence

1. Current project authority files in this repository.
2. Current HenricoOPS governance/registries and project reference mappings.
3. Current project Google Drive authorities/references when explicitly required.
4. Approved artifacts referenced by current decisions/tasks.
5. Historical references and previous studies.
6. Provider memory/chat history.

A lower source may not override a higher source.

## Surface separation

### Landing Page
Public/commercial surface. Goal: present the service, establish trust and convert to direct contact.

### Dashboard
Operational/financial/strategic surface. It is intentionally allowed to operate without login/password unless a newer decision changes this. Authentication is not a default acceptance criterion.

### Social Media
Distribution/relationship surface. It shares brand strategy with the Landing but is not the Dashboard interface.

Do not transfer layout density, dashboard visual language or operational navigation into the public Landing merely because both belong to MotoristaOps.

## Context before execution

For every existing-project task, resolve:

- requested surface;
- requested output modality;
- current stage;
- next allowed stage;
- applicable decision(s);
- current visual authority if visual work;
- approved baseline artifact if one exists;
- explicit non-goals.

If these cannot be resolved and the ambiguity can change the deliverable, stop.

## Default output/stage behavior

- Exploration does not imply implementation.
- Implementation does not imply publication.
- Approval of one section does not authorize redesign of another section.
- Image-first requests remain image-only until an explicit approval transitions the task to implementation.
- An approved image used as an implementation source must be treated through a fidelity contract.

## Writing mode

Default: `PROFESSIONAL` from HenricoOPS.

Project copy must remain concise, direct, factual and specific to the real service. Do not use generic luxury/chauffeur language, unsupported claims, filler or excessive text.

## Provider-neutral rule

ChatGPT, Claude, Codex, Antigravity and other executors are clients of the same project context. None of their local/session memories are canonical authority.
