# MotoristaOPS — Social Media Control Center v1

Status: IMPLEMENTATION CONTRACT
Date: 2026-09-17
Target surface: `socialmedia.motoristaops.com.br`
Issue: #66

## Decision

Create a dedicated social-media operational surface under `socialmedia.motoristaops.com.br`.

Do **not** add social-media management to the existing daily driver dashboard navigation as a tightly coupled module. The current operational dashboard remains at `dashboard.motoristaops.com.br` and keeps its current responsibilities.

The social-media surface stays in the same `henrico-design-amaral/motoristaops` repository so it can reuse governance, brand authority, tokens and deployment conventions, but it must have its own output artifact and deployment target.

## Why

The daily dashboard optimizes driving operation, financial closure, traffic, forecast and operational decisions. Social media has a different information model, cadence and failure domain.

Isolation provides:
- simpler maintenance;
- independent deploys;
- lower regression risk for the driver dashboard;
- clearer ownership of social workflows;
- shared governance without duplicating the project.

## Canonical sources

1. Google Drive — MotoristaOPS project authority and approved artifacts.
2. Instagram Content Control Plane v1.
3. `MotoristaOPS — Teste Social Tools 7 dias — 2026-09-17 a 2026-09-23`.
4. Brand Book V12 / `DESIGN.md` / dashboard product system.
5. Metricool Starter — scheduling/publishing and primary multi-channel execution.
6. Windsor.ai Free — complementary Instagram analytics and validation.
7. Hermoso Free — research/reference intelligence.

No dashboard value may be invented to fill a missing field. Missing evidence is rendered as unavailable/pending.

## Surface architecture

The new surface is a cockpit, not a marketing page.

### 1. Overview

First fold answers:
- what is planned today;
- what is ready;
- what is blocked;
- what has already been published;
- what requires action now.

Primary KPIs:
- planned pieces;
- published pieces;
- blocked pieces;
- publication rate;
- active campaigns;
- measured leads/bookings when evidence exists.

### 2. Editorial Calendar

Monthly/weekly/day views by:
- channel;
- format;
- pillar;
- objective;
- campaign;
- production status;
- scheduler state.

### 3. Campaigns

Campaign entity groups content around a business goal.

Minimum fields:
- campaign id/name;
- objective;
- audience;
- start/end date;
- channels;
- formats;
- CTA;
- status;
- spend when applicable;
- leads/bookings when evidenced;
- learning.

### 4. Production Pipeline

Canonical workflow:
`IDEA -> COPY -> BRAND_GATE -> ASSET -> READY -> SCHEDULED -> PUBLISHED -> MEASURED -> LEARNING`

Blocked states remain explicit.

### 5. Performance

Compare formats and themes without conflating tool performance with content performance.

Metrics only when returned by an authoritative source:
- reach;
- views;
- engagement;
- saves;
- shares;
- comments;
- profile activity;
- Reel watch/skip metrics;
- leads;
- bookings.

### 6. Reference Intelligence

Track references and extracted patterns from Hermoso/research:
- source;
- format;
- hook;
- narrative pattern;
- motion pattern;
- CTA pattern;
- applicability to MotoristaOPS;
- validation status.

References never override Brand Book V12.

### 7. Tool Health

Track Metricool, Windsor.ai and Hermoso:
- connection status;
- supported channels;
- supported formats;
- last successful execution;
- incident count;
- observed latency;
- current monthly cost.

Buffer/Zernio remain contingency references only unless a future decision promotes them.

### 8. Learnings

Every cycle records:
- evidence;
- inference;
- next hypothesis;
- next test.

## Modularity contract

Each top-level section is an independent module. A change in Calendar must not change Campaigns, Performance or Tool Health unless a shared contract is explicitly updated.

Data access is isolated behind adapters. UI modules consume normalized domain objects and do not call provider-specific APIs directly.

Proposed adapter boundary:
- `contentControlAdapter`
- `metricoolAdapter`
- `windsorAdapter`
- `referenceAdapter`

## Build/deploy contract

Required artifact:
- `dist-socialmedia/`

Existing artifacts remain:
- `dist-dashboard/`
- `dist-public/`

The social-media artifact must never be mirrored into the dashboard target.

Required production target:
- `socialmedia.motoristaops.com.br`

Recommended deploy secret:
- `HOSTINGER_SOCIAL_TARGET_DIR`

Before production promotion:
1. build succeeds;
2. dashboard artifact still exists and passes its current gates;
3. public landing artifact still passes its current gates;
4. social-media artifact contains expected entrypoint/assets;
5. DNS/subdomain target is configured;
6. production URL returns HTTP 200 and expected control-center content.

## Visual contract

Use dashboard product language, not landing-page composition:
- Noite canvas;
- Grafite surfaces;
- Champagne only for active/priority/accent states;
- Inter as primary UI type;
- Manrope reserved for product/page identity where already approved;
- no gradients;
- minimal shadows;
- no decorative card nesting;
- dense but scan-friendly operational layout.

Brand/logo authority remains MotoristaOPS Brand Book V12. Do not generate replacement logos, icons or brand assets.

## Initial implementation slices

1. Architecture + isolated route/output.
2. Overview + current-day editorial state.
3. Calendar.
4. Campaigns + production pipeline.
5. Performance adapters.
6. Tool health.
7. Reference intelligence.
8. Learnings and reporting.

Each slice follows:
`contract -> implement -> build -> visual/functional compare -> accept -> next slice`.
