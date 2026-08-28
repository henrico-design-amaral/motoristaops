# MotoristaOPS — Instagram Publishing OS v1

Status: PROPOSED
Stage: FOUNDATION / GOVERNANCE
Owner: MotoristaOPS
Updated: 2026-08-28

## 1. Purpose

Define a reproducible, low-risk operating system for MotoristaOPS Instagram planning, production, review, scheduling, publication and learning.

The system exists to remove daily improvisation without removing quality control.

It must behave as a controlled pipeline, not as an autonomous content generator with unrestricted publishing authority.

## 2. Principles

1. GitHub is the source of truth for versioned governance and workflow contracts.
2. Google Drive may hold operational media, approved assets and working documents that are intentionally outside Git.
3. Brand Book V12 and current approved identity assets remain the visual source of truth.
4. Official social templates are reusable masters, not prompts to redesign every post.
5. The Feedbackador is a mandatory quality gate before scheduling.
6. Human approval remains mandatory in Phase 1.
7. Scheduling automation may be added only after the control plane is stable.
8. Publishing automation may be added only after scheduling has been validated without brand or content regressions.
9. Analytics feed the next planning cycle; publication is not the end of the workflow.
10. No executor may skip states because a downstream tool is available.

## 3. Scope of v1 foundation

### In scope

- content calendar schema;
- publication states;
- content IDs;
- editorial pillars;
- official cadence baseline;
- Feedbackador gate;
- approval rule;
- asset handoff contract;
- scheduling handoff contract;
- analytics fields;
- phased automation plan.

### Out of scope

- direct Instagram API publication;
- Buffer/n8n production integration;
- unattended publishing;
- automatic creation of every visual asset;
- automatic approval of brand-sensitive content;
- changing Brand Book V12;
- redesigning the official Story, Reel or Carousel templates.

## 4. Official publication formats

### Carousel

Primary editorial format for education, authority, saves, shares and conversion.

Official architecture may use the approved MotoristaOPS carousel system:

- Cover / Hook
- Content
- Comparison or Method
- Proof
- CTA

Not every carousel needs every component, but the first slide must have one primary job: earn the swipe.

### Story

Daily-presence format for real operation, proof, context, availability and lightweight interaction.

Story content should favor operational reality over generic advertising.

### Reel

Secondary discovery format. MotoristaOPS does not depend on high-production video. Reels may use lightweight motion, real clips or approved static/motion templates.

### Fixed post

Positioning, proof, service communication or an important standalone message.

## 5. Baseline cadence

Initial cadence is a test baseline, not a permanent rule:

- Stories: daily when there is useful operational content;
- Carousels: 2 per week;
- Fixed posts: 1 per week;
- Reels: 2 per month initially;
- Story amplification: on feed-publication days when useful.

Publishing times are hypotheses until enough account data exists. Performance data supersedes generic timing advice.

## 6. Content lifecycle

Canonical states:

`IDEA -> PLANNED -> BRIEFED -> IN_PRODUCTION -> QA -> NEEDS_REVISION -> READY_FOR_REVIEW -> APPROVED -> SCHEDULED -> PUBLISHED -> MEASURED -> LEARNED`

Failure states:

- `BLOCKED`
- `PUBLISH_ERROR`
- `REJECTED`
- `CANCELLED`

State rules:

- only `QA` can move to `NEEDS_REVISION` or `READY_FOR_REVIEW`;
- only a human reviewer may move Phase-1 content from `READY_FOR_REVIEW` to `APPROVED`;
- only `APPROVED` content may become `SCHEDULED`;
- only confirmed platform success may become `PUBLISHED`;
- `PUBLISHED` must never be inferred from a scheduled timestamp alone;
- learning notes are recorded only after metrics exist.

## 7. Content ID

Every publication receives a stable ID:

`MOPS-IG-YYYY-NNN`

Example:

`MOPS-IG-2026-014`

The ID follows the publication across calendar, asset folder, scheduler, analytics and learning records.

## 8. Content control plane schema

Minimum fields:

- content_id
- publish_date
- publish_time
- timezone
- channel
- format
- pillar
- objective
- theme
- hook
- caption
- CTA
- hashtags
- template
- asset_location
- feedback_score
- feedback_result
- reviewer
- status
- scheduler
- scheduler_id
- published_url
- published_at
- reach_24h
- reach_72h
- saves_72h
- shares_72h
- comments_72h
- profile_visits_72h
- link_clicks_72h
- leads_7d
- bookings_7d
- learning
- incident_note

## 9. Editorial pillars

