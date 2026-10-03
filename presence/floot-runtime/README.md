# MotoristaOPS Presença — Floot Runtime

Status: executable runtime mirror
Floot project id: 4bc9185e-1402-40b6-9f5e-e12392b07a9e
Canonical technical authority: GitHub
Runtime platform: Floot
Database: Floot-managed PostgreSQL
Authentication: Floot Auth + brokered Google OAuth

## Purpose

This subtree mirrors the custom Floot runtime so the executable environment does not become a competing source of truth. Changes must be reconciled back to GitHub.

## Implemented

- protected customer dashboard;
- email/password auth and Google OAuth;
- real PostgreSQL persistence;
- product/order creation gated by active canonical price;
- Mercado Pago server-side order boundary and signed webhook handler;
- transactional onboarding with rollback;
- print personalization separated from private shipping data;
- explicit private preview before customer confirmation;
- public snapshot excluding delivery address, full legal name and private phone;
- dynamic public profile at /{slug};
- publication hash/version persistence;
- readiness gate computed from database evidence;
- Melhor Envio quote boundary using verified origin/package data only;
- physical BOM classification and print spec placeholders remain fail-closed.

## External blockers

- PRESENCE_COMPLETE v1 is still draft and price_cents is null;
- Mercado Pago credentials are not yet connected;
- Melhor Envio sandbox credentials are not yet connected;
- current official Printi product/template specifications are not yet recorded;
- physical package weight/dimensions are not yet verified;
- shipping origin/remitter data is not yet verified;
- Floot production publish still requires the owner's explicit Publish action.

## Non-negotiable

Do not fill missing price, supplier, Printi dimensions, package measurements, credentials or shipping-origin data from memory or inference.
