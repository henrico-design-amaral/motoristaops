# MotoristaOPS V2 — literal reference implementation

This isolated preview follows the operator's current explicit decision: the attached image is the complete visual truth for `/v2/`, with no redesign or interpretation.

## Implementation

- `index.html` provides the document structure, accessibility labels, internal navigation hotspots, WhatsApp links, and a progressively interactive form layer.
- `assets/motoristaops-v2-reference.png` is the only visible design layer in the initial state.
- The artboard keeps the exact 1086:1448 ratio and scales proportionally with the browser width.
- `noindex,nofollow,noarchive` keeps `/v2/` isolated from search indexing.
- The public homepage and dashboard are outside this deployment scope.

## Verification

The deploy workflow refuses an altered source asset by checking both SHA-256 and PNG dimensions before upload. Browser evidence and the iteration history are recorded in `../design-qa.md`.
