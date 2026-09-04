# WS-011 — Landing Assets

Status: LOCAL COMPLETE / GITHUB BINARY SYNC PENDING
Updated: 2026-09-03

## Runtime assets

| Asset | Role | Dimensions | SHA-256 |
| --- | --- | ---: | --- |
| `hero-car-city.webp` | Hero only; generated visual based on the real vehicle references | 1672×941 | `ee9c866dc303d1e388b3f9c0679df53c89b53a2f5fe5d780a426e8ab47317c89` |
| `henrico-profile.webp` | Real portrait for `Quem dirige` | 848×1264 | `305bd946281fb66c1b260157ea23014f74d0a568b18f2399f5f1e18118227b48` |
| `logo-horizontal-crop.webp` | Header lockup | 1020×390 | `b4a4e356e40c80814bc0afca5655fcef8ca5271e4af5366dd4cb38a4faedb315` |
| `logo-oficial.webp` | Footer / institutional lockup | 3296×4240 | `7770299912a9019f613cf3628e1971d2320bb21f8ed2b0a71e9722a1e3c57d74` |

## Authority and provenance

- Logos originate from the current MotoristaOPS Brand Book / approved official assets.
- `henrico-profile.webp` is derived from a user-supplied real portrait; it must not be regenerated to replace identity.
- `hero-car-city.webp` is an approved-direction generated scene and is used only in the Hero.
- No asset from V1 becomes V2 authority merely because it exists in repository history.

## GitHub sync gate

The current GitHub connector can create UTF-8 files and Git blobs from provided content, but it does not accept a local binary file reference. Until a safe binary transfer path is available, these files remain canonical in the local WS-011 workspace and are checksum-registered here. Do not substitute unrelated legacy images to make the branch appear complete.

Historical repository blobs `public/landing-v3/logo-header-v3.svg` and `public/landing-v3/logo-oficial.svg` exist, but are not silently promoted to V2 runtime assets; migration requires an explicit fidelity check against current Brand Book authority.
