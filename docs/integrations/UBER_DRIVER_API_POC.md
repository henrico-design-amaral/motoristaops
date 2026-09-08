# MotoristaOPS — Uber Driver API POC

Status: implementation POC; not released. Surface: Dashboard/data ingestion. Base: `dashboard-stable`.

## Goal
Replace repetitive screenshot-only entry with the official Uber Driver API while preserving video/OCR as fallback. The POC stops before dashboard persistence and proves OAuth, trips, payments, pagination, backfill and normalization.

## Contract
OAuth uses `auth.uber.com/oauth/v2`; Driver API uses `/v1/partners/me`, `/partners/trips` and `/partners/payments`, with scopes `partner.accounts partner.trips partner.payments`.

References: https://developer.uber.com/docs/drivers/guides/authentication ; https://developer.uber.com/docs/drivers/guides/scopes ; https://developer.uber.com/docs/drivers/references/api/v1/partners-trips-get ; https://developer.uber.com/docs/drivers/references/api/v1/partners-payments-get

## Route limitation
The Driver API does not expose exact pickup/dropoff coordinates, street addresses or route polyline. The normalized schema therefore leaves those fields null and marks their provenance. Future MotoristaOPS telemetry will supply spatial/operational truth.

## Security
This repository is public. Secrets, OAuth tokens and raw driver data must never be committed. `.env.uber` and `.motoristaops-private/` are gitignored. OAuth token exchange happens locally on `127.0.0.1`, never in the static dashboard bundle.

## Setup
Register `http://127.0.0.1:8787/callback/uber` in the Uber Developer application; copy `.env.uber.example` to `.env.uber`; fill local credentials; never commit the real file.

## Commands
`npm run uber:auth` — local OAuth callback.
`npm run uber:probe` — profile plus up to five trips.
`npm run uber:sync -- --from=2026-09-01 --to=2026-09-08` — range sync.
`npm run uber:sync -- --full --no-payments` — determine oldest trip made available by Uber before payment backfill.
`npm run uber:sync -- --full` — full trip backfill plus payments, automatically split into windows of at most ten days.
`npm run uber:test` — deterministic local tests.

Raw snapshots are stored under `.motoristaops-private/uber/raw/`; normalized review snapshots under `.motoristaops-private/uber/normalized/`. Every normalized snapshot has `review_required: true` and `persistence_status: not_persisted`, preserving the existing MotoristaOPS human-review gate.

## POC acceptance
Prove with the real account: OAuth; `/partners/me`; one recent real trip; matching payments where available; pagination beyond 50 trips; oldest available trip via `--full --no-payments`; <=10-day payment windows; no invented route data; no secret/raw data committed.

After that, implement private operational storage, deterministic upsert by `trip_id`, dashboard review adapter, incremental sync and the separate GPS telemetry POC.
