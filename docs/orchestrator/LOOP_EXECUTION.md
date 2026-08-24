# MotoristaOps Loop Execution

Status: ACTIVE
Version: 1.0

## Purpose

Keep every task inside the requested output modality, current stage and approved project context.

## Loop

1. **Resolve context**
   - read project authority;
   - resolve current live state;
   - exclude stale/superseded sources;
   - identify surface and exact scope.

2. **Declare contract**
   - output modality;
   - current stage;
   - next allowed stage;
   - deliverable;
   - explicit non-goals;
   - acceptance criteria.

3. **Resolve visual/writing authority when applicable**
   - `DESIGN.md` and current project references/approved artifacts;
   - HenricoOPS `PROFESSIONAL` writing mode by default.

4. **Execute only the current stage**
   - do not silently transition from exploration to implementation;
   - do not transition from implementation to publication;
   - do not redesign unaffected surfaces.

5. **Validate**
   - technical checks appropriate to scope;
   - visual architecture and visual QA where applicable;
   - visual fidelity when an approved baseline exists;
   - diff against declared scope.

6. **Approval transition**
   - only explicit approval or a current task contract may open the next stage.
   - record approved artifacts when they become future baselines.

7. **Closeout**
   - update decisions/tasks/handoff when durable state changed;
   - record unresolved risks;
   - leave the next executor able to continue without the chat transcript.

## Common examples

### Image-first section exploration

`EXPLORE + IMAGE_ONLY` -> deliver image/concept -> stop.

After explicit approval:
`IMPLEMENT + IMAGE_TO_CODE` -> identify approved source -> declare fidelity mode -> implement -> verify -> stop unless release is separately authorized.

### Existing UI refinement

Resolve existing implementation and design authority -> declare exact target section/component -> preserve everything outside scope -> validate desktop/mobile and relevant states.

### Publication

Release is a separate stage. Passing build/Visual QA does not itself authorize publication.

## Failure policy

Stop when:

- project authority conflicts;
- requested modality is unclear enough to alter the deliverable;
- visual authority is unresolved;
- approved baseline is missing from an image-to-code task;
- work would cross a stage boundary without approval;
- scope expansion is required but not authorized.