Initial pillars:

1. Method / Planning
2. Airport / Travel
3. Real operation / Behind the scenes
4. Education / Passenger guidance
5. Proof / Trust
6. Service / Conversion
7. São Paulo context / Traffic / Weather / Events

The distribution of pillars must be adjusted from measured performance, not from aesthetic preference alone.

## 10. Feedbackador gate

The Feedbackador is mandatory for every feed asset and for any Story containing branded design or commercial claims.

Score dimensions, 0–2 each:

1. Brand compliance
2. Hook / clarity
3. Utility / relevance
4. Conversion logic
5. Coherence / non-redundancy

Total: 0–10.

Rules:

- 8–10: eligible for human review;
- below 8: `NEEDS_REVISION`;
- score does not override hard-fail rules.

Hard fails:

- incorrect MotoristaOPS spelling;
- incorrect Henrico Amaral name/signature;
- modified or invented official logo;
- visual identity outside Brand Book authority;
- unreadable text;
- unsupported factual claim;
- incorrect contact/URL;
- severe content redundancy;
- privacy breach involving passenger, address, trip or personal data;
- CTA that does not match the current service path.

## 11. Phase 1 human approval

Phase 1 is intentionally conservative.

Flow:

`PLANNED -> PRODUCTION -> FEEDBACKADOR -> HUMAN REVIEW -> APPROVED -> MANUAL OR CONTROLLED SCHEDULING`

The human reviewer checks the final artifact, copy, date and conversion path.

No unattended publishing is allowed in Phase 1.

## 12. Phase 2 scheduling automation

Phase 2 may begin only after Phase 1 demonstrates:

- stable content IDs;
- stable calendar updates;
- no repeated brand failures;
- reliable asset locations;
- Feedbackador false-positive/false-negative rate acceptable in practice;
- at least one complete publication cycle with correct state transitions.

Target flow:

`APPROVED -> ORCHESTRATOR -> SCHEDULER -> SCHEDULED`

The first scheduler integration should preserve platform status IDs and errors in the control plane.

## 13. Phase 3 publication and analytics loop

Only after scheduling is stable:

`SCHEDULED -> PLATFORM -> PUBLISHED -> METRICS -> LEARNING -> NEXT CALENDAR`

The system should compare performance by:

- hook type;
- pillar;
- format;
- CTA;
- day/time;
- topic;
- proof type;
- conversion outcome.

The system must distinguish vanity metrics from business metrics.

Primary business metrics:

- profile visits;
- qualified DMs;
- WhatsApp/contact clicks;
- quote requests;
- booked rides.

## 14. First 30-day operating rhythm

Weekly batch rhythm:

- Thursday: next-week planning and briefing;
- Friday: production and Feedbackador QA;
- Saturday: revision, human approval and scheduling;
- During week: publication and operational Stories;
- Sunday: short performance review and next-week learning notes.

The exact weekdays may later change, but batch production is preferred over daily improvisation.

## 15. Asset structure

Recommended operational Drive structure:

`MotoristaOPS/Marketing/Instagram/`

- `00_Governance`
- `01_Official_Templates`
- `02_Content_Calendar`
- `03_Production`
- `04_Approved`
- `05_Scheduled`
- `06_Published`
- `07_Analytics`
- `08_Learnings`

Git remains authoritative for versioned workflow rules. Drive is operational storage for media and working artifacts.

## 16. Automation architecture target

Target architecture after Phase 1:

`Content Control Plane -> Orchestrator -> Feedbackador -> Human Approval -> Scheduler -> Instagram -> Metrics -> Learning`

Possible implementations include n8n and a scheduler such as Buffer or a later direct Meta integration, but provider choice is an implementation detail and does not override this contract.

## 17. Safety and rollback

- No automatic deletion of published content.
- No automatic editing of a live post without explicit review.
- Scheduler errors must move the item to `PUBLISH_ERROR` and notify the operator.
- Duplicate publishing must be prevented by `content_id + scheduler_id + published_url` checks.
- A failed automation must degrade to controlled manual scheduling, not to skipped QA.
- Access tokens and secrets never belong in content sheets, prompts, repositories or public docs.

## 18. Acceptance criteria for foundation

Foundation is complete when:

- this contract is merged;
- the content control plane exists;
- the first 30-day calendar is loaded;
- official formats and template names are mapped;
- status transitions are tested manually;
- Feedbackador scoring is used on at least one complete carousel;
- human approval is recorded;
- no external scheduler is yet required for the foundation to function.

Only after these criteria pass may the project start Phase 2 automation.